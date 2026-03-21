import { useState } from "react";
import { organizationFieldsSchema } from "@colyr/shared";

export default function OrganizationFields({ fields, onChange, onBack, onSubmit }) {
  const [errors, setErrors] = useState({});

  function handleNext() {
    const result = organizationFieldsSchema.safeParse(fields);
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach(({ path, message }) => { fieldErrors[path[0]] = message; });
      setErrors(fieldErrors);
      return;
    }
    onSubmit();
  }

  return (
    <div className="flex flex-col flex-1">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-8 self-start"
      >
        ← Back
      </button>

      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Organization details</h1>
        <p className="text-sm text-gray-500 mb-8">Tell us a bit more about yourself</p>

        <div className="flex flex-col gap-3">
          <input
            placeholder="Organization name"
            value={fields.organizationName ?? ""}
            onChange={(e) => onChange("organizationName", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-4 text-sm outline-none focus:border-gray-400 bg-white"
          />
          {errors.organizationName && <p className="text-red-500 text-sm -mt-1">{errors.organizationName}</p>}
          <input
            placeholder="Your role"
            value={fields.roleAtCompany ?? ""}
            onChange={(e) => onChange("roleAtCompany", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-4 text-sm outline-none focus:border-gray-400 bg-white"
          />
          {errors.roleAtCompany && <p className="text-red-500 text-sm -mt-1">{errors.roleAtCompany}</p>}
        </div>
      </div>

      <button
        onClick={handleNext}
        className="w-full bg-blue-600 text-white text-sm font-medium py-4 rounded-xl hover:bg-blue-500 transition-colors mt-6"
      >
        Next
      </button>
    </div>
  );
}
