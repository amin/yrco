import { InputText } from '@/shared/ui/inputs'
import { CloseIcon } from '@/shared/icons'

export const SearchHeader = ({ value, onChange, onClear }) => (
  <div className="bg-yrgo-red flex flex-col justify-end h-[140px] pb-base px-base shrink-0">
    <div className="flex items-center gap-s">
      <InputText
        value={value}
        onChange={onChange}
        placeholder="Search"
        showSearch={!value}
        className="flex-1"
      />
      {onClear && value && (
        <button onClick={onClear} className="text-white shrink-0">
          <CloseIcon />
        </button>
      )}
    </div>
  </div>
)
