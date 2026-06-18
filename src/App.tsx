import { useState } from 'react'
import { CurrentStyleA } from './components/CurrentStyleA'
import { CurrentStyleB } from './components/CurrentStyleB'
import { CurrentStyleC } from './components/CurrentStyleC'
import { CurrentStyleD } from './components/CurrentStyleD'
import { MobileDropdown } from './components/MobileDropdown'
import { UnifiedTabs } from './components/UnifiedTabs'

const sampleTabs = [
  { key: 'me', label: 'Me' },
  { key: 'team', label: 'Team' },
  { key: 'client', label: 'Client' },
  { key: 'unassigned', label: 'Unassigned' },
  { key: 'all', label: 'All' },
]

const overflowTabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'invoices', label: 'Invoices' },
  { key: 'subscriptions', label: 'Subscriptions' },
  { key: 'store', label: 'Store' },
  { key: 'payment-links', label: 'Payment Links' },
  { key: 'services', label: 'Services' },
]

const disabledTabs = [
  { key: 'invoice', label: 'Invoice' },
  { key: 'email', label: 'Email' },
  { key: 'checkout', label: 'Checkout', disabled: true },
  { key: 'summary', label: 'Summary' },
]

const migrationData = [
  {
    style: 'Style B — Legacy MUI (BaseTab)',
    color: '#09AA6C',
    files: [
      'CrmTabs.tsx — Companies/Clients page',
      'ContractsTablePage.tsx',
      'ContractDetailsPage.tsx',
      'FormDetailsTabHeader.tsx',
      'ClientImportsPageContainer.tsx',
      'PreviewStep.tsx',
    ],
  },
  {
    style: 'Style C — Modern Tailwind (ResponsiveTabs)',
    color: '#6B6F76',
    files: [
      'PaymentsTabs.tsx',
      'ContextBarTabs.tsx',
      'CompanyDetailsModules.tsx',
      'ClientModulesContainer.tsx',
    ],
  },
  {
    style: 'Style D — Billing Preview',
    color: '#212B36',
    files: ['BillingPreviewTabs.tsx — Invoice preview'],
  },
]

function SectionHeader({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-medium m-0 mb-1">{title}</h2>
      <p className="text-sm text-gray-500 m-0">{subtitle}</p>
    </div>
  )
}

