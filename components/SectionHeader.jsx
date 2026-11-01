export default function SectionHeader({ tag, title, dim }) {
  return (
    <div className="section-header reveal">
      <div className="section-tag">{tag}</div>
      <h2 className="section-title">
        {title}
        {dim && (
          <>
            {' '}
            <span className="dim">{dim}</span>
          </>
        )}
      </h2>
    </div>
  );
}
