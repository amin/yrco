import { useSearchParams } from "react-router-dom";

export default function Login() {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  const params = new URLSearchParams({ origin: window.location.origin });
  if (redirect) params.set("redirect", redirect);
  const authUrl = `${import.meta.env.VITE_SERVER_URL}/auth/linkedin?${params}`;

    

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-end p-6 pb-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
      <p className="text-sm text-gray-500 mb-8">Sign in to continue to Yrco</p>
      <a
        href={authUrl}
        className="w-full bg-blue-600 text-white text-sm font-medium py-3 rounded-xl text-center hover:bg-blue-500 transition-colors"
      >
        Sign in with LinkedIn
      </a>
    </div>
  );
}
