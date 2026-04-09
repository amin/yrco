import { useTraits } from "../../hooks/traits";

const MAX = 7;

export default function TraitSelection({ selected, onChange, onBack, onSubmit, isPending }) {
  const { data: traits, isLoading } = useTraits();

  function toggle(id) {
    if (selected.includes(id)) {
      onChange(selected.filter((t) => t !== id));
    } else if (selected.length < MAX) {
      onChange([...selected, id]);
    }
  }

  if (isLoading) return <p className="text-sm text-gray-400 p-6">Loading traits...</p>;

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      {/* Title — outside scroll, always visible */}
      <div className="shrink-0 flex flex-col items-center justify-end px-8 pt-16 pb-10 text-center">
        <p className="text-2xl leading-tight tracking-tight text-black">
          What seven labels resonates with you?
        </p>
      </div>

      {/* Scrollable traits — flex-1 + min-h-0 gives it a bounded height to scroll within */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="flex flex-wrap justify-center gap-2 px-4 pb-4">
          {traits.map(({ id, trait, color, colorText }) => {
            const isSelected = selected.includes(id);
            const isDisabled = !isSelected && selected.length >= MAX;

            return (
              <button
                key={id}
                onClick={() => toggle(id)}
                disabled={isDisabled}
                className={`h-11 px-5 rounded-full text-sm border transition-all whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed ${
                  isSelected
                    ? "border-transparent"
                    : "bg-white text-black border-black hover:bg-gray-50"
                }`}
                style={
                  isSelected
                    ? { backgroundColor: color, borderColor: color, color: colorText }
                    : {}
                }
              >
                {trait}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sticky bottom CTA */}
      <div className="shrink-0 flex justify-end p-4">
        <button
          onClick={onSubmit}
          disabled={selected.length !== MAX || isPending}
          className="h-11 px-5 rounded-full text-sm bg-gray-900 text-white transition-colors hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isPending ? "Saving..." : "Next"}
        </button>
      </div>
    </div>
  );
}
