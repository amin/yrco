import { useEffect, useState } from "react";

export default function Error() {
  const [message, setMessage] = useState("Something went wrong");

  useEffect(() => {
    const stored = localStorage.getItem("errorMessage");
    const param = new URLSearchParams(window.location.search).get("message");

    if (stored) {
      setMessage(stored.slice(0, 200));
      localStorage.removeItem("errorMessage");
    } else if (param) {
      setMessage(param.slice(0, 200));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-end p-6 pb-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Something went wrong</h1>
      <p className="text-sm text-gray-500 mb-8">{message}</p>
      <button
        onClick={() => window.history.back()}
        className="w-full bg-gray-900 text-white text-sm font-medium py-4 rounded-xl hover:bg-gray-700 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
