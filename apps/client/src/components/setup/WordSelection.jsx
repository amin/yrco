import { useWords } from "../../hooks/useWords";

const MAX = 5;

export default function WordSelection({ selected, onChange, onBack, onSubmit, isPending }) {
  const { data: words, isLoading } = useWords();

  function toggle(id) {
    if (selected.includes(id)) {
      onChange(selected.filter((w) => w !== id));
    } else if (selected.length < MAX) {
      onChange([...selected, id]);
    }
  }

  if (isLoading) return <p className="text-sm text-gray-400">Loading words...</p>;

  return (
    <>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Pick 5 words</h2>
      <p className="text-sm text-gray-500 mb-6">
        Choose words that represent you. {selected.length}/{MAX} selected.
      </p>

      <div className="grid grid-cols-2 gap-2 mb-6">
        {words.map(({ id, word, color }) => {
          const isSelected = selected.includes(id);
          const isDisabled = !isSelected && selected.length >= MAX;

          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              disabled={isDisabled}
              className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all border-2 ${
                isSelected
                  ? "text-white border-transparent"
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed"
              }`}
              style={isSelected ? { backgroundColor: color, borderColor: color } : {}}
            >
              {word}
            </button>
          );
        })}
      </div>

      <button
        onClick={onSubmit}
        disabled={selected.length !== MAX || isPending}
        className="w-full bg-gray-900 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed mb-3"
      >
        {isPending ? "Saving..." : "Confirm"}
      </button>
      <button
        onClick={onBack}
        className="w-full text-sm text-gray-400 hover:text-gray-700 transition-colors"
      >
        Back
      </button>
    </>
  );
}
