export type FormRow = { code: string; name: string; use: string; filing?: string }

/** A reference table of LTB forms, used inside guide content. */
export function FormTable({ rows, label, filing = false }: { rows: FormRow[]; label: string; filing?: boolean }) {
  return (
    // Focusable and labelled, so keyboard users can scroll it sideways on small screens.
    <div className="mt-6 overflow-x-auto" tabIndex={0} role="region" aria-label={`${label}, table`}>
      <table className="w-full min-w-[36rem]">
        <thead>
          <tr>
            <th scope="col" className="w-16">Form</th>
            <th scope="col">Official name and when it’s used</th>
            {filing && <th scope="col" className="w-48">How it’s filed</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.code}>
              <td className="font-semibold text-ink">{r.code}</td>
              <td>
                <span className="block text-ink">{r.name}</span>
                <span className="mt-0.5 block text-ink-3">{r.use}</span>
              </td>
              {filing && <td className="text-ink-3">{r.filing}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
