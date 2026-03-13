import styles from './Hero.module.css'
import GradualBlur from './GradualBlur'

export function Hero() {

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.circle1} />
      <div className={styles.circle2} />
      <div className={styles.circle3} />

      {/* Atmospheric drifting cloud blobs */}
      <div className={styles.cloudBlob1} />
      <div className={styles.cloudBlob2} />
      <div className={styles.cloudBlob3} />
      <div className={styles.cloudBlob4} />

      <video
        src="/logo.webm"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className={styles.watermark}
        style={{ mixBlendMode: 'screen' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className={styles.inner}>
          <div className={styles.text}>
            <div className={styles.badge}>
              <span className={styles.dot} />
              Your Daily Emotional Companion
            </div>
            <h1 className={styles.title}>
              Your <em>Mind</em> Deserves<br />Daily Care &amp; Kindness
            </h1>
            <p className={styles.tagline}>
              <span>Reflect.</span> &nbsp;<span>Regulate.</span> &nbsp;<span>Strengthen.</span>
            </p>
            <p className={styles.desc}>
              ManoBandhu is a structured emotional wellness platform that helps you build daily emotional habits — with guided rituals, a regulation module, and warm reflective insights delivered every week.
            </p>
            <div className={styles.actions}>
              <a href="#waitlist" className={styles.sliceBtn}>
                <span className={styles.sliceText}>Join the Study →</span>
              </a>
              <a
                href="#story"
                className="px-6 py-2.5 rounded-full font-semibold transition-all duration-300"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '0.95rem',
                  border: '1.5px solid rgba(255,255,255,0.4)',
                  backdropFilter: 'blur(4px)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      <img
        src="/cloud.png"
        alt=""
        aria-hidden="true"
        className={styles.cloudOverlay}
        style={{ opacity: 0.72, filter: 'blur(2px) brightness(1.08)' }}
      />
      <GradualBlur
        target="parent"
        position="bottom"
        height="7rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential
        opacity={1}
        zIndex={10}
      />

      {/* Fade transition into next section */}
      <div
        style={{
          position: "absolute",
          bottom: -2,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(to bottom, transparent 0%, rgba(240, 250, 247, 0.8) 40%, #f0faf7 100%)",
          zIndex: 20,
          pointerEvents: "none",
        }}
      />
    </section>
  )
}
