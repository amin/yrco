const AUTH_URL = `${import.meta.env.VITE_API_URL}/auth/linkedin`

export const Login = () => {
  return (
    <>
      <a href={AUTH_URL}>Login</a>
    </>
  )
}
