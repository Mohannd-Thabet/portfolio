export const mockProfile = {
  _id: 'mock-profile-001',
  singletonKey: 'main',
  name: 'Mohannad AL- Buhari',
  title: 'IT Support Engineer & Full Stack Developer',
  subtitle: 'Information Technology Engineer specialized in IT Support, Troubleshooting, and Web & Mobile App Development with Flutter, React, and Python.',
  about: 'Information Technology Engineer and graduate with solid experience in IT support, troubleshooting, software development, and technical problem-solving. Skilled in software testing, database management (MySQL and Microsoft SQL Server), RESTful APIs, and cross-platform web and mobile application development using Flutter, Dart, React.js, and Python. Experienced in analyzing and resolving complex technical issues, documenting solutions, and supporting software systems.',
  email: 'mohannad.buhari@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mohannad-al-buhari',
  github: 'https://github.com/mohannad-al-buhari',
  university: 'Al-Razi University — Sana\'a, Yemen',
  graduation: 2026,
  image: {
    url: '/Firefly_RemoveBackground.png',
    public_id: 'profile_mock_img',
  },
  cv: {
    url: '/CV.pdf',
    public_id: 'mohannad_cv',
  },
};

export const mockSkills = [
  {
    _id: 'skill-001',
    name: 'Flutter & Dart',
    type: 'Mobile App Development',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
    order: 1,
  },
  {
    _id: 'skill-002',
    name: 'React.js',
    type: 'Frontend Web Development',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    order: 2,
  },
  {
    _id: 'skill-003',
    name: 'Python',
    type: 'Programming & AI',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    order: 3,
  },
  {
    _id: 'skill-004',
    name: 'JavaScript (ES6+)',
    type: 'Frontend & Full Stack',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    order: 4,
  },
  {
    _id: 'skill-005',
    name: 'MySQL',
    type: 'Relational Database',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    order: 5,
  },
  {
    _id: 'skill-006',
    name: 'Microsoft SQL Server',
    type: 'Database Management',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
    order: 6,
  },
  {
    _id: 'skill-007',
    name: 'Network & IT Support',
    type: 'TCP/IP, DNS, DHCP, Troubleshooting',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    order: 7,
  },
  {
    _id: 'skill-008',
    name: 'RESTful APIs & Postman',
    type: 'API Integration & Testing',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
    order: 8,
  },
  {
    _id: 'skill-009',
    name: 'HTML5 & CSS3',
    type: 'Web Standards & Responsive Design',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    order: 9,
  },
  {
    _id: 'skill-010',
    name: 'WordPress CMS',
    type: 'Web Design & Content Management',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg',
    order: 10,
  },
  {
    _id: 'skill-011',
    name: 'Git & GitHub',
    type: 'Version Control & Collaboration',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    order: 11,
  },
  {
    _id: 'skill-012',
    name: 'Software Testing & QA',
    type: 'Debugging & Quality Assurance',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    order: 12,
  },
  {
    _id: 'skill-013',
    name: 'استخدام أدوات الذكاء الاصطناعي (AI Tools Proficiency)',
    type: 'Generative AI & Productivity',
    icon: '/ai-icon.svg',
    order: 13,
  },
  {
    _id: 'skill-014',
    name: 'Figma (تصميم واجهات المستخدم UI/UX)',
    type: 'UI/UX Design & Prototyping',
    icon: '/figma-icon.svg',
    order: 14,
  },
];

export const mockProjects = [
  {
    _id: 'project-001',
    title: 'مزايا المقبلي | توريد وتوصيل الديزل',
    description: 'موقع ومنصة رقمية رسمية لشركة مزايا المقبلي لخدمات توصيل وتوريد الديزل والمحروقات في المملكة العربية السعودية، تشمل واجهة تفاعلية حديثة، ودعم الوضع الليلي والنهاري (Dark/Light mode)، وحاسبة كميات وتواصل فوري مباشر عبر الواتساب.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Dark Mode'],
    image: {
      url: '/projects/mazaya.png',
      public_id: 'proj_mazaya',
    },
    githubUrl: '',
    liveUrl: 'https://www.mazayamoq.com/',
    featured: true,
    order: 1,
  },
  {
    _id: 'project-002',
    title: 'مؤسسة كونكورد للوقود (Concord KSA)',
    description: 'الموقع الرسمي لمؤسسة كونكورد للوقود بالمملكة العربية السعودية الرائدة في تقديم الخدمات البترولية وتوزيع الديزل للمشاريع والمصانع الكبرى، تم تطويره بالكامل بنظام WordPress مع تهيئة متقدمة لمحركات البحث (SEO) ونماذج تواصل رقمية.',
    tags: ['WordPress', 'PHP', 'SEO', 'Elementor', 'Corporate Identity'],
    image: {
      url: '/projects/concord.png',
      public_id: 'proj_concord',
    },
    githubUrl: '',
    liveUrl: 'https://concordksa.com/',
    featured: true,
    order: 2,
  },
  {
    _id: 'project-003',
    title: 'منصة وتطبيق يمن نقل (Yemen Naql Platform)',
    description: 'مشروع التخرج: منصة لوجستية وتطبيق ذكي لنقل وشحن البضائع يربط العملاء بسائقي الشاحنات في اليمن، يتيح تتبع الشحنات عبر خرائط جوجل (GPS)، وإدارة الرحلات والأسعار، مع لوحة تحكم إدارية ويب (React.js) وقاعدة بيانات MySQL متكاملة.',
    tags: ['Flutter', 'Dart', 'React.js', 'Google Maps API', 'RESTful APIs', 'MySQL'],
    image: {
      url: '/yemen_naql/1.png',
      public_id: 'proj_yemen_naql',
    },
    githubUrl: 'https://github.com/mohannad-al-buhari',
    liveUrl: '#gallery',
    gallery: [
      '/yemen_naql/1.png',
      '/yemen_naql/2.png',
      '/yemen_naql/3.png',
      '/yemen_naql/4.png',
      '/yemen_naql/5.png',
      '/yemen_naql/6.png',
      '/yemen_naql/7.png',
      '/yemen_naql/8.png',
      '/yemen_naql/9.png',
      '/yemen_naql/10.png',
      '/yemen_naql/11.png',
      '/yemen_naql/12.png',
      '/yemen_naql/13.png',
      '/yemen_naql/14.png',
      '/yemen_naql/15.png',
      '/yemen_naql/16.jpg',
      '/yemen_naql/17.jpg',
      '/yemen_naql/18.jpg',
    ],
    featured: true,
    order: 3,
  },
];

