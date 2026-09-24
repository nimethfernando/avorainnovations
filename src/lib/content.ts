export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: string;
  iconName: string;
  badge: string;
  capabilities: { title: string; desc: string; icon: string }[];
  subServices: { title: string; desc: string }[];
  technologies: string[];
  industries: string[];
  useCases: { title: string; challenge: string; solution: string; impact: string }[];
  faqs: { question: string; answer: string }[];
}

export interface IndustryItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  overview: string;
  iconName: string;
  keyStats: { value: string; label: string }[];
  solutions: { title: string; desc: string; features: string[] }[];
  servicesOffered: string[];
  technologies: string[];
  useCases: { client: string; outcome: string; metrics: string }[];
  faqs: { question: string; answer: string }[];
}

export interface TechCategory {
  category: string;
  slug: string;
  description: string;
  items: {
    name: string;
    icon: string;
    description: string;
    badge: string;
  }[];
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  client: string;
  industry: string;
  heroImage: string;
  challenge: string;
  solution: string;
  implementation: string[];
  results: { metric: string; label: string }[];
  technologies: string[];
  relatedServices: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  coverImage: string;
  authorName: string;
  authorRole: string;
  readTime: string;
  publishedAt: string;
  isFeatured?: boolean;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'ai-machine-learning',
    slug: 'ai-machine-learning',
    title: 'AI & Machine Learning',
    category: 'Artificial Intelligence',
    badge: 'Flagship Core',
    iconName: 'Brain',
    shortDesc: 'Custom neural models, predictive intelligence, and enterprise-grade deep learning systems that automate decisions at scale.',
    fullDesc: 'Avora Innovations designs and implements production-grade artificial intelligence pipelines. We transition mathematical models from lab notebooks into fault-tolerant distributed cloud microservices that process millions of inferencing requests with sub-15ms latency.',
    capabilities: [
      { title: 'Predictive Analytics & Forecasting', desc: 'Time-series forecasting, churn prediction, and anomaly detection algorithms with rigorous backtesting.', icon: 'TrendingUp' },
      { title: 'Computer Vision & Visual AI', desc: 'Object detection, spatial segmentation, and visual quality inspection powered by custom YOLO & transformer architectures.', icon: 'Scan' },
      { title: 'Natural Language Understanding', desc: 'Custom fine-tuned transformers for semantic document extraction, sentiment telemetry, and compliance auditing.', icon: 'FileText' },
      { title: 'MLOps & Model Lifecycle', desc: 'Automated CI/CD pipelines for continuous training, model registries, drift detection, and automated rollback.', icon: 'Cpu' },
    ],
    subServices: [
      { title: 'Custom Deep Learning Model Training', desc: 'Bespoke architectures trained on domain-specific proprietary corpora with differential privacy.' },
      { title: 'Edge AI & Embedded Inference', desc: 'Quantized neural networks running on NVIDIA Jetson, Apple Neural Engine, and web browsers.' },
      { title: 'Feature Store & Data Engineering', desc: 'Streaming Kafka pipelines and Feast feature stores ensuring real-time feature consistency.' },
      { title: 'Model Governance & Explainability', desc: 'SHAP/LIME explainability layers providing audit trails for compliance-heavy sectors.' },
    ],
    technologies: ['PyTorch', 'TensorFlow', 'CUDA', 'Hugging Face', 'Kubeflow', 'MLflow', 'Triton Inference Server', 'Ray'],
    industries: ['FinTech', 'Healthcare', 'Logistics', 'Smart Manufacturing', 'Retail'],
    useCases: [
      {
        title: 'Real-time Autonomous Fraud Interception',
        challenge: 'A tier-1 payment processor experienced 1.8% fraudulent chargebacks across 2M daily micro-transactions.',
        solution: 'Architected an XGBoost and Graph Neural Network pipeline deployed across distributed clusters with 8ms inference SLA.',
        impact: 'Fraud dropped by 84%, saving $19.2M in annual unrecoverable chargebacks.',
      },
      {
        title: 'Automated Industrial Defect Inspection',
        challenge: 'A precision electronics fabricator suffered high manual inspection costs and a 4% defect escape rate.',
        solution: 'Engineered high-throughput computer vision cameras running edge YOLOv10 models at 60 FPS on factory conveyor lines.',
        impact: 'Defect escape rate decreased to 0.08%, with an annual inspection OPEX savings of 72%.',
      },
    ],
    faqs: [
      { question: 'How do you guarantee model accuracy over time?', answer: 'We build automated telemetry pipelines that track data drift and concept drift in real-time. When statistical Kolmogorov-Smirnov thresholds are breached, continuous retraining workflows trigger automatically.' },
      { question: 'Can Avora train models on our private on-premise infrastructure?', answer: 'Yes, our engineering teams deploy air-gapped infrastructure using Docker, Kubernetes, and Ray clusters compliant with HIPAA, SOC2 Type II, and ISO 27001 requirements.' },
    ],
  },
  {
    id: 'generative-ai',
    slug: 'generative-ai',
    title: 'Generative AI & LLMs',
    category: 'Artificial Intelligence',
    badge: 'High Demand',
    iconName: 'Sparkles',
    shortDesc: 'Domain-specific Large Language Models, enterprise Retrieval-Augmented Generation (RAG), and multimodal creative engines.',
    fullDesc: 'Transform corporate knowledge into intelligent, proactive enterprise engines. We build secure, hallucination-resistant generative AI systems connected to your operational databases, ERPs, and knowledge repositories.',
    capabilities: [
      { title: 'Enterprise RAG Pipelines', desc: 'Hybrid dense-sparse retrieval systems with cross-encoder re-ranking and vector indexing for zero hallucination.', icon: 'Database' },
      { title: 'Domain Model Fine-Tuning', desc: 'LoRA and QLoRA parameter-efficient fine-tuning on proprietary enterprise documentation and legal contracts.', icon: 'Sliders' },
      { title: 'Multimodal Generative Workflows', desc: 'Text-to-code, speech-to-intent, and synthetic data generation architectures.', icon: 'Layers' },
      { title: 'Guardrails & Safety Architecture', desc: 'Real-time prompt injection filtering, PII masking, and output safety verification boundaries.', icon: 'ShieldCheck' },
    ],
    subServices: [
      { title: 'Enterprise Knowledge Intelligence', desc: 'Universal semantic search and cognitive Q&A over terabytes of unstructured PDFs, tickets, and code.' },
      { title: 'Custom Copilot Development', desc: 'Context-aware conversational assistants embedded inside your proprietary SaaS workflows.' },
      { title: 'Synthetic Data Augmentation', desc: 'Privacy-preserving synthetic dataset generation for training downstream models without leaking customer data.' },
      { title: 'LLM Cost & Latency Optimization', desc: 'Semantic caching, model distillation, and token-routing architectures reducing API costs by up to 70%.' },
    ],
    technologies: ['LangChain', 'LlamaIndex', 'Pinecone', 'vLLM', 'OpenAI', 'Anthropic Claude', 'Ollama', 'ChromaDB'],
    industries: ['Healthcare', 'LegalTech', 'FinTech', 'E-commerce', 'Media & Entertainment'],
    useCases: [
      {
        title: 'Cognitive Clinical Trial Protocol Analysis',
        challenge: 'Medical research staff spent 45+ hours parsing 800-page FDA submission protocols for oncology trials.',
        solution: 'Built an enterprise RAG knowledge engine with biomedical embeddings and strict citations linking to original text.',
        impact: 'Research parsing time dropped from 45 hours to 18 minutes with 100% verifiable source citation accuracy.',
      },
    ],
    faqs: [
      { question: 'How do you prevent data leaks to public AI providers?', answer: 'We deploy private open-weight models (e.g., Llama-3, Mistral) in dedicated VPCs or use zero-data-retention enterprise enterprise endpoints where data is never used for training.' },
      { question: 'What is the implementation timeline for an enterprise RAG system?', answer: 'Typical proof-of-value implementations run in 3 to 4 weeks, with full production scaling and ERP integration completed in 8 to 12 weeks.' },
    ],
  },
  {
    id: 'ai-agents',
    slug: 'ai-agents',
    title: 'Autonomous AI Agents',
    category: 'Artificial Intelligence',
    badge: 'Next-Gen',
    iconName: 'Bot',
    shortDesc: 'Multi-agent orchestration systems that independently plan, execute tool-calling workflows, and self-heal complex business operations.',
    fullDesc: 'Move beyond passive conversational chatbots to proactive autonomous software agents. Avora builds deterministic, self-evaluating multi-agent teams capable of coordinating across databases, APIs, customer portals, and internal workflows.',
    capabilities: [
      { title: 'Hierarchical Multi-Agent Teams', desc: 'Supervisor-worker agent topologies with dynamic task decomposition and reflection loops.', icon: 'Network' },
      { title: 'Autonomous API & Tool Calling', desc: 'Agents equipped with deterministic OpenAPI execution, database querying, and headless browser navigation.', icon: 'Terminal' },
      { title: 'Self-Correction & Memory Graphs', desc: 'Persistent episodic memory graphs and iterative validation checkpoints ensuring verifiable output.', icon: 'CheckCircle' },
      { title: 'Human-in-the-Loop Governance', desc: 'Configurable approval thresholds for high-stakes financial transactions or sensitive data modifications.', icon: 'UserCheck' },
    ],
    subServices: [
      { title: 'Autonomous Customer Operations', desc: 'End-to-end resolution of complex multi-step support escalations without human intervention.' },
      { title: 'Automated Code & DevOps Agents', desc: 'Continuous code review, automated bug remediation, and cloud resource cost optimization bots.' },
      { title: 'Financial Reconciliation Agents', desc: 'Automated cross-system ledger validation, invoice parsing, and discrepancy resolution.' },
      { title: 'Competitive Intelligence Crawlers', desc: 'Autonomous headless browser agents monitoring pricing, catalog updates, and industry sentiment.' },
    ],
    technologies: ['CrewAI', 'LangGraph', 'AutoGPT', 'Playwright', 'FastAPI', 'Redis', 'Docker'],
    industries: ['FinTech', 'E-commerce', 'Logistics', 'Customer Experience', 'SaaS'],
    useCases: [
      {
        title: 'Fully Autonomous RMA & Return Verification',
        challenge: 'A global apparel retailer faced 12-day return review delays and high return fraud rates during holiday spikes.',
        solution: 'Deployed an autonomous agent network verifying courier tracking, visual image inspection, and warranty conditions.',
        impact: 'Average return approval time dropped to 90 seconds while detecting $2.4M in fraudulent returns.',
      },
    ],
    faqs: [
      { question: 'Can agents make unintended modifications to production databases?', answer: 'Never. Our architectures utilize read-only tool bindings and strictly gated staging pipelines with human approval tokens for destructive writes.' },
    ],
  },
  {
    id: 'web-development',
    slug: 'web-development',
    title: 'Enterprise Web Development',
    category: 'Software Engineering',
    badge: 'Core Expertise',
    iconName: 'Globe',
    shortDesc: 'Ultra-fast, highly resilient web applications built with Next.js, React 19, TypeScript, and micro-frontend architectures.',
    fullDesc: 'We construct world-class web experiences for global enterprises and ambitious startups. Using modern headless architectures, Turbopack, and edge computation, we engineer web systems that achieve sub-second page loads and pristine Core Web Vitals.',
    capabilities: [
      { title: 'Next.js App Router Architecture', desc: 'Server Components, streaming SSR, and parallel route segments engineered for extreme performance.', icon: 'Zap' },
      { title: 'Micro-Frontend Architectures', desc: 'Decoupled, modular frontend suites enabling independent deployments across multi-functional squads.', icon: 'Grid' },
      { title: 'Enterprise Headless CMS', desc: 'API-driven content architectures allowing marketing teams instant velocity without engineering roadblocks.', icon: 'FileCode' },
      { title: 'PWAs & Offline Capability', desc: 'Service workers, IndexedDB caching, and mobile-parity web applications with installability.', icon: 'Smartphone' },
    ],
    subServices: [
      { title: 'Custom SaaS Portal Engineering', desc: 'Multi-tenant dashboards with granular RBAC permissions, audit logging, and billing automation.' },
      { title: 'High-Volume E-Commerce Engines', desc: 'Headless storefronts built to withstand 100,000+ simultaneous checkout transactions during Black Friday surges.' },
      { title: 'Legacy Web App Modernization', desc: 'Incremental migration from legacy monoliths (PHP, ASP.NET, AngularJS) to modern Next.js and TypeScript.' },
      { title: 'Accessibility & WCAG 2.2 AA Audit', desc: 'Comprehensive screen-reader optimization, keyboard navigation, and legal accessibility certification.' },
    ],
    technologies: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Node.js', 'Vercel', 'AWS CloudFront'],
    industries: ['FinTech', 'SaaS', 'Real Estate', 'Healthcare', 'Education'],
    useCases: [
      {
        title: 'Global B2B Marketplace Modernization',
        challenge: 'A legacy B2B industrial exchange suffered from 6.4-second load times and a 42% mobile bounce rate.',
        solution: 'Engineered a full-stack Next.js App Router platform with ISR caching and edge-rendered catalog filters.',
        impact: 'LCP reduced to 0.72s, mobile conversions increased by 138%, and hosting infrastructure bills fell 44%.',
      },
    ],
    faqs: [
      { question: 'Do you deliver responsive design for all screen resolutions?', answer: 'Yes, every digital experience is developed mobile-first, tested rigorously across iOS Safari, Android Chrome, tablet dimensions, and ultra-wide desktop monitors.' },
    ],
  },
  {
    id: 'mobile-development',
    slug: 'mobile-development',
    title: 'Mobile App Development',
    category: 'Software Engineering',
    badge: 'iOS & Android',
    iconName: 'Smartphone',
    shortDesc: 'Native and cross-platform mobile apps built with React Native, Flutter, Swift, and Kotlin for millions of active devices.',
    fullDesc: 'Avora crafts fluid, native-feeling mobile applications that users love. Whether developing dedicated native Swift/Kotlin codebases or cross-platform Flutter and React Native architectures, we ensure 60 FPS performance, offline reliability, and seamless biometrics.',
    capabilities: [
      { title: 'Cross-Platform React Native & Flutter', desc: 'Single codebase architectures saving up to 45% development cost with zero compromise on native fidelity.', icon: 'Repeat' },
      { title: 'Native iOS & Android Engineering', desc: 'Deep hardware integration, CoreML, ARKit, HealthKit, and Android Jetpack performance.', icon: 'Cpu' },
      { title: 'Offline-First Sync Engines', desc: 'Local SQLite/WatermelonDB persistence with optimistic UI updates and background synchronization.', icon: 'WifiOff' },
      { title: 'App Store Optimization (ASO)', desc: 'Full lifecycle App Store & Google Play compliance, metadata tuning, and automated Fastlane release pipelines.', icon: 'Award' },
    ],
    subServices: [
      { title: 'Fintech & Digital Wallet Apps', desc: 'PCI-DSS compliant mobile banking interfaces with biometric authentication and NFC tap-to-pay.' },
      { title: 'Healthcare Patient Portals', desc: 'HIPAA-compliant telemedicine platforms with WebRTC video calling and medical records encryption.' },
      { title: 'On-Demand Delivery & Fleet Apps', desc: 'Real-time WebSocket geospatial tracking, dynamic routing, and driver dispatch telemetry.' },
      { title: 'IoT Companion Mobile Apps', desc: 'Bluetooth Low Energy (BLE) scanning, pairing, and firmware over-the-air (FOTA) updates.' },
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Fastlane', 'WatermelonDB'],
    industries: ['FinTech', 'Healthcare', 'Logistics', 'Retail', 'Travel & Hospitality'],
    useCases: [
      {
        title: 'Telehealth Mobile Consultation App',
        challenge: 'A national healthcare network needed an intuitive iOS & Android app supporting encrypted video calls in rural bandwidth.',
        solution: 'Built a React Native app with adaptive bitrate WebRTC and end-to-end encrypted chat architecture.',
        impact: 'Rated 4.9/5 stars across 45,000+ app store reviews, supporting 1.2M completed virtual patient visits.',
      },
    ],
    faqs: [
      { question: 'Should we build cross-platform or native?', answer: 'For 85% of commercial applications, modern React Native or Flutter delivers identical performance while cutting engineering budgets and time-to-market in half. We recommend native when deep Bluetooth or custom graphics shaders are required.' },
    ],
  },
  {
    id: 'saas-cloud-devops',
    slug: 'saas-cloud-devops',
    title: 'SaaS, Cloud & DevOps',
    category: 'Cloud & Infrastructure',
    badge: 'Enterprise Grade',
    iconName: 'Cloud',
    shortDesc: 'Cloud-native infrastructure, Kubernetes container orchestration, multi-tenant SaaS architecture, and 99.99% uptime CI/CD.',
    fullDesc: 'Architect elastic, bulletproof cloud backbones on AWS, GCP, and Azure. We empower organizations to deploy code hundreds of times per week with zero downtime, automated rollbacks, and SOC2-compliant security guardrails.',
    capabilities: [
      { title: 'Kubernetes & Container Orchestration', desc: 'Production EKS/GKE clusters configured with Istio service mesh, Karpenter autoscaling, and zero trust.', icon: 'Boxes' },
      { title: 'Infrastructure as Code (IaC)', desc: '100% reproducible environments provisioned via Terraform, OpenTofu, and Pulumi.', icon: 'Code' },
      { title: 'Multi-Tenant SaaS Foundation', desc: 'Tenant isolation architectures, schema-per-tenant, billing webhooks, and metered usage analytics.', icon: 'Layers' },
      { title: 'FinOps & Cloud Cost Optimization', desc: 'Detailed cost visibility, spot instance integration, and reserved capacity strategies cutting cloud waste.', icon: 'DollarSign' },
    ],
    subServices: [
      { title: 'AWS / GCP Architecture Assessment', desc: 'Well-Architected Framework reviews identifying security gaps, latency bottlenecks, and over-provisioned VMs.' },
      { title: 'Zero-Downtime Database Migrations', desc: 'Replication pipelines migrating terabyte datasets with zero data loss or service disruption.' },
      { title: 'Automated CI/CD Delivery Pipelines', desc: 'Trunk-based GitHub Actions and ArgoCD GitOps pipelines with vulnerability scanning.' },
      { title: '24/7 SRE & Observability', desc: 'Prometheus, Grafana, Datadog alerts, and automated runbooks maintaining strict 99.99% SLAs.' },
    ],
    technologies: ['AWS', 'Google Cloud', 'Microsoft Azure', 'Docker', 'Kubernetes', 'Terraform', 'ArgoCD', 'Prometheus'],
    industries: ['SaaS', 'FinTech', 'E-commerce', 'Media', 'Manufacturing'],
    useCases: [
      {
        title: 'Global SaaS Multi-Region Migration',
        challenge: 'A fast-growing HR SaaS platform suffered frequent database connection limits during European and US morning overlaps.',
        solution: 'Migrated monolithic database to distributed Aurora MySQL with connection pooling and regional Kubernetes auto-clusters.',
        impact: 'Achieved 99.995% uptime, 0ms noticeable latency globally, and absorbed 5x user growth without headcount expansion.',
      },
    ],
    faqs: [
      { question: 'Can you help us achieve SOC2 and ISO compliance?', answer: 'Yes, our DevOps engineers establish automated IaC policies, immutable audit logs, encrypted KMS keys, and continuous compliance monitors required for SOC2 Type II.' },
    ],
  },
  {
    id: 'data-analytics',
    slug: 'data-analytics',
    title: 'Big Data & Analytics',
    category: 'Data Engineering',
    badge: 'Enterprise Scale',
    iconName: 'BarChart3',
    shortDesc: 'Modern data stack, real-time streaming pipelines, lakehouse architectures, and automated executive business intelligence.',
    fullDesc: 'Transform fragmented organizational silos into unified, high-octane analytical engines. We build modern lakehouse architectures using Snowflake, Databricks, and Apache Iceberg that empower leaders to make confident data-driven decisions.',
    capabilities: [
      { title: 'Lakehouse & Modern Data Warehouse', desc: 'Scalable data models in Snowflake, BigQuery, and Databricks with column-level security and fast querying.', icon: 'Database' },
      { title: 'Streaming Data Pipelines', desc: 'Sub-second event ingestion with Apache Kafka, Flink, and dbt providing real-time operational metrics.', icon: 'Activity' },
      { title: 'Reverse ETL & Operational Analytics', desc: 'Pushing processed business intelligence directly back into Salesforce, HubSpot, and internal admin panels.', icon: 'Share2' },
      { title: 'Executive BI Dashboards', desc: 'Tailored PowerBI, Tableau, and embedded custom React analytics dashboards with self-service filtering.', icon: 'PieChart' },
    ],
    subServices: [
      { title: 'Data Warehouse Migration', desc: 'Migrating obsolete on-premise Oracle / SQL Server databases to modern cloud architectures.' },
      { title: 'Data Quality & Anomaly Testing', desc: 'Great Expectations and Monte Carlo data observability preventing broken reports from reaching stakeholders.' },
      { title: 'Customer 360 & Attribution', desc: 'Unified identity resolution tracking omnichannel touchpoints from first click to repeat retention.' },
      { title: 'AI Feature Pipelines', desc: 'Real-time feature generation feeds for continuous machine learning model inference.' },
    ],
    technologies: ['Snowflake', 'Databricks', 'Apache Kafka', 'dbt', 'BigQuery', 'Apache Spark', 'Airflow'],
    industries: ['FinTech', 'E-commerce', 'Healthcare', 'Logistics', 'Retail'],
    useCases: [
      {
        title: 'Omnichannel Customer 360 Lakehouse',
        challenge: 'A retail brand with 300 physical stores and 4 e-commerce domains lacked unified inventory and loyalty analytics.',
        solution: 'Implemented a Snowflake and dbt lakehouse processing 50M daily POS events and transactional logs.',
        impact: 'Unified 12M customer profiles, enabled real-time inventory re-routing, and lifted cross-sell conversions by 28%.',
      },
    ],
    faqs: [
      { question: 'How do you handle sensitive customer PII?', answer: 'We implement automated tokenization and masking policies at the ingestion layer, ensuring data scientists query anonymized datasets while preserving analytical utility.' },
    ],
  },
  {
    id: 'iot-solutions',
    slug: 'iot-solutions',
    title: 'IoT & Connected Devices',
    category: 'Hardware & Systems',
    badge: 'Smart Hardware',
    iconName: 'Cpu',
    shortDesc: 'End-to-end IoT firmware, MQTT telemetry broker architectures, digital twins, and industrial remote asset management.',
    fullDesc: 'Connect physical assets to the digital world. Avora engineers industrial IoT solutions that ingest gigabytes of sensor telemetry, detect equipment failure before it happens, and enable secure over-the-air fleet management.',
    capabilities: [
      { title: 'High-Throughput MQTT Brokers', desc: 'EMQX and AWS IoT Core clusters capable of handling 1,000,000+ concurrent connected sensor nodes.', icon: 'Radio' },
      { title: 'Predictive Maintenance Engines', desc: 'Vibration, temperature, and current frequency anomaly detection preventing catastrophic industrial downtime.', icon: 'Wrench' },
      { title: 'Digital Twins & 3D Telemetry', desc: 'Interactive three-dimensional representations of factories and fleet equipment with real-time sensor overlays.', icon: 'Box' },
      { title: 'Firmware Over-The-Air (FOTA)', desc: 'Cryptographically signed delta update mechanisms ensuring safe edge hardware updates without bricking.', icon: 'Download' },
    ],
    subServices: [
      { title: 'Industrial SCADA / PLC Integration', desc: 'Bridging legacy Modbus, OPC-UA, and CAN bus protocols into modern cloud event hubs.' },
      { title: 'Smart Building & Energy Management', desc: 'Automated HVAC, lighting, and occupancy monitoring systems reducing carbon footprints.' },
      { title: 'Asset Tracking & Cold-Chain Telemetry', desc: 'Cellular/LoRaWAN sensor tags logging continuous temperature and geolocation for pharmaceuticals.' },
      { title: 'Edge Microcontroller Firmware', desc: 'Low-power C/C++ and Rust firmware for ESP32, STM32, and Nordic nRF chips with deep sleep cycles.' },
    ],
    technologies: ['AWS IoT Core', 'EMQX', 'MQTT', 'Rust', 'C/C++', 'Grafana', 'InfluxDB'],
    industries: ['Smart Manufacturing', 'Logistics', 'Healthcare', 'Energy & Utilities'],
    useCases: [
      {
        title: 'Global Cold-Chain Pharmaceutical Telemetry',
        challenge: 'A vaccine distributor suffered $8M in spoiled shipments due to unmonitored temperature breaches in transit.',
        solution: 'Built a cellular LoRaWAN tracking gateway streaming tamper-evident temperature logs to an encrypted cloud portal.',
        impact: 'Spoilage dropped to zero across 140,000 shipments, passing strict FDA Title 21 CFR Part 11 validation.',
      },
    ],
    faqs: [
      { question: 'What battery life can be expected for battery-powered remote sensors?', answer: 'Using optimized power states and event-driven wakeups, our hardware and firmware designs regularly achieve 3 to 7 years on a single LiSOCl2 cell.' },
    ],
  },
  {
    id: 'blockchain-web3',
    slug: 'blockchain-web3',
    title: 'Blockchain & Web3',
    category: 'Decentralized Tech',
    badge: 'Enterprise Web3',
    iconName: 'Link',
    shortDesc: 'Audited smart contracts, asset tokenization, decentralized identity (DID), and private enterprise permissioned ledgers.',
    fullDesc: 'Leverage blockchain technology where immutable trust, cryptographic proof, and verifiable provenance are essential. Avora builds production dApps and private Hyperledger networks that withstand the highest security scrutiny.',
    capabilities: [
      { title: 'Smart Contract Architecture & Auditing', desc: 'Solidity and Rust smart contracts designed with OpenZeppelin standards and formal verification.', icon: 'CheckSquare' },
      { title: 'Real-World Asset (RWA) Tokenization', desc: 'Compliant tokenization frameworks for commercial real estate, debt instruments, and commodities.', icon: 'FileSpreadsheet' },
      { title: 'Permissioned Ledgers (Hyperledger)', desc: 'Consortium blockchain networks for multi-party trade settlement and transparent supply chain provenance.', icon: 'Shield' },
      { title: 'Decentralized Identity (DID)', desc: 'W3C verifiable credentials empowering users with self-sovereign identity and instant KYC verification.', icon: 'UserCheck' },
    ],
    subServices: [
      { title: 'Cross-Chain Bridge & Oracle Integration', desc: 'Secure Chainlink oracle feeds and CCIP cross-chain messaging without single points of failure.' },
      { title: 'Zero-Knowledge Proofs (ZKP)', desc: 'Privacy-preserving cryptographic validation allowing compliance checks without revealing sensitive inputs.' },
      { title: 'Web3 Wallet & Account Abstraction (ERC-4337)', desc: 'Frictionless Web2-style onboarding with social login, gasless transactions, and passkey security.' },
      { title: 'Smart Contract Formal Audits', desc: 'Automated fuzzing, symbolic execution, and manual bytecode audits preventing re-entrancy exploits.' },
    ],
    technologies: ['Solidity', 'Rust', 'Ethers.js', 'Hardhat', 'Hyperledger Besu', 'Chainlink', 'Polygon', 'Arbitrum'],
    industries: ['FinTech', 'Real Estate', 'Logistics', 'Gaming', 'Supply Chain'],
    useCases: [
      {
        title: 'Institutional Commercial Real Estate Tokenization',
        challenge: 'A private equity firm required liquid fractionalization of a $120M commercial tower portfolio for accredited investors.',
        solution: 'Constructed an ERC-3643 compliant permissioned tokenization protocol with automated KYC and dividend distributions.',
        impact: 'Attracted 4,200 international accredited investors and shortened transaction settlement time from 60 days to 4 seconds.',
      },
    ],
    faqs: [
      { question: 'Can blockchain integrate with our traditional ERP?', answer: 'Yes, we build bi-directional event bridges using WebSockets and secure webhook relays that sync blockchain events into SAP, Oracle, and Salesforce in real-time.' },
    ],
  },
  {
    id: 'ar-vr',
    slug: 'ar-vr',
    title: 'AR/VR & Spatial Computing',
    category: 'Immersive Tech',
    badge: 'Next Frontier',
    iconName: 'Eye',
    shortDesc: 'Immersive 3D environments, Apple Vision Pro spatial applications, virtual training simulations, and industrial WebXR.',
    fullDesc: 'Step inside the future of spatial computing. We engineer photorealistic virtual simulations, interactive digital twins, and enterprise AR applications that revolutionize employee training, collaborative design, and consumer commerce.',
    capabilities: [
      { title: 'Apple VisionOS & Spatial Apps', desc: 'SwiftUI and RealityKit applications that blend high-fidelity 3D assets with real-world spatial environments.', icon: 'Glasses' },
      { title: 'Immersive Training Simulations', desc: 'Hazardous environment industrial training modules with physics simulation and progress metrics.', icon: 'PlayCircle' },
      { title: 'WebXR & 3D Interactive Web', desc: 'Three.js and React Three Fiber interactive 3D product visualizers running natively inside standard web browsers.', icon: 'Compass' },
      { title: 'Industrial Remote Assistance AR', desc: 'Wearable AR headsets (HoloLens, Magic Leap) overlaying step-by-step assembly schematics for technicians.', icon: 'LifeBuoy' },
    ],
    subServices: [
      { title: 'Photorealistic 3D Asset Optimization', desc: '3D scanning, polygon reduction, and PBR texturing optimized for mobile 90 FPS rendering.' },
      { title: 'Virtual Showrooms & Virtual Real Estate', desc: 'Spatial walkthroughs allowing global buyers to tour architectural properties before breaking ground.' },
      { title: 'Medical Surgical Virtual Planning', desc: 'DICOM MRI scan conversion into interactable 3D holograms for pre-operative procedural rehearsal.' },
      { title: 'Unity & Unreal Engine Enterprise Systems', desc: 'Bespoke enterprise simulation software utilizing Unreal Engine 5 Nanite and Lumen rendering.' },
    ],
    technologies: ['VisionOS', 'Three.js', 'Unity', 'Unreal Engine 5', 'WebXR', 'RealityKit', 'Blender'],
    industries: ['Healthcare', 'Real Estate', 'Smart Manufacturing', 'Education', 'Retail'],
    useCases: [
      {
        title: 'Aviation Maintenance AR Diagnostics',
        challenge: 'Aircraft maintenance technicians spent 35% of their working hours cross-referencing paper manuals and schematics.',
        solution: 'Developed an AR spatial application overlaying wiring diagrams and torque specifications directly onto jet turbines.',
        impact: 'Maintenance cycle duration decreased by 41%, with assembly errors dropping to statistical zero.',
      },
    ],
    faqs: [
      { question: 'Do users need dedicated headsets or can they use smartphones?', answer: 'We build both dedicated headset applications (Apple Vision Pro, Meta Quest 3) and smartphone AR (ARKit / ARCore) accessible to billions of regular iOS and Android users.' },
    ],
  },
];

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: 'fintech',
    slug: 'fintech',
    title: 'FinTech & Banking',
    subtitle: 'Next-Generation Financial Infrastructure & Algorithmic Security',
    iconName: 'Landmark',
    overview: 'Avora builds bank-grade financial platforms, digital wallets, automated loan underwriting pipelines, and ultra-low-latency algorithmic trading systems that comply with global PCI-DSS, SOC2, and open-banking directives.',
    keyStats: [
      { value: '$45B+', label: 'Annual Transactions Processed' },
      { value: '99.999%', label: 'System Availability SLA' },
      { value: '<15ms', label: 'Fraud Detection Latency' },
      { value: '4.8M+', label: 'End User Accounts' },
    ],
    solutions: [
      {
        title: 'Core Digital Banking Systems',
        desc: 'Modular, API-first ledger backbones supporting multi-currency accounts, instant transfers, and card issuing.',
        features: ['Automated KYC/AML verification', 'Real-time ledger reconciliation', 'Virtual and physical card provisioning', 'SWIFT & SEPA payment rail integration'],
      },
      {
        title: 'AI Loan Origination & Credit Scoring',
        desc: 'Automated underwriting algorithms analyzing alternative data signals to deliver instant loan approvals with reduced default rates.',
        features: ['Explainable credit risk scoring', 'Income verification via Plaid', 'Automated loan agreement generation', 'Continuous portfolio health monitoring'],
      },
      {
        title: 'Algorithmic Trading & WealthTech',
        desc: 'Personalized robo-advisory platforms, portfolio rebalancing engines, and real-time market data streaming terminals.',
        features: ['Tax-loss harvesting automations', 'Fractional shares execution', 'High-frequency order routing', 'Personalized financial health dashboards'],
      },
    ],
    servicesOffered: ['AI & Machine Learning', 'Enterprise Web Development', 'Mobile App Development', 'Blockchain & Web3', 'SaaS, Cloud & DevOps'],
    technologies: ['Next.js', 'Go', 'MariaDB', 'PostgreSQL', 'Kafka', 'Redis', 'Docker', 'Kubernetes'],
    useCases: [
      {
        client: 'Global Neo-Bank',
        outcome: 'Launched an enterprise mobile banking experience with zero downtime over 24 months.',
        metrics: '1.2M active users in 9 months, $2.8B deposit volume processed.',
      },
    ],
    faqs: [
      { question: 'How do you ensure compliance with financial regulations?', answer: 'We engineer compliance into code from day one: end-to-end encryption in transit and at rest, immutable audit logging, PCI-DSS Level 1 compliant architectures, and automated GDPR/CCPA data handling.' },
    ],
  },
  {
    id: 'healthcare',
    slug: 'healthcare',
    title: 'Healthcare & Life Sciences',
    subtitle: 'HIPAA-Compliant Digital Health, AI Diagnostics & Telemedicine',
    iconName: 'HeartPulse',
    overview: 'Empowering health systems, biotech innovators, and medical device manufacturers with patient-centric digital portals, clinical trial software, and deep learning diagnostic imaging engines.',
    keyStats: [
      { value: '100%', label: 'HIPAA & HL7/FHIR Compliance' },
      { value: '12M+', label: 'Patient Encounters Streamlined' },
      { value: '99.4%', label: 'AI Diagnostic Precision' },
      { value: '65%', label: 'Clinical Documentation Time Saved' },
    ],
    solutions: [
      {
        title: 'Telemedicine & Remote Patient Monitoring (RPM)',
        desc: 'Encrypted WebRTC telehealth platforms connected to wearable vital monitors with automated triage alerting.',
        features: ['HIPAA-compliant video & messaging', 'Continuous vitals Bluetooth ingestion', 'Automated physician scheduling', 'EHR electronic prescription integration'],
      },
      {
        title: 'AI Medical Imaging & Computer Vision',
        desc: 'Deep learning models that assist radiologists by pre-screening chest X-rays, MRIs, and CT scans for anomalies.',
        features: ['DICOM viewer integration', 'Pixel-level lesion segmentation', 'Differential diagnosis suggestions', 'FDA SAMD compliant validation data'],
      },
      {
        title: 'EHR/EMR Interoperability & FHIR Pipelines',
        desc: 'Unified health data exchange pipelines connecting Epic, Cerner, and AthenaHealth into single longitudinal records.',
        features: ['Fast Healthcare Interoperability Resources (FHIR) API', 'HL7 v2 message parsing', 'Automated patient matching', 'Encrypted data warehousing'],
      },
    ],
    servicesOffered: ['AI & Machine Learning', 'Mobile App Development', 'Generative AI & LLMs', 'IoT & Connected Devices', 'Big Data & Analytics'],
    technologies: ['React Native', 'Python', 'PyTorch', 'WebRTC', 'AWS HealthLake', 'FastAPI'],
    useCases: [
      {
        client: 'National Hospital Network',
        outcome: 'Implemented an AI clinical notes assistant that drafts discharge summaries from ambient physician-patient conversations.',
        metrics: 'Saved 2.4 hours per clinician per shift, reducing burnout by 58%.',
      },
    ],
    faqs: [
      { question: 'Are your healthcare solutions HIPAA and GDPR certified?', answer: 'Yes, our infrastructure patterns feature BAA signing capabilities, dedicated encrypted databases, role-based access control, and comprehensive audit logs.' },
    ],
  },
  {
    id: 'real-estate',
    slug: 'real-estate',
    title: 'Real Estate & PropTech',
    subtitle: 'Intelligent Property Portals, Virtual Spatial Tours & Asset Management',
    iconName: 'Building',
    overview: 'Revolutionizing property development, commercial leasing, and asset management with MLS integrations, automated tenant onboarding, and 3D spatial walkthroughs.',
    keyStats: [
      { value: '$18B+', label: 'Property Asset Value Managed' },
      { value: '450k+', label: 'Active Real Estate Listings' },
      { value: '3.8x', label: 'Higher Inbound Lead Conversion' },
      { value: '90%', label: 'Automated Lease Generation' },
    ],
    solutions: [
      {
        title: 'PropTech Marketplaces & MLS Portals',
        desc: 'Lightning-fast property search portals with interactive map layers, school zone data, and mortgage affordability calculators.',
        features: ['RETS and RESO Web API synchronization', 'Predictive property valuation (AVM)', 'Neighborhood amenity telemetry', 'Direct agent chat & tour booking'],
      },
      {
        title: 'Automated Property & Tenant Management',
        desc: 'All-in-one dashboards for rent collection, maintenance request ticket routing, and electronic lease signing.',
        features: ['Automated ACH rent processing', 'Vendor dispatch work-order manager', 'Tenant credit & background screening', 'Financial P&L reporting per property'],
      },
      {
        title: 'Spatial 3D & Digital Twin Showrooms',
        desc: 'Photorealistic virtual walkthroughs allowing global buyers to tour architectural properties before construction finishes.',
        features: ['Three.js interactive web floorplans', 'Matterport API integration', 'Virtual furniture staging', 'Apple Vision Pro spatial tours'],
      },
    ],
    servicesOffered: ['Enterprise Web Development', 'Mobile App Development', 'AR/VR & Spatial Computing', 'Blockchain & Web3'],
    technologies: ['Next.js', 'TypeScript', 'Mapbox GL', 'Three.js', 'MariaDB', 'Stripe'],
    useCases: [
      {
        client: 'Commercial REIT Portfolio',
        outcome: 'Consolidated 45 commercial properties into a unified digital leasing portal with dynamic pricing.',
        metrics: 'Vacancy rates dropped by 34%, leasing velocity accelerated by 2.6x.',
      },
    ],
    faqs: [
      { question: 'Can Avora integrate with regional MLS feeds?', answer: 'Yes, we have deep experience integrating RESO Web API, Bridge Interactive, and MLS grid protocols with automated hourly catalog refreshes.' },
    ],
  },
  {
    id: 'ecommerce',
    slug: 'ecommerce',
    title: 'E-commerce & Omnichannel Retail',
    subtitle: 'High-Volume Headless Commerce, AI Personalization & Real-time Inventory',
    iconName: 'ShoppingBag',
    overview: 'Engineering frictionless shopping experiences that convert. We build headless commerce platforms that handle massive flash-sale traffic spikes, personalized recommendation feeds, and unified omnichannel inventory.',
    keyStats: [
      { value: '120k+', label: 'Peak Checkout Req/Second' },
      { value: '32%', label: 'Average Order Value Lift' },
      { value: '0.68s', label: 'Global LCP Page Speed' },
      { value: '48%', label: 'Reduction in Cart Abandonment' },
    ],
    solutions: [
      {
        title: 'Headless Modern Storefronts',
        desc: 'Decoupled Next.js frontends powered by Shopify Plus, commercetools, or custom MariaDB backends for unbeatable page speed.',
        features: ['Sub-second catalog browsing', 'Multi-currency and localized checkout', 'One-click Apple Pay & Google Pay', 'Dynamic merchandising rules'],
      },
      {
        title: 'AI Recommendation & Personalization Engines',
        desc: 'Collaborative filtering and visual similarity models that predict customer preferences in real-time.',
        features: ['Real-time cross-sell product bundles', 'Personalized homepages per shopper cohort', 'Dynamic discount incentives', 'Predictive search autocomplete'],
      },
      {
        title: 'Omnichannel Inventory & Warehouse Sync',
        desc: 'Real-time synchronization across physical retail POS, Shopify, Amazon, and third-party logistics fulfillment centers.',
        features: ['BOPIS (Buy Online, Pick Up In Store)', 'Automated split-shipment optimization', 'Stockout prediction alerts', 'Automated supplier re-ordering'],
      },
    ],
    servicesOffered: ['Enterprise Web Development', 'Mobile App Development', 'AI & Machine Learning', 'Big Data & Analytics'],
    technologies: ['Next.js', 'React 19', 'Tailwind CSS', 'Shopify Storefront API', 'Algolia', 'Redis'],
    useCases: [
      {
        client: 'Luxury Fashion Brand',
        outcome: 'Migrated from an old monolithic Magento build to headless Next.js App Router.',
        metrics: 'LCP improved from 4.2s to 0.65s, Black Friday checkout revenue grew 76% year-over-year without a single dropped order.',
      },
    ],
    faqs: [
      { question: 'Can you migrate our existing store without losing SEO rankings or customer data?', answer: 'Absolutely. We execute zero-loss migrations including 301 redirect mapping, customer password preservation, order history migration, and canonical tag continuity.' },
    ],
  },
  {
    id: 'education',
    slug: 'education',
    title: 'Education & EdTech',
    subtitle: 'Adaptive Learning Engines, Virtual Classrooms & Student Analytics',
    iconName: 'GraduationCap',
    overview: 'Transforming modern education with AI-driven adaptive learning pathways, gamified student portals, interactive proctored exams, and scalable LMS platforms.',
    keyStats: [
      { value: '3.5M+', label: 'Active Students Enrolled' },
      { value: '42%', label: 'Improvement in Course Completion' },
      { value: '98%', label: 'Automated Grading Accuracy' },
      { value: '500k+', label: 'Simultaneous Exam Concurrents' },
    ],
    solutions: [
      {
        title: 'Adaptive Learning & Tutoring AI',
        desc: 'AI tutors that dynamically adjust difficulty, provide step-by-step guidance, and pinpoint conceptual gaps.',
        features: ['Generative practice problem generation', 'Voice-enabled conversational language tutors', 'Spaced repetition flashcard engines', 'Real-time mastery heatmaps'],
      },
      {
        title: 'Enterprise Learning Management Systems (LMS)',
        desc: 'Scalable LMS platforms supporting SCORM/xAPI packages, multi-tier corporate hierarchies, and video streaming.',
        features: ['Interactive video player with in-stream quizzes', 'Automated certificate issuance', 'Role-based training compliance paths', 'Group collaborative study rooms'],
      },
    ],
    servicesOffered: ['Enterprise Web Development', 'Generative AI & LLMs', 'Mobile App Development', 'SaaS, Cloud & DevOps'],
    technologies: ['Next.js', 'Python', 'WebRTC', 'AWS MediaLive', 'MariaDB'],
    useCases: [
      {
        client: 'Global EdTech Unicorn',
        outcome: 'Engineered an AI adaptive learning engine for high school STEM curricula.',
        metrics: 'Engaged 850,000 active students and boosted standardized test scores by 26 percentiles.',
      },
    ],
    faqs: [
      { question: 'Do your platforms support SCORM and LTI standards?', answer: 'Yes, our LMS architectures comply fully with SCORM 1.2 / 2004, xAPI (Tin Can), and LTI 1.3 standards.' },
    ],
  },
  {
    id: 'logistics',
    slug: 'logistics',
    title: 'Logistics & Supply Chain',
    subtitle: 'Autonomous Dispatch, Route Optimization & Cold-Chain Telemetry',
    iconName: 'Truck',
    overview: 'Building intelligent digital supply chains that eliminate empty miles, predict maritime and road disruptions, and automate warehouse fulfillment from end to end.',
    keyStats: [
      { value: '28%', label: 'Fuel & Fleet Cost Reduction' },
      { value: '99.8%', label: 'On-Time Delivery SLA' },
      { value: '450k+', label: 'Daily Shipments Tracked' },
      { value: '$14M', label: 'Annual Operational Savings' },
    ],
    solutions: [
      {
        title: 'AI Route & Fleet Optimization',
        desc: 'Dynamic vehicle routing algorithms balancing traffic conditions, fuel efficiency, driver duty limits, and delivery windows.',
        features: ['Multi-stop TSP algorithmic solver', 'Live driver mobile app dispatch', 'Geofencing arrival/departure triggers', 'Fuel consumption telemetry'],
      },
      {
        title: 'Warehouse Management & Automated Sorting (WMS)',
        desc: 'Modern tablet and barcode scanner software optimizing pick-pack-ship sequences and pallet slotting.',
        features: ['Real-time 2D/3D warehouse mapping', 'Barcode & RFID scan validation', 'Automated carrier label printing', 'Cycle counting workflows'],
      },
    ],
    servicesOffered: ['AI & Machine Learning', 'IoT & Connected Devices', 'Mobile App Development', 'Enterprise Web Development'],
    technologies: ['Go', 'Node.js', 'React Native', 'Redis', 'MariaDB', 'PostGIS'],
    useCases: [
      {
        client: 'International Freight Forwarder',
        outcome: 'Built an end-to-end container shipment portal tracking maritime vessels and customs clearance.',
        metrics: 'Reduced customer support inquiry volume by 72% and saved 14,000 administrative hours yearly.',
      },
    ],
    faqs: [
      { question: 'Can the driver mobile app work offline in remote transit corridors?', answer: 'Yes, our mobile apps store offline queues in local encrypted databases and seamlessly synchronize telemetry once cellular signal reconnects.' },
    ],
  },
  {
    id: 'travel',
    slug: 'travel',
    title: 'Travel & Hospitality',
    subtitle: 'Frictionless Booking Engines, Guest Apps & Loyalty Ecosystems',
    iconName: 'Compass',
    overview: 'Crafting memorable travel journeys with AI itinerary creators, GDS booking integrations, contactless hotel check-in apps, and dynamic room revenue management.',
    keyStats: [
      { value: '8.4M+', label: 'Hotel & Flight Bookings' },
      { value: '45%', label: 'Direct Booking Growth' },
      { value: '4.9/5', label: 'Average Guest Mobile Rating' },
      { value: '3.2s', label: 'Average Booking Completion' },
    ],
    solutions: [
      {
        title: 'Central Reservation & Booking Engines (CRS)',
        desc: 'Lightning-fast booking funnels integrating Amadeus, Sabre, and direct hotel property management systems (PMS).',
        features: ['Dynamic package bundling (Flight + Hotel + Car)', 'Real-time room inventory holds', 'Multi-currency checkout', 'Loyalty tier point redemptions'],
      },
      {
        title: 'Digital Key & Contactless Hotel Apps',
        desc: 'Mobile guest portals allowing pre-arrival check-in, digital room key opening via BLE/NFC, and instant concierge requests.',
        features: ['Mobile Bluetooth room access', 'In-app room service ordering', 'Automated folio bill settlement', 'Real-time messaging with front desk'],
      },
    ],
    servicesOffered: ['Mobile App Development', 'Enterprise Web Development', 'Generative AI & LLMs', 'SaaS, Cloud & DevOps'],
    technologies: ['Next.js', 'React Native', 'TypeScript', 'Redis', 'MariaDB'],
    useCases: [
      {
        client: 'Boutique Luxury Hotel Chain',
        outcome: 'Engineered a bespoke guest companion app with mobile check-in and curated city itineraries.',
        metrics: 'Increased direct booking share by 38% while cutting front-desk check-in queues to under 30 seconds.',
      },
    ],
    faqs: [
      { question: 'Which Global Distribution Systems (GDS) do you support?', answer: 'We interface directly with Sabre, Amadeus, Travelport, and direct airline NDC APIs.' },
    ],
  },
  {
    id: 'manufacturing',
    slug: 'manufacturing',
    title: 'Smart Manufacturing & Industry 4.0',
    subtitle: 'Industrial IoT, Automated Inspection & Factory Floor Optimization',
    iconName: 'Factory',
    overview: 'Transitioning traditional factories into Industry 4.0 smart facilities with real-time OEE telemetry, machine vision defect inspection, and predictive maintenance.',
    keyStats: [
      { value: '38%', label: 'Reduction in Unplanned Downtime' },
      { value: '99.92%', label: 'Quality Inspection Accuracy' },
      { value: '22%', label: 'OEE Efficiency Gain' },
      { value: '60 FPS', label: 'Conveyor Vision Processing' },
    ],
    solutions: [
      {
        title: 'Industrial IoT Telemetry & OEE Analytics',
        desc: 'Connecting manufacturing machinery into real-time dashboards displaying Overall Equipment Effectiveness, cycle times, and scrap rates.',
        features: ['Modbus & OPC-UA PLC data extraction', 'Automated downtime reason tagging', 'Machine health predictive alerts', 'Energy consumption baselining'],
      },
      {
        title: 'Edge AI Visual Quality Inspection',
        desc: 'High-speed camera feeds running edge computer vision to flag micro-cracks, soldering flaws, and dimension errors.',
        features: ['Sub-millimeter anomaly detection', 'Automated pneumatic scrap ejection', 'Historical defect Pareto charts', 'Zero latency edge inference'],
      },
    ],
    servicesOffered: ['IoT & Connected Devices', 'AI & Machine Learning', 'Big Data & Analytics', 'AR/VR & Spatial Computing'],
    technologies: ['Python', 'C++', 'YOLOv10', 'EMQX', 'Grafana', 'MariaDB'],
    useCases: [
      {
        client: 'Automotive Component Manufacturer',
        outcome: 'Implemented predictive vibration telemetry across 180 robotic stamping presses.',
        metrics: 'Prevented 14 catastrophic bearing failures and avoided an estimated $6.2M in halted production lines.',
      },
    ],
    faqs: [
      { question: 'Can your platform connect with older legacy machinery without digital ports?', answer: 'Yes, we deploy non-invasive current transformers, vibration sensors, and secondary optical sensors connected to industrial edge gateways.' },
    ],
  },
  {
    id: 'media-entertainment',
    slug: 'media-entertainment',
    title: 'Media, Gaming & Entertainment',
    subtitle: 'Ultra-Low Latency Video Streaming, Interactive Gaming & Creator Platforms',
    iconName: 'Film',
    overview: 'Powering global media publishers, streaming services, and interactive gaming studios with adaptive bitrate video CDNs, DRM rights management, and real-time community experiences.',
    keyStats: [
      { value: '25M+', label: 'Concurrent Video Viewers' },
      { value: '<500ms', label: 'Global Glass-to-Glass Live Latency' },
      { value: '4K HDR', label: 'Dynamic Bitrate Transcoding' },
      { value: '99.99%', label: 'Broadcast Availability' },
    ],
    solutions: [
      {
        title: 'High-Scale Video On Demand (VOD) & Live OTT',
        desc: 'Carrier-grade streaming platforms with multi-DRM protection, server-side ad insertion (SSAI), and multi-device apps.',
        features: ['HLS and MPEG-DASH adaptive streaming', 'Widevine, FairPlay & PlayReady DRM', 'Dynamic ad insertion (SSAI)', 'Smart TV & Apple TV native apps'],
      },
      {
        title: 'Creator Economy & Monetization Platforms',
        desc: 'Interactive platforms supporting paid subscriptions, creator tipping, live chat moderation, and merchandise drops.',
        features: ['Low-latency WebSocket live chat', 'Stripe Connect creator payouts', 'Token-gated community access', 'Automated copyright audio scanning'],
      },
    ],
    servicesOffered: ['Enterprise Web Development', 'Mobile App Development', 'Generative AI & LLMs', 'Cloud & DevOps'],
    technologies: ['Next.js', 'React Native', 'AWS CloudFront', 'FFmpeg', 'WebSockets', 'MariaDB'],
    useCases: [
      {
        client: 'Sports Streaming Network',
        outcome: 'Built a live championship streaming platform with interactive stats overlay and real-time fan polling.',
        metrics: 'Streamed to 4.2M concurrent viewers during finals with zero buffer drops or stream interruptions.',
      },
    ],
    faqs: [
      { question: 'How do you prevent video piracy and screen capture?', answer: 'We implement hardware-backed multi-DRM (Apple FairPlay, Google Widevine Modular) paired with dynamic forensic watermarking.' },
    ],
  },
];

