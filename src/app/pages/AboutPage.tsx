import { motion } from "motion/react";
import { Heart, Target, Eye, Lightbulb } from "lucide-react";

export function AboutPage() {
  const team = [
    {
      name: "Samruddhi Vadgave",
      role: "Co-Founder & CEO",
      image: "👩‍💼",
      bio: [
        "With a background in management and analytics, Samruddhi's journey with ManoBandhu began during her MBA when she faced personal challenges and sought therapy. Those experiences — navigating emotional pain, discovering the gaps in existing mental health solutions, and understanding the power of daily emotional habits — sparked the idea for ManoBandhu.",
        "ManoBandhu was incorporated during her MBA tenure, born from a deep belief that emotional well-being should be accessible, structured, and built into daily life — not reserved for moments of crisis."
      ],
      gradient: "from-teal-400 to-teal-600"
    },
    {
      name: "Dr. Pravin Vadgave",
      role: "Co-Founder",
      image: "👨‍⚕️",
      bio: [
        "An MD Homeopath with over 40 years of clinical practice, Dr. Pravin brings a deep understanding of holistic healing, patient care, and the mind-body connection to ManoBandhu.",
        "His decades of experience working with patients across diverse backgrounds have shaped ManoBandhu's compassionate, patient-centered approach. Together with Samruddhi, he envisions a world where emotional care is as natural and accessible as physical care."
      ],
      gradient: "from-emerald-400 to-emerald-600"
    },
    {
      name: "Kkomal Narsingani",
      role: "Founding Member, Advisor & Wellbeing Consultant",
      image: "👩‍🏫",
      bio: [
        "With over 20 years of professional experience and formal training in counselling psychology, Kkomal has worked with hundreds of adults navigating identity, relationships, boundaries, and emotional overwhelm.",
        "She integrates counselling psychology, mindfulness, somatic awareness, and reflective practices to support meaningful self-understanding and sustainable emotional change. Kkomal leads our community programs, workshops, and circles — creating spaces where people can connect, heal, and grow together."
      ],
      gradient: "from-cyan-400 to-cyan-600"
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
            <h1 className="mb-6">OUR STORY</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              We Build the Bridge Between Healing and Living
            </p>
          </motion.div>
        </div>
      </section>

      {/* New Bridge Section - Core Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                ManoBandhu was born from a simple but profound belief: <strong>emotional well-being is not built in moments of crisis. It is built daily</strong> — through awareness of self, belief in growth, and the consistency to show up every day.
              </p>
              
              <p>
                India has <strong>197 million people who need mental health support</strong> — but existing solutions focus on therapy access or passive content. ManoBandhu fills the gap with a <strong>habit-based, reflective, and structured emotional infrastructure</strong>.
              </p>
              
              <p>
                Most importantly, we are not just a digital product. We are a <strong>bridge between the online and offline world</strong> — using the app as a daily anchor to help users build emotional habits that then encourage them to step into real life.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2 — Our Foundation */}
      <section className="py-20 bg-gradient-to-b from-white to-teal-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4 text-emerald-800">Built on Four Core Pillars</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything in ManoBandhu flows from these principles — they shape every feature, every interaction, every moment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-teal-400"
            >
              <h3 className="text-teal-700 mb-4 text-xl">Pillar 1 — Emotional Awareness</h3>
              <p className="text-muted-foreground leading-relaxed">
                Learn to recognise, name, and sit with your emotions rather than suppress or escape them. Awareness is the first step to change.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-emerald-400"
            >
              <h3 className="text-emerald-700 mb-4 text-xl">Pillar 2 — Nervous System Regulation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Structured tools to calm your body and mind in moments of stress, overwhelm, or emotional flooding — wherever you are.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-cyan-400"
            >
              <h3 className="text-cyan-700 mb-4 text-xl">Pillar 3 — Preventive Mental Health</h3>
              <p className="text-muted-foreground leading-relaxed">
                Well-being is built daily, not just in crisis. ManoBandhu helps you build emotional resilience before you need it most.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-400"
            >
              <h3 className="text-blue-700 mb-4 text-xl">Pillar 4 — Human Connection</h3>
              <p className="text-muted-foreground leading-relaxed">
                Digital tools that bring you closer to the physical world — events, community circles, nature expeditions, and real people.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The People Behind ManoBandhu */}
      <section className="py-20 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4">The People Behind ManoBandhu</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ManoBandhu is a father-daughter collaboration rooted in decades of healing practice and lived experience.
            </p>
          </motion.div>

          <div className="space-y-16">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden ${
                  index % 2 === 0 ? '' : 'md:flex-row-reverse'
                }`}
              >
                <div className="p-8 md:p-12">
                  <div className="mb-6 pb-6 border-b border-gray-100">
                    <h3 className="text-2xl font-bold mb-2 text-teal-800">{member.name}</h3>
                    <p className="text-lg font-medium bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                      {member.role}
                    </p>
                  </div>
                  <div className="space-y-4">
                    {member.bio.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-muted-foreground leading-relaxed text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — How We Began */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4 text-emerald-800">How We Began</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-teal-50 p-10 rounded-2xl shadow-lg border border-teal-100"
            >
              <h3 className="text-teal-800 mb-6 text-2xl flex items-center gap-3">
                <span className="text-3xl">💡</span>
                Born from Personal Experience
              </h3>
              <p className="text-lg text-teal-900/80 leading-relaxed">
                ManoBandhu began during an MBA journey, sparked by personal challenges and the transformative power of therapy. But something was missing — emotional wellbeing shouldn't wait for a crisis. It should be woven into daily life.
              </p>
            </motion.div>

            {/* Right Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-teal-700 p-10 rounded-2xl shadow-lg text-white"
            >
              <h3 className="text-white mb-6 text-2xl flex items-center gap-3">
                <span className="text-3xl">👨‍👩‍👧</span>
                A Father-Daughter Vision
              </h3>
              <p className="text-lg text-teal-50 leading-relaxed">
                Founded by Samruddhi Vadgave (management & analytics) and Dr. Pravin Vadgave (MD Homeopath, 40+ years), ManoBandhu combines youthful innovation with decades of patient care wisdom.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-teal-50 to-teal-100 p-10 rounded-2xl shadow-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="mb-6 text-teal-700">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To be the world's most trusted preventive emotional infrastructure — nurturing more aware, connected, and fully engaged human beings.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-10 rounded-2xl shadow-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="mb-6 text-emerald-700">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To empower every individual through digital and real-world experiences that build emotional strength, deepen self-awareness, and foster genuine human connection.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gradient-to-b from-teal-50 to-emerald-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The Principles That Guide Everything We Do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Compassion First",
                description: "Every feature, every interaction is designed with empathy and understanding",
                color: "from-red-400 to-pink-500"
              },
              {
                icon: Target,
                title: "Prevention Over Cure",
                description: "Building emotional resilience daily, not waiting for crisis",
                color: "from-teal-400 to-teal-600"
              },
              {
                icon: Lightbulb,
                title: "Innovation with Purpose",
                description: "Gamification and technology that serves human connection",
                color: "from-amber-400 to-orange-500"
              },
              {
                icon: Eye,
                title: "Accessibility for All",
                description: "Mental wellbeing shouldn't be a luxury — it's a fundamental right",
                color: "from-emerald-400 to-emerald-600"
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-full flex items-center justify-center mb-6 mx-auto`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}