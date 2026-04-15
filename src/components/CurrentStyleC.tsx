import { useState } from 'react'

const tabs = ['Companies', 'Clients', 'Contacts', 'Settings', 'Integrations']

/**
 * Recreation of ResponsiveTabs (Modern Tailwind style)
 * - 1px underline in gray-500
 * - Flexible height
 * - 8px gap between tabs
 * - Active: text-primary, Inactive: text-secondary (gray)
 */
export function CurrentStyleC() {
  const [active, setActive] = useState(0)

  return (
    <div className="flex gap-2 px-3 items-center h-12 border-y border-solid border-gray-200">
      {tabs.map((tab, i) => (
        <div key={tab} className="h-full">
          <button
            onClick={() => setActive(i)}
            className={[
              'h-full px-2 border-0 border-b border-solid bg-transparent cursor-pointer whitespace-nowrap rounded-none',
              'text-sm font-medium',
              active === i
                ? 'border-gray-500 text-gray-600'
                : 'border-transparent text-gray-500',
            ].join(' ')}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {tab}
          </button>
        </div>
      ))}
    </div>
  )
}
