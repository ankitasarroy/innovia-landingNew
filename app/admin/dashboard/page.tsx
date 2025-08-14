"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, FileText, BookOpen, FlaskConical, TrendingUp, Target, Megaphone, Mail } from "lucide-react"
import { AdminHeader } from "@/components/admin/admin-header"
import { ArticleEditor } from "@/components/admin/article-editor"
import { UpdateEditor } from "@/components/admin/update-editor"
import { ContentList } from "@/components/admin/content-list"
import { EmailManagement } from "@/components/admin/email-management"
import { loadArticles, saveArticle, type Article } from "@/lib/articles"
import { loadUpdates, saveUpdate, type ProgressUpdate } from "@/lib/updates"

interface ContentItem {
  id: string
  title: string
  type: "article" | "blog" | "research" | "milestone" | "progress" | "announcement"
  status: "draft" | "published"
  date: string
  excerpt: string
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [showEditor, setShowEditor] = useState(false)
  const [showUpdateEditor, setShowUpdateEditor] = useState(false)
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null)
  const [editingUpdate, setEditingUpdate] = useState<ProgressUpdate | null>(null)
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [updateItems, setUpdateItems] = useState<ContentItem[]>([])

  useEffect(() => {
    const auth = localStorage.getItem("admin_authenticated")
    if (auth === "true") {
      setIsAuthenticated(true)
      // Load articles from storage
      const articles = loadArticles()
      const contentItems = articles.map((article) => ({
        id: article.id,
        title: article.title,
        type: article.type,
        status: article.status,
        date: article.date,
        excerpt: article.excerpt,
      }))
      setContentItems(contentItems)

      // Load updates from storage
      const updates = loadUpdates()
      const updateItems = updates.map((update) => ({
        id: update.id,
        title: update.title,
        type: update.type as any,
        status: update.status,
        date: update.date,
        excerpt: update.summary,
      }))
      setUpdateItems(updateItems)
    } else {
      window.location.href = "/admin"
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("admin_authenticated")
    window.location.href = "/admin"
  }

  const handleNewContent = (type: "article" | "blog" | "research") => {
    setEditingItem({
      id: "",
      title: "",
      type,
      status: "draft",
      date: new Date().toISOString().split("T")[0],
      excerpt: "",
    })
    setShowEditor(true)
  }

  const handleNewUpdate = (type: "milestone" | "progress" | "announcement") => {
    setEditingUpdate({
      id: "",
      title: "",
      type,
      category: "company",
      date: new Date().toISOString().split("T")[0],
      quarter: `Q${Math.ceil((new Date().getMonth() + 1) / 3)} ${new Date().getFullYear()}`,
      summary: "",
      content: "",
      tags: [],
      author: "InnovIA Team",
      status: "draft",
      featured: false,
      readTime: "1 min read",
    })
    setShowUpdateEditor(true)
  }

  const handleEditContent = (item: ContentItem) => {
    if (["milestone", "progress", "announcement"].includes(item.type)) {
      const update = loadUpdates().find((u) => u.id === item.id)
      if (update) {
        setEditingUpdate(update)
        setShowUpdateEditor(true)
      }
    } else {
      setEditingItem(item)
      setShowEditor(true)
    }
  }

  const handleDeleteContent = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setContentItems((items) => items.filter((item) => item.id !== id))
      setUpdateItems((items) => items.filter((item) => item.id !== id))
    }
  }

  const handleSaveContent = (
    content: ContentItem & { content?: string; tags?: string[]; image?: string; readTime?: string },
  ) => {
    const article: Article = {
      id: content.id || `${content.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: content.title,
      excerpt: content.excerpt,
      image: content.image || "",
      date: content.date,
      readTime: content.readTime || "5 min read",
      content: content.content || "",
      tags: content.tags || [],
      type: content.type as any,
      status: content.status,
      author: "InnovIA Research Team",
    }

    saveArticle(article)

    // Update local state
    if (content.id) {
      setContentItems((items) => items.map((item) => (item.id === content.id ? content : item)))
    } else {
      setContentItems((items) => [content, ...items])
    }

    setShowEditor(false)
    setEditingItem(null)
  }

  const handleSaveUpdate = (update: ProgressUpdate) => {
    saveUpdate(update)

    // Update local state
    const updateItem: ContentItem = {
      id: update.id,
      title: update.title,
      type: update.type as any,
      status: update.status,
      date: update.date,
      excerpt: update.summary,
    }

    if (update.id && updateItems.find((item) => item.id === update.id)) {
      setUpdateItems((items) => items.map((item) => (item.id === update.id ? updateItem : item)))
    } else {
      setUpdateItems((items) => [updateItem, ...items])
    }

    setShowUpdateEditor(false)
    setEditingUpdate(null)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (showEditor) {
    return (
      <ArticleEditor
        item={editingItem}
        onSave={handleSaveContent}
        onCancel={() => {
          setShowEditor(false)
          setEditingItem(null)
        }}
      />
    )
  }

  if (showUpdateEditor) {
    return (
      <UpdateEditor
        update={editingUpdate}
        onSave={handleSaveUpdate}
        onCancel={() => {
          setShowUpdateEditor(false)
          setEditingUpdate(null)
        }}
      />
    )
  }

  const stats = {
    articles: contentItems.filter((item) => item.type === "article").length,
    blogs: contentItems.filter((item) => item.type === "blog").length,
    research: contentItems.filter((item) => item.type === "research").length,
    updates: updateItems.length,
    milestones: updateItems.filter((item) => item.type === "milestone").length,
    published: [...contentItems, ...updateItems].filter((item) => item.status === "published").length,
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminHeader onSignOut={handleSignOut} />

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Content Management Dashboard</h1>
          <p className="text-gray-400">
            Manage your articles, blog posts, research publications, progress updates, and email notifications
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
              Overview
            </TabsTrigger>
            <TabsTrigger value="articles" className="data-[state=active]:bg-blue-600">
              Articles
            </TabsTrigger>
            <TabsTrigger value="blogs" className="data-[state=active]:bg-blue-600">
              Blog Posts
            </TabsTrigger>
            <TabsTrigger value="research" className="data-[state=active]:bg-blue-600">
              Research
            </TabsTrigger>
            <TabsTrigger value="updates" className="data-[state=active]:bg-blue-600">
              Progress Updates
            </TabsTrigger>
            <TabsTrigger value="email" className="data-[state=active]:bg-blue-600">
              Email Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-6 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Total Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.articles}</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Blog Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.blogs}</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Research Papers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.research}</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Progress Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.updates}</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Milestones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.milestones}</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Published</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.published}</div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
                <CardDescription className="text-gray-400">Create new content or manage existing items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <Button
                    onClick={() => handleNewContent("article")}
                    className="bg-blue-600 hover:bg-blue-700 text-white h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <FileText className="w-6 h-6" />
                    <span>New Article</span>
                  </Button>

                  <Button
                    onClick={() => handleNewContent("blog")}
                    className="bg-purple-600 hover:bg-purple-700 text-white h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <BookOpen className="w-6 h-6" />
                    <span>New Blog Post</span>
                  </Button>

                  <Button
                    onClick={() => handleNewContent("research")}
                    className="bg-green-600 hover:bg-green-700 text-white h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <FlaskConical className="w-6 h-6" />
                    <span>New Research</span>
                  </Button>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => handleNewUpdate("progress")}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <TrendingUp className="w-6 h-6" />
                    <span>Progress Update</span>
                  </Button>

                  <Button
                    onClick={() => handleNewUpdate("milestone")}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <Target className="w-6 h-6" />
                    <span>Milestone</span>
                  </Button>

                  <Button
                    onClick={() => handleNewUpdate("announcement")}
                    className="bg-pink-600 hover:bg-pink-700 text-white h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <Megaphone className="w-6 h-6" />
                    <span>Announcement</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Content */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <ContentList
                    items={contentItems.slice(0, 3)}
                    onEdit={handleEditContent}
                    onDelete={handleDeleteContent}
                  />
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <ContentList
                    items={updateItems.slice(0, 3)}
                    onEdit={handleEditContent}
                    onDelete={handleDeleteContent}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="articles">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Articles</h2>
                <Button onClick={() => handleNewContent("article")} className="bg-blue-600 hover:bg-blue-700">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  New Article
                </Button>
              </div>
              <ContentList
                items={contentItems.filter((item) => item.type === "article")}
                onEdit={handleEditContent}
                onDelete={handleDeleteContent}
              />
            </div>
          </TabsContent>

          <TabsContent value="blogs">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
                <Button onClick={() => handleNewContent("blog")} className="bg-purple-600 hover:bg-purple-700">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  New Blog Post
                </Button>
              </div>
              <ContentList
                items={contentItems.filter((item) => item.type === "blog")}
                onEdit={handleEditContent}
                onDelete={handleDeleteContent}
              />
            </div>
          </TabsContent>

          <TabsContent value="research">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Research Papers</h2>
                <Button onClick={() => handleNewContent("research")} className="bg-green-600 hover:bg-green-700">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  New Research
                </Button>
              </div>
              <ContentList
                items={contentItems.filter((item) => item.type === "research")}
                onEdit={handleEditContent}
                onDelete={handleDeleteContent}
              />
            </div>
          </TabsContent>

          <TabsContent value="updates">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Progress Updates</h2>
                <div className="flex space-x-2">
                  <Button onClick={() => handleNewUpdate("progress")} className="bg-cyan-600 hover:bg-cyan-700">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Progress Update
                  </Button>
                  <Button onClick={() => handleNewUpdate("milestone")} className="bg-emerald-600 hover:bg-emerald-700">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Milestone
                  </Button>
                  <Button onClick={() => handleNewUpdate("announcement")} className="bg-pink-600 hover:bg-pink-700">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Announcement
                  </Button>
                </div>
              </div>
              <ContentList items={updateItems} onEdit={handleEditContent} onDelete={handleDeleteContent} />
            </div>
          </TabsContent>

          <TabsContent value="email">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <Mail className="w-6 h-6 mr-3 text-blue-400" />
                    Email Notifications
                  </h2>
                  <p className="text-gray-400 mt-1">Manage email subscribers and send notifications for updates</p>
                </div>
              </div>
              <EmailManagement />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
