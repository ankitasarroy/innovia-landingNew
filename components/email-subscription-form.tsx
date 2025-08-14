"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Check, Settings } from "lucide-react"
import { addSubscriber } from "@/lib/email-notifications"

interface EmailSubscriptionFormProps {
  onSubscribed?: (subscriberId: string) => void
  className?: string
}

export function EmailSubscriptionForm({ onSubscribed, className = "" }: EmailSubscriptionFormProps) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [preferences, setPreferences] = useState({
    milestones: true,
    progress: true,
    announcements: true,
    research: false,
    categories: ["company", "cybersecurity", "education"],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)

  const categoryOptions = [
    { value: "company", label: "Company Updates", description: "Major company milestones and announcements" },
    { value: "cybersecurity", label: "Cybersecurity AI", description: "Threat detection and security innovations" },
    { value: "education", label: "Education AI", description: "Learning platform and educational technology" },
    { value: "healthcare", label: "Healthcare AI", description: "Medical AI and diagnostic tools" },
    { value: "supply-chain", label: "Supply Chain AI", description: "Logistics and optimization solutions" },
    { value: "team", label: "Team Updates", description: "Team growth and organizational changes" },
  ]

  const handleCategoryToggle = (category: string) => {
    setPreferences((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      alert("Please enter your email address")
      return
    }

    if (preferences.categories.length === 0) {
      alert("Please select at least one category")
      return
    }

    setIsSubmitting(true)

    try {
      const subscriberId = await addSubscriber({
        email: email.trim(),
        name: name.trim() || undefined,
        preferences,
      })

      setIsSubscribed(true)
      onSubscribed?.(subscriberId)

      // Reset form
      setEmail("")
      setName("")
      setShowPreferences(false)
    } catch (error) {
      console.error("Subscription error:", error)
      alert("Failed to subscribe. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubscribed) {
    return (
      <Card className={`bg-green-900/20 border-green-400/30 ${className}`}>
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Successfully Subscribed!</h3>
          <p className="text-gray-400 mb-4">
            You'll receive email notifications for new updates and milestones based on your preferences.
          </p>
          <Button
            onClick={() => setIsSubscribed(false)}
            variant="outline"
            className="border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900 bg-transparent"
          >
            Subscribe Another Email
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`bg-gray-800 border-gray-700 ${className}`}>
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Mail className="w-5 h-5 mr-2 text-blue-400" />
          Email Notifications
        </CardTitle>
        <p className="text-gray-400 text-sm">
          Get notified about our latest progress updates, milestones, and announcements
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address *
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Name (Optional)
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Your name"
            />
          </div>

          {/* Notification Type Preferences */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Notification Types</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferences.milestones}
                  onChange={(e) => setPreferences((prev) => ({ ...prev, milestones: e.target.checked }))}
                  className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-300">🎯 Major Milestones</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferences.progress}
                  onChange={(e) => setPreferences((prev) => ({ ...prev, progress: e.target.checked }))}
                  className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-300">📈 Progress Updates</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferences.announcements}
                  onChange={(e) => setPreferences((prev) => ({ ...prev, announcements: e.target.checked }))}
                  className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-300">📢 Announcements</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferences.research}
                  onChange={(e) => setPreferences((prev) => ({ ...prev, research: e.target.checked }))}
                  className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-300">🔬 Research Updates</span>
              </label>
            </div>
          </div>

          {/* Category Preferences */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-300">Categories of Interest</label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPreferences(!showPreferences)}
                className="text-blue-400 hover:text-white"
              >
                <Settings className="w-4 h-4 mr-1" />
                {showPreferences ? "Hide" : "Customize"}
              </Button>
            </div>

            {showPreferences ? (
              <div className="space-y-3">
                {categoryOptions.map((category) => (
                  <div key={category.value} className="bg-gray-700/30 rounded-lg p-3">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        checked={preferences.categories.includes(category.value)}
                        onChange={() => handleCategoryToggle(category.value)}
                        className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 mt-1"
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-300">{category.label}</div>
                        <div className="text-xs text-gray-500">{category.description}</div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {preferences.categories.map((category) => {
                  const categoryInfo = categoryOptions.find((c) => c.value === category)
                  return (
                    <Badge key={category} className="bg-blue-600 text-white">
                      {categoryInfo?.label || category}
                    </Badge>
                  )
                })}
                {preferences.categories.length === 0 && (
                  <span className="text-sm text-gray-500">No categories selected</span>
                )}
              </div>
            )}
          </div>

          {/* Privacy & Data Protection Section */}
          <div className="bg-gray-700/20 rounded-lg p-4 mt-4 border border-gray-600">
            <h4 className="text-sm font-semibold text-white mb-2">Privacy & Data Protection</h4>
            <div className="space-y-2 text-xs text-gray-400">
              <p>
                <strong className="text-gray-300">Data Collection:</strong> We collect your email address and optional
                name to send you updates about InnovIA Technologies' progress and milestones.
              </p>
              <p>
                <strong className="text-gray-300">Data Usage:</strong> Your information is used solely for sending
                requested notifications and will never be shared with third parties or used for marketing purposes.
              </p>
              <p>
                <strong className="text-gray-300">Your Rights (GDPR):</strong> You have the right to access, modify, or
                delete your data at any time. You can unsubscribe or update preferences using links in our emails.
              </p>
              <p>
                <strong className="text-gray-300">Data Security:</strong> We implement appropriate security measures to
                protect your personal information and store data securely.
              </p>
              <p>
                <strong className="text-gray-300">Retention:</strong> We retain your data only as long as you remain
                subscribed. Upon unsubscribing, your data is permanently deleted within 30 days.
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-600">
              <label className="flex items-start text-xs">
                <input
                  type="checkbox"
                  required
                  className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 mt-0.5 mr-2 flex-shrink-0"
                />
                <span className="text-gray-400">
                  I consent to InnovIA Technologies collecting and processing my personal data as described above, and I
                  agree to receive email notifications based on my selected preferences. I understand I can withdraw
                  this consent at any time.
                </span>
              </label>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || preferences.categories.length === 0}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe to Updates"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
