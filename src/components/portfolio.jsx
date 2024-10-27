'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Code, FileCode, Github, Linkedin, Mail, Phone, User, ChevronDown, Menu } from 'lucide-react';

export function PortfolioComponent() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    // Validation (You can customize this)
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      // API call (replace with your API endpoint)
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setSuccessMessage('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Clear form after success
      } else {
        setErrorMessage('Error sending message.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to send the message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'publications', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const NavItems = () => (
    <>
      {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Publications', 'Contact'].map((item) => (
        <li key={item}>
          <button
            onClick={() => scrollToSection(item.toLowerCase())}
            className={`hover:text-blue-600 transition-colors ${activeSection === item.toLowerCase() ? 'text-blue-600 font-semibold' : ''}`}>
            {item}
          </button>
        </li>
      ))}
    </>
  )

  return (
    (<div
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      <header
        className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 shadow-md z-50">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-blue-600">YM</h1>
            <ul className="hidden md:flex space-x-6">
              <NavItems />
            </ul>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <ul className="mt-6 space-y-4">
                  <NavItems />
                </ul>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </header>
      <main className="pt-16">
      <section
            id="home"
            className="min-h-screen flex items-center justify-center text-white bg-gradient-to-r from-blue-400 to-teal-400 bg-[length:400%_400%] animate-gradient-motion">
            <div className="container mx-auto px-4 text-center">
              <img
                src="/profile.jpeg"
                alt="Yogitha Muthappa"
                className="rounded-full w-48 h-48 object-cover border-4 border-white mx-auto mb-8 shadow-lg transition duration-300 hover:scale-105"
              />
              <h1 className="text-5xl font-bold mb-4">Yogitha Muthappa</h1>
              <p className="text-2xl mb-8 max-w-2xl mx-auto">
                Full-Stack Developer | Specializing in React, Next.js, Node.js & AI-Powered Solutions | Building Scalable Web Solutions
              </p>
              
              <div className="flex justify-center space-x-4">
                <Button
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-blue-100 transition duration-300"
                  onClick={() => scrollToSection('contact')}>
                  <Mail className="mr-2 h-4 w-4" /> Contact Me
                </Button>
                
                <Button
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-blue-100 transition duration-300"
                  onClick={() => window.open('/YogithaResume.pdf', '_blank')}>
                  <FileCode className="mr-2 h-4 w-4" /> View Resume
                </Button>
              </div>
              
              <div className="mt-16">
                <ChevronDown className="h-8 w-8 mx-auto animate-bounce" />
              </div>
            </div>

            {/* Inline styles for gradient animation */}
            <style jsx>{`
              @keyframes gradientMotion {
                0% {
                  background-position: 0% 50%;
                }
                50% {
                  background-position: 100% 50%;
                }
                100% {
                  background-position: 0% 50%;
                }
              }

              .animate-gradient-motion {
                background: linear-gradient(270deg, #3B82F6, #2DD4BF, #3B82F6);
                background-size: 400% 400%;
                animation: gradientMotion 15s ease infinite;
              }
            `}</style>
        </section>



        <section id="about" className="min-h-screen flex items-center bg-white">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold mb-8 text-blue-600">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xl text-gray-700 leading-relaxed">
                  {/* As an experienced full-stack developer with an M.Tech in CSE (Cloud Computing), I am driven to craft captivating web solutions that push the boundaries of what's possible. My passion lies in creating innovative, user-centric applications that leverage cutting-edge technologies like AI and machine learning. */}
                  As an experienced Full-Stack Developer with an M.Tech in CSE (Cloud Computing), I am passionate about crafting innovative web solutions that drive user engagement and push technological boundaries. My expertise lies in creating user-centric applications by integrating cutting-edge technologies, including AI and machine learning, to deliver exceptional digital experiences.
                </p>
                <p className="text-xl text-gray-700 leading-relaxed mt-4">
                  {/* I thrive in dynamic environments where I can continuously learn and apply new skills. My expertise spans from front-end development with React and Next.js to back-end solutions with Node.js and Express, always with a focus on scalability and performance. */}
                  I thrive in dynamic, fast-paced environments where continuous learning and application of new skills are key. My technical proficiency spans both front-end and back-end development—leveraging React and Next.js for building intuitive interfaces, and Node.js and Express for developing robust, scalable backend systems. Performance optimization and scalability are always at the core of my work.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-blue-600">2+</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Years of Experience</p>
                  </CardContent>
                </Card>
                <Card className="bg-teal-50">
                  <CardHeader>
                    <CardTitle className="text-teal-600">10+</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Projects Completed</p>
                  </CardContent>
                </Card>
                {/* <Card className="bg-purple-50">
                  <CardHeader>
                    <CardTitle className="text-purple-600">5+</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>AI Integrations</p>
                  </CardContent>
                </Card> */}
                <Card className="bg-yellow-50">
                  <CardHeader>
                    <CardTitle className="text-yellow-600">Key Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Winner of Hackathon at Signify</p>
                  </CardContent>
                </Card>
                <Card className="bg-pink-50">
                  <CardHeader>
                    <CardTitle className="text-pink-600">1</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>ACM Publication</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="min-h-screen flex items-center bg-gray-50">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold mb-12 text-blue-600 text-center">Skills & Expertise</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[
                { name: 'React', icon: <Code className="h-8 w-8" />, color: 'bg-blue-100 text-blue-600' },
                { name: 'Next.js', icon: <Code className="h-8 w-8" />, color: 'bg-gray-900 text-white' },
                { name: 'Node.js', icon: <Code className="h-8 w-8" />, color: 'bg-fuchsia-100 text-fuchsia-600' },
                { name: 'Express.js', icon: <Code className="h-8 w-8" />, color: 'bg-lime-100 text-lime-600' },
                { name: 'MongoDB', icon: <Code className="h-8 w-8" />, color: 'bg-green-200 text-green-800' },
                { name: 'Git', icon: <Code className="h-8 w-8" />, color: 'bg-red-200 text-red-700' },
                { name: 'Python', icon: <Code className="h-8 w-8" />, color: 'bg-yellow-100 text-yellow-700' },
                { name: 'TypeScript', icon: <Code className="h-8 w-8" />, color: 'bg-pink-100 text-pink-700' },
                { name: 'MVC', icon: <Code className="h-8 w-8" />, color: 'bg-purple-200 text-purple-700' },
                { name: 'RESTful APIs', icon: <Code className="h-8 w-8" />, color: 'bg-indigo-200 text-indigo-700' },
                { name: 'Agile', icon: <Code className="h-8 w-8" />, color: 'bg-teal-200 text-teal-700' },
                { name: 'CI/CD', icon: <Code className="h-8 w-8" />, color: 'bg-orange-200 text-orange-700' },
              ].map((skill) => (
                <Card
                  key={skill.name}
                  className={`flex flex-col items-center justify-center p-6 hover:shadow-lg transition-all ${skill.color}`}>
                  {skill.icon}
                  <h3 className="mt-4 font-semibold">{skill.name}</h3>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="min-h-screen flex items-center bg-white">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold mb-12 text-blue-600 text-center">Work Experience</h2>
            <div className="space-y-12">
              {[
                {
                  title: 'Senior Full Stack Developer AI',
                  company: '4Good.AI',
                  period: 'Jul 2024 - Present',
                  description: 'Developed end-to-end web applications, integrating AI models and optimizing RESTful APIs and microservices for better performance.',
                  color: 'border-l-blue-600'
                },
                {
                  title: 'Full Stack Web Developer',
                  company: 'PESU Venture Labs',
                  period: 'Dec 2023 - Jun 2024',
                  description: 'Contributed to E-Commerce Marketplace and SaaS web application development, implementing MVC pattern and optimizing code performance.',
                  color: 'border-l-pink-600'
                },
                {
                  title: 'Development Engineer Intern',
                  company: 'Signify Innovation Labs',
                  period: 'Oct 2022 - Jun 2023',
                  description: 'Applied Agile methodologies, enhanced application features, and achieved high customer satisfaction through prompt issue resolution.',
                  color: 'border-l-purple-600'
                },
                {
                  title: 'Associate Software Engineer',
                  company: 'Techvaria Solutions Pvt. Ltd.',
                  period: 'Apr 2021 - Oct 2021',
                  description: 'Developed commercial software using Deluge and Zoho Creator, optimizing functionality and ensuring smooth deployment across the full development lifecycle.',
                  color: 'border-l-fuchsia-600'
                },
              ].map((job, index) => (
                <Card key={index} className={`border-l-4 ${job.color}`}>
                  <CardHeader>
                    <CardTitle className="text-2xl">{job.title}</CardTitle>
                    <CardDescription className="text-lg">{job.company} | {job.period}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{job.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="min-h-screen flex items-center bg-gray-50">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold mb-12 text-blue-600 text-center">Featured Projects</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="overflow-hidden">
                <img
                  src="/FEDL.jpeg"
                  alt="Federated Learning"
                  className="w-full h-48 object-cover" />
                <CardHeader>
                  <CardTitle className="text-2xl">Using Federated Learning in anomaly detection and Analytics on real-time streaming Data of Healthcare</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">The main aim of this project work is to solve the problem of clinical detoriration that is caused due to medical errors. In this project we have used the Flower Framework to simulate the process of Federated Learning. This project is developed using Python.</p>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'SQL', 'Federated Learning', 'ML'].map(tech => (
                      <span
                        key={tech}
                        className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">{tech}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <img
                  src="/pf.jpeg"
                  alt="Portfolio"
                  className="w-full h-48 object-cover" />
                <CardHeader>
                  <CardTitle className="text-2xl">A Portfolio Website using React and Tailwind CSS.</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">This project is developed using React frontend library and Tailwind CSS. The main objective of this project is to learn the fundamental concepts of React and Frontend Development.</p>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'HTML', 'Tailwind'].map(tech => (
                      <span
                        key={tech}
                        className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">{tech}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="publications" className="min-h-screen flex items-center bg-white">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold mb-12 text-blue-600 text-center">Publications</h2>
            <div className='grid md:grid-cols-2 gap-12'>
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl break-words">Using Federated Learning in Anomaly Detection and Analysis in Real Time Streaming Data of Healthcare</CardTitle>
                <CardDescription className="text-sm sm:text-base">ACM Publication (AUG- 11- 2023)</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 text-sm sm:text-base">Developed a machine learning model for predicting underlying conditions in Cardiac ICU patients using Federated Learning and the Flower Framework.</p>
                <Button variant="outline" className="w-full sm:w-auto" onClick={() => window.location.href = 'https://dl.acm.org/doi/10.1145/3606283.3606288'}>Read Publication</Button>
              </CardContent>
            </Card>
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl break-words">Making Sense of Federated Learning: Concepts, Benefits, and Challenges</CardTitle>
                <CardDescription className="text-sm sm:text-base">Medium (OCT- 15- 2023)</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 text-sm sm:text-base">In this article, we discuss Federated Learning, its benefits, and challenges.</p>
                <Button variant="outline" className="w-full sm:w-auto" onClick={() => window.location.href = 'https://medium.com/@myogitha0704/making-sense-of-federated-learning-concepts-benefits-and-challenges-af46b054cf7f'}>Read Blog</Button>
              </CardContent>
            </Card>

            </div>
          </div>
        </section>

        <section id="contact" className="min-h-screen flex items-center bg-gray-50">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold mb-12 text-blue-600  text-center">Get in Touch</h2>
            <div className="grid md:grid-cols-1 gap-12">
              
              {/* <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send a Message</CardTitle>
                </CardHeader>


            <CardContent>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Message"
                      rows={4}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                    {successMessage && <p className="text-green-600">{successMessage}</p>}
                    {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                  </form>
                </CardContent>
              </Card> */}


              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* <p className="flex items-center text-gray-700"><Phone className="mr-2 text-blue-600" /> 9113263682</p> */}
                  <p className="flex items-center text-gray-700"><Mail className="mr-2 text-blue-600" /> yogithamuthappa@gmail.com</p>
                  <p className="flex items-center text-gray-700"><User className="mr-2 text-blue-600" /> Bangalore</p>
                  <div className="flex space-x-4 mt-6">
                    <Button variant="outline" className="flex-1" onClick={() => window.location.href = 'https://www.linkedin.com/in/yogitha-m/'}><Linkedin className="mr-2" /> LinkedIn</Button>
                    <Button variant="outline" className="flex-1" onClick={() => window.location.href = 'https://github.com/yogitha07'}><Github className="mr-2" /> GitHub</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Yogitha Muthappa. All rights reserved.</p>
        </div>
      </footer>
    </div>)
  );
}