import { useState } from "react";
import { motion } from "motion/react";
import { Calendar, MapPin, Users, Lock, Mail, Building, Hash, Plus, LogIn } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useNavigate } from "react-router";

export function EventsPage() {
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState({
    orgName: "",
    contactNumber: "",
    email: "",
    address: "",
    city: "",
    activities: [] as string[],
  });

  const [orgCount, setOrgCount] = useState(0); // Mock sequential counter

  const [loginForm, setLoginForm] = useState({
    orgCode: "",
    password: "",
  });
  
  const [isFirstLogin, setIsFirstLogin] = useState<boolean | null>(null);

  const activityTypes = [
    { title: "Yoga & Meditation", desc: "Yoga sessions, silent retreats, breathwork workshops" },
    { title: "Nature & Outdoor", desc: "Forest bathing, hiking for reflection, sunrise sits" },
    { title: "Fitness & Movement", desc: "Running clubs, dance fitness, tai chi classes" },
    { title: "Creative Expression", desc: "Art therapy (non-clinical), journaling circles, music for healing" },
    { title: "Nutrition & Wellness", desc: "Cooking classes for healthy eating, detox retreats" },
    { title: "Learning & Growth", desc: "Workshops, Book clubs on self-awareness" },
    { title: "Volunteering & Service", desc: "Tree planting, community cleanups, animal shelter help" },
    { title: "Social Connection", desc: "Gratitude circles, Positivity meetups, Appreciation nights" }
  ];

  const handleActivityToggle = (activityTitle: string) => {
    setRegisterForm(prev => ({
      ...prev,
      activities: prev.activities.includes(activityTitle)
        ? prev.activities.filter(a => a !== activityTitle)
        : [...prev.activities, activityTitle]
    }));
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate sequential ID
    const nextCount = orgCount + 1;
    setOrgCount(nextCount);
    
    // Generate City Code (first 3 letters, or 'GEN' if empty)
    const cityText = registerForm.city.trim() || 'GEN';
    const cityCode = cityText.substring(0, 3).toUpperCase().padEnd(3, 'X');
    
    // Format: MB-[City Code]-[Sequential 4-digit number]
    const sequentialStr = String(nextCount).padStart(4, '0');
    const orgCode = `MB-${cityCode}-${sequentialStr}`;
    
    toast.success(`Registration successful! Your organisation code is: ${orgCode}. Check your email for details.`);
    setRegisterForm({
      orgName: "",
      contactNumber: "",
      email: "",
      address: "",
      city: "",
      activities: [],
    });
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFirstLogin === null) {
      if (loginForm.orgCode.trim()) {
        setIsFirstLogin(true); // For demo, assume new unless handled by real backend
        toast.info("Organization found. Please set your password to continue.");
      }
    } else if (isFirstLogin) {
      toast.success("Password set successfully! Redirecting to dashboard...");
      setLoginForm({ orgCode: "", password: "" });
      setIsFirstLogin(null);
      navigate("/events/dashboard");
    } else {
      toast.success("Login successful! Redirecting to dashboard...");
      setLoginForm({ orgCode: "", password: "" });
      setIsFirstLogin(null);
      navigate("/events/dashboard");
    }
  };

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
            <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-white" />
            </div>
            <h1 className="mb-6">Event Organizer Portal</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Partner with ManoBandhu to list your wellbeing events and reach a wider audience — 
              from workshops and listening circles to nature expeditions and community gatherings
            </p>
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={() => {
                  const tabs = document.querySelector('[role="tablist"]');
                  if (tabs) tabs.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3 bg-white text-teal-700 font-semibold rounded-full shadow-lg hover:bg-teal-50 transition-colors"
              >
                Get Started
              </button>
              <button 
                onClick={() => navigate('/events/dashboard')}
                className="px-8 py-3 bg-transparent border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="px-2"
            >
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-teal-100/50">
                <Building className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Register Your Organisation</h3>
              <p className="text-gray-500 leading-relaxed text-[15px]">Get a unique organisation code to manage your events</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="px-2 relative"
            >
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-teal-100/50">
                <Plus className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">List Your Events</h3>
              <p className="text-gray-500 leading-relaxed text-[15px]">Create event profiles with descriptions, dates, and registration links</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="px-2 relative opacity-60"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-200/50">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <h3 className="text-xl font-semibold text-gray-900">Track Your Leads</h3>
                <span className="bg-gray-100 text-gray-500 text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-gray-200 tracking-wider">Coming Soon</span>
              </div>
              <p className="text-gray-500 leading-relaxed text-[15px]">Monitor how many people discover your events through ManoBandhu</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content - Tabs */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="register" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-14 mb-12">
              <TabsTrigger value="register" className="text-lg">
                <Building className="w-5 h-5 mr-2" />
                Register Organization
              </TabsTrigger>
              <TabsTrigger value="login" className="text-lg">
                <LogIn className="w-5 h-5 mr-2" />
                Organizer Login
              </TabsTrigger>
            </TabsList>

            {/* Register Tab */}
            <TabsContent value="register">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
              >
                <div className="text-center mb-8">
                  <h2 className="mb-4">Register Your Organization</h2>
                  <p className="text-muted-foreground">
                    Fill in your organization details to receive a unique code for listing events
                  </p>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-6">
                  {/* Organisation Name */}
                  <div>
                    <Label htmlFor="org-name">Organisation Name *</Label>
                    <Input
                      id="org-name"
                      value={registerForm.orgName}
                      onChange={(e) => setRegisterForm({ ...registerForm, orgName: e.target.value })}
                      required
                      placeholder="Your organisation name"
                      className="mt-2"
                    />
                  </div>

                  {/* Contact Number */}
                  <div>
                    <Label htmlFor="contact-number">Contact Number *</Label>
                    <Input
                      id="contact-number"
                      type="tel"
                      value={registerForm.contactNumber}
                      onChange={(e) => setRegisterForm({ ...registerForm, contactNumber: e.target.value })}
                      required
                      placeholder="Official contact number"
                      className="mt-2"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="org-email">Email Address *</Label>
                    <Input
                      id="org-email"
                      type="email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      required
                      placeholder="organisation@email.com"
                      className="mt-2"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Your unique organisation code will be sent to this email
                    </p>
                  </div>

                  {/* City */}
                  <div>
                    <Label htmlFor="org-city">City *</Label>
                    <Input
                      id="org-city"
                      value={registerForm.city}
                      onChange={(e) => setRegisterForm({ ...registerForm, city: e.target.value })}
                      required
                      placeholder="e.g. Mumbai"
                      className="mt-2"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <Label htmlFor="org-address">Address *</Label>
                    <Textarea
                      id="org-address"
                      value={registerForm.address}
                      onChange={(e) => setRegisterForm({ ...registerForm, address: e.target.value })}
                      required
                      placeholder="Complete address"
                      className="mt-2"
                      rows={3}
                    />
                  </div>

                  {/* Activity Types */}
                  <div>
                    <Label className="mb-3 block">Event Categories * (Select all that apply)</Label>
                    <div className="grid md:grid-cols-2 gap-4 bg-teal-50 p-6 rounded-xl">
                      {activityTypes.map((activity) => (
                        <div key={activity.title} className="flex items-start space-x-3">
                          <Checkbox
                            id={activity.title}
                            checked={registerForm.activities.includes(activity.title)}
                            onCheckedChange={() => handleActivityToggle(activity.title)}
                            className="mt-1"
                          />
                          <label
                            htmlFor={activity.title}
                            className="text-sm font-medium leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            <span className="block mb-1 text-gray-900">{activity.title}</span>
                            <span className="block text-xs text-gray-500 font-normal">{activity.desc}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Selected: {registerForm.activities.length} activit{registerForm.activities.length !== 1 ? 'ies' : 'y'}
                    </p>
                  </div>

                  {/* Info Box */}
                  <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-6 rounded-xl border-l-4 border-teal-400">
                    <h4 className="font-bold text-teal-700 mb-3">What Happens Next?</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600">✓</span>
                        <span>Receive your unique organization code via email</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600">✓</span>
                        <span>Use the code to log in and set your password</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600">✓</span>
                        <span>Create your organization profile and start listing events</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600">✓</span>
                        <span>Track leads from the ManoBandhu platform</span>
                      </li>
                    </ul>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-teal-600"
                    disabled={registerForm.activities.length === 0}
                  >
                    Register Organization
                  </Button>
                </form>
              </motion.div>
            </TabsContent>

            {/* Login Tab */}
            <TabsContent value="login">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
              >
                <div className="text-center mb-8">
                  <h2 className="mb-4">Organizer Login</h2>
                  <p className="text-muted-foreground">
                    Access your dashboard to manage events and view analytics
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-6 max-w-md mx-auto">
                  {/* Organization Code */}
                  <div>
                    <Label htmlFor="org-code">Organization Code</Label>
                    <div className="relative mt-2">
                      <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="org-code"
                        value={loginForm.orgCode}
                        onChange={(e) => setLoginForm({ ...loginForm, orgCode: e.target.value })}
                        required
                        placeholder="MB-XXXXXX"
                        className="pl-10"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Enter the code you received via email
                    </p>
                  </div>

                  {/* Password */}
                  {isFirstLogin !== null && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                    >
                      <Label htmlFor="password">{isFirstLogin ? "Set Password" : "Password"}</Label>
                      <div className="relative mt-2">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          required
                          placeholder={isFirstLogin ? "Create a secure password" : "Enter your password"}
                          className="pl-10"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {isFirstLogin ? "Choose a strong password for your new account" : "Enter the password you created"}
                      </p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-teal-600">
                    {isFirstLogin === null ? "Continue" : isFirstLogin ? "Set Password & Login" : "Login to Dashboard"}
                  </Button>

                  {/* Forgot Code */}
                  <div className="text-center">
                    <button
                      type="button"
                      className="text-sm text-primary hover:underline"
                      onClick={() => toast.success("Code reset link sent! Please check your registered email address.")}
                    >
                      Forgot your organization code?
                    </button>
                  </div>
                </form>

                {/* Features Info */}
                <div className="mt-12 bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl">
                  <h4 className="font-bold text-emerald-700 mb-4 text-center">Dashboard Features</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-600">•</span>
                      <span className="text-muted-foreground">Create and manage event listings</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-600">•</span>
                      <span className="text-muted-foreground">Upload photos and descriptions</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-600">•</span>
                      <span className="text-muted-foreground">Add dates and registration links</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-600">•</span>
                      <span className="text-muted-foreground">Track lead generation metrics</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-600">•</span>
                      <span className="text-muted-foreground">Edit descriptions and photos anytime</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-600">•</span>
                      <span className="text-muted-foreground">View analytics and insights</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 text-center italic">
                    Note: Event dates and registration links cannot be edited once posted
                  </p>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-white to-teal-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="mb-4">Why Partner with ManoBandhu?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Reach people who are actively seeking wellbeing support
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Targeted Audience",
                description: "Connect with individuals genuinely interested in mental health and wellbeing events"
              },
              {
                icon: MapPin,
                title: "Local & Online Reach",
                description: "List both in-person and virtual events to maximize participation"
              },
              {
                icon: Calendar,
                title: "Easy Management",
                description: "Simple dashboard to create, edit, and track all your wellbeing events"
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}