export const LoadingStep = () => (
  <div className="flex flex-col h-full items-center justify-center gap-l">
    <video
      src="https://res.cloudinary.com/dmvfsm0ls/video/upload/yrco/yrco-loading.mp4"
      className="size-[60px] object-contain"
      preload="auto"
      autoPlay
      loop
      muted
      playsInline
    />
    <p className="font-sans text-xl leading-xl tracking-tighter font-light text-center w-[240px]">
      Just a sec, we're creating your unique palette
    </p>
  </div>
)
