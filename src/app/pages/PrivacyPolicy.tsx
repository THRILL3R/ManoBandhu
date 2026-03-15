import { motion } from "motion/react";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

export function PrivacyPolicy() {
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
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold">Your Privacy Matters</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-foreground mb-6"
          >
            Privacy Policy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            This Privacy Policy explains how ManoBandhu Mindcare Services Private Limited
            ("ManoBandhu", "we", "our") collects, uses, and protects personal data when you
            use our website and emotional wellbeing platform.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-muted-foreground mt-4"
          >
            This policy is designed to align with the Digital Personal Data Protection Act, 2023 (India).
          </motion.p>
        </div>
      </section>

      {/* Policy Content */}
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
              Identity of the Data Fiduciary
            </h3>
            <p className="text-muted-foreground mb-4">
              ManoBandhu Mindcare Services Private Limited is the Data Fiduciary responsible for
              processing personal data collected through this website.
            </p>
            <div className="bg-primary/5 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:hello@manobandhu.com" className="hover:text-primary transition-colors">hello@manobandhu.com</a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>+91 8087151656</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Kolhapur, Maharashtra, India</span>
              </div>
            </div>
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
              Data We Collect
            </h3>
            <p className="text-muted-foreground mb-4">
              When you interact with ManoBandhu, we may collect the following categories of data:
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="text-foreground mb-2">Personal Information</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Name</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Email address</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Phone number</li>
                </ul>
              </div>
              <div>
                <h4 className="text-foreground mb-2">Participation Information</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Study participation details</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Responses submitted through research or feedback forms</li>
                </ul>
              </div>
              <div>
                <h4 className="text-foreground mb-2">Technical Data</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> IP address</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Browser type</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Device information</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Website usage analytics</li>
                </ul>
              </div>
            </div>
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
              Purpose of Data Collection
            </h3>
            <p className="text-muted-foreground mb-4">Your data may be used for the following purposes:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Providing access to the ManoBandhu platform</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Enabling participation in the ManoBandhu pilot study</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Communicating updates and/or responses to enquiries</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Improving the ManoBandhu platform and emotional wellbeing tools</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Conducting anonymised research to understand emotional wellbeing patterns</li>
            </ul>
            <p className="text-muted-foreground mt-4 text-sm italic">
              We only process data for the purposes stated at the time of collection.
            </p>
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
              Consent
            </h3>
            <p className="text-muted-foreground mb-3">
              By submitting forms or registering on the website, you provide consent for ManoBandhu
              to collect and process your personal data for the purposes described in this policy.
            </p>
            <p className="text-muted-foreground">
              You may withdraw your consent at any time by contacting us.
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
              Data Sharing
            </h3>
            <p className="text-muted-foreground mb-4 font-semibold">
              ManoBandhu does not sell personal data.
            </p>
            <p className="text-muted-foreground mb-3">
              However, data may be processed by trusted third-party service providers required for
              operating the website, such as:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Website hosting providers</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Email communication platforms</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Analytics tools (such as website usage analytics)</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Form processing tools</li>
            </ul>
            <p className="text-muted-foreground mt-3 text-sm italic">
              These providers process data only for operational purposes.
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
              Data Storage and Security
            </h3>
            <p className="text-muted-foreground mb-4">
              We take appropriate technical and organisational measures to protect personal data, including:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Secure servers",
                "Encryption during transmission",
                "Restricted internal access",
                "Periodic security reviews",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 bg-primary/5 rounded-xl px-4 py-3">
                  <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>
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
              Data Retention
            </h3>
            <p className="text-muted-foreground mb-3">
              Personal data will be retained only for as long as necessary to:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Provide services</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Conduct the pilot study</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Comply with legal requirements</li>
            </ul>
            <p className="text-muted-foreground mt-3">
              Users may request deletion of their data at any time.
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
              Rights of Users
            </h3>
            <p className="text-muted-foreground mb-4">
              Under applicable data protection laws, users have the right to:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Access their personal data</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Request correction of inaccurate data</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Request deletion of personal data</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">*</span> Withdraw consent for data processing</li>
            </ul>
            <p className="text-muted-foreground mt-3 text-sm">
              Requests may be submitted through the contact details above.
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
              Cookies and Analytics
            </h3>
            <p className="text-muted-foreground mb-3">
              The ManoBandhu website may use cookies and analytics technologies to understand how
              the platform is used and improve user experience.
            </p>
            <p className="text-muted-foreground">
              Users can disable cookies through their browser settings.
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
              Grievance Officer
            </h3>
            <p className="text-muted-foreground mb-3">
              In accordance with applicable data protection regulations, a grievance contact is
              available for privacy concerns.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4 text-primary" />
              <a href="mailto:support@manobandhu.com" className="hover:text-primary transition-colors">support@manobandhu.com</a>
            </div>
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
              Policy Updates
            </h3>
            <p className="text-muted-foreground">
              This Privacy Policy may be updated periodically. Updates will be reflected on this page.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}