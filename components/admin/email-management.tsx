"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Mail,
  Users,
  Send,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Search,
  Filter,
  Eye,
  Trash2,
  Settings,
} from "lucide-react"
import {
  loadSubscribers,
  loadEmailNotifications,
  getEmailTemplates,
  getRelevantSubscribers,
  queueEmailNotification,
  processTemplate,
  sendEmail,
  markNotificationSent,
  markNotificationFailed,
  generateUnsubscribeUrl,
  generatePreferencesUrl,
  type EmailSubscriber,
  type EmailNotification,
  type EmailTemplate,
} from "@/lib/email-notifications"
import { loadUpdates, type ProgressUpdate } from "@/lib/updates"

export function EmailManagement() {
  const [subscribers, setSubscribers] = useState<EmailSubscriber[]>([])
  const [notifications, setNotifications] = useState<EmailNotification[]>([])
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [updates, setUpdates] = useState<ProgressUpdate[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedUpdate, setSelectedUpdate] = useState<string>("")
  const [isSending, setIsSending] = useState(false)
  const [sendingProgress, setSendingProgress] = useState({ sent: 0, total: 0 })

  useEffect(() => {
    setSubscribers(loadSubscribers())
    setNotifications(loadEmailNotifications())
    setTemplates(getEmailTemplates())
    setUpdates(loadUpdates())
  }, [])

  const filteredSubscribers = subscribers.filter((subscriber) => {
    const matchesSearch =
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (subscriber.name && subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || subscriber.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const subscriberStats = {
    total: subscribers.length,
    active: subscribers.filter((s) => s.status === "active").length,
    unsubscribed: subscribers.filter((s) => s.status === "unsubscribed").length,
    bounced: subscribers.filter((s) => s.status === "bounced").length,
  }

  const notificationStats = {
    total: notifications.length,
    sent: notifications.filter((n) => n.status === "sent").length,
    pending: notifications.filter((n) => n.status === "pending").length,
    failed: notifications.filter((n) => n.status === "failed").length,
  }

  const handleSendNotification = async (updateId: string) => {
    const update = updates.find((u) => u.id === updateId)
    if (!update) return

    setIsSending(true)
    setSendingProgress({ sent: 0, total: 0 })

    try {
      // Get relevant subscribers
      const relevantSubscribers = getRelevantSubscribers(update.type, update.category)
      setSendingProgress({ sent: 0, total: relevantSubscribers.length })

      if (relevantSubscribers.length === 0) {
        alert("No subscribers match the criteria for this update.")
        return
      }

      // Get appropriate template
      const template = templates.find((t) => t.type === update.type) || templates[0]

      // Process each subscriber
      for (let i = 0; i < relevantSubscribers.length; i++) {
        const subscriber = relevantSubscribers[i]

        try {
          // Queue notification
          const notificationId = queueEmailNotification(update.id, subscriber.id, template.id)

          // Process template with update data
          const templateVariables = {
            title: update.title,
            summary: update.summary,
            category: update.category,
            metrics: update.metrics,
            achievements: update.achievements,
            readMoreUrl: `${window.location.origin}/#progress-updates`,
            logoUrl: `${window.location.origin}/innovia-logo.png`,
            unsubscribeUrl: generateUnsubscribeUrl(subscriber.id),
            preferencesUrl: generatePreferencesUrl(subscriber.id),
          }

          const { subject, htmlContent, textContent } = processTemplate(template, templateVariables)

          // Send email (simulated)
          const result = await sendEmail(subscriber.email, subject, htmlContent, textContent)

          if (result.success) {
            markNotificationSent(notificationId, result.messageId)
          } else {
            markNotificationFailed(notificationId, result.error || "Unknown error")
          }

          setSendingProgress({ sent: i + 1, total: relevantSubscribers.length })

          // Small delay to prevent overwhelming the email service
          await new Promise((resolve) => setTimeout(resolve, 100))
        } catch (error) {
          console.error(`Failed to send to ${subscriber.email}:`, error)
        }
      }

      // Refresh notifications
      setNotifications(loadEmailNotifications())
      alert(`Successfully processed ${relevantSubscribers.length} email notifications!`)
    } catch (error) {
      console.error("Bulk send error:", error)
      alert("Failed to send notifications. Please try again.")
    } finally {
      setIsSending(false)
      setSendingProgress({ sent: 0, total: 0 })
    }
  }

  const exportSubscribers = () => {
    const csvContent = [
      [
        "Email",
        "Name",
        "Status",
        "Subscription Date",
        "Milestones",
        "Progress",
        "Announcements",
        "Research",
        "Categories",
      ].join(","),
      ...filteredSubscribers.map((sub) =>
        [
          sub.email,
          sub.name || "",
          sub.status,
          sub.subscriptionDate,
          sub.preferences.milestones,
          sub.preferences.progress,
          sub.preferences.announcements,
          sub.preferences.research,
          sub.preferences.categories.join(";"),
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `innovia-subscribers-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Subscribers</p>
                <p className="text-2xl font-bold text-white">{subscriberStats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Subscribers</p>
                <p className="text-2xl font-bold text-green-400">{subscriberStats.active}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Emails Sent</p>
                <p className="text-2xl font-bold text-blue-400">{notificationStats.sent}</p>
              </div>
              <Send className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Failed Sends</p>
                <p className="text-2xl font-bold text-red-400">{notificationStats.failed}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subscribers" className="space-y-4">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="subscribers" className="data-[state=active]:bg-gray-700">
            Subscribers
          </TabsTrigger>
          <TabsTrigger value="send" className="data-[state=active]:bg-gray-700">
            Send Notifications
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-gray-700">
            Notification History
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-gray-700">
            Templates
          </TabsTrigger>
        </TabsList>

        {/* Subscribers Tab */}
        <TabsContent value="subscribers" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-400" />
                  Email Subscribers
                </CardTitle>
                <Button
                  onClick={exportSubscribers}
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 bg-transparent"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search by email or name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2 text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="unsubscribed">Unsubscribed</option>
                    <option value="bounced">Bounced</option>
                  </select>
                </div>
              </div>

              {/* Subscribers List */}
              <div className="space-y-3">
                {filteredSubscribers.map((subscriber) => (
                  <div key={subscriber.id} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-white font-medium">{subscriber.email}</h3>
                          <Badge
                            className={`${
                              subscriber.status === "active"
                                ? "bg-green-600"
                                : subscriber.status === "unsubscribed"
                                  ? "bg-red-600"
                                  : "bg-yellow-600"
                            } text-white`}
                          >
                            {subscriber.status}
                          </Badge>
                        </div>
                        {subscriber.name && <p className="text-gray-400 text-sm mb-2">Name: {subscriber.name}</p>}
                        <p className="text-gray-400 text-sm mb-3">
                          Subscribed: {new Date(subscriber.subscriptionDate).toLocaleDateString()}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {subscriber.preferences.milestones && (
                            <Badge className="bg-blue-600 text-white text-xs">Milestones</Badge>
                          )}
                          {subscriber.preferences.progress && (
                            <Badge className="bg-purple-600 text-white text-xs">Progress</Badge>
                          )}
                          {subscriber.preferences.announcements && (
                            <Badge className="bg-green-600 text-white text-xs">Announcements</Badge>
                          )}
                          {subscriber.preferences.research && (
                            <Badge className="bg-orange-600 text-white text-xs">Research</Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {subscriber.preferences.categories.map((category) => (
                            <Badge key={category} variant="outline" className="text-xs border-gray-500 text-gray-300">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredSubscribers.length === 0 && (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No subscribers found matching your criteria.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Send Notifications Tab */}
        <TabsContent value="send" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Send className="w-5 h-5 mr-2 text-purple-400" />
                Send Email Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-400/20">
                  <h3 className="text-blue-400 font-semibold mb-3">Select Update to Send</h3>
                  <select
                    value={selectedUpdate}
                    onChange={(e) => setSelectedUpdate(e.target.value)}
                    className="w-full bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2"
                  >
                    <option value="">Select an update...</option>
                    {updates.map((update) => (
                      <option key={update.id} value={update.id}>
                        {update.title} ({update.type} - {update.category})
                      </option>
                    ))}
                  </select>
                </div>

                {selectedUpdate && (
                  <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
                    {(() => {
                      const update = updates.find((u) => u.id === selectedUpdate)
                      if (!update) return null

                      const relevantSubscribers = getRelevantSubscribers(update.type, update.category)
                      const template = templates.find((t) => t.type === update.type)

                      return (
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-white font-semibold mb-2">Update Preview</h4>
                            <div className="bg-gray-800/50 rounded-lg p-3">
                              <p className="text-white font-medium">{update.title}</p>
                              <p className="text-gray-400 text-sm mt-1">{update.summary}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <Badge className="bg-blue-600 text-white">{update.type}</Badge>
                                <Badge variant="outline" className="border-gray-500 text-gray-300">
                                  {update.category}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-white font-semibold mb-2">Email Details</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-gray-800/50 rounded-lg p-3">
                                <p className="text-gray-400 text-sm">Template</p>
                                <p className="text-white">{template?.name || "Default Template"}</p>
                              </div>
                              <div className="bg-gray-800/50 rounded-lg p-3">
                                <p className="text-gray-400 text-sm">Recipients</p>
                                <p className="text-white">{relevantSubscribers.length} subscribers</p>
                              </div>
                            </div>
                          </div>

                          {relevantSubscribers.length > 0 ? (
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-400">
                                Ready to send to {relevantSubscribers.length} subscriber
                                {relevantSubscribers.length !== 1 ? "s" : ""}
                              </div>
                              <Button
                                onClick={() => handleSendNotification(selectedUpdate)}
                                disabled={isSending}
                                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                              >
                                {isSending ? (
                                  <>
                                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                                    Sending... ({sendingProgress.sent}/{sendingProgress.total})
                                  </>
                                ) : (
                                  <>
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Notifications
                                  </>
                                )}
                              </Button>
                            </div>
                          ) : (
                            <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-400/20">
                              <p className="text-yellow-400 text-sm">
                                No subscribers match the criteria for this update. Check subscriber preferences and
                                categories.
                              </p>
                            </div>
                          )}
                        </div>
                      )
                    })()}
                  </div>
                )}

                {isSending && (
                  <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-400/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-400 font-medium">Sending Progress</span>
                      <span className="text-white text-sm">
                        {sendingProgress.sent} / {sendingProgress.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${sendingProgress.total > 0 ? (sendingProgress.sent / sendingProgress.total) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification History Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Mail className="w-5 h-5 mr-2 text-green-400" />
                Notification History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.length > 0 ? (
                  notifications
                    .sort((a, b) => (b.sentAt || b.id).localeCompare(a.sentAt || a.id))
                    .slice(0, 50)
                    .map((notification) => {
                      const subscriber = subscribers.find((s) => s.id === notification.subscriberId)
                      const update = updates.find((u) => u.id === notification.updateId)
                      const template = templates.find((t) => t.id === notification.templateId)

                      return (
                        <div key={notification.id} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-white font-medium">{update?.title || "Unknown Update"}</h3>
                                <Badge
                                  className={`${
                                    notification.status === "sent"
                                      ? "bg-green-600"
                                      : notification.status === "failed"
                                        ? "bg-red-600"
                                        : notification.status === "pending"
                                          ? "bg-yellow-600"
                                          : "bg-gray-600"
                                  } text-white`}
                                >
                                  {notification.status}
                                </Badge>
                              </div>
                              <p className="text-gray-400 text-sm mb-1">
                                To: {subscriber?.email || "Unknown Subscriber"}
                              </p>
                              <p className="text-gray-400 text-sm mb-1">
                                Template: {template?.name || "Unknown Template"}
                              </p>
                              {notification.sentAt && (
                                <p className="text-gray-400 text-sm">
                                  Sent: {new Date(notification.sentAt).toLocaleString()}
                                </p>
                              )}
                              {notification.errorMessage && (
                                <p className="text-red-400 text-sm mt-2">Error: {notification.errorMessage}</p>
                              )}
                            </div>
                            <div className="flex items-center">
                              {notification.status === "sent" && <CheckCircle className="w-5 h-5 text-green-400" />}
                              {notification.status === "failed" && <XCircle className="w-5 h-5 text-red-400" />}
                              {notification.status === "pending" && <Clock className="w-5 h-5 text-yellow-400" />}
                            </div>
                          </div>
                        </div>
                      )
                    })
                ) : (
                  <div className="text-center py-8">
                    <Mail className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No email notifications sent yet.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Settings className="w-5 h-5 mr-2 text-orange-400" />
                Email Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <div key={template.id} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-white font-semibold">{template.name}</h3>
                        <Badge className="bg-blue-600 text-white mt-1">{template.type}</Badge>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">Subject: {template.subject}</p>
                    <div className="flex flex-wrap gap-1">
                      {template.variables.map((variable) => (
                        <Badge key={variable} variant="outline" className="text-xs border-gray-500 text-gray-300">
                          {`{{${variable}}}`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
