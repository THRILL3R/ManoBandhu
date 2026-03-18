import { useState } from "react";
import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
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

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    reason: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Submit to Google Sheets
      const SHEETS_URL = import.meta.env.VITE_SHEETS_URL;
      if (SHEETS_URL) {
        await fetch(SHEETS_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, sheet: "Contact" }),
        });
      }

      
      toast.success("Thank you for contacting us! Our team will get in touch with you shortly.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        reason: "",
        description: "",
      });
    } catch (err) {
      console.error("Sheets submission error:", err);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const reasonOptions = [
    { value: "career", label: "Career Opportunities" },
    { value: "partnership", label: "Partnership & Collaboration" },
    { value: "other", label: "Other Inquiries" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-emerald-50">
      {/* Hero Section */}
      <section className="pt-16 pb-6 text-white" style={{ backgroundColor: "#489590" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-serif text-white mb-2 leading-tight tracking-tight">Get In Touch</h1>
            <p className="text-[17px] md:text-lg text-white/85 max-w-2xl mx-auto font-light">
              We'd love to hear from you. Whether you have questions, partnership ideas, 
              or career interests — let's connect.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <div className="text-center mb-8">
              <h2 className="mb-4">Send Us a Message</h2>
              <p className="text-muted-foreground">
                Fill out the form below and our team will respond as soon as possible
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Your full name"
                    className="mt-2"
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone">Contact Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    placeholder="+91 98765 43210"
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="your@email.com"
                  className="mt-2"
                />
              </div>

              {/* Reason */}
              <div>
                <Label htmlFor="reason">Reason for Contact *</Label>
                <Select
                  value={formData.reason}
                  onValueChange={(value) => setFormData({ ...formData, reason: value })}
                  required
                >
                  <SelectTrigger id="reason" className="mt-2">
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {reasonOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Message *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  placeholder="Tell us more about your inquiry..."
                  className="mt-2"
                  rows={6}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Please provide as much detail as possible
                </p>
              </div>

              {/* Info Box */}
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-6 rounded-xl border-l-4 border-teal-400">
                <h4 className="font-bold text-teal-700 mb-4">What Happens Next?</h4>
                <ol className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                    <span>You'll receive an automated confirmation email immediately.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                    <span>Our team will review your message within 24 hours.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                    <span>We'll reach out via email or phone based on your preference.</span>
                  </li>
                </ol>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-teal-600 disabled:opacity-70"
              >
                {isSubmitting ? "Sending Message..." : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
