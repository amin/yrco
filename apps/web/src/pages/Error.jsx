import { Button } from '@/shared/ui'

export const Error = () => {
  const params = new URLSearchParams(window.location.search)
  const message = params.get('message')?.slice(0, 200) ?? 'Something went wrong'

  return (
    <div className="flex flex-col justify-end h-svh p-base pb-2xl bg-white">
      <h1 className="font-sans text-xl leading-xl tracking-tighter font-normal mb-xs">Oh noo!</h1>
      <p className="font-sans text-xl leading-xl tracking-tighter font-light mb-2xl">{message}</p>
      <Button onClick={() => window.history.back()}>Try again</Button>
    </div>
  )
}
