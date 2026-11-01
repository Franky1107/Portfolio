// All site copy lives here so sections stay purely presentational.
// Edit this file to update projects, skills, achievements, etc.

export const profile = {
  name: 'Sourav Mallick',
  firstName: 'Sourav',
  lastName: 'Mallick',
  email: 'sourav.mallick@email.com',
  github: 'https://github.com/souravmallick',
  githubLabel: 'github.com/souravmallick',
  linkedin: 'https://linkedin.com/in/souravmallick',
  linkedinLabel: 'linkedin.com/in/souravmallick',
};

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact', cta: true },
];

export const splashWords = [
  'Hello', 'Bonjour', 'Hola', 'Ciao', 'Привет', '你好', 'こんにちは', 'नमस्ते', 'ନମସ୍କାର',
];

export const aboutStats = [
  { num: '5+', label: 'Projects' },
  { num: '3+', label: 'Languages' },
  { num: '∞', label: 'Curiosity' },
];

export const interests = [
  '🤖 Artificial Intelligence',
  '📊 Machine Learning',
  '🎨 Generative AI',
  '💻 Software Development',
  '🧮 Algorithms',
  '🔬 Research',
  '🌐 Web Dev',
];

export const marqueeRows = [
  { text: 'Machine Learning • Artificial Intelligence • Generative AI • ', velocity: 1 },
  { text: 'Creative Developer • CS Student • Software Engineer • ', velocity: -1 },
];

export const skillGroups = [
  {
    icon: '🐍',
    title: 'Programming Languages',
    items: [
      ['Python', 80],
      ['Java', 65],
      ['C / C++', 60],
      ['JavaScript', 50],
    ],
  },
  {
    icon: '🧠',
    title: 'AI / ML Technologies',
    items: [
      ['GANs', 70],
      ['Transformers / Attention', 55],
      ['Deep Learning Basics', 65],
      ['PyTorch / TensorFlow', 50],
    ],
  },
  {
    icon: '🛠',
    title: 'Dev Tools',
    items: [
      ['Git & GitHub', 72],
      ['VS Code', 85],
      ['Linux / Bash', 55],
      ['Jupyter Notebooks', 75],
    ],
  },
  {
    icon: '📐',
    title: 'CS Concepts',
    items: [
      ['Data Structures', 75],
      ['Algorithms', 70],
      ['OOP', 78],
      ['Database Basics', 55],
    ],
  },
];

export const projectFilters = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI / ML' },
  { id: 'web', label: 'Web' },
  { id: 'software', label: 'Software' },
];

export const projects = [
  {
    category: 'ai',
    number: '01 — AI/ML',
    title: 'GAN-Based Video Anomaly Detection',
    desc: 'Developed a system using Generative Adversarial Networks to detect anomalous events in surveillance video. The model learns the distribution of "normal" frames and flags deviations during inference.',
    learning: 'Understood GAN training dynamics, mode collapse issues, and how reconstruction error can act as an anomaly score.',
    tags: ['Python', 'PyTorch', 'GANs', 'OpenCV', 'NumPy'],
    github: 'https://github.com/souravmallick',
    demo: { label: 'Demo', message: 'Demo coming soon!' },
  },
  {
    category: 'ai',
    number: '02 — AI/ML',
    title: 'Transformer Attention Visualizer',
    desc: 'An interactive tool that visualizes self-attention maps from pre-trained transformer models. Built to deepen understanding of how attention mechanisms work across different NLP tasks.',
    learning: 'Gained hands-on understanding of multi-head attention, positional encoding, and why transformers excel at long-range dependencies.',
    tags: ['Python', 'HuggingFace', 'Transformers', 'Matplotlib'],
    github: 'https://github.com/souravmallick',
  },
  {
    category: 'software',
    number: '03 — Software',
    title: 'Student Task Manager CLI',
    desc: 'A command-line productivity tool for students to manage assignments, deadlines, and study sessions. Features priority queuing, reminder notifications, and a clean terminal UI.',
    learning: 'Reinforced OOP principles, file I/O, and applying data structures like priority queues in real-world contexts.',
    tags: ['Python', 'OOP', 'CLI', 'JSON', 'Rich'],
    github: 'https://github.com/souravmallick',
  },
  {
    category: 'web',
    number: '04 — Web',
    title: 'AI Concepts Blog Platform',
    desc: 'A minimal blogging platform built to document and share learning notes on AI/ML concepts. Features markdown rendering, categorized posts, and a clean reading experience.',
    learning: 'Learned frontend fundamentals, responsive design principles, and the value of writing to solidify understanding.',
    tags: ['HTML/CSS', 'JavaScript', 'Markdown', 'GitHub Pages'],
    github: 'https://github.com/souravmallick',
    demo: { label: 'Live', message: 'Live site coming soon!' },
  },
  {
    category: 'ai',
    number: '05 — AI/ML',
    title: 'Image Classification with CNN',
    desc: 'Implemented and trained a Convolutional Neural Network on CIFAR-10 dataset from scratch. Experimented with different architectures, learning rates, and regularization techniques.',
    learning: 'Understood convolutions, pooling, batch normalization, and the impact of hyperparameter tuning on model accuracy.',
    tags: ['Python', 'TensorFlow', 'Keras', 'CNN', 'CIFAR-10'],
    github: 'https://github.com/souravmallick',
  },
];

