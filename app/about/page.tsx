export default function AboutPage() {
  return (
    <div className="container" style={{ paddingTop: 40 }}>
      <p className="kicker">About · SSF · NOχ¹Δ</p>
      <h1 className="hero" style={{ fontSize: 26 }}>A fictional science learning platform.</h1>
      <p style={{ color: 'var(--steel)', maxWidth: '60ch', marginTop: 18 }}>
        The Solar Science Foundation is a fictional institution within the NOχ¹Δ universe,
        founded in Sundern in 2045.
      </p>
      <p style={{ color: 'var(--steel)', maxWidth: '60ch' }}>
        Die Solar Science Foundation ist eine fiktive Institution innerhalb des NOχ¹Δ-Universums,
        gegründet in Sundern im Jahr 2045.
      </p>
      <p style={{ color: 'var(--steel)', maxWidth: '60ch' }}>
        The science it teaches is real, presented in German and English.
        Progress earned here unlocks capabilities within NOχ¹Δ.
      </p>
    </div>
  );
}
