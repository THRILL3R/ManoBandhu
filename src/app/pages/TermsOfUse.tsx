import { motion } from "motion/react";
import { FileText, Mail, Phone } from "lucide-react";

export function TermsOfUse() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary to-accent/20 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full mb-6"
          >
            <FileText className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold">Legal Agreement</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-foreground mb-6"
          >
            Terms of Use
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            These Terms govern the use of the ManoBandhu website and emotional wellbeing platform.
          </motion.p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Section 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-emerald-100/80 border border-emerald-300 rounded-2xl p-8"
          >
            <h3 className="text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center text-emerald-700 text-sm font-semibold">1</span>
              Acceptance of Terms
            </h3>
            <p className="text-muted-foreground">
              By accessing the ManoBandhu website or platform, you agree to these Terms of Use.
              If you do not agree, please discontinue use.
            </p>
          </motion.div>

          {/* Section 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-indigo-100/80 border border-indigo-300 rounded-2xl p-8"
          >
            <h3 className="text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 text-sm font-semibold">2</span>
              Eligibility
            </h3>
            <p className="text-muted-foreground">
              Users must be 18 years or older to participate in the ManoBandhu platform or research study.
            </p>
          </motion.div>

          {/* Section 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-pink-100/80 border border-pink-300 rounded-2xl p-8"
          >
            <h3 className="text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center text-pink-700 text-sm font-semibold">3</span>
              Nature of the Platform
            </h3>
            <p className="text-muted-foreground mb-3">
              ManoBandhu is currently an informational platform that showcases upcoming emotional wellbeing
              initiatives, invites participation in research studies, and provides a channel for individuals
              and organisations interested in collaboration with ManoBandhu.
            </p>
            <p className="text-muted-foreground mb-3">
              The platform is designed for educational and self-reflection purposes and does not provide
              medical diagnosis, therapy, or emergency mental health services.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
              <p className="text-amber-800 text-sm">
                Users experiencing severe psychological distress should seek help from qualified
                mental health professionals.
              </p>
            </div>
          </motion.div>

          {/* Section 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-amber-100/80 border border-amber-300 rounded-2xl p-8"
          >
            <h3 className="text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center text-amber-700 text-sm font-semibold">4</span>
              Participation in the ManoBandhu Study
            </h3>
            <p className="text-muted-foreground mb-4">
              The website may invite users to join a research study exploring emotional wellbeing.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Participation in the study is voluntary.</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Participants may withdraw at any time.</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Some interactions may involve questionnaires or reflective exercises.</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Data collected during the study may be analysed in anonymised or aggregated form for
              research and platform improvement.
            </p>
          </motion.div>

          {/* Section 5 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-emerald-100/80 border border-emerald-300 rounded-2xl p-8"
          >
            <h3 className="text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center text-emerald-700 text-sm font-semibold">5</span>
              User Responsibilities
            </h3>
            <p className="text-muted-foreground mb-4">Users agree to:</p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Provide accurate information when submitting forms</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Use the platform respectfully and lawfully</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Avoid uploading harmful, abusive, or misleading content</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Respect the intellectual property of ManoBandhu</li>
            </ul>
            <p className="text-muted-foreground">
              Users must not attempt to access private data of other users or interfere with the
              functioning of the platform.
            </p>
          </motion.div>

          {/* Section 6 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-indigo-100/80 border border-indigo-300 rounded-2xl p-8"
          >
            <h3 className="text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 text-sm font-semibold">6</span>
              Intellectual Property
            </h3>
            <p className="text-muted-foreground mb-3">
              All website content, designs, illustrations, island-world concepts, text, graphics, and
              brand elements belong to ManoBandhu Mindcare Services Private Limited.
            </p>
            <p className="text-muted-foreground">
              No content may be reproduced or redistributed without written permission.
            </p>
          </motion.div>

          {/* Section 7 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-pink-100/80 border border-pink-300 rounded-2xl p-8"
          >
            <h3 className="text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center text-pink-700 text-sm font-semibold">7</span>
              Limitation of Liability
            </h3>
            <p className="text-muted-foreground mb-3">
              ManoBandhu provides the platform on an "as-is" basis.
            </p>
            <p className="text-muted-foreground mb-3">
              We do not guarantee specific emotional, psychological, or personal outcomes from using
              the platform.
            </p>
            <p className="text-muted-foreground">
              To the extent permitted by law, ManoBandhu shall not be liable for indirect or
              consequential damages resulting from use of the website or platform.
            </p>
          </motion.div>

          {/* Section 8 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-amber-100/80 border border-amber-300 rounded-2xl p-8"
          >
            <h3 className="text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center text-amber-700 text-sm font-semibold">8</span>
              Account Suspension or Termination
            </h3>
            <p className="text-muted-foreground">
              We reserve the right to suspend or terminate accounts that misuse the platform or
              violate these terms.
            </p>
          </motion.div>

          {/* Section 9 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-emerald-100/80 border border-emerald-300 rounded-2xl p-8"
          >
            <h3 className="text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center text-emerald-700 text-sm font-semibold">9</span>
              Governing Law
            </h3>
            <p className="text-muted-foreground mb-3">
              These Terms are governed by the laws of India.
            </p>
            <p className="text-muted-foreground">
              Any disputes shall fall under the jurisdiction of courts in Kolhapur, Maharashtra, India.
            </p>
          </motion.div>

          {/* Section 10 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-indigo-100/80 border border-indigo-300 rounded-2xl p-8"
          >
            <h3 className="text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 text-sm font-semibold">10</span>
              Updates to Terms
            </h3>
            <p className="text-muted-foreground">
              These Terms may be updated periodically. Continued use of the platform after updates
              indicates acceptance of the revised terms.
            </p>
          </motion.div>

          {/* Section 11 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-pink-100/80 border border-pink-300 rounded-2xl p-8"
          >
            <h3 className="text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center text-pink-700 text-sm font-semibold">11</span>
              Contact
            </h3>
            <p className="text-muted-foreground mb-4">
              For questions regarding these Terms, contact:
            </p>
            <div className="bg-primary/5 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:support@manobandhu.com" className="hover:text-primary transition-colors">support@manobandhu.com</a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>+91 8087151656</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}