export const education = {
  degree: 'B.Tech — Computer Science & Engineering',
  school: 'Your University / College Name, Odisha',
  years: '2022 – 2026  ·  Currently Enrolled',
  courses: [
    'Artificial Intelligence',
    'Machine Learning',
    'Data Structures & Algorithms',
    'Software Engineering',
    'Computer Networks',
    'Operating Systems',
    'Database Management',
    'Object Oriented Programming',
    'Computer Vision',
  ],
};

export const achievements = [
  {
    icon: '🏅', tone: 'blue',
    title: 'Deep Learning Specialization',
    sub: "Completed Andrew Ng's course covering CNNs, RNNs, and optimization techniques on Coursera.",
    badge: '✓ COURSERA · 2024',
  },
  {
    icon: '🤖', tone: 'purple',
    title: 'Generative AI Fundamentals',
    sub: 'Studied GANs, VAEs, and diffusion models — applied knowledge to the anomaly detection project.',
    badge: '✓ SELF-STUDY · 2024',
  },
  {
    icon: '📜', tone: 'green',
    title: 'Python for Data Science',
    sub: 'Completed a structured course covering NumPy, Pandas, Matplotlib, and data preprocessing pipelines.',
    badge: '✓ CERTIFIED · 2023',
  },
  {
    icon: '🔬', tone: 'blue',
    title: 'Transformers Architecture Study',
    sub: 'Self-studied "Attention is All You Need" paper and implemented a mini transformer from scratch.',
    badge: '✓ PAPER STUDY · 2024',
  },
  {
    icon: '🏆', tone: 'purple',
    title: 'College-Level Coding Contest',
    sub: 'Participated in intra-college programming competitions, solving algorithmic and logic-based challenges.',
    badge: '✓ PARTICIPANT · 2023',
  },
  {
    icon: '📚', tone: 'green',
    title: 'Key Topics Mastered',
    sub: 'GANs · Transformers · Attention Mechanisms · Backpropagation · Computer Vision basics · NLP fundamentals',
    badge: '✓ ONGOING LEARNING',
  },
];

export const posts = [
  {
    date: 'Mar 2025 · AI/ML',
    title: 'Understanding GANs: How Generators and Discriminators Play a Zero-Sum Game',
    excerpt: 'A beginner-friendly walkthrough of how Generative Adversarial Networks work, common pitfalls like mode collapse, and lessons from implementing one...',
  },
  {
    date: 'Feb 2025 · Theory',
    title: 'Breaking Down "Attention is All You Need" — My Notes on the Transformer Paper',
    excerpt: 'My attempt to summarize the landmark Transformer paper in plain language, with diagrams and code snippets to make the math approachable...',
  },
  {
    date: 'Jan 2025 · Reflection',
    title: "6 Months of Learning ML: What Worked, What Didn't, and What's Next",
    excerpt: 'An honest reflection on my journey learning machine learning as a CS student — the resources that helped most and the mindset shifts along the way...',
  },
];

export const footerLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
];
