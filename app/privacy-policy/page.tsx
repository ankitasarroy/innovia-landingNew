"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Eye, Lock, Trash2, Download, Mail } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-gray-400">How we collect, use, and protect your personal information</p>
          <p className="text-sm text-gray-500 mt-2">Last updated: January 15, 2025</p>
        </div>

        <div className="space-y-6">
          {/* Introduction */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Eye className="w-5 h-5 mr-2 text-blue-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                InnovIA Technologies ("we," "our," or "us") is committed to protecting your privacy and personal data.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you
                visit our website, subscribe to our email updates, or interact with our services.
              </p>
              <p>
                We comply with the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA),
                and other applicable privacy laws to ensure your personal information is handled with the highest
                standards of care.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-blue-400" />
                  Email Subscription Data
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    • <strong>Email Address:</strong> Required for sending notifications and updates
                  </li>
                  <li>
                    • <strong>Name:</strong> Optional, used for personalization in emails
                  </li>
                  <li>
                    • <strong>Subscription Preferences:</strong> Your chosen notification types and categories
                  </li>
                  <li>
                    • <strong>Subscription Date:</strong> When you subscribed to our updates
                  </li>
                  <li>
                    • <strong>Engagement Data:</strong> Email open rates, click-through rates (anonymized)
                  </li>
                </ul>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Website Usage Data</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    • <strong>Technical Information:</strong> IP address, browser type, device information
                  </li>
                  <li>
                    • <strong>Usage Analytics:</strong> Pages visited, time spent, navigation patterns (anonymized)
                  </li>
                  <li>
                    • <strong>Cookies:</strong> Essential cookies for website functionality
                  </li>
                </ul>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Contact Information</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    • <strong>Contact Forms:</strong> Name, email, message content when you contact us
                  </li>
                  <li>
                    • <strong>Business Inquiries:</strong> Company information for partnership discussions
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Your Information */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-400/20">
                  <h3 className="text-blue-400 font-semibold mb-2">Email Communications</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Send progress updates and milestones</li>
                    <li>• Deliver announcements and news</li>
                    <li>• Share research findings (if subscribed)</li>
                    <li>• Provide weekly digest summaries</li>
                  </ul>
                </div>

                <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-400/20">
                  <h3 className="text-purple-400 font-semibold mb-2">Service Improvement</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Analyze website usage patterns</li>
                    <li>• Improve user experience</li>
                    <li>• Optimize email content and timing</li>
                    <li>• Enhance security measures</li>
                  </ul>
                </div>

                <div className="bg-green-900/20 rounded-lg p-4 border border-green-400/20">
                  <h3 className="text-green-400 font-semibold mb-2">Legal Compliance</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Comply with legal obligations</li>
                    <li>• Respond to legal requests</li>
                    <li>• Protect our rights and interests</li>
                    <li>• Prevent fraud and abuse</li>
                  </ul>
                </div>

                <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-400/20">
                  <h3 className="text-orange-400 font-semibold mb-2">Business Operations</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Respond to inquiries and support</li>
                    <li>• Process partnership requests</li>
                    <li>• Maintain subscriber relationships</li>
                    <li>• Conduct business analytics</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights (GDPR) */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-400" />
                Your Rights Under GDPR
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-sm text-gray-400 mb-4">
                If you are located in the European Union, you have the following rights regarding your personal data:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2 flex items-center">
                    <Eye className="w-4 h-4 mr-2 text-blue-400" />
                    Right to Access
                  </h3>
                  <p className="text-sm">
                    Request a copy of all personal data we hold about you, including how it's used and who it's shared
                    with.
                  </p>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2 flex items-center">
                    <Lock className="w-4 h-4 mr-2 text-purple-400" />
                    Right to Rectification
                  </h3>
                  <p className="text-sm">
                    Request correction of inaccurate or incomplete personal data we hold about you.
                  </p>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2 flex items-center">
                    <Trash2 className="w-4 h-4 mr-2 text-red-400" />
                    Right to Erasure
                  </h3>
                  <p className="text-sm">
                    Request deletion of your personal data when it's no longer necessary or you withdraw consent.
                  </p>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2 flex items-center">
                    <Download className="w-4 h-4 mr-2 text-green-400" />
                    Right to Portability
                  </h3>
                  <p className="text-sm">
                    Request your personal data in a structured, machine-readable format for transfer to another service.
                  </p>
                </div>
              </div>

              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-400/20 mt-4">
                <h3 className="text-blue-400 font-semibold mb-2">Additional Rights</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    • <strong>Right to Restrict Processing:</strong> Limit how we use your data in certain circumstances
                  </li>
                  <li>
                    • <strong>Right to Object:</strong> Object to processing based on legitimate interests or direct
                    marketing
                  </li>
                  <li>
                    • <strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based
                    on consent
                  </li>
                  <li>
                    • <strong>Right to Lodge a Complaint:</strong> File a complaint with your local data protection
                    authority
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Lock className="w-5 h-5 mr-2 text-green-400" />
                Data Security & Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-900/20 rounded-lg p-4 border border-green-400/20">
                  <h3 className="text-green-400 font-semibold mb-2">Encryption</h3>
                  <p className="text-sm">
                    All data is encrypted in transit using TLS/SSL and at rest using industry-standard encryption.
                  </p>
                </div>

                <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-400/20">
                  <h3 className="text-blue-400 font-semibold mb-2">Access Controls</h3>
                  <p className="text-sm">
                    Strict access controls ensure only authorized personnel can access personal data.
                  </p>
                </div>

                <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-400/20">
                  <h3 className="text-purple-400 font-semibold mb-2">Regular Audits</h3>
                  <p className="text-sm">
                    We conduct regular security audits and vulnerability assessments to maintain protection.
                  </p>
                </div>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Data Breach Response</h3>
                <p className="text-sm">
                  In the unlikely event of a data breach, we will notify affected users within 72 hours and take
                  immediate steps to secure the data and prevent further unauthorized access. We will also notify
                  relevant authorities as required by law.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Data Retention & Deletion</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Email Subscription Data</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    • <strong>Active Subscriptions:</strong> Retained while you remain subscribed to our updates
                  </li>
                  <li>
                    • <strong>After Unsubscribing:</strong> Permanently deleted within 30 days of unsubscribing
                  </li>
                  <li>
                    • <strong>Engagement Data:</strong> Anonymized analytics retained for up to 2 years for service
                    improvement
                  </li>
                </ul>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Website Usage Data</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    • <strong>Analytics Data:</strong> Anonymized data retained for up to 2 years
                  </li>
                  <li>
                    • <strong>Technical Logs:</strong> Retained for up to 1 year for security and troubleshooting
                  </li>
                  <li>
                    • <strong>Cookies:</strong> Expire according to their individual settings (typically 1-12 months)
                  </li>
                </ul>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Contact & Business Data</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    • <strong>Contact Inquiries:</strong> Retained for up to 3 years for support and follow-up
                  </li>
                  <li>
                    • <strong>Business Communications:</strong> Retained as long as necessary for business purposes
                  </li>
                  <li>
                    • <strong>Legal Requirements:</strong> Some data may be retained longer if required by law
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Third-Party Services */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Third-Party Services & Data Sharing</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-400/20 mb-4">
                <h3 className="text-yellow-400 font-semibold mb-2">No Data Selling</h3>
                <p className="text-sm">
                  We do not sell, rent, or trade your personal information to third parties for marketing purposes. Your
                  data is used solely for the purposes outlined in this policy.
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Service Providers</h3>
                  <p className="text-sm mb-2">
                    We may share data with trusted service providers who help us operate our services:
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>
                      • <strong>Email Service Providers:</strong> For sending newsletters and updates
                    </li>
                    <li>
                      • <strong>Analytics Services:</strong> For website usage analysis (anonymized data only)
                    </li>
                    <li>
                      • <strong>Cloud Hosting:</strong> For secure data storage and website hosting
                    </li>
                    <li>
                      • <strong>Security Services:</strong> For fraud prevention and security monitoring
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Legal Requirements</h3>
                  <p className="text-sm">
                    We may disclose personal information if required by law, court order, or government request, or to
                    protect our rights, property, or safety, or that of our users or the public.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Requests */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Contact Us & Data Requests</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-400/20">
                <h3 className="text-blue-400 font-semibold mb-3">How to Exercise Your Rights</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Email Preferences:</strong> Use the "Update Preferences" link in any email we send you
                  </p>
                  <p>
                    <strong>Unsubscribe:</strong> Click the "Unsubscribe" link in any email or contact us directly
                  </p>
                  <p>
                    <strong>Data Requests:</strong> Email us at privacy@innovia-technologies.com with your request
                  </p>
                  <p>
                    <strong>General Inquiries:</strong> Contact us at info@innovia-technologies.com
                  </p>
                </div>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Response Times</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    • <strong>Email Unsubscribe:</strong> Immediate (automated)
                  </li>
                  <li>
                    • <strong>Preference Updates:</strong> Immediate (automated)
                  </li>
                  <li>
                    • <strong>Data Access Requests:</strong> Within 30 days
                  </li>
                  <li>
                    • <strong>Data Deletion Requests:</strong> Within 30 days
                  </li>
                  <li>
                    • <strong>General Inquiries:</strong> Within 5 business days
                  </li>
                </ul>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Contact Information</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>InnovIA Technologies</strong>
                  </p>
                  <p>2120 Rue Phil Goyette</p>
                  <p>Vaudreuil-Dorion, QC J7V 3E5</p>
                  <p>Canada</p>
                  <p>Email: privacy@innovia-technologies.com</p>
                  <p>Phone: +1 (438) 465-9093</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Updates to Policy */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Updates to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology,
                legal requirements, or other factors. When we make significant changes, we will:
              </p>
              <ul className="space-y-2 text-sm list-disc list-inside ml-4">
                <li>Update the "Last updated" date at the top of this policy</li>
                <li>Send an email notification to our subscribers about material changes</li>
                <li>Post a notice on our website highlighting the changes</li>
                <li>Provide a summary of key changes in the notification</li>
              </ul>
              <p className="text-sm">
                We encourage you to review this Privacy Policy periodically to stay informed about how we protect your
                personal information.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Button
            onClick={() => (window.location.href = "/")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            Return to Homepage
          </Button>
        </div>
      </div>
    </div>
  )
}
