import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";

// Utility function specifically for toast notification since we're using custom HTML reference
function useToast() {
  const [toastMsg, setToastMsg] = useState("");
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2500);
  };
  return { toastMsg, showToast };
}

export function OrganizerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"profile" | "events" | "leads">("profile");
  const { toastMsg, showToast } = useToast();

  // --- Profile State ---
  const [profileForm, setProfileForm] = useState({
    orgName: "Mindful Nagpur Foundation",
    isRegistered: true,
    regNumber: "MH-2024-00142",
    incorporationDate: "2022-04-15",
    gstDetails: "27AABCM1234A1Z5",
    email: "hello@mindfulnagpur.org",
    phone: "+91 9876543210",
    isNgo: false,
    description: "We are a Nagpur-based wellness collective offering mindfulness workshops, listening circles, and community healing events. Our mission is to make emotional wellbeing accessible to all.",
    activities: ["🧘 Yoga & Meditation", "🌿 Mindfulness Sessions"] as string[],
    instagramUrl: "https://instagram.com/mindfulnagpur",
    linkedinUrl: "",
    websiteUrl: "https://mindfulnagpur.org",
  });

  const CATS = [
    "🧘 Yoga & Meditation",
    "🥾 Trekking & Nature Walks",
    "💬 Support Groups",
    "🎓 Workshops",
    "🤝 Volunteering",
    "🏃 Fitness & Marathons",
    "🎨 Art & Creative Therapy",
    "🌿 Mindfulness Sessions",
    "👥 Community Gatherings"
  ];

  const handleActivityToggle = (activity: string) => {
    setProfileForm(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  // --- Events View State ---
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [events, setEvents] = useState([
    { id: 1, name: "Mindfulness & Breathwork — Spring Session", month: "APR", day: "12", time: "10:00 AM", phone: "+91 9876543210", mode: "online", category: "Mindfulness Sessions" },
    { id: 2, name: "Community Listening Circle — Monthly", month: "APR", day: "28", location: "Nagpur", phone: "+91 9876543210", mode: "offline", category: "Support Groups" },
  ]);

  const [eventForm, setEventForm] = useState({
    name: "", date: "", contactNumber: "", mode: "", city: "", category: "", reason1: "", reason2: "", reason3: "",
  });

  const handlePublishEvent = () => {
    const newEvent = {
      id: Date.now(),
      name: eventForm.name || "New Event Added",
      month: "NEW",
      day: "—",
      time: "", 
      location: eventForm.city,
      phone: eventForm.contactNumber,
      mode: eventForm.mode || "online",
      category: eventForm.category || "General Event"
    };
    setEvents([...events, newEvent]);
    setShowAddEventModal(false);
    showToast("🎉 Event listed successfully!");
    setEventForm({ name: "", date: "", contactNumber: "", mode: "", city: "", category: "", reason1: "", reason2: "", reason3: "" });
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <div className="font-sans min-h-screen bg-[#F7FAFA] text-[#1A2B3C] selection:bg-[#1A7A6E]/20 text-[14px]">
      
      {/* ── TOP NAV ── */}
      <nav className="sticky top-0 z-50 flex items-center justify-between h-16 px-8 bg-white border-b border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-2.5">
          <span className="font-['DM_Serif_Display'] text-[22px] text-[#1A7A6E] tracking-[0px]">ManoBandhu</span>
          <div className="w-[1px] h-5 bg-[#E5E7EB]"></div>
          <span className="text-[13px] font-medium text-[#6B7280] tracking-[0.3px]">Event Organiser Portal</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 text-[13px] font-semibold text-[#1A7A6E] bg-[#E8F5F3] border border-[#1A7A6E]/20 rounded-full cursor-default">
            🏢 <span>MB-MUM-0001</span>
          </div>
          <button 
            onClick={() => navigate('/events')}
            className="px-4 py-2 text-[13px] font-medium text-[#6B7280] bg-transparent border border-[#E5E7EB] rounded-lg transition-all hover:bg-[#F3F4F6] hover:text-[#1A2B3C]"
          >
            ← Back to Login
          </button>
        </div>
      </nav>

      {/* ── LAYOUT ── */}
      <div className="flex min-h-[calc(100vh-64px)] w-full relative">
        
        {/* ── SIDEBAR ── */}
        <aside className="w-[240px] shrink-0 bg-white border-r border-[#E5E7EB] py-6 flex flex-col items-stretch sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
          <div className="px-4 mb-2">
            <div className="px-2 mt-4 mb-1 text-[10px] font-semibold tracking-[1px] text-[#6B7280] uppercase">Organiser</div>
            
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 mb-[2px] rounded-[10px] text-[14px] font-medium transition-all ${
                activeTab === 'profile' 
                ? 'bg-[#E8F5F3] text-[#1A7A6E] font-semibold' 
                : 'text-[#6B7280] hover:bg-[#F0FAF8] hover:text-[#1A7A6E]'
              }`}
            >
              <span className="w-[18px] text-center text-[16px]">🏢</span> Organisation Profile
            </button>
            
            <button 
              onClick={() => setActiveTab('events')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 mb-[2px] rounded-[10px] text-[14px] font-medium transition-all ${
                activeTab === 'events' 
                ? 'bg-[#E8F5F3] text-[#1A7A6E] font-semibold' 
                : 'text-[#6B7280] hover:bg-[#F0FAF8] hover:text-[#1A7A6E]'
              }`}
            >
              <span className="w-[18px] text-center text-[16px]">📅</span> My Events
              <span className={`ml-auto px-[7px] py-[2px] text-[11px] font-semibold rounded-[10px] ${activeTab === 'events' ? 'bg-[#1A7A6E] text-white' : 'bg-[#1A7A6E] text-white'}`}>
                {events.length}
              </span>
            </button>
          </div>
          
          <div className="h-[1px] bg-[#E5E7EB] mx-4 my-3"></div>
          
          <div className="px-4 mb-2">
            <div className="px-2 mt-4 mb-1 text-[10px] font-semibold tracking-[1px] text-[#6B7280] uppercase">Analytics</div>
            <button 
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 mb-[2px] rounded-[10px] text-[14px] font-medium transition-all ${
                activeTab === 'leads' 
                ? 'bg-[#E8F5F3] text-[#1A7A6E] font-semibold' 
                : 'text-[#6B7280] hover:bg-[#F0FAF8] hover:text-[#1A7A6E]'
              }`}
            >
              <span className="w-[18px] text-center text-[16px]">📊</span> Track Leads
              <span className="ml-auto px-[7px] py-[2px] text-[11px] font-semibold text-[#92400E] bg-[#FEF3C7] rounded-[10px]">Soon</span>
            </button>
          </div>

          <div className="h-[1px] bg-[#E5E7EB] mx-4 my-3"></div>

          <div className="px-4 mt-auto">
            <div className="px-3 py-2">
              <div className="text-[11px] text-[#6B7280] leading-[1.5]">
                Need help? Contact us at<br/>
                <a href="mailto:manobandhu.mindcare@gmail.com" className="text-[#1A7A6E] font-medium hover:underline focus:outline-none focus:underline mt-0.5 inline-block">manobandhu.mindcare@gmail.com</a>
              </div>
            </div>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 w-full p-8 max-w-[1100px] pb-40 relative">
          
          {/* ══════════════════ PROFILE TAB ══════════════════ */}
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="mb-7 text-left">
                <h1 className="font-['DM_Serif_Display'] text-[28px] text-[#1A2B3C] mb-1">Organisation Profile</h1>
                <p className="text-[14px] text-[#6B7280]">Keep your organisation details up to date. This information is visible to ManoBandhu users discovering your events.</p>
              </div>

              {/* Logo Card */}
              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-7 mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] text-left">
                <div className="flex items-center gap-2 text-[16px] font-semibold text-[#1A2B3C] mb-6">
                  <span className="text-[18px]">🖼️</span> Organisation Logo
                </div>
                <div 
                  onClick={() => showToast('File upload — connect to storage in production')}
                  className="border-2 border-dashed border-[#E5E7EB] rounded-[12px] p-7 text-center cursor-pointer transition-all bg-[#F0FAF8] hover:bg-[#E8F5F3] hover:border-[#1A7A6E]"
                >
                  <div className="text-[32px] mb-2">📷</div>
                  <div className="text-[14px] text-[#6B7280]">
                    <strong className="text-[#1A7A6E] font-semibold">Click to upload logo</strong> or drag and drop<br/>PNG, JPG up to 5MB. Recommended: 400×400px
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-7 mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] text-left">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-[16px] font-semibold text-[#1A2B3C]">
                    <span className="text-[18px]">📋</span> Basic Information
                  </div>
                  <span className="text-[12px] text-[#6B7280]">* Required fields</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
                  <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1A2B3C]">Organisation Name <span className="text-[#1A7A6E]">*</span></label>
                    <input type="text" className="w-full px-3.5 py-2.5 border-[1.5px] border-[#E5E7EB] rounded-[10px] text-[14px] text-[#1A2B3C] focus:border-[#1A7A6E] focus:ring-[3px] focus:ring-[#1A7A6E]/10 outline-none transition-all" value={profileForm.orgName} onChange={e => setProfileForm({...profileForm, orgName: e.target.value})} placeholder="Your organisation name" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1A2B3C]">Registered Number</label>
                    <input type="text" className="w-full px-3.5 py-2.5 border-[1.5px] border-[#E5E7EB] rounded-[10px] text-[14px] text-[#1A2B3C] focus:border-[#1A7A6E] focus:ring-[3px] focus:ring-[#1A7A6E]/10 outline-none transition-all" value={profileForm.regNumber} onChange={e => setProfileForm({...profileForm, regNumber: e.target.value})} placeholder="Official registration number" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1A2B3C]">Incorporation Date</label>
                    <input type="date" className="w-full px-3.5 py-2.5 border-[1.5px] border-[#E5E7EB] rounded-[10px] text-[14px] text-[#1A2B3C] focus:border-[#1A7A6E] focus:ring-[3px] focus:ring-[#1A7A6E]/10 outline-none transition-all" value={profileForm.incorporationDate} onChange={e => setProfileForm({...profileForm, incorporationDate: e.target.value})} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1A2B3C]">GST Details</label>
                    <input type="text" className="w-full px-3.5 py-2.5 border-[1.5px] border-[#E5E7EB] rounded-[10px] text-[14px] text-[#1A2B3C] focus:border-[#1A7A6E] focus:ring-[3px] focus:ring-[#1A7A6E]/10 outline-none transition-all" value={profileForm.gstDetails} onChange={e => setProfileForm({...profileForm, gstDetails: e.target.value})} placeholder="GST number (if applicable)" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1A2B3C]">Contact Email <span className="text-[#1A7A6E]">*</span></label>
                    <input type="email" className="w-full px-3.5 py-2.5 border-[1.5px] border-[#E5E7EB] rounded-[10px] text-[14px] text-[#1A2B3C] focus:border-[#1A7A6E] focus:ring-[3px] focus:ring-[#1A7A6E]/10 outline-none transition-all" value={profileForm.email} onChange={e => setProfileForm({...profileForm, email: e.target.value})} placeholder="contact@organisation.com" />
                    <span className="text-[12px] text-[#6B7280] mt-0.5">This email is linked to your organisation code MB-MUM-0001</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1A2B3C]">Contact Phone</label>
                    <input type="tel" className="w-full px-3.5 py-2.5 border-[1.5px] border-[#E5E7EB] rounded-[10px] text-[14px] text-[#1A2B3C] focus:border-[#1A7A6E] focus:ring-[3px] focus:ring-[#1A7A6E]/10 outline-none transition-all" value={profileForm.phone} onChange={e => setProfileForm({...profileForm, phone: e.target.value})} placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1A2B3C]">Description <span className="text-[#1A7A6E]">*</span></label>
                    <textarea className="w-full px-3.5 py-2.5 border-[1.5px] border-[#E5E7EB] rounded-[10px] text-[14px] text-[#1A2B3C] focus:border-[#1A7A6E] focus:ring-[3px] focus:ring-[#1A7A6E]/10 outline-none transition-all min-h-[90px] resize-y" placeholder="Tell people about your organisation..." value={profileForm.description} onChange={e => setProfileForm({...profileForm, description: e.target.value})}></textarea>
                  </div>
                </div>

                {/* Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px] mt-[18px]">
                  <div className="flex items-center justify-between px-4 py-3 bg-[#F3F4F6] border-[1.5px] border-[#E5E7EB] rounded-[10px]">
                    <span className="text-[14px] font-medium text-[#1A2B3C]">Registered Organisation</span>
                    <label className="relative w-11 h-6 cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={profileForm.isRegistered} onChange={() => setProfileForm(p => ({...p, isRegistered: !p.isRegistered}))} />
                      <div className="absolute inset-0 bg-[#D1D5DB] rounded-[24px] transition-colors duration-300 peer-checked:bg-[#1A7A6E]"></div>
                      <div className="absolute left-[3px] top-[3px] w-[18px] h-[18px] bg-white rounded-[50%] transition-transform duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.2)] peer-checked:translate-x-[20px]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 bg-[#F3F4F6] border-[1.5px] border-[#E5E7EB] rounded-[10px]">
                    <span className="text-[14px] font-medium text-[#1A2B3C]">NGO / Non-Profit</span>
                    <label className="relative w-11 h-6 cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={profileForm.isNgo} onChange={() => setProfileForm(p => ({...p, isNgo: !p.isNgo}))} />
                      <div className="absolute inset-0 bg-[#D1D5DB] rounded-[24px] transition-colors duration-300 peer-checked:bg-[#1A7A6E]"></div>
                      <div className="absolute left-[3px] top-[3px] w-[18px] h-[18px] bg-white rounded-[50%] transition-transform duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.2)] peer-checked:translate-x-[20px]"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Event Categories Card */}
              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-7 mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] text-left">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-[16px] font-semibold text-[#1A2B3C]">
                    <span className="text-[18px]">🏷️</span> Event Categories
                  </div>
                  <span className="text-[13px] text-[#6B7280]">{profileForm.activities.length} selected</span>
                </div>
                <p className="text-[13px] text-[#6B7280] mb-4">Select all categories that apply to your organisation's events.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {CATS.map((cat, i) => {
                    const isSelected = profileForm.activities.includes(cat);
                    return (
                      <div 
                        key={i}
                        onClick={() => handleActivityToggle(cat)}
                        className={`flex items-center gap-2 px-3.5 py-2.5 border-[1.5px] rounded-[10px] cursor-pointer text-[13px] transition-all select-none
                          ${isSelected ? 'border-[#1A7A6E] bg-[#E8F5F3] text-[#1A7A6E] font-semibold' : 'border-[#E5E7EB] bg-white text-[#6B7280] font-medium hover:border-[#1A7A6E] hover:text-[#1A7A6E] hover:bg-[#F0FAF8]'}`}
                      >
                        <div className={`shrink-0 w-4 h-4 border-2 rounded-[4px] shrink-0 flex items-center justify-center text-[10px] transition-all
                          ${isSelected ? 'bg-[#1A7A6E] border-[#1A7A6E] text-white' : 'border-[#E5E7EB] text-transparent'}`}>
                          {isSelected && '✓'}
                        </div>
                        {cat}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Images Card */}
              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-7 mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] text-left">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-[16px] font-semibold text-[#1A2B3C]">
                    <span className="text-[18px]">🖼️</span> Organisation Images
                  </div>
                  <button onClick={() => showToast('Upload — connect to storage in production')} className="flex items-center gap-1.5 px-3.5 py-[7px] text-[13px] font-semibold text-[#1A7A6E] bg-white border-[1.5px] border-[#1A7A6E] rounded-[10px] hover:bg-[#E8F5F3] transition-colors">
                    + Add Image
                  </button>
                </div>
                <p className="text-[13px] text-[#6B7280] mb-4">Event photos, venue images, past workshops. Help people feel what your events are like.</p>
                
                <div className="flex flex-wrap gap-2.5 mt-3">
                  {['🌿', '🏡', '👥'].map((emoji, i) => (
                    <div key={i} className="relative w-[72px] h-[72px] rounded-[10px] bg-[#F3F4F6] border-[1.5px] border-dashed border-[#E5E7EB] flex items-center justify-center text-[24px] cursor-pointer hover:border-[#1A7A6E] hover:bg-[#F0FAF8] transition-all overflow-hidden group">
                      {emoji}
                      <div onClick={(e) => { e.stopPropagation(); showToast('Image removed') }} className="absolute top-[3px] right-[3px] w-4 h-4 rounded-full bg-[#DC2626]/85 text-white flex items-center justify-center text-[9px] font-bold cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">×</div>
                    </div>
                  ))}
                  <div onClick={() => showToast('Upload modal opening...')} className="relative w-[72px] h-[72px] rounded-[10px] bg-[#F3F4F6] border-[1.5px] border-dashed border-[#E5E7EB] flex items-center justify-center text-[20px] text-[#6B7280] cursor-pointer hover:border-[#1A7A6E] hover:bg-[#F0FAF8] transition-all">
                    +
                  </div>
                </div>
              </div>

              {/* Social Card */}
              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-7 shadow-[0_1px_3px_rgba(0,0,0,0.08)] text-left mb-4">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2 text-[16px] font-semibold text-[#1A2B3C]">
                    <span className="text-[18px]">🔗</span> Social Media Links
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="shrink-0 w-[38px] h-[38px] bg-[#F3F4F6] rounded-lg flex items-center justify-center text-[16px]">📸</div>
                    <div className="flex-1 flex flex-col gap-1.5 text-left">
                      <label className="text-[13px] font-semibold text-[#1A2B3C]">Instagram</label>
                      <input type="url" className="w-full px-3.5 py-[10px] border-[1.5px] border-[#E5E7EB] rounded-[10px] text-[14px] text-[#1A2B3C] focus:border-[#1A7A6E] focus:ring-[3px] focus:ring-[#1A7A6E]/10 outline-none" value={profileForm.instagramUrl} onChange={e => setProfileForm({...profileForm, instagramUrl: e.target.value})} placeholder="https://instagram.com/yourhandle" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="shrink-0 w-[38px] h-[38px] bg-[#F3F4F6] rounded-lg flex items-center justify-center text-[16px]">💼</div>
                    <div className="flex-1 flex flex-col gap-1.5 text-left">
                      <label className="text-[13px] font-semibold text-[#1A2B3C]">LinkedIn</label>
                      <input type="url" className="w-full px-3.5 py-[10px] border-[1.5px] border-[#E5E7EB] rounded-[10px] text-[14px] text-[#1A2B3C] focus:border-[#1A7A6E] focus:ring-[3px] focus:ring-[#1A7A6E]/10 outline-none" value={profileForm.linkedinUrl} onChange={e => setProfileForm({...profileForm, linkedinUrl: e.target.value})} placeholder="https://linkedin.com/company/yourorg" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="shrink-0 w-[38px] h-[38px] bg-[#F3F4F6] rounded-lg flex items-center justify-center text-[16px]">🌐</div>
                    <div className="flex-1 flex flex-col gap-1.5 text-left">
                      <label className="text-[13px] font-semibold text-[#1A2B3C]">Website</label>
                      <input type="url" className="w-full px-3.5 py-[10px] border-[1.5px] border-[#E5E7EB] rounded-[10px] text-[14px] text-[#1A2B3C] focus:border-[#1A7A6E] focus:ring-[3px] focus:ring-[#1A7A6E]/10 outline-none" value={profileForm.websiteUrl} onChange={e => setProfileForm({...profileForm, websiteUrl: e.target.value})} placeholder="https://yourwebsite.com" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Save Bar */}
              <div className="sticky bottom-0 -mx-8 -mb-8 mt-8 px-8 py-4 bg-white border-t border-[#E5E7EB] flex items-center justify-between shadow-[0_-4px_12px_rgba(0,0,0,0.06)] z-40">
                <span className="text-[13px] text-[#6B7280]">Last saved: <strong className="text-[#1A2B3C] font-semibold">Today at 11:42 AM</strong></span>
                <div className="flex items-center gap-2.5">
                  <button className="flex items-center gap-1.5 px-[22px] py-[10px] text-[14px] font-semibold text-[#1A7A6E] bg-white border-[1.5px] border-[#1A7A6E] rounded-[10px] hover:bg-[#E8F5F3] transition-colors">
                    Discard Changes
                  </button>
                  <button onClick={() => showToast('✅ Profile saved successfully!')} className="flex items-center gap-1.5 px-[22px] py-[10px] text-[14px] font-semibold text-white bg-[#1A7A6E] rounded-[10px] hover:bg-[#15655a] hover:-translate-y-[1px] shadow-[0_2px_8px_rgba(26,122,110,0.3)] hover:shadow-[0_4px_12px_rgba(26,122,110,0.4)] transition-all">
                    💾 Save Profile
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ══════════════════ EVENTS TAB ══════════════════ */}
          {activeTab === "events" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="text-left w-full">
              <div className="mb-7">
                <h1 className="font-['DM_Serif_Display'] text-[28px] text-[#1A2B3C] mb-1">My Events</h1>
                <p className="text-[14px] text-[#6B7280]">Manage your listed events. Events you add here appear in the ManoBandhu platform under The Fair.</p>
              </div>

              <div className="flex items-start gap-2.5 p-3 px-4 mb-6 rounded-[10px] bg-[#E8F5F3] text-[#1A7A6E] border border-[#1A7A6E]/20 text-[13px] w-full">
                ℹ️ Events you list here are visible to ManoBandhu users exploring The Fair destination on the platform.
              </div>

              <div className="flex justify-end mb-5 w-full">
                <button onClick={() => setShowAddEventModal(true)} className="flex items-center gap-1.5 px-[22px] py-[10px] text-[14px] font-semibold text-white bg-[#1A7A6E] rounded-[10px] hover:bg-[#15655a] hover:-translate-y-[1px] shadow-[0_2px_8px_rgba(26,122,110,0.3)] transition-all">
                  + Add New Event
                </button>
              </div>

              <div className="flex flex-col gap-3.5 w-full">
                <AnimatePresence>
                  {events.map((evt) => (
                    <motion.div key={evt.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4.5 bg-white border-[1.5px] border-[#E5E7EB] rounded-[12px] hover:border-[#1A7A6E] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all w-full">
                      
                      <div className="shrink-0 w-[54px] text-center bg-[#E8F5F3] rounded-[10px] py-2 px-1">
                        <div className="text-[10px] font-bold text-[#1A7A6E] uppercase tracking-[0.5px]">{evt.month}</div>
                        <div className="text-[22px] font-bold text-[#1A7A6E] leading-[1] mt-0.5">{evt.day}</div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="font-semibold text-[#1A2B3C] text-[15px] mb-1">{evt.name}</div>
                        <div className="flex flex-wrap items-center gap-3.5 text-[13px] text-[#6B7280]">
                          {evt.time && <span className="flex items-center gap-1">🕙 {evt.time}</span>}
                          {evt.location && <span className="flex items-center gap-1">📍 {evt.location}</span>}
                          {evt.phone && <span className="flex items-center gap-1">📞 {evt.phone}</span>}
                          
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-[20px] text-[12px] font-semibold ${evt.mode === 'online' ? 'bg-[#DBEAFE] text-[#1D4ED8]' : 'bg-[#F3E8FF] text-[#7C3AED]'}`}>
                            {evt.mode === 'online' ? '🌐 Online' : '📍 Offline'}
                          </span>
                          <span className="bg-[#E8F5F3] text-[#1A7A6E] px-2.5 py-[3px] rounded-[20px] text-[12px] font-semibold">
                            {evt.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center">
                        <button onClick={() => showToast('Edit interface opening...')} className="px-3.5 py-[7px] text-[13px] font-semibold text-[#1A7A6E] bg-white border-[1.5px] border-[#1A7A6E] rounded-[10px] hover:bg-[#E8F5F3] transition-colors">✏️ Edit</button>
                        <button onClick={() => deleteEvent(evt.id)} className="px-3.5 py-[7px] text-[13px] font-semibold text-[#DC2626] bg-[#FEE2E2] border-[1.5px] border-[#FECACA] rounded-[10px] hover:bg-[#FECACA] transition-colors">🗑️</button>
                      </div>

                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ══════════════════ LEADS TAB ══════════════════ */}
          {activeTab === "leads" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="text-left">
               <div className="mb-7">
                <h1 className="font-['DM_Serif_Display'] text-[28px] text-[#1A2B3C] mb-1">Track Leads</h1>
                <p className="text-[14px] text-[#6B7280]">See how many people are discovering your events through ManoBandhu.</p>
              </div>

              <div className="flex items-start gap-2.5 p-3 px-4 mb-6 rounded-[10px] bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] text-[13px]">
                ⏳ Lead tracking will be active after the ManoBandhu pilot study launches. Check back in June 2026.
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-7 mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
                <div className="relative overflow-hidden p-6 rounded-[16px] bg-gradient-to-br from-[#F0FAF8] to-[#E8F5F3] border-[1.5px] border-[#1A7A6E]/20">
                  <div className="absolute -top-5 -right-5 w-[120px] h-[120px] bg-[#1A7A6E]/5 rounded-full z-0"></div>
                  
                  <div className="relative z-10 flex flex-col items-start">
                    <div className="inline-flex items-center gap-1.5 bg-[#FEF3C7] text-[#92400E] rounded-[20px] px-3 py-1 text-[12px] font-semibold mb-3">
                      ⏳ Coming Soon — Active after pilot study launch
                    </div>
                    <div className="font-['DM_Serif_Display'] text-[48px] text-[#1A7A6E] blur-[6px] select-none leading-none mb-1">
                      247
                    </div>
                    <div className="text-[14px] text-[#6B7280] mt-1">
                      People who discovered your events through ManoBandhu
                    </div>
                    <div className="text-[12px] text-[#6B7280] mt-3 italic">
                      This number will be live once the pilot study begins in June 2026.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </main>
      </div>

      {/* ══════════════════ ADD EVENT MODAL ══════════════════ */}
      <AnimatePresence>
        {showAddEventModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/45 backdrop-blur-[4px]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              className="bg-white rounded-[20px] w-full max-w-[620px] max-h-[85vh] overflow-y-auto p-8 shadow-[0_24px_64px_rgba(0,0,0,0.2)]"
            >
              <div className="flex items-start justify-between mb-6 text-left">
                <div>
                  <h2 className="font-['DM_Serif_Display'] text-[22px] text-[#1A2B3C]">Add New Event</h2>
                  <p className="text-[13px] text-[#6B7280] mt-0.5">Your event will appear in The Fair on the ManoBandhu platform.</p>
                </div>
                <button 
                  onClick={() => setShowAddEventModal(false)}
                  className="shrink-0 w-8 h-8 rounded-lg border border-[#E5E7EB] bg-[#F3F4F6] text-[#6B7280] text-[18px] flex items-center justify-center transition-colors hover:bg-[#FEE2E2] hover:text-[#DC2626] hover:border-[#FECACA]"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px] text-left">
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1A2B3C]">Event Name <span className="text-[#1A7A6E]">*</span></label>
                  <input type="text" className="w-full px-3.5 py-2.5 border-[1.5px] border-[#E5E7EB] rounded-[10px] text-[14px] text-[#1A2B3C] focus:border-[#1A7A6E] focus:ring-[3px] focus:ring-[#1A7A6E]/10 outline-none transition-all" placeholder="e.g. Monthly Listening Circle — April 2026" value={eventForm.name} onChange={e => setEventForm({...eventForm, name: e.target.value})} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1A2B3C]">Date <span className="text-[#1A7A6E]">*</span></label>
                  <input type="date" className="w-full px-3.5 py-2.5 border-[1.5px] border-[#E5E7EB] rounded-[10px] text-[14px] text-[#1A2B3C] focus:border-[#1A7A6E] focus:ring-[3px] focus:ring-[#1A7A6E]/10 outline-none transition-all" value={eventForm.date} onChange={e => setEventForm({...eventForm, date: e.target.value})} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1A2B3C]">Contact Number <span className="text-[#1A7A6E]">*</span></label>
                  <input type="tel" className="w-full px-3.5 py-2.5 border-[1.5px] border-[#E5E7EB] rounded-[10px] text-[14px] text-[#1A2B3C] focus:border-[#1A7A6E] focus:ring-[3px] focus:ring-[#1A7A6E]/10 outline-none transition-all" placeholder="+91 XXXXX XXXXX" value={eventForm.contactNumber} onChange={e => setEventForm({...eventForm, contactNumber: e.target.value})} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1A2B3C]">Mode <span className="text-[#1A7A6E]">*</span></label>
                  <select className="w-full px-3.5 py-2.5 border-[1.5px] border-[#E5E7EB] rounded-[10px] text-[14px] text-[#1A2B3C] bg-white cursor-pointer focus:border-[#1A7A6E] focus:ring-[3px] focus:ring-[#1A7A6E]/10 outline-none transition-all" value={eventForm.mode} onChange={e => setEventForm({...eventForm, mode: e.target.value})}>
                    <option value="" disabled>Select mode</option>
                    <option value="online">🌐 Online</option>
                    <option value="offline">📍 Offline</option>
                  </select>
                </div>
                
                <div className={`flex flex-col gap-1.5 transition-all ${eventForm.mode === "offline" ? "opacity-100 flex" : "opacity-0 hidden"}`}>
                  <label className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1A2B3C]">City <span className="text-[#1A7A6E]">*</span></label>
                  <input type="text" className="w-full px-3.5 py-2.5 border-[1.5px] border-[#E5E7EB] rounded-[10px] text-[14px] text-[#1A2B3C] focus:border-[#1A7A6E] focus:ring-[3px] focus:ring-[#1A7A6E]/10 outline-none transition-all" placeholder="e.g. Nagpur, Pune, Mumbai" value={eventForm.city} onChange={e => setEventForm({...eventForm, city: e.target.value})} />
                </div>
                
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1A2B3C]">Event Category <span className="text-[#1A7A6E]">*</span></label>
                  <select className="w-full px-3.5 py-2.5 border-[1.5px] border-[#E5E7EB] rounded-[10px] text-[14px] text-[#1A2B3C] bg-white cursor-pointer focus:border-[#1A7A6E] focus:ring-[3px] focus:ring-[#1A7A6E]/10 outline-none transition-all" value={eventForm.category} onChange={e => setEventForm({...eventForm, category: e.target.value})}>
                     <option value="" disabled>Select category</option>
                     {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-5 text-left">
                <label className="block mb-1 font-semibold text-[#1A2B3C] text-[13px] items-center gap-1.5">Why Should Someone Join? <span className="text-[#1A7A6E]">*</span></label>
                <span className="block mb-3 text-[12px] text-[#6B7280]">Give 3 compelling reasons that will appear on your event listing.</span>
                
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="shrink-0 w-7 h-7 bg-[#E8F5F3] text-[#1A7A6E] rounded-full text-[13px] font-bold flex items-center justify-center">1</div>
                  <input type="text" className="flex-1 px-3.5 py-2 border-[1.5px] border-[#E5E7EB] rounded-[10px] text-[14px] text-[#1A2B3C] focus:border-[#1A7A6E] focus:ring-[3px] focus:ring-[#1A7A6E]/10 outline-none transition-all" placeholder="e.g. Learn practical tools to manage daily stress" value={eventForm.reason1} onChange={e => setEventForm({...eventForm, reason1: e.target.value})} />
                </div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="shrink-0 w-7 h-7 bg-[#E8F5F3] text-[#1A7A6E] rounded-full text-[13px] font-bold flex items-center justify-center">2</div>
                  <input type="text" className="flex-1 px-3.5 py-2 border-[1.5px] border-[#E5E7EB] rounded-[10px] text-[14px] text-[#1A2B3C] focus:border-[#1A7A6E] focus:ring-[3px] focus:ring-[#1A7A6E]/10 outline-none transition-all" placeholder="e.g. Connect with a warm, non-judgmental community" value={eventForm.reason2} onChange={e => setEventForm({...eventForm, reason2: e.target.value})} />
                </div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="shrink-0 w-7 h-7 bg-[#E8F5F3] text-[#1A7A6E] rounded-full text-[13px] font-bold flex items-center justify-center">3</div>
                  <input type="text" className="flex-1 px-3.5 py-2 border-[1.5px] border-[#E5E7EB] rounded-[10px] text-[14px] text-[#1A2B3C] focus:border-[#1A7A6E] focus:ring-[3px] focus:ring-[#1A7A6E]/10 outline-none transition-all" placeholder="e.g. Walk away with clarity and a sense of calm" value={eventForm.reason3} onChange={e => setEventForm({...eventForm, reason3: e.target.value})} />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 mt-7 pt-5 border-t border-[#E5E7EB]">
                <button onClick={() => setShowAddEventModal(false)} className="px-[22px] py-[10px] text-[14px] font-semibold text-[#1A7A6E] bg-white border-[1.5px] border-[#1A7A6E] rounded-[10px] hover:bg-[#E8F5F3] transition-colors">
                  Cancel
                </button>
                <button onClick={handlePublishEvent} className="px-[22px] py-[10px] text-[14px] font-semibold text-white bg-[#1A7A6E] rounded-[10px] hover:bg-[#15655a] hover:-translate-y-[1px] shadow-[0_2px_8px_rgba(26,122,110,0.3)] hover:shadow-[0_4px_12px_rgba(26,122,110,0.4)] transition-all flex items-center gap-1.5">
                  🎉 List This Event
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ══════════════════ TOAST ══════════════════ */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div 
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            className="fixed bottom-8 right-8 z-[300] flex items-center gap-2 bg-[#1A7A6E] text-white px-5 py-3.5 rounded-xl text-[14px] font-semibold shadow-[0_8px_24px_rgba(26,122,110,0.35)]"
          >
            ✅ {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
