import { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import SetupRoute from './components/SetupRoute';
import QROverlay from './components/QROverlay';
import Home from './pages/Home';
import Users from './pages/Users';
import Login from './pages/Login';
import Error from './pages/errors/Error';
import Forbidden from './pages/errors/Forbidden';
import NotFound from './pages/errors/NotFound';
import Profile from './pages/Profile';
import Setup from './pages/Setup';
import Connections from './pages/Connections';
import { useAuth } from './context/AuthContext';
import { useLogout } from './hooks/user';

function App() {
  const me = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const [qrOpen, setQrOpen] = useState(false);

  return (
    <>
      {qrOpen && me && (
        <QROverlay username={me.username} onClose={() => setQrOpen(false)} />
      )}

      {/* Sign in button for unauthenticated users */}
      {me === null && location.pathname !== '/' && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => navigate('/login')}
            className="border border-gray-200 text-gray-700 text-base font-medium px-5 py-3 rounded-xl bg-white hover:bg-gray-100 transition-colors shadow-sm"
          >
            Sign in
          </button>
        </div>
      )}

      {/* Authenticated user controls */}
      {me && location.pathname !== '/' && (
        <>
          <div className="fixed top-4 left-4 z-50 flex gap-2">
            <Link
              to={`/@${me.username}`}
              className="border border-gray-200 text-gray-700 text-base font-medium px-5 py-3 rounded-xl bg-white hover:bg-gray-100 transition-colors shadow-sm"
            >
              My Profile
            </Link>
            <button
              onClick={() => setQrOpen(true)}
              className="border border-gray-200 text-gray-700 text-base font-medium px-5 py-3 rounded-xl bg-white hover:bg-gray-100 transition-colors shadow-sm cursor-pointer"
            >
              QR
            </button>
            <Link
              to="/users"
              className="border border-gray-200 text-gray-700 text-base font-medium px-5 py-3 rounded-xl bg-white hover:bg-gray-100 transition-colors shadow-sm"
            >
              Users
            </Link>
            <Link
              to="/connections"
              className="border border-gray-200 text-gray-700 text-base font-medium px-5 py-3 rounded-xl bg-white hover:bg-gray-100 transition-colors shadow-sm"
            >
              Connections
            </Link>
          </div>

          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={async () => {
                // Clear session storage to prevent stale redirects
                sessionStorage.removeItem("redirectAfterLogin");
                await logout();
                navigate('/login');
              }}
              className="border border-red-500 text-white text-base font-medium px-5 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition-colors shadow-sm cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </>
      )}

      <div className="pt-20">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/error" element={<Error />} />
          <Route path="/403" element={<Forbidden />} />
          <Route path="/users" element={<Users />} />

          {/* Setup route — only for users with setupComplete: false */}
          <Route element={<SetupRoute />}>
            <Route path="/setup" element={<Setup />} />
          </Route>

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/connections" element={<Connections />} />
          </Route>

          {/* Profile route — catch-all for usernames with @ prefix */}
          <Route path="/:username" element={<Profile />} />

          {/* Fallback route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
