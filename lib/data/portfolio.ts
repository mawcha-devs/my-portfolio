import { createSupabasePublicServerClient } from '@/lib/supabase/public-server';
import { unstable_cache } from 'next/cache';

export type ExperienceRecord = {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
};

export type ProjectRecord = {
  id: string;
  slug: string;
  title: string;
  type: string;
  category: string;
  status: string;
  repository: string | null;
  liveDemo: string | null;
  contribution: string;
  summary: string;
  description: string;
  purpose: string;
  architecture: string;
  engineeringDecisions: string[];
  challenges: string[];
  technologies: string[];
  features: string[];
  screenshots: string[];
  published: boolean;
};

export type BlogPostRecord = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  coverImageUrl: string | null;
  tags: string[];
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TestimonialRecord = {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string | null;
  organization: string | null;
  avatarUrl: string | null;
  published: boolean;
  sortOrder: number;
};

type PortfolioData = {
  profile: typeof profile;
  experiences: ExperienceRecord[];
  education: typeof education;
  certifications: typeof certifications;
  achievements: typeof achievements;
  skillGroups: typeof skillGroups;
  projects: ProjectRecord[];
  blogPosts: BlogPostRecord[];
  testimonials: TestimonialRecord[];
};

export const profile = {
  name: 'Mawcha Haftu',
  role: 'Software Developer',
  location: 'Mekelle, Ethiopia',
  summary:
    'I am a dedicated and detail-oriented software developer experienced in building real apps with Flutter for mobile apps and building full-stack apps with Node.js and React.js, with MySQL as my database. I bring solutions to complex problems by building simple and effective apps with modern design techniques and tools. I have been working as a mobile app developer since September 2025.',
  education: {
    institution:
      'Mekelle University – Mekelle Institute of Technology (MIT)',
    degree:
      'Bachelor of Science in Computer Science and Engineering',
    graduation: 'July 4, 2026',
    cgpa: '3.57',
  },
  email: 'mawcha.haftu@gmail.com',
  github: 'https://github.com/mawcha-devs',
  linkedin:
    'https://www.linkedin.com/in/mawcha-h-67a93b3a8/',
};

export const skillGroups = [
  {
    title: 'Languages',
    items: [
      'Dart',
      'Python',
      'JavaScript',
      'TypeScript',
      'C',
      'C++',
      'SQL',
    ],
  },
  { title: 'Mobile', items: ['Flutter'] },
  {
    title: 'Frontend',
    items: ['React.js', 'HTML', 'CSS', 'Bootstrap'],
  },
  { title: 'Backend', items: ['Node.js', 'Express.js'] },
  {
    title: 'Databases',
    items: ['MySQL', 'SQLite', 'MongoDB', 'Mongoose'],
  },
  { title: 'Tools', items: ['Git', 'GitHub', 'Postman'] },
  {
    title: 'Architecture',
    items: [
      'Clean Architecture',
      'REST APIs',
      'Responsive UI',
      'State management',
      'Full-stack application development',
    ],
  },
];

export const experiences: ExperienceRecord[] = [
  {
    id: 'exp-c-metnee',
    role: 'Mobile App Developer / Intern',
    company: 'C. Metnee Systems PLC',
    location: 'Addis Ababa, Ethiopia',
    period: 'October 2025 – January 2026',
    description:
      'Worked on application development with teammates, worked with Git/GitHub collaboration, translated UI designs into functional mobile interfaces, worked through real-world development challenges, and focused on UI implementation and mobile development.',
  },
  {
    id: 'exp-grand-tech',
    role: 'Mobile App Developer / Intern',
    company: 'Grand Technology Solutions',
    location: 'Mekelle, Tigray, Ethiopia',
    period: 'February 2026 – May 2026',
    description:
      'Worked as part of a development team, contributed to a Project Management System, worked on mobile application development using Flutter, and learned and applied teamwork, requirements analysis, planning, design, and implementation.',
  },
];

export const education = [
  {
    institution:
      'Mekelle University – Mekelle Institute of Technology (MIT)',
    degree:
      'Bachelor of Science in Computer Science and Engineering',
    graduation: 'July 4, 2026',
    cgpa: '3.57',
  },
];

export const priorEducation = [
  { institution: 'Kallamino Special High School' },
  { institution: 'May Weyni Complete Elementary School' },
];

