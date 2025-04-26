"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

type CommandHistory = {
  command: string
  output: string | JSX.Element
}

export function Terminal() {
  const [input, setInput] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const [history, setHistory] = useState<CommandHistory[]>([{command: "ls", output: "projects/  experience/  Skills/  contact/  about.txt"}]) ; 
  const [currentPath, setCurrentPath] = useState("~")
  const [introComplete, setIntroComplete] = useState(false)
  const [introText, setIntroText] = useState("")

  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const fullIntroText = `Welcome to DevTerminal v1.0.0
© 2025 Portfolio OS
Type 'help' to see available commands.

Loading portfolio data...
Ready.

`

  // File system structure
  const fileSystem = {
    "~": {
      type: "directory",
      children: ["projects", "experience", "skills", "contact", "about.txt"],
    },
    "~/projects": {
      type: "directory",
      children: [
        "ecommerce.txt",
        "ai-generator.txt",
        "chat-app.txt",
        "task-manager.txt",
        "portfolio.txt",
        "weather-app.txt",
      ],
    },
    "~/experience": {
      type: "directory",
      children: ["senior-dev.txt", "lead-dev.txt", "frontend-dev.txt", "freelance.txt"],
    },
    "~/skills": {
      type: "directory",
      children: ["frontend.txt", "backend.txt", "tools.txt"],
    },
    "~/contact": {
      type: "directory",
      children: ["email.txt", "social.txt", "form.txt"],
    },
    "~/about.txt": {
      type: "file",
      content:
        "Hello! I'm a passionate full-stack developer with a love for creating elegant, efficient solutions to complex problems. With a background in computer science and years of hands-on experience, I specialize in building modern web applications that deliver exceptional user experiences.\n\nWhen I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through technical writing and mentoring.",
    },
    "~/projects/ecommerce.txt": {
      type: "file",
      content:
        "E-Commerce Platform\n\nA full-stack e-commerce solution with payment processing, inventory management, and admin dashboard.\n\nTechnologies: Next.js, TypeScript, Stripe, Prisma\n\nGitHub: https://github.com/username/ecommerce\nLive Demo: https://ecommerce-demo.vercel.app",
    },
    "~/projects/ai-generator.txt": {
      type: "file",
      content:
        "AI Content Generator\n\nAn AI-powered application that generates blog posts, social media content, and marketing copy.\n\nTechnologies: React, Node.js, OpenAI API, MongoDB\n\nGitHub: https://github.com/username/ai-generator\nLive Demo: https://ai-generator-demo.vercel.app",
    },
    "~/projects/chat-app.txt": {
      type: "file",
      content:
        "Real-time Chat App\n\nA real-time messaging platform with channels, direct messages, and file sharing capabilities.\n\nTechnologies: React, Socket.io, Express, PostgreSQL\n\nGitHub: https://github.com/username/chat-app\nLive Demo: https://chat-app-demo.vercel.app",
    },
    "~/projects/task-manager.txt": {
      type: "file",
      content:
        "Task Management System\n\nA collaborative task management tool with Kanban boards, time tracking, and team analytics.\n\nTechnologies: Next.js, TypeScript, Supabase, Tailwind\n\nGitHub: https://github.com/username/task-manager\nLive Demo: https://task-manager-demo.vercel.app",
    },
    "~/projects/portfolio.txt": {
      type: "file",
      content:
        "Portfolio Website\n\nA responsive developer portfolio showcasing projects and skills with a unique retro TV interface.\n\nTechnologies: Next.js, Tailwind CSS, Framer Motion\n\nGitHub: https://github.com/username/portfolio\nLive Demo: https://portfolio-demo.vercel.app",
    },
    "~/projects/weather-app.txt": {
      type: "file",
      content:
        "Weather Dashboard\n\nA weather application with real-time forecasts, historical data, and interactive maps.\n\nTechnologies: React, Redux, Weather API, Chart.js\n\nGitHub: https://github.com/username/weather-app\nLive Demo: https://weather-app-demo.vercel.app",
    },
    "~/experience/senior-dev.txt": {
      type: "file",
      content:
        "Senior Developer @ Tech Innovations Inc.\n2023 - Present\n\n• Led development of enterprise-level applications using Next.js and TypeScript\n• Managed a team of 5 developers, implementing Agile methodologies\n• Reduced application load time by 40% through performance optimizations\n• Implemented CI/CD pipelines that decreased deployment time by 60%",
    },
    "~/experience/lead-dev.txt": {
      type: "file",
      content:
        "Lead Developer @ Digital Solutions Co.\n2021 - 2023\n\n• Architected and developed scalable web applications using React and Node.js\n• Mentored junior developers and conducted code reviews\n• Collaborated with UX/UI designers to implement responsive designs\n• Integrated third-party APIs and services to enhance application functionality",
    },
    "~/experience/frontend-dev.txt": {
      type: "file",
      content:
        "Frontend Developer @ WebCraft Studios\n2019 - 2021\n\n• Developed responsive web interfaces using React, HTML5, and CSS3\n• Implemented state management solutions using Redux and Context API\n• Collaborated with backend developers to integrate RESTful APIs\n• Optimized applications for maximum speed and scalability",
    },
    "~/experience/freelance.txt": {
      type: "file",
      content:
        "Freelance Web Developer\n2017 - 2019\n\n• Designed and developed custom websites for small businesses and startups\n• Created e-commerce solutions using various platforms and technologies\n• Provided ongoing maintenance and support for client websites\n• Implemented SEO best practices to improve client visibility",
    },
    "~/skills/frontend.txt": {
      type: "file",
      content:
        "Frontend Skills:\n\n• React & React Native\n• Next.js\n• TypeScript\n• JavaScript (ES6+)\n• HTML5 & CSS3\n• Tailwind CSS\n• Redux\n• GraphQL (Apollo)\n• Framer Motion\n• Responsive Design\n• Web Accessibility\n• Performance Optimization",
    },
    "~/skills/backend.txt": {
      type: "file",
      content:
        "Backend Skills:\n\n• Node.js\n• Express\n• NestJS\n• PostgreSQL\n• MongoDB\n• Firebase\n• RESTful API Design\n• GraphQL\n• Authentication & Authorization\n• Serverless Functions\n• Microservices Architecture\n• WebSockets",
    },
    "~/skills/tools.txt": {
      type: "file",
      content:
        "Tools & Other Skills:\n\n• Git & GitHub\n• Docker\n• CI/CD (GitHub Actions, Jenkins)\n• AWS (S3, EC2, Lambda)\n• Vercel & Netlify\n• Jest & Testing Library\n• Cypress\n• Figma & Adobe XD\n• Agile Methodologies\n• Technical Writing\n• Problem Solving\n• Team Leadership",
    },
    "~/contact/email.txt": {
      type: "file",
      content:
        "Email Contact:\n\nFor professional inquiries: hello@devterminal.com\nFor support requests: support@devterminal.com",
    },
    "~/contact/social.txt": {
      type: "file",
      content:
        "Social Media:\n\nGitHub: https://github.com/devterminal\nLinkedIn: https://linkedin.com/in/devterminal\nTwitter: https://twitter.com/devterminal\nDev.to: https://dev.to/devterminal",
    },
    "~/contact/form.txt": {
      type: "file",
      content:
        "Contact Form:\n\nPlease use the contact form at the bottom of this page to send me a message directly.\nI typically respond within 24-48 hours.",
    },
  }

  // Available commands
  const commands = {
    help: () => {
      return `Available commands:
  ls                  List directory contents
  cd [directory]      Change directory
  cat [file]          Display file contents
  pwd                 Print working directory
  clear               Clear the terminal
  about               Display information about me
  projects            List all projects
  skills              List all skills
  experience          List work experience
  contact             Show contact information
  open [project]      Open project in new tab
  help                Display this help message
`
    },
    ls: (args: string[]) => {
      let path = currentPath
      if (args.length > 0) {
        path = resolvePath(args[0])
      }

      const location = fileSystem[path as keyof typeof fileSystem]
      if (!location || location.type !== "directory") {
        return `ls: cannot access '${path}': No such directory`
      }

      const children = location.children
      const formattedOutput = children
        .map((child) => {
          const childPath = `${path}/${child}`
          const childNode = fileSystem[childPath as keyof typeof fileSystem]
          if (childNode && childNode.type === "directory") {
            return `<span class="text-cyan-400 font-bold">${child}/</span>`
          } else {
            return `<span class="text-gray-300">${child}</span>`
          }
        })
        .join("    ")

      return <div dangerouslySetInnerHTML={{ __html: formattedOutput }} />
    },
    cd: (args: string[]) => {
      if (args.length === 0 || args[0] === "~" || args[0] === "/") {
        setCurrentPath("~")
        return ""
      }

      const newPath = resolvePath(args[0])
      const location = fileSystem[newPath as keyof typeof fileSystem]

      if (!location) {
        return `cd: no such file or directory: ${args[0]}`
      }

      if (location.type !== "directory") {
        return `cd: not a directory: ${args[0]}`
      }

      setCurrentPath(newPath)
      return ""
    },
    cat: (args: string[]) => {
      if (args.length === 0) {
        return "cat: missing file operand"
      }

      const path = resolvePath(args[0])
      const file = fileSystem[path as keyof typeof fileSystem]

      if (!file) {
        return `cat: ${args[0]}: No such file or directory`
      }

      if (file.type !== "file") {
        return `cat: ${args[0]}: Is a directory`
      }

      return file.content
    },
    pwd: () => {
      return currentPath
    },
    clear: () => {
      setHistory([])
      return ""
    },
    about: () => {
      return fileSystem["~/about.txt"].content
    },
    projects: () => {
      setCurrentPath("~/projects")
      return commands.ls([])
    },
    skills: () => {
      setCurrentPath("~/skills")
      return commands.ls([])
    },
    experience: () => {
      setCurrentPath("~/experience")
      return commands.ls([])
    },
    contact: () => {
      setCurrentPath("~/contact")
      return commands.ls([])
    },
    open: (args: string[]) => {
      if (args.length === 0) {
        return "open: missing project name"
      }

      const projectName = args[0].toLowerCase()
      let projectUrl = ""

      // Extract URLs from project files
      Object.keys(fileSystem).forEach((key) => {
        if (key.startsWith("~/projects/") && key.toLowerCase().includes(projectName)) {
          const content = (fileSystem[key as keyof typeof fileSystem] as any).content
          const match = content.match(/Live Demo: (https:\/\/[^\s]+)/)
          if (match && match[1]) {
            projectUrl = match[1]
          }
        }
      })

      if (!projectUrl) {
        return `open: project '${args[0]}' not found or has no demo URL`
      }

      // Open in new tab
      window.open(projectUrl, "_blank")
      return `Opening ${args[0]} in new tab...`
    },
  }

  // Helper function to resolve relative paths
  const resolvePath = (path: string): string => {
    if (path.startsWith("/")) {
      return "~" + path
    }

    if (path.startsWith("~/")) {
      return path
    }

    if (path === "..") {
      const parts = currentPath.split("/")
      if (parts.length > 1) {
        parts.pop()
        return parts.join("/")
      }
      return "~"
    }

    if (currentPath === "~") {
      return `~/${path}`
    }

    return `${currentPath}/${path}`
  }

  // Process command input
  const processCommand = (cmd: string) => {
    const parts = cmd.trim().split(" ")
    const command = parts[0].toLowerCase()
    const args = parts.slice(1)

    if (command === "") {
      return ""
    }

    if (command in commands) {
      return (commands as any)[command](args)
    }

    return `command not found: ${command}`
  }
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const newCommand = {
      command: input,
      output: processCommand(input),
    }

    setHistory([...history, newCommand])
    setInput("")

    // Scroll to bottom
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
    }, 10)
  }

  // Focus input when clicking anywhere in the terminal
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Intro text typing effect
  useEffect(() => {
    if (introComplete) return

    let index = 0
    const typingInterval = setInterval(() => {
      if (index < fullIntroText.length) {
        setIntroText((prev) => prev + fullIntroText.charAt(index))
        index++
      } else {
        clearInterval(typingInterval)
        setIntroComplete(true)
      }
    }, 30)

    return () => clearInterval(typingInterval)
  }, [introComplete, fullIntroText])

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  // Auto-focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [introComplete])

  return (
    <div
      className="font-mono text-sm md:text-base text-cyan-400 h-full overflow-hidden flex flex-col "
      onClick={focusInput}
    >
      <div className="mb-2 flex items-center">
        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
        <span className="text-gray-500 text-xs">terminal@portfolio ~ </span>
      </div>

      <div ref={terminalRef} className="flex-1 overflow-y-auto overflow-x-hidden pb-2 [&::-webkit-scrollbar]:hidden">
        {/* Intro text */}
        <div className="whitespace-pre-line mb-2">{introText}</div>

        {/* Command history */}
        {history.map((item, index) => (
          <div key={index} className="mb-2">
            <div className="flex">
              <span className="text-green-400 mr-2">user@portfolio</span>
              <span className="text-cyan-400 mr-2">{currentPath}</span>
              <span className="text-gray-400">$</span>
              <span className="ml-2">{item.command}</span>
            </div>
            <div className="whitespace-pre-line ml-2">
              {typeof item.output === "string" ? item.output : item.output}
            </div>
          </div>
        ))}

        {/* Current input line */}
        {introComplete && (
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-green-400 mr-2">user@portfolio</span>
            <span className="text-cyan-400 mr-2">{currentPath}</span>
            <span className="text-gray-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowUp' && history.length > 0) {
                  setInput(history[history.length - 1].command)
                }
              }}
              className="ml-2 bg-transparent border-none outline-none text-cyan-400 flex-1 min-w-0"
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
            <span className={`w-2 h-4 bg-cyan-400 ml-1 ${cursorVisible ? "opacity-100" : "opacity-0"}`}></span>
          </form>
        )}
      </div>
    </div>
  )}
