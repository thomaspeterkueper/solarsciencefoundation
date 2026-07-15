import { notFound } from 'next/navigation';
import Image from 'next/image';
import RayleighExperiment from '../../../components/learning/RayleighExperiment';
import {
  getLearningPathStatus,
  getRegisteredLearningPathById,
} from '../../../lib/learningPathRegistry';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function LearningPathDetailPage({ params }: PageProps) {
  const { id } = await params;
  const path = getRegisteredLearningPathById(decodeURIComponent(id));

  if (!path) notFound();

  const lifecycle = getLearningPathStatus(path.status);

  return (
    <div className="container reading" style={{ paddingTop: 56, paddingBottom: 96 }}>
      <p className="kicker" style={{ marginBottom: 12 }}>{path.title}</p>
      <p style={{ color: 'var(--steel)', maxWidth: '60ch', fontSize: 18, lineHeight: 1.7 }}>
        {path.subtitle}
      </p>

      <div style={{
        marginTop: 18,
        padding: '12px 14px',
        border: '1px solid var(--border)',
        borderRadius: 8,
        background: 'var(--soft)',
      }}>
        <strong style={{ color: 'var(--navy)', fontSize: 13 }}>{lifecycle.label}</strong>
        <p style={{ margin: '3px 0 0', color: 'var(--muted)', fontSize: 13, lineHeight: 1.55 }}>
          {lifecycle.description}
        </p>
      </div>

      {path.unlocks.length > 0 && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
          marginTop: 20, padding: '10px 14px',
          background: 'var(--gold-tint, #F5F0E0)',
          border: '1px solid var(--gold-border, #DFC87A)',
          borderRadius: 6
        }}>
          <span style={{ fontSize: 12, color: 'var(--steel)', fontFamily: 'var(--font-mono)' }}>
            NOXIA
          </span>
          {path.unlocks.map((key) => (
            <span key={key} style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              background: 'var(--gold-tint, #F5F0E0)',
              border: '1px solid var(--gold-border, #DFC87A)',
              color: 'var(--navy, #1C2B3A)',
              padding: '2px 8px', borderRadius: 4
            }}>{key}</span>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gap: 48, marginTop: 48 }}>
        {path.units.map((unit, unitIndex) => (
          <section key={unit.id}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              color: 'var(--steel)', letterSpacing: '0.1em',
              textTransform: 'uppercase', marginBottom: 12
            }}>
              Einheit {unitIndex + 1}
            </p>

            {unit.entryQuestion && (
              <h2 style={{
                fontFamily: 'var(--font-serif, Georgia, serif)',
                fontSize: 'clamp(20px, 3.5vw, 27px)',
                fontWeight: 'normal', lineHeight: 1.25,
                letterSpacing: '-0.01em', marginBottom: 32,
                borderBottom: '1px solid var(--border)', paddingBottom: 20
              }}>
                {unit.entryQuestion}
              </h2>
            )}

            <div style={{ display: 'grid', gap: 16 }}>
              {unit.sections.map((section) => (
                <div key={section.id} style={{
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  overflow: 'hidden',
                  opacity: section.optional ? 0.85 : 1
                }}>
                  {section.image && (
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/7', overflow: 'hidden' }}>
                      <Image
                        src={section.image.src}
                        alt={section.image.alt}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, 720px"
                      />
                      {section.image.credit && (
                        <span style={{
                          position: 'absolute', bottom: 8, right: 10,
                          fontFamily: 'var(--font-mono)', fontSize: 10,
                          color: 'rgba(255,255,255,0.8)', letterSpacing: '0.05em'
                        }}>
                          © {section.image.credit}
                        </span>
                      )}
                    </div>
                  )}

                  <div style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                      <span className="code" style={{ fontSize: 10 }}>{section.kind}</span>
                      {section.optional && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--steel)' }}>optional</span>}
                      {section.interactive && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--link)' }}>interaktiv</span>}
                    </div>
                    <strong style={{ display: 'block', marginBottom: 4 }}>{section.title}</strong>
                    <p style={{ color: 'var(--steel)', marginBottom: 0, fontSize: 14, lineHeight: 1.6 }}>
                      {section.summary}
                    </p>

                    {path.id === 'PATH:SSF:PHY-SKY-0001' && section.id === 'EXP:RAYLEIGH' && (
                      <RayleighExperiment />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
