import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"
import { getLatestArticles } from "@/lib/articles"

export function ArticlesSection() {
  const articles = getLatestArticles(3) // Get latest 3 articles

  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Weekly{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Articles</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Stay updated with the latest insights and developments in artificial intelligence research
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article
              key={article.id}
              className="group bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-400/50 transition-all duration-300 transform card-3d depth-shadow"
            >
              <div className="relative overflow-hidden perspective-container">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300 tilt-hover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-sm text-gray-400 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                  {article.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-4">{article.excerpt}</p>

                {article.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <Button
                  variant="ghost"
                  className="text-blue-400 hover:text-white hover:bg-blue-600 p-0 h-auto font-semibold group/btn btn-3d"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900 px-8 py-4 text-lg font-semibold bg-transparent"
          >
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  )
}
