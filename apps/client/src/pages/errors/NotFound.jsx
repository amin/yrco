export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-end p-6 pb-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Page not found</h1>
      <p className="text-sm text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
      <a
        href="/"
        className="w-full bg-gray-900 text-white text-sm font-medium py-4 rounded-xl hover:bg-gray-700 transition-colors text-center"
      >
        Go home
      </a>
    </div>
  );
}
