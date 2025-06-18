import { FiHeart, FiBook, FiTrendingUp, FiUsers } from "react-icons/fi";

export const themesData = ["light", "dark"];

export const navData = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
];

export const blogs = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2025",
    excerpt:
      "Explore the cutting-edge technologies and methodologies that are shaping the future of web development, from AI integration to advanced frameworks.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
    category: "Technology",
    author: {
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b1a0?w=100&h=100&fit=crop&crop=face",
    },
    publishDate: "2 days ago",
    likes: 324,
    comments: 45,
    readTime: 8,
    tags: ["webdev", "ai", "future", "technology"],
  },
  {
    id: 2,
    title: "Mastering React Hooks: A Complete Guide",
    excerpt:
      "Deep dive into React Hooks with practical examples and best practices that will transform your React development workflow.",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    category: "React",
    author: {
      name: "Alex Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    publishDate: "1 week ago",
    likes: 567,
    comments: 89,
    readTime: 12,
    tags: ["react", "hooks", "javascript", "tutorial"],
  },
  {
    id: 3,
    title: "Design Systems That Scale: Building for the Future",
    excerpt:
      "Learn how to create robust design systems that grow with your product and team, ensuring consistency across all touchpoints.",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop",
    category: "Design",
    author: {
      name: "Maya Patel",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    publishDate: "3 days ago",
    likes: 234,
    comments: 32,
    readTime: 6,
    tags: ["design", "systems", "ui", "scalability"],
  },
  {
    id: 4,
    title: "The Art of Technical Writing",
    excerpt:
      "Discover the secrets to creating clear, engaging technical documentation that developers actually want to read.",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop",
    category: "Writing",
    author: {
      name: "David Kim",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    publishDate: "5 days ago",
    likes: 189,
    comments: 27,
    readTime: 9,
    tags: ["writing", "documentation", "communication"],
  },
  {
    id: 5,
    title: "Building Accessible Web Applications",
    excerpt:
      "A comprehensive guide to creating inclusive web experiences that work for everyone, regardless of their abilities.",
    image:
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop",
    category: "Accessibility",
    author: {
      name: "Emma Thompson",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    },
    publishDate: "1 day ago",
    likes: 445,
    comments: 78,
    readTime: 15,
    tags: ["accessibility", "inclusive", "web", "a11y"],
  },
  {
    id: 6,
    title: "Mobile-First Development Strategies",
    excerpt:
      "Learn how to approach web development with a mobile-first mindset and create exceptional experiences across all devices.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    category: "Mobile",
    author: {
      name: "James Wilson",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    },
    publishDate: "4 days ago",
    likes: 298,
    comments: 41,
    readTime: 7,
    tags: ["mobile", "responsive", "strategy"],
  },
];

export const stats = [
  {
    icon: FiBook,
    title: "Total Articles",
    value: "1,234",
    change: 12,
    color: "bg-gradient-to-br from-blue-500 to-cyan-500",
  },
  {
    icon: FiUsers,
    title: "Active Readers",
    value: "45.2K",
    change: 8,
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
  {
    icon: FiHeart,
    title: "Total Likes",
    value: "89.1K",
    change: 15,
    color: "bg-gradient-to-br from-red-500 to-orange-500",
  },
  {
    icon: FiTrendingUp,
    title: "Engagement Rate",
    value: "73%",
    change: 5,
    color: "bg-gradient-to-br from-green-500 to-teal-500",
  },
];

export const categories = [
  "all",
  "technology",
  "react",
  "design",
  "writing",
  "accessibility",
  "mobile",
];
