/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: app/progress/page.tsx
 * Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/app/progress/page.tsx
 * Name: ProgressPage
 * Version: 0.1.0
 * Created: 2026-06-27
 * Modified: 2026-06-27 10:25 CEST
 * Depends: components/ProgressDashboard
 */

import ProgressDashboard from '../../components/ProgressDashboard';

export default function ProgressPage() {
  return (
    <div className="container" style={{ paddingTop: 56 }}>
      <p className="kicker">Learning progress</p>
      <h1 className="hero" style={{ fontSize: 56 }}>Your SSF progress.</h1>
      <p className="lede" style={{ maxWidth: '68ch' }}>
        This dashboard shows completed modules, learning achievements and partner-project unlocks.
        The current version uses the demo progress store; persistence comes later.
      </p>
      <ProgressDashboard />
    </div>
  );
}
