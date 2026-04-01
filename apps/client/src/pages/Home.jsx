import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Yrco</h1>
      <p className="text-sm text-gray-500 mb-8">Connect at the event</p>
      <Link
        to="/login"
        className="w-full bg-blue-600 text-white text-sm font-medium py-3 rounded-xl text-center hover:bg-blue-500 transition-colors"
      >
        Get started
      </Link>
    </div>
  );
}
