import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMe, useUpdateProfile } from "../hooks/user";
import TraitSelection from "../components/setup/TraitSelection";

export default function Traits() {
  const { data: me, isLoading } = useMe();
  const navigate = useNavigate();
  const { mutate, isPending } = useUpdateProfile();

  const [traitIds, setTraitIds] = useState(null);

  if (isLoading) return null;

  const selected = traitIds ?? me.traitIds ?? [];

  function handleSubmit() {
    mutate({ traitIds: selected }, {
      onSuccess: () => navigate(`/@${me.username}`),
    });
  }

  return (
    <div className="min-h-screen flex flex-col px-6 py-10 max-w-md mx-auto">
      <TraitSelection
        selected={selected}
        onChange={setTraitIds}
        onBack={() => navigate(-1)}
        onSubmit={handleSubmit}
        isPending={isPending}
      />
    </div>
  );
}
