export type FormRow = { code: string; name: string; use: string; filing?: string }

/** A reference table of LTB forms, used inside guide content. */
export function FormTable({ rows, label, filing = false }: { rows: FormRow[]; label: string; filing?: boolean }) {
  return (
    // Focusable and labelled, so keyboard users can scroll it sideways on small screens.
    <div className="mt-6 overflow-x-auto" tabIndex={0} role="region" aria-label={`${label}, table`}>
      {/* On phones the filing method moves under the description instead of a third column. */}
      <table className="!mt-0 w-full">
        <thead>
          <tr>
            <th scope="col" className="w-14 sm:w-16">
              Form
            </th>
            <th scope="col">Official name and when it’s used</th>
            {filing && (
              <th scope="col" className="hidden w-48 sm:table-cell">
                How it’s filed
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.code}>
              <td className="font-semibold text-ink">{r.code}</td>
              <td>
                <span className="block text-ink">{r.name}</span>
                <span className="mt-0.5 block text-ink-3">{r.use}</span>
                {filing && r.filing && <span className="mt-1 block text-[0.8125rem] text-ink-4 sm:hidden">Filed: {r.filing}</span>}
              </td>
              {filing && <td className="hidden text-ink-3 sm:table-cell">{r.filing}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
