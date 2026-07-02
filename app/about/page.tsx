export default function AboutPage() {
  return (
    <div className="container" style={{ paddingTop: 40 }}>
      <p className="kicker">About · SSF · NOχ¹Δ</p>
      <h1 className="hero" style={{ fontSize: 26 }}>A fictional science learning platform.</h1>
      <p style={{ color: 'var(--steel)', maxWidth: '60ch', marginTop: 18 }}>
        The Solar Science Foundation is a fictional educational organization within the NOχ¹Δ universe.
        In the NOχ¹Δ timeline, it was founded in 2045 in Geneva.
      </p>
      <p style={{ color: 'var(--steel)', maxWidth: '60ch' }}>
        Die Solar Science Foundation ist eine fiktive Wissenschafts- und Lernplattform innerhalb des NOχ¹Δ-Universums.
        In der NOχ¹Δ-Zeitlinie wurde sie 2045 in Genf gegründet.
      </p>
      <p style={{ color: 'var(--steel)', maxWidth: '60ch' }}>
        KUEPER Knowledge Graph → SSF → NOχ¹Δ.
        Learning modules can be used independently or connected to NOχ¹Δ progress and unlocks.
      </p>
    </div>
  );
}