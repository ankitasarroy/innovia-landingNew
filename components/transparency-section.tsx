"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Target, Lightbulb, Users, Rocket } from "lucide-react"

const developmentStages = [
  {
    phase: "Research & Foundation",
    status: "completed",
    progress: 100,
    description: "Team assembly, market research, and technology foundation",
    timeline: "Q4 2024 - Q1 2025",
    achievements: [
      "Assembled expert team with 13+ years combined experience",
      "Completed comprehensive market analysis across 4 key industries",
      "Established research methodologies and development frameworks",
      "Defined ethical AI principles and development standards",
    ],
  },
  {
    phase: "Prototype Development",
    status: "in-progress",
    progress: 65,
    description: "Building proof-of-concept solutions and core AI models",
    timeline: "Q1 2025 - Q3 2025",
    achievements: [
      "Cybersecurity threat detection algorithms in development",
      "Educational AI personalization engine prototype created",
      "Healthcare diagnostic support system framework established",
      "Supply chain optimization models under testing",
    ],
  },
  {
    phase: "Pilot Testing",
    status: "upcoming",
    progress: 0,
    description: "Limited deployment with select partners for validation",
    timeline: "Q3 2025 - Q1 2026",
    achievements: [
      "Partner identification and agreement negotiations",
      "Controlled environment testing protocols",
      "Performance validation and optimization",
      "User feedback integration and system refinement",
    ],
  },
  {
    phase: "Market Launch",
    status: "planned",
    progress: 0,
    description: "Full commercial deployment of validated solutions",
    timeline: "Q2 2026 onwards",
    achievements: [
      "Commercial-grade solution deployment",
      "Customer onboarding and support systems",
      "Scalable infrastructure implementation",
      "Continuous improvement and feature expansion",
    ],
  },
]

const researchAreas = [
  {
    title: "Cybersecurity AI",
    focus: "Advanced threat detection and automated response systems",
    approach: "Machine learning algorithms trained on diverse threat patterns with real-time adaptation capabilities",
    currentWork: "Developing behavioral analysis models and testing anomaly detection accuracy",
    nextSteps: "Integration with existing security infrastructure and pilot testing with cybersecurity partners",
  },
  {
    title: "Educational AI",
    focus: "Personalized learning platforms with adaptive content delivery",
    approach: "Multi-modal AI combining natural language processing, learning analytics, and cognitive modeling",
    currentWork: "Building adaptive learning algorithms and voice-text integration prototypes",
    nextSteps: "Educational institution partnerships for controlled testing and curriculum integration",
  },
  {
    title: "Healthcare AI",
    focus: "AI-assisted diagnostic tools and treatment optimization",
    approach: "Deep learning models for medical image analysis combined with clinical decision support systems",
    currentWork: "Developing medical imaging algorithms and establishing healthcare compliance frameworks",
    nextSteps: "Clinical validation studies and regulatory approval processes",
  },
  {
    title: "Supply Chain AI",
    focus: "Predictive analytics for logistics and inventory optimization",
    approach: "Time-series forecasting models with real-time data integration and optimization algorithms",
    currentWork: "Creating demand forecasting models and route optimization prototypes",
    nextSteps: "Industry partner collaboration for real-world testing and validation",
  },
]

