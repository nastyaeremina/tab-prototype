import { useState, useRef, useEffect } from 'react'

interface Tab {
  key: string
  label: string
  disabled?: boolean
}

/**
 * Leading inset of the tab bar — i.e. how far the first tab is indented from
 * the bar's left edge. In Figma this is the "Spacing" variant property. It is
 * NOT the gap between tabs (that is fixed — see TAB_GAP below).
 */
export type TabSpacing = 'none' | '8px' | '12px' | '16px' | '20px' | '24px'

const SPACING_TO_PX: Record<TabSpacing, number> = {
  none: 0,
  '8px': 8,
  '12px': 12,
  '16px': 16,
  '20px': 20,
  '24px': 24,
}

/** Gap between adjacent tabs — fixed across every spacing variant in Figma. */
const TAB_GAP = 12

interface UnifiedTabsProps {
  tabs: Tab[]
  defaultActive?: string
  showOverflowDemo?: boolean
  /**
   * Leading inset of the bar (Figma "Spacing"). Indents the first tab from the
   * left edge so its label can line up with content below. Defaults to 20px.
   */
  spacing?: TabSpacing
}

/**
 * Unified Tab Component — based on Tasks App style
 *
 * Key visual properties:
 * - 1px indicator in #212B36 (near-black), flush with container border
 * - Container border: 1px solid #EFF1F4 (light gray)
 * - Text: #212B36 for both active and inactive (no color change on select)
 * - Font: 14px, weight 400, Inter
 * - Tab gap: fixed 12px (does NOT change with the spacing prop)
 * - Each tab: 8px horizontal padding
 * - Spacing: leading inset of the bar (none / 8 / 12 / 16 / 20 / 24px)
 * - Container height: 48px
 * - Overflow: "N more" dropdown
 */
export function UnifiedTabs({
  tabs,
  defaultActive,
  showOverflowDemo = false,
  spacing = '20px',
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
        // Spacing = leading inset only. No right padding (matches Figma).
        paddingLeft: SPACING_TO_PX[spacing],
        paddingRight: 0,
        borderTop: '1px solid #DFE1E4',
        borderBottom: '1px solid #EFF1F4',
        gap: TAB_GAP,
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
            {/* Exact ChevronDown from the design system icon set */}
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path
                fill="currentColor"
                d="M10.011 14.69a.93.93 0 0 1-.669-.273l-7.496-7.5c-.323-.332-.41-.914 0-1.324s.977-.344 1.325 0 6.84 6.836 6.84 6.836l6.836-6.842c.32-.318.927-.39 1.32.002.337.338.416.913 0 1.33l-7.5 7.498a.9.9 0 0 1-.656.273"
              />
            </svg>
          </button>
          {overflowOpen && (
            <div
              className="absolute top-full left-0 mt-1 bg-white rounded border py-1 z-10"
              style={{
                minWidth: 160,
                borderColor: '#DFE1E4',
                boxShadow: '0px 6px 20px 0px rgba(0, 0, 0, 0.07)',
              }}
            >
              {overflowTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActive(tab.key)
                    setOverflowOpen(false)
                  }}
                  className="w-full text-left border-none bg-transparent cursor-pointer hover:bg-gray-100 px-3 flex items-center"
                  style={{
                    height: 32,
                    fontSize: 14,
                    fontWeight: 400,
                    fontFamily: 'Inter, sans-serif',
                    color: '#212B36',
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
