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
    doi: "10.1038/nature2026.01",
    journal: "Nature Academic",
    ranking: "Q1",
    impactFactor: 42.5,
    tags: ["Climate Change", "Atmosphere", "Mitigation"],
    citations: 28,
    citedBy: ["rp-3", "rp-4"]
  },
  {
    id: "rp-2",
    title: "Quantum Entanglement in Large-Scale Silicon Microchips",
    authors: "Orion Reynolds, Sarah Thompson",
    abstract: "We report on the coherent control of multiple quantum bits on silicon-based microchips. This is a vital milestone for commercial quantum supremacy.",
    year: 2025,
    doi: "10.1103/quantum.2025",
    journal: "Physical Review Letters",
    ranking: "Q1",
    impactFactor: 19.2,
    tags: ["Quantum", "Physics", "Computing"],
    citations: 114,
    citedBy: ["rp-5"]
  },
  {
    id: "rp-3",
    title: "Global Warming Effects on Marine Ecosystem Diversity",
    authors: "Liam Chen, Maya Lin",
    abstract: "Increased oceanic heat content directly drives coral bleaching and changes migration pathways of apex predators. We compile 10 years of marine tracking telemetry.",
    year: 2026,
    doi: "10.1016/marine.2026",
    journal: "Marine Science Journal",
    ranking: "Q2",
    impactFactor: 5.8,
    tags: ["Climate Change", "Marine Bio", "Ecological Impact"],
    citations: 12,
    citedBy: []
  },
  {
    id: "rp-4",
    title: "Advanced AI Architectures for Cognitive Adaptive Education",
    authors: "Alex Universe, Dr. Orion",
    abstract: "Implementing real-time semantic analysis to construct individualized curriculum tracks (Dynamic Curriculum). We demonstrate an increase of 25% in student retention.",
    year: 2026,
    doi: "10.1109/edu.ai.2026",
    journal: "IEEE Transactions on Learning",
    ranking: "Q1",
    impactFactor: 12.4,
    tags: ["AI Core", "Adaptive Learning", "Cognitive"],
    citations: 45,
    citedBy: []
  },
  {
    id: "rp-da-1",
    title: "Optimizing Web3 Ledger Data Architectures for Transparent Micro-Credentials",
    authors: "Alex Universe, Master Alan Turing",
    abstract: "We examine hash-pointer chained data structures for student badge emission. By storing Merkle root anchors on the Ethereum network, academic portfolios can be instantly verified without traditional registry lockups.",
    year: 2026,
    doi: "10.1109/web3.credentials.2026",
    journal: "Journal of Distributed Computing",
    ranking: "Q1",
    impactFactor: 14.8,
    tags: ["Data Architecture", "Blockchain", "Micro-Credentials", "Cryptography"],
    citations: 32,
    citedBy: []
  },
  {
    id: "rp-da-2",
    title: "Self-Balanced Binary Search Tree Architectures for High-Stakes Quiz Engines",
    authors: "Prof. Sarah Jenkins, Alex Universe",
    abstract: "An analysis of AVL and Red-Black tree data structures for real-time indexing of national curriculum tests. Our implementation manages and routes PISA questions with consistent O(log N) latency.",
    year: 2025,
    doi: "10.1007/springer.quiz.2025",
    journal: "Journal of Educational Algorithmic Foundations",
    ranking: "Q1",
    impactFactor: 9.6,
    tags: ["Data Architecture", "Algorithms", "Binary Trees", "PISA"],
    citations: 18,
    citedBy: []
  },
  {
    id: "rp-da-3",
    title: "High-Throughput Hash-Map Indexing Models in Large-Scale Student Records",
    authors: "Master Alan Turing, Jordan Comet",
    abstract: "This paper designs open-addressing and bucket-chaining hash-map models to speed up database query indexing for millions of cognitive student metrics, achieving sub-millisecond retrieval times.",
    year: 2026,
    doi: "10.1145/acm.db.2026.04",
    journal: "ACM Transactions on Large Systems",
    ranking: "Q1",
    impactFactor: 11.2,
    tags: ["Data Architecture", "Databases", "Hash-Maps", "Indexing"],
    citations: 24,
    citedBy: []
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
