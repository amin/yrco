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

  const selected = traitIds ?? me.traitIds?.map((t) => t.id) ?? [];

  function handleSubmit() {
    mutate({ traitIds: selected }, {
      onSuccess: () => navigate(`/@${me.username}`),
    });
  }

  return (
    <div className="h-screen flex flex-col max-w-md mx-auto overflow-hidden min-h-0">
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
