// Article management utilities with Blob storage support
export interface Article {
  id: string
  title: string
  excerpt: string
  image: string
  date: string
  readTime: string
  content?: string // Full article content
  author?: string
  tags?: string[]
  type: "article" | "blog" | "research"
  status: "draft" | "published"
}

// Load articles from localStorage (temporary storage)
export function loadArticles(): Article[] {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem("innovia_articles")
  if (stored) {
    return JSON.parse(stored)
  }

  // Default articles
  return [
    {
      id: "ai-cybersecurity-2024",
      title: "The Future of AI in Cybersecurity: Beyond Traditional Defense",
      excerpt:
        "Exploring how machine learning algorithms are revolutionizing threat detection and response in modern cybersecurity frameworks.",
      image: "/ai-cybersecurity-neural-network.png",
      date: "2024-01-15",
      readTime: "8 min read",
      author: "InnovIA Research Team",
      tags: ["Cybersecurity", "Machine Learning", "Threat Detection"],
      type: "article",
      status: "published",
    },
    {
      id: "personalized-learning-ai",
      title: "Personalized Learning: How AI is Transforming Education",
      excerpt:
        "Discover the impact of artificial intelligence on personalized learning experiences and adaptive educational technologies.",
      image: "/ai-education-learning.png",
      date: "2024-01-08",
      readTime: "6 min read",
      author: "InnovIA Research Team",
      tags: ["Education", "Personalized Learning", "AI"],
      type: "article",
      status: "published",
    },
    {
      id: "ai-medical-diagnostics",
      title: "AI-Powered Medical Diagnostics: Revolutionizing Healthcare",
      excerpt:
        "Understanding how artificial intelligence is reshaping medical diagnostics and improving patient outcomes.",
      image: "/ai-fintech-payment.png",
      date: "2024-01-01",
      readTime: "7 min read",
      author: "InnovIA Research Team",
      tags: ["Healthcare", "Medical AI", "Diagnostics"],
      type: "article",
      status: "published",
    },
  ]
}

// Save articles to localStorage
export function saveArticles(articles: Article[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem("innovia_articles", JSON.stringify(articles))
}

// Save a single article
export function saveArticle(article: Article): void {
  const articles = loadArticles()
  const existingIndex = articles.findIndex((a) => a.id === article.id)

  if (existingIndex >= 0) {
    articles[existingIndex] = article
  } else {
    // Generate ID if new
    if (!article.id) {
      article.id = `${article.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }
    articles.unshift(article) // Add to beginning
  }

  saveArticles(articles)
}

export function getLatestArticles(limit = 3): Article[] {
  return loadArticles()
    .filter((article) => article.status === "published")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}

export function getArticleById(id: string): Article | undefined {
  return loadArticles().find((article) => article.id === id)
}
