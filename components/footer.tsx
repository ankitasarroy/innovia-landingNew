"use client"

import { Linkedin, ExternalLink } from "lucide-react"

export function Footer() {
  const industriesData = [
    {
      title: "Cyber Resilience with AI",
      description: "Advanced threat detection and response systems powered by machine learning algorithms.",
      color: "from-blue-400 to-cyan-400",
      detailedContent: {
        overview:
          "Our AI-powered cybersecurity solutions provide real-time threat detection, automated response systems, and predictive security analytics to protect organizations from evolving cyber threats.",
        keyFeatures: [
          "Real-time threat detection using machine learning algorithms",
          "Automated incident response and remediation",
          "Behavioral analysis for insider threat detection",
          "Predictive vulnerability assessment",
          "AI-driven security orchestration and automation",
        ],
        benefits: [
          "99.7% threat detection accuracy",
          "Reduced response time from hours to minutes",
          "Proactive threat hunting capabilities",
          "Continuous learning and adaptation to new threats",
        ],
        useCases: [
          "Enterprise network security monitoring",
          "Financial services fraud prevention",
          "Healthcare data protection",
          "Government infrastructure security",
        ],
      },
    },
    {
      title: "Education",
      description: "Personalized learning platforms and intelligent tutoring systems for enhanced education.",
      color: "from-purple-400 to-pink-400",
      detailedContent: {
        overview:
          "Revolutionary AI-powered educational platforms that adapt to individual learning styles, providing personalized content delivery and intelligent assessment systems.",
        keyFeatures: [
          "Adaptive learning algorithms that adjust to student pace",
          "Voice and text integration for multimodal learning",
          "Intelligent content recommendation engine",
          "Real-time progress tracking and analytics",
          "AI-powered virtual tutoring assistants",
        ],
        benefits: [
          "40% improvement in learning retention rates",
          "Personalized learning paths for each student",
          "Reduced teacher workload through automation",
          "Enhanced accessibility for diverse learning needs",
        ],
        useCases: [
          "K-12 personalized learning platforms",
          "Corporate training and development",
          "Language learning applications",
          "Professional certification programs",
        ],
      },
    },
    {
      title: "Medical",
      description: "AI-driven diagnostic tools and treatment optimization for improved healthcare outcomes.",
      color: "from-red-400 to-rose-400",
      detailedContent: {
        overview:
          "Cutting-edge medical AI solutions that enhance diagnostic accuracy, optimize treatment plans, and improve patient outcomes through intelligent healthcare analytics.",
        keyFeatures: [
          "Medical image analysis and diagnosis",
          "Predictive health analytics",
          "Drug discovery and development acceleration",
          "Treatment recommendation systems",
          "Patient monitoring and early warning systems",
        ],
        benefits: [
          "95% diagnostic accuracy improvement",
          "Reduced diagnosis time by 70%",
          "Personalized treatment recommendations",
          "Early disease detection capabilities",
        ],
        useCases: [
          "Radiology image analysis",
          "Pathology diagnosis assistance",
          "Clinical decision support systems",
          "Pharmaceutical research and development",
        ],
      },
    },
    {
      title: "Supply Chain",
      description: "Intelligent logistics optimization and predictive analytics for supply chain management.",
      color: "from-orange-400 to-yellow-400",
      detailedContent: {
        overview:
          "AI-powered supply chain solutions that optimize logistics, predict demand, and enhance operational efficiency through intelligent automation and analytics.",
        keyFeatures: [
          "Demand forecasting and inventory optimization",
          "Route optimization and logistics planning",
          "Supplier risk assessment and monitoring",
          "Predictive maintenance for equipment",
          "Real-time supply chain visibility",
        ],
        benefits: [
          "30% reduction in operational costs",
          "Improved delivery time accuracy by 85%",
          "Reduced inventory waste and stockouts",
          "Enhanced supplier relationship management",
        ],
        useCases: [
          "E-commerce fulfillment optimization",
          "Manufacturing supply chain management",
          "Retail inventory management",
          "Global logistics coordination",
        ],
      },
    },
  ]

  const openInNewTab = (area: (typeof industriesData)[0]) => {
    const newWindow = window.open("", "_blank")
    if (newWindow) {
      newWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${area.title} - InnovIA Technologies</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { 
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
        </style>
      </head>
      <body class="min-h-screen text-white">
        <div class="container mx-auto px-4 py-12 max-w-6xl">
           Header 
          <div class="text-center mb-12">
            <div class="w-20 h-20 mx-auto mb-6 rounded-xl bg-gradient-to-r ${area.color} p-4">
              <svg class="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
              </svg>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold mb-4">
              <span class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ${area.title}
              </span>
            </h1>
            <p class="text-xl text-gray-300 max-w-3xl mx-auto">${area.description}</p>
          </div>

           Overview 
          <div class="mb-12">
            <h2 class="text-2xl font-semibold text-blue-400 mb-4">Overview</h2>
            <p class="text-gray-300 text-lg leading-relaxed">${area.detailedContent.overview}</p>
          </div>

           Content Grid 
          <div class="grid md:grid-cols-3 gap-8 mb-12">
             Key Features 
            <div class="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <h3 class="text-xl font-semibold text-purple-400 mb-4">Key Features</h3>
              <ul class="space-y-3">
                ${area.detailedContent.keyFeatures
                  .map(
                    (feature) => `
                  <li class="text-gray-300 flex items-start">
                    <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    ${feature}
                  </li>
                `,
                  )
                  .join("")}
              </ul>
            </div>

             Benefits 
            <div class="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <h3 class="text-xl font-semibold text-green-400 mb-4">Benefits</h3>
              <ul class="space-y-3">
                ${area.detailedContent.benefits
                  .map(
                    (benefit) => `
                  <li class="text-gray-300 flex items-start">
                    <span class="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    ${benefit}
                  </li>
                `,
                  )
                  .join("")}
              </ul>
            </div>

             Use Cases 
            <div class="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <h3 class="text-xl font-semibold text-orange-400 mb-4">Use Cases</h3>
              <ul class="space-y-3">
                ${area.detailedContent.useCases
                  .map(
                    (useCase) => `
                  <li class="text-gray-300 flex items-start">
                    <span class="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    ${useCase}
                  </li>
                `,
                  )
                  .join("")}
              </ul>
            </div>
          </div>

           Call to Action 
          <div class="text-center bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-400/20">
            <h3 class="text-2xl font-semibold mb-4">Ready to Transform Your Business?</h3>
            <p class="text-gray-400 mb-6 max-w-2xl mx-auto">
              Contact us to learn more about how our ${area.title.toLowerCase()} solutions can revolutionize your operations.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button onclick="window.opener.focus(); window.close();" 
                      class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                Contact Us
              </button>
              <button onclick="window.opener.focus(); window.close();" 
                      class="border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300 bg-transparent">
                Back to Main Site
              </button>
            </div>
          </div>

           Footer 
          <div class="text-center mt-12 pt-8 border-t border-gray-700">
            <p class="text-gray-400">© 2025 InnovIA Technologies. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `)
      newWindow.document.close()
    }
  }

  const openCareersPage = () => {
    const newWindow = window.open("", "_blank")
    if (newWindow) {
      newWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Careers - InnovIA Technologies</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { 
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
        </style>
      </head>
      <body class="min-h-screen text-white">
        <div class="container mx-auto px-4 py-12 max-w-6xl">
           Header 
          <div class="text-center mb-12">
            <div class="w-20 h-20 mx-auto mb-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-4">
              <svg class="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6m8 0H8"></path>
              </svg>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold mb-4">
              <span class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Careers at InnovIA
              </span>
            </h1>
            <p class="text-xl text-gray-300 max-w-3xl mx-auto">
              Join us in shaping the future of artificial intelligence
            </p>
          </div>

           Company Culture 
          <div class="mb-12">
            <h2 class="text-2xl font-semibold text-blue-400 mb-6">Why Work With Us?</h2>
            <div class="grid md:grid-cols-3 gap-8">
              <div class="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-white mb-3">Innovation First</h3>
                <p class="text-gray-400">Work on cutting-edge AI technologies that are transforming industries worldwide.</p>
              </div>
              
              <div class="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-white mb-3">Collaborative Team</h3>
                <p class="text-gray-400">Join a diverse team of experts passionate about solving complex challenges.</p>
              </div>
              
              <div class="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-white mb-3">Growth Opportunities</h3>
                <p class="text-gray-400">Advance your career with continuous learning and professional development.</p>
              </div>
            </div>
          </div>

           Current Openings 
          <div class="mb-12">
            <h2 class="text-2xl font-semibold text-purple-400 mb-6">Current Openings</h2>
            <div class="bg-gray-800/50 rounded-2xl p-12 border border-gray-700 text-center">
              <div class="w-24 h-24 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-semibold text-white mb-4">No Open Positions Currently</h3>
              <p class="text-gray-400 text-lg mb-6 max-w-2xl mx-auto">
                We don't have any open positions at the moment, but we're always looking for exceptional talent to join our team. 
                We encourage you to check back regularly or reach out to us directly.
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button onclick="window.opener.focus(); window.close();" 
                        class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                  Contact Us
                </button>
                <button onclick="alert('Feature coming soon! We will notify you when new positions are available.');" 
                        class="border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300 bg-transparent">
                  Get Notified
                </button>
              </div>
            </div>
          </div>

           What We Look For 
          <div class="mb-12">
            <h2 class="text-2xl font-semibold text-green-400 mb-6">What We Look For</h2>
            <div class="grid md:grid-cols-2 gap-8">
              <div class="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <h3 class="text-xl font-semibold text-white mb-4">Technical Excellence</h3>
                <ul class="space-y-3">
                  <li class="text-gray-300 flex items-start">
                    <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Strong background in AI/ML, computer science, or related fields
                  </li>
                  <li class="text-gray-300 flex items-start">
                    <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Experience with modern AI frameworks and technologies
                  </li>
                  <li class="text-gray-300 flex items-start">
                    <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Passion for solving complex, real-world problems
                  </li>
                </ul>
              </div>
              
              <div class="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <h3 class="text-xl font-semibold text-white mb-4">Personal Qualities</h3>
                <ul class="space-y-3">
                  <li class="text-gray-300 flex items-start">
                    <span class="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Collaborative mindset and excellent communication skills
                  </li>
                  <li class="text-gray-300 flex items-start">
                    <span class="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Curiosity and continuous learning attitude
                  </li>
                  <li class="text-gray-300 flex items-start">
                    <span class="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Commitment to ethical AI development
                  </li>
                </ul>
              </div>
            </div>
          </div>

           Contact Section 
          <div class="text-center bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-400/20">
            <h3 class="text-2xl font-semibold mb-4">Interested in Future Opportunities?</h3>
            <p class="text-gray-400 mb-6 max-w-2xl mx-auto">
              Even though we don't have open positions right now, we'd love to hear from talented individuals who are passionate about AI innovation.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button onclick="window.opener.focus(); window.close();" 
                      class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                Send Your Resume
              </button>
              <button onclick="window.opener.focus(); window.close();" 
                      class="border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300 bg-transparent">
                Back to Main Site
              </button>
            </div>
          </div>

           Footer 
          <div class="text-center mt-12 pt-8 border-t border-gray-700">
            <p class="text-gray-400">© 2025 InnovIA Technologies. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `)
      newWindow.document.close()
    }
  }

  const openQuickLinkPage = (title: string, content: string) => {
    const newWindow = window.open("", "_blank")
    if (newWindow) {
      newWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title} - InnovIA Technologies</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { 
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
        </style>
      </head>
      <body class="min-h-screen text-white">
        <div class="container mx-auto px-4 py-12 max-w-6xl">
           Header 
          <div class="text-center mb-12">
            <div class="w-20 h-20 mx-auto mb-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-4">
              <svg class="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold mb-4">
              <span class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ${title}
              </span>
            </h1>
            <p class="text-xl text-gray-300 max-w-3xl mx-auto">
              InnovIA Technologies - ${title}
            </p>
          </div>

           Content 
          <div class="mb-12">
            <div class="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
              ${content}
            </div>
          </div>

           Call to Action 
          <div class="text-center bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-400/20">
            <h3 class="text-2xl font-semibold mb-4">Learn More About InnovIA</h3>
            <p class="text-gray-400 mb-6 max-w-2xl mx-auto">
              Discover how our AI solutions can transform your business operations.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button onclick="window.opener.focus(); window.close();" 
                      class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                Contact Us
              </button>
              <button onclick="window.opener.focus(); window.close();" 
                      class="border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300 bg-transparent">
                Back to Main Site
              </button>
            </div>
          </div>

           Footer 
          <div class="text-center mt-12 pt-8 border-t border-gray-700">
            <p class="text-gray-400">© 2025 InnovIA Technologies. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `)
      newWindow.document.close()
    }
  }

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center mb-4">
              <img src="/innovia-logo.png" alt="InnovIA Technologies Logo" className="w-12 h-12 mr-3" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                InnovIA Technologies
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Pioneering the future of artificial intelligence through innovative research and development across
              critical industries.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/innovationia-technologies/insights/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                title="Connect on LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() =>
                    openQuickLinkPage(
                      "About Us",
                      `
                      <h2 class="text-2xl font-semibold text-blue-400 mb-6">About InnovIA Technologies</h2>
                      <div class="space-y-6 text-gray-300">
                        <p class="text-lg leading-relaxed">
                          InnovIA Technologies is at the forefront of artificial intelligence innovation, developing cutting-edge solutions that transform industries and enhance human capabilities. Founded with a vision to harness the transformative power of AI, we specialize in creating intelligent systems that solve complex challenges across critical sectors.
                        </p>
                        <p class="leading-relaxed">
                          Our multidisciplinary team of AI researchers, engineers, and domain experts work collaboratively to push the boundaries of what's possible with artificial intelligence. We focus on practical, real-world applications that deliver measurable value to our clients and society.
                        </p>
                        <div class="grid md:grid-cols-2 gap-6 mt-8">
                          <div>
                            <h3 class="text-xl font-semibold text-purple-400 mb-3">Our Mission</h3>
                            <p class="text-gray-400">To democratize artificial intelligence by creating accessible, ethical, and impactful AI solutions that empower businesses and improve lives worldwide.</p>
                          </div>
                          <div>
                            <h3 class="text-xl font-semibold text-green-400 mb-3">Our Vision</h3>
                            <p class="text-gray-400">To be the leading catalyst in the AI revolution, shaping a future where intelligent systems seamlessly integrate with human expertise to solve humanity's greatest challenges.</p>
                          </div>
                        </div>
                      </div>
                      `,
                    )
                  }
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span>About Us</span>
                  <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    openQuickLinkPage(
                      "Our Services",
                      `
                      <h2 class="text-2xl font-semibold text-blue-400 mb-6">Our AI Services</h2>
                      <div class="space-y-8 text-gray-300">
                        <p class="text-lg leading-relaxed">
                          InnovIA Technologies offers comprehensive AI services designed to transform your business operations and drive innovation across multiple industries.
                        </p>
                        <div class="grid md:grid-cols-2 gap-8">
                          <div class="bg-gray-700/30 rounded-xl p-6">
                            <h3 class="text-xl font-semibold text-purple-400 mb-4">AI Consulting & Strategy</h3>
                            <ul class="space-y-2 text-gray-400">
                              <li>• AI readiness assessment</li>
                              <li>• Strategic AI roadmap development</li>
                              <li>• Technology stack recommendations</li>
                              <li>• ROI analysis and business case development</li>
                            </ul>
                          </div>
                          <div class="bg-gray-700/30 rounded-xl p-6">
                            <h3 class="text-xl font-semibold text-green-400 mb-4">Custom AI Development</h3>
                            <ul class="space-y-2 text-gray-400">
                              <li>• Machine learning model development</li>
                              <li>• Natural language processing solutions</li>
                              <li>• Computer vision applications</li>
                              <li>• Predictive analytics systems</li>
                            </ul>
                          </div>
                          <div class="bg-gray-700/30 rounded-xl p-6">
                            <h3 class="text-xl font-semibold text-orange-400 mb-4">AI Integration</h3>
                            <ul class="space-y-2 text-gray-400">
                              <li>• Legacy system modernization</li>
                              <li>• API development and integration</li>
                              <li>• Cloud deployment and scaling</li>
                              <li>• Performance optimization</li>
                            </ul>
                          </div>
                          <div class="bg-gray-700/30 rounded-xl p-6">
                            <h3 class="text-xl font-semibold text-red-400 mb-4">Training & Support</h3>
                            <ul class="space-y-2 text-gray-400">
                              <li>• Team training and upskilling</li>
                              <li>• Technical documentation</li>
                              <li>• Ongoing maintenance and support</li>
                              <li>• Performance monitoring</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      `,
                    )
                  }
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span>Our Services</span>
                  <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    openQuickLinkPage(
                      "Research",
                      `
                      <h2 class="text-2xl font-semibold text-blue-400 mb-6">AI Research & Innovation</h2>
                      <div class="space-y-8 text-gray-300">
                        <p class="text-lg leading-relaxed">
                          At InnovIA Technologies, research is at the heart of everything we do. Our dedicated research team explores the frontiers of artificial intelligence to develop breakthrough technologies that shape the future.
                        </p>
                        <div class="grid md:grid-cols-3 gap-6">
                          <div class="bg-gray-700/30 rounded-xl p-6 text-center">
                            <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                              </svg>
                            </div>
                            <h3 class="text-lg font-semibold text-white mb-3">Advanced ML Algorithms</h3>
                            <p class="text-gray-400 text-sm">Developing next-generation machine learning algorithms for improved accuracy and efficiency.</p>
                          </div>
                          <div class="bg-gray-700/30 rounded-xl p-6 text-center">
                            <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                              </svg>
                            </div>
                            <h3 class="text-lg font-semibold text-white mb-3">Ethical AI</h3>
                            <p class="text-gray-400 text-sm">Researching responsible AI practices and developing frameworks for ethical AI deployment.</p>
                          </div>
                          <div class="bg-gray-700/30 rounded-xl p-6 text-center">
                            <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                              </svg>
                            </div>
                            <h3 class="text-lg font-semibold text-white mb-3">Edge AI</h3>
                            <p class="text-gray-400 text-sm">Pioneering edge computing solutions for real-time AI processing in resource-constrained environments.</p>
                          </div>
                        </div>
                        <div class="mt-8">
                          <h3 class="text-xl font-semibold text-purple-400 mb-4">Current Research Areas</h3>
                          <ul class="grid md:grid-cols-2 gap-3 text-gray-400">
                            <li class="flex items-start"><span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>Federated Learning Systems</li>
                            <li class="flex items-start"><span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>Explainable AI (XAI)</li>
                            <li class="flex items-start"><span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>Multimodal AI Integration</li>
                            <li class="flex items-start"><span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>AI-Human Collaboration</li>
                            <li class="flex items-start"><span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>Quantum Machine Learning</li>
                            <li class="flex items-start"><span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>Sustainable AI Computing</li>
                          </ul>
                        </div>
                      </div>
                      `,
                    )
                  }
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span>Research</span>
                  <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    openQuickLinkPage(
                      "Case Studies",
                      `
                      <h2 class="text-2xl font-semibold text-blue-400 mb-6">Our Approach & Research</h2>
                      <div class="space-y-8 text-gray-300">
                        <p class="text-lg leading-relaxed">
                          InnovIA Technologies is developing cutting-edge AI solutions based on extensive research and industry best practices. Our approach focuses on practical, real-world applications.
                        </p>
                        <div class="space-y-8">
                          <div class="bg-gray-700/30 rounded-xl p-6 border-l-4 border-blue-400">
                            <h3 class="text-xl font-semibold text-white mb-3">Financial Services: Fraud Detection Research</h3>
                            <p class="text-gray-400 mb-4">We are developing advanced AI algorithms for real-time transaction monitoring, focusing on reducing false positives while maintaining high detection accuracy.</p>
                            <div class="grid md:grid-cols-3 gap-4 text-sm">
                              <div><strong class="text-blue-400">Focus:</strong> Behavioral analysis and pattern recognition</div>
                              <div><strong class="text-green-400">Approach:</strong> Advanced ML algorithms with continuous learning</div>
                              <div><strong class="text-purple-400">Goal:</strong> Minimize false positives while maximizing threat detection</div>
                            </div>
                          </div>
                          <div class="bg-gray-700/30 rounded-xl p-6 border-l-4 border-purple-400">
                            <h3 class="text-xl font-semibold text-white mb-3">Healthcare: Medical AI Development</h3>
                            <p class="text-gray-400 mb-4">Our research focuses on developing AI-assisted diagnostic tools to support medical professionals in making more accurate and timely decisions.</p>
                            <div class="grid md:grid-cols-3 gap-4 text-sm">
                              <div><strong class="text-blue-400">Focus:</strong> Medical image analysis and decision support</div>
                              <div><strong class="text-green-400">Approach:</strong> Deep learning models with medical expertise integration</div>
                              <div><strong class="text-purple-400">Goal:</strong> Enhance diagnostic accuracy and reduce analysis time</div>
                            </div>
                          </div>
                          <div class="bg-gray-700/30 rounded-xl p-6 border-l-4 border-green-400">
                            <h3 class="text-xl font-semibold text-white mb-3">Education: Adaptive Learning Systems</h3>
                            <p class="text-gray-400 mb-4">We are creating personalized learning platforms that adapt to individual student needs and learning styles.</p>
                            <div class="grid md:grid-cols-3 gap-4 text-sm">
                              <div><strong class="text-blue-400">Focus:</strong> Personalized content delivery and assessment</div>
                              <div><strong class="text-green-400">Approach:</strong> AI-driven adaptive algorithms</div>
                              <div><strong class="text-purple-400">Goal:</strong> Improve engagement and learning outcomes</div>
                            </div>
                          </div>
                          <div class="bg-gray-700/30 rounded-xl p-6 border-l-4 border-orange-400">
                            <h3 class="text-xl font-semibold text-white mb-3">Supply Chain: Optimization Research</h3>
                            <p class="text-gray-400 mb-4">Our team is developing predictive analytics solutions for supply chain optimization and logistics management.</p>
                            <div class="grid md:grid-cols-3 gap-4 text-sm">
                              <div><strong class="text-blue-400">Focus:</strong> Demand forecasting and route optimization</div>
                              <div><strong class="text-green-400">Approach:</strong> Predictive analytics and machine learning</div>
                              <div><strong class="text-purple-400">Goal:</strong> Reduce costs and improve delivery accuracy</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      `,
                    )
                  }
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span>Case Studies</span>
                  <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
              </li>
              <li>
                <button
                  onClick={openCareersPage}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span>Careers</span>
                  <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Industries</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => openInNewTab(industriesData[0])}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span>Cybersecurity</span>
                  <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => openInNewTab(industriesData[1])}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span>Education</span>
                  <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => openInNewTab(industriesData[2])}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span>Healthcare</span>
                  <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => openInNewTab(industriesData[3])}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span>Supply Chain</span>
                  <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">2120 Rue Phil Goyette</p>
              <p className="text-gray-400 text-sm">Vaudreuil-Dorion, QC J7V 3E5</p>
              <p className="text-gray-400 text-sm">Canada</p>
              <p className="text-gray-400 text-sm">+1 (438) 465-9093</p>
              <a
                href="mailto:info@innovia-technologies.com"
                className="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200"
              >
                info@innovia-technologies.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 InnovIA Technologies. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="/privacy-policy"
                className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-of-service"
                className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
