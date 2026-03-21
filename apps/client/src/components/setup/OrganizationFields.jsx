export default function OrganizationFields({ fields, onChange, onBack, onSubmit }) {
  const isValid = fields.organizationName?.trim() && fields.roleAtCompany?.trim();

  return (
    <>
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-6"
      >
        ← Back
      </button>
      <h1 className="text-xl font-semibold text-gray-900 mb-2">Organization details</h1>
      <p className="text-sm text-gray-500 mb-6">Tell us a bit more about yourself</p>
      <div className="flex flex-col gap-3 mb-6 text-left">
        <input
          placeholder="Organization name"
          value={fields.organizationName ?? ""}
          onChange={(e) => onChange("organizationName", e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-gray-400"
        />
        <input
          placeholder="Your role"
          value={fields.roleAtCompany ?? ""}
          onChange={(e) => onChange("roleAtCompany", e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-gray-400"
        />
      </div>
      <button
        onClick={onSubmit}
        disabled={!isValid}
        className="w-full bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </>
  );
}
