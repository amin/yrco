import { QRCodeSVG } from 'qrcode.react'

export const QrOverlay = ({ username, open }) => (
  <div
    className={`absolute inset-x-0 top-0 bg-yrgo-red flex items-center justify-center transition-all duration-300 overflow-hidden z-10 ${
      open ? 'h-[calc(100%-336px)]' : 'h-0'
    }`}
  >
    <QRCodeSVG value={`${window.location.origin}/${username}`} size={240} fgColor="#ffffff" bgColor="transparent" />
  </div>
)
