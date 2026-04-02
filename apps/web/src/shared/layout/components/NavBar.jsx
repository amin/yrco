import { QrIcon, HeartIcon, SearchIcon, HomeIcon } from '@/shared/icons'

export const NavBar = ({ onQrToggle }) => (
  <div className="absolute bottom-0 right-0 p-m flex flex-col gap-m items-center w-[68px] z-20">
    <button onClick={onQrToggle} className="w-full aspect-square rounded-full bg-yrgo-red flex items-center justify-center">
      <QrIcon size={20} className="text-white" />
    </button>
    <div className="w-full flex flex-col">
      <button className="w-full h-[68px] bg-yrgo-red rounded-t-full flex items-center justify-center">
        <HeartIcon size={20} className="text-white" />
      </button>
      <button className="w-full aspect-square bg-yrgo-red flex items-center justify-center">
        <SearchIcon size={20} className="text-white" />
      </button>
      <button className="w-full aspect-square bg-yrgo-red rounded-b-full flex items-center justify-center">
        <HomeIcon size={20} className="text-white" />
      </button>
    </div>
  </div>
)
