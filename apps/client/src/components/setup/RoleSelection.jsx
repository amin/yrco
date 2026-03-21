const ROLES = [
  { value: "student", label: "Student" },
  { value: "organization", label: "Organization" },
];

export default function RoleSelection({ onSelect, onLogout }) {
  return (
    <>
      <h1 className="text-xl font-semibold text-gray-900 mb-2">Welcome to Yingle</h1>
      <p className="text-sm text-gray-500 mb-6">Who are you attending as?</p>
      <div className="flex gap-3 mb-6">
        {ROLES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className="flex-1 py-2.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-700 hover:border-gray-400 transition-colors"
          >
            {label}
          </button>
        ))}
      </div>
      <button
        onClick={onLogout}
        className="w-full text-sm text-gray-400 hover:text-gray-700 transition-colors"
      >
        Sign out
      </button>
    </>
  );
}
