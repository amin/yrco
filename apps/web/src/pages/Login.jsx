export const Login = () => {
  const authUrl = `${import.meta.env.VITE_API_URL}/auth/linkedin?origin=${encodeURIComponent(window.location.origin)}`
  return (
    <>
      <a href={authUrl}>Login</a>
    </>
  )
}
