/** Checks the calculators against the official worked examples. Run: npx tsx scripts/test-tools.ts */
import { n4Dates } from '../src/client/tools/n4'
import { rentIncrease } from '../src/client/tools/rent'
import { lmrInterest } from '../src/client/tools/lmr'
import { parseDate, toInputValue } from '../src/client/tools/shared'

let failed = 0
const eq = (label: string, got: unknown, want: unknown) => {
  const ok = JSON.stringify(got) === JSON.stringify(want)
  if (!ok) failed++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}: ${JSON.stringify(got)}${ok ? '' : ` (want ${JSON.stringify(want)})`}`)
}
const d = (s: string) => parseDate(s)!

// LTB N4 instructions: handed over March 3 → March 10; mailed March 3 → March 15.
eq('N4 hand-delivered', toInputValue(n4Dates(d('2027-03-03'), 'hand').termination), '2027-03-10')
eq('N4 mailed', toInputValue(n4Dates(d('2027-03-03'), 'mail').termination), '2027-03-15')
eq('N4 courier (Wed → Thu + 7)', toInputValue(n4Dates(d('2027-03-03'), 'courier').termination), '2027-03-11')
eq('N4 courier on a Friday (→ Mon + 7)', toInputValue(n4Dates(d('2026-10-16'), 'courier').termination), '2026-10-26')
eq('N4 file L1 from (day after)', toInputValue(n4Dates(d('2027-03-03'), 'hand').fileFrom), '2027-03-11')
eq('N4 before Bill 60 uses 14 days', n4Dates(d('2026-09-15'), 'hand').days, 14)
eq('N4 on Bill 60 day uses 7 days', n4Dates(d('2026-09-21'), 'hand').days, 7)

const r = rentIncrease({ rent: 1950, lastIncrease: d('2026-01-01'), serve: d('2026-09-15'), mail: false, exempt: false })
eq('N1 effective on anniversary', toInputValue(r.effective), '2027-01-01')
eq('N1 guideline 2027', r.guideline, 1.9)
eq('N1 new rent', r.newRent, 1987.05)
eq('N1 serve-by (hand)', toInputValue(r.serveBy), '2026-10-03')
const rm = rentIncrease({ rent: 1950, lastIncrease: d('2026-01-01'), serve: d('2026-09-15'), mail: true, exempt: false })
eq('N1 serve-by (mail)', toInputValue(rm.serveBy), '2026-09-28')
const late = rentIncrease({ rent: 2000, lastIncrease: d('2026-01-01'), serve: d('2026-11-20'), mail: false, exempt: false })
eq('N1 served late → 90 days after notice', toInputValue(late.effective), '2027-02-18')
const feb = rentIncrease({ rent: 1000, lastIncrease: d('2024-02-29'), serve: d('2024-06-01'), mail: false, exempt: false })
eq('N1 leap day anniversary', toInputValue(feb.anniversary), '2025-02-28')

const l = lmrInterest(1950, 2027, 1987.05)!
eq('LMR interest 2027', l.interest, 37.05)
eq('LMR top-up from interest', l.topUpFromInterest, 37.05)
eq('LMR payable after top-up', l.payable, 0)
const l2 = lmrInterest(2000, 2026, null)!
eq('LMR interest 2026, no rent change', [l2.interest, l2.payable], [42, 42])

console.log(failed ? `\n${failed} FAILED` : '\nAll calculator checks passed.')
process.exit(failed ? 1 : 0)
