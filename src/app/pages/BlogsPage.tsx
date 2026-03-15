import { motion } from "motion/react";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";

export function BlogsPage() {
  const navigate = useNavigate();
  // Mock blog data - in production, this would come from your backend
  const blogs = [
    {
      id: 1,
      title: "Why I Built ManoBandhu — And Why I Wish I Didn't Have To",
      excerpt: "There is a specific kind of exhaustion that has nothing to do with sleep. It is the exhaustion of holding too much for too long...",
      author: "Samruddhi",
      authorRole: "Founder",
      date: "March 5, 2026",
      category: "Founder's Note",
      readTime: "5 min read",
      image: "/founderNote.jpg"
    },
    {
      id: 2,
      title: "We Only Talk About Mental Health When Someone Is Already Drowning",
      excerpt: "We have built a mental health culture that responds to drowning. We have almost no infrastructure for teaching people to swim...",
      author: "Samruddhi",
      authorRole: "Founder",
      date: "March 3, 2026",
      category: "Mental Health",
      readTime: "5 min read",
      image: "/mentalHealth.jpg"
    },
    {
      id: 3,
      title: "The Relationship That Hurts the Most Is the One You Cannot Name",
      excerpt: "The body speaks what the mind has not yet found language for. Relationship pain is far quieter than dramatic conflict...",
      author: "Dr. Pravin Vadgave",
      authorRole: "Co-Founder",
      date: "March 1, 2026",
      category: "Relationships",
      readTime: "6 min read",
      image: "/relationship.jpg"
    },
    {
      id: 4,
      title: "When Your Body Is Saying What You Have Not Found Words For",
      excerpt: "The body communicates in physical symptoms when we do not give it another channel. Psychosomatic expression is well-documented...",
      author: "Dr. Pravin Vadgave",
      authorRole: "Co-Founder",
      date: "February 28, 2026",
      category: "Mind & Body",
      readTime: "5 min read",
      image: "/mind-and-body.jpg"
    },
    {
      id: 5,
      title: "You Are Not Who You Were Taught to Be",
      excerpt: "Different words. The same question underneath: who am I, really, when I take off all the layers I was given?...",
      author: "Kkomal Narsingani",
      authorRole: "Founding Member",
      date: "February 25, 2026",
      category: "Identity",
      readTime: "6 min read",
      image: "/mentalHealth.jpg"
    },
    {
      id: 6,
      title: "Boundaries Are Not Walls. They Are the Language of Self-Respect.",
      excerpt: "A limit is not a wall. It is a sentence. It tells the world — and yourself — where you end and someone else begins...",
      author: "Kkomal Narsingani",
      authorRole: "Founding Member",
      date: "February 22, 2026",
      category: "Relationships",
      readTime: "6 min read",
      image: "/relationship.jpg"
    }
  ];



  const authorStyles: Record<string, { gradient: string, decoration: React.ReactNode }> = {
    "Samruddhi": {
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
      <section className="pt-16 pb-6 px-4 text-center flex flex-col justify-center" style={{ backgroundColor: "#489590" }}>
        <div className="max-w-3xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-6xl md:text-7xl font-serif text-white mb-2 leading-tight tracking-tight">
              Explore the Blog
            </h1>
            <p className="text-[17px] md:text-lg text-white/85 leading-relaxed max-w-2xl font-light">
              Stories, insights, and practices to support your emotional wellness journey.
            </p>
          </motion.div>
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
                onClick={() => navigate(`/blogs/${blog.id}`)}
              >
                {/* Image */}
                <div className="h-48 relative overflow-hidden">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
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
                  <p className="text-gray-500 line-clamp-2 text-sm leading-relaxed mb-6">
                    {blog.excerpt}
                  </p>
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


    </div>
  );
}