import { useState, useRef, useEffect } from 'react'

interface Tab {
  key: string
  label: string
  disabled?: boolean
}

interface UnifiedTabsProps {
  tabs: Tab[]
  defaultActive?: string
  showOverflowDemo?: boolean
}

/**
 * Unified Tab Component — based on Tasks App style
 *
 * Key visual properties:
 * - 1px indicator in #212B36 (near-black), flush with container border
 * - Container border: 1px solid #EFF1F4 (light gray)
 * - Text: #212B36 for both active and inactive (no color change on select)
 * - Font: 14px, weight 400, Inter
 * - Tab gap: 12px
 * - Container height: 48px
 * - Overflow: "N more" dropdown
 */
export function UnifiedTabs({
  tabs,
  defaultActive,
  showOverflowDemo = false,
}: UnifiedTabsProps) {
  const [active, setActive] = useState(defaultActive ?? tabs[0]?.key ?? '')
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const containerRef = useRef<HTMLDivElement>(null)
  const [overflowOpen, setOverflowOpen] = useState(false)

  const visibleTabs = showOverflowDemo ? tabs.slice(0, 3) : tabs
  const overflowTabs = showOverflowDemo ? tabs.slice(3) : []

  useEffect(() => {
    const btn = tabRefs.current.get(active)
    const container = containerRef.current
    if (btn && container) {
      const containerRect = container.getBoundingClientRect()
      const btnRect = btn.getBoundingClientRect()
      setIndicatorStyle({
        left: btnRect.left - containerRect.left,
        width: btnRect.width,
      })
    }
  }, [active])

  return (
    <div
      ref={containerRef}
      className="relative flex items-center"
      style={{
        height: 48,
        padding: '0 20px',
        borderTop: '1px solid #DFE1E4',
        borderBottom: '1px solid #EFF1F4',
        gap: 12,
        overflow: 'visible',
      }}
    >
      {visibleTabs.map((tab) => (
        <button
          key={tab.key}
          ref={(el) => {
            if (el) tabRefs.current.set(tab.key, el)
          }}
          onClick={() => !tab.disabled && setActive(tab.key)}
          className="relative border-none bg-transparent cursor-pointer tab-hover"
          style={{
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 0,
            paddingBottom: 4,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            fontSize: 14,
            fontWeight: 400,
            lineHeight: '22px',
            fontFamily: 'Inter, sans-serif',
            color: tab.disabled ? '#90959D' : '#212B36',
            cursor: tab.disabled ? 'default' : 'pointer',
            minWidth: 60,
            justifyContent: 'center',
            transition: 'background-color 150ms ease',
          }}
        >
          {tab.label}
        </button>
      ))}

      {overflowTabs.length > 0 && (
        <div className="relative">
          <button
            onClick={() => setOverflowOpen(!overflowOpen)}
            className="border-none bg-transparent cursor-pointer flex items-center gap-1"
            style={{
              fontSize: 14,
              fontWeight: 400,
              fontFamily: 'Inter, sans-serif',
              color: '#6B6F76',
              padding: '0 4px',
              height: 44,
            }}
          >
            {overflowTabs.length} more
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {overflowOpen && (
            <div
              className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10"
              style={{ minWidth: 140 }}
            >
              {overflowTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActive(tab.key)
                    setOverflowOpen(false)
                  }}
                  className="w-full text-left border-none bg-transparent cursor-pointer hover:bg-gray-100 px-3 py-2"
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    fontFamily: 'Inter, sans-serif',
                    color: '#212B36',
                    backgroundColor:
                      active === tab.key ? '#EFF1F4' : undefined,
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Active indicator — sits on top of the container border, replacing it */}
      <div
        style={{
          position: 'absolute',
          bottom: -1,
          left: indicatorStyle.left,
          width: indicatorStyle.width,
          height: 1,
          backgroundColor: '#212B36',
          transition: 'left 200ms ease, width 200ms ease',
        }}
      />
    </div>
  )
}
