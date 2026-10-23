/**
 * The only place to edit personal information and project content.
 * Keep names and links aligned with the information supplied by the owner.
 */
type Profile = {
  name: string;
  role: string;
  school: string;
  university: string;
  focus: string;
  about: string;
  contactIntro: string;
  githubUrl: string;
  email: string;
  wechat: string;
};

export const profile: Profile = {
  name: 'Hongyun Wang',
  role: 'Undergraduate student',
  school: 'School of Software',
  university: 'Nanjing University',
  focus: 'GPU Computing · HPC for AI · Efficient AI Inference',
  about:
    'I am an undergraduate student in the School of Software at Nanjing University. ' +
    'My interests focus on high-performance computing for AI, particularly kernel development, ' +
    'GPU performance optimization, and efficient LLM inference.',
  contactIntro:
    'I am interested in research internships and RA opportunities in high-performance GPU computing.',
  githubUrl: 'https://github.com/NanjinLin',
  email: '2518400042@smail.nju.edu.cn',
  wechat: '576033624',
};

export const siteMetadata = {
  // Replace only with the verified deployment origin, never a guessed hostname.
  origin: 'https://nanjinlin.github.io',
  description:
    'Undergraduate at Nanjing University, interested in high-performance computing for AI, ' +
    'GPU computing, CUDA kernel optimization, and efficient LLM inference.',
  socialImage: '/og.png',
  socialImageWidth: 1731,
  socialImageHeight: 909,
};

export const researchInterests = [
  'GPU Computing & Kernel Optimization',
  'high-performance computing for AI',
  'Efficient LLM Inference',
];

type Project = {
  id: string;
  title: string;
  description: string[];
  tools: string[];
  githubUrl: string;
};

export const selectedProjects: Project[] = [
  {
    id: 'pewee',
    title: 'Pewee: W4A16 CUDA Kernel Library',
    description: [
      'A lightweight PyTorch CUDA extension for INT4 weight-only quantized inference, featuring fused dequantization, warp-level GEMV, and CuTe-based Tensor Core GEMM.',
      'Integrated with nano-vLLM and evaluated on real LLM inference workloads to investigate memory savings and performance trade-offs.',
    ],
    tools: ['CUDA', 'CuTe', 'CUTLASS', 'vllm', 'Quantization'],
    githubUrl: 'https://github.com/NanjinLin/Pewee',
  },
  {
    id: 'cuda',
    title: 'CUDA Performance Engineering',
    description: [
      'A collection of CUDA kernel implementations and performance optimization experiments covering reduction, softmax, GEMM, and attention-related workloads.',
      'Focused on GPU memory hierarchy, parallel execution, systematic benchmarking, and profiling-guided optimization.',
    ],
    tools: ['CUDA', 'C++', 'Nsight Compute', 'GPU Profiling'],
    githubUrl: 'https://github.com/NanjinLin/cuda-performance-engineering',
  },
];
