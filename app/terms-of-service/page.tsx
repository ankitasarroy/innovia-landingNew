"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Scale, AlertTriangle, Mail } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-gray-400">Terms and conditions for using InnovIA Technologies services</p>
          <p className="text-sm text-gray-500 mt-2">Last updated: January 15, 2025</p>
        </div>

        <div className="space-y-6">
          {/* Introduction */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Scale className="w-5 h-5 mr-2 text-blue-400" />
                Agreement to Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                These Terms of Service ("Terms") govern your use of the InnovIA Technologies website, email subscription
                services, and any related services (collectively, the "Services") operated by InnovIA Technologies
                ("we," "our," or "us").
              </p>
              <p>
                By accessing or using our Services, including subscribing to our email updates, you agree to be bound by
                these Terms. If you disagree with any part of these Terms, then you may not access or use our Services.
              </p>
            </CardContent>
          </Card>

          {/* Email Subscription Terms */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Mail className="w-5 h-5 mr-2 text-purple-400" />
                Email Subscription Service
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-400/20">
                <h3 className="text-purple-400 font-semibold mb-3">Subscription Terms</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    • <strong>Voluntary Service:</strong> Email subscription is entirely voluntary and free of charge
                  </li>
                  <li>
                    • <strong>Accurate Information:</strong> You must provide accurate and current email information
                  </li>
                  <li>
                    • <strong>Age Requirement:</strong> You must be at least 16 years old to subscribe
                  </li>
                  <li>
                    • <strong>Consent:</strong> By subscribing, you consent to receive emails based on your preferences
                  </li>
                  <li>
                    • <strong>Unsubscribe:</strong> You may unsubscribe at any time using provided links or by
                    contacting us
                  </li>
                </ul>
              </div>

              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-400/20">
                <h3 className="text-blue-400 font-semibold mb-3">Content and Frequency</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    • <strong>Update Types:</strong> Milestones, progress updates, announcements, and research findings
                  </li>
                  <li>
                    • <strong>Frequency:</strong> Variable based on company progress and your preferences
                  </li>
                  <li>
                    • <strong>Content Quality:</strong> We strive to provide valuable, relevant content
                  </li>
                  <li>
                    • <strong>No Spam:</strong> We do not send unsolicited marketing emails or share your data
                  </li>
                </ul>
              </div>

              <div className="bg-green-900/20 rounded-lg p-4 border border-green-400/20">
                <h3 className="text-green-400 font-semibold mb-3">Your Responsibilities</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Provide accurate email address and keep it updated</li>
                  <li>• Use preference settings to control email frequency and types</li>
                  <li>• Report any technical issues or concerns promptly</li>
                  <li>• Respect intellectual property in our email content</li>
                  <li>• Do not use our service for any unlawful purposes</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Data Protection & Privacy */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Data Protection & Privacy</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">Personal Data Processing</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <strong className="text-gray-200">Legal Basis:</strong> We process your personal data based on
                      your explicit consent for email communications
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <strong className="text-gray-200">Data Minimization:</strong> We only collect data necessary for
                      providing our email service
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <strong className="text-gray-200">Purpose Limitation:</strong> Your data is used solely for
                      sending requested updates and service improvement
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <strong className="text-gray-200">Retention:</strong> Data is retained only as long as you remain
                      subscribed, plus 30 days for processing
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-400/20">
                <h3 className="text-yellow-400 font-semibold mb-2">GDPR Compliance</h3>
                <p className="text-sm">
                  For users in the European Union, we comply with GDPR requirements including the right to access,
                  rectify, erase, restrict processing, data portability, and object to processing. See our{" "}
                  <a href="/privacy-policy" className="text-blue-400 hover:text-blue-300 underline">
                    Privacy Policy
                  </a>{" "}
                  for full details.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Acceptable Use */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-400" />
                Acceptable Use Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-900/20 rounded-lg p-4 border border-green-400/20">
                  <h3 className="text-green-400 font-semibold mb-2">Permitted Uses</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Subscribe to receive company updates</li>
                    <li>• Manage your subscription preferences</li>
                    <li>• Share our content with proper attribution</li>
                    <li>• Contact us with questions or feedback</li>
                    <li>• Use information for personal research</li>
                  </ul>
                </div>

                <div className="bg-red-900/20 rounded-lg p-4 border border-red-400/20">
                  <h3 className="text-red-400 font-semibold mb-2">Prohibited Uses</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Provide false or misleading information</li>
                    <li>• Use our service for spam or unsolicited communications</li>
                    <li>• Attempt to hack or compromise our systems</li>
                    <li>• Redistribute our content without permission</li>
                    <li>• Use our service for any illegal activities</li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-400/20">
                <h3 className="text-orange-400 font-semibold mb-2">Enforcement</h3>
                <p className="text-sm">
                  We reserve the right to suspend or terminate access to our Services for users who violate these Terms.
                  We may also report illegal activities to appropriate authorities.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Intellectual Property Rights</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">Our Content</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    All content in our emails and on our website, including text, graphics, logos, images, and software,
                    is the property of InnovIA Technologies and is protected by copyright, trademark, and other
                    intellectual property laws.
                  </p>
                  <p>
                    You may view, download, and print content for personal, non-commercial use only. Any other use
                    requires our prior written permission.
                  </p>
                </div>
              </div>

              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-400/20">
                <h3 className="text-blue-400 font-semibold mb-2">Permitted Sharing</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Share links to our website or specific updates</li>
                  <li>• Quote brief excerpts with proper attribution</li>
                  <li>• Use our content for educational or research purposes</li>
                  <li>• Share on social media with appropriate credits</li>
                </ul>
              </div>

              <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-400/20">
                <h3 className="text-purple-400 font-semibold mb-2">Your Content</h3>
                <p className="text-sm">
                  Any feedback, suggestions, or other communications you provide to us may be used by InnovIA
                  Technologies without restriction or compensation to you.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Service Availability */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Service Availability & Disclaimers</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-400/20">
                <h3 className="text-yellow-400 font-semibold mb-2">Service Availability</h3>
                <ul className="space-y-2 text-sm">
                  <li>• We strive to provide reliable email delivery but cannot guarantee 100% uptime</li>
                  <li>• Email delivery may be affected by your email provider's policies</li>
                  <li>• We may temporarily suspend service for maintenance or updates</li>
                  <li>• We reserve the right to modify or discontinue the service with notice</li>
                </ul>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Content Disclaimers</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Information is provided for general informational purposes only</li>
                  <li>• We do not guarantee the accuracy or completeness of all content</li>
                  <li>• Our updates reflect our current development status and may change</li>
                  <li>• Forward-looking statements are subject to risks and uncertainties</li>
                </ul>
              </div>

              <div className="bg-red-900/20 rounded-lg p-4 border border-red-400/20">
                <h3 className="text-red-400 font-semibold mb-2">Limitation of Liability</h3>
                <p className="text-sm">
                  InnovIA Technologies shall not be liable for any indirect, incidental, special, consequential, or
                  punitive damages arising from your use of our Services, including but not limited to loss of profits,
                  data, or business opportunities.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Termination</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-400/20">
                  <h3 className="text-blue-400 font-semibold mb-2">Your Right to Terminate</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Unsubscribe from emails at any time</li>
                    <li>• Request deletion of your data</li>
                    <li>• Stop using our website services</li>
                    <li>• No penalties for termination</li>
                  </ul>
                </div>

                <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-400/20">
                  <h3 className="text-orange-400 font-semibold mb-2">Our Right to Terminate</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Suspend service for Terms violations</li>
                    <li>• Terminate accounts for illegal activity</li>
                    <li>• Discontinue service with 30 days notice</li>
                    <li>• Remove users who abuse the system</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Effect of Termination</h3>
                <p className="text-sm">
                  Upon termination of your subscription, we will stop sending you emails and delete your personal data
                  within 30 days, except as required by law or for legitimate business purposes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Governing Law & Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Applicable Law</h3>
                <p className="text-sm">
                  These Terms are governed by and construed in accordance with the laws of Quebec, Canada, without
                  regard to conflict of law principles. Any disputes will be subject to the exclusive jurisdiction of
                  the courts of Quebec.
                </p>
              </div>

              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-400/20">
                <h3 className="text-blue-400 font-semibold mb-2">Dispute Resolution</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    • <strong>Direct Communication:</strong> We encourage resolving disputes through direct
                    communication first
                  </li>
                  <li>
                    • <strong>Mediation:</strong> If needed, we're open to mediation before formal legal proceedings
                  </li>
                  <li>
                    • <strong>Jurisdiction:</strong> Legal disputes will be handled in Quebec courts
                  </li>
                  <li>
                    • <strong>Class Actions:</strong> You agree to resolve disputes individually, not as part of a class
                    action
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Changes to These Terms</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-400/20">
                <h3 className="text-purple-400 font-semibold mb-2">Notification Process</h3>
                <ul className="space-y-2 text-sm">
                  <li>• We will notify subscribers of material changes via email</li>
                  <li>• Changes will be posted on our website with updated date</li>
                  <li>• Significant changes will include a summary of modifications</li>
                  <li>• You will have 30 days to review changes before they take effect</li>
                </ul>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Your Options</h3>
                <p className="text-sm">
                  If you disagree with any changes to these Terms, you may unsubscribe from our services. Continued use
                  of our Services after changes take effect constitutes acceptance of the new Terms.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-400/20">
                <h3 className="text-blue-400 font-semibold mb-3">Questions About These Terms</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>InnovIA Technologies</strong>
                  </p>
                  <p>2120 Rue Phil Goyette</p>
                  <p>Vaudreuil-Dorion, QC J7V 3E5</p>
                  <p>Canada</p>
                  <p>Email: legal@innovia-technologies.com</p>
                  <p>General Inquiries: info@innovia-technologies.com</p>
                  <p>Phone: +1 (438) 465-9093</p>
                </div>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Response Time</h3>
                <p className="text-sm">
                  We will respond to questions about these Terms within 5 business days. For urgent legal matters,
                  please indicate the urgency in your subject line.
                </p>
              </div>
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