export const certifications = [
  { name: 'AI Fundamentals', issuer: 'Udacity' },
  {
    name: 'Data Analytics Fundamentals',
    issuer: 'Udacity',
  },
  {
    name: 'Android Development Fundamentals',
    issuer: 'Udacity',
  },
  { name: 'UI/UX Design', issuer: 'Gebeya Inc.' },
];

export const achievements = [
  {
    title: 'Recognition certificate',
    organization:
      'Araya Women and Children Charitable Organization',
    category: 'Leadership in Education sector',
    period: 'September 1, 2025 – May 15, 2026',
  },
  {
    title: 'Peaceform membership',
    organization: 'Peaceform',
    category: 'Membership',
    period: 'September 2025 – June 2026',
  },
];

export const projects: ProjectRecord[] = [
  {
    id: 'proj-pms',
    slug: 'project-management-system',
    title: 'Project Management System',
    type: 'Group project',
    category: 'Mobile and full-stack application',
    status: 'completed',
    repository:
      'https://github.com/mawcha-devs/Project-Management-System',
    liveDemo: null,
    contribution: 'Mobile app development',
    summary:
      'A group software project focused on mobile-first task management, project tracking, and localized communication features. My contribution was in mobile application development.',
    description:
      'This project was developed as a group software platform for managing tasks, tracking team projects, and supporting communication. The mobile application included offline-first behavior, local persistence, synchronization, multilingual support, and practical collaboration workflows.',
    purpose:
      'To support task management, project tracking, team communication, and practical collaboration workflows in one project platform.',
    architecture:
      'The mobile application followed a Feature-First Clean Architecture approach with BLoC, GetIt, local persistence, and a REST backend connection.',
    engineeringDecisions: [
      'Used an offline-first approach so the mobile experience could continue working with local data.',
      'Separated features and responsibilities through a Feature-First Clean Architecture structure.',
      'Included localization for English, Tigrigna, and Amharic.',
    ],
    challenges: [
      'Working through synchronization between local persistence and the backend when online.',
      'Collaborating with teammates while translating UI designs into functional mobile interfaces.',
    ],
    technologies: [
      'Flutter',
      'Vue.js',
      'Node.js',
      'Express.js',
    ],
    features: [
      'Task management',
      'Project tracking',
      'Team communication',
      'Offline-first approach',
      'Local persistence',
      'Synchronization with backend when online',
      'Responsive UI',
      'English localization',
      'Tigrigna localization',
      'Amharic localization',
      'BLoC',
      'GetIt',
      'Drift/Hive',
      'Dio',
      'JWT/error interceptors',
      'Feature-First Clean Architecture',
    ],
    screenshots: [],
    published: true,
  },
  {
    id: 'proj-sheqlee',
    slug: 'sheqlee-freelance-marketplace',
    title: 'Sheqlee Freelance Marketplace',
    type: 'In progress',
    category: 'Mobile, web, and marketplace application',
    status: 'in_progress',
    repository:
      'https://github.com/mawcha-devs/Sheqlee-Freelance-Marketplace',
    liveDemo: null,
    contribution:
      'Owned the mobile app development process with Flutter',
    summary:
      'A mobile-first freelance marketplace project with Flutter, React web, Node.js backend, and MongoDB data storage. Final Flutter-backend API connectivity and authentication flow connection are still pending.',
    description:
      'This project includes the Flutter mobile application, React web application, Node.js REST backend, and MongoDB storage. It follows Clean Architecture and Riverpod patterns for mobile app state management, but the final Flutter-backend API connectivity and authentication flow are still pending.',
    purpose:
      'To build a freelance marketplace experience across Flutter mobile and React web clients with a Node.js and MongoDB backend.',
    architecture:
      'The Flutter application uses Clean Architecture and Riverpod for state management, alongside a service layer prepared for REST API integration.',
    engineeringDecisions: [
      'Used a modular Flutter UI structure for marketplace flows such as job listing and job detail.',
      'Kept mobile, web, backend, and database responsibilities separated across the project structure.',
    ],
    challenges: [
      'Final Flutter-backend API connectivity is still pending.',
      'Authentication flow integration between the Flutter client and backend is still pending.',
    ],
    technologies: [
      'Flutter',
      'React.js',
      'Node.js',
      'MongoDB',
    ],
    features: [
      'Modular Flutter UI',
      'Riverpod state management',
      'Job listing',
      'Job detail',
      'REST API service layer',
      'React web application',
      'Node.js backend',
      'MongoDB backend',
    ],
    screenshots: [],
    published: true,
  },
  {
    id: 'proj-pharmacy',
    slug: 'pharmacy-management-system',
    title: 'Pharmacy Management System',
    type: 'Full-stack project',
    category: 'Business and inventory management system',
    status: 'completed',
    repository:
      'https://github.com/mawcha-devs/Pharmacy-Management-System',
    liveDemo: null,
    contribution: 'Full-stack development',
    summary:
      'A full-stack pharmacy management system with login, customer management, medicine inventory, stock tracking, billing, transactions, and reports.',
    description:
      'This project includes a React.js frontend with Material UI, a Node.js and Express.js backend, and a MySQL database. It covers customer registration and authentication, medicine inventory management, medicine search, billing, transaction processing, and reporting.',
    purpose:
      'To provide an integrated web system for pharmacy customer records, medicine inventory, billing, transactions, and reports.',
    architecture:
      'A client-server application with a React.js and Material UI frontend, a Node.js and Express.js REST backend, and a MySQL database accessed through the server.',
    engineeringDecisions: [
      'Used a REST API boundary between the React client and the Express server.',
      'Used MySQL for customer, medicine, billing, transaction, and report-related data.',
      'Organized the frontend around dashboard, customer, medicine, and billing workflows.',
    ],
    challenges: [
      'Coordinating inventory, billing, transaction, and customer workflows around shared database records.',
      'Supporting stock monitoring and reporting flows across the client and backend routes.',
    ],
    technologies: [
      'React.js',
      'Material UI',
      'Node.js',
      'Express.js',
      'MySQL',
    ],
    features: [
      'Customer registration/authentication',
      'Medicine inventory',
      'Medicine search',
      'Stock tracking',
      'Billing',
      'Transactions',
      'Customer management',
      'Reports/history',
    ],
    screenshots: [],
    published: true,
  },
  {
    id: 'proj-tigrigna-fake-news',
    slug: 'tigrigna-fake-news-detection',
    title: 'Tigrigna Fake News Detection',
    type: 'Thesis / NLP / Machine Learning project',
    category:
      'Natural language processing and machine learning',
    status: 'completed',
    repository: null,
    liveDemo: null,
    contribution: 'NLP and machine learning workflow',
    summary:
      'A thesis project focused on Tigrigna fake news detection using NLP and machine learning methods such as text preprocessing, normalization, tokenization, TF-IDF, and model evaluation.',
    description:
      'This project focused on building a practical NLP workflow for Tigrigna text, including preprocessing, normalization, tokenization, feature extraction using TF-IDF, and model training and evaluation with scikit-learn.',
    purpose:
      'To explore a Tigrigna fake news detection workflow using text preparation, feature extraction, and machine learning model evaluation.',
    architecture:
      'A Python-based NLP and machine learning workflow using preprocessing, normalization, tokenization, TF-IDF feature extraction, and scikit-learn model training and evaluation.',
    engineeringDecisions: [
      'Applied text normalization and tokenization before feature extraction.',
      'Used TF-IDF to represent text for the machine learning workflow.',
      'Kept evaluation within the documented machine learning workflow without claiming unverified results.',
    ],
    challenges: [
      'Preparing Tigrigna text for a consistent NLP workflow.',
      'Working through preprocessing and feature representation decisions before model evaluation.',
    ],
    technologies: [
      'Python',
      'NLP',
      'Text preprocessing',
      'Normalization',
      'Tokenization',
      'TF-IDF',
      'scikit-learn',
      'pandas',
      'NumPy',
    ],
    features: [
      'Text preprocessing',
      'Normalization',
      'Tokenization',
      'TF-IDF',
      'Model training',
      'Model evaluation',
      'Machine learning workflow',
    ],
    screenshots: [],
    published: true,
  },
  {
    id: 'proj-corn-leaf',
    slug: 'cnn-corn-leaf-disease-detection',
    title: 'CNN-Based Corn Leaf Disease Detection',
    type: 'Mini project',
    category: 'Computer vision and machine learning',
    status: 'completed',
    repository: null,
    liveDemo: null,
    contribution: 'Team collaboration',
    summary:
      'A CNN-based image classification mini project focused on corn leaf disease detection using a practical machine learning workflow.',
    description:
      'This project involved building and evaluating a CNN for image-based disease classification, following a real-world machine learning workflow in a team collaboration setting.',
    purpose:
      'To explore CNN-based image classification for corn leaf disease detection as a practical machine learning mini project.',
    architecture:
      'A CNN-based image classification workflow covering model design and evaluation.',
    engineeringDecisions: [
      'Used a CNN approach for image-based classification.',
      'Focused on a practical model design and evaluation workflow.',
    ],
    challenges: [
      'Working through image classification and model evaluation as a team project.',
    ],
    technologies: [
      'Python',
      'CNN',
      'Image classification',
      'Machine learning',
    ],
    features: [
      'CNN-based image classification',
      'Model design',
      'Model evaluation',
      'Practical machine learning workflow',
      'Team collaboration',
    ],
    screenshots: [],
    published: true,
  },
];

