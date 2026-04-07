import { useSearchParams } from 'react-router-dom'

export const Login = () => {
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect')

  const params = new URLSearchParams({ origin: window.location.origin })
  if (redirect) params.set('redirect', redirect)
  const authUrl = `${import.meta.env.VITE_API_URL}/auth/linkedin?${params}`

  return (
    <div className="h-dvh flex items-center justify-center p-m">
      <a
        href={authUrl}
        className="inline-flex items-center justify-center rounded-full h-11 px-l py-s font-sans text-sm leading-base tracking-tight whitespace-nowrap bg-yrgo-red text-white active:bg-yrgo-red-active"
      >
        Login with Linkedin
      </a>
    </div>
  )
}
