import { useState } from 'react'

const tabs = ['Invoice', 'Email', 'Checkout', 'Summary']

/**
 * Recreation of BillingPreviewTabs
 * - 2px underline in black (#212B36)
 * - Rounded top corners on active indicator
 * - All text same dark color
 * - 9px padding, 8px gap
 */
export function CurrentStyleD({ hideTopBorder }: { hideTopBorder?: boolean } = {}) {
  const [active, setActive] = useState(0)

  return (
    <div
      className={`flex items-center gap-2 ${hideTopBorder ? 'border-b' : 'border-y'} border-solid border-gray-150`}
      style={{ maxWidth: 320 }}
    >
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setActive(i)}
          className={[
            'bg-transparent cursor-pointer box-border',
            'text-sm font-normal text-gray-600',
            'border-0 border-b border-solid',
            active === i
              ? 'border-b-gray-600 rounded-t-[2px]'
              : 'border-transparent',
          ].join(' ')}
          style={{
            padding: 9,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
