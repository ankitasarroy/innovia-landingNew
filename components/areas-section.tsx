"use client"

import { Shield, GraduationCap, Heart, Truck, ExternalLink, ArrowRight } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const areas = [
  {
    icon: Shield,
    title: "Cyber Resilience with AI",
    description: "Advanced threat detection and response systems powered by machine learning algorithms.",
    color: "from-blue-400 to-cyan-400",
    features: ["Real-time Threat Detection", "Automated Response", "Behavioral Analysis", "Predictive Security"],
    benefits:
      "Advanced threat detection capabilities with potential for significant response time improvements based on our research",
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
        "Advanced threat detection capabilities",
        "Potential for significant response time improvements",
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
    icon: GraduationCap,
    title: "Education AI",
    description: "Personalized learning platforms and intelligent tutoring systems for enhanced education.",
    color: "from-purple-400 to-pink-400",
    features: ["Adaptive Learning", "Voice Integration", "Progress Tracking", "Virtual Tutoring"],
    benefits: "Personalized learning approaches designed to enhance student engagement and retention",
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
        "Designed to enhance student engagement and retention rates",
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
    icon: Heart,
    title: "Healthcare AI",
    description: "AI-driven diagnostic tools and treatment optimization for improved healthcare outcomes.",
    color: "from-red-400 to-rose-400",
    features: ["Medical Imaging", "Predictive Analytics", "Drug Discovery", "Treatment Optimization"],
    benefits: "AI-assisted diagnostic tools designed to support medical professionals and improve analysis efficiency",
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
        "AI-assisted diagnostic tools designed to support medical professionals",
        "Potential for improved analysis efficiency",
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
    icon: Truck,
    title: "Supply Chain AI",
    description: "Intelligent logistics optimization and predictive analytics for supply chain management.",
    color: "from-orange-400 to-yellow-400",
    features: ["Demand Forecasting", "Route Optimization", "Risk Assessment", "Real-time Visibility"],
    benefits: "Intelligent logistics optimization with potential for significant operational improvements",
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
        "Potential for significant reduction in operational costs",
        "Improved delivery time accuracy",
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

export function AreasSection() {
  const [expandedArea, setExpandedArea] = useState<number | null>(null)

  const toggleExpanded = (index: number) => {
    setExpandedArea(expandedArea === index ? null : index)
  }

  const scrollToContact = () => {
    const element = document.querySelector("#contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const openInNewTab = (area: (typeof areas)[0]) => {
    // Create a new window/tab with detailed content
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
            <!-- Header -->
            <div class="text-center mb-12">
              <div class="w-20 h-20 mx-auto mb-6 rounded-xl bg-gradient-to-r ${area.color} p-4">
                <svg class="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24">
                  <!-- Icon placeholder - would need actual SVG paths -->
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

            <!-- Overview -->
            <div class="mb-12">
              <h2 class="text-2xl font-semibold text-blue-400 mb-4">Overview</h2>
              <p class="text-gray-300 text-lg leading-relaxed">${area.detailedContent.overview}</p>
            </div>

            <!-- Content Grid -->
            <div class="grid md:grid-cols-3 gap-8 mb-12">
              <!-- Key Features -->
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

              <!-- Benefits -->
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

              <!-- Use Cases -->
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

            <!-- Call to Action -->
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

            <!-- Footer -->
            <div class="text-center mt-12 pt-8 border-t border-gray-700">
              <p class="text-gray-400">© 2024 InnovIA Technologies. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `)
      newWindow.document.close()
    }
  }

  return (
    <section id="solutions" className="py-20 px-4 bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            AI{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Transforming industries with cutting-edge artificial intelligence solutions tailored for real-world
            challenges
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {areas.map((area, index) => (
            <div key={index} className="group">
              <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-blue-400/50 transition-all duration-300 cursor-pointer card-3d depth-shadow h-full">
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-r ${area.color} p-4 group-hover:scale-110 transition-transform duration-300 pulse-3d`}
                  >
                    <area.icon className="w-full h-full text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        openInNewTab(area)
                      }}
                      className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200"
                      title="Learn more"
                    >
                      <ExternalLink className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                  {area.title}
                </h3>

                <p className="text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
                  {area.description}
                </p>

                {/* Key Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-3">Key Features</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {area.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg p-4 mb-6">
                  <h4 className="text-sm font-semibold text-blue-400 mb-2">Impact</h4>
                  <p className="text-gray-300 text-sm">{area.benefits}</p>
                </div>

                <Button
                  onClick={scrollToContact}
                  variant="outline"
                  className="w-full border-blue-400/30 text-blue-400 hover:bg-blue-400 hover:text-gray-900 group/btn bg-transparent"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-400/20">
          <h3 className="text-2xl font-semibold text-white mb-4">Ready to Transform Your Business?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Discover how our AI solutions can revolutionize your operations and drive unprecedented growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={scrollToContact}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
            >
              Schedule Consultation
            </Button>
            <Button
              variant="outline"
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900 px-8 py-3 bg-transparent"
            >
              Download Brochure
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
