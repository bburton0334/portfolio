"use client"

import { useEffect, useState } from "react"
import { Roboto_Mono } from "next/font/google"
import { Github, Linkedin, Mail, Terminal, Newspaper, Youtube } from "lucide-react"
import Parser from "rss-parser"

const robotoMono = Roboto_Mono({ subsets: ["latin"] })

export default function Home() {
  const [text, setText] = useState("")
  const [articles, setArticles] = useState([]) // Added missing useState

  const fullText = `
    Hello, I'm Briana Burton.
    A Software Engineer based in Canada.
    I specialize in process automation, API & EDI integrations, with a focus on the transportation and logistics space.
  `.trim()

  useEffect(() => {
    let currentText = ""
    let currentIndex = 0

    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        currentText += fullText[currentIndex]
        setText(currentText)
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const fetchRSS = async () => {
      const parser = new Parser()
      try {
        const response = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent("https://medium.com/feed/@brianareburton")}`,
        )
        const data = await response.json()
        const feed = await parser.parseString(data.contents)
        setArticles(feed.items.slice(0, 5)) // Limit to 5 articles
      } catch (error) {
        console.error("Failed to fetch RSS feed", error)
      }
    }

    fetchRSS()
  }, [])

  return (
    <div className={`min-h-screen bg-black text-[#0dfc8f] ${robotoMono.className}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="border-2 border-[#0dfc8f] p-4 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="w-5 h-5" />
            <span className="text-sm">terminal@brianab:~$</span>
          </div>
          <div className="text-lg md:text-xl whitespace-pre-line">
            {text}
            <span className="inline-block w-2 h-5 bg-[#0dfc8f] animate-pulse ml-1">_</span>
          </div>
        </header>

        <main className="grid gap-8">
          <section className="border-2 border-[#0dfc8f] p-4">
            <h2 className="text-xl font-bold mb-4 border-b-2 border-[#0dfc8f] pb-2">Tools & Technologies I Enjoy</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "API (REST & SOAP)",
                "VB.NET",
                "SQL",
                "IBM Db2",
                "C#",
                "Python",
                "UiPath",
                "Power Automate",
                "EDI",
                "IBM i Series (AS/400)",
              ].map((skill) => (
                <div
                  key={skill}
                  className="border border-[#0dfc8f] p-2 text-center hover:bg-[#0dfc8f] hover:text-black transition-colors"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>

          <section className="border-2 border-[#0dfc8f] p-4">
            <h2 className="text-xl font-bold mb-4 border-b-2 border-[#0dfc8f] pb-2">Latest Posts</h2>
            <div className="grid gap-4">
              {articles.length > 0 ? (
                articles.map((article, index) => (
                  <div
                    key={index}
                    className="border border-[#0dfc8f] p-4 hover:bg-[#0dfc8f] hover:text-black transition-colors"
                  >
                    <h3 className="font-bold mb-2">
                      <a href={article.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {article.title}
                      </a>
                    </h3>
                    <p>{new Date(article.pubDate).toLocaleDateString()}</p>
                  </div>
                ))
              ) : (
                <p>Loading articles...</p>
              )}
            </div>
          </section>

          <section className="border-2 border-[#0dfc8f] p-4">
            <h2 className="text-xl font-bold mb-4 border-b-2 border-[#0dfc8f] pb-2">Contact</h2>
            <div className="flex gap-6">
              <a
                href="https://github.com/bburton0334"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com/in/briana-burton"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://medium.com/@brianareburton"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Newspaper size={24} />
              </a>
              <a
                href="https://www.youtube.com/@Sayintt"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Youtube size={24} />
              </a>
              <a href="mailto:contact@briana.cc" className="hover:text-white transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </section>
        </main>

        <footer className="mt-8 text-center text-sm">
          <p>
            © {new Date().getFullYear()} Briana Burton | <a href="https://evilr.ing">EVILRING</a> |{" "}
            <span className="animate-pulse">█</span>
          </p>
        </footer>
      </div>
    </div>
  )
}

