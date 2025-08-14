"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp, Users, Target, ArrowRight, ExternalLink, Filter, Mail } from "lucide-react"
import { EmailSubscriptionForm } from "@/components/email-subscription-form"
import {
  getLatestUpdates,
  getFeaturedUpdates,
  getUpdatesByCategory,
  getAvailableCategories,
  getAvailableQuarters,
  type ProgressUpdate,
} from "@/lib/updates"

export function ProgressUpdatesSection() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedQuarter, setSelectedQuarter] = useState("all")
  const [updates, setUpdates] = useState<ProgressUpdate[]>([])
  const [featuredUpdates, setFeaturedUpdates] = useState<ProgressUpdate[]>([])
  const [categories, setCategories] = useState<{ value: string; label: string; count: number }[]>([])
  const [quarters, setQuarters] = useState<string[]>([])
  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false)

  useEffect(() => {
    setFeaturedUpdates(getFeaturedUpdates(2))
    setCategories(getAvailableCategories())
    setQuarters(getAvailableQuarters())
    setUpdates(getLatestUpdates(6))
  }, [])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    const filteredUpdates = getUpdatesByCategory(category, 6)
    setUpdates(filteredUpdates)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "milestone":
        return <Target className="w-4 h-4" />
      case "progress":
        return <TrendingUp className="w-4 h-4" />
      case "announcement":
        return <Calendar className="w-4 h-4" />
      case "research":
        return <Users className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "milestone":
        return "from-green-500 to-emerald-500"
      case "progress":
        return "from-blue-500 to-cyan-500"
      case "announcement":
        return "from-purple-500 to-pink-500"
      case "research":
        return "from-orange-500 to-yellow-500"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "company":
        return "bg-blue-600"
      case "cybersecurity":
        return "bg-red-600"
      case "education":
        return "bg-purple-600"
      case "healthcare":
        return "bg-green-600"
      case "supply-chain":
        return "bg-orange-600"
      case "team":
        return "bg-pink-600"
      default:
        return "bg-gray-600"
    }
  }

  const openUpdateDetail = (update: ProgressUpdate) => {
    const newWindow = window.open("", "_blank")
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${update.title} - InnovIA Technologies</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
          <style>
            body { 
              background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            .markdown-content h1 { @apply text-3xl font-bold text-white mb-6; }
            .markdown-content h2 { @apply text-2xl font-semibold text-blue-400 mb-4 mt-8; }
            .markdown-content h3 { @apply text-xl font-semibold text-purple-400 mb-3 mt-6; }
            .markdown-content p { @apply text-gray-300 mb-4 leading-relaxed; }
            .markdown-content ul { @apply text-gray-300 mb-4 space-y-2; }
            .markdown-content li { @apply ml-6; }
            .markdown-content strong { @apply text-white font-semibold; }
          </style>
        </head>
        <body class="min-h-screen text-white">
          <div class="container mx-auto px-4 py-12 max-w-4xl">
            <!-- Header -->
            <div class="mb-8">
              <div class="flex items-center space-x-4 mb-4">
                <div class="w-12 h-12 bg-gradient-to-r ${getTypeColor(update.type)} rounded-lg flex items-center justify-center">
                  ${getTypeIcon(update.type).props.children || '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>'}
                </div>
                <div>
                  <div class="flex items-center space-x-2 mb-2">
                    <span class="${getCategoryColor(update.category)} text-white text-xs px-2 py-1 rounded-full font-medium uppercase">
                      ${update.category.replace("-", " ")}
                    </span>
                    <span class="bg-gradient-to-r ${getTypeColor(update.type)} text-white text-xs px-2 py-1 rounded-full font-medium capitalize">
                      ${update.type}
                    </span>
                  </div>
                  <div class="text-sm text-gray-400">
                    ${new Date(update.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} • ${update.readTime}
                  </div>
                </div>
              </div>
              <h1 class="text-4xl font-bold text-white mb-4">${update.title}</h1>
              <p class="text-xl text-gray-400 mb-6">${update.summary}</p>
              <div class="text-sm text-gray-500">By ${update.author}</div>
            </div>

            <!-- Metrics -->
            ${
              update.metrics
                ? `
            <div class="grid md:grid-cols-4 gap-4 mb-8">
              ${update.metrics
                .map(
                  (metric) => `
                <div class="bg-gray-800/50 rounded-lg p-4 text-center">
                  <div class="text-2xl font-bold text-blue-400 mb-1">${metric.value}</div>
                  <div class="text-sm text-gray-400 mb-1">${metric.label}</div>
                  ${metric.change ? `<div class="text-xs text-green-400">${metric.change}</div>` : ""}
                </div>
              `,
                )
                .join("")}
            </div>
            `
                : ""
            }

            <!-- Content -->
            <div class="bg-gray-800/30 rounded-2xl p-8 mb-8">
              <div class="markdown-content" id="content"></div>
            </div>

            <!-- Achievements -->
            ${
              update.achievements
                ? `
            <div class="bg-gray-800/50 rounded-2xl p-6 mb-8">
              <h3 class="text-xl font-semibold text-green-400 mb-4">Key Achievements</h3>
              <div class="grid md:grid-cols-2 gap-3">
                ${update.achievements
                  .map(
                    (achievement) => `
                  <div class="flex items-start space-x-3">
                    <div class="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span class="text-gray-300 text-sm">${achievement}</span>
                  </div>
                `,
                  )
                  .join("")}
              </div>
            </div>
            `
                : ""
            }

            <!-- Back Button -->
            <div class="text-center">
              <button onclick="window.opener.focus(); window.close();" 
                      class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                Back to Updates
              </button>
            </div>

            <!-- Footer -->
            <div class="text-center mt-12 pt-8 border-t border-gray-700">
              <p class="text-gray-400">© 2025 InnovIA Technologies. All rights reserved.</p>
            </div>
          </div>

          <script>
            // Render markdown content
            document.getElementById('content').innerHTML = marked.parse(\`${update.content.replace(/`/g, "\\`")}\`);
          </script>
        </body>
        </html>
      `)
      newWindow.document.close()
    }
  }

  return (
    <section id="progress-updates" className="py-20 px-4 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Progress{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Updates</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Stay informed about our latest milestones, research breakthroughs, and development progress across all AI
            initiatives
          </p>
        </div>

        {/* Featured Updates */}
        {featuredUpdates.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-white mb-8 flex items-center">
              <Target className="w-6 h-6 mr-3 text-yellow-400" />
              Featured Updates
            </h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredUpdates.map((update, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-yellow-400/30 hover:border-yellow-400/60 transition-all duration-300 cursor-pointer card-3d depth-shadow"
                  onClick={() => openUpdateDetail(update)}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${getTypeColor(update.type)} rounded-lg flex items-center justify-center`}
                      >
                        {getTypeIcon(update.type)}
                      </div>
                      <div>
                        <Badge className={`${getCategoryColor(update.category)} text-white mb-2`}>
                          {update.category.replace("-", " ")}
                        </Badge>
                        <div className="text-sm text-gray-400">
                          {new Date(update.date).toLocaleDateString()} • {update.readTime}
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 hover:text-white transition-colors duration-200" />
                  </div>

                  <h4 className="text-xl font-semibold text-white mb-4 hover:text-yellow-400 transition-colors duration-300">
                    {update.title}
                  </h4>

                  <p className="text-gray-400 leading-relaxed mb-6">{update.summary}</p>

                  {/* Metrics */}
                  {update.metrics && (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {update.metrics.slice(0, 2).map((metric, metricIndex) => (
                        <div key={metricIndex} className="bg-gray-700/30 rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-blue-400">{metric.value}</div>
                          <div className="text-xs text-gray-400">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">By {update.author}</span>
                    <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-white">
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange("all")}
                className={
                  selectedCategory === "all"
                    ? "bg-blue-600 text-white"
                    : "border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                }
              >
                All Updates
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryChange(category.value)}
                  className={
                    selectedCategory === category.value
                      ? "bg-blue-600 text-white"
                      : "border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  }
                >
                  {category.label} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Updates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {updates.map((update, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-blue-400/50 transition-all duration-300 cursor-pointer card-3d depth-shadow"
              onClick={() => openUpdateDetail(update)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 bg-gradient-to-r ${getTypeColor(update.type)} rounded-lg flex items-center justify-center`}
                  >
                    {getTypeIcon(update.type)}
                  </div>
                  <div>
                    <Badge className={`${getCategoryColor(update.category)} text-white text-xs`}>
                      {update.category.replace("-", " ")}
                    </Badge>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white transition-colors duration-200" />
              </div>

              <h4 className="text-lg font-semibold text-white mb-3 hover:text-blue-400 transition-colors duration-300">
                {update.title}
              </h4>

              <p className="text-gray-400 text-sm leading-relaxed mb-4">{update.summary}</p>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{new Date(update.date).toLocaleDateString()}</span>
                <span>{update.readTime}</span>
              </div>

              {update.achievements && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="text-xs text-gray-400 mb-2">Key Achievement:</div>
                  <div className="text-sm text-gray-300">{update.achievements[0]}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Email Subscription Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-white mb-4 flex items-center justify-center">
              <Mail className="w-6 h-6 mr-3 text-blue-400" />
              Never Miss an Update
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get notified instantly when we publish new milestones, progress updates, and breakthrough announcements
            </p>
          </div>

          {showSubscriptionForm ? (
            <div className="max-w-2xl mx-auto">
              <EmailSubscriptionForm
                onSubscribed={() => {
                  setShowSubscriptionForm(false)
                  setTimeout(() => setShowSubscriptionForm(true), 5000) // Show form again after 5 seconds
                }}
              />
            </div>
          ) : (
            <div className="text-center">
              <Button
                onClick={() => setShowSubscriptionForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
              >
                <Mail className="w-5 h-5 mr-2" />
                Subscribe to Email Updates
              </Button>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-400/20">
            <h3 className="text-2xl font-semibold text-white mb-4">Stay Connected</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Follow our journey as we develop cutting-edge AI solutions. Subscribe to our newsletter for exclusive
              updates, research insights, and behind-the-scenes content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
                View All Updates
              </Button>
              <Button
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900 px-8 py-3 bg-transparent"
              >
                Follow on LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
