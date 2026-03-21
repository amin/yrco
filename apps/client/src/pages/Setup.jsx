import { useState } from "react";
import { useLogout, useCompleteSetup } from "../hooks/user";

const ROLES = [
  { value: "student", label: "Student" },
  { value: "organization", label: "Organization" },
];

export default function Setup() {
  const [role, setRole] = useState(null);
  const logout = useLogout();
  const { mutate: completeSetup, isPending } = useCompleteSetup();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm text-center">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Welcome to Yingle</h1>
        <p className="text-sm text-gray-500 mb-6">Who are you attending as?</p>

        <div className="flex gap-3 mb-6">
          {ROLES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setRole(value)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                role === value
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={() => completeSetup(role)}
          disabled={!role || isPending}
          className="block w-full bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed mb-3"
        >
          {isPending ? "Saving…" : "Confirm"}
        </button>

        <button
          onClick={logout}
          className="w-full text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
