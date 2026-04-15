import { useState, useRef, useEffect } from 'react'

interface MobileDropdownProps {
  tabs: string[]
  defaultActive?: number
}

/**
 * Recreation of Tasks app FilterButtonsGroupSelector (mobile view)
 * - Dropdown button showing active filter name + chevron
 * - Popper menu with filter options
 * - 40px height button, 40px height menu items
 */
export function MobileDropdown({ tabs, defaultActive = 0 }: MobileDropdownProps) {
  const [active, setActive] = useState(defaultActive)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div
      ref={ref}
      className="relative flex items-center"
      style={{ padding: '0 20px', height: 48, borderBottom: '1px solid #EFF1F4' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="border-none bg-transparent cursor-pointer flex items-center"
        style={{
          height: 40,
          padding: 0,
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '22px',
          fontFamily: 'Inter, sans-serif',
          color: '#212B36',
          gap: 6,
        }}
      >
        {tabs[active]}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path
            d="M1 1L5 5L9 1"
            stroke="#6B6F76"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          className="absolute left-5 top-full bg-white border border-gray-150 rounded z-10"
          style={{
            width: 134,
            padding: '4px 0',
            boxShadow: '0px 6px 20px 0px rgba(0, 0, 0, 0.07)',
            marginTop: -2,
          }}
        >
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => {
                setActive(i)
                setOpen(false)
              }}
              className="w-full text-left border-none cursor-pointer hover:bg-gray-100"
              style={{
                padding: '4px 12px',
                fontSize: 13,
                fontWeight: 400,
                lineHeight: '21px',
                fontFamily: 'Inter, sans-serif',
                color: '#101828',
                backgroundColor: 'transparent',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