export const TECH_CATEGORIES: TechCategory[] = [
  {
    category: 'Frontend',
    slug: 'frontend',
    description: 'Modern, reactive, and lightning-fast user interfaces engineered for supreme Core Web Vitals.',
    items: [
      { name: 'React 19', icon: 'Atom', description: 'Concurrent mode, actions, and server-driven interactivity.', badge: 'Latest' },
      { name: 'Next.js 16', icon: 'Globe', description: 'App Router, Turbopack, and edge-rendered hybrid pipelines.', badge: 'Standard' },
      { name: 'TypeScript 5', icon: 'FileCode', description: 'Strict end-to-end type safety across application boundaries.', badge: 'Core' },
      { name: 'Tailwind CSS v4', icon: 'Palette', description: 'High-performance utility-first styling with zero runtime bloat.', badge: 'Modern' },
      { name: 'Framer Motion', icon: 'Sparkles', description: 'Smooth, physics-based 60 FPS UI transitions and interactions.', badge: 'UI/UX' },
      { name: 'Vue 3 / Nuxt', icon: 'Layers', description: 'Progressive reactivity for rapid enterprise portal development.', badge: 'Supported' },
    ],
  },
  {
    category: 'Backend',
    slug: 'backend',
    description: 'High-throughput microservices, scalable distributed APIs, and resilient business logic engines.',
    items: [
      { name: 'Node.js (v22)', icon: 'Server', description: 'Asynchronous event-driven server runtime for I/O intensive APIs.', badge: 'Core' },
      { name: 'Go (Golang)', icon: 'Cpu', description: 'Blazing fast compiled concurrency for sub-millisecond microservices.', badge: 'High Perf' },
      { name: 'Python FastAPI', icon: 'Terminal', description: 'High-performance ASGI framework for ML and data endpoints.', badge: 'AI-Ready' },
      { name: 'Java Spring Boot', icon: 'Boxes', description: 'Enterprise-grade rock-solid transactional architectures.', badge: 'Enterprise' },
      { name: 'GraphQL', icon: 'Share2', description: 'Flexible client-driven schema querying eliminating over-fetching.', badge: 'API' },
      { name: 'gRPC / Protobuf', icon: 'Network', description: 'Ultra-compact binary RPC for internal microservice communication.', badge: 'Distributed' },
    ],
  },
  {
    category: 'Mobile',
    slug: 'mobile',
    description: 'Fluid, intuitive iOS and Android applications developed for millions of daily active users.',
    items: [
      { name: 'React Native', icon: 'Smartphone', description: 'Near-native performance sharing 80%+ codebase between platforms.', badge: 'Cross-Platform' },
      { name: 'Flutter', icon: 'Tablet', description: 'Pixel-perfect Skia-rendered multi-platform UI engineering.', badge: 'Popular' },
      { name: 'Swift (iOS)', icon: 'Apple', description: 'Deep hardware acceleration, Metal graphics, and Apple Neural Engine.', badge: 'Native iOS' },
      { name: 'Kotlin (Android)', icon: 'Layers', description: 'Modern, concise Android engineering with Jetpack Compose.', badge: 'Native Android' },
      { name: 'Expo', icon: 'Rocket', description: 'Rapid mobile prototyping and seamless over-the-air updates.', badge: 'Velocity' },
    ],
  },
  {
    category: 'Database',
    slug: 'database',
    description: 'Enterprise relational databases, distributed vector indices, and ultra-fast in-memory caches.',
    items: [
      { name: 'MariaDB 3.5+', icon: 'Database', description: 'Enterprise relational database with connection pooling and packet compression.', badge: 'Primary DB' },
      { name: 'PostgreSQL', icon: 'HardDrive', description: 'Extensible SQL engine with PostGIS geospatial and pgvector support.', badge: 'Relational' },
      { name: 'Redis', icon: 'Zap', description: 'Sub-millisecond in-memory cache, pub/sub broker, and rate limiter.', badge: 'Caching' },
      { name: 'Pinecone Vector DB', icon: 'Brain', description: 'Managed vector index purpose-built for RAG and semantic search.', badge: 'AI Vector' },
      { name: 'Snowflake', icon: 'CloudRain', description: 'Elastic cloud data warehouse for petabyte-scale analytics.', badge: 'Lakehouse' },
      { name: 'MongoDB', icon: 'Grid', description: 'Flexible document store for rapid schema evolution.', badge: 'NoSQL' },
    ],
  },
  {
    category: 'Cloud',
    slug: 'cloud',
    description: 'Resilient multi-cloud architectures built for elasticity, auto-healing, and 99.99% uptime.',
    items: [
      { name: 'Amazon Web Services (AWS)', icon: 'Cloud', description: 'EKS, Lambda, S3, Aurora, CloudFront enterprise architectures.', badge: 'Tier 1' },
      { name: 'Google Cloud Platform (GCP)', icon: 'Globe', description: 'Vertex AI, BigQuery, and Google Kubernetes Engine (GKE).', badge: 'Tier 1' },
      { name: 'Microsoft Azure', icon: 'Server', description: 'Enterprise Active Directory, Azure OpenAI, and AKS clusters.', badge: 'Tier 1' },
      { name: 'Docker', icon: 'Boxes', description: 'Lightweight, reproducible containerization for all runtimes.', badge: 'Standard' },
      { name: 'Kubernetes (K8s)', icon: 'Network', description: 'Automated cluster scaling, self-healing, and service mesh.', badge: 'Orchestration' },
      { name: 'Terraform', icon: 'Code', description: 'Declarative Infrastructure as Code across multi-cloud footprints.', badge: 'IaC' },
    ],
  },
  {
    category: 'AI / ML',
    slug: 'aiml',
    description: 'Cutting-edge deep learning frameworks, transformer models, and autonomous agent loops.',
    items: [
      { name: 'PyTorch', icon: 'Cpu', description: 'Industry standard research and production deep learning framework.', badge: 'Core ML' },
      { name: 'TensorFlow', icon: 'Activity', description: 'Scalable model deployment with TFX and TensorRT acceleration.', badge: 'Production' },
      { name: 'LangChain & LlamaIndex', icon: 'Sparkles', description: 'Orchestration layers for complex enterprise RAG and LLM workflows.', badge: 'GenAI' },
      { name: 'vLLM & Ollama', icon: 'Server', description: 'High-throughput PagedAttention local inference serving.', badge: 'Optimization' },
      { name: 'Hugging Face', icon: 'Smile', description: 'Pre-trained foundation models, tokenizers, and model hubs.', badge: 'Ecosystem' },
      { name: 'CrewAI & AutoGPT', icon: 'Bot', description: 'Multi-agent coordination and recursive autonomous execution.', badge: 'Agents' },
    ],
  },
  {
    category: 'DevOps',
    slug: 'devops',
    description: 'Automated continuous integration, GitOps deployment pipelines, and 24/7 site reliability.',
    items: [
      { name: 'GitHub Actions', icon: 'GitBranch', description: 'Automated test suites, security scans, and deployment workflows.', badge: 'CI/CD' },
      { name: 'ArgoCD', icon: 'Rocket', description: 'Declarative GitOps continuous delivery for Kubernetes.', badge: 'GitOps' },
      { name: 'Prometheus & Grafana', icon: 'BarChart2', description: 'Real-time telemetry, visual metrics dashboards, and alert triggers.', badge: 'Monitoring' },
      { name: 'Datadog', icon: 'Activity', description: 'APM tracing, log management, and synthetic user monitoring.', badge: 'Observability' },
      { name: 'HashiCorp Vault', icon: 'Lock', description: 'Centralized secrets management, dynamic credentials, and KMS encryption.', badge: 'Security' },
    ],
  },
];

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: 'fintech-neobank-scale',
    slug: 'fintech-neobank-scale',
    title: 'Scaling a Tier-1 Neo-Bank to 4.8M Users with Real-Time AI Fraud Prevention',
    subtitle: 'Architecting a fault-tolerant financial platform with sub-15ms fraud interception SLA.',
    client: 'Apex Financial Technologies',
    industry: 'FinTech & Banking',
    heroImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    challenge: 'Apex Financial was experiencing exponential growth, processing over $120M in monthly volume. However, legacy monolithic services caused checkout latency spikes during paydays and an unacceptably high 1.8% fraudulent chargeback rate, resulting in severe card network penalties.',
    solution: 'Avora Innovations re-architected the core backend into event-driven microservices running on AWS EKS with MariaDB and Redis clustering. We engineered an inline Graph Neural Network fraud detector that evaluates 140+ behavioral signals in under 12ms before transaction authorization.',
    implementation: [
      'Decomposed monolithic PHP codebase into containerized Go and Node.js microservices.',
      'Implemented dual MariaDB master-replica topology with connection pooling handling 18,000 queries/sec.',
      'Built a sub-15ms inference service with PyTorch and Triton Inference Server.',
      'Deployed automated CI/CD via GitHub Actions with 100% test coverage and zero-downtime rolling deploys.',
      'Constructed a bespoke React 19 administrative portal with real-time transaction telemetry.',
    ],
    results: [
      { metric: '84%', label: 'Reduction in Fraudulent Chargebacks' },
      { metric: '$19.2M', label: 'Annual Capital Saved' },
      { metric: '99.999%', label: 'Uptime Maintained Over 18 Months' },
      { metric: '11ms', label: 'Average Transaction Inference Time' },
    ],
    technologies: ['Go', 'Node.js', 'MariaDB', 'PyTorch', 'AWS EKS', 'Redis', 'Kafka', 'React 19'],
    relatedServices: ['AI & Machine Learning', 'Enterprise Web Development', 'SaaS, Cloud & DevOps'],
    testimonial: {
      quote: 'Avora delivered an enterprise banking infrastructure that handled our 400% surge without a stutter. Their machine learning fraud engine paid for the entire project within the first 60 days.',
      author: 'Marcus Vance',
      role: 'Chief Technology Officer',
      company: 'Apex Financial Technologies',
    },
  },
  {
    id: 'healthtech-ai-diagnostics',
    slug: 'healthtech-ai-diagnostics',
    title: 'FDA-Compliant Medical Imaging AI Suite for 40+ Hospital Facilities',
    subtitle: 'Deep learning radiology assistant detecting acute pulmonary conditions with 99.4% precision.',
    client: 'CarePulse Health Systems',
    industry: 'Healthcare & Life Sciences',
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    challenge: 'Radiology departments across 40 hospital locations faced a severe backlog of emergency chest radiographs. Clinicians required an automated triaging system to instantly flag life-threatening anomalies such as pneumothorax and pulmonary embolism while adhering strictly to HIPAA guidelines.',
    solution: 'Engineered an edge-integrated computer vision pipeline that automatically ingests DICOM images from hospital PACS, runs vision transformers for anomaly segmentation, and generates preliminary diagnostic heatmaps directly inside the physician workflow.',
    implementation: [
      'Built a DICOM listener microservice that securely ingests scans via TLS 1.3 encryption.',
      'Trained an ensemble Vision Transformer model on 350,000 anonymized multi-institutional clinical scans.',
      'Engineered an interactive WebGL DICOM viewer compatible with desktop and iPad Pro hospital terminals.',
      'Passed rigorous third-party HIPAA, SOC2 Type II, and FDA 510(k) software-as-medical-device validations.',
    ],
    results: [
      { metric: '99.4%', label: 'Diagnostic Sensitivity' },
      { metric: '82%', label: 'Reduction in Emergency Triage Backlog' },
      { metric: '18 min', label: 'Average Turnaround vs 4.5 Hours Prior' },
      { metric: '40+', label: 'Hospitals Connected Live' },
    ],
    technologies: ['Python', 'PyTorch', 'FastAPI', 'WebGL', 'Docker', 'AWS HealthLake'],
    relatedServices: ['AI & Machine Learning', 'Enterprise Web Development', 'Mobile App Development'],
    testimonial: {
      quote: 'The clinical accuracy and speed of Avora’s solution has fundamentally changed emergency care across our network. Critical patients are now flagged in minutes rather than hours.',
      author: 'Dr. Elena Rostova',
      role: 'Chief Medical Officer',
      company: 'CarePulse Health Systems',
    },
  },
  {
    id: 'autonomous-supply-chain',
    slug: 'autonomous-supply-chain',
    title: 'Autonomous Fleet Telemetry & Predictive Routing for 12,000 Freight Vehicles',
    subtitle: 'Real-time IoT streaming pipeline eliminating empty miles and cutting logistics costs by $14M.',
    client: 'TransGlobal Logistics Corp',
    industry: 'Logistics & Supply Chain',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    challenge: 'TransGlobal operated a fleet of 12,000 trucks across North America with disconnected telematics systems. Empty deadhead miles averaged 22%, fuel waste was high, and dispatchers relied on manual phone check-ins during weather delays.',
    solution: 'Designed an IoT edge gateway and cloud streaming hub using EMQX and Apache Kafka that ingests GPS, OBD-II diagnostic, and cold-chain temperature telemetry at 10-second intervals. An autonomous routing algorithm continuously recalculates optimal paths based on live traffic, weather, and rest regulations.',
    implementation: [
      'Deployed robust MQTT brokers streaming 1.2M sensor payloads every minute.',
      'Built a high-performance React Native mobile companion app for long-haul drivers with offline turn-by-turn guidance.',
      'Engineered automated dispatch optimization algorithms reducing deadhead mileage.',
      'Constructed an executive web dashboard with real-time geospatial Mapbox visualization.',
    ],
    results: [
      { metric: '$14.2M', label: 'Direct Annual Fuel & Route Savings' },
      { metric: '68%', label: 'Reduction in Driver Dispatch Calls' },
      { metric: '99.8%', label: 'On-Time Delivery SLA Achieved' },
      { metric: '12,000+', label: 'Active Vehicles Connected' },
    ],
    technologies: ['React Native', 'Next.js', 'Go', 'Kafka', 'EMQX', 'MariaDB', 'Mapbox GL'],
    relatedServices: ['IoT & Connected Devices', 'AI & Machine Learning', 'Mobile App Development'],
  },
  {
    id: 'headless-global-retail',
    slug: 'headless-global-retail',
    title: 'Headless E-Commerce Platform Handling 120k Peak Checkout Req/Sec',
    subtitle: 'Sub-second omnichannel commerce architecture powering 14 global storefronts.',
    client: 'Velour Luxury Group',
    industry: 'E-commerce & Omnichannel Retail',
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    challenge: 'Velour’s legacy e-commerce platform crashed during two consecutive Cyber Monday events, resulting in estimated lost revenue exceeding $4M. Mobile page load speeds averaged 5.8 seconds, driving bounce rates over 48%.',
    solution: 'Architected a modular headless commerce ecosystem leveraging Next.js App Router, edge Redis caching, and localized multi-currency checkout. Re-platformed 14 international regional domains into a single unified code repository.',
    implementation: [
      'Engineered an edge-rendered Next.js frontend with incremental static regeneration (ISR).',
      'Integrated resilient checkout orchestrator handling Stripe, Apple Pay, Klarna, and WeChat Pay.',
      'Designed an automated inventory sync pipeline across 12 distribution centers and 85 flagship boutiques.',
      'Built an AI visual search feature allowing customers to upload outfit photos to find matching catalog items.',
    ],
    results: [
      { metric: '0.62s', label: 'Average Global LCP Page Speed' },
      { metric: '120k', label: 'Peak Checkout Transactions/Sec Tested' },
      { metric: '+142%', label: 'Mobile Conversion Rate Increase' },
      { metric: '100%', label: 'Uptime During Holiday Shopping Surge' },
    ],
    technologies: ['Next.js 16', 'React 19', 'Tailwind CSS', 'Redis', 'MariaDB', 'Stripe'],
    relatedServices: ['Enterprise Web Development', 'Mobile App Development', 'AI & Machine Learning'],
  },
  {
    id: 'enterprise-knowledge-copilot',
    slug: 'enterprise-knowledge-copilot',
    title: 'Enterprise AI Copilot & Knowledge Graph for 8,500 Global Engineers',
    subtitle: 'Zero-hallucination internal RAG system reducing developer onboarding time by 65%.',
    client: 'Novatech Engineering Global',
    industry: 'SaaS & Enterprise Tech',
    heroImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    challenge: 'Novatech’s 8,500 distributed software and hardware engineers spent an average of 9.2 hours per week searching through 15 years of fragmented Confluence wikis, Jira tickets, CAD schematics, and GitHub repositories.',
    solution: 'Engineered a private, air-gapped enterprise generative AI copilot using custom fine-tuned open-source models (Llama-3 70B) connected to a hybrid vector and graph database. The system answers engineering questions with verifiable line-item citations.',
    implementation: [
      'Ingested and parsed 4.2 million technical documents with automated OCR and AST parsing.',
      'Constructed a Neo4j knowledge graph linked with a high-speed Pinecone vector index.',
      'Implemented strict role-based access control (RBAC) ensuring employees only query documents matching their security clearance.',
      'Deployed an embedded desktop and IDE plugin allowing engineers to query internal code without leaving their editor.',
    ],
    results: [
      { metric: '65%', label: 'Reduction in New Engineer Onboarding Time' },
      { metric: '6.5 hrs', label: 'Weekly Productive Hours Reclaimed per Engineer' },
      { metric: '0.0%', label: 'Data Leakage to Public Cloud AI Vendors' },
      { metric: '96.2%', label: 'Positive Employee Answer Verification Rate' },
    ],
    technologies: ['Python', 'Llama-3', 'LangChain', 'Pinecone', 'Neo4j', 'FastAPI', 'Docker'],
    relatedServices: ['Generative AI & LLMs', 'Autonomous AI Agents', 'Enterprise Web Development'],
  },
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: 'agentic-ai-architectures-2026',
    slug: 'agentic-ai-architectures-2026',
    title: 'Architecting Autonomous Multi-Agent AI Systems: Beyond Simple LLM Prompting',
    excerpt: 'How modern engineering teams are replacing monolithic prompts with deterministic supervisor-worker agent topologies and persistent episodic memory graphs.',
    content: `
      <h2>The Shift from Prompt Engineering to Agentic Systems</h2>
      <p>In the early days of generative AI, software developers focused almost exclusively on prompt engineering—carefully crafting single-shot or few-shot context windows to coax a single large language model into performing a task. While effective for simple summarization or creative drafting, this paradigm breaks down completely when applied to multi-step enterprise business operations.</p>
      
      <p>Today, the gold standard for enterprise artificial intelligence is <strong>Agentic Architecture</strong>: networks of specialized, autonomous agents that collaborate, critique each other's outputs, call external deterministic APIs, and self-heal when unexpected exceptions occur.</p>

      <h2>Key Architectural Components</h2>
      <ul>
        <li><strong>Supervisor-Worker Hierarchy:</strong> A primary orchestrator agent decomposes user goals into an executable Directed Acyclic Graph (DAG) of subtasks, delegating each step to domain-specific worker agents.</li>
        <li><strong>Persistent Memory Graphs:</strong> Agents store intermediate facts, previous tool outputs, and environmental states in vector and key-value stores to maintain continuity across long-running tasks.</li>
        <li><strong>Deterministic Validation Gates:</strong> Rather than trusting model outputs blindly, agent actions pass through unit tests, schema validators, and human-in-the-loop review triggers before executing database writes.</li>
      </ul>

      <h2>Real-World Enterprise Outcomes</h2>
      <p>At Avora Innovations, our multi-agent customer operations and financial reconciliation platforms have achieved 94% autonomous task completion rates, compared to just 38% for traditional single-turn prompt chains. As models continue to improve in reasoning and tool-calling efficiency, multi-agent systems represent the single most transformative shift in corporate automation since the advent of cloud computing.</p>
    `,
    category: 'Artificial Intelligence',
    tags: ['AI Agents', 'LLM', 'Enterprise Architecture', 'Automation'],
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    authorName: 'Dr. Aris Thorne',
    authorRole: 'Head of AI Research, Avora Innovations',
    readTime: '6 min read',
    publishedAt: '2026-09-18',
    isFeatured: true,
  },
  {
    id: 'nextjs-16-turbopack-performance',
    slug: 'nextjs-16-turbopack-performance',
    title: 'Extreme Performance Engineering: Achieving Sub-Second Core Web Vitals with Next.js 16 and Turbopack',
    excerpt: 'A deep dive into Server Components, partial prerendering, and edge streaming strategies that deliver sub-0.7s Largest Contentful Paint worldwide.',
    content: `
      <h2>Why Web Performance is a Direct Revenue Driver</h2>
      <p>In modern digital commerce and enterprise SaaS, every 100 milliseconds of latency directly degrades user retention and conversion rates. When Google shifted its ranking algorithms to prioritize Core Web Vitals—specifically Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS)—performance ceased to be an engineering luxury and became a critical business imperative.</p>

      <h2>Harnessing Next.js 16 and Turbopack</h2>
      <p>The combination of Next.js 16, React 19, and the Turbopack compiler allows developers to achieve performance milestones previously impossible with legacy webpack setups:</p>
      <ul>
        <li><strong>Zero-Bundle-Size Server Components:</strong> Heavy dependencies like markdown parsers, syntax highlighters, and date utilities execute exclusively on the server, resulting in 0 KB added to the client JavaScript bundle.</li>
        <li><strong>Streaming SSR with Suspense:</strong> Critical page skeletons and hero text are delivered to the browser in under 50 milliseconds, while secondary data blocks stream in concurrently as async promises resolve.</li>
        <li><strong>Intelligent Image and Asset Optimization:</strong> Next-generation image formats (AVIF and WebP) with strict layout reservation prevent layout shifts entirely.</li>
      </ul>

      <h2>The Avora Engineering Benchmark</h2>
      <p>Across all enterprise client deployments, Avora mandates a minimum Google Lighthouse performance score of 95+ and an INP of under 50 milliseconds. By engineering for the edge from day one, we guarantee user experiences that feel instantaneous anywhere in the world.</p>
    `,
    category: 'Engineering',
    tags: ['Next.js', 'React 19', 'Performance', 'Web Development'],
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    authorName: 'Siddharth Patel',
    authorRole: 'Principal Web Architect, Avora Innovations',
    readTime: '5 min read',
    publishedAt: '2026-09-12',
    isFeatured: false,
  },
  {
    id: 'mariadb-enterprise-high-throughput',
    slug: 'mariadb-enterprise-high-throughput',
    title: 'High-Throughput Relational Architecture: Scaling MariaDB with Connection Pooling and Packet Compression',
    excerpt: 'Best practices for running MariaDB in mission-critical applications with Prisma ORM v7 and high-throughput connection pooling.',
    content: `
      <h2>The Enduring Strength of Relational Foundations</h2>
      <p>While NoSQL and vector databases capture headlines, relational databases remain the bedrock of global enterprise finance, ERP, and transactional commerce. MariaDB 3.5+ represents the pinnacle of open-source relational engineering, combining rock-solid ACID compliance with bleeding-edge thread pooling, columnstore analytical capabilities, and packet compression.</p>

      <h2>Architecting for High Concurrency</h2>
      <p>To support tens of thousands of concurrent requests without exhausting socket descriptors, modern architectures must leverage:</p>
      <ul>
        <li><strong>Connection Pooling:</strong> Reusing established TCP connections rather than incurring TLS handshake overhead on every query.</li>
        <li><strong>Packet Compression:</strong> Drastically reducing network bandwidth consumption between distributed app containers and database clusters.</li>
        <li><strong>Prisma 7 Driver Adapters:</strong> Utilizing low-overhead native driver adapters for direct query execution without intermediate abstraction penalties.</li>
      </ul>

      <p>By pairing MariaDB with strategic in-memory caching layers like Redis, enterprise applications achieve the elusive trifecta: mathematical correctness, infinite scale, and sub-millisecond query execution.</p>
    `,
    category: 'Database & Cloud',
    tags: ['MariaDB', 'Prisma', 'Database Architecture', 'Performance'],
    coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80',
    authorName: 'Klaus Reinhardt',
    authorRole: 'Lead Database Infrastructure Engineer',
    readTime: '7 min read',
    publishedAt: '2026-09-04',
    isFeatured: false,
  },
];

