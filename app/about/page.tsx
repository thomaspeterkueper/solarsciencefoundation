export default function AboutPage() {
  return (
    <div className="container" style={{ paddingTop: 40 }}>
      <p className="kicker">About · SSF · NOXIA</p>
      <h1 className="hero" style={{ fontSize: 26 }}>A fictional science learning platform.</h1>
      <p style={{ color: 'var(--steel)', maxWidth: '60ch', marginTop: 18 }}>
        The Solar Science Foundation is a fictional educational organization within the NOXIA universe.
        In the NOXIA timeline, it was founded in 2164 on Luna Prime.
      </p>
      <p style={{ color: 'var(--steel)', maxWidth: '60ch' }}>
        Die Solar Science Foundation ist eine fiktive Wissenschafts- und Lernplattform innerhalb des NOXIA-Universums.
        In der NOXIA-Zeitlinie wurde sie 2164 auf Luna Prime gegruendet.
      </p>
      <p style={{ color: 'var(--steel)', maxWidth: '60ch' }}>
        KUEPER Knowledge Graph → SSF → NOXIA.
        Learning modules can be used independently or connected to NOXIA progress and unlocks.
      </p>
    </div>
  );
}
