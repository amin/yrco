const AUTH_URL = `${import.meta.env.VITE_API_URL}/auth/linkedin?origin=${encodeURIComponent(window.location.origin)}`

export const Login = () => {
  return (
    <>
      <a href={AUTH_URL}>Login</a>
    </>
  )
}
