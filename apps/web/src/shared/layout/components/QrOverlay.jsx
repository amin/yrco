import { QRCodeSVG } from 'qrcode.react'

export const QrOverlay = ({ username, open }) => (
  <div
    className={`absolute bottom-77 right-0 w-full bg-yrgo-red flex items-center justify-center transition-all duration-300 overflow-hidden z-10 ${
      open ? 'h-1/2' : 'h-0'
    }`}
  >
    <QRCodeSVG value={`${window.location.origin}/${username}`} size={240} fgColor="#ffffff" bgColor="transparent" />
  </div>
)
