export default function Forbidden() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-end p-6 pb-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Access denied</h1>
      <p className="text-sm text-gray-500 mb-8">You don't have permission to view this page.</p>
      <a
        href="/"
        className="w-full bg-gray-900 text-white text-sm font-medium py-4 rounded-xl hover:bg-gray-700 transition-colors text-center"
      >
        Go home
      </a>
    </div>
  );
}
