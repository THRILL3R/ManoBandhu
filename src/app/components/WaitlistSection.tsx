import { useState } from "react";
import { motion } from "motion/react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import React from "react";

export function WaitlistSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        occupation: "",
        city: "",
    });

    const handleWaitlistSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("🎉 Welcome aboard! Check your email for the next steps to join our pilot study!");
        setFormData({ name: "", email: "", phone: "", occupation: "", city: "" });
    };

    return (
        <section id="waitlist" className="relative py-24 px-6 overflow-hidden" style={{ background: "linear-gradient(180deg, #fff3e6 0%, #f0faf7 100%)" }}>
            {/* Soft wave at the top to separate from previous section */}
            <div
                className="absolute top-0 left-0 w-full"
                style={{ height: "4vw", minHeight: "30px", transform: "rotate(180deg)" }}
            >
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
                    <path d="M0,0V120H1200V0C1100,60,950,110,600,60C250,10,100,60,0,0Z" fill="#fff9f0" />
                </svg>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h2
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            color: "#1a6b5a",
                            fontSize: "clamp(2rem, 4vw, 2.8rem)",
                            fontWeight: 700,
                            marginBottom: "1rem"
                        }}
                    >
                        Join Our Pilot Study
                    </h2>
                    <p
                        style={{
                            fontFamily: "'Nunito', sans-serif",
                            color: "#6ba88a",
                            fontSize: "1.1rem",
                            maxWidth: "600px",
                            margin: "0 auto"
                        }}
                    >
                        Be among the first to experience ManoBandhu. Our 8-week pilot study begins in June 2026.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="rounded-[2.5rem] p-8 md:p-12 relative bg-white"
                    style={{
                        border: "1.5px solid #e3efe9",
                        boxShadow: "0 20px 60px rgba(26,107,90,0.08)",
                    }}
                >
                    {/* Decorative elements inside the card */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#f0faf7] rounded-full blur-3xl opacity-60 pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#fcf3fc] rounded-full blur-3xl opacity-60 pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

                    <form onSubmit={handleWaitlistSubmit} className="space-y-6 relative z-10">
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { id: "name", label: "Full Name", type: "text", placeholder: "Enter your name" },
                                { id: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
                                { id: "phone", label: "Mobile Number", type: "tel", placeholder: "+91 98765 43210" },
                                { id: "occupation", label: "Occupation", type: "text", placeholder: "Your occupation" }
                            ].map((field) => (
                                <div key={field.id}>
                                    <Label
                                        htmlFor={field.id}
                                        className="block mb-2 font-semibold"
                                        style={{ color: "#2d7a5e", fontFamily: "'Nunito', sans-serif", fontSize: "0.95rem" }}
                                    >
                                        {field.label}
                                    </Label>
                                    <Input
                                        id={field.id}
                                        type={field.type}
                                        value={(formData as any)[field.id]}
                                        onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                                        required
                                        className="w-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#40B3A2] focus-visible:border-transparent placeholder:text-gray-400"
                                        style={{
                                            backgroundColor: "#f9fdfb",
                                            border: "1px solid #cce4d8",
                                            color: "#1a6b5a",
                                            borderRadius: "1rem",
                                            padding: "1.25rem 1rem",
                                            fontSize: "1rem",
                                            fontFamily: "'Nunito', sans-serif"
                                        }}
                                        placeholder={field.placeholder}
                                    />
                                </div>
                            ))}

                            <div className="md:col-span-2">
                                <Label
                                    htmlFor="city"
                                    className="block mb-2 font-semibold"
                                    style={{ color: "#2d7a5e", fontFamily: "'Nunito', sans-serif", fontSize: "0.95rem" }}
                                >
                                    City
                                </Label>
                                <Input
                                    id="city"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    required
                                    className="w-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#40B3A2] focus-visible:border-transparent placeholder:text-gray-400"
                                    style={{
                                        backgroundColor: "#f9fdfb",
                                        border: "1px solid #cce4d8",
                                        color: "#1a6b5a",
                                        borderRadius: "1rem",
                                        padding: "1.25rem 1rem",
                                        fontSize: "1rem",
                                        fontFamily: "'Nunito', sans-serif"
                                    }}
                                    placeholder="Your city"
                                />
                            </div>
                        </div>

                        <div className="pt-6">
                            <Button
                                type="submit"
                                className="w-full text-white text-lg font-bold py-7 rounded-[1.2rem] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                                style={{
                                    background: "linear-gradient(135deg, #2E7B74, #40B3A2)",
                                    boxShadow: "0 10px 25px rgba(46,123,116,0.25)",
                                    fontFamily: "'Nunito', sans-serif",
                                    letterSpacing: "0.5px"
                                }}
                            >
                                Join the Waitlist
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
