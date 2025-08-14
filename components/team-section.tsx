const team = [
  {
    name: "Mrinal Das",
    role: "CEO & AI Strategy Analyst",
    department: "Leadership",
    bio: "Visionary leader driving InnovIA's strategic direction in artificial intelligence innovation and business development.",
    expertise: ["AI Strategy", "Business Development", "Innovation Leadership", "Strategic Planning"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/professional-ceo-executive-GYJ5NGMawm7bOiAO1w8fCF2JbUQjK2.png",
    priority: 1,
    level: "ceo",
    reportsTo: null,
  },
  {
    name: "Abhijeet",
    role: "Data/AI Architect & Technical Engineering Lead",
    department: "Technology",
    bio: "Data/AI Architect with 13+ years of experience building scalable data and AI pipelines. Expert in cloud technologies and database optimization, leading teams of 25+ professionals.",
    expertise: ["AWS", "Snowflake", "Data Architecture", "AI Pipelines", "Team Leadership"],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Abhijeet-uQquhY27MEr4LeVsYTZ7D79zfvwolK.png",
    priority: 2,
    level: "core",
    reportsTo: "Mrinal Das",
  },
  {
    name: "Sabita",
    role: "Finance & R&D Specialist",
    department: "Finance & Research",
    bio: "Finance and analytics expert bridging financial insights with innovative development, driving data-backed decisions and advancing R&D initiatives.",
    expertise: ["Financial Analytics", "Strategic Research", "R&D Management", "Data-Driven Decisions"],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sabita-TudArbBU92lQZ0gf4c5aY81vJBgazg.png",
    priority: 3,
    level: "core",
    reportsTo: "Mrinal Das",
  },
  {
    name: "Soumojeet",
    role: "Senior Lead Software Engineer",
    department: "Technology",
    bio: "Seasoned QA professional specializing in functional and automation testing with expertise in Selenium, RestAssured API, and Java. With strong experience as a UAT Lead and Business Analyst, he bridges technical precision with business needs to ensure high-quality delivery. Acting as a Product Manager from the QA perspective, Soumojeet plays a key role in delivering modernized bank-to-bank and customer-to-bank payment systems aligned with SWIFT ISO 20022 standards.",
    expertise: [
      "QA & Automation Testing",
      "Selenium & RestAssured API",
      "Java Development",
      "UAT Leadership",
      "Business Analysis",
      "SWIFT ISO 20022",
      "Payment Systems",
    ],
    image: "/soumojeet.jpg",
    priority: 4,
    level: "core",
    reportsTo: "Mrinal Das",
  },
  {
    name: "Mayukh",
    role: "Data Scientist",
    department: "Technology",
    bio: "Data Scientist specializing in real-time machine learning systems, predictive modeling, and cloud deployment. He combines strong analytical skills with hands-on engineering expertise to build intelligent, scalable solutions that turn data into actionable insights.",
    expertise: ["Machine Learning", "Predictive Modeling", "Cloud Deployment", "Real-time Systems", "Data Analytics"],
    image: "/mayukh.png",
    priority: 5,
    level: "team",
    reportsTo: "Abhijeet",
  },
  {
    name: "Ankita",
    role: "Technology Strategist",
    department: "Technology",
    bio: "Software Engineer with Master's in Computer Vision, specializing in full-stack development and innovative user-focused applications with clean, scalable code.",
    expertise: ["Computer Vision", "Full-Stack Development", "Software Engineering", "UI/UX Innovation"],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ankita-A6CYwTiCXudj3m2N8tdJRArIM7v9Ky.jpeg",
    priority: 6,
    level: "team",
    reportsTo: "Abhijeet",
  },
  {
    name: "Masti Patel",
    role: "Full Stack Developer",
    department: "Technology",
    bio: "Skilled Full Stack Developer with expertise in building scalable, user-friendly web applications from concept to deployment. Blends clean design with robust functionality to deliver seamless digital experiences.",
    expertise: [
      "Full-Stack Development",
      "Web Applications",
      "Frontend & Backend",
      "Platform Optimization",
      "UI/UX Design",
    ],
    image: "/masti-patel.png",
    priority: 7,
    level: "team",
    reportsTo: "Abhijeet",
  },
]

const departmentColors = {
  Leadership: "from-yellow-400 to-orange-400",
  Technology: "from-blue-400 to-purple-400",
  "Finance & Research": "from-green-400 to-emerald-400",
}

const levelColors = {
  ceo: "from-yellow-400 to-orange-400",
  core: "from-purple-400 to-pink-400",
  team: "from-blue-400 to-cyan-400",
}

export function TeamSection() {
  // Sort team by priority (CEO first, then others)
  const sortedTeam = [...team].sort((a, b) => a.priority - b.priority)

  // Group team members by level
  const ceoMember = sortedTeam.filter((member) => member.level === "ceo")
  const coreMembers = sortedTeam.filter((member) => member.level === "core")
  const teamMembers = sortedTeam.filter((member) => member.level === "team")

  return (
    <section className="py-20 px-4 bg-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Team</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Leading the future of artificial intelligence with vision, expertise, and innovation
          </p>
        </div>

        {/* CEO Section - Featured */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-white mb-2">Chief Executive Officer</h3>
            <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 border border-yellow-400/30 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-2xl blur-xl"></div>
                  <img
                    src={ceoMember[0].image || "/placeholder.svg"}
                    alt={ceoMember[0].name}
                    className="relative w-full h-48 object-contain object-center rounded-2xl shadow-lg bg-gray-800"
                  />
                </div>
                <div className="text-center md:text-left">
                  <div className="mb-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${departmentColors[ceoMember[0].department]} text-gray-900 mb-3`}
                    >
                      {ceoMember[0].department}
                    </span>
                  </div>
                  <h4 className="text-3xl font-bold text-white mb-2">{ceoMember[0].name}</h4>
                  <p className="text-yellow-400 font-semibold text-xl mb-4">{ceoMember[0].role}</p>
                  <p className="text-gray-300 leading-relaxed mb-6">{ceoMember[0].bio}</p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2">
                    {ceoMember[0].expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Team Members Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-white mb-2">Core Team Members</h3>
            <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-4"></div>
            <p className="text-gray-400">Strategic leadership and oversight</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {coreMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-gray-900 rounded-2xl overflow-hidden border-2 border-purple-400/30 hover:border-purple-400/60 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl h-full">
                  {/* Hierarchy Indicator */}
                  <div className="bg-gradient-to-r from-purple-400/20 to-pink-400/20 px-4 py-2 border-b border-purple-400/20">
                    <div className="flex items-center justify-center">
                      <span className="text-xs font-semibold text-purple-400 uppercase tracking-wide">Core Team</span>
                    </div>
                  </div>

                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-48 object-contain object-center group-hover:scale-110 transition-transform duration-300 bg-gray-800"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>

                    {/* Department Badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${departmentColors[member.department]} text-gray-900`}
                      >
                        {member.department}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col h-full">
                    <div className="text-center mb-4">
                      <h4 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors duration-300">
                        {member.name}
                      </h4>
                      <p className="text-purple-400 font-medium text-sm">{member.role}</p>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed mb-4 text-center flex-grow">{member.bio}</p>

                    {/* Expertise Section */}
                    <div className="space-y-3 mt-auto">
                      <h5 className="text-xs font-semibold text-gray-300 uppercase tracking-wide text-center">
                        Key Expertise
                      </h5>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {member.expertise.slice(0, 3).map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 bg-purple-600/20 border border-purple-400/30 text-purple-400 text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                        {member.expertise.length > 3 && (
                          <span className="px-2 py-1 bg-gray-600/20 border border-gray-400/30 text-gray-400 text-xs rounded-full">
                            +{member.expertise.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-white mb-2">Development Team</h3>
            <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mb-4"></div>
            <p className="text-gray-400">Technical specialists building the future of AI</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-gray-900 rounded-2xl overflow-hidden border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl">
                  {/* Hierarchy Indicator */}
                  <div className="bg-gradient-to-r from-blue-400/20 to-cyan-400/20 px-4 py-2 border-b border-blue-400/20">
                    <div className="flex items-center justify-center">
                      <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">Dev Team</span>
                    </div>
                  </div>

                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-40 object-contain object-center group-hover:scale-110 transition-transform duration-300 bg-gray-800"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>

                    {/* Department Badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${departmentColors[member.department]} text-gray-900`}
                      >
                        {member.department}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <div className="text-center mb-4">
                      <h4 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors duration-300">
                        {member.name}
                      </h4>
                      <p className="text-blue-400 font-medium text-sm">{member.role}</p>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed mb-4 text-center">{member.bio}</p>

                    {/* Expertise Section */}
                    <div className="space-y-3">
                      <h5 className="text-xs font-semibold text-gray-300 uppercase tracking-wide text-center">
                        Key Expertise
                      </h5>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {member.expertise.slice(0, 3).map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 bg-blue-600/20 border border-blue-400/30 text-blue-400 text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                        {member.expertise.length > 3 && (
                          <span className="px-2 py-1 bg-gray-600/20 border border-gray-400/30 text-gray-400 text-xs rounded-full">
                            +{member.expertise.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Stats */}
        <div className="mt-16 pt-12 border-t border-gray-700">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-400">13+</div>
              <div className="text-gray-400 text-sm">Years Combined Experience</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-400">3</div>
              <div className="text-gray-400 text-sm">Core Departments</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-400">7</div>
              <div className="text-gray-400 text-sm">Total Team Members</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-yellow-400">100%</div>
              <div className="text-gray-400 text-sm">Commitment to Innovation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
