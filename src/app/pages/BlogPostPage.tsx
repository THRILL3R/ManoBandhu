import { motion } from "motion/react";
import { ArrowLeft, Clock, User, Tag } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../components/ui/button";
import { blogs } from "../data/blogData";

export function BlogPostPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const blogId = Number(id);
  const blogContent = blogs[blogId];

  if (!blogContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-center">
          <h2 className="text-3xl font-serif text-emerald-900 mb-4">Blog Not Found</h2>
          <Button onClick={() => navigate('/blogs')}>Back to Blogs</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Blog Hero */}
      <section className="relative h-[65vh] min-h-[450px] flex items-end pt-24">
        <div className="absolute inset-0 z-0">
          <img 
            src={blogContent.image} 
            alt={blogContent.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-16 w-full text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20 mb-8 -ml-4"
              onClick={() => navigate('/blogs')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
            </Button>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6 text-sm font-medium tracking-wide uppercase text-white/90">
              <span className="flex items-center"><User className="mr-2 h-4 w-4" /> {blogContent.author}</span>
              <span className="flex items-center"><Clock className="mr-2 h-4 w-4" /> {blogContent.readTime}</span>
              <span className="flex items-center"><Tag className="mr-2 h-4 w-4" /> {blogContent.categories.join(' · ')}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif leading-tight">
              {blogContent.title}
            </h1>
            
            <div className="mt-6 text-xl text-white/80 font-light max-w-2xl">
              {blogContent.authorRoles[0]} · {blogContent.authorRoles[1]}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {blogContent.content}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
