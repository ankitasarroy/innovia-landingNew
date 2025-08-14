"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Settings, Mail } from "lucide-react"
import { loadSubscribers, updateSubscriberPreferences, type EmailSubscriber } from "@/lib/email-notifications"

export default function EmailPreferencesPage() {
  const [subscriber, setSubscriber] = useState<EmailSubscriber | null>(null)
  const [preferences, setPreferences] = useState({
    milestones: false,
    progress: false,
    announcements: false,
    research: false,
    categories: [] as string[],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const categoryOptions = [
    { value: "company", label: "Company Updates", description: "Major company milestones and announcements" },
    { value: "cybersecurity", label: "Cybersecurity AI", description: "Threat detection and security innovations" },
    { value: "education", label: "Education AI", description: "Learning platform and educational technology" },
    { value: "healthcare", label: "Healthcare AI", description: "Medical AI and diagnostic tools" },
    { value: "supply-chain", label: "Supply Chain AI", description: "Logistics and optimization solutions" },
    { value: "team", label: "Team Updates", description: "Team growth and organizational changes" },
  ]

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const subscriberId = urlParams.get("id")

    if (subscriberId) {
      const subscribers = loadSubscribers()
      const foundSubscriber = subscribers.find((s) => s.id === subscriberId)

      if (foundSubscriber) {
        setSubscriber(foundSubscriber)
        setPreferences(foundSubscriber.preferences)
      }
    }

    setIsLoading(false)
  }, [])

  const handleCategoryToggle = (category: string) => {
    setPreferences((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }))
  }

  const handleSave = async () => {
    if (!subscriber) return

    setIsSaving(true)
    setSaved(false)

    try {
      updateSubscriberPreferences(subscriber.id, preferences)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error("Failed to save preferences:", error)
      alert("Failed to save preferences. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!subscriber) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Card className="bg-gray-800 border-gray-700 max-w-md">
          <CardContent className="p-8 text-center">
            <X className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Invalid Link</h2>
            <p className="text-gray-400 mb-4">The preferences link you used is invalid or has expired.</p>
            <Button onClick={() => (window.location.href = "/")} className="bg-blue-600 hover:bg-blue-700 text-white">
              Return to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Email Preferences</h1>
          <p className="text-gray-400">Customize your notification preferences for InnovIA Technologies updates</p>
        </div>

        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Mail className="w-5 h-5 mr-2 text-blue-400" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Email:</span>
                <span className="text-white">{subscriber.email}</span>
              </div>
              {subscriber.name && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white">{subscriber.name}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Subscribed:</span>
                <span className="text-white">{new Date(subscriber.subscriptionDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Status:</span>
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
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Notification Types</CardTitle>
            <p className="text-gray-400 text-sm">Choose which types of updates you'd like to receive</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div>
                  <div className="text-white font-medium">🎯 Major Milestones</div>
                  <div className="text-gray-400 text-sm">Important company achievements and breakthroughs</div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.milestones}
                  onChange={(e) => setPreferences((prev) => ({ ...prev, milestones: e.target.checked }))}
                  className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div>
                  <div className="text-white font-medium">📈 Progress Updates</div>
                  <div className="text-gray-400 text-sm">Regular development progress and metrics</div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.progress}
                  onChange={(e) => setPreferences((prev) => ({ ...prev, progress: e.target.checked }))}
                  className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div>
                  <div className="text-white font-medium">📢 Announcements</div>
                  <div className="text-gray-400 text-sm">Important company news and announcements</div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.announcements}
                  onChange={(e) => setPreferences((prev) => ({ ...prev, announcements: e.target.checked }))}
                  className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div>
                  <div className="text-white font-medium">🔬 Research Updates</div>
                  <div className="text-gray-400 text-sm">Technical research findings and publications</div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.research}
                  onChange={(e) => setPreferences((prev) => ({ ...prev, research: e.target.checked }))}
                  className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                />
              </label>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Categories of Interest</CardTitle>
            <p className="text-gray-400 text-sm">Select which AI focus areas you're interested in</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoryOptions.map((category) => (
                <label key={category.value} className="flex items-start p-3 bg-gray-700/30 rounded-lg">
                  <input
                    type="checkbox"
                    checked={preferences.categories.includes(category.value)}
                    onChange={() => handleCategoryToggle(category.value)}
                    className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 mt-1"
                  />
                  <div className="ml-3 flex-1">
                    <div className="text-white font-medium">{category.label}</div>
                    <div className="text-gray-400 text-sm">{category.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
          >
            Return to Homepage
          </Button>

          <div className="flex items-center space-x-3">
            {saved && (
              <div className="flex items-center text-green-400 text-sm">
                <Check className="w-4 h-4 mr-1" />
                Preferences saved!
              </div>
            )}
            <Button
              onClick={handleSave}
              disabled={isSaving || preferences.categories.length === 0}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              {isSaving ? "Saving..." : "Save Preferences"}
            </Button>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Need help? Contact us at{" "}
            <a href="mailto:info@innovia-technologies.com" className="text-blue-400 hover:text-blue-300">
              info@innovia-technologies.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
