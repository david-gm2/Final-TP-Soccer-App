export function MatchForm({
  matchFormats,
  selectedFormat,
  onSelectFormat,
  fields,
  register,
  errors,
  onSubmit,
  isSubmitting = false,
}) {
  return (
    <section className="match-card">
      <h2>New Match</h2>
      <p>Select players and customize match details.</p>

      <div className="match-format">
        {matchFormats.map((format) => (
          <button
            key={format}
            type="button"
            className={`format-chip ${selectedFormat === format ? "active" : ""}`}
            onClick={() => onSelectFormat(format)}
          >
            {format}
          </button>
        ))}
      </div>

      <form className="match-form" onSubmit={onSubmit}>
        {fields.map((field) => (
          <div key={field.name} className="form-group">
            <label className="form-label">{field.label}</label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              className={`form-input ${errors[field.name] ? "input-error" : ""}`}
              {...register(field.name, {
                required: field.required ? field.required : false,
              })}
            />
            {errors[field.name] && (
              <span className="error-message">{errors[field.name].message}</span>
            )}
          </div>
        ))}

        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Create match"}
        </button>
      </form>
    </section>
  );
}
