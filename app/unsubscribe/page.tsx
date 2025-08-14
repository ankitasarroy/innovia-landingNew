"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X, Mail, AlertTriangle } from "lucide-react"
import { loadSubscribers, unsubscribeUser, type EmailSubscriber } from "@/lib/email-notifications"

export default function UnsubscribePage() {
  const [subscriber, setSubscriber] = useState<EmailSubscriber | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUnsubscribing, setIsUnsubscribing] = useState(false)
  const [isUnsubscribed, setIsUnsubscribed] = useState(false)
  const [reason, setReason] = useState("")

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const subscriberId = urlParams.get("id")

    if (subscriberId) {
      const subscribers = loadSubscribers()
      const foundSubscriber = subscribers.find((s) => s.id === subscriberId)

      if (foundSubscriber) {
        setSubscriber(foundSubscriber)
        if (foundSubscriber.status === "unsubscribed") {
          setIsUnsubscribed(true)
        }
      }
    }

    setIsLoading(false)
  }, [])

  const handleUnsubscribe = async () => {
    if (!subscriber) return

    setIsUnsubscribing(true)

    try {
      unsubscribeUser(subscriber.id)
      setIsUnsubscribed(true)
    } catch (error) {
      console.error("Unsubscribe error:", error)
      alert("Failed to unsubscribe. Please try again or contact us directly.")
    } finally {
      setIsUnsubscribing(false)
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
            <p className="text-gray-400 mb-4">The unsubscribe link you used is invalid or has expired.</p>
            <Button onClick={() => (window.location.href = "/")} className="bg-blue-600 hover:bg-blue-700 text-white">
              Return to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isUnsubscribed) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Card className="bg-gray-800 border-gray-700 max-w-md">
          <CardContent className="p-8 text-center">
            <Check className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Successfully Unsubscribed</h2>
            <p className="text-gray-400 mb-4">
              You have been unsubscribed from InnovIA Technologies email updates. Your data will be permanently deleted
              within 30 days.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => (window.location.href = "/")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Return to Homepage
              </Button>
              <Button
                onClick={() => (window.location.href = `/email-preferences?id=${subscriber.id}`)}
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              >
                Resubscribe Instead
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Unsubscribe from Email Updates</h1>
          <p className="text-gray-400">We're sorry to see you go</p>
        </div>

        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Mail className="w-5 h-5 mr-2 text-blue-400" />
              Subscription Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
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
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Before You Go...</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">
              Instead of unsubscribing completely, you might prefer to adjust your email preferences. You can:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Reduce email frequency by selecting only major milestones
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Choose specific categories that interest you most
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Opt out of progress updates but keep announcements
              </li>
            </ul>
            <div className="pt-4">
              <Button
                onClick={() => (window.location.href = `/email-preferences?id=${subscriber.id}`)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Update Preferences Instead
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Confirm Unsubscribe</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-900/20 rounded-lg p-4 border border-red-400/20">
              <h3 className="text-red-400 font-semibold mb-2">What happens when you unsubscribe:</h3>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• You will stop receiving all email updates from InnovIA Technologies</li>
                <li>• Your email address and preferences will be permanently deleted within 30 days</li>
                <li>• You can resubscribe at any time by visiting our website</li>
                <li>• This action cannot be undone automatically</li>
              </ul>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Help us improve (optional):</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Let us know why you're unsubscribing..."
                className="w-full bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2 text-sm"
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <Button
                onClick={() => (window.location.href = "/")}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              >
                Cancel
              </Button>

              <Button
                onClick={handleUnsubscribe}
                disabled={isUnsubscribing}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isUnsubscribing ? "Unsubscribing..." : "Confirm Unsubscribe"}
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center pt-4">
              Need help? Contact us at{" "}
              <a href="mailto:info@innovia-technologies.com" className="text-blue-400 hover:text-blue-300">
                info@innovia-technologies.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
