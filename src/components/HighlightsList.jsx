import "../styles/HighlightsList.css";

function HighlightsList({ sections = [] }) {
  return (
    <div className="highlights-list">
      {sections.map(({ key, title, content }) => (
        <div className="highlight-item" key={key}>
          {title && (
            <div className="highlight-header">
              <h2>{title}</h2>
            </div>
          )}
          <div className="highlight-rows">{content}</div>
        </div>
      ))}
    </div>
  );
}

export default HighlightsList;
