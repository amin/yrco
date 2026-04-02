import { InputText } from '@/shared/ui/inputs'

export const SearchHeader = ({ value, onChange }) => (
  <div className="bg-yrgo-red flex flex-col justify-end h-[140px] pb-base px-s shrink-0">
    <InputText value={value} onChange={onChange} placeholder="Search" />
  </div>
)