export function TransparencySection() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-400" />
      case "upcoming":
        return <Target className="w-5 h-5 text-yellow-400" />
      case "planned":
        return <Rocket className="w-5 h-5 text-purple-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400"
      case "in-progress":
        return "text-blue-400"
      case "upcoming":
        return "text-yellow-400"
      case "planned":
        return "text-purple-400"
      default:
        return "text-gray-400"
    }
  }

  const scrollToContact = () => {
    const element = document.querySelector("#contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="transparency" className="py-20 px-4 bg-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Development Journey
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
          <p className="text-gray-400 text-lg max-w-4xl mx-auto">
            Transparency is at the core of our values. Here's an honest look at where we are in our development journey,
            what we're working on, and our roadmap for the future.
          </p>
        </div>

        {/* Company Stage Overview */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-400/20 mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Current Company Stage</h3>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                InnovIA Technologies is currently in the{" "}
                <strong className="text-blue-400">Research & Development</strong> phase, transitioning into{" "}
                <strong className="text-purple-400">Prototype Development</strong>. We are building innovative AI
                solutions with a focus on practical, real-world applications.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Expert Team</h4>
                <p className="text-gray-400 text-sm">7 experienced professionals with 13+ years combined expertise</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Active Research</h4>
                <p className="text-gray-400 text-sm">Developing cutting-edge AI solutions across 4 key industries</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Clear Vision</h4>
                <p className="text-gray-400 text-sm">Structured roadmap with defined milestones and timelines</p>
              </div>
            </div>
          </div>
        </div>

        {/* Development Roadmap */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Development Roadmap</h3>
          <div className="space-y-8">
            {developmentStages.map((stage, index) => (
              <div
                key={index}
                className={`bg-gray-900 rounded-2xl p-8 border transition-all duration-300 ${
                  stage.status === "completed"
                    ? "border-green-400/50 bg-gradient-to-r from-green-900/20 to-emerald-900/20"
                    : stage.status === "in-progress"
                      ? "border-blue-400/50 bg-gradient-to-r from-blue-900/20 to-cyan-900/20"
                      : stage.status === "upcoming"
                        ? "border-yellow-400/50 bg-gradient-to-r from-yellow-900/20 to-orange-900/20"
                        : "border-purple-400/50 bg-gradient-to-r from-purple-900/20 to-pink-900/20"
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(stage.status)}
                    <div>
                      <h4 className="text-2xl font-semibold text-white mb-2">{stage.phase}</h4>
                      <p className={`text-sm font-medium uppercase tracking-wide ${getStatusColor(stage.status)}`}>
                        {stage.status.replace("-", " ")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400 mb-2">{stage.timeline}</div>
                    <div className="w-32">
                      <Progress value={stage.progress} className="h-2" />
                      <div className="text-xs text-gray-400 mt-1">{stage.progress}% Complete</div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-lg mb-6">{stage.description}</p>

                <div>
                  <h5 className="text-lg font-semibold text-white mb-4">
                    {stage.status === "completed"
                      ? "Achievements"
                      : stage.status === "in-progress"
                        ? "Current Work"
                        : "Planned Activities"}
                  </h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    {stage.achievements.map((achievement, achievementIndex) => (
                      <div key={achievementIndex} className="flex items-start space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            stage.status === "completed"
                              ? "bg-green-400"
                              : stage.status === "in-progress"
                                ? "bg-blue-400"
                                : stage.status === "upcoming"
                                  ? "bg-yellow-400"
                                  : "bg-purple-400"
                          }`}
                        ></div>
                        <p className="text-gray-400 text-sm">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Research Approach */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Our Research Approach</h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {researchAreas.map((area, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-blue-400/50 transition-all duration-300"
              >
                <h4 className="text-xl font-semibold text-white mb-4">{area.title}</h4>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-2">Focus Area</h5>
                    <p className="text-gray-300 text-sm">{area.focus}</p>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-2">Approach</h5>
                    <p className="text-gray-300 text-sm">{area.approach}</p>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-green-400 uppercase tracking-wide mb-2">Current Work</h5>
                    <p className="text-gray-300 text-sm">{area.currentWork}</p>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-yellow-400 uppercase tracking-wide mb-2">Next Steps</h5>
                    <p className="text-gray-300 text-sm">{area.nextSteps}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Commitment */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-white mb-4">Our Commitment to Transparency</h3>
            <p className="text-gray-300 max-w-3xl mx-auto">
              We believe in honest communication about our progress, challenges, and achievements. As we grow and
              develop our solutions, we'll continue to provide regular updates on our journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-blue-400 mb-2">Regular Updates</h4>
              <p className="text-gray-400 text-sm">Quarterly progress reports and milestone announcements</p>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-semibold text-purple-400 mb-2">Open Communication</h4>
              <p className="text-gray-400 text-sm">Direct access to our team for questions and discussions</p>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-semibold text-green-400 mb-2">Ethical Development</h4>
              <p className="text-gray-400 text-sm">Responsible AI practices and transparent development processes</p>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={scrollToContact}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
