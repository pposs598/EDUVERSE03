export interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  abstract: string;
  year: number;
  doi: string;
  journal: string;
  ranking: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  impactFactor: number;
  tags: string[];
  citations: number;
  citedBy: string[];
  introduction?: string;
  methodology?: string;
  results?: string;
  conclusion?: string;
  url: string;
}

export interface LibraryBook {
  id: string;
  title: string;
  subject: string;
  author: string;
  type: 'Book' | 'Exam';
  downloadUrl: string;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  absent: number;
  leave: number;
  attended: number;
  late: number;
  conductScore: number;
  temperature: string;
  weight: number;
  bloodType: string;
  allergies: string;
}

export interface Homework {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  description: string;
}

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: "rp-1",
    title: "Understanding Climate Change: Mitigation Strategies & Energy Transformation",
    authors: "Dr. Elena Vance, Prof. James K.",
    abstract: "This paper analyzes global warning trends, greenhouse gas emissions, and climate change patterns. We present various energy transition models to curb carbon impact.",
    year: 2026,
    doi: "10.1038/nclimate2821",
    journal: "Nature Climate Change",
    ranking: "Q1",
    impactFactor: 42.5,
    tags: ["Climate Change", "Atmosphere", "Mitigation"],
    citations: 28,
    citedBy: ["rp-3", "rp-4"],
    introduction: "Since the industrial revolution, anthropogenically induced green-house gas concentrations have altered the Earth's radiative equilibrium. Carbon dioxide (CO2) levels have exceeded 420 parts per million (ppm) as of early 2026. This paper analyzes the systemic models required to execute a high-speed transition from fossil fuels to unified solar, wind, and secondary kinetic battery storage grids.",
    methodology: "We simulated 4 adaptive energy grids over a period of 120 months. Thermal sensors across 40 regional hubs compiled atmospheric telemetry. Carbon output was computed using specialized carbon-offset algorithms under diverse load variables.",
    results: "Implementing unified decentralized battery systems decreased grid instability by 44%. Transitioning to regional solar-kinetic arrays resulted in an actual reduction of over 1.2 gigatons of CO2 equivalent emissions per annum on virtual testing loops.",
    conclusion: "Rapid mitigation requires binding carbon protocols. Integrating Web3 smart carbon credits guarantees absolute transactional accuracy for decentralized states.",
    url: "https://www.nature.com/articles/nclimate2821"
  },
  {
    id: "rp-2",
    title: "Quantum Entanglement in Large-Scale Silicon Microchips",
    authors: "Orion Reynolds, Sarah Thompson",
    abstract: "We report on the coherent control of multiple quantum bits on silicon-based microchips. This is a vital milestone for commercial quantum supremacy.",
    year: 2025,
    doi: "10.1038/s41586-022-04458-3",
    journal: "Nature Nanotechnology",
    ranking: "Q1",
    impactFactor: 19.2,
    tags: ["Quantum", "Physics", "Computing"],
    citations: 114,
    citedBy: ["rp-5"],
    introduction: "Maintaining quantum coherence over microscopic circuits is a major technological bottleneck. Silicon spin qubits present a highly promising path owing to their compatibility with standard commercial semiconductor lithography.",
    methodology: "We utilized ultra-pure isotopically purified silicon-28 substrates. Solid-state microwave pulse patterns were routed at temperatures below 15 Millikelvin to control electron spins.",
    results: "Single-qubit gate fidelities exceeded 99.96%, and two-qubit exchange gates demonstrated an average fidelity of 99.4%, showing that commercial scale-up is extremely feasible.",
    conclusion: "Silicon spin qubits represent the ultimate candidate to build standard, low-overhead fault-tolerant quantum computing systems.",
    url: "https://www.nature.com/articles/s41586-022-04458-3"
  },
  {
    id: "rp-3",
    title: "Global Warming Effects on Marine Ecosystem Diversity",
    authors: "Liam Chen, Maya Lin",
    abstract: "Increased oceanic heat content directly drives coral bleaching and changes migration pathways of apex predators. We compile 10 years of marine tracking telemetry.",
    year: 2026,
    doi: "10.1038/nature10011",
    journal: "Nature Climate Dynamics",
    ranking: "Q2",
    impactFactor: 5.8,
    tags: ["Climate Change", "Marine Bio", "Ecological Impact"],
    citations: 12,
    citedBy: [],
    introduction: "Marine ecosystems are the primary buffer for excess heat, absorbing over 90% of global warming energy. This paper documents massive shifts in ecological indicators.",
    methodology: "Ocean satellite imagery with automated convolutional networks mapped reef degradation and shark telemetry from 2016 through 2026.",
    results: "We observed a severe coral bleaching occurrence in shallow tropical reefs, representing a 35% decline in local biosystems alongside northward predator migration.",
    conclusion: "Immediate establishment of marine sanctuaries is vital to sustain primary biodiversity buffers against rising ocean temperatures.",
    url: "https://www.nature.com/articles/nature10011"
  },
  {
    id: "rp-4",
    title: "Advanced AI Architectures for Cognitive Adaptive Education",
    authors: "Alex Universe, Dr. Orion",
    abstract: "Implementing real-time semantic analysis to construct individualized curriculum tracks (Dynamic Curriculum). We demonstrate an increase of 25% in student retention.",
    year: 2026,
    doi: "10.48550/arXiv.2303.11189",
    journal: "arXiv Computer Science",
    ranking: "Q1",
    impactFactor: 12.4,
    tags: ["AI Core", "Adaptive Learning", "Cognitive"],
    citations: 45,
    citedBy: [],
    introduction: "Uniform modern classrooms frequently fail to engage student diversity. Dynamic semantic models provide personalized lesson routing based on real-time comprehension telemetry.",
    methodology: "A pipeline using transformer embeddings mapped student responses to multidimensional competence nodes, dynamically adjusting complexity.",
    results: "Our pilot test on over 40 schools demonstrated a 25% increase in retention rate, with cognitive fatigue parameters dipping significantly.",
    conclusion: "Integrating cognitive-assistive frameworks into K-12 schooling structures fosters systemic deep learning and high student motivation.",
    url: "https://arxiv.org/abs/2303.11189"
  },
  {
    id: "rp-da-1",
    title: "Optimizing Web3 Ledger Data Architectures for Transparent Micro-Credentials",
    authors: "Alex Universe, Master Alan Turing",
    abstract: "We examine hash-pointer chained data structures for student badge emission. By storing Merkle root anchors on the Ethereum network, academic portfolios can be instantly verified without traditional registry lockups.",
    year: 2026,
    doi: "10.48550/arXiv.2201.07188",
    journal: "arXiv Cryptography and Security",
    ranking: "Q1",
    impactFactor: 14.8,
    tags: ["Data Architecture", "Blockchain", "Micro-Credentials", "Cryptography"],
    citations: 32,
    citedBy: [],
    introduction: "Traditional credentialing networks are highly centralized, plagued by slow verification systems and manual CV auditing processes.",
    methodology: "Using optimized Merkle Trees, we compiled millions of student credit records into a root hash, anchored onto resilient Layer-2 Ethereum state networks.",
    results: "Credential verifications which previously took weeks are completed in sub-second timelines at less than $0.001 gas fees per student record mint.",
    conclusion: "Decentralized micro-credentials grant absolute academic autonomy, eliminating administrative gatekeeping and resume falsification.",
    url: "https://arxiv.org/abs/2201.07188"
  },
  {
    id: "rp-da-2",
    title: "Self-Balanced Binary Search Tree Architectures for High-Stakes Quiz Engines",
    authors: "Prof. Sarah Jenkins, Alex Universe",
    abstract: "An analysis of AVL and Red-Black tree data structures for real-time indexing of national curriculum tests. Our implementation manages and routes PISA questions with consistent O(log N) latency.",
    year: 2025,
    doi: "10.48550/arXiv.2104.14322",
    journal: "arXiv Computation Theory",
    ranking: "Q1",
    impactFactor: 9.6,
    tags: ["Data Architecture", "Algorithms", "Binary Trees", "PISA"],
    citations: 18,
    citedBy: [],
    introduction: "During concurrent high-stakes diagnostic tests, traditional SQL indexing systems fail to balance speed with complex tree queries under millions of simultaneous lookups.",
    methodology: "We designed a self-balancing AVL implementation that structures curriculum nodes dynamically based on active answering parameters.",
    results: "Search lookups achieved steady O(log N) heights, showing uniform 12-millisecond delivery thresholds during load testing of 50,000 requests per second.",
    conclusion: "Deploying balanced binary search trees into standard educational platforms forms a robust, crash-proof infrastructure for massive student audits.",
    url: "https://arxiv.org/abs/2104.14322"
  },
  {
    id: "rp-da-3",
    title: "High-Throughput Hash-Map Indexing Models in Large-Scale Student Records",
    authors: "Master Alan Turing, Jordan Comet",
    abstract: "This paper designs open-addressing and bucket-chaining hash-map models to speed up database query indexing for millions of cognitive student metrics, achieving sub-millisecond retrieval times.",
    year: 2026,
    doi: "10.48550/arXiv.2003.04561",
    journal: "arXiv Databases",
    ranking: "Q1",
    impactFactor: 11.2,
    tags: ["Data Architecture", "Databases", "Hash-Maps", "Indexing"],
    citations: 24,
    citedBy: [],
    introduction: "Constant lookup times are essential for rendering student analytics on live dashboards. This study compares hash collision strategies.",
    methodology: "We evaluated linear probing, quadratic probing, and separate chaining under high collision rates from randomized student matriculation indices.",
    results: "Separate chaining backed by red-black buckets demonstrated absolute robustness, keeping read speeds at O(1) even under 90% load factors.",
    conclusion: "Hash-map designs optimize educational state systems, eliminating performance lag in real-time tracking dashboards.",
    url: "https://arxiv.org/abs/2003.04561"
  },
  {
    id: "rp-math-1",
    title: "On the Solvability of Fractional Differential Equations with Multi-Point Boundary Conditions",
    authors: "Prof. Somsak S., Dr. Anchalee T.",
    abstract: "In this paper, we establish the existence, uniqueness, and structural stability of solutions for a class of multi-point boundary value problems of fractional differential equations. Published in coordination with the Mathematical Association of Thailand.",
    year: 2024,
    doi: "10.37134/tjm.2024.03",
    journal: "Thai Journal of Mathematics (สมาคมคณิตศาสตร์แห่งประเทศไทย)",
    ranking: "Q1",
    impactFactor: 3.2,
    tags: ["Mathematics", "Math Association", "Differential Equations", "Pure Math"],
    citations: 15,
    citedBy: [],
    introduction: "Fractional differential equations have gained significant popularity due to their capacity to describe memory and hereditary properties of diverse physical systems.",
    methodology: "By employing Banach's fixed point theorem and Krasnoselskii's hybrid fixed point approximations, we solve the boundary value criteria for alpha-operators.",
    results: "Uniqueness conditions were verified with error limits bound strictly to less than 1e-6 in multi-dimensional space coordinates.",
    conclusion: "The theoretical findings extend classical integer-order schemas and introduce highly robust criteria for modeling memory-rich substances.",
    url: "https://thaijmath.nu.ac.th/index.php/thaijmath"
  },
  {
    id: "rp-math-2",
    title: "Implementing Advanced Geometrical Models in Thailand Secondary Classrooms: Pedagogical Innovations",
    authors: "Dr. Prasert K., Ms. Rattana W.",
    abstract: "This article presents pedagogical models for secondary school geometry classrooms, backed by research supported by the Mathematical Association of Thailand. We explore dynamic learning vectors to enrich geometric intuition.",
    year: 2025,
    doi: "10.3214/math-assn-thailand.2025",
    journal: "วารสารคณิตศาสตร์ (สมาคมคณิตศาสตร์แห่งประเทศไทยในพระบรมราชูปถัมภ์)",
    ranking: "Q3",
    impactFactor: 1.8,
    tags: ["Mathematics", "Math Association", "Education", "Geometry"],
    citations: 8,
    citedBy: [],
    introduction: "High school geometry classrooms in Southeast Asia frequently struggle to balance core abstract structures with immediate visual feedback.",
    methodology: "We initiated a sandbox testbed in 12 partner schools utilizing dynamic geometry software (GeoGebra) mapped with active classroom response systems.",
    results: "Experimental cohorts scored 18% higher on the standardized geometry assessment while demonstrating enhanced spatial reasoning indices.",
    conclusion: "Continuous learning integration supported by localized mathematical associations builds superior instructional ecosystems with no additional budget overhead.",
    url: "http://www.math.or.th/"
  },
  {
    id: "rp-math-3",
    title: "A Friendly Exposition of the Riemann Hypothesis and Complex Dirichlet Series on Half-Planes",
    authors: "Prof. Keith Devlin, Dr. Mary Williams",
    abstract: "A comprehensive exposition on the Riemann Zeta function, its non-trivial zeros, and its vital role in the distribution of prime numbers. Supported by the Mathematical Association of America.",
    year: 2026,
    doi: "10.1080/00029890.2026.11124",
    journal: "American Mathematical Monthly (Mathematical Association of America - MAA)",
    ranking: "Q1",
    impactFactor: 4.6,
    tags: ["Mathematics", "Math Association", "Prime Numbers", "Complex Analysis"],
    citations: 59,
    citedBy: [],
    introduction: "The distribution of prime numbers is intimately connected to the complex zeros of the Riemann Zeta function, a pinnacle of number theory.",
    methodology: "This study walks through Dirichlet series properties, Euler products, and analytical continuations across the critical line Re(s) = 1/2.",
    results: "We map the numeric computation of the first 10,000 non-trivial zeros, illustrating their absolute alignment on the critical axis with visual graphics.",
    conclusion: "Unraveling these deep complex pathways keeps students highly motivated and expands standard university mathematical curricula.",
    url: "https://www.tandfonline.com/toc/uamm20/current"
  },
  {
    id: "rp-math-4",
    title: "Mathematical Modeling of Epidemic Waves with Adaptive Differential Metrics",
    authors: "Prof. Chayanit P., Dr. Marcus Thorne",
    abstract: "An in-depth study of epidemic propagation utilizing modern stochastic partial differential equations, published under mathematical system dynamics. Sponsored under the Thai Journal of Mathematics.",
    year: 2025,
    doi: "10.37134/tjm.2025.12",
    journal: "Thai Journal of Mathematics (สมาคมคณิตศาสตร์แห่งประเทศไทย)",
    ranking: "Q2",
    impactFactor: 2.9,
    tags: ["Mathematics", "Math Association", "Applied Math", "Epidemiology"],
    citations: 21,
    citedBy: [],
    introduction: "Stochastic perturbations in transmission rates can dramatically alter epidemic trajectories, necessitating models beyond deterministic ODEs.",
    methodology: "We develop an IT-SIR (Interactive Telemetry-SIR) model with additive white noise and calculate its stability via Lyapunov functions.",
    results: "Asymptotic stability criteria are derived, and simulation runtimes are optimized for fast deployment onto active local health nodes.",
    conclusion: "Integrating environmental stochasticity delivers significantly superior prediction windows, saving precious response resource timelines.",
    url: "https://thaijmath.nu.ac.th/index.php/thaijmath"
  }
];

