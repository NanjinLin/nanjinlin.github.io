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
};

export const profile: Profile = {
  name: 'Hongyun Wang',
  role: 'Undergraduate student',
  school: 'School of Software',
  university: 'Nanjing University',
  focus: 'MLSys, GPU Systems, and Systems for AI.',
  about:
    'I am an undergraduate in the School of Software at Nanjing University. ' +
    'My interests lie in machine learning systems, particularly GPU systems, LLM training and inference, ' +
    'and efficient deep learning.',
  contactIntro:
    'I am interested in research internships and RA opportunities in ML systems and GPU computing.',
  githubUrl: 'https://github.com/NanjinLin',
  email: '2518400042@smail.nju.edu.cn',
};

export const siteMetadata = {
  // Replace only with the verified deployment origin, never a guessed hostname.
  origin: 'https://nanjinlin.github.io',
  description:
    'Undergraduate at Nanjing University, interested in MLSys, GPU systems, and efficient training and inference. ' +
    'CUDA kernel implementation, profiling, and optimization.',
  socialImage: '/og.png',
  socialImageWidth: 1731,
  socialImageHeight: 909,
};

export const researchInterests = [
  'GPU Systems',
  'LLM Training & Inference Systems',
  'Distributed ML Systems',
  'Efficient Deep Learning Systems',
  'ML Runtimes & Systems for Foundation Models',
];

type Project = {
  label: string;
  title: string;
  description: string;
  tools: string[];
  githubUrl: string;
};

export const cudaProject: Project = {
  label: 'GPU Performance Engineering',
  title: 'CUDA Kernel Optimization',
  description:
    'A hands-on study of GPU performance, from basic parallel primitives to attention kernels. ' +
    'The project explores CUDA kernel implementation and optimization through benchmarking and GPU profiling.',
  tools: ['CUDA', 'C++', 'Nsight Compute', 'Nsight Systems'],
  githubUrl: 'https://github.com/NanjinLin/cuda-performance-engineering',
};
