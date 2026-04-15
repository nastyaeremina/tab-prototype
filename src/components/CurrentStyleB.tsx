import { useState } from 'react'

const tabs = ['Companies', 'Clients', 'Contacts', 'Settings', 'Integrations']

/**
 * Recreation of BaseTab/BaseTabs (Legacy MUI style)
 * - 1px underline in brand/primary color
 * - 64px fixed height container
 * - 40px spacing between tabs
 * - Active text in brand color
 */
export function CurrentStyleB({ hideTopBorder }: { hideTopBorder?: boolean } = {}) {
  const [active, setActive] = useState(0)

  return (
    <div
      className="relative flex items-center"
      style={{
        height: 64,
        padding: '0 36px',
        borderTop: hideTopBorder ? 'none' : '1px solid #DFE1E4',
        borderBottom: '1px solid #DFE1E4',
      }}
    >
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setActive(i)}
          className="relative border-none bg-transparent cursor-pointer"
          style={{
            marginRight: 40,
            padding: 0,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            fontSize: 13,
            fontWeight: 500,
            fontFamily: 'Inter, sans-serif',
            color: '#212B36',
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
