import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router";
import { ChevronRight, ChevronLeft, Check, Heart, AlertCircle } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormData {
  // Section 1
  email: string;
  name: string;
  dob: string;
  ageGroup: string;
  place: string;
  country: string;
  category: string;
  partnerInstitution: string;
  mobile: string;
  hasInternet: string;
  commitmentLikelihood: string;
  // Section 2
  receivingTreatment: string;
  treatmentOngoing: string;
  recentExperiences: string[];
  diagnoses: string[];
  // Section 3
  stressFrequency: string;
  currentExperiences: string[];
  currentlyInTherapy: string;
  // Section 4
  studyAppropriate: string;
  dataConsent: string;
  ageConsent: boolean;
  paymentScreenshot: File | null;
}

const initialData: FormData = {
  email: "", name: "", dob: "", ageGroup: "", place: "", country: "",
  category: "", partnerInstitution: "", mobile: "", hasInternet: "",
  commitmentLikelihood: "",
  receivingTreatment: "", treatmentOngoing: "", recentExperiences: [], diagnoses: [],
  stressFrequency: "", currentExperiences: [], currentlyInTherapy: "",
  studyAppropriate: "", dataConsent: "", ageConsent: false, paymentScreenshot: null,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function RadioGroup({ name, options, value, onChange, required }: {
  name: string; options: string[]; value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 mt-2">
      {options.map((opt) => (
        <label
          key={opt}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all text-sm ${
            value === opt
              ? "border-primary bg-primary/5 text-primary font-medium"
              : "border-border hover:border-primary/40 text-foreground"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            required={required}
            className="accent-teal-600 w-4 h-4 shrink-0"
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

function CheckboxGroup({ options, selected, onChange, required }: {
  options: string[]; selected: string[];
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 mt-2">
      {options.map((opt) => (
        <label
          key={opt}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all text-sm ${
            selected.includes(opt)
              ? "border-primary bg-primary/5 text-primary font-medium"
              : "border-border hover:border-primary/40 text-foreground"
          }`}
        >
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => onChange(opt)}
            required={required && selected.length === 0}
            className="accent-teal-600 w-4 h-4 shrink-0"
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-semibold text-foreground mb-1">
      {children} {required && <span className="text-destructive">*</span>}
    </label>
  );
}

function TextInput({ id, name, type = "text", value, onChange, placeholder, required }: {
  id: string; name: string; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; required?: boolean;
}) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors bg-input-background text-sm"
    />
  );
}

// ─── Section components ───────────────────────────────────────────────────────

function Section1({ data, update }: { data: FormData; update: (patch: Partial<FormData>) => void }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    update({ [e.target.name]: e.target.value } as Partial<FormData>);

  return (
    <div className="space-y-6">
      <div>
        <FieldLabel required>Email Address</FieldLabel>
        <TextInput id="email" name="email" type="email" value={data.email} onChange={handleChange} placeholder="you@email.com" required />
      </div>

      <div>
        <FieldLabel>Name</FieldLabel>
        <TextInput id="name" name="name" value={data.name} onChange={handleChange} placeholder="Your full name" />
      </div>

      <div>
        <FieldLabel required>Date of Birth</FieldLabel>
        <TextInput id="dob" name="dob" type="date" value={data.dob} onChange={handleChange} required />
      </div>

      <div>
        <FieldLabel required>Age Group</FieldLabel>
        <RadioGroup
          name="ageGroup"
          options={["18–25", "26–30", "30–40", "40–50", "50+"]}
          value={data.ageGroup}
          onChange={(v) => update({ ageGroup: v })}
          required
        />
      </div>

      <div>
        <FieldLabel required>Place (City, State)</FieldLabel>
        <TextInput id="place" name="place" value={data.place} onChange={handleChange} placeholder="e.g. Mumbai, Maharashtra" required />
      </div>

      <div>
        <FieldLabel required>Country</FieldLabel>
        <TextInput id="country" name="country" value={data.country} onChange={handleChange} placeholder="e.g. India" required />
      </div>

      <div>
        <FieldLabel required>Which category best describes you currently?</FieldLabel>
        <RadioGroup
          name="category"
          options={[
            "Student",
            "Working Professional",
            "Homemaker / Caregiver",
            "Transition Phase (e.g., preparing for exams, career break, job switch)",
          ]}
          value={data.category}
          onChange={(v) => update({ category: v })}
          required
        />
      </div>

      <div>
        <FieldLabel required>Which of the following best describes your association with our partner institutions?</FieldLabel>
        <RadioGroup
          name="partnerInstitution"
          options={[
            "Chandigarh University – Current Student",
            "Chandigarh University – Faculty/Staff Member",
            "Chandigarh University – Recent Graduate (within the last 1 year)",
            "TIME Institute – Current Student",
            "TIME Institute – Faculty/Staff Member",
            "None of the above",
          ]}
          value={data.partnerInstitution}
          onChange={(v) => update({ partnerInstitution: v })}
          required
        />
      </div>

      <div>
        <FieldLabel required>Mobile Number (Country Code, Number)</FieldLabel>
        <TextInput id="mobile" name="mobile" type="tel" value={data.mobile} onChange={handleChange} placeholder="+91 98765 43210" required />
      </div>

      <div>
        <FieldLabel required>Do you have access to a smartphone and stable internet on a daily basis?</FieldLabel>
        <RadioGroup
          name="hasInternet"
          options={["Yes", "No"]}
          value={data.hasInternet}
          onChange={(v) => update({ hasInternet: v })}
          required
        />
      </div>

      <div>
        <FieldLabel required>How likely are you to commit approximately 15 to 20 minutes per day to using a wellness app for 4 consecutive weeks?</FieldLabel>
        <RadioGroup
          name="commitmentLikelihood"
          options={["Very unlikely", "Unlikely", "Not sure", "Likely", "Very likely"]}
          value={data.commitmentLikelihood}
          onChange={(v) => update({ commitmentLikelihood: v })}
          required
        />
      </div>
    </div>
  );
}

function Section2({ data, update }: { data: FormData; update: (patch: Partial<FormData>) => void }) {
  const toggleArr = (key: "recentExperiences" | "diagnoses", val: string) => {
    const arr = data[key];
    update({ [key]: arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val] });
  };

  return (
    <div className="space-y-8">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800 leading-relaxed">
        The following questions help us ensure this study is appropriate for you. This is not a clinical assessment, we simply want to make sure you receive the right kind of support. Please answer honestly. Your responses are confidential.
      </div>

      <div>
        <FieldLabel required>Are you currently receiving treatment from a psychiatrist or psychologist for a diagnosed mental health condition?</FieldLabel>
        <RadioGroup
          name="receivingTreatment"
          options={["Yes", "No", "Prefer not to say"]}
          value={data.receivingTreatment}
          onChange={(v) => update({ receivingTreatment: v })}
          required
        />
      </div>

      <div>
        <FieldLabel required>(If Yes) Is this treatment ongoing and active, meaning you are currently attending regular sessions or taking prescribed psychiatric medication?</FieldLabel>
        <RadioGroup
          name="treatmentOngoing"
          options={["Yes", "No"]}
          value={data.treatmentOngoing}
          onChange={(v) => update({ treatmentOngoing: v })}
          required
        />
      </div>

      <div>
        <FieldLabel required>In the past month, have you experienced any of the following? Please select all that apply.</FieldLabel>
        <CheckboxGroup
          options={[
            "Severe depressive episodes, lasting feelings of hopelessness, or inability to carry out daily tasks",
            "Thoughts of self-harm, suicide, or wishing you were not alive",
            "Experiencing reality differently from others (e.g., hearing voices, having beliefs others do not share, hallucinations)",
            "Severe mood swings that significantly disrupt your life (e.g., periods of extreme high energy/mania followed by deep lows)",
            "A recent traumatic event or currently experiencing severe symptoms of PTSD (e.g., frequent flashbacks, severe panic attacks)",
            "None of the above",
            "Prefer not to say",
          ]}
          selected={data.recentExperiences}
          onChange={(v) => toggleArr("recentExperiences", v)}
          required
        />
      </div>

      <div>
        <FieldLabel required>Have you ever been diagnosed with any of the following conditions by a medical or mental health professional? Select all that apply.</FieldLabel>
        <CheckboxGroup
          options={[
            "Clinical Depression (Major Depressive Disorder)",
            "Bipolar Disorder",
            "Schizophrenia or other psychotic disorders",
            "Borderline Personality Disorder (BPD)",
            "Severe Anxiety Disorder (e.g., Panic Disorder, OCD, PTSD)",
            "Substance Use Disorder",
            "None of the above",
            "Prefer not to say",
          ]}
          selected={data.diagnoses}
          onChange={(v) => toggleArr("diagnoses", v)}
          required
        />
      </div>
    </div>
  );
}

function Section3({ data, update }: { data: FormData; update: (patch: Partial<FormData>) => void }) {
  const toggleExp = (val: string) => {
    const arr = data.currentExperiences;
    update({ currentExperiences: arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val] });
  };

  return (
    <div className="space-y-8">
      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 text-sm text-teal-800 leading-relaxed">
        The following questions help us understand whether the platform is suitable for your current needs and experiences. This platform is designed for individuals who may be facing common day-to-day emotional challenges such as stress, overthinking, self-doubt, loneliness, difficulty managing emotions, or navigating life transitions. It is intended to support emotional well-being, self-awareness, and personal growth.
      </div>

      <div>
        <FieldLabel required>In the past 2 weeks, how often have you felt stressed, overwhelmed, or emotionally drained?</FieldLabel>
        <RadioGroup
          name="stressFrequency"
          options={["Never", "Rarely", "Sometimes", "Often", "Almost always"]}
          value={data.stressFrequency}
          onChange={(v) => update({ stressFrequency: v })}
          required
        />
      </div>

      <div>
        <FieldLabel required>Which of the following do you currently experience? Please select all that apply.</FieldLabel>
        <CheckboxGroup
          options={[
            "Difficulty identifying or understanding my emotions",
            "General worry, anxiety, or overthinking in everyday life",
            "Trouble sleeping because of stress, worry, or overthinking",
            "Difficulty managing everyday stress",
            "Low motivation or difficulty staying engaged with goals",
            "Uncertainty about who I am, what I want, or where I am headed",
            "Academic, career, or future-related pressure",
            "Difficulty making decisions or feeling overwhelmed by responsibilities ('adulting')",
            "Low confidence, self-doubt, or negative self-talk",
            "Concerns about body image or appearance",
            "Frequently comparing myself to others or feeling behind in life",
            "Feeling disconnected from the people around me",
            "Experiencing loneliness or a lack of meaningful connection",
            "Difficulty saying no or setting healthy boundaries in relationships",
            "Navigating changes in friendships or social circles",
            "Navigating challenges in romantic relationships",
            "Feeling stuck during a life transition (e.g., graduation, career change, relocation, relationship changes)",
            "None of the above",
          ]}
          selected={data.currentExperiences}
          onChange={toggleExp}
          required
        />
      </div>

      <div>
        <FieldLabel required>Are you currently attending therapy or counselling?</FieldLabel>
        <RadioGroup
          name="currentlyInTherapy"
          options={["Yes", "No"]}
          value={data.currentlyInTherapy}
          onChange={(v) => update({ currentlyInTherapy: v })}
          required
        />
      </div>
    </div>
  );
}

function Section4({ data, update }: { data: FormData; update: (patch: Partial<FormData>) => void }) {
  return (
    <div className="space-y-8">
      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 text-sm text-teal-800 leading-relaxed">
        <strong>Please read carefully before providing your consent.</strong><br /><br />
        By proceeding, you confirm that you are <strong>18 years of age or older</strong>, have understood the participant information provided, understand that <strong>participation is voluntary</strong> and that you may withdraw at any time, and acknowledge that ManoBandhu is intended to support emotional well-being and self-reflection and is <strong>not a substitute for emergency or crisis support services</strong>.
      </div>

      <div>
        <FieldLabel required>
          ManoDweep is a gamified daily wellness platform. It is not a clinical tool and it is <strong>not a substitute for therapy or psychiatric care</strong>. It is designed to support everyday emotional well-being through structured daily practices. Based on this, do you feel this study is appropriate for you at this time?
        </FieldLabel>
        <RadioGroup
          name="studyAppropriate"
          options={["Yes, this feels right for me", "I am not sure", "No"]}
          value={data.studyAppropriate}
          onChange={(v) => update({ studyAppropriate: v })}
          required
        />
      </div>

      <div>
        <FieldLabel required>
          Are you willing to share anonymised in-app usage data, including which destinations you visited, how frequently, and your emotional check-in ratings, with the research team for the purpose of this study?
        </FieldLabel>
        <p className="text-xs text-muted-foreground mb-2">Your data will never be shared with anyone outside the research team and will be stored securely.</p>
        <RadioGroup
          name="dataConsent"
          options={["Yes", "No"]}
          value={data.dataConsent}
          onChange={(v) => update({ dataConsent: v })}
          required
        />
      </div>

      {/* Payment Section */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-teal-200 rounded-2xl p-6 space-y-4">
        <h4 className="text-teal-700 font-bold text-base">Participation Payment: ₹199</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          To confirm your enrolment in the ManoDweep Pilot Study, please make a one-time participation payment of <strong>₹199</strong> (India) / <strong>$10</strong> (International) using the QR code below.
        </p>

        {/* QR Code — IDFC FIRST Bank */}
        <div className="flex flex-col items-center gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-md border border-teal-100 flex items-center justify-center max-w-[240px]">
            <img
              src="/images/qr.webp"
              alt="ManoBandhu IDFC FIRST Bank UPI QR Code"
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
          <div className="text-center">
            <p className="text-xs font-semibold text-teal-700 mb-1">IDFC FIRST Bank · UPI</p>
            <p className="text-sm font-medium text-foreground bg-white/50 px-3 py-1 rounded-md border border-teal-100/50 select-all">
              manobandhu7385@idfcbank
            </p>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            For payment queries, call/WhatsApp: <a href="tel:8087151656" className="text-teal-600 font-medium hover:underline">8087151656</a>
          </p>
        </div>

        <p className="text-xs text-muted-foreground italic">
          For international participants: bank details for payment transfer will be shared via email after form submission.
        </p>

        <div>
          <FieldLabel required>Upload Payment Screenshot</FieldLabel>
          <p className="text-xs text-muted-foreground mb-2">Transaction number should be visible in the screenshot.</p>
          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => update({ paymentScreenshot: e.target.files?.[0] ?? null })}
            className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-teal-100 file:text-teal-700 hover:file:bg-teal-200 cursor-pointer"
          />
          {data.paymentScreenshot && (
            <p className="text-xs text-teal-600 mt-2">✓ {data.paymentScreenshot.name} uploaded</p>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          An invoice/receipt will be shared with you via email within <strong>24 hours</strong> of successful payment verification.
        </p>
      </div>

      {/* Final consent checkbox */}
      <label className="flex items-start gap-3 cursor-pointer bg-white border-2 border-border rounded-2xl p-5 hover:border-primary transition-colors">
        <input
          type="checkbox"
          checked={data.ageConsent}
          onChange={(e) => update({ ageConsent: e.target.checked })}
          className="accent-teal-600 w-5 h-5 mt-0.5 shrink-0"
        />
        <span className="text-sm text-muted-foreground leading-relaxed">
          I confirm that I have read the study information provided, I understand what participation involves, I meet the eligibility criteria described, and I am voluntarily choosing to take part in this research. <span className="text-destructive">*</span>
        </span>
      </label>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const SECTIONS = [
  { title: "Basic Information", subtitle: "Section 1 of 4" },
  { title: "Current Mental Health Status", subtitle: "Section 2 of 4" },
  { title: "Everyday Emotional Well-being", subtitle: "Section 3 of 4" },
  { title: "Suitability & Consent", subtitle: "Section 4 of 4" },
];

export function PilotStudyPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);

  const update = (patch: Partial<FormData>) => setData((prev) => ({ ...prev, ...patch }));

  const next = () => {
    if (step < SECTIONS.length - 1) setStep(step + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const back = () => {
    if (step > 0) setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.ageConsent) {
      toast.error("Please confirm your age and consent before submitting.");
      return;
    }
    setSubmitted(true);
    toast.success("Registration submitted! We'll be in touch soon.");
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-12 max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-teal-700 mb-4">You're Registered!</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Thank you for registering for the ManoBandhu Pilot Study. Our team will verify your details and payment, then reach out with your login credentials.
          </p>
          <div className="bg-teal-50 rounded-2xl p-6 mb-8 border border-teal-100">
            <p className="text-teal-700 font-medium text-sm">
              🌱 Just by showing up here, you've taken the first step toward a kinder relationship with your mind.
            </p>
          </div>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-full shadow-md hover:opacity-90 transition-opacity"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-emerald-50">
      {/* Hero */}
      <section
        className="pb-16 text-white"
        style={{
          background: 'linear-gradient(135deg, #2B6E6A 0%, #3D8C87 35%, #5BA4A0 65%, #7DB5A0 100%)',
          paddingTop: 'calc(var(--nav-h, 80px) + 2rem)'
        }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full mb-6 text-sm font-medium border border-white/20"
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#A8F0EB' }} />
            Pilot Study: Early Access Open
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white mb-4 text-4xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Pilot Study Registration Form
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            <strong>ManoDweep (Island of the Mind)</strong> is a gamified daily mind-care platform. As a participant, you will use the platform for approximately <strong>20–30 minutes per day for 8 weeks</strong>.
          </motion.p>

          {/* What you receive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 text-left max-w-2xl mx-auto border border-white/20 shadow-lg"
          >
            <p className="text-white font-semibold mb-3 text-lg">What will you receive?</p>
            <ul className="space-y-3 text-white/90 text-sm">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 shrink-0" style={{ color: '#FEFFD3' }} />
                <span className="leading-tight mt-0.5">2-month access to ManoDweep at a subsidised rate of <strong>₹199 (India)</strong> / <strong>$10 (International)</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 shrink-0" style={{ color: '#FEFFD3' }} />
                <span className="leading-tight mt-0.5">Certificate of Participation upon study completion (if selected)</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 shrink-0" style={{ color: '#FEFFD3' }} />
                <span className="leading-tight mt-0.5">Opportunity to contribute to an innovative mental well-being platform</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" style={{ color: '#A8F0EB' }} />
                <span className="leading-tight mt-0.5"><strong>Top 5 participants</strong> based on engagement, consistency, and participation will receive special rewards/goodies</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Progress bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-border shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-foreground">{SECTIONS[step].title}</p>
            <p className="text-xs text-muted-foreground">{SECTIONS[step].subtitle}</p>
          </div>
          <div className="flex gap-2">
            {SECTIONS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  i <= step ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <section className="py-10 px-4 pb-24">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={step === SECTIONS.length - 1 ? handleSubmit : (e) => { e.preventDefault(); next(); }}>
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-teal-100"
            >
              <h2 className="text-teal-700 mb-1 text-2xl font-bold">{SECTIONS[step].title}</h2>
              <p className="text-xs text-muted-foreground mb-8">{SECTIONS[step].subtitle}</p>

              {step === 0 && <Section1 data={data} update={update} />}
              {step === 1 && <Section2 data={data} update={update} />}
              {step === 2 && <Section3 data={data} update={update} />}
              {step === 3 && <Section4 data={data} update={update} />}
            </motion.div>

            {/* Navigation */}
            <div className="flex gap-4 mt-6">
              {step > 0 && (
                <button
                  type="button"
                  onClick={back}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-border rounded-xl text-foreground font-medium hover:border-primary hover:text-primary transition-colors text-sm"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              )}

              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white rounded-xl font-semibold shadow-lg transition-all hover:scale-[1.01] text-sm"
              >
                {step === SECTIONS.length - 1 ? (
                  <><Check className="w-5 h-5" /> Submit Registration</>
                ) : (
                  <>Continue <ChevronRight className="w-5 h-5" /></>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
