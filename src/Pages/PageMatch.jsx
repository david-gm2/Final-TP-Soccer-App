import { useForm } from "react-hook-form";
import Header from "../components/Header";
import "../styles/PageMatch.css";

const MATCH_FORMATS = ["5v5", "6v6", "7v7", "8v8", "9v9"];

const FORM_FIELDS = [
  {
    name: "datetime-local",
    type: "datetime-local",
    label: "Date*",
    required: "Date is required",
  },
  {
    name: "location",
    type: "text",
    label: "Location*",
    placeholder: "Location",
    required: "Location is required",
  },
  {
    name: "teamA",
    type: "text",
    label: "Team A Name*",
    placeholder: "Team A",
    required: "Team A name is required",
  },
  {
    name: "teamB",
    type: "text",
    label: "Team B Name*",
    placeholder: "Team B",
    required: "Team B name is required",
  },
  {
    name: "matchName",
    type: "text",
    label: "Match name (Optional)",
    placeholder: "Match name",
    required: false,
  },
];

function PageMatch() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      format: MATCH_FORMATS[0],
      date: "",
      location: "",
      teamA: "",
      teamB: "",
      matchName: "",
    },
  });

  const selectedFormat = watch("format");

  const onSubmit = (data) => {
    console.log("Match data:", data);
    alert("Partido creado exitosamente!");
  };

  return (
    <>
      <Header />
      <main className="match-page">
        <form onSubmit={handleSubmit(onSubmit)} className="match-form">
          {/* Match format */}
          <div className="form-group">
            <label className="form-label">Match format</label>
            <div className="format-buttons">
              {MATCH_FORMATS.map((f) => (
                <button
                  key={f}
                  type="button"
                  className={`btn ${selectedFormat === f ? "active btn-primary" : " btn-secondary"}`}
                  onClick={() => {
                    const input = document.querySelector(`input[value="${f}"]`);
                    if (input) input.click();
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
            {/* input hidden para register */}
            {MATCH_FORMATS.map((f) => (
              <input
                key={`hidden-${f}`}
                type="radio"
                value={f}
                style={{ display: "none" }}
                {...register("format", { required: "Choose a format" })}
              />
            ))}
            {errors.format && (
              <span className="error-message">{errors.format.message}</span>
            )}
          </div>

          {/* Form fields */}
          {FORM_FIELDS.map((field) => (
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
                <span className="error-message">
                  {errors[field.name].message}
                </span>
              )}
            </div>
          ))}

          <button type="submit" className="btn btn-primary">
            Create match
          </button>
        </form>
      </main>
    </>
  );
}

export default PageMatch;
