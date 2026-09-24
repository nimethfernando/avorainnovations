import React from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import ProjectCostEstimator from '@/components/common/ProjectCostEstimator';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Project Cost & Scope Calculator | AVORA Innovations',
  description: 'Calculate real-time enterprise software engineering, AI model training, and cloud deployment costs.',
  canonical: '/cost-calculator',
});

export default function CostCalculatorPage() {
  return (
    <div className="py-8 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'Project Cost Estimator', url: '/cost-calculator' }]} />
      <div className="my-10">
        <ProjectCostEstimator />
      </div>
    </div>
  );
}
