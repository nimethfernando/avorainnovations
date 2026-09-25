export interface CostPlatformConfig {
  id: string;
  label: string;
  base: number;
  icon: string;
}

export interface CostScaleConfig {
  label: string;
  mult: number;
}

export interface CostFeatureConfig {
  id: string;
  label: string;
  cost: number;
  enabled: boolean;
}

export interface CostCalculatorConfig {
  currency: string;
  lowMultiplier: number;
  highMultiplier: number;
  platforms: CostPlatformConfig[];
  scaleMultipliers: {
    mvp: CostScaleConfig;
    growth: CostScaleConfig;
    enterprise: CostScaleConfig;
  };
  features: CostFeatureConfig[];
}

export const DEFAULT_COST_CONFIG: CostCalculatorConfig = {
  currency: '$',
  lowMultiplier: 0.9,
  highMultiplier: 1.2,
  platforms: [
    { id: 'ai', label: 'AI & Machine Learning', base: 35000, icon: 'Brain' },
    { id: 'web', label: 'Enterprise Web Application', base: 25000, icon: 'Globe' },
    { id: 'mobile', label: 'iOS & Android Mobile App', base: 30000, icon: 'Smartphone' },
    { id: 'cloud', label: 'SaaS, Cloud & DevOps', base: 28000, icon: 'Cloud' },
  ],
  scaleMultipliers: {
    mvp: { label: 'Prototype / Fast MVP (4 Weeks)', mult: 0.8 },
    growth: { label: 'Mid-Market Enterprise System', mult: 1.3 },
    enterprise: { label: 'Hyperscale Mission-Critical', mult: 2.2 },
  },
  features: [
    { id: 'feat-1', label: 'Custom Neural Inference', cost: 12000, enabled: true },
    { id: 'feat-2', label: 'Enterprise Authentication & RBAC', cost: 4000, enabled: true },
    { id: 'feat-3', label: 'Real-time WebSocket Streaming', cost: 6000, enabled: true },
    { id: 'feat-4', label: 'Payment Gateway & Multi-Currency', cost: 5000, enabled: true },
    { id: 'feat-5', label: 'Bespoke RAG / Vector Database', cost: 14000, enabled: true },
    { id: 'feat-6', label: 'IoT Telemetry & MQTT Broker', cost: 10000, enabled: true },
    { id: 'feat-7', label: 'Automated CI/CD & Kubernetes IaC', cost: 8000, enabled: true },
    { id: 'feat-8', label: 'Enterprise Security & Regulatory Hardening', cost: 9000, enabled: true },
  ],
};
