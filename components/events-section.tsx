import { Button } from "@/components/ui/button"
import { Calendar, Megaphone, Bell, Clock } from "lucide-react"

const announcements = [
  {
    type: "announcement",
    title: "AI Learning Platform: Voice and Text Integration in Development",
    description:
      "Our team is actively developing an innovative AI learning platform that will integrate voice and text capabilities, aiming to transform how users interact with educational content.",
    date: "2024-01-30",
    category: "Innovation",
    priority: "high",
  },
]

export function EventsSection() {
  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Events &{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Announcements
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Stay updated with our latest breakthrough announcements and upcoming events in AI research
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Events Column - Stay Tuned */}
          <div>
            <div className="flex items-center mb-8">
              <Calendar className="w-6 h-6 text-blue-400 mr-3" />
              <h3 className="text-2xl font-semibold text-white">Upcoming Events</h3>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 rotate-3d">
                  <Clock className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-semibold text-white mb-4">Stay Tuned!</h4>
                <p className="text-gray-400 leading-relaxed mb-6">
                  We're planning exciting events, workshops, and conferences to share our latest AI innovations. Follow
                  us on our social channels and subscribe to our newsletter to be the first to know when registration
                  opens.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center text-sm text-gray-300">
                  <Bell className="w-4 h-4 mr-2 text-blue-400" />
                  <span>Get notified about upcoming events</span>
                </div>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
                >
                  Notify Me
                </Button>
              </div>
            </div>
          </div>

          {/* Announcements Column */}
          <div>
            <div className="flex items-center mb-8">
              <Megaphone className="w-6 h-6 text-purple-400 mr-3" />
              <h3 className="text-2xl font-semibold text-white">Latest Announcements</h3>
            </div>

            <div className="space-y-6">
              {announcements.map((announcement, index) => (
                <div
                  key={index}
                  className={`bg-gray-800 rounded-2xl p-6 border transition-all duration-300 card-3d depth-shadow ${
                    announcement.priority === "high"
                      ? "border-purple-400/50 bg-gradient-to-br from-purple-900/20 to-pink-900/20"
                      : "border-gray-700 hover:border-purple-400/30"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="bg-gradient-to-r from-orange-600 to-red-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                          {announcement.category}
                        </span>
                        {announcement.priority === "high" && (
                          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium ml-2">
                            Breaking
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2 hover:text-purple-400 transition-colors duration-200">
                        {announcement.title}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">{announcement.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-300">
                      <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                      <span>
                        {new Date(announcement.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-purple-400 hover:text-white">
                      Read More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-400/20">
            <h3 className="text-2xl font-semibold text-white mb-4">Stay Connected</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Don't miss out on our latest announcements and upcoming events. Subscribe to our newsletter for exclusive
              updates on AI research, innovations, and industry insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="btn-3d bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
              >
                Subscribe to Newsletter
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900 px-8 py-3 bg-transparent"
              >
                Follow Our Updates
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
