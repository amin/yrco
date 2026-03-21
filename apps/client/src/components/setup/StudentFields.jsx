const EDUCATION_OPTIONS = ["Web Developer", "Digital Designer"];

export default function StudentFields({ fields, onChange, onBack, onSubmit }) {
  const isValid = EDUCATION_OPTIONS.includes(fields.education);

  return (
    <div className="flex flex-col flex-1">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-8 self-start"
      >
        ← Back
      </button>

      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Student details</h1>
        <p className="text-sm text-gray-500 mb-8">Tell us a bit more about yourself</p>

        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            {EDUCATION_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onChange("education", option)}
                className={`flex-1 py-4 rounded-xl text-sm font-medium border transition-colors ${
                  fields.education === option
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <input
            placeholder="Website (optional)"
            value={fields.website ?? ""}
            onChange={(e) => onChange("website", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-4 text-sm outline-none focus:border-gray-400 bg-white"
          />
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={!isValid}
        className="w-full bg-blue-600 text-white text-sm font-medium py-4 rounded-xl hover:bg-blue-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-6"
      >
        Next
      </button>
    </div>
  );
}