function StyleLabel({
  name,
  details,
}: {
  name: string
  details: string[]
}) {
  return (
    <div className="mb-2 mt-6">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
        {name}
      </span>
      <div className="flex gap-3 mt-1 flex-wrap">
        {details.map((d) => (
          <span
            key={d}
            className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded"
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  )
}

function PhoneFrame({ children, title = 'CRM' }: { children: React.ReactNode; title?: string }) {
  return (
    <div
      className="mx-auto bg-white"
      style={{ width: 375 }}
    >
      {/* Mobile top bar */}
      <div
        className="flex items-center gap-3"
        style={{ height: 48, padding: '0 12px', borderBottom: '1px solid #EFF1F4' }}
      >
        {/* Hamburger button */}
        <div
          className="flex items-center justify-center border border-gray-200 rounded-lg"
          style={{ width: 36, height: 36 }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#212B36" strokeWidth="1.5">
            <path d="M3 5h12M3 9h12M3 13h12" strokeLinecap="round" />
          </svg>
        </div>
        <span style={{ fontSize: 15, fontWeight: 500, fontFamily: 'Inter, sans-serif', color: '#212B36' }}>{title}</span>
      </div>
      <div className="overflow-visible">{children}</div>
    </div>
  )
}

export default function App() {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')
  const isMobile = viewMode === 'mobile'

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      {/* Sticky toggle bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 -mx-8 px-8 py-3 mb-8 flex items-center justify-between">
        <h1 className="text-lg font-medium m-0">Tab Component Unification</h1>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('desktop')}
            className={[
              'px-3 py-1.5 text-sm font-medium rounded-md border-none cursor-pointer transition-colors',
              !isMobile ? 'bg-white shadow-sm text-gray-600' : 'bg-transparent text-gray-400',
            ].join(' ')}
          >
            Desktop
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={[
              'px-3 py-1.5 text-sm font-medium rounded-md border-none cursor-pointer transition-colors',
              isMobile ? 'bg-white shadow-sm text-gray-600' : 'bg-transparent text-gray-400',
            ].join(' ')}
          >
            Mobile
          </button>
        </div>
      </div>

      <header className="mb-12">
        <p className="text-sm text-gray-500 m-0">
          Prototype showing current inconsistencies and proposed unified style.
          Target: Tasks app tab pattern.
        </p>
      </header>

      {/* Section 1: Current State */}
      <section className="mb-16">
        <SectionHeader
          title="Current State — Inconsistencies"
          subtitle="4 different tab styles across the product — notice the height differences"
        />

        <div className="space-y-8">
          <div>
            <div className="flex items-baseline justify-between mb-1">
              <h3 className="text-sm font-medium m-0">FilterButtonsGroup</h3>
              <span className="text-xs text-gray-400">Tasks app</span>
            </div>
            <p className="text-xs text-gray-400 m-0 mb-3">
              {isMobile ? 'Mobile: switches to dropdown selector' : '1px indicator, 48px height, 12px gap, no hover'}
            </p>
            {isMobile ? (
              <PhoneFrame title="Tasks">
                <MobileDropdown tabs={['Me', 'Team', 'Client', 'Unassigned', 'All']} />
              </PhoneFrame>
            ) : (
              <div className="px-2">
                <CurrentStyleA />
              </div>
            )}
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-1">
              <h3 className="text-sm font-medium m-0">BaseTabsHeader</h3>
              <span className="text-xs text-gray-400">CRM, Contracts, Forms</span>
            </div>
            <p className="text-xs text-gray-400 m-0 mb-3">
              {isMobile ? 'Mobile: horizontal scroll, reduced padding (16px)' : <>1px indicator, <strong className="text-gray-500">64px height</strong>, 40px tab spacing, no hover</>}
            </p>
            {isMobile ? (
              <PhoneFrame title="CRM">
                <CurrentStyleB hideTopBorder />
              </PhoneFrame>
            ) : (
              <div className="px-2">
                <CurrentStyleB />
              </div>
            )}
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-1">
              <h3 className="text-sm font-medium m-0">ResponsiveTabs</h3>
              <span className="text-xs text-gray-400">Payments, Context Bar, Company Details</span>
            </div>
            <p className="text-xs text-gray-400 m-0 mb-3">
              {isMobile ? 'Mobile: "N more" overflow dropdown compresses tabs' : <>1px gray indicator, <strong className="text-gray-500">48px height</strong>, 8px gap, gray inactive text, has hover bg</>}
            </p>
            {isMobile ? (
              <PhoneFrame title="Billing">
                <div
                  className="relative flex items-center"
                  style={{ height: 48, padding: '0 12px', borderBottom: '1px solid #DFE1E4', gap: 8 }}
                >
                  {['Companies', 'Clients'].map((tab, i) => (
                    <span
                      key={tab}
                      className="relative whitespace-nowrap flex items-center"
                      style={{
                        fontSize: 14, fontWeight: 500, fontFamily: 'Inter, sans-serif',
                        color: i === 0 ? '#212B36' : '#6B6F76',
                        padding: '0 8px', height: '100%',
                      }}
                    >
                      {tab}
                      {i === 0 && (
                        <span style={{
                          position: 'absolute', bottom: -1, left: 8, right: 8,
                          height: 1, backgroundColor: '#6B6F76',
                        }} />
                      )}
                    </span>
                  ))}
                  <span className="flex items-center" style={{ fontSize: 14, fontFamily: 'Inter, sans-serif', color: '#6B6F76', gap: 4 }}>
                    3 more
                    <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                      <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </PhoneFrame>
            ) : (
              <div className="px-2">
                <CurrentStyleC />
              </div>
            )}
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-1">
              <h3 className="text-sm font-medium m-0">BillingPreviewTabs</h3>
              <span className="text-xs text-gray-400">Invoice preview</span>
            </div>
            <p className="text-xs text-gray-400 m-0 mb-3">
              {isMobile ? <><strong className="text-red-400">No mobile handling</strong> — same as desktop, may overflow</> : <>1px indicator, <strong className="text-gray-500">40px height</strong>, rounded top corners, same text color, no hover</>}
            </p>
            {isMobile ? (
              <PhoneFrame title="Invoice Preview">
                <CurrentStyleD hideTopBorder />
              </PhoneFrame>
            ) : (
              <div className="px-2">
                <CurrentStyleD />
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Section 2: Unified Style */}
      <section className="mb-16">
        <SectionHeader
          title="Proposed Unified Style"
          subtitle="Based on Tasks app — 1px black indicator flush with gray separator line. Adds consistent hover state (currently missing across all surfaces)."
        />

        {isMobile ? (
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-medium m-0 mb-1">Mobile — dropdown selector</h3>
              <p className="text-xs text-gray-400 m-0 mb-3">Adopts Tasks app mobile pattern — tabs collapse into a dropdown</p>
              <PhoneFrame title="Tasks">
                <MobileDropdown tabs={['Me', 'Team', 'Client', 'Unassigned', 'All']} />
              </PhoneFrame>
            </div>

          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-medium m-0 mb-3">Default</h3>
              <div className="px-2 overflow-visible">
                <UnifiedTabs tabs={sampleTabs} />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium m-0 mb-1">With overflow</h3>
              <p className="text-xs text-gray-400 m-0 mb-3">Tabs that don't fit collapse into a "N more" dropdown</p>
              <div className="px-2 overflow-visible">
                <UnifiedTabs tabs={overflowTabs} showOverflowDemo />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium m-0 mb-1">With disabled tab</h3>
              <p className="text-xs text-gray-400 m-0 mb-3">Disabled tabs show in #90959D and are non-clickable</p>
              <div className="px-2 overflow-visible">
                <UnifiedTabs tabs={disabledTabs} />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium m-0 mb-1">Spacing (leading inset)</h3>
              <p className="text-xs text-gray-400 m-0 mb-3">
                "Spacing" indents the first tab from the bar's left edge. The gap
                <strong className="text-gray-500"> between</strong> tabs stays a fixed 12px — only the leading inset changes.
              </p>
              <div className="space-y-4">
                {(['none', '8px', '12px', '16px', '20px', '24px'] as const).map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 w-20 shrink-0 text-right">Spacing {s}</span>
                    <div className="flex-1 overflow-visible">
                      <UnifiedTabs tabs={sampleTabs} spacing={s} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 p-5 bg-gray-100 rounded-lg">
          <h3 className="text-sm font-medium m-0 mb-4">Unified Style Spec</h3>
          <div className="grid grid-cols-[140px_1fr] gap-x-6 gap-y-3 text-sm">
            {[
              ['Indicator', '1px, #212B36 (near-black), flush with container border'],
              ['Active text', '#212B36'],
              ['Inactive text', '#212B36 (same — no color change)'],
              ['Disabled text', '#90959D'],
              ['Font', '14px, weight 400, Inter'],
              ['Tab gap', '12px (fixed — does NOT change with spacing)'],
              ['Spacing', 'Leading inset of the bar: none / 8 / 12 / 16 / 20 / 24px'],
              ['Height', '48px'],
              ['Border', '1px solid #EFF1F4'],
              ['Hover', 'Full-height bg #F8F9FB (standardized — currently inconsistent)'],
              ['Overflow', '"N more" dropdown'],
            ].map(([prop, val]) => (
              <>
                <div key={prop} className="font-medium text-gray-600">{prop}</div>
                <div className="text-gray-500">{val}</div>
              </>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Migration Map */}
      <section className="mb-16">
        <SectionHeader
          title="Migration Map"
          subtitle="11 pages across the webapp need to switch to the unified style"
        />

        <div className="space-y-6">
          {migrationData.map((group) => (
            <div key={group.style} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-3 h-0.5 rounded"
                  style={{ backgroundColor: group.color }}
                />
                <h3 className="text-sm font-medium m-0">{group.style}</h3>
                <span className="text-xs text-gray-400 ml-auto">
                  {group.files.length} file{group.files.length > 1 ? 's' : ''}
                </span>
              </div>
              <ul className="m-0 pl-5 space-y-1">
                {group.files.map((f) => (
                  <li key={f} className="text-sm text-gray-500">
                    <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                      {f}
                    </code>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-gray-100 rounded-lg text-sm text-gray-500">
          <strong>Note:</strong> ContextBarNavTabs (vertical icon tabs in sidebar) stays as-is — it's a
          fundamentally different navigation pattern.
        </div>
      </section>
    </div>
  )
}
