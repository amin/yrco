const ROLES = [
  { value: "student", label: "Student" },
  { value: "organization", label: "Organization" },
];

export default function RoleSelection({ onSelect, onLogout }) {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Colyr</h1>
        <p className="text-sm text-gray-500 mb-8">Who are you attending as?</p>
        <div className="flex flex-col gap-3">
          {ROLES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onSelect(value)}
              className="w-full py-4 rounded-xl text-sm font-medium border border-gray-200 text-gray-700 hover:border-gray-400 bg-white transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={onLogout}
        className="w-full text-sm text-gray-400 hover:text-gray-700 transition-colors py-3"
      >
        Sign out
      </button>
    </div>
  );
}
