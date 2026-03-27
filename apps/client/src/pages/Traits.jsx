import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMe, useUpdateProfile } from "../hooks/user";
import WordSelection from "../components/setup/WordSelection";

export default function Traits() {
  const { data: me, isLoading } = useMe();
  const navigate = useNavigate();
  const { mutate, isPending } = useUpdateProfile();

  const [wordIds, setWordIds] = useState(null);

  if (isLoading) return null;

  const selected = wordIds ?? me.wordIds ?? [];

  function handleSubmit() {
    mutate({ wordIds: selected }, {
      onSuccess: () => navigate(`/@${me.username}`),
    });
  }

  return (
    <div className="min-h-screen flex flex-col px-6 py-10 max-w-md mx-auto">
      <WordSelection
        selected={selected}
        onChange={setWordIds}
        onBack={() => navigate(-1)}
        onSubmit={handleSubmit}
        isPending={isPending}
      />
    </div>
  );
}
