import { useState } from "react";
import { useLogout, useCompleteSetup } from "../hooks/user";
import RoleSelection from "../components/setup/RoleSelection";
import StudentFields from "../components/setup/StudentFields";
import OrganizationFields from "../components/setup/OrganizationFields";

export default function Setup() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState(null);
  const [fields, setFields] = useState({});
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
    completeSetup({ role, ...fields });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-sm overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(${step === 0 ? "0%" : "-50%"})`, width: "200%" }}
        >
          <div className="w-1/2 p-8 text-center">
            <RoleSelection onSelect={selectRole} onLogout={logout} />
          </div>
          <div className="w-1/2 p-8 text-center">
            {role === "student" ? (
              <StudentFields
                fields={fields}
                onChange={handleChange}
                onBack={() => setStep(0)}
                onSubmit={handleSubmit}
                isPending={isPending}
              />
            ) : (
              <OrganizationFields
                fields={fields}
                onChange={handleChange}
                onBack={() => setStep(0)}
                onSubmit={handleSubmit}
                isPending={isPending}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