export const TESTIMONIALS_DATA = [
  {
    id: '1',
    quote: 'Avora Innovations completely reimagined our digital infrastructure. Their ability to bridge complex deep learning research with production-grade reliability is unlike any technology partner we have ever worked with.',
    author: 'Elena Rostova',
    role: 'Chief Medical Officer',
    company: 'CarePulse Health Systems',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '2',
    quote: 'Our Black Friday traffic surged 300%, and our Next.js storefront did not flinch once. Page loads were under 700ms across every country. Avora has earned our highest recommendation.',
    author: 'Jean-Luc Mercier',
    role: 'Global VP of Digital Commerce',
    company: 'Velour Luxury Group',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '3',
    quote: 'The AI fraud prevention engine Avora engineered for our neo-bank stopped 84% of chargebacks in the first month. They are fast, meticulous, and deeply technical.',
    author: 'Marcus Vance',
    role: 'Chief Technology Officer',
    company: 'Apex Financial Technologies',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '4',
    quote: 'We replaced an entire fragmented telematics stack with Avora’s unified IoT platform. The direct fuel and dispatch savings alone totaled over $14 million in year one.',
    author: 'Sarah Jenkins',
    role: 'VP of Global Operations',
    company: 'TransGlobal Logistics',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  },
];

export const FAQS_HOMEPAGE = [
  {
    question: 'How is Avora Innovations different from traditional IT consulting agencies?',
    answer: 'Unlike generic staffing agencies or traditional software consultancies that rely on outdated templates and junior developers, Avora is an elite engineering and AI product studio. Every architecture is custom-crafted by senior software architects and machine learning researchers using modern cloud-native frameworks (Next.js 16, React 19, MariaDB, PyTorch). We focus on verifiable business outcomes, intellectual property ownership, and extreme technical excellence.',
  },
  {
    question: 'What engagement models do you offer?',
    answer: 'We provide flexible engagement models tailored to your organizational maturity: (1) End-to-End Product Engineering (fixed milestone delivery from discovery to production launch), (2) Dedicated Innovation Squads (senior cross-functional teams augmenting your internal engineering), and (3) AI/Cloud Modernization Sprints (focused 4-to-8 week engagements to solve specific architecture or machine learning challenges).',
  },
  {
    question: 'How do you safeguard client intellectual property and data security?',
    answer: 'You retain 100% ownership of all source code, models, weights, and documentation created during our engagement upon invoice settlement. Our engineers adhere to strict non-disclosure agreements (NDAs), and all code is developed inside private client repositories compliant with SOC2 Type II, ISO 27001, and HIPAA protocols.',
  },
  {
    question: 'Can you help us migrate legacy monoliths to modern cloud-native architectures?',
    answer: 'Yes, legacy modernization is one of our flagship competencies. We utilize the Strangler Fig pattern to systematically decouple legacy monoliths (PHP, ASP.NET, Java, Oracle) into modern Next.js frontends and microservices without disrupting ongoing daily operations.',
  },
  {
    question: 'What is the typical timeline for an enterprise development engagement?',
    answer: 'Rapid prototypes and proofs-of-concept (POCs) typically ship in 2 to 4 weeks. Full-scale production-ready enterprise applications or AI platforms generally launch within 10 to 16 weeks, backed by continuous bi-weekly sprint demos and automated staging deployments.',
  },
];
