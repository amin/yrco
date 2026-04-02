import { BaseButton } from './BaseButton'

const CIRCLE = 'M0 34C0 15.2223 15.2223 0 34 0C52.7777 0 68 15.2223 68 34C68 52.7777 52.7777 68 34 68C15.2223 68 0 52.7777 0 34Z'
const HEART = 'M41.3667 27.8417C40.941 27.4158 40.4357 27.078 39.8795 26.8476C39.3232 26.6171 38.7271 26.4985 38.125 26.4985C37.5229 26.4985 36.9268 26.6171 36.3705 26.8476C35.8143 27.078 35.309 27.4158 34.8833 27.8417L34 28.725L33.1167 27.8417C32.2569 26.9819 31.0909 26.4989 29.875 26.4989C28.6591 26.4989 27.4931 26.9819 26.6333 27.8417C25.7736 28.7014 25.2906 29.8675 25.2906 31.0833C25.2906 32.2992 25.7736 33.4653 26.6333 34.325L27.5167 35.2083L34 41.6917L40.4833 35.2083L41.3667 34.325C41.7925 33.8994 42.1303 33.394 42.3608 32.8378C42.5912 32.2816 42.7099 31.6854 42.7099 31.0833C42.7099 30.4813 42.5912 29.8851 42.3608 29.3289C42.1303 28.7727 41.7925 28.2673 41.3667 27.8417Z'

export const HeartButton = ({ active = false, disabled = false, onClick, className = '' }) => (
  <BaseButton disabled={disabled} onClick={onClick} className={className}>
    <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
      <path d={CIRCLE} fill={disabled ? '#ffffff' : '#e4e9eb'} />
      {active ? (
        <path d={HEART} fill="#e51236" />
      ) : (
        <path d={HEART} stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  </BaseButton>
)
