import { useState } from "react";
import { useLogout, useCompleteSetup } from "../hooks/user";
import RoleSelection from "../components/setup/RoleSelection";
import StudentFields from "../components/setup/StudentFields";
import OrganizationFields from "../components/setup/OrganizationFields";
import TraitSelection from "../components/setup/TraitSelection";

const TRANSLATE = ["0%", "-33.333%", "-66.666%"];

export default function Setup() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState(null);
  const [fields, setFields] = useState({});
  const [traitIds, setTraitIds] = useState([]);
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
    completeSetup({ role, ...fields, traitIds });
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <div
        className="flex transition-transform duration-300 ease-in-out min-h-screen"
        style={{ transform: `translateX(${TRANSLATE[step]})`, width: "300%" }}
      >
        <div className="w-1/3 p-6 flex flex-col">
          <RoleSelection onSelect={selectRole} onLogout={logout} />
        </div>

        <div className="w-1/3 p-6 flex flex-col">
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

        <div className="w-1/3 p-6 flex flex-col">
          <TraitSelection
            selected={traitIds}
            onChange={setTraitIds}
            onBack={() => setStep(1)}
            onSubmit={handleSubmit}
            isPending={isPending}
          />
        </div>
      </div>
    </div>
  );
}
