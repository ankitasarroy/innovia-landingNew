"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Eye, X, Plus, Minus } from "lucide-react"
import type { ProgressUpdate } from "@/lib/updates"

interface UpdateEditorProps {
  update: ProgressUpdate | null
  onSave: (update: ProgressUpdate) => void
  onCancel: () => void
}

export function UpdateEditor({ update, onSave, onCancel }: UpdateEditorProps) {
  const [title, setTitle] = useState("")
  const [type, setType] = useState<"milestone" | "progress" | "announcement" | "research">("progress")
  const [category, setCategory] = useState<
    "company" | "cybersecurity" | "education" | "healthcare" | "supply-chain" | "team"
  >("company")
  const [quarter, setQuarter] = useState("")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")
  const [achievements, setAchievements] = useState<string[]>([])
  const [newAchievement, setNewAchievement] = useState("")
  const [metrics, setMetrics] = useState<{ label: string; value: string; change?: string }[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [author, setAuthor] = useState("")
  const [featured, setFeatured] = useState(false)
  const [status, setStatus] = useState<"draft" | "published">("draft")
  const [isPreview, setIsPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (update) {
      setTitle(update.title)
      setType(update.type)
      setCategory(update.category)
      setQuarter(update.quarter)
      setSummary(update.summary)
      setContent(update.content)
      setAchievements(update.achievements || [])
      setMetrics(update.metrics || [])
      setTags(update.tags)
      setAuthor(update.author)
      setFeatured(update.featured)
      setStatus(update.status)
    } else {
      // Set defaults for new update
      const currentDate = new Date()
      const currentYear = currentDate.getFullYear()
      const currentQuarter = Math.ceil((currentDate.getMonth() + 1) / 3)
      setQuarter(`Q${currentQuarter} ${currentYear}`)
      setAuthor("InnovIA Team")
    }
  }, [update])

  const handleAddAchievement = () => {
    if (newAchievement.trim() && !achievements.includes(newAchievement.trim())) {
      setAchievements([...achievements, newAchievement.trim()])
      setNewAchievement("")
    }
  }

  const handleRemoveAchievement = (achievementToRemove: string) => {
    setAchievements(achievements.filter((achievement) => achievement !== achievementToRemove))
  }

  const handleAddMetric = () => {
    setMetrics([...metrics, { label: "", value: "", change: "" }])
  }

  const handleUpdateMetric = (index: number, field: string, value: string) => {
    const updatedMetrics = [...metrics]
    updatedMetrics[index] = { ...updatedMetrics[index], [field]: value }
    setMetrics(updatedMetrics)
  }

  const handleRemoveMetric = (index: number) => {
    setMetrics(metrics.filter((_, i) => i !== index))
  }

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.trim().split(/\s+/).length
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return `${minutes} min read`
  }

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Please enter a title")
      return
    }

    if (!summary.trim()) {
      alert("Please enter a summary")
      return
    }

    if (!content.trim()) {
      alert("Please enter content")
      return
    }

    setIsSaving(true)

    try {
      const updateData: ProgressUpdate = {
        id: update?.id || "",
        title: title.trim(),
        type,
        category,
        date: update?.date || new Date().toISOString().split("T")[0],
        quarter,
        summary: summary.trim(),
        content: content.trim(),
        achievements: achievements.length > 0 ? achievements : undefined,
        metrics: metrics.length > 0 ? metrics : undefined,
        tags,
        author,
        status,
        featured,
        readTime: calculateReadTime(content),
      }

      await onSave(updateData)
    } catch (error) {
      console.error("Save error:", error)
      alert("Failed to save. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "milestone":
        return "from-green-600 to-emerald-600"
      case "progress":
        return "from-blue-600 to-cyan-600"
      case "announcement":
        return "from-purple-600 to-pink-600"
      case "research":
        return "from-orange-600 to-yellow-600"
      default:
        return "from-gray-600 to-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={onCancel}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white">{update?.id ? "Edit" : "Create"} Progress Update</h1>
                <p className="text-sm text-gray-400">
                  {update?.id ? "Update your progress report" : "Share your latest milestone or progress"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                onClick={() => setIsPreview(!isPreview)}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Eye className="w-4 h-4 mr-2" />
                {isPreview ? "Edit" : "Preview"}
              </Button>
              <Button
                onClick={() => setStatus(status === "draft" ? "published" : "draft")}
                variant="outline"
                className={`border-gray-600 ${
                  status === "published" ? "text-green-400 hover:bg-green-600" : "text-yellow-400 hover:bg-yellow-600"
                }`}
              >
                {status === "published" ? "Published" : "Draft"}
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className={`bg-gradient-to-r ${getTypeColor(type)} text-white`}
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {isPreview ? (
          /* Preview Mode */
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center space-x-4 mb-6">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${getTypeColor(type)} rounded-lg flex items-center justify-center`}
                  >
                    <span className="text-white font-semibold text-sm">{type[0].toUpperCase()}</span>
                  </div>
                  <div>
                    <Badge className={`bg-blue-600 text-white mb-2`}>{category.replace("-", " ")}</Badge>
                    <div className="text-sm text-gray-400">
                      {quarter} • {calculateReadTime(content)}
                    </div>
                  </div>
                </div>

                <h1 className="text-4xl font-bold text-white mb-4">{title || "Untitled Update"}</h1>
                <p className="text-xl text-gray-400 mb-6">{summary}</p>
                <div className="text-sm text-gray-500 mb-8">By {author}</div>

                {metrics.length > 0 && (
                  <div className="grid md:grid-cols-4 gap-4 mb-8">
                    {metrics.map((metric, index) => (
                      <div key={index} className="bg-gray-700/30 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-400 mb-1">{metric.value}</div>
                        <div className="text-sm text-gray-400 mb-1">{metric.label}</div>
                        {metric.change && <div className="text-xs text-green-400">{metric.change}</div>}
                      </div>
                    ))}
                  </div>
                )}

                <div className="prose prose-invert max-w-none mb-8">
                  <div className="whitespace-pre-wrap text-gray-300 leading-relaxed text-lg">
                    {content || "Start writing your content..."}
                  </div>
                </div>

                {achievements.length > 0 && (
                  <div className="bg-gray-700/30 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-green-400 mb-4">Key Achievements</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-300 text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="border-blue-400 text-blue-400">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Edit Mode */
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Update Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Type *</label>
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value as any)}
                        className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2"
                      >
                        <option value="progress">Progress Update</option>
                        <option value="milestone">Milestone</option>
                        <option value="announcement">Announcement</option>
                        <option value="research">Research</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
                        className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2"
                      >
                        <option value="company">Company</option>
                        <option value="cybersecurity">Cybersecurity</option>
                        <option value="education">Education</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="supply-chain">Supply Chain</option>
                        <option value="team">Team</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="Enter update title..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Summary *</label>
                    <Textarea
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="Brief summary that will appear in the updates list..."
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Content * ({calculateReadTime(content)})
                    </label>
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white min-h-96"
                      placeholder="Write your detailed update content here... You can use markdown formatting."
                      required
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Tip: Use markdown formatting like **bold**, *italic*, # headings, etc.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Key Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        value={newAchievement}
                        onChange={(e) => setNewAchievement(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleAddAchievement()}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Add achievement..."
                      />
                      <Button onClick={handleAddAchievement} size="sm" className="bg-green-600 hover:bg-green-700">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-700/30 rounded-lg p-3">
                          <span className="text-gray-300 text-sm">{achievement}</span>
                          <button
                            onClick={() => handleRemoveAchievement(achievement)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Metrics */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    Metrics
                    <Button onClick={handleAddMetric} size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {metrics.map((metric, index) => (
                      <div key={index} className="bg-gray-700/30 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-300">Metric {index + 1}</span>
                          <button onClick={() => handleRemoveMetric(index)} className="text-red-400 hover:text-red-300">
                            <Minus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <Input
                            value={metric.label}
                            onChange={(e) => handleUpdateMetric(index, "label", e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white text-sm"
                            placeholder="Label"
                          />
                          <Input
                            value={metric.value}
                            onChange={(e) => handleUpdateMetric(index, "value", e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white text-sm"
                            placeholder="Value"
                          />
                          <Input
                            value={metric.change || ""}
                            onChange={(e) => handleUpdateMetric(index, "change", e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white text-sm"
                            placeholder="Change (optional)"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publishing */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Publishing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Quarter</label>
                      <Input
                        value={quarter}
                        onChange={(e) => setQuarter(e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Q1 2025"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Author</label>
                      <Input
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Author name"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="rounded border-gray-600 bg-gray-700"
                      />
                      <label htmlFor="featured" className="text-sm text-gray-300">
                        Featured Update
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Add tag..."
                      />
                      <Button onClick={handleAddTag} size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="border-blue-400 text-blue-400 pr-1">
                          {tag}
                          <button onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-red-400">
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
