export const BaseIcon = ({ size = 20, viewBox, className = '', children }) => (
  <div
    style={{ padding: size / 4 }}
    className={`inline-flex items-center justify-center ${className}`}
  >
    <svg width={size} height={size} viewBox={viewBox} fill="none">
      {children}
    </svg>
  </div>
)
