import { motion } from "motion/react";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "../components/ui/button";

export function BlogsPage() {
  // Mock blog data - in production, this would come from your backend
  const blogs = [
    {
      id: 1,
      title: "Why I Built ManoBandhu — And Why I Wish I Didn't Have To",
      excerpt: "There is a specific kind of exhaustion that has nothing to do with sleep. It is the exhaustion of holding too much for too long without language for it...",
      author: "Samruddhi Vadgave",
      authorRole: "Co-Founder",
      date: "March 5, 2026",
      category: "Founder's Note",
      readTime: "5 min read",
      image: "📝"
    },
    {
      id: 2,
      title: "We Only Talk About Mental Health When Someone Is Already Drowning",
      excerpt: "We have built a mental health culture that responds to crisis. Over 80% of people who need support never receive it — and 'managing' has become our baseline...",
      author: "Samruddhi Vadgave",
      authorRole: "Co-Founder",
      date: "March 3, 2026",
      category: "Mental Health",
      readTime: "7 min read",
      image: "🏥"
    },
    {
      id: 3,
      title: "The Relationship That Hurts the Most Is the One You Cannot Name",
      excerpt: "Patients rarely walk in and say they are struggling in a relationship. They come in with headaches that return every Sunday evening, a chest tightness no investigation can explain...",
      author: "Dr. Pravin Vadgave",
      authorRole: "Co-Founder",
      date: "March 1, 2026",
      category: "Relationships",
      readTime: "6 min read",
      image: "🧠"
    },
    {
      id: 4,
      title: "When Your Body Is Saying What You Have Not Found Words For",
      excerpt: "The body speaks what the mind has not yet found language for. More often than not, what the body is speaking is: something is hurting me and I do not know how to say it...",
      author: "Dr. Pravin Vadgave",
      authorRole: "Co-Founder",
      date: "February 28, 2026",
      category: "Mind & Body",
      readTime: "8 min read",
      image: "🎮"
    },
    {
      id: 5,
      title: "You Are Not Who You Were Taught to Be",
      excerpt: "We learn which version of ourselves receives love — and we learn to show that version again and again, until we stop knowing we are doing it at all...",
      author: "Kkomal Narsingani",
      authorRole: "Advisor & Wellbeing Consultant",
      date: "February 25, 2026",
      category: "Identity",
      readTime: "5 min read",
      tags: "Identity  ·  Inner Work  ·  Speaking with Yourself — without guilt, shame, or fear",
      image: "🌲"
    },
    {
      id: 6,
      title: "Boundaries Are Not Walls. They Are the Language of Self-Respect.",
      excerpt: "A boundary is not a wall. It is a sentence. It is the sentence that tells the world — and yourself — where you end and someone else begins...",
      author: "Kkomal Narsingani",
      authorRole: "Advisor & Wellbeing Consultant",
      date: "February 22, 2026",
      category: "Relationships",
      readTime: "6 min read",
      tags: "Relationships  ·  Self-Respect  ·  The Art of Knowing Yourself — with curiosity, patience, enthusiasm",
      image: "💪"
    }
  ];

  const categories = ["All", "Founder's Note", "Mental Health", "Relationships", "Mind & Body", "Identity"];

  const authorStyles: Record<string, { gradient: string, decoration: React.ReactNode }> = {
    "Samruddhi Vadgave": {
      gradient: "from-[#1A7A6E] to-[#4A7C59]",
      decoration: (
        <>
          <span className="text-8xl text-white/30 absolute leading-none">✦</span>
          <span className="text-4xl text-white/40 absolute top-6 left-12 leading-none">✦</span>
          <span className="text-2xl text-white/50 absolute bottom-8 right-16 leading-none">✨</span>
        </>
      )
    },
    "Dr. Pravin Vadgave": {
      gradient: "from-[#1A2B4A] to-[#C47B2B]",
      decoration: (
        <>
          <span className="text-8xl text-white/30 absolute -rotate-12 leading-none">🌿</span>
          <span className="text-5xl text-white/20 absolute top-8 right-12 rotate-45 leading-none">🍃</span>
        </>
      )
    },
    "Kkomal Narsingani": {
      gradient: "from-[#9B6EBF] to-[#C4748A]",
      decoration: (
        <>
          <span className="text-[120px] text-white/30 absolute leading-none">◯</span>
          <span className="text-[180px] text-white/10 absolute leading-none">◯</span>
        </>
      )
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F9F8]">
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 bg-[#F0F9F8] text-center min-h-[50vh] flex flex-col justify-center">
        <div className="max-w-3xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="border border-teal-200/60 bg-white/80 text-teal-700 px-5 py-1.5 rounded-full text-xs font-semibold mb-10 tracking-widest uppercase shadow-sm">
              Insights & Stories
            </div>
            <h1 className="text-6xl md:text-7xl font-serif text-[#0b3b36] mb-8 leading-tight tracking-tight">
              Explore the Blog
            </h1>
            <p className="text-[17px] md:text-lg text-gray-500/90 leading-relaxed max-w-2xl font-light">
              Stories, insights, and practices to support your emotional wellness journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full transition-all ${
                  category === "All"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto pb-8 -mx-4 px-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 md:overflow-visible md:pb-0 md:mx-0 md:px-0 scrollbar-hide">
            {blogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 group min-w-[85%] sm:min-w-[320px] md:min-w-0 snap-center cursor-pointer"
              >
                {/* Image/Icon */}
                <div className={`bg-gradient-to-br ${authorStyles[blog.author]?.gradient || "from-gray-200 to-gray-300"} h-48 flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:opacity-95`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="absolute inset-0 flex items-center justify-center w-full h-full pointer-events-none"
                  >
                    {authorStyles[blog.author]?.decoration || (
                      <span className="text-6xl text-white/40">✦</span>
                    )}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Category Badge */}
                  <span className="inline-block bg-teal-50 border border-teal-100 text-teal-700 text-xs px-3 py-1 rounded-full mb-4 w-fit font-medium">
                    {blog.category}
                  </span>

                  {/* Title */}
                  <h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-teal-700 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className={`text-gray-500 line-clamp-2 text-sm leading-relaxed ${blog.tags ? 'mb-3' : 'mb-6'}`}>
                    {blog.excerpt}
                  </p>

                  {/* Tags */}
                  {blog.tags && (
                    <p className="text-teal-600/80 text-[11px] font-medium mb-6 leading-relaxed line-clamp-2 uppercase tracking-wide">
                      {blog.tags}
                    </p>
                  )}

                  {/* Divider */}
                  <div className="mt-auto"></div>

                  {/* Footer: Date + Author + Link */}
                  <div className="pt-5 flex items-center justify-between border-t border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-[11px] text-gray-400 font-medium mb-1 tracking-wider uppercase">{blog.date}</span>
                      <span className="text-sm font-semibold text-gray-800">{blog.author}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                      <ArrowRight className="w-5 h-5 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-24 bg-gradient-to-r from-[#0d9475] to-[#05a481] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">More stories and insights coming soon!</h2>
            <p className="text-xl md:text-2xl text-white/95 mb-14 font-light max-w-2xl mx-auto">
              Subscribe to our newsletter to stay updated.
            </p>
            <form className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="flex-1 w-full bg-transparent text-white placeholder:text-[#06644f] focus:outline-none border-none text-lg text-center sm:text-right px-4"
              />
              <Button type="submit" size="lg" className="bg-white text-[#0d9475] hover:bg-white/90 rounded-xl px-8 h-12 font-medium shadow-sm shrink-0">
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}