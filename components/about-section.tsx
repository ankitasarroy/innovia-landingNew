"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Target, Eye, Award } from "lucide-react"

export function AboutSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="about" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="absolute inset-0 bg-[url('/futuristic-ai-background.png')] bg-cover bg-center opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">InnovIA</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Pioneering the next generation of artificial intelligence solutions across critical industries
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center">
                <Target className="w-6 h-6 mr-3" />
                Our Mission
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                At InnovIA Technologies, we are pioneering the next generation of artificial intelligence solutions. Our
                mission is to harness the transformative power of AI to solve complex challenges across critical
                industries, creating a more secure, efficient, and intelligent future.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
                <Eye className="w-6 h-6 mr-3" />
                Our Vision
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                We envision a world where AI seamlessly integrates into every aspect of human endeavor, enhancing
                capabilities while maintaining ethical standards and human-centered design principles. Through
                cutting-edge research and development, we're building the foundation for tomorrow's intelligent systems.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-green-400 mb-4 flex items-center">
                <Award className="w-6 h-6 mr-3" />
                Our Values
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Innovation</h4>
                  <p className="text-gray-400 text-sm">Pushing boundaries with cutting-edge AI research</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Ethics</h4>
                  <p className="text-gray-400 text-sm">Responsible AI development and deployment</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Excellence</h4>
                  <p className="text-gray-400 text-sm">Delivering superior quality in every solution</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Collaboration</h4>
                  <p className="text-gray-400 text-sm">Working together to achieve breakthrough results</p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => scrollToSection("#team")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white group"
            >
              Meet Our Team
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-8 backdrop-blur-sm border border-blue-400/20 card-3d depth-shadow">
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 hover:scale-110 transition-transform duration-300 float-3d pulse-3d">
                    <img
                      src="/innovia-logo.png"
                      alt="InnovIA Technologies Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 className="text-2xl font-semibold text-white mb-4">Innovation at Core</h4>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Driving breakthrough innovations in artificial intelligence across multiple industries, focusing on
                    practical solutions that make a real-world impact.
                  </p>

                  {/* Achievement Highlights */}
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">2025</div>
                      <div className="text-gray-400 text-sm">Founded</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">7</div>
                      <div className="text-gray-400 text-sm">Team Members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">4</div>
                      <div className="text-gray-400 text-sm">Industries</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">Growing</div>
                      <div className="text-gray-400 text-sm">Possibilities</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
