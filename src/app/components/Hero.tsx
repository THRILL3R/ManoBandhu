import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'
import GradualBlur from './GradualBlur'

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7
    }
  }, [])

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
        ref={videoRef}
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
              <span>Explore the World </span> &nbsp;<span>Within Your Mind</span>
            </p>
            <p className={styles.desc}>
              ManoBandhu is a structured emotional wellness platform that helps you build daily emotional habits — with guided rituals, a regulation module, and warm reflective insights delivered every week.
            </p>
            <div className={styles.actions}>
              <a
                href="#waitlist"
                className={styles.sliceBtn}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                <span className={styles.sliceText}>Join the Study →</span>
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