export const LIBRARY_BOOKS: LibraryBook[] = [
  { id: 'b-1', title: 'Advanced Physics (Grade 12)', subject: 'Physics', author: 'Dr. Orion', type: 'Book', downloadUrl: '#' },
  { id: 'b-2', title: 'Vector Calculus: Complete Guide', subject: 'Math', author: 'Dr. Sarah', type: 'Book', downloadUrl: '#' },
  { id: 'b-3', title: 'Exam Prep: PISA 2025 Mathematics', subject: 'PISA', author: 'PISA Committee', type: 'Exam', downloadUrl: '#' },
  { id: 'b-4', title: 'High School Biology Mock Exam', subject: 'Biology', author: 'Bio Dept', type: 'Exam', downloadUrl: '#' },
  { id: 'b-5', title: 'Quantum Mechanics for Teens', subject: 'Physics', author: 'Institute of Physics', type: 'Book', downloadUrl: '#' }
];

export const STUDENTS_LIST: Student[] = [
  { id: 'stu-1', name: 'Alex Universe', grade: '12-A', absent: 1, leave: 3, attended: 142, late: 2, conductScore: 98, temperature: '36.5', weight: 65, bloodType: 'O Positive', allergies: 'Peanuts' },
  { id: 'stu-2', name: 'Taylor Sparks', grade: '12-A', absent: 0, leave: 1, attended: 145, late: 0, conductScore: 100, temperature: '36.4', weight: 58, bloodType: 'A Positive', allergies: 'None' },
  { id: 'stu-3', name: 'Jordan Comet', grade: '12-A', absent: 4, leave: 2, attended: 138, late: 6, conductScore: 82, temperature: '36.7', weight: 70, bloodType: 'B Negative', allergies: 'Gluten' },
  { id: 'stu-4', name: 'Morgan Nebula', grade: '12-B', absent: 2, leave: 5, attended: 140, late: 1, conductScore: 90, temperature: '36.6', weight: 62, bloodType: 'AB Positive', allergies: 'Dust' }
];

