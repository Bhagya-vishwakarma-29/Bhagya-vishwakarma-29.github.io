/* eslint-disable react/no-unescaped-entities */

import { Terminal } from "@/components/terminal"
import { RetroTV } from "@/components/retro-tv"
import { ProjectCard } from "@/components/project-card"
import { SkillBadge } from "@/components/skill-badge"
import { ContactForm } from "@/components/contact-form"
import { Github, Linkedin, Mail } from "lucide-react"

import React from "react"
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-gray-200">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-black/90 z-0"></div>

        {/* Retro TV Component */}
        <div className="container mx-auto relative z-[5] px-4 md:px-6 flex flex-col items-center">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-cyan-400">
              <span className="text-white">Dev</span>Terminal
            </h1>
            <p className="text-xl md:text-2xl text-gray-400">
              Full-Stack Developer | UI/UX Enthusiast | Problem Solver
            </p>
          </div>

          <RetroTV className="w-full max-w-3xl mx-auto mb-8">
            <Terminal />
          </RetroTV>

          <div className="mt-8 text-center max-w-2xl mx-auto">
            <p className="text-gray-400 mb-6">
              Type <span className="text-cyan-400 font-mono">help</span> in the terminal to see available commands
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-cyan-700 hover:bg-cyan-600 text-white p-2">View Projects</button>
              <button className="border border-cyan-700 text-cyan-400 p-2 hover:bg-cyan-950">
                Contact Me
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 left-72 right-0 flex justify-center animate-bounce">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-cyan-400"
          >
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-400">About Me</h2>
              <p className="text-gray-400 mb-4">
                Hello! I'm a passionate full-stack developer with a love for creating elegant, efficient solutions to
                complex problems. With a background in computer science and years of hands-on experience, I specialize
                in building modern web applications that deliver exceptional user experiences.
              </p>
              <p className="text-gray-400 mb-6">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or sharing my knowledge through technical writing and mentoring.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-cyan-400 hover:text-cyan-300">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="text-cyan-400 hover:text-cyan-300">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-cyan-400 hover:text-cyan-300">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div className="md:w-1/2 bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 text-gray-500 text-sm">terminal</div>
              </div>
              <div className="font-mono text-sm text-gray-300">
                <p className="mb-2">
                  <span className="text-cyan-400">$</span> whoami
                </p>
                <p className="mb-2 text-gray-400">Full-Stack Developer</p>
                <p className="mb-2">
                  <span className="text-cyan-400">$</span> ls skills
                </p>
                <p className="mb-2 text-gray-400">JavaScript TypeScript React Next.js Node.js</p>
                <p className="mb-2">
                  <span className="text-cyan-400">$</span> cat experience.txt
                </p>
                <p className="mb-2 text-gray-400">5+ years building web applications</p>
                <p className="mb-2">
                  <span className="text-cyan-400">$</span> echo $PASSION
                </p>
                <p className="text-gray-400">Creating intuitive and performant user experiences</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-cyan-400">Technical Skills</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-white">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                <SkillBadge name="React" />
                <SkillBadge name="Next.js" />
                <SkillBadge name="TypeScript" />
                <SkillBadge name="Tailwind CSS" />
                <SkillBadge name="Redux" />
                <SkillBadge name="Framer Motion" />
                <SkillBadge name="HTML5" />
                <SkillBadge name="CSS3" />
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-white">Backend</h3>
              <div className="flex flex-wrap gap-2">
                <SkillBadge name="Node.js" />
                <SkillBadge name="Express" />
                <SkillBadge name="PostgreSQL" />
                <SkillBadge name="MongoDB" />
                <SkillBadge name="GraphQL" />
                <SkillBadge name="REST API" />
                <SkillBadge name="Firebase" />
                <SkillBadge name="Prisma" />
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-white">Tools & Others</h3>
              <div className="flex flex-wrap gap-2">
                <SkillBadge name="Git" />
                <SkillBadge name="Docker" />
                <SkillBadge name="CI/CD" />
                <SkillBadge name="Jest" />
                <SkillBadge name="AWS" />
                <SkillBadge name="Vercel" />
                <SkillBadge name="Figma" />
                <SkillBadge name="Agile" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-cyan-400">Featured Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <ProjectCard
              title="E-Commerce Platform"
              description="A full-stack e-commerce solution with payment processing, inventory management, and admin dashboard."
              technologies={["Next.js", "TypeScript", "Stripe", "Prisma"]}
              imageUrl="/placeholder.svg?height=200&width=400"
              githubUrl="#"
              liveUrl="#"
            />

            <ProjectCard
              title="AI Content Generator"
              description="An AI-powered application that generates blog posts, social media content, and marketing copy."
              technologies={["React", "Node.js", "OpenAI API", "MongoDB"]}
              imageUrl="/placeholder.svg?height=200&width=400"
              githubUrl="#"
              liveUrl="#"
            />

            <ProjectCard
              title="Real-time Chat App"
              description="A real-time messaging platform with channels, direct messages, and file sharing capabilities."
              technologies={["React", "Socket.io", "Express", "PostgreSQL"]}
              imageUrl="/placeholder.svg?height=200&width=400"
              githubUrl="#"
              liveUrl="#"
            />

            <ProjectCard
              title="Task Management System"
              description="A collaborative task management tool with Kanban boards, time tracking, and team analytics."
              technologies={["Next.js", "TypeScript", "Supabase", "Tailwind"]}
              imageUrl="/placeholder.svg?height=200&width=400"
              githubUrl="#"
              liveUrl="#"
            />

            <ProjectCard
              title="Portfolio Website"
              description="A responsive developer portfolio showcasing projects and skills with a unique retro TV interface."
              technologies={["Next.js", "Tailwind CSS", "Framer Motion"]}
              imageUrl="/placeholder.svg?height=200&width=400"
              githubUrl="#"
              liveUrl="#"
            />

            <ProjectCard
              title="Weather Dashboard"
              description="A weather application with real-time forecasts, historical data, and interactive maps."
              technologies={["React", "Redux", "Weather API", "Chart.js"]}
              imageUrl="/placeholder.svg?height=200&width=400"
              githubUrl="#"
              liveUrl="#"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-cyan-400">Get In Touch</h2>

            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <ContactForm />
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-400 mb-4">Prefer to connect on social media?</p>
              <div className="flex justify-center gap-6">
                <a href="#" className="text-cyan-400 hover:text-cyan-300">
                  <Github className="w-8 h-8" />
                </a>
                <a href="#" className="text-cyan-400 hover:text-cyan-300">
                  <Linkedin className="w-8 h-8" />
                </a>
                <a href="#" className="text-cyan-400 hover:text-cyan-300">
                  <Mail className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">© {new Date().getFullYear()} DevTerminal. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}