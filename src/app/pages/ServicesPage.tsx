import { useState } from "react";
import { motion } from "motion/react";
import {
  Shield,
  HandHeart,
  Smartphone,
  Mountain,
  Megaphone,
  Leaf,
  Lightbulb,
  Flashlight,
  PartyPopper,
  BookOpen,
  Home,
  Users,
  GraduationCap,
  BookMarked,
  Calendar
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import islandImage from "../../assets/5542da11d53acb4e3b8064b4e656553934e96428.png";
import img1 from "../../assets/095cffbe8cfa0dc7b54b3da09fc8cee8f5649ed1.png";
import img2 from "../../assets/20cd0827634f2e575e9d3129dcfe28a05128a11c.png";
import img3 from "../../assets/371791d8d66ce3b3c8b362f06455cfabcba2a169.png";

export function ServicesPage() {
  const [workshopForm, setWorkshopForm] = useState({
    name: "",
    email: "",
    phone: "",
    mode: "",
    message: ""
  });

  const handleWorkshopSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your interest! We'll contact you soon.");
    setWorkshopForm({ name: "", email: "", phone: "", mode: "", message: "" });
  };

  const destinations = [
    {
      icon: Leaf,
      name: "The Ground",
      category: "MORNING & NIGHT RITUAL",
      description: "Your sacred daily clearing. Begin each morning with a gentle intention and close each night with a soft reflection. The Ground is where your emotional habits take root — one small ritual at a time.",
      status: "MAJOR",
      tags: ["Morning ritual", "Night ritual", "Habit seeds", "Daily intentions"],
      image: islandImage,
      themeClasses: {
         bg: "bg-[#e8fbf0]",
         category: "text-[#34d399]",
         title: "text-[#1c5f3b]",
         tag: "bg-[#d1f4e0] text-[#1c5f3b]",
         badge: "bg-[#2dd4bf]",
         icon: "text-[#34d399]"
      }
    },
    {
      icon: Flashlight,
      name: "The Lighthouse",
      category: '"I AM NOT OKAY" MOMENTS',
      description: "When the waves feel too high, the lighthouse is always lit for you. A calm, non-judgmental space for your hardest moments — with breathing tools, grounding techniques, and gentle presence.",
      status: "MAJOR",
      tags: ["Emotional regulation", "Breathing tools", "Grounding", "Immediate support"],
      image: img1,
      themeClasses: {
         bg: "bg-[#fff8e7]",
         category: "text-orange-400",
         title: "text-[#7c3a21]",
         tag: "bg-[#ffedd5] text-[#9a3412]",
         badge: "bg-[#f59e0b]",
         icon: "text-gray-400"
      }
    },
    {
      icon: PartyPopper,
      name: "The Fair",
      category: "COMMUNITY EVENTS",
      description: "Discover and join wellbeing events, workshops, and community gatherings. Connect with others on similar journeys.",
      status: "AVAILABLE",
      tags: ["Workshops", "Community", "Gatherings", "Events"],
      image: img2,
      themeClasses: {
         bg: "bg-pink-50",
         category: "text-pink-500",
         title: "text-pink-900",
         tag: "bg-pink-100 text-pink-800",
         badge: "bg-pink-500",
         icon: "text-pink-500"
      }
    },
    {
      icon: BookOpen,
      name: "The Cave",
      category: "WEEKLY REFLECTIONS",
      description: "Receive weekly reflective insights personalized to your journey. Gentle feedback that encourages growth, not grades that induce fear.",
      status: "AVAILABLE",
      tags: ["Insights", "Feedback", "Growth", "Journey"],
      image: img3,
      themeClasses: {
         bg: "bg-blue-50",
         category: "text-blue-500",
         title: "text-blue-900",
         tag: "bg-blue-100 text-blue-800",
         badge: "bg-blue-500",
         icon: "text-blue-500"
      }
    },
    {
      icon: Home,
      name: "Therapy Support House",
      category: "INTEGRATED CARE",
      description: "Designed to complement and enhance your therapy sessions. Track insights, prepare for sessions, and integrate learnings into daily life.",
      status: "AVAILABLE",
      tags: ["Therapy", "Integration", "Tracking", "Preparation"],
      image: islandImage,
      themeClasses: {
         bg: "bg-teal-50",
         category: "text-teal-500",
         title: "text-teal-900",
         tag: "bg-teal-100 text-teal-800",
         badge: "bg-teal-500",
         icon: "text-teal-500"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-emerald-50">
      {/* Hero Section */}
      <section className="py-20 text-white" style={{ backgroundColor: "#2d7a76" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-6">Our Services</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Comprehensive mental wellbeing through prevention and care
            </p>
          </motion.div>
        </div>
      </section>

      {/* Two Main Divisions */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="preventive" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="grid w-full max-w-2xl grid-cols-2 h-14">
                <TabsTrigger value="preventive" className="text-lg">
                  <Shield className="w-5 h-5 mr-2" />
                  Preventive Wellbeing
                </TabsTrigger>
                <TabsTrigger value="curative" className="text-lg">
                  <HandHeart className="w-5 h-5 mr-2" />
                  Curative Support
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Preventive Wellbeing Tab */}
            <TabsContent value="preventive">
              <div className="space-y-16">

                {/* Feature Strip */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-teal-700">Feature Strip</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  {[
                    {
                      icon: "🎮",
                      title: "Gently Gamified",
                      description: "Progress feels like an adventure, not a chore. Earn seeds, unlock spaces, and celebrate small wins on your island."
                    },
                    {
                      icon: "🇮🇳",
                      title: "Made in India",
                      description: "Built with pride in India — for the realities of Indian daily life. Grounded in lived experience, designed to work for everyone."
                    },
                    {
                      icon: "⏱️",
                      title: "Just 5–10 Minutes",
                      description: "Built for busy lives. You have 5–10 minutes to look within yourself, know your feelings and intentions — so that whatever you do, you give your all."
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-teal-50/50 p-6 rounded-xl border border-teal-100 text-center flex flex-col items-center justify-center relative"
                    >
                      <div className="text-4xl mb-4">{feature.icon}</div>
                      <h4 className="font-bold mb-2 text-teal-700">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>

                {/* ManoBandhu App */}
                <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-8 md:p-12">
                  {/* ManoBandhu App removed as requested */}

                  {/* 9 Destinations - 5 Revealed */}
                  <div>
                    <div className="flex justify-center mb-12">
                      <div className="bg-white rounded-full p-2 flex shadow-sm border border-gray-100 items-center justify-between w-full max-w-sm">
                        <button className="flex-1 px-6 py-2 rounded-full bg-teal-700 text-white font-medium text-sm transition-colors text-center">
                          Major Destinations
                        </button>
                        <button className="flex-1 px-6 py-2 rounded-full text-teal-700 font-medium text-sm hover:bg-teal-50 transition-colors text-center">
                          All 8 Destinations
                        </button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {destinations.map((destination, index) => (
                        <motion.div
                          key={destination.name}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className={`rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow flex flex-col ${destination.themeClasses.bg}`}
                        >
                          <div className="relative h-56 w-full">
                            <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
                            {/* Icon Badge */}
                            <div className="absolute top-4 left-4 bg-white p-2.5 rounded-2xl shadow-sm">
                              <destination.icon className={`w-6 h-6 ${destination.themeClasses.icon}`} />
                            </div>
                            {/* Status Badge */}
                            <div className={`absolute top-4 right-4 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${destination.themeClasses.badge}`}>
                              {destination.status}
                            </div>
                          </div>
                          
                          <div className="p-6 md:p-8 flex flex-col flex-grow">
                            <div className={`text-xs font-bold tracking-widest uppercase mb-3 ${destination.themeClasses.category}`}>
                              {destination.category}
                            </div>
                            <h4 className={`text-3xl font-serif font-bold mb-4 ${destination.themeClasses.title}`}>{destination.name}</h4>
                            <p className="text-sm text-gray-700 mb-8 leading-relaxed flex-grow">{destination.description}</p>
                            
                            <div className="flex flex-wrap gap-2 mt-auto">
                              {destination.tags.map((tag, tagIndex) => (
                                <span key={tagIndex} className={`text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap ${destination.themeClasses.tag}`}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {/* Coming Soon Cards */}
                      {[1, 2, 3, 4].map((num) => (
                        <motion.div
                          key={`coming-${num}`}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: (destinations.length + num) * 0.1 }}
                          className="bg-gray-50 rounded-3xl shadow-lg border border-gray-100 p-8 flex flex-col items-center justify-center text-center min-h-[400px]"
                        >
                          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-6">
                            <span className="text-3xl opacity-50">🔒</span>
                          </div>
                          <h4 className="font-bold text-gray-500 text-xl font-serif mb-2">Coming Soon</h4>
                          <p className="text-sm text-gray-400">More destinations to explore</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Nature Expeditions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-[2rem] shadow-sm p-8 md:p-12 border border-emerald-200/50"
                  style={{ boxShadow: '0 10px 40px -10px rgba(16, 185, 129, 0.1)' }}
                >
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-16 h-16 bg-[#0fb676] rounded-full flex items-center justify-center shrink-0">
                      <Mountain className="w-8 h-8 text-white stroke-[1.5]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#0fb676] mb-1">Nature Expeditions</h3>
                      <p className="text-gray-500 text-[15px]">Find stillness, reconnect with yourself, and discover inner wisdom in the natural world</p>
                    </div>
                  </div>
                  <p className="text-[17px] text-gray-600 leading-relaxed mb-8">
                    Disconnect from screens and reconnect with yourself through carefully curated nature
                    experiences. From forest bathing to mindful hiking, these expeditions combine physical
                    movement, natural beauty, and guided reflection for holistic wellbeing.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <span className="bg-[#ccf7e6] text-[#1db37b] px-5 py-2.5 rounded-full text-[15px] font-medium transition-colors hover:bg-[#b0f2d4] cursor-default">Forest Walks & Stillness</span>
                    <span className="bg-[#ccf7e6] text-[#1db37b] px-5 py-2.5 rounded-full text-[15px] font-medium transition-colors hover:bg-[#b0f2d4] cursor-default">Mindful Outdoor Reflection</span>
                    <span className="bg-[#ccf7e6] text-[#1db37b] px-5 py-2.5 rounded-full text-[15px] font-medium transition-colors hover:bg-[#b0f2d4] cursor-default">Sunrise & Sunset Sits</span>
                    <span className="bg-[#ccf7e6] text-[#1db37b] px-5 py-2.5 rounded-full text-[15px] font-medium transition-colors hover:bg-[#b0f2d4] cursor-default">Nature Journaling</span>
                  </div>
                </motion.div>

                {/* Psychoeducation Campaigns */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-[2rem] shadow-sm p-8 md:p-12 border border-cyan-200/50"
                  style={{ boxShadow: '0 10px 40px -10px rgba(6, 182, 212, 0.1)' }}
                >
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-16 h-16 bg-[#008efc] rounded-full flex items-center justify-center shrink-0">
                      <Megaphone className="w-8 h-8 text-white stroke-[1.5]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#008efc] mb-1">Psychoeducation Campaigns</h3>
                      <p className="text-gray-500 text-[15px]">Knowledge is the first step. We bring it to communities that need it most.</p>
                    </div>
                  </div>
                  <p className="text-[17px] text-gray-600 leading-relaxed mb-8">
                    Our campaigns bring mental health awareness directly into communities — orphanages, old age homes, and spaces for specially abled children. This is a CSR initiative, completely free of cost for underserved communities. We demystify emotional wellbeing, provide practical tools, and create safe spaces for conversations about feelings, boundaries, and self-care.
                  </p>
                  <div className="bg-[#f0f9ff] p-6 rounded-2xl flex items-center justify-center">
                    <h4 className="font-semibold text-[#0ea5e9] text-[18px]">Free of cost for underserved communities</h4>
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            {/* Curative Support Tab */}
            <TabsContent value="curative">
              <div className="space-y-16">
                {/* Intro */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center max-w-3xl mx-auto"
                >
                  <h2 className="mb-4 text-emerald-700">Structured Support When You Need It</h2>
                  <p className="text-lg text-muted-foreground">
                    Our curative services provide targeted support for specific challenges,
                    combining professional guidance with community connection.
                  </p>
                </motion.div>

                {/* Workshops */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 md:p-12">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-emerald-700">Workshops</h3>
                      <p className="text-muted-foreground">Skill-building for healing, not your resume</p>
                    </div>
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Our workshops provide practical skills for managing anxiety, building boundaries, improving communication, and navigating life transitions. Led by experienced facilitators, these sessions combine education with experiential learning — for healing, grief, trauma recovery, and emotional growth. 
                  </p>
                  
                  <div className="mb-8 flex items-center">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-emerald-100 to-teal-100 text-teal-800 border border-teal-200 shadow-sm shadow-teal-100/50">
                      <span className="w-2 h-2 rounded-full bg-teal-500 mr-2 animate-pulse"></span>
                      Currently Online only. Offline coming soon
                    </span>
                  </div>

                  {/* Interest Form */}
                  <div className="bg-white rounded-xl p-8 shadow-lg">
                    <h4 className="font-bold mb-6 text-center">Register Your Interest</h4>
                    <form onSubmit={handleWorkshopSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="workshop-name">Full Name *</Label>
                          <Input
                            id="workshop-name"
                            value={workshopForm.name}
                            onChange={(e) => setWorkshopForm({ ...workshopForm, name: e.target.value })}
                            required
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="workshop-email">Email Address *</Label>
                          <Input
                            id="workshop-email"
                            type="email"
                            value={workshopForm.email}
                            onChange={(e) => setWorkshopForm({ ...workshopForm, email: e.target.value })}
                            required
                            placeholder="you@example.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="workshop-phone">Mobile Number (Optional)</Label>
                          <Input
                            id="workshop-phone"
                            type="tel"
                            value={workshopForm.phone}
                            onChange={(e) => setWorkshopForm({ ...workshopForm, phone: e.target.value })}
                            placeholder="+91 98765 43210"
                          />
                        </div>
                        <div>
                          <Label htmlFor="workshop-mode">Preferred Mode *</Label>
                          <Select
                            value={workshopForm.mode}
                            onValueChange={(value) => setWorkshopForm({ ...workshopForm, mode: value })}
                            required
                          >
                            <SelectTrigger id="workshop-mode">
                              <SelectValue placeholder="Select mode" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="online">Online</SelectItem>
                              <SelectItem value="offline">Offline</SelectItem>
                              <SelectItem value="both">Both</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="workshop-message">Message (Optional)</Label>
                          <Textarea
                            id="workshop-message"
                            value={workshopForm.message}
                            onChange={(e) => setWorkshopForm({ ...workshopForm, message: e.target.value })}
                            placeholder="Tell us what you're looking for..."
                            rows={3}
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                        Submit Interest
                      </Button>
                    </form>
                  </div>
                </div>

                {/* Listening Circles */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-emerald-200"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-teal-700">Listening Circles</h3>
                      <p className="text-muted-foreground">You are not alone. Share, grieve, accept, and heal — together</p>
                    </div>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Listening Circles offer a safe, non-judgmental space to share experiences and be heard.
                    Facilitated by trained professionals, these circles create community, reduce isolation,
                    and remind us that we're not alone in our struggles.
                  </p>
                  
                  <div className="mb-6 flex items-center">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-emerald-100 to-teal-100 text-teal-800 border border-teal-200 shadow-sm shadow-teal-100/50">
                      <span className="w-2 h-2 rounded-full bg-teal-500 mr-2 animate-pulse"></span>
                      Currently Online only. Offline coming soon
                    </span>
                  </div>
                  <div className="bg-teal-50 p-6 rounded-lg">
                    <h4 className="font-bold text-teal-700 mb-3">What to Expect:</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600">•</span>
                        <span>Confidential, respectful environment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600">•</span>
                        <span>Structured sharing with trained facilitator</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600">•</span>
                        <span>Connection with others on similar journeys</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600">•</span>
                        <span>Monthly themes (grief, anxiety, transitions, etc.)</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Coming Soon Services */}
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-gray-200"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                        <Calendar className="w-8 h-8 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="text-gray-600">Learning Programs</h3>
                        <span className="text-sm bg-gray-200 text-gray-600 px-3 py-1 rounded-full">Coming Soon</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      Comprehensive multi-week programs covering emotional intelligence, stress management,
                      relationship skills, and more.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-gray-200"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                        <BookMarked className="w-8 h-8 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="text-gray-600">Book Reading & Reflection</h3>
                        <span className="text-sm bg-gray-200 text-gray-600 px-3 py-1 rounded-full">Coming Soon</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      Guided book clubs exploring mental health literature, followed by reflective discussions
                      and practical application.
                    </p>
                  </motion.div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
