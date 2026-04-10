import { InputText } from '@/shared/ui/inputs'
import { CloseIcon } from '@/shared/icons'

export const SearchHeader = ({ value, onChange, onClear }) => (
  <div role="search" className="bg-yrgo-red flex flex-col py-base px-base shrink-0">
    <div className="flex items-center gap-s">
      <InputText
        value={value}
        onChange={onChange}
        placeholder="Search"
        showSearch={!value}
        className="flex-1"
      />
      {onClear && value && (
        <button onClick={onClear} aria-label="Clear search" className="text-white shrink-0">
          <CloseIcon />
        </button>
      )}
    </div>
  </div>
)
