export function MatchForm({
  matchFormats,
  selectedFormat,
  onSelectFormat,
  fields,
  register,
  errors,
  onSubmit,
}) {
  return (
    <section className="match-formad-card">
      <h3 className="match-format-title">Match format</h3>
      <div className="match-format">
        {matchFormats.map((format) => (
          <button
            key={format}
            type="button"
            className={`btn ${selectedFormat === format ? "btn-primary" : "btn-secondary"}`}
            onClick={() => onSelectFormat(format)}
          >
            {format}
          </button>
        ))}
      </div>

      <form className="match-form" onSubmit={onSubmit}>
        {fields.map((field) => {
          const inputId = `match-${field.name}`;
          return (
            <div key={field.name} className="form-group">
              <label className="form-label" htmlFor={inputId}>
                {field.label}
              </label>
              <input
                id={inputId}
                type={field.type}
                placeholder={field.placeholder}
                className={`form-input ${errors[field.name] ? "input-error" : ""}`}
                aria-invalid={Boolean(errors[field.name])}
                {...register(field.name, {
                  required: field.required ? field.required : false,
                })}
              />
              {errors[field.name] && (
                <span className="error-message">
                  {errors[field.name].message}
                </span>
              )}
            </div>
          );
        })}
      </form>
    </section>
  );
}
