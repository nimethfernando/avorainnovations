import { SignJWT, jwtVerify } from 'jose';
import crypto from 'crypto';

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET || 'avora_enterprise_secret_jwt_key_32chars_minimum_length';
const key = new TextEncoder().encode(JWT_SECRET);

export interface AdminPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

/**
 * Hash password with salt using PBKDF2 SHA-256
 */
export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');
  return { hash: `${salt}:${hash}`, salt };
}

/**
 * Verify password against stored salt:hash
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const parts = storedHash.split(':');
    if (parts.length !== 2) return false;
    const [salt, originalHash] = parts;
    const testHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');
    return crypto.timingSafeEqual(Buffer.from(testHash, 'hex'), Buffer.from(originalHash, 'hex'));
  } catch {
    return false;
  }
}

/**
 * Sign JWT token with jose
 */
export async function signAdminToken(payload: AdminPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key);
}

/**
 * Verify JWT token with jose
 */
export async function verifyAdminToken(token: string): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    });
    return payload as unknown as AdminPayload;
  } catch {
    return null;
  }
}
