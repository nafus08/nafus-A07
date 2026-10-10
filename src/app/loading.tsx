export default function Loading() {
  return (
    <div className="page-container loading-page" aria-label="লোড হচ্ছে">
      <div className="skeleton skeleton-title" />
      <div className="skeleton-grid">
        {Array.from({ length: 8 }, (_, index) => (
          <div className="skeleton-card" key={index}>
            <div className="skeleton skeleton-emoji" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line short" />
            <div className="skeleton skeleton-line" />
          </div>
        ))}
      </div>
      <p className="loading-label">আজকের বাজারদর আনা হচ্ছে…</p>
    </div>
  );
}
