"use client"

import { useState, useEffect } from "react"
import { Download, Linkedin, Github, User, Mail, MessageSquare, Send, Tag, X, Check, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "profile", "skills", "project", "contact"]
      const scrollTrigger = window.scrollY + (window.innerHeight / 2)
      
      let currentSection = "home"

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollTrigger >= offsetTop && scrollTrigger < offsetTop + offsetHeight) {
            currentSection = section
          }
        }
      }
      
      // If we are at the very bottom of the page, force "contact" as active
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        currentSection = "contact"
      }
      
      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Trigger once to set correct state instantly
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (status.type) {
      const timer = setTimeout(() => {
        setStatus({ type: null, message: '' })
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [status])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({ type: 'success', message: 'Thank you for contacting! I have received your message and will get back to you within 24 hours.' })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to send message. Please try again.' })
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'An error occurred. Please check your connection and try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Unified Header Background */}
      <div className="fixed top-0 inset-x-0 h-24 bg-white/80 backdrop-blur-2xl z-40 pointer-events-none border-b border-white/50 shadow-[0_1px_10px_rgba(0,0,0,0.01)]" />

      {/* Top Left Logo - only show on sm+ */}
      <div 
        className="fixed top-5 left-4 sm:left-6 lg:top-8 lg:left-10 z-50 cursor-pointer group hidden sm:block pointer-events-auto"
        onClick={() => scrollToSection('home')}
      >
        <div 
          className="text-3xl md:text-4xl font-normal tracking-wide text-gray-900 drop-shadow-sm group-hover:text-teal-600 transition-colors duration-300"
          style={{ fontFamily: 'var(--font-great-vibes)' }}
        >
          Portfolio
        </div>
      </div>

      {/* Toast Notification */}
      {status.type && (
        <div className={`fixed top-4 right-4 z-[100] max-w-[320px] sm:max-w-md animate-in slide-in-from-top-5 duration-500 shadow-2xl rounded-2xl border p-4 flex items-start space-x-4 bg-white ${
          status.type === 'success' ? 'border-teal-100' : 'border-red-100'
        }`}>
          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
            status.type === 'success' ? 'bg-teal-50 text-teal-600' : 'bg-red-50 text-red-600'
          }`}>
            {status.type === 'success' ? <Check className="h-6 w-6" /> : <AlertCircle className="h-6 w-6" />}
          </div>
          <div className="flex-1 pt-0.5">
            <p className="text-sm font-semibold text-gray-900">
              {status.type === 'success' ? 'Success' : 'Error'}
            </p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              {status.message}
            </p>
          </div>
          <button 
            onClick={() => setStatus({ type: null, message: '' })}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="fixed top-3 sm:top-8 inset-x-0 flex justify-center z-50 px-1 sm:px-4 pointer-events-none">
        <nav className="pointer-events-auto bg-white/80 backdrop-blur-2xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-full p-1 sm:p-1.5 flex items-center transition-all duration-500">
          
          <div className="flex items-center">
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
                className={`relative px-2 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-[10px] sm:text-sm font-semibold transition-all duration-500 group ${
                  activeSection === item.id 
                    ? 'text-white' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {/* Active Indicator */}
                <div 
                  className={`absolute inset-0 bg-gray-900 rounded-full transition-all duration-500 ease-out z-0 ${
                    activeSection === item.id ? 'opacity-100 scale-100 shadow-md' : 'opacity-0 scale-90'
                  }`} 
                />
                {/* Hover Background (inactive only) */}
                <div 
                  className={`absolute inset-0 bg-gray-100 rounded-full transition-all duration-300 z-0 ${
                    activeSection === item.id ? 'opacity-0' : 'opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100'
                  }`} 
                />
                
                {/* Label Text */}
                <span className="relative z-10 transition-transform duration-300 inline-block group-hover:scale-105">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden bg-white pt-16 sm:pt-20">

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10 px-5 sm:px-6 lg:px-12 py-8 sm:py-16 lg:py-20">

          {/* Left Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5 sm:space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="space-y-3">
              <span className="text-teal-600 font-semibold tracking-widest uppercase text-xs sm:text-sm">
                Software Engineer &amp; Student
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-8xl tracking-tight text-gray-900 leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                Ravindran G
              </h1>
            </div>

            <div className="w-16 h-1 bg-gray-900 rounded-full mx-auto lg:mx-0"></div>

            <p className="text-base sm:text-xl md:text-2xl text-gray-600 font-light max-w-2xl leading-relaxed italic border-l-4 border-teal-500 pl-4 text-left">
              "I'm not just learning to code — I'm learning to solve."
            </p>

            <p className="text-sm sm:text-base lg:text-lg text-gray-500 max-w-lg leading-relaxed font-normal mx-auto lg:mx-0">
              Passionate about Full Stack Development, distributed systems, and crafting scalable solutions. Exploring modern cloud infrastructure and building efficient, real-world applications.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4 sm:pt-6">
              <a href="/Resume/Resume.pdf" rel="noopener noreferrer" download>
                <div className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-medium flex items-center transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
                  <Download className="mr-2 h-5 w-5" />
                  Resume
                </div>
              </a>

              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/g-ravindran-706962319/" target="_blank" rel="noopener noreferrer">
                  <div className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-900 hover:bg-gray-50 transition-all duration-300 cursor-pointer bg-white">
                    <Linkedin className="h-5 w-5" />
                  </div>
                </a>
                <a href="https://github.com/Ravindranbit" target="_blank" rel="noopener noreferrer">
                  <div className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-900 hover:bg-gray-50 transition-all duration-300 cursor-pointer bg-white">
                    <Github className="h-5 w-5" />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Image Content */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative mt-6 lg:mt-0 animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
            <div className="relative w-[260px] h-[320px] sm:w-[300px] sm:h-[380px] md:w-[380px] md:h-[480px] shrink-0">
              <div className="absolute inset-0 bg-white rounded-[2rem] overflow-hidden shadow-2xl z-10 flex items-center justify-center border border-gray-100 group">
                <img
                  src="/profile.png"
                  alt="Ravindran G"
                  className="w-full h-full object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      e.currentTarget.style.display = 'none';
                      parent.innerHTML = `
                        <div class="flex flex-col items-center justify-center text-center p-6 space-y-3">
                          <svg class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span class="text-gray-500 text-sm font-medium">Add <b>profile.png</b> to public</span>
                        </div>
                      `;
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-14 sm:py-20 px-5 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">ABOUT ME</h2>
          <p className="text-gray-600 mb-8">In a Few Words</p>
          <div className="w-16 h-px bg-gray-400 mx-auto mb-12"></div>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto text-left sm:text-center">
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

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 relative">
            {/* Vertical divider line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 transform -translate-x-1/2"></div>

            <div className="md:pr-8">
              <h3 className="text-2xl font-light text-gray-800 mb-8">Education</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-medium text-gray-800 mb-2">B.Tech in Computer Science and Engineering</h4>
                  <p className="text-gray-600 mb-2">2023 - 2027</p>
                  <p className="text-gray-600 mb-4">
                    Amrita School of Computing, Amrita Vishwa Vidyapeetham, Coimbatore
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Pursuing B.Tech in Computer Science and Engineering at Amrita School of Computing. Exploring
                    full-stack development, cloud computing, and real-world tech applications. Actively involved in
                    hackathons and hands-on projects. College life has been a journey of continuous learning and
                    innovation.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:pl-8">
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

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
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
              {
                name: "Flutter",
                icon: (
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100">
                    <img src="/Flutter.png" alt="Flutter" className="w-12 h-12 object-contain" />
                  </div>
                ),
              },
              {
                name: "Dart",
                icon: (
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100 overflow-hidden">
                    <img src="/dart.png" alt="Dart" className="w-full h-full object-cover" />
                  </div>
                ),
              },
              {
                name: "Jira",
                icon: (
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100">
                    <img src="/jira.png" alt="Jira" className="w-full h-full object-contain p-2" />
                  </div>
                ),
              },
              {
                name: "Docker",
                icon: (
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100">
                    <img src="/docker.png" alt="Docker" className="w-12 h-12 object-contain" />
                  </div>
                ),
              },
              {
                name: "TypeScript",
                icon: (
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100">
                    <img src="/typescript.png" alt="TypeScript" className="w-12 h-12 object-contain" />
                  </div>
                ),
              },
              {
                name: "Next.js",
                icon: (
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100">
                    <img src="/nextjs.png" alt="Next.js" className="w-12 h-12 object-contain" />
                  </div>
                ),
              },
              {
                name: "PostgreSQL",
                icon: (
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100">
                    <img src="/postgresql.png" alt="PostgreSQL" className="w-12 h-12 object-contain" />
                  </div>
                ),
              },
              {
                name: "Tableau",
                icon: (
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border border-gray-100">
                    <img src="/tableau.png" alt="Tableau" className="w-12 h-12 object-contain" />
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
            {/* Nyx Project */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <a 
                href="https://nyx-admin.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center relative cursor-pointer group/project"
              >
                <img
                  src="/nyx.png"
                  alt="Nyx Project"
                  className="w-full h-auto object-contain rounded-lg relative z-10 transition-transform duration-500 group-hover/project:scale-105"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 z-0 bg-gray-200">
                  <span>Nyx Preview</span>
                </div>
              </a>
              <div>
                <a 
                  href="https://nyx-admin.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block group/title"
                >
                  <h3 className="text-2xl font-semibold text-teal-500 mb-4 group-hover/title:text-teal-600 transition-colors">
                    Nyx – Lost & Found
                  </h3>
                </a>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Developed a cross-platform mobile application using Flutter for reporting and discovering lost and found items. Built a responsive admin dashboard using React for content moderation and integrated frontend applications with Go-based backend services via RESTful APIs for real-time data interaction. Designed intuitive UI/UX workflows to enable seamless item posting, browsing, and management.
                </p>
                <div className="mb-4">
                  <p className="text-gray-800 font-medium mb-2">Features:</p>
                  <p className="text-gray-600">Admin Dashboard, RESTful APIs, Cross-platform Support, UI/UX Workflows</p>
                </div>
                <div>
                  <p className="text-gray-800 font-medium mb-2">Tech Stack:</p>
                  <p className="text-gray-600">Flutter, React, Go, PostgreSQL</p>
                </div>
              </div>
            </div>

            {/* AcademyAI Project */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <a 
                  href="https://educathon-liart.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block group/title"
                >
                  <h3 className="text-2xl font-semibold text-teal-500 mb-4 group-hover/title:text-teal-600 transition-colors">
                    AcademyAI
                  </h3>
                </a>
                <p className="text-gray-700 leading-relaxed mb-6">
                  A multilingual AI-driven academic assistant platform built to simplify complex educational content and improve student productivity. Implemented OCR-based document extraction, AI-powered summarization, automated scholarship discovery, and structured exam-preparation workflows. Designed an intelligent chatbot supporting 10+ Indian languages to enhance accessibility for diverse learners.
                </p>
                <div className="mb-4">
                  <p className="text-gray-800 font-medium mb-2">Features:</p>
                  <p className="text-gray-600">OCR Document Extraction, AI Summarization, Multilingual Chatbot (10+ languages)</p>
                </div>
                <div>
                  <p className="text-gray-800 font-medium mb-2">Tech Stack:</p>
                  <p className="text-gray-600">Next.js, MongoDB</p>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <a 
                  href="https://educathon-liart.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center relative cursor-pointer group/project"
                >
                  <img
                    src="/academyai.png"
                    alt="AcademyAI Project"
                    className="w-full h-auto object-contain rounded-lg relative z-10 transition-transform duration-500 group-hover/project:scale-105"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 z-0 bg-gray-200">
                    <span>AcademyAI Preview</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Explore Math Project */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <a 
                href="https://basic-math-learning-webiste.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center relative cursor-pointer group/project"
              >
                <img
                  src="/exploremath.png"
                  alt="Explore Math Project"
                  className="w-full h-auto object-contain rounded-lg relative z-10 transition-transform duration-500 group-hover/project:scale-105"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 z-0 bg-gray-200">
                  <span>Explore Math Preview</span>
                </div>
              </a>
              <div>
                <a 
                  href="https://basic-math-learning-webiste.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block group/title"
                >
                  <h3 className="text-2xl font-semibold text-teal-500 mb-4 group-hover/title:text-teal-600 transition-colors">
                    Explore Math
                  </h3>
                </a>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Developed a full-stack web application to help users learn fundamental mathematical concepts through interactive modules and real-time problem-solving exercises. Built dynamic and responsive user interfaces using React for an engaging learning experience. Developed backend services using Express.js and integrated MongoDB for efficient storage and retrieval of user data, enabling scalable progress tracking and content management.
                </p>
                <div className="mb-4">
                  <p className="text-gray-800 font-medium mb-2">Features:</p>
                  <p className="text-gray-600">Interactive Learning Modules, Real-time Problem Solving, User Progress Tracking, RESTful APIs, Responsive UI/UX</p>
                </div>
                <div>
                  <p className="text-gray-800 font-medium mb-2">Tech Stack:</p>
                  <p className="text-gray-600">React, Express.js, MongoDB</p>
                </div>
              </div>
            </div>

            {/* FITCLUB Project */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <a 
                  href="https://ravindranbit.github.io/Fitness/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block group/title"
                >
                  <h3 className="text-2xl font-semibold text-teal-500 mb-4 group-hover/title:text-teal-600 transition-colors">
                    FITCLUB
                  </h3>
                </a>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This project is a sleek and modern fitness website designed to provide an engaging platform for showcasing various aspects of a fitness center. It highlights training programs, trainer profiles, sessions, and detailed membership plans. The website is fully responsive, ensuring a seamless user experience across all device types from desktops to smartphones.
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
              <a 
                href="https://ravindranbit.github.io/Fitness/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-black rounded-lg overflow-hidden cursor-pointer group/project block"
              >
                <img
                  src="/Fitness.png"
                  alt="FITCLUB Project"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover/project:scale-105"
                />
              </a>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-16">
            {/* First Row */}
            <div className="text-center">
              <div className="mb-6">
                <svg
                  className="w-16 h-16 mx-auto text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                  <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                  <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
                  <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
                  <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
                  <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
                  <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
                  <path d="M6 18a4 4 0 0 1-1.967-.516" />
                  <path d="M19.967 17.484A4 4 0 0 1 18 18" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Reinforcement Learning</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Used Q-learning to enhance automated test case generation from Agile requirements, enabling adaptive and real-time optimization of testing workflows.
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
                <svg
                  className="w-16 h-16 mx-auto text-green-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
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
      <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-2xl lg:max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-normal text-gray-800 mb-6">STAY CONNECTED</h2>
            <p className="text-gray-600 text-lg mb-8">Get in touch with me !</p>
            <div className="w-24 h-0.5 bg-gray-800 mx-auto"></div>
          </div>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5">
            {/* Name Field */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                <User className="h-5 w-5 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Your Name"
                className="w-full pl-14 pr-4 py-4 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all shadow-sm"
              />
            </div>

            {/* Email Field */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Email Address"
                className="w-full pl-14 pr-4 py-4 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all shadow-sm"
              />
            </div>

            {/* Subject Field */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                <Tag className="h-5 w-5 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
              </div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                placeholder="Subject"
                className="w-full pl-14 pr-4 py-4 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all shadow-sm"
              />
            </div>

            {/* Message Field */}
            <div className="relative group">
              <div className="absolute top-5 left-0 pl-5 flex items-start pointer-events-none z-10">
                <MessageSquare className="h-5 w-5 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="Your Message..."
                rows={5}
                className="w-full pl-14 pr-4 py-5 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all shadow-sm resize-none"
              />
            </div>

            {/* Send Button */}
            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white px-10 py-4 rounded-full font-medium text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  <>
                    <Send className="mr-2.5 h-5 w-5" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