export const sourceProjectMap = Object.fromEntries(
  projects.map((project) => [project.slug, project]),
);

async function loadPortfolioData(): Promise<PortfolioData> {
  const fallback = {
    profile,
    experiences,
    education,
    certifications,
    achievements,
    skillGroups,
    projects,
    blogPosts: [],
    testimonials: [],
  } satisfies PortfolioData;

  const supabase = createSupabasePublicServerClient();

  if (!supabase) {
    return fallback;
  }

  try {
    const [
      projectsRes,
      experiencesRes,
      educationRes,
      certificationsRes,
      achievementsRes,
      skillsRes,
      blogPostsRes,
      testimonialsRes,
      screenshotsRes,
    ] = await Promise.all([
      supabase
        .from('projects')
        .select(
          'id, slug, title, contribution_type, status, repository_url, short_description, description, published',
        )
        .eq('published', true)
        .order('created_at', { ascending: false }),
      supabase
        .from('experiences')
        .select(
          'id, role, company_name, location, start_date, end_date, description, published, sort_order',
        )
        .eq('published', true)
        .order('sort_order', { ascending: true })
        .order('start_date', { ascending: false }),
      supabase
        .from('education')
        .select(
          'institution_name, program_name, graduation_date, cgpa, published',
        )
        .eq('published', true)
        .order('graduation_date', { ascending: false }),
      supabase
        .from('certifications')
        .select('name, issuer, published')
        .eq('published', true)
        .order('name', { ascending: true }),
      supabase
        .from('achievements')
        .select(
          'title, organization, category, period, published',
        )
        .eq('published', true)
        .order('category', { ascending: true }),
      supabase
        .from('skills')
        .select('name, category, sort_order')
        .order('sort_order', { ascending: true }),
      supabase
        .from('blog_posts')
        .select(
          'id, slug, title, excerpt, content, cover_image_url, tags, published, published_at, created_at, updated_at',
        )
        .eq('published', true)
        .or('published_at.is.null,published_at.lte.now()')
        .order('published_at', {
          ascending: false,
          nullsFirst: false,
        })
        .order('created_at', { ascending: false }),
      supabase
        .from('testimonials')
        .select(
          'id, quote, author_name, author_role, organization, avatar_url, published, sort_order, created_at',
        )
        .eq('published', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false }),
      supabase
        .from('project_screenshots')
        .select('project_id, image_url, sort_order')
        .order('sort_order', { ascending: true }),
    ]);

    const remoteSkills = (skillsRes.data ?? []) as Array<{
      category: string;
      sort_order: number;
      name: string;
    }>;
    const groupedSkills = Array.from(
      new Set(remoteSkills.map((skill) => skill.category)),
    ).map((category) => ({
      title: category,
      items: remoteSkills
        .filter((skill) => skill.category === category)
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((skill) => skill.name),
    }));

    const projectScreenshots = (screenshotsRes.data ??
      []) as Array<{
      project_id: string;
      image_url: string;
      sort_order: number;
    }>;

    const remoteProjects = (
      (projectsRes.data ?? []) as Array<{
        id: string;
        slug: string;
        title: string;
        contribution_type?: string;
        status: string;
        repository_url?: string | null;
        short_description?: string | null;
        description?: string | null;
        published: boolean;
      }>
    ).map((project) => ({
      id: project.id,
      slug: project.slug,
      title: project.title,
      type: project.contribution_type ?? 'individual',
      category:
        project.contribution_type ?? 'Software project',
      status: project.status,
      repository: project.repository_url ?? null,
      liveDemo: null,
      contribution:
        project.contribution_type ?? 'individual',
      summary:
        project.short_description ??
        project.description ??
        '',
      description: project.description ?? '',
      purpose:
        project.short_description ??
        project.description ??
        '',
      architecture:
        'Architecture details are not yet populated in the connected project record.',
      engineeringDecisions: [],
      challenges: [],
      technologies: remoteSkills
        .slice(0, 8)
        .map((skill) => skill.name),
      features: project.description
        ? project.description
            .split(/\s+[•-]\s+|\n+/)
            .filter(Boolean)
            .slice(0, 6)
        : [],
      screenshots: projectScreenshots
        .filter(
          (screenshot) =>
            screenshot.project_id === project.id,
        )
        .map((screenshot) => screenshot.image_url),
      published: project.published,
    }));

    const remoteExperiences = (
      (experiencesRes.data ?? []) as Array<{
        id: string;
        role: string;
        company_name: string;
        location?: string | null;
        start_date?: string | null;
        end_date?: string | null;
        description: string;
      }>
    ).map((exp) => ({
      id: exp.id,
      role: exp.role,
      company: exp.company_name,
      location: exp.location ?? '',
      period:
        exp.start_date && exp.end_date
          ? `${exp.start_date} – ${exp.end_date}`
          : (exp.start_date ?? 'Ongoing'),
      description: exp.description,
    }));

    const remoteEducation = (
      (educationRes.data ?? []) as Array<{
        institution_name: string;
        program_name: string;
        graduation_date?: string | null;
        cgpa?: string | null;
      }>
    ).map((item) => ({
      institution: item.institution_name,
      degree: item.program_name,
      graduation: item.graduation_date ?? '',
      cgpa: item.cgpa ?? '',
    }));

    const remoteCertifications = (
      (certificationsRes.data ?? []) as Array<{
        name: string;
        issuer: string;
      }>
    ).map((item) => ({
      name: item.name,
      issuer: item.issuer,
    }));

    const remoteAchievements = (
      (achievementsRes.data ?? []) as Array<{
        title: string;
        organization: string;
        category: string;
        period?: string | null;
      }>
    ).map((item) => ({
      title: item.title,
      organization: item.organization,
      category: item.category,
      period: item.period ?? '',
    }));

    const remoteBlogPosts = (
      (blogPostsRes.data ?? []) as Array<{
        id: string;
        slug: string;
        title: string;
        excerpt?: string | null;
        content: string;
        cover_image_url?: string | null;
        tags?: string[] | null;
        published: boolean;
        published_at?: string | null;
        created_at: string;
        updated_at: string;
      }>
    ).map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt ?? null,
      content: post.content,
      coverImageUrl: post.cover_image_url ?? null,
      tags: post.tags ?? [],
      published: post.published,
      publishedAt: post.published_at ?? null,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
    }));

    const remoteTestimonials = (
      (testimonialsRes.data ?? []) as Array<{
        id: string;
        quote: string;
        author_name: string;
        author_role?: string | null;
        organization?: string | null;
        avatar_url?: string | null;
        published: boolean;
        sort_order: number;
      }>
    ).map((testimonial) => ({
      id: testimonial.id,
      quote: testimonial.quote,
      authorName: testimonial.author_name,
      authorRole: testimonial.author_role ?? null,
      organization: testimonial.organization ?? null,
      avatarUrl: testimonial.avatar_url ?? null,
      published: testimonial.published,
      sortOrder: testimonial.sort_order,
    }));

    const data: PortfolioData = {
      profile,
      experiences: remoteExperiences.length
        ? remoteExperiences
        : experiences,
      education: remoteEducation.length
        ? remoteEducation
        : education,
      certifications: remoteCertifications.length
        ? remoteCertifications
        : certifications,
      achievements: remoteAchievements.length
        ? remoteAchievements
        : achievements,
      skillGroups: groupedSkills.length
        ? groupedSkills
        : skillGroups,
      projects: remoteProjects.length
        ? remoteProjects
        : projects,
      blogPosts: remoteBlogPosts,
      testimonials: remoteTestimonials,
    };

    return data;
  } catch (error) {
    console.warn(
      'Supabase portfolio data is unavailable; using fallback content.',
      error,
    );
    return fallback;
  }
}

export const getPortfolioData = unstable_cache(
  loadPortfolioData,
  ['portfolio-data'],
  { revalidate: 60, tags: ['portfolio-data'] },
);
