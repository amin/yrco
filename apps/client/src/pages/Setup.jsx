import { useState } from "react";
import { useLogout, useCompleteSetup } from "../hooks/user";
import RoleSelection from "../components/setup/RoleSelection";
import StudentFields from "../components/setup/StudentFields";
import OrganizationFields from "../components/setup/OrganizationFields";
import WordSelection from "../components/setup/WordSelection";

const TRANSLATE = ["0%", "-33.333%", "-66.666%"];

export default function Setup() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState(null);
  const [fields, setFields] = useState({});
  const [wordIds, setWordIds] = useState([]);
  const logout = useLogout();
  const { mutate: completeSetup, isPending } = useCompleteSetup();

  function selectRole(value) {
    setRole(value);
    setStep(1);
  }

  function handleChange(name, value) {
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {
    completeSetup({ role, ...fields, wordIds });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-sm overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(${TRANSLATE[step]})`, width: "300%" }}
        >
          {/* Step 0 — Role selection */}
          <div className="w-1/3 p-8 text-center">
            <RoleSelection onSelect={selectRole} onLogout={logout} />
          </div>

          {/* Step 1 — Role-specific fields */}
          <div className="w-1/3 p-8 text-center">
            {role === "student" ? (
              <StudentFields
                fields={fields}
                onChange={handleChange}
                onBack={() => setStep(0)}
                onSubmit={() => setStep(2)}
              />
            ) : (
              <OrganizationFields
                fields={fields}
                onChange={handleChange}
                onBack={() => setStep(0)}
                onSubmit={() => setStep(2)}
              />
            )}
          </div>

          {/* Step 2 — Word selection */}
          <div className="w-1/3 p-8 text-center">
            <WordSelection
              selected={wordIds}
              onChange={setWordIds}
              onBack={() => setStep(1)}
              onSubmit={handleSubmit}
              isPending={isPending}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
