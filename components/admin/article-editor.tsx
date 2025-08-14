"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Eye, X } from "lucide-react"
import { ImageUpload } from "./image-upload"

interface ContentItem {
  id: string
  title: string
  type: "article" | "blog" | "research"
  status: "draft" | "published"
  date: string
  excerpt: string
}

interface ArticleEditorProps {
  item: ContentItem | null
  onSave: (content: ContentItem & { content?: string; tags?: string[]; image?: string; readTime?: string }) => void
  onCancel: () => void
}

export function ArticleEditor({ item, onSave, onCancel }: ArticleEditorProps) {
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [image, setImage] = useState("")
  const [readTime, setReadTime] = useState("")
  const [status, setStatus] = useState<"draft" | "published">("draft")
  const [isPreview, setIsPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (item) {
      setTitle(item.title)
      setExcerpt(item.excerpt)
      setStatus(item.status)
      // Load additional data if editing existing item
    }
  }, [item])

  // Auto-calculate read time based on content
  useEffect(() => {
    if (content) {
      const wordsPerMinute = 200
      const wordCount = content.trim().split(/\s+/).length
      const minutes = Math.ceil(wordCount / wordsPerMinute)
      setReadTime(`${minutes} min read`)
    }
  }, [content])

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Please enter a title")
      return
    }

    if (!excerpt.trim()) {
      alert("Please enter an excerpt")
      return
    }

    if (!content.trim()) {
      alert("Please enter some content")
      return
    }

    setIsSaving(true)

    try {
      const contentData = {
        id: item?.id || "",
        title: title.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        tags,
        image,
        readTime,
        type: item?.type || "article",
        status,
        date: item?.date || new Date().toISOString().split("T")[0],
      }

      await onSave(contentData)
    } catch (error) {
      console.error("Save error:", error)
      alert("Failed to save. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "article":
        return "from-blue-600 to-blue-700"
      case "blog":
        return "from-purple-600 to-purple-700"
      case "research":
        return "from-green-600 to-green-700"
      default:
        return "from-gray-600 to-gray-700"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "article":
        return "Weekly Article"
      case "blog":
        return "Blog Post"
      case "research":
        return "Research Paper"
      default:
        return "Content"
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
                <h1 className="text-xl font-bold text-white">
                  {item?.id ? "Edit" : "Create"} {getTypeLabel(item?.type || "article")}
                </h1>
                <p className="text-sm text-gray-400">{item?.id ? "Update your content" : "Write something amazing"}</p>
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
                className={`bg-gradient-to-r ${getTypeColor(item?.type || "article")} text-white`}
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
                {image && (
                  <img
                    src={image || "/placeholder.svg"}
                    alt={title}
                    className="w-full h-64 object-cover rounded-lg mb-8"
                  />
                )}
                <div className="mb-6">
                  <Badge className={`bg-gradient-to-r ${getTypeColor(item?.type || "article")} text-white mb-4`}>
                    {getTypeLabel(item?.type || "article")}
                  </Badge>
                  <h1 className="text-4xl font-bold text-white mb-4">{title || "Untitled"}</h1>
                  <div className="flex items-center space-x-4 text-gray-400 mb-6">
                    <span>{new Date().toLocaleDateString()}</span>
                    {readTime && (
                      <>
                        <span>•</span>
                        <span>{readTime}</span>
                      </>
                    )}
                  </div>
                  <p className="text-xl text-gray-400 mb-6">{excerpt}</p>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="border-blue-400 text-blue-400">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-gray-300 leading-relaxed text-lg">
                    {content || "Start writing your content..."}
                  </div>
                </div>
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
                  <CardTitle className="text-white">Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="Enter your title..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt *</label>
                    <Textarea
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="Brief description that will appear on the main page..."
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Content * {readTime && <span className="text-blue-400">({readTime})</span>}
                    </label>
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white min-h-96"
                      placeholder="Write your content here... You can use markdown formatting for rich text."
                      required
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Tip: Use **bold**, *italic*, # headings, and other markdown formatting
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Featured Image */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Featured Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageUpload value={image} onChange={setImage} onRemove={() => setImage("")} />
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

              {/* Publishing */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Publishing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                        className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                      <Badge className={`bg-gradient-to-r ${getTypeColor(item?.type || "article")} text-white`}>
                        {getTypeLabel(item?.type || "article")}
                      </Badge>
                    </div>
                    {readTime && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Read Time</label>
                        <p className="text-gray-400 text-sm">{readTime}</p>
                      </div>
                    )}
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
