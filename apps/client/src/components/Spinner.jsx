export default function Spinner({ label }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto" />
        {label && <p className="text-sm text-gray-500 mt-4">{label}</p>}
      </div>
    </div>
  );
}
