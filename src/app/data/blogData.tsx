import { ReactNode } from "react";

export interface BlogContent {
  id: number;
  title: string;
  author: string;
  authorRoles: string[];
  date: string;
  readTime: string;
  categories: string[];
  image: string;
  content: ReactNode;
}

export const blogs: Record<number, BlogContent> = {
  1: {
    id: 1,
    title: "Why I Built ManoBandhu — And Why I Wish I Didn't Have To",
    author: "Samruddhi",
    authorRoles: ["Founder — ManoBandhu"],
    date: "March 5, 2026",
    readTime: "5 min read",
    categories: ["Founder's Note", "Mental Health", "ManoBandhu"],
    image: "/founderNote.jpg",
    content: (
      <div className="space-y-8 text-gray-800 leading-relaxed text-lg">
        <p className="italic text-xl text-gray-700 font-serif border-l-4 border-emerald-500 pl-6 my-10">
          There is a specific kind of exhaustion that has nothing to do with sleep.
        </p>
        <p>
          It is the exhaustion of holding too much for too long without language for it. The exhaustion of feeling things you cannot name, carrying weight you cannot explain, and showing up every day to a world that never asks how you are — really.
        </p>
        <p>
          I know this exhaustion. I've lived in it. And for a long time, I thought the solution was simple: go to therapy, meditate more, be more positive. I tried all three. They helped, in pieces. But something was always missing.
        </p>
        <p>
          The missing piece wasn't a technique. It wasn't a habit tracker or a journaling prompt. It was something much more fundamental: the belief that I deserved daily emotional care — not just when I was falling apart, but on an ordinary Wednesday when nothing was technically wrong and yet everything felt heavy.
        </p>
        <p>
          We have built a world where emotional support is reserved for crisis. Where you have to hit rock bottom before anyone takes your inner life seriously — including yourself.
        </p>
        <p>
          I spent years reading. Psychology books, philosophy, memoir, poetry. I talked to people — deeply, honestly, in a way most conversations don't allow. I went through therapy, not once but several times, with different practitioners and different questions each time. And somewhere in all of that, I began to understand something:
        </p>
        <p>
          Mental health is not an event. It is not something that happens to you in a therapist's office. It is built — slowly, daily, in the small choices you make about how you relate to yourself and the world. Whether you let yourself rest without guilt. Whether you can name what you're feeling before it names you. Whether you have even one person in your life with whom you can take off the mask.
        </p>
        <h3 className="text-3xl font-serif text-emerald-900 mt-12 mb-6">What I Saw Around Me</h3>
        <p>
          I looked around and saw a generation that is more aware of mental health than any generation before it — and yet more burned out, more anxious, more disconnected than ever. We know the vocabulary. We say 'nervous system' and 'triggers' and 'boundaries.' But knowing the words is not the same as doing the work.
        </p>
        <p>
          I also saw the gaps in what was available. Apps that reduce mental health to a 10-minute meditation. Platforms that feel clinical and cold. Tools that treat emotional care like a productivity hack. And I saw what was completely missing: something warm. Something daily. Something that met you in the ordinary moments — not just the emergency ones.
        </p>
        <h3 className="text-3xl font-serif text-emerald-900 mt-12 mb-6">So I Started Building</h3>
        <p>
          ManoBandhu means 'Friend of the Mind' in Sanskrit. That is exactly what I wanted to create. Not a mental health app in the clinical sense. Not a therapist substitute. A daily companion — something that shows up with you every morning and every night, that helps you see yourself more clearly over time.
        </p>
        <p>
          I am not a psychologist. I want to say that clearly. My education is in business — MBA, analytics, operations. But I have spent years learning about the human mind through the only sources I trust: books, lived experience, honest conversations, and therapy. I built ManoBandhu because I believed someone had to — and because I understand both the human need and the system design required to serve it.
        </p>
        <p>
          ManoBandhu is not therapy. It is not meditation. It is the daily emotional practice that makes everything else — including therapy — more powerful.
        </p>
        <p>
          We are building a universe. Literally — a world inside the app where each space serves a different dimension of your emotional life. Morning rituals to open the day. Evening rituals to close it. A space to sit with difficult feelings. A space to see your patterns over time. A community of real people choosing to do this work.
        </p>
        <p>
          And all of it built on one belief:
        </p>
        <p className="font-serif text-2xl text-emerald-800 text-center py-8">
          "You do not have to wait for a crisis to deserve care. Your emotional life deserves daily attention, not just emergency response."
        </p>
        <p>
          If you've been waiting for something like this — something honest, something warm, something that doesn't make you feel broken for needing support — then ManoBandhu is for you.
        </p>
        <p>
          We are building it now. Come with us.
        </p>
        <div className="mt-16 pt-10 border-t border-gray-200">
          <p className="italic text-gray-600">Written with honesty and a lot of chai.</p>
          <p className="font-serif text-xl text-emerald-900">— Samruddhi, Founder — ManoBandhu</p>
        </div>
      </div>
    )
  },
  2: {
    id: 2,
    title: "We Only Talk About Mental Health When Someone Is Already Drowning",
    author: "Samruddhi",
    authorRoles: ["Psychoeducation", "Prevention"],
    date: "March 3, 2026",
    readTime: "5 min read",
    categories: ["Mental Health", "Prevention", "Current Reality"],
    image: "/mentalHealth.jpg",
    content: (
      <div className="space-y-8 text-gray-800 leading-relaxed text-lg">
        <p className="text-xl font-medium">Picture this.</p>
        <p>
          Someone you know — a colleague, a friend, a family member — is struggling. Not dramatically. Not visibly. They're still showing up. Still replying to messages. Still smiling at the right moments. But something is off. They're a little quieter. A little more tired. A little more brittle when small things go wrong.
        </p>
        <p>
          Nobody asks. Because nobody knows what to ask, exactly. And because we have learned — collectively, culturally — to wait.
        </p>
        <p>
          We wait for the breakdown. We wait for the crisis. We wait for the moment when someone finally cannot hold it together anymore, and only then do we say: <strong>you should get help.</strong>
        </p>
        <p className="italic text-xl text-gray-700 font-serif border-l-4 border-emerald-500 pl-6 my-10">
          We have built a mental health culture that responds to drowning. We have almost no infrastructure for teaching people to swim.
        </p>
        <h3 className="text-3xl font-serif text-emerald-900 mt-12 mb-6">The Numbers Tell a Quiet Story</h3>
        <p>
          India is home to the largest population of young people in the world. According to the World Health Organization, nearly 7.5% of India's population suffers from some form of mental disorder. But here is the number that I find more telling than any other: the treatment gap.
        </p>
        <p className="text-2xl font-serif text-emerald-800">
          Over 80% of people in India who need mental health support never receive it.
        </p>
        <p>
          Some of this is stigma. Some of it is cost. Some of it is geography — mental health professionals are overwhelmingly concentrated in urban centres. But some of it — a significant part — is because we have only built systems for people who are already in crisis. If you are managing, you are not in the system at all.
        </p>
        <p>
          'Managing' has become our baseline. And we have accepted it as though it is good enough.
        </p>
        <h3 className="text-3xl font-serif text-emerald-900 mt-12 mb-6">What the Workplace Looks Like</h3>
        <p>
          I have spoken with people across industries — startups, corporates, education, healthcare — and a pattern emerges with uncomfortable consistency. People are functioning at a level that looks fine from the outside and feels barely sustainable from the inside.
        </p>
        <p>
          There is a specific kind of high-functioning distress that the modern workplace has quietly normalised. The person who delivers everything on time, never misses a deadline, and goes home completely hollowed out. The manager who holds her team together and has nobody holding her. The young professional who is ambitious and exhausted and has not yet found the language to say: I am not okay.
        </p>
        <p>
          Burnout does not arrive suddenly. It is built, brick by quiet brick, over months or years of ignoring the signals that the system is under too much pressure.
        </p>
        <p>
          By the time someone reaches out for help — if they ever do — they are not at the beginning of a problem. They are at the end of a very long silence.
        </p>
        <h3 className="text-3xl font-serif text-emerald-900 mt-12 mb-6">What Prevention Actually Means</h3>
        <p>
          Prevention is not telling people to be more resilient. That framing places the burden entirely on the individual and ignores the systems, relationships, and environments that shape mental health.
        </p>
        <p>
          Real prevention is much simpler than the word implies. It means building daily awareness of how we are doing before we stop being able to function. It means creating spaces — in our personal lives, our workplaces, our families — where emotional honesty is safe. It means treating mental health like physical health: something that requires daily maintenance, not just emergency treatment.
        </p>
        <p>
          When someone goes for a routine health check, we do not assume they are ill. We assume they are being sensible. A mental health check-in — whether through a daily practice, a conversation, an app, or a reflection — should carry the same social meaning.
        </p>
        <p>
          Not 'something must be wrong.' Just: this is what sensible people do.
        </p>
        <h3 className="text-3xl font-serif text-emerald-900 mt-12 mb-6">What Needs to Change</h3>
        <p>
          I think the shift needs to happen at three levels.
        </p>
        <ul className="list-disc pl-8 space-y-4">
          <li><strong>At the personal level:</strong> the belief that you have to be in crisis to deserve support. This belief is so deeply embedded that most people do not even recognise it as a belief. They think it is just reality. It is not. You deserve care on an ordinary Tuesday when nothing is technically wrong.</li>
          <li><strong>At the community level:</strong> the normalisation of mental health conversations. Not as awareness campaigns on specific dates, but as a part of how we talk to each other every day. Checking in with depth. Asking 'how are you' and actually wanting to know.</li>
          <li><strong>At the systemic level:</strong> investment in preventive mental health infrastructure — not just more beds in psychiatric hospitals, not just more crisis lines, but daily tools, community programmes, and workplace cultures that build emotional literacy before it becomes urgency.</li>
        </ul>
        <p>
          The goal is not to have fewer people in crisis. The goal is to build a world where the crisis never had to happen.
        </p>
        <h3 className="text-3xl font-serif text-emerald-900 mt-12 mb-6">This Is Why ManoBandhu Exists</h3>
        <p>
          ManoBandhu is not being built for people who are broken. It is being built for people who are alive — busy, tired, striving, feeling things they haven't named, carrying things nobody sees — and who deserve a daily space to pay attention to their inner life.
        </p>
        <p>
          The app, the community, the events, the conversations we're starting on social media — all of it is in service of one idea. That mental health is a daily practice, and that practice deserves to begin now. Not when things fall apart. Now.
        </p>
        <p className="font-serif text-2xl text-emerald-800 text-center py-8">
          "The best time to build the foundation is before the storm. And you are worth the effort it takes to do that."
        </p>
        <div className="mt-16 pt-10 border-t border-gray-200">
          <p className="font-serif text-xl text-emerald-900">Abhi. Not when you are drowning. Now.</p>
          <p className="font-serif text-xl text-emerald-900">— Samruddhi</p>
        </div>
      </div>
    )
  },
  3: {
    id: 3,
    title: "The Relationship That Hurts the Most Is the One You Cannot Name",
    author: "Dr. Pravin Vadgave",
    authorRoles: ["MD Homeopath", "Co-Founder, ManoBandhu"],
    date: "March 1, 2026",
    readTime: "6 min read",
    categories: ["Relationships", "Mental Health", "Emotional Wellness"],
    image: "/relationship.jpg",
    content: (
      <div className="space-y-8 text-gray-800 leading-relaxed text-lg">
        <p className="italic text-xl text-gray-700 font-serif border-l-4 border-emerald-500 pl-6 my-10">
          In my years of practice, patients rarely walk in and say: 'I am struggling in my relationship.'
        </p>
        <p>
          They come in with headaches that return every Sunday evening. With a chest tightness that no cardiac investigation can explain. With sleeplessness that arrives, reliably, after every visit to a particular person's home. With skin conditions that flare in certain seasons — seasons that, when we trace them back, align with anniversaries, with estrangements, with unspoken grief.
        </p>
        <p>
          The body speaks what the mind has not yet found language for. And in my experience, more often than not, what the body is speaking is: <strong>something in my closest relationships is hurting me, and I do not know how to say it.</strong>
        </p>
        <p>
          The most common source of chronic suffering I see is not disease in the conventional sense. It is the unprocessed weight of broken, complicated, or emotionally starved relationships.
        </p>
        <h3 className="text-3xl font-serif text-emerald-900 mt-12 mb-6">What We Mean When We Say 'Relationship Problems'</h3>
        <p>
          When people hear 'relationship problems,' they often think of dramatic situations — infidelity, separation, visible conflict. But the kind of relational pain I encounter most frequently in practice is far quieter than that.
        </p>
        <p>
          It is the adult child who has never been able to fully please a parent, no matter what they achieve. The spouse who feels alone inside a marriage that looks perfectly functional from the outside. The person who has friends but no one who truly knows them. The professional who is admired by colleagues and unknown to themselves.
        </p>
        <p>
          It is the loneliness of being surrounded by people and still feeling unseen. It is the exhaustion of performing wellness while carrying heaviness. It is the grief of relationships that should have nourished and instead depleted.
        </p>
        <p>
          None of these are dramatic. All of them are real. All of them take a toll.
        </p>
        <h3 className="text-3xl font-serif text-emerald-900 mt-12 mb-6">What Relational Pain Does to the Body and Mind</h3>
        <p>
          We have known for decades — through research on attachment theory, on adverse childhood experiences (ACEs), on the neuroscience of social connection — that our relationships are not separate from our health. They are part of it.
        </p>
        <p>
          Chronic relational stress activates the same physiological stress response as physical threat. Cortisol rises. Inflammation increases. Sleep quality drops. The immune system, which requires rest and safety to function optimally, is chronically taxed. Over years, this becomes the invisible background radiation of a life — present everywhere, attributed to everything except its true source.
        </p>
        <p>
          In homeopathic practice, we are trained to look at the whole person — the constitutional picture. And what I find, again and again, is that chronic physical symptoms very often have a relational and emotional history that precedes them by months or years.
        </p>
        <p>
          The person does not become unwell one day. They carry something, quietly, for a long time — and eventually, the body finds a way to insist it be acknowledged.
        </p>
        <h3 className="text-3xl font-serif text-emerald-900 mt-12 mb-6">The Three Relationships That Shape Everything</h3>
        <p>In my observation, there are three relational dynamics that — when they are unhealthy — create the most pervasive suffering:</p>
        <ul className="list-disc pl-8 space-y-4">
          <li><strong>The relationship with a primary caregiver (parent, or whoever raised you).</strong> This shapes the template for all other relationships — how safe you believe love is, whether you expect to be abandoned or accepted, whether you feel fundamentally deserving of care.</li>
          <li><strong>The relationship with a romantic partner or spouse.</strong> This is where our deepest wounds tend to surface, because intimacy asks us to be known — and being known is both what we want most and what we often fear most.</li>
          <li><strong>The relationship with ourselves.</strong> This is the one that is most often overlooked, and the one that determines the quality of every other relationship. How you speak to yourself in private. Whether you believe you are worthy of gentleness. Whether you are able to sit with your own company without restlessness.</li>
        </ul>
        <p>
          When any of these three relationships is significantly broken, it does not stay contained. It bleeds into everything — our work, our health, our ability to be present with the people we love.
        </p>
        <h3 className="text-3xl font-serif text-emerald-900 mt-12 mb-6">What Healing Looks Like — And Where It Begins</h3>
        <p>
          I want to be honest here: relational healing is not quick. It is not a course, a supplement, or a single conversation. It is a slow, patient process of becoming aware, of learning new responses, of grieving what was not given and discovering it can still be built.
        </p>
        <p>
          But healing does have a beginning. And the beginning is almost always the same: <strong>acknowledgement.</strong> Naming what is actually happening, even to yourself — especially to yourself — before anyone else.
        </p>
        <p>
          This is where tools like ManoBandhu come in. Not as a substitute for the deeper relational work, but as a daily space to begin building the internal awareness that makes that work possible. The Relational Mapping in our night ritual is not an exercise in judging your relationships. It is an exercise in noticing — honestly and without pressure — where you feel safe, where you feel guarded, and where the distance between those two things is telling you something.
        </p>
        <p>
          You cannot heal what you have not first acknowledged. And you cannot acknowledge what you have never allowed yourself to honestly see.
        </p>
        <p>
          If you are carrying something in your relationships — something you have not found the words for — I want you to know this: that weight is real. You are not imagining it. And you deserve to put it down, slowly, in your own time, with the right support.
        </p>
        <div className="mt-16 pt-10 border-t border-gray-200">
          <p className="font-serif text-xl text-emerald-900">That is what we are here for.</p>
          <p className="font-serif text-xl text-emerald-900">— Dr. Pravin Vadgave, MD Homeopath · Co-Founder, ManoBandhu</p>
        </div>
      </div>
    )
  },
  4: {
    id: 4,
    title: "When Your Body Is Saying What You Have Not Found Words For",
    author: "Dr. Pravin Vadgave",
    authorRoles: ["MD Homeopath", "Co-Founder, ManoBandhu"],
    date: "February 28, 2026",
    readTime: "5 min read",
    categories: ["Mind-Body", "Mental Health", "Psychosomatic Awareness"],
    image: "/mind-and-body.jpg",
    content: (
      <div className="space-y-8 text-gray-800 leading-relaxed text-lg">
        <p>
          A patient once came to me with persistent lower back pain. She had done the tests. She had seen the physiotherapist. She had changed her chair, her mattress, her posture. Nothing helped — or rather, things helped temporarily and then the pain returned, reliably, within days.
        </p>
        <p>
          When I took her full case — which in homeopathic practice means sitting with someone for a long time and asking questions that go well beyond the symptom — I discovered that the pain had started precisely eight months ago. At first she could not think of anything significant about that time. Then, slowly: her mother had been diagnosed with a serious illness. Her marriage had been under strain for longer than she wanted to admit. She had been holding things together — for her mother, for her children, for her husband — and she had not told a single person that she was struggling.
        </p>
        <p className="italic text-xl text-gray-700 font-serif border-l-4 border-emerald-500 pl-6 my-10">
          She had been carrying, quite literally, what she had nowhere to put. And her back, which carries the body, had taken on the metaphor.
        </p>
        <p>
          I do not claim that all physical symptoms have purely emotional origins. But I have practised long enough to know that the number of symptoms with a significant emotional component is far higher than most people — and many practitioners — are prepared to acknowledge.
        </p>
        <h3 className="text-3xl font-serif text-emerald-900 mt-12 mb-6">The Language the Body Speaks</h3>
        <p>
          The body communicates in physical symptoms when we do not give it another channel. This is not mysticism. It is the well-documented phenomenon of psychosomatic expression — the way emotional and psychological states find physical form when they are not processed through awareness, language, or relationship.
        </p>
        <p>
          Unexplained fatigue is often the body's way of saying: this load is too heavy for too long. Recurring gastrointestinal symptoms that no investigation can explain are frequently correlated with chronic anxiety. Skin conditions — eczema, psoriasis, hives — often flare under emotional stress in ways that are demonstrably connected to immune dysregulation triggered by psychological states.
        </p>
        <p>
          The gut-brain axis, the stress-immune connection, the cardiovascular impact of chronic emotional suppression — these are not alternative medicine claims. They are peer-reviewed science. And they point toward the same truth: <strong>the mind and the body are one system, and what happens in one happens in the other.</strong>
        </p>
        <h3 className="text-3xl font-serif text-emerald-900 mt-12 mb-6">Why We Do Not Listen</h3>
        <p>If the body is always communicating, why do we so often miss what it is saying?</p>
        <p>
          The honest answer is that we have been trained not to listen. We live in a culture that valorises pushing through — that treats physical symptoms as inconveniences to be managed rather than messages to be heard. We take the painkiller, the antacid, the sleep aid, and we get back to what we were doing. The symptom returns, and we take the medication again.
        </p>
        <p>
          I am not against medication. Medicine saves lives and I am grateful for it. But there is a category of symptom — the recurring, the unexplained, the one that keeps returning despite treatment — that is asking for a different kind of attention. Not just pharmacological management, but genuine inquiry: <strong>what is happening in this person's life? What are they carrying? What have they not said?</strong>
        </p>
        <h3 className="text-3xl font-serif text-emerald-900 mt-12 mb-6">What Emotional Awareness Does to the Body</h3>
        <p>
          When we build a daily practice of emotional awareness — when we regularly check in with what we are feeling, when we name it, when we create even small moments of acknowledgement — we are not doing something abstract or self-indulgent. We are actively intervening in our physiology.
        </p>
        <p>
          Naming an emotion activates the prefrontal cortex — the reflective brain — and reduces activity in the amygdala, which governs threat response. In simple terms: when you name what you feel, you turn down the alarm. The nervous system receives a signal that it is safe to come out of threat mode. Cortisol drops. Heart rate variability improves. The immune system has a better environment in which to do its work.
        </p>
        <p>
          This is why the morning and evening rituals in ManoBandhu are not optional extras. They are the core of what the platform does. The act of checking in with your emotional state at the beginning and end of each day — consistently, with honesty — is one of the most concrete things you can do for your long-term health.
        </p>
        <p className="text-xl font-medium text-emerald-800">
          Five minutes of genuine emotional check-in, done consistently, does more for the health of the nervous system than most supplements. It is not a luxury. It is maintenance.
        </p>
        <h3 className="text-3xl font-serif text-emerald-900 mt-12 mb-6">A Different Way to Listen to Yourself</h3>
        <p>I want to leave you with a simple invitation, rooted in what I have seen work, over and over, in clinical practice.</p>
        <p>
          The next time you notice a physical symptom — a recurring pain, a tension that keeps returning, a fatigue that sleep does not fix — before you reach for a solution, sit with a question first: <strong>What is happening in my life right now that I have not made space to feel?</strong>
        </p>
        <p>
          You do not need to answer it completely. You do not need to trace it to a source. Just the question itself, asked with genuine curiosity rather than judgment, begins to open a different channel. And when the body has a channel, it does not need to shout so loudly.
        </p>
        <p>
          Your body is not your enemy. It is your oldest, most faithful companion — and it has always been trying to tell you the truth.
        </p>
        <div className="mt-16 pt-10 border-t border-gray-200">
          <p className="font-serif text-xl text-emerald-900">Start listening. ManoBandhu is here to help you build that practice, one day at a time.</p>
          <p className="font-serif text-xl text-emerald-900">— Dr. Pravin Vadgave, MD Homeopath · Co-Founder, ManoBandhu</p>
        </div>
      </div>
    )
  },
  5: {
    id: 5,
    title: "You Are Not Who You Were Taught to Be",
    author: "Kkomal Narsingani",
    authorRoles: ["Founding Member, ManoBandhu"],
    date: "February 25, 2026",
    readTime: "6 min read",
    categories: ["Identity", "Self-Understanding"],
    image: "/mentalHealth.jpg",
    content: (
      <div className="space-y-8 text-gray-800 leading-relaxed text-lg">
        <p className="italic text-xl text-gray-700 font-serif border-l-4 border-emerald-500 pl-6 my-10">
          In twenty years of sitting with people, I have heard hundreds of versions of the same sentence...
        </p>
        <p>
          It sounds different each time. ‘I don’t know who I am anymore.’ ‘I feel like I’ve been living someone else’s life.’ ‘I’ve done everything right and I still feel empty.’ ‘I don’t recognise myself.’
        </p>
        <p>
          Different words. The same question underneath all of them: <strong>who am I, really, when I take off all the layers I was given?</strong>
        </p>
        <p>
          This is one of the most honest questions a person can ask. And it is also, in my experience, one of the most frightening.
        </p>
        <p>
          Who you are is not something you discover once and then have. It is something you keep finding — slowly, carefully — over the course of a whole life.
        </p>
        <h3 className="text-3xl font-serif text-emerald-900 mt-12 mb-6">How We Learn to Be Who We Are</h3>
        <p>
          From the moment we arrive in the world, we begin learning — not through instruction but through watching and absorbing — who we are supposed to be.
        </p>
        <p>
          We learn what feelings are allowed. In some families, anger is dangerous; only sadness is permitted, and even that quietly. In others, sadness is seen as weakness; only achievement is celebrated. We learn which version of ourselves receives love, and we learn to show that version again and again — until, somewhere along the way, we stop knowing we are doing it at all.
        </p>
        <p>
          We learn our roles. The responsible one. The funny one. The one who doesn’t need much. The one who holds everything together. The peacemaker. The achiever. These roles are given to us early — often before we have words to question them — and they become so familiar that we start to feel like that is simply who we are.
        </p>
        <p>
          We learn what we must not be. The parts of ourselves that were met with disapproval or silence — the anger, the neediness, the big feelings, the grief — we learn to put those parts away. We get so good at hiding them that we eventually forget they are there at all.
        </p>
        <p>
          In the room, I often ask: ‘Who told you that this part of you was not okay? When did you first learn to hide it?’ The answer almost always points to something very early — and very ordinary.
        </p>
        <h3 className="text-3xl font-serif text-emerald-900 mt-12 mb-6">When Things Start to Feel Wrong</h3>
        <p>
          For most people, the question of who they really are does not arrive gently. It arrives as a crack in something.
        </p>
        <p>
          A relationship ends. A job that defined them disappears. A child grows up and leaves. A birthday passes and instead of celebration there is just a quiet, unsettling emptiness. And the person sitting across from me is not just dealing with what happened — they are dealing with the deeper feeling underneath: I don’t know who I am when I take this away.
        </p>
        <hr className="border-emerald-100 my-8" />
        <p>
          This is not falling apart. It is the beginning of something more real. It is the moment the old, borrowed sense of self starts to loosen enough for the true one to breathe.
        </p>
        <p>
          I have never met someone going through a real identity struggle who was not also, underneath the fear, very close to something more honest than anything they had been living before.
        </p>
        <h3 className="text-3xl font-serif text-emerald-900 mt-12 mb-6">What the Work Actually Looks Like</h3>
        <p>
          People sometimes come hoping I will hand them a new, clearer version of themselves. What I have found, over twenty years, is that the work moves the other way. Not adding things on. Slowly, gently taking things off — the layers that were put there for someone else’s comfort, not yours.
        </p>
        <p>It looks like:</p>
        <ul className="list-disc pl-8 space-y-4">
          <li>Noticing the difference between what you feel and what you have been taught you should feel</li>
          <li>Making room for the parts of you that have been pushed away — the anger, the need, the big joy, the grief — and letting them back in</li>
          <li>Learning to tell the difference between your own values and the ones you simply grew up with</li>
          <li>Discovering, sometimes with real surprise, what you actually want — not what you think you should want</li>
          <li>Building a relationship with yourself that is honest rather than critical</li>
        </ul>
        <p>
          This is not fast work. It is not dramatic. It happens in small, quiet moments, repeated over time. It is why I believe so deeply in a daily practice of reflection — not as a performance of wellness, but as the real, patient work of becoming more honestly yourself.
        </p>
        <h3 className="text-3xl font-serif text-emerald-900 mt-12 mb-6">What This Has to Do With Daily Practice</h3>
        <p>
          The morning check-in in ManoBandhu — the small act of pausing to ask how you are and what you want to feel today — is not a wellness routine. It is an identity practice.
        </p>
        <p>
          Every time you stop to notice what is actually happening inside you, rather than what is supposed to be happening, you are building the ability to know yourself. Every time you name a feeling honestly — even just to yourself — you are stepping away, in a small way, from the performance.
        </p>
        <p>
          Over time, these small moments add up to something real: a relationship with yourself that is more true than the one you inherited.
        </p>
        <p className="pt-8 border-t border-gray-100 italic text-gray-600">
          Carl Jung wrote: ‘I am not what happened to me. I am what I choose to become.’ That choosing begins here. In the quiet, daily act of asking: who am I today, underneath everything I have been asked to be?
        </p>
        <div className="mt-16 pt-10 border-t border-gray-200">
          <p className="font-serif text-xl text-emerald-900">— Kkomal Narsingani | Founding Member, ManoBandhu</p>
        </div>
      </div>
    )
  },
  6: {
    id: 6,
    title: "Boundaries Are Not Walls. They Are the Language of Self-Respect.",
    author: "Kkomal Narsingani",
    authorRoles: ["Founding Member, ManoBandhu"],
    date: "February 22, 2026",
    readTime: "6 min read",
    categories: ["Boundaries", "Relationships", "Emotional Health"],
    image: "/relationship.jpg",
    content: (
      <div className="space-y-8 text-gray-800 leading-relaxed text-lg">
        <p>
          The word ‘boundaries’ has become so common in wellness conversations that it has started to lose its meaning.
        </p>
        <p>
          People say it in a way that sometimes sounds like armour — as though a boundary is something you build to keep people out.
        </p>
        <p className="italic text-xl text-gray-700 font-serif border-l-4 border-emerald-500 pl-6 my-10">
          In twenty years of practice, I have sat with hundreds of people who struggle with limits. Not one of them was struggling because they had too many walls.
        </p>
        <p>
          They were struggling because they had learned, very early, that their own needs did not matter as much as everyone else’s.
        </p>
        <p>
          A limit is not a wall. It is a sentence. It is the sentence that tells the world — and yourself — where you end and someone else begins.
        </p>
        <p>
          A person who cannot say no is not someone without limits. They are someone who learned that having limits was dangerous, selfish, or unlovable. That learning happened somewhere. And it can be unlearned.
        </p>
        <h3 className="text-3xl font-serif text-emerald-900 mt-12 mb-6">Where These Struggles Really Come From</h3>
        <p>
          When someone tells me they cannot say no — to their parents, their partner, their colleagues, the endless demands of people around them — I do not hear a missing skill. I hear a story.
        </p>
        <p>
          I hear the child who learned that love came with conditions. Who discovered that the cost of saying no was too high — a parent’s anger, a cold silence, the feeling of being selfish — and who therefore kept saying yes long after yes had stopped being true.
        </p>
        <p>
          I hear the person who grew up watching the adults around them give and give without ever asking for anything back — and who learned to call that love.
        </p>
        <p>
          I hear the person who was told, in small and large ways, that their own needs were a burden. That good people put others first. That wanting things for yourself was something to be ashamed of.
        </p>
        <p>
          These are not failures. They are things we learned to get through. They worked once. But what helps us as children often holds us back as adults.
        </p>
        <h3 className="text-3xl font-serif text-emerald-900 mt-12 mb-6">What It Costs to Live Without Them</h3>
        <p>Living without limits is not noble. It is tiring.</p>
        <p>
          The person who cannot say no builds up quiet resentment with nowhere to go. It leaks into relationships as irritability, distance, a slow pulling away from the people they love. It shows up as a tiredness that sleep does not fix.
        </p>
        <p>
          The person who keeps giving past the point of having anything left does not become selfless. They become empty. And empty people cannot give freely. They give from obligation, from fear, from worry about what will happen if they stop. That is not love. That is surviving.
        </p>
        <p className="text-xl font-medium text-emerald-800">
          I often ask: when did you last do something that was just for you, with no explanation needed? The pause before they answer tells me a great deal.
        </p>
        <h3 className="text-3xl font-serif text-emerald-900 mt-12 mb-6">What Setting a Limit Actually Feels Like</h3>
        <p>Here is what nobody tells you about learning to say no: it feels terrible at first.</p>
        <p>
          Not because it is wrong. Because it is new. Because every part of you that learned ‘saying no is dangerous’ will sound the alarm the moment you try. The guilt, the worry, the urge to call back and apologise — these are not signs you did something wrong. They are signs your body is meeting something unfamiliar.
        </p>
        <p>
          That alarm is old. It was set when you were small and had no other choices. It does not mean what it says.
        </p>
        <p>
          Sitting with that discomfort — without immediately backing down — is one of the most important things a person can practise. It is not a conversation skill. It is a slow shift in how you see your own worth.
        </p>
        <p>
          Every time you say, gently and clearly, this is where I am and this is what I need — you are treating yourself as someone whose feelings matter. For many people, that is something entirely new.
        </p>
        <h3 className="text-3xl font-serif text-emerald-900 mt-12 mb-6">Where to Begin</h3>
        <p>Limits do not begin with other people. They begin with yourself.</p>
        <p>
          They begin with the daily practice of noticing: what do I actually feel right now? What do I actually need? Not what I should feel. Not what would be easier for everyone around me. What is true for me, today?
        </p>
        <p>
          That noticing — honest, regular, gentle — is where real limits grow from. You cannot tell someone else where your line is if you have not first admitted it to yourself.
        </p>
        <p>
          The evening reflection in ManoBandhu — the space to ask what happened today, what affected you, what you are carrying — is, among other things, a practice in taking your own experience seriously. In treating yourself as someone worth checking in with.
        </p>
        <div className="mt-16 pt-10 border-t border-gray-200">
          <p className="font-serif text-xl text-emerald-900">That sounds small. It is not. It is where everything begins.</p>
          <p className="font-serif text-xl text-emerald-900">— Komal Narsingani | Founding Member & Advisor, ManoBandhu</p>
        </div>
      </div>
    )
  }
};