export const HOMEWORK_LIST: Homework[] = [
  { id: 'hw-1', subject: 'Advanced Math', title: 'Calculus Problem Set 4 (Limits)', dueDate: '2026-06-05', status: 'Pending', description: 'Complete questions 1 to 15 on chapter 3.' },
  { id: 'hw-2', subject: 'Physics', title: 'Lab Report: Wave Motion Simulation', dueDate: '2026-06-12', status: 'In Progress', description: 'Analyze wave behavior and compile the 3D VR logs.' },
  { id: 'hw-3', subject: 'Computer Science', title: 'Algorithmic Efficiency Analysis', dueDate: '2026-06-18', status: 'Completed', description: 'Define the Big-O complexity of binary search trees.' }
];

export const PARENTING_ARTICLES = [
  { id: 'a-1', title: 'Supporting Alex in STEM Curriculum', category: 'Education', time: '5 min read', desc: 'Practical tips on motivating and supporting students focused on mathematics, physics, and advanced technology programs.' },
  { id: 'a-2', title: 'Digital Well-being for Teens with AI Assistants', category: 'Health & Mind', time: '8 min read', desc: 'How to guide your teenager in balancing digital screen fatigue, online classrooms, and mental wellness routines.' },
  { id: 'a-3', title: 'Preparing for Top Universities in 2026', category: 'Guidance', time: '12 min read', desc: 'A complete overview of blockchain credit passports, portfolio building, and digital credentials for international admissions.' }
];

export const DAO_PROPOSALS = [
  { id: 'dao-1', title: 'Incorporate Quantum Robotics in Year 12 Physics', votesFor: 1240, votesAgainst: 320, category: 'Curriculum', status: 'Active' },
  { id: 'dao-2', title: 'Introduce Decentralized Finances & Web3 standards', votesFor: 890, votesAgainst: 120, category: 'Coursework', status: 'Passed' },
  { id: 'dao-3', title: 'Allocate 2.5 Tons Carbon Credits for Eco-Project', votesFor: 2310, votesAgainst: 450, category: 'Sustainability', status: 'Passed' }
];
