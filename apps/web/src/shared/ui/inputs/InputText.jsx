import { SearchIcon } from '@/shared/icons'

export const InputText = ({ placeholder = 'Search', showSearch = true, value, onChange, className = '' }) => (
  <div className={`flex items-center h-11 bg-yrgo-light-blue rounded-full pl-base pr-0 ${className}`}>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="flex-1 bg-transparent font-sans text-sm leading-base tracking-tight text-black placeholder:text-black outline-none min-w-0"
    />
    {showSearch && (
      <div className="flex items-center justify-center size-11">
        <SearchIcon size={16} />
      </div>
    )}
  </div>
)
