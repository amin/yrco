import { NavBar } from './components/NavBar'

export const ProtectedLayout = ({ children }) => (
  <div className="relative h-screen">
    {children}
    <NavBar />
  </div>
)
