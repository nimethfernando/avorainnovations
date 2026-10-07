/**
 * Client-Side Image Optimization Utility
 * Automatically resizes & compresses heavy images before uploading to server.
 * Prevents 413 Payload Too Large errors, timeout drops, and MariaDB packet limits.
 */

export interface CompressionResult {
  file: File;
  dataUrl: string;
  originalSize: number;
  compressedSize: number;
  width: number;
  height: number;
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export async function compressImage(
  file: File,
  maxWidth = 1600,
  maxHeight = 1200,
  quality = 0.85
): Promise<CompressionResult> {
  return new Promise((resolve) => {
    // If SVG or non-image, skip compression
    if (!file.type.startsWith('image/') || file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = (e.target?.result as string) || '';
        resolve({
          file,
          dataUrl,
          originalSize: file.size,
          compressedSize: file.size,
          width: 1200,
          height: 675,
        });
      };
      reader.onerror = () => {
        resolve({
          file,
          dataUrl: '',
          originalSize: file.size,
          compressedSize: file.size,
          width: 1200,
          height: 675,
        });
      };
      reader.readAsDataURL(file);
      return;
    }

    const img = new Image();
    const blobUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(blobUrl);

      let width = img.naturalWidth || img.width;
      let height = img.naturalHeight || img.height;

      // Calculate scale while maintaining aspect ratio
      if (width > maxWidth || height > maxHeight) {
        const widthRatio = maxWidth / width;
        const heightRatio = maxHeight / height;
        const bestRatio = Math.min(widthRatio, heightRatio);

        width = Math.round(width * bestRatio);
        height = Math.round(height * bestRatio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        // Fallback if canvas context is unavailable
        resolve({
          file,
          dataUrl: '',
          originalSize: file.size,
          compressedSize: file.size,
          width,
          height,
        });
        return;
      }

      // Smooth resizing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      // Determine output format (prefer WebP if supported, fallback to JPEG for photos, PNG for graphics with alpha)
      const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
      const compressedDataUrl = canvas.toDataURL(outputType, quality);

      canvas.toBlob(
        (blob) => {
          if (blob && blob.size < file.size) {
            const cleanName = file.name.replace(/\.[^/.]+$/, outputType === 'image/png' ? '.png' : '.jpg');
            const optimizedFile = new File([blob], cleanName, {
              type: outputType,
              lastModified: Date.now(),
            });

            resolve({
              file: optimizedFile,
              dataUrl: compressedDataUrl,
              originalSize: file.size,
              compressedSize: blob.size,
              width,
              height,
            });
          } else {
            // If compression didn't reduce size (e.g. already compressed small file), keep original
            resolve({
              file,
              dataUrl: compressedDataUrl,
              originalSize: file.size,
              compressedSize: file.size,
              width,
              height,
            });
          }
        },
        outputType,
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(blobUrl);
      resolve({
        file,
        dataUrl: '',
        originalSize: file.size,
        compressedSize: file.size,
        width: 1200,
        height: 675,
      });
    };

    img.src = blobUrl;
  });
}

