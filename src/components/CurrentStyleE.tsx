import { useState } from 'react'

const tabs = [
  { key: 'chat', label: 'Chat', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
  { key: 'notes', label: 'Notes', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
  { key: 'details', label: 'Details', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { key: 'files', label: 'Files', icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
]

/**
 * Recreation of ContextBarNavTabs (vertical icon tabs)
 * - Vertical icon-only layout
 * - Animated background indicator (bg-gray-150)
 * - Tooltip on hover
 * - 32x32 icon buttons
 */
export function CurrentStyleE() {
  const [active, setActive] = useState('chat')

  return (
    <div className="relative flex flex-col items-center gap-2 py-2">
      {tabs.map((tab) => {
        const isActive = active === tab.key
        return (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className="relative border-none cursor-pointer flex items-center justify-center"
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              backgroundColor: isActive ? '#EFF1F4' : 'transparent',
              transition: 'background-color 150ms ease',
              color: isActive ? '#212B36' : '#6B6F76',
            }}
            title={tab.label}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={tab.icon} />
            </svg>
          </button>
        )
      })}
    </div>
  )
}
