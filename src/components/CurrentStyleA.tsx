import { useState } from 'react'

const tabs = ['Me', 'Team', 'Client', 'Unassigned', 'All']

/**
 * Recreation of Tasks App FilterButtonsGroup
 * - 1px indicator in gray[600] (#212B36)
 * - Same text color active/inactive (#212B36)
 * - 14px, weight 400, Inter
 * - 48px height, 12px gap
 * - disableRipple
 */
export function CurrentStyleA() {
  const [active, setActive] = useState(0)

  return (
    <div
      className="relative flex items-center"
      style={{
        height: 48,
        padding: '0 20px',
        borderTop: '1px solid #DFE1E4',
        borderBottom: '1px solid #DFE1E4',
        gap: 12,
      }}
    >
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setActive(i)}
          className="relative border-none bg-transparent cursor-pointer"
          style={{
            padding: '0 4px',
            paddingBottom: 4,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            fontSize: 14,
            fontWeight: 400,
            lineHeight: '22px',
            fontFamily: 'Inter, sans-serif',
            color: '#212B36',
            minWidth: 60,
            justifyContent: 'center',
          }}
        >
          {tab}
          {active === i && (
            <span
              style={{
                position: 'absolute',
                bottom: -1,
                left: 0,
                width: '100%',
                height: 1,
                backgroundColor: '#212B36',
              }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
