"use client"

import { useState, useEffect } from "react"
import { Download, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "profile", "skills", "project", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="w-full px-0">
          <div className="flex justify-between items-center py-4 px-4">
            <div className="text-2xl font-normal" style={{ color: '#0C1323' }}>Portfolio</div>
            <div className="flex space-x-6">
              {[
                { id: "about", label: "About" },
                { id: "profile", label: "Profile" },
                { id: "skills", label: "Skills" },
                { id: "project", label: "Project" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="transition-colors"
                  style={{ 
                    color: activeSection === item.id ? '#0C1323' : '#0C1323'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative px-6 lg:px-8" style={{ backgroundColor: '#0C1323' }}>
        <div className="text-center text-white max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-light mb-8 leading-tight">Ravindran G</h1>
          <p className="text-xl md:text-2xl mb-12 font-light max-w-3xl mx-auto px-4">
            " I'm not just learning to code — I'm learning to solve. "
          </p>
          <div className="flex flex-col items-center space-y-6">
            <a href="/Resume/Resume.pdf" rel="noopener noreferrer" download>
              <Button className="bg-gray-800/80 hover:bg-gray-700 text-white px-8 py-3 rounded-full flex items-center">
                <Download className="mr-2 h-4 w-4" />
                MY RESUME
              </Button>
            </a>
            <div className="flex justify-center space-x-4">
              <a href="https://www.linkedin.com/in/g-ravindran-706962319/" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="bg-gray-800/50 hover:bg-gray-700/50 text-white">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </a>
              <Button variant="ghost" size="icon" className="bg-gray-800/50 hover:bg-gray-700/50 text-white">
                <a href="https://github.com/Ravindranbit" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">ABOUT ME</h2>
          <p className="text-gray-600 mb-8">In a Few Words</p>
          <div className="w-16 h-px bg-gray-400 mx-auto mb-12"></div>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            I'm a Computer Science student with a passion for turning ideas into real, working products. I'm currently
            hands-on with full-stack development, mainly using React.js, Node.js, Express, and MongoDB. Along with my
            technical skills, I'm a strong communicator and a natural organizer — I enjoy leading teams, coordinating
            ideas, and making sure things get done efficiently. I've been part of national-level hackathons and love
            working on tech that makes an impact. Apart from tech, I'm a state-level gold medalist in archery, bringing
            focus and consistency to everything I do.
          </p>
        </div>
      </section>

      {/* Profile Section */}
      <section id="profile" className="py-20 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">PROFILE</h2>
            <p className="text-gray-600">My Journey So Far</p>
            <div className="w-16 h-px bg-gray-400 mx-auto mt-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 relative">
            {/* Vertical divider line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 transform -translate-x-1/2"></div>

            <div className="pr-8">
              <h3 className="text-2xl font-light text-gray-800 mb-8">Education</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-medium text-gray-800 mb-2">B.Tech in Computer Science and Engineering</h4>
                  <p className="text-gray-600 mb-2">2023 - 2027</p>
                  <p className="text-gray-600 mb-4">
                    Amrita School of Computing, Amrita Vishwa Vidyapeetham, Coimbatore
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    pursuing B.Tech in Computer Science and Engineering at Amrita School of Computing. Exploring
                    full-stack development, cloud computing, and real-world tech applications. Actively involved in
                    hackathons and hands-on projects. College life has been a journey of continuous learning and
                    innovation.
                  </p>
                </div>
              </div>
            </div>

            <div className="pl-8">
              <h3 className="text-2xl font-light text-gray-800 mb-8">HSE (12th) and SSLC (10th)</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-gray-600 mb-2">2020 - 2023</p>
                  <p className="text-gray-600 mb-4">SRKVG Residential matric higher secondary school, Ulundurpet</p>
                  <p className="text-gray-700 leading-relaxed">
                    Completed schooling with active participation in both academics and extracurricular activities.
                    Organized several events, gaining valuable leadership experience and broad exposure. Represented the
                    district in basketball, won a gold medal in archery, and excelled as an athlete. Early involvement
                    in organizing and sports helped build a strong, dynamic personality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">SKILLS</h2>
            <p className="text-gray-600">Technologies & Tools</p>
            <div className="w-16 h-px bg-gray-400 mx-auto mt-8"></div>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-4 gap-12 max-w-4xl mx-auto">
            {[
              {
                name: "HTML5",
                icon: (
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100">
                    <img src="/HTML.png" alt="HTML5" className="w-12 h-12 object-contain" />
                  </div>
                ),
              },
              {
                name: "CSS3",
                icon: (
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100">
                    <img src="/css.png" alt="CSS3" className="w-12 h-12 object-contain" />
                  </div>
                ),
              },
              {
                name: "JavaScript",
                icon: (
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100">
                    <svg className="w-10 h-10" viewBox="0 0 24 24">
                      <rect width="24" height="24" rx="2" fill="#F7DF1E" />
                      <text x="12" y="16" textAnchor="middle" fontSize="10" fill="#000" fontWeight="bold">JS</text>
                    </svg>
                  </div>
                ),
              },
              {
                name: "React.js",
                icon: (
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100">
                    <svg className="w-10 h-10" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
                      <path d="M12 1c-2.4 0-4.5 4.3-4.5 10s2.1 10 4.5 10 4.5-4.3 4.5-10S14.4 1 12 1zm0 0" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(0 12 12)" />
                      <path d="M12 1c-2.4 0-4.5 4.3-4.5 10s2.1 10 4.5 10 4.5-4.3 4.5-10S14.4 1 12 1zm0 0" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)" />
                      <path d="M12 1c-2.4 0-4.5 4.3-4.5 10s2.1 10 4.5 10 4.5-4.3 4.5-10S14.4 1 12 1zm0 0" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(-60 12 12)" />
                    </svg>
                  </div>
                ),
              },
              {
                name: "Node.js",
                icon: (
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100">
                    <img src="/Node.js.png" alt="Node.js" className="w-12 h-12 object-contain" />
                  </div>
                ),
              },
              {
                name: "Express.js",
                icon: (
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800 leading-none">ex</div>
                      <div className="text-xs text-gray-600 mt-0.5 leading-none">press</div>
                    </div>
                  </div>
                ),
              },
              {
                name: "MongoDB",
                icon: (
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100">
                    <svg className="w-10 h-10" viewBox="0 0 24 24">
                      <path d="M17.18 9.518c-1.263-5.56-4.242-7.387-4.562-8.086C12.266.939 11.885.446 11.618.15c-.233-.257-.455-.518-.67-.84-.003-.04-.007-.075-.011-.12-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218z" fill="#4DB33D" />
                      <path d="M12.3 22.445c-.142.428-.292.835-.456 1.223-.132-.107-.241-.22-.35-.33l-.015-.015c-.415-.403-1.565-1.61-2.654-3.324.89.613 2.259 1.714 3.475 2.446z" fill="#6CAD2F" />
                      <path d="M11.544 22.123c.164-.388.314-.795.456-1.223-1.216-.732-2.585-1.833-3.475-2.446-.237-.42-.47-.846-.695-1.285-.225-.439-.443-.891-.648-1.36 1.089 1.714 2.239 2.921 2.654 3.324l.015.015c.109.11.218.223.35.33.044.04.09.08.135.12.063.055.128.11.208.525z" fill="#509E2F" />
                    </svg>
                  </div>
                ),
              },
              {
                name: "MySQL",
                icon: (
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100">
                    <img src="/mysql.png" alt="MySQL" className="w-12 h-12 object-contain" />
                  </div>
                ),
              },
              {
                name: "Python",
                icon: (
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100">
                    <svg className="w-10 h-10" viewBox="0 0 24 24">
                      <path d="M14.31.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05z" fill="#366994" />
                      <path d="M9.74 20.37l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08-.33.23z" fill="#FDD43B" />
                      <path d="M21.1 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01z" fill="#FDD43B" />
                    </svg>
                  </div>
                ),
              },
              {
                name: "Java",
                icon: (
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100">
                    <img src="/java.png" alt="Java" className="w-12 h-12 object-contain" />
                  </div>
                ),
              },
              {
                name: "C++",
                icon: (
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100">
                    <img src="/c++.png" alt="C++" className="w-12 h-12 object-contain" />
                  </div>
                ),
              },
              {
                name: "DBMS",
                icon: (
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100">
                    <img src="/DBMS.png" alt="DBMS" className="w-12 h-12 object-contain" />
                  </div>
                ),
              },
              {
                name: "Git",
                icon: (
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100">
                    <svg className="w-10 h-10" viewBox="0 0 24 24">
                      <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" fill="#F1502F" />
                    </svg>
                  </div>
                ),
              },
              {
                name: "MS PowerPoint",
                icon: (
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100">
                    <img src="/power point.png" alt="MS PowerPoint" className="w-12 h-12 object-contain" />
                  </div>
                ),
              },
              {
                name: "MS Word",
                icon: (
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100">
                    <img src="/word.png" alt="MS Word" className="w-12 h-12 object-contain" />
                  </div>
                ),
              },
              {
                name: "MS Excel",
                icon: (
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100">
                    <img src="/Excel.png" alt="MS Excel" className="w-12 h-12 object-contain" />
                  </div>
                ),
              },
            ].map((skill, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-all duration-300">
                <div className="flex justify-center mb-4">{skill.icon}</div>
                <p className="font-medium text-sm text-gray-700">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="project" className="py-20 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">PROJECT</h2>
            <p className="text-gray-600">Showcase</p>
            <div className="w-16 h-px bg-gray-400 mx-auto mt-8"></div>
          </div>

          <div className="space-y-20">
            {/* FITCLUB Project */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-black rounded-lg overflow-hidden">
                <img
                  src="/Fitness.png"
                  alt="FITCLUB Project"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-teal-500 mb-4">FITCLUB</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This project is a sleek and modern fitness website designed to provide an engaging platform for
                  showcasing various aspects of a fitness center. It highlights training programs, trainer profiles,
                  sessions, and detailed membership plans. The website is fully responsive, ensuring a seamless user
                  experience across all device types from desktops to smartphones...{" "}
                  <span className="text-teal-500 cursor-pointer">Read more</span>
                </p>
                <div className="mb-4">
                  <p className="text-gray-800 font-medium mb-2">Features:</p>
                  <p className="text-gray-600">ScrollReveal Animations, Swiper.js Slider, Responsive Design</p>
                </div>
                <div>
                  <p className="text-gray-800 font-medium mb-2">Tech Stack:</p>
                  <p className="text-gray-600">HTML, CSS, JavaScript</p>
                </div>
              </div>
            </div>

            {/* CONNECT Project */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-semibold text-teal-500 mb-4">CONNECT</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Connect is a full-stack web application designed to bring like-minded individuals together based on
                  shared interests, hobbies, and personal or professional goals. Whether users are looking for study
                  partners, collaborators for creative projects, or simply want to meet new people who share similar
                  passions, the platform offers a simple and effective way to form meaningful connections...{" "}
                  <span className="text-teal-500 cursor-pointer">Read more</span>
                </p>
                <div className="mb-4">
                  <p className="text-gray-800 font-medium mb-2">Features:</p>
                  <p className="text-gray-600">Real-time Messaging, User Authentication, Matching Algorithm</p>
                </div>
                <div>
                  <p className="text-gray-800 font-medium mb-2">Tech Stack:</p>
                  <p className="text-gray-600">MongoDB, Express.js, React, Node.js</p>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src="/connect.jpg"
                    alt="CONNECT Project"
                    className="w-64 h-64 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* PONDY Project */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src="/Pondy.png"
                  alt="PONDY Project"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-teal-500 mb-4">PONDY</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Navigating the modern property market requires a digital platform that's fast, functional, and
                  user-focused—this real estate website delivers just that. Tailored for showcasing a wide range of
                  residential and commercial listings, the site offers users an intuitive experience to explore
                  properties based on location, price, and features...{" "}
                  <span className="text-teal-500 cursor-pointer">Read more</span>
                </p>
                <div className="mb-4">
                  <p className="text-gray-800 font-medium mb-2">Features:</p>
                  <p className="text-gray-600">
                    Admin Dashboard, Map Integration, Property Filtering, Real-time Updates
                  </p>
                </div>
                <div>
                  <p className="text-gray-800 font-medium mb-2">Tech Stack:</p>
                  <p className="text-gray-600">Supabase, React.js, TypeScript, JavaScript</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">RESEARCH AND CASE STUDIES</h2>
            <p className="text-gray-600">Learning & Exploration</p>
            <div className="w-16 h-px bg-gray-400 mx-auto mt-8"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            {/* First Row */}
            <div className="text-center">
              <div className="mb-6">
                <svg className="w-16 h-16 mx-auto text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Serverless Cloud Computing</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Research paper on scalable, low-maintenance cloud architectures. Currently ongoing project exploring
                modern serverless technologies and their applications in enterprise environments.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6">
                <svg className="w-16 h-16 mx-auto text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Spam Filtering using Rabin-Karp</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Compared efficiency with Boyer-Moore, heuristic, and brute-force methods. Analyzed algorithmic
                performance for text pattern matching in spam detection systems.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6">
                <svg className="w-16 h-16 mx-auto text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Boyer-Moore Algorithm</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Studied its speed and relevance in large-scale pattern matching. Explored optimization techniques for
                text processing applications.
              </p>
            </div>

            {/* Second Row */}
            <div className="text-center">
              <div className="mb-6">
                <svg className="w-16 h-16 mx-auto text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Car Safety Management System</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Used C to simulate safety features and data handling. Developed comprehensive safety monitoring and
                alert systems for vehicle management.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6">
                <svg
                  className="w-16 h-16 mx-auto text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path d="M12 2L4 7l8 5 8-5-8-5z" fill="currentColor" opacity="0.3" />
                  <path d="M4 7l8 5v10l-8-5V7z" fill="currentColor" opacity="0.6" />
                  <path d="M20 7l-8 5v10l8-5V7z" fill="currentColor" opacity="0.8" />
                  <path d="M12 2L4 7l8 5 8-5-8-5z" stroke="currentColor" fill="none" />
                  <path d="M4 7v10l8 5V12L4 7z" stroke="currentColor" fill="none" />
                  <path d="M20 7v10l-8 5V12l8-5z" stroke="currentColor" fill="none" />
                  <circle cx="8" cy="9" r="1" fill="currentColor" />
                  <circle cx="16" cy="9" r="1" fill="currentColor" />
                  <circle cx="12" cy="6" r="1" fill="currentColor" />
                  <circle cx="12" cy="18" r="1" fill="currentColor" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Blockchain using Merkle Tree</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Explored Merkle trees for secure blockchain data verification. Implemented data structure algorithms for
                enhanced security in blockchain applications.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6">
                <svg className="w-16 h-16 mx-auto text-teal-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Task Synchronization in FreeRTOS</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Explored techniques including message queues, semaphores, mutexes, and event groups. Demonstrated
                inter-task communication for efficient real-time task management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-normal text-gray-800 mb-6">STAY CONNECTED</h2>
            <p className="text-gray-600 text-lg mb-8">Get in touch with me !</p>
            <div className="w-24 h-0.5 bg-gray-800 mx-auto"></div>
          </div>

          <form className="max-w-2xl mx-auto space-y-0">
            {/* Name Field */}
            <div className="flex border border-gray-300">
              <div className="flex items-center justify-center w-12 bg-gray-100 border-r border-gray-300">
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Name"
                className="flex-1 px-4 py-3 bg-white text-gray-700 placeholder-gray-400 focus:outline-none"
              />
            </div>

            {/* Email Field */}
            <div className="flex border border-gray-300 border-t-0">
              <div className="flex items-center justify-center w-12 bg-gray-100 border-r border-gray-300">
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-4 py-3 bg-white text-gray-700 placeholder-gray-400 focus:outline-none"
              />
            </div>

            {/* Subject Field */}
            <div className="flex border border-gray-300 border-t-0">
              <div className="flex items-center justify-center w-12 bg-gray-100 border-r border-gray-300">
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5.5 7A1.5 1.5 0 004 8.5v7A1.5 1.5 0 005.5 17h13a1.5 1.5 0 001.5-1.5v-7A1.5 1.5 0 0018.5 7h-13z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="flex-1 px-4 py-3 bg-white text-gray-700 placeholder-gray-400 focus:outline-none"
              />
            </div>

            {/* Message Field */}
            <div className="flex border border-gray-300 border-t-0">
              <div className="flex items-start justify-center w-12 bg-gray-100 border-r border-gray-300 pt-4">
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
              <textarea
                placeholder="Your Message"
                rows={6}
                className="flex-1 px-4 py-3 bg-white text-gray-700 placeholder-gray-400 focus:outline-none resize-none"
              />
            </div>

            {/* Send Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="bg-teal-400 hover:bg-teal-500 text-white px-6 py-2.5 text-sm font-medium transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