export const mockCertificates = [
  {
    _id: 'cert-001',
    title: 'IT Customer Support Basics Certificate',
    issuer: 'Cisco Networking Academy',
    date: '2026-08-10T00:00:00.000Z',
    images: [
      {
        url: '/certificates/photo_2026-10-27_23-32-19.jpg',
        public_id: 'cert_cisco',
      },
    ],
  },
  {
    _id: 'cert-002',
    title: 'Introduction to Computer Science (CS50)',
    issuer: 'Harvard University',
    date: '2026-01-15T00:00:00.000Z',
    images: [
      {
        url: '/certificates/photo_2026-10-27_23-33-05.jpg',
        public_id: 'cert_harvard',
      },
    ],
  },
  {
    _id: 'cert-003',
    title: 'Creating an Omniverse Extension With Python',
    issuer: 'NVIDIA Academy',
    date: '2026-07-20T00:00:00.000Z',
    images: [
      {
        url: '/certificates/photo_2026-10-27_23-33-00.jpg',
        public_id: 'cert_nvidia',
      },
    ],
  },
  {
    _id: 'cert-004',
    title: 'What Is Generative AI?',
    issuer: 'LinkedIn Learning',
    date: '2026-08-20T00:00:00.000Z',
    images: [
      {
        url: '/certificates/photo_2026-10-27_23-32-45.jpg',
        public_id: 'cert_linkedin',
      },
    ],
  },
  {
    _id: 'cert-005',
    title: 'AI for Business Professionals',
    issuer: 'HP LIFE | HP Foundation',
    date: '2026-07-16T00:00:00.000Z',
    images: [
      {
        url: '/certificates/photo_2026-10-27_23-32-39.jpg',
        public_id: 'cert_hp',
      },
    ],
  },
  {
    _id: 'cert-006',
    title: 'Online Freelancing Strategies and AI',
    issuer: 'Alhababi Business for E-Services & Entrepreneurship - UK',
    date: '2026-07-25T00:00:00.000Z',
    images: [
      {
        url: '/certificates/photo_2026-10-27_23-32-55.jpg',
        public_id: 'cert_freelancing',
      },
    ],
  },
  {
    _id: 'cert-007',
    title: 'Secrets of Profit from AI',
    issuer: 'Alhababi Business for E-Services & Entrepreneurship - UK',
    date: '2026-07-28T00:00:00.000Z',
    images: [
      {
        url: '/certificates/photo_2026-10-27_23-32-51.jpg',
        public_id: 'cert_ai_profit',
      },
    ],
  },
  {
    _id: 'cert-008',
    title: 'EDU302 | Human Development',
    issuer: 'Mind Luster',
    date: '2026-07-01T00:00:00.000Z',
    images: [
      {
        url: '/certificates/photo_2026-10-27_23-32-31.jpg',
        public_id: 'cert_mindluster',
      },
    ],
  },
  {
    _id: 'cert-009',
    title: 'AI for Language Development',
    issuer: 'Sharief Abdelmonem Training',
    date: '2025-03-13T00:00:00.000Z',
    images: [
      {
        url: '/certificates/photo_2026-10-27_23-33-11.jpg',
        public_id: 'cert_language',
      },
    ],
  },
];

export const mockMessages = [
  {
    _id: 'msg-001',
    name: 'أحمد الصالح',
    email: 'ahmed.alsaleh@example.com',
    subject: 'طلب تعاون في مشروع تقني',
    message: 'مرحبًا مهندس مهند، اطلعت على أعمالك ومشاريعك في الفلاتر والويب وأود مناقشة فرصة عمل وتطوير تطبيق جديد معك.',
    isRead: false,
    createdAt: new Date().toISOString(),
  },
];
