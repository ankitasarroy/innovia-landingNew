"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye, Calendar } from "lucide-react"

interface ContentItem {
  id: string
  title: string
  type: "article" | "blog" | "research"
  status: "draft" | "published"
  date: string
  excerpt: string
}

interface ContentListProps {
  items: ContentItem[]
  onEdit: (item: ContentItem) => void
  onDelete: (id: string) => void
}

export function ContentList({ items, onEdit, onDelete }: ContentListProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "article":
        return "bg-blue-600"
      case "blog":
        return "bg-purple-600"
      case "research":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "published" ? "bg-green-600" : "bg-yellow-600"
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p>No content found. Create your first item to get started.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-gray-700 rounded-lg p-6 border border-gray-600 hover:border-gray-500 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <Badge className={`${getTypeColor(item.type)} text-white`}>{item.type}</Badge>
                <Badge className={`${getStatusColor(item.status)} text-white`}>{item.status}</Badge>
              </div>

              <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.excerpt}</p>

              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="w-3 h-3 mr-1" />
                <span>{new Date(item.date).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 ml-4">
              <Button
                size="sm"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-600 bg-transparent"
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button size="sm" onClick={() => onEdit(item)} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                onClick={() => onDelete(item.id)}
                variant="outline"
                className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
