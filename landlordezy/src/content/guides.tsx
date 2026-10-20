/**
 * Ontario landlord guides. Every rule stated here was checked on 2026-10-15
 * against the official source linked in that guide (Tribunals Ontario, the LTB's
 * form instructions, ontario.ca). Before these go live on landlordezy.ca, a
 * licensed paralegal should review them and be named as the reviewer.
 */
import type { ReactNode } from 'react'
import { site, url } from '../site'
import { FormTable, type FormRow } from '../components/FormTable'

export type GuideSection = {
  id: string
  title: string
  body: ReactNode
  /** A calculator shown right after this section. */
  tool?: 'n4' | 'rent' | 'lmr'
}
export type Guide = {
  slug: string
  title: string
  description: string
  h1: string
  dek: string
  minutes: number
  card: string
  /** The answer in two or three sentences, shown above the guide. Omit when the first section already is one. */
  answer?: ReactNode
  sections: GuideSection[]
  sources: { label: string; href: string }[]
}

const official = site.official

const formRow = (code: string, name: string, use: string, filing?: string): FormRow => ({ code, name, use, filing })

export const landlordNotices = [
  formRow('N1', 'Notice of Rent Increase', 'A standard rent increase, with at least 90 days’ written notice.'),
  formRow('N2', 'Notice of Rent Increase (Unit Partially Exempt)', 'A rent increase for units that are partially exempt from the Act’s rent rules.'),
  formRow('N3', 'Notice to Increase the Rent and/or Charges for Care Services and Meals', 'Care homes only.'),
  formRow('N4', 'Notice to End your Tenancy Early for Non-payment of Rent', 'The tenant hasn’t paid rent that’s due. The first step to an L1.'),
  formRow('N5', 'Notice to End your Tenancy for Interfering with Others, Damage or Overcrowding', 'Damage, disturbing others or overcrowding.'),
  formRow('N6', 'Notice to End your Tenancy for Illegal Acts or Misrepresenting Income in a Rent-Geared-to-Income Rental Unit', 'An illegal act in the unit or complex, or misrepresented income in RGI housing.'),
  formRow('N7', 'Notice to End your Tenancy for Causing Serious Problems in the Rental Unit or Residential Complex', 'Serious problems, such as wilful damage or impaired safety.'),
  formRow('N8', 'Notice to End your Tenancy at the End of the Term', 'Ending a tenancy at the end of the term, most often for persistent late payment.'),
  formRow('N10', 'Agreement to Increase the Rent Above the Guideline', 'A tenant agrees to an above-guideline increase for capital work or a new service.'),
  formRow('N11', 'Agreement to End the Tenancy', 'Landlord and tenant both agree to end the tenancy on a date.'),
  formRow('N12', 'Notice to End your Tenancy Because the Landlord, a Purchaser or a Family Member Requires the Rental Unit', 'You, a family member or a buyer will live in the unit.'),
  formRow('N13', 'Notice to End your Tenancy Because the Landlord Wants to Demolish the Rental Unit, Repair it or Convert it to Another Use', 'Demolition, major repairs or conversion to another use.'),
  formRow('N14', 'Landlord’s Notice to the Spouse of the Tenant who Vacated the Rental Unit', 'The tenant has left and their spouse is still living in the unit.'),
]

export const tenantNotices = [
  formRow('N9', 'Tenant’s Notice to End the Tenancy', 'A tenant gives notice that they’re moving out.'),
  formRow('N15', 'Tenant’s Notice to End my Tenancy Because of Fear of Sexual or Domestic Violence and Abuse', 'A tenant ends the tenancy early for their safety.'),
]

export const landlordApplications = [
  formRow('L1', 'Application to Evict a Tenant for Non-payment of Rent and to Collect Rent the Tenant Owes', 'After an N4 expires unpaid.', 'Tribunals Ontario Portal'),
  formRow('L2', 'Application to End a Tenancy and Evict a Tenant or Collect Money', 'After most other notices (N5, N6, N7, N8, N12, N13) or to collect other money.', 'Tribunals Ontario Portal'),
  formRow('L3', 'Application to End a Tenancy – Tenant Gave Notice or Agreed to Terminate the Tenancy', 'The tenant gave an N9 or signed an N11 but didn’t leave.', 'Tribunals Ontario Portal'),
  formRow('L4', 'Application to End a Tenancy and Evict a Tenant – Tenant Failed to Meet Conditions of a Settlement or Order', 'The tenant broke the terms of a settlement or order.', 'Tribunals Ontario Portal'),
  formRow('L5', 'Application for a Rent Increase Above the Guideline', 'Capital work, large tax increases or new security costs.', 'Mail, courier, ServiceOntario or email'),
  formRow('L6', 'Application for Review of a Work Order about Provincial Maintenance Standards', 'Disputing a provincial maintenance work order.', 'Mail, courier, ServiceOntario or email'),
  formRow('L7', 'Application to Transfer a Care Home Tenant', 'Care homes only.', 'Mail, courier, ServiceOntario or email'),
  formRow('L8', 'Application Because the Tenant Changed the Locks', 'The tenant changed the locks without consent.', 'Mail, courier, ServiceOntario or email'),
  formRow('L9', 'Application to Collect Rent the Tenant Owes', 'Collect rent without ending the tenancy (tenant still living there).', 'Tribunals Ontario Portal'),
  formRow('L10', 'Application to Collect Money a Former Tenant Owes', 'The tenant has moved out and still owes money.', 'Tribunals Ontario Portal'),
]

export const tenantApplications = [
  formRow('T1', 'Tenant Application for a Rebate', 'Money the tenant says the landlord owes them.', 'Tribunals Ontario Portal'),
  formRow('T2', 'Application about Tenant Rights', 'Harassment, illegal entry, withheld services and similar issues.', 'Tribunals Ontario Portal'),
  formRow('T3', 'Tenant Application for a Rent Reduction', 'For example, after a cut in services or municipal taxes.', 'Mail, courier, ServiceOntario or email'),
  formRow('T4', 'Tenant Application – Landlord did not Comply with an Agreement to Increase Rent Above the Guideline', 'The landlord didn’t do what an N10 promised.', 'Mail, courier, ServiceOntario or email'),
  formRow('T5', 'Tenant Application – Landlord Gave a Notice of Termination in Bad Faith', 'Typically after an N12 or N13.', 'Tribunals Ontario Portal'),
  formRow('T6', 'Tenant Application about Maintenance', 'Repairs and maintenance.', 'Tribunals Ontario Portal'),
  formRow('T7', 'Tenant Application about Suite Meters', 'Suite-metered utilities.', 'Mail, courier, ServiceOntario or email'),
]

export const otherApplications = [
  formRow('A1', 'Application about Whether the Act Applies', 'Either side asks whether the Residential Tenancies Act applies.', 'Mail, courier, ServiceOntario or email'),
  formRow('A2', 'Application about a Sublet or an Assignment', 'Disputes about subletting or assigning the unit.', 'Mail, courier, ServiceOntario or email'),
  formRow('A4', 'Application to Vary the Amount of a Rent Reduction', 'Changing a rent reduction amount.', 'Mail, courier, ServiceOntario or email'),
]

export const guides: Guide[] = [
  {
    slug: 'bill-60',
    title: 'Bill 60 for Ontario Landlords: What Changed in 2026 | LandlordEzy',
    description:
      'Bill 60 took effect September 21, 2026: a 7-day N4, half the arrears before tenant issues at L1 hearings, no N12 compensation at 120 days, new forms by Nov. 30.',
    h1: 'Bill 60: what changed for Ontario landlords',
    dek: 'The biggest update to Ontario’s rental rules in years took effect on September 21, 2026. Here’s what applies to notices and applications today, in plain English.',
    minutes: 6,
    card: 'The 7-day N4, the half-arrears rule, N12 compensation and the November 30 form deadline.',
    sources: [
      { label: 'Tribunals Ontario: LTB operational update, September 21, 2026', href: official.bill60Update },
      { label: 'LTB: N4 instructions', href: official.n4Instructions },
      { label: 'LTB: N12 instructions', href: official.n12Instructions },
      { label: 'LTB: N8 instructions', href: official.n8Instructions },
    ],
    sections: [
      {
        id: 'short-version',
        title: 'The short version',
        body: (
          <>
            <p>
              The changes come from the <em>Fighting Delays, Building Faster Act</em> (Bill 60) and the <em>Helping Homebuyers,
              Protecting Tenants Act, 2023</em> (Bill 97). Since September 21, 2026:
            </p>
            <ul>
              <li>An N4 for unpaid rent needs <strong>7 days’</strong> notice, down from 14.</li>
              <li>
                To raise other issues at an arrears hearing, a tenant must first pay you <strong>half the arrears</strong> you claimed.
              </li>
              <li>
                An N12 for your own or a family member’s use with <strong>120 days’</strong> notice needs no compensation.
              </li>
              <li>Whoever moves in after an N12 must do so within <strong>60 days</strong>.</li>
              <li>“Persistent late payment” now has a definition.</li>
              <li>Relief from eviction is harder to get.</li>
              <li>
                Ten LTB forms were updated; old versions stop being accepted on <strong>November 30, 2026</strong>.
              </li>
            </ul>
          </>
        ),
      },
      {
        id: 'n4',
        title: 'N4: 7 days instead of 14',
        body: (
          <>
            <p>
              For an N4 given on or after September 21, 2026, the termination date must be at least 7 days after you give the
              notice. Don’t count the day you give it. Add one business day if you send it by courier, and five days if you mail it.
            </p>
            <p>
              Nothing changed about voiding: if the tenant pays everything owing by the termination date, the notice is void. Try
              the <a href={url('tools/n4-date-calculator/')}>N4 date calculator</a> to get the date right.
            </p>
          </>
        ),
      },
      {
        id: 'half-arrears',
        title: 'Arrears hearings: half the arrears first',
        body: (
          <>
            <p>
              For non-payment applications filed on or after September 21, 2026, a tenant who wants to raise other issues at the
              hearing, such as maintenance or tenant rights, must pay you half of the arrears claimed in your application at least
              seven days before the hearing.
            </p>
            <p>
              The money goes directly to you. It can’t be paid to the LTB in trust. Give a receipt and record the payment in your
              ledger so the amount owing stays accurate.
            </p>
          </>
        ),
      },
      {
        id: 'n12',
        title: 'N12: no compensation at 120 days’ notice',
        body: (
          <>
            <p>
              When you need a unit for yourself or a family member (Reason 1 on the N12), you don’t have to pay one month’s
              compensation or offer another unit if the termination date is at least 120 days after you give the notice. The date
              must still fall on the last day of a rental period, or the last day of a fixed term.
            </p>
            <p>
              Give less than 120 days and compensation is still required. The minimum notice for an N12 is 60 days.
            </p>
            <p>
              Whoever the notice is for must take occupancy within 60 days of the termination date in the N12. If not, bad faith is
              presumed if the tenant files a T5 application.
            </p>
          </>
        ),
      },
      {
        id: 'n13',
        title: 'N13: clearer duties during renovations',
        body: (
          <>
            <p>After an N13 for repairs or renovations, a landlord must now:</p>
            <ul>
              <li>tell the tenant the estimated completion date without delay,</li>
              <li>update the tenant if the timeline changes,</li>
              <li>confirm in writing when the work is finished, and</li>
              <li>give the tenant 60 days’ notice to move back in.</li>
            </ul>
            <p>
              A tenant’s T5 bad-faith application can now be filed up to two years after they move out, or six months after the
              renovations are finished, whichever is later.
            </p>
          </>
        ),
      },
      {
        id: 'n8',
        title: 'N8: “persistently late” is now defined',
        body: (
          <>
            <p>
              Rent is persistently late when it’s received more than seven days after the due date, at least three times within a
              six-month period. A payment doesn’t count as late just because you applied it to older arrears, and the Board can
              still find persistent lateness in other circumstances.
            </p>
            <p>
              You can only prove this with accurate records. Keep a ledger that shows the date each payment actually arrived.
            </p>
          </>
        ),
      },
      {
        id: 'relief',
        title: 'Relief from eviction is harder to get',
        body: (
          <p>
            The Board can now delay or refuse an eviction only if doing so would not be unfair to the landlord or other tenants and
            there are compelling reasons, or if the landlord consents.
          </p>
        ),
      },
      {
        id: 'forms',
        title: 'New forms: switch before November 30',
        body: (
          <>
            <p>
              The N5, N6, N8, N12, N13, L1, L2, L9, L10 and T5 were updated on September 21, 2026. The LTB stops accepting the
              previous versions on November 30, 2026. Download forms fresh from{' '}
              <a href={official.ltbForms} rel="noopener">
                Tribunals Ontario
              </a>{' '}
              each time rather than reusing saved copies. <a href={url('guides/ltb-forms/')}>See every LTB form, explained</a>.
            </p>
          </>
        ),
      },
      {
        id: 'checklist',
        title: 'Your checklist',
        body: (
          <ol>
            <li>Delete saved copies of the ten updated forms and download current versions.</li>
            <li>Use 7 days for every N4 given on or after September 21, 2026, plus mail or courier days.</li>
            <li>Keep a ledger with the actual date each payment arrived.</li>
            <li>Plan own-use N12s with at least 120 days’ notice, ending on the last day of a rental period.</li>
            <li>Make sure whoever moves in after an N12 does so within 60 days.</li>
            <li>Give a receipt for any half-arrears payment a tenant makes before an L1 hearing.</li>
          </ol>
        ),
      },
    ],
  },
  {
    slug: 'n4-notice',
    title: 'How to Serve an N4 in Ontario (2026 Rules) | LandlordEzy',
    description:
      'Step by step: when you can give an N4, how to fill in the rent owing table, the 7-day termination date, how to serve it, and when you can file the L1.',
    h1: 'How to serve an N4 in Ontario',
    dek: 'The N4 is the first step when a tenant doesn’t pay rent. Get the amounts and the date right, serve it properly, and you can apply to the Landlord and Tenant Board the day after it expires.',
    minutes: 7,
    card: 'When you can serve it, filling in the rent table, the 7-day date, and filing the L1.',
    answer: (
      <>
        Give an N4 once rent is due and unpaid. The termination date must be at least <strong>7 days</strong> after you give it,
        plus one business day by courier or five days by mail. If the tenant pays everything owing by then, the notice is void; if
        not, you can file an L1 the next day.
      </>
    ),
    sources: [
      { label: 'LTB: N4 instructions', href: official.n4Instructions },
      { label: 'Tribunals Ontario: LTB operational update, September 21, 2026', href: official.bill60Update },
      { label: 'Tribunals Ontario: forms, filing and fees', href: official.ltbForms },
    ],
    sections: [
      {
        id: 'when',
        title: 'When you can give an N4',
        body: (
          <>
            <p>
              You can give an N4 once rent is due and hasn’t been paid in full. If rent is due on the 1st and isn’t paid, the
              earliest day to give the notice is the 2nd. The tenant must still be living in the unit.
            </p>
            <p>
              If you want to collect the money without ending the tenancy, the LTB’s Form L9 is the alternative. If the tenant has
              already moved out, use Form L10.
            </p>
          </>
        ),
      },
      {
        id: 'amount',
        title: 'Step 1: Work out the rent owing',
        body: (
          <>
            <p>The table on page three of the N4 lists, for each rental period with unpaid rent:</p>
            <ul>
              <li>the period (from and to dates),</li>
              <li>the rent charged,</li>
              <li>the rent paid, and</li>
              <li>the rent owing.</li>
            </ul>
            <p>
              <strong>Only rent belongs on the N4.</strong> Rent includes the basic rent plus anything the tenant pays you
              separately for services, such as parking or a seasonal air-conditioning fee. A utility bill the tenant pays to the
              utility isn’t rent, but a flat monthly utility charge paid to you is. Don’t include the last month’s rent deposit or
              an NSF fee.
            </p>
            <p>
              If more than three periods are owing, you can combine earlier periods in the first rows, but the last row must show
              the most recent period. The total on page three must match the amount on page one.
            </p>
            <table>
              <caption className="caption-top pb-1 text-left text-[0.875rem] text-ink-3">Example: part of September and all of October unpaid</caption>
              <thead>
                <tr>
                  <th scope="col">Period</th>
                  <th scope="col">Charged</th>
                  <th scope="col">Paid</th>
                  <th scope="col">Owing</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sep 1–30, 2026</td>
                  <td>$1,610.00</td>
                  <td>$1,210.00</td>
                  <td>$400.00</td>
                </tr>
                <tr>
                  <td>Oct 1–31, 2026</td>
                  <td>$1,610.00</td>
                  <td>$0.00</td>
                  <td>$1,610.00</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total rent owing</strong>
                  </td>
                  <td />
                  <td />
                  <td>
                    <strong>$2,010.00</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ),
      },
      {
        id: 'date',
        title: 'Step 2: Set the termination date',
        tool: 'n4',
        body: (
          <>
            <p>
              The termination date must be at least 7 days after you give the notice, not counting the day you give it. If you hand
              it over on March 3, the earliest termination date is March 10. Mailed on March 3, it’s March 15, because mail adds five
              days. A courier adds one business day.
            </p>
            <p>
              Work out yours below. The calculator applies the same rule, with courier and mail days added.
            </p>
          </>
        ),
      },
      {
        id: 'names',
        title: 'Step 3: Names, address and signature',
        body: (
          <p>
            Name every tenant, plus any subtenant or assignee. You don’t need to name other occupants, such as children or guests.
            Include the full address with the unit number and postal code, then sign as the landlord or the landlord’s
            representative.
          </p>
        ),
      },
      {
        id: 'serve',
        title: 'Step 4: Serve it',
        body: (
          <>
            <p>You can give the N4 by:</p>
            <ul>
              <li>handing it to the tenant, or to an adult in the unit,</li>
              <li>leaving it in the mailbox or where mail is normally delivered,</li>
              <li>sliding it under the door or through a mail slot,</li>
              <li>fax, courier or mail.</li>
            </ul>
            <p>
              <strong>You can’t give an N4 by taping it to the door.</strong> Keep a copy of exactly what you gave the tenant.
            </p>
          </>
        ),
      },
      {
        id: 'next',
        title: 'Step 5: What happens next',
        body: (
          <>
            <p>
              If the tenant pays everything owing by the termination date, the notice is void. If they don’t pay or move out, you can
              file an L1 starting the day after the termination date. You’ll file a copy of the N4 and a Certificate of Service
              showing when and how you gave it.
            </p>
            <p>
              For L1 applications filed on or after September 21, 2026, a tenant who wants to raise other issues at the hearing must
              first pay you half of the arrears claimed, at least seven days before the hearing.
            </p>
          </>
        ),
      },
      {
        id: 'mistakes',
        title: 'Mistakes that can get an N4 thrown out',
        body: (
          <ul>
            <li>The total on page one doesn’t match the table on page three.</li>
            <li>Non-rent amounts, like a deposit or NSF fee, are included.</li>
            <li>The termination date is too early for how the notice was delivered.</li>
            <li>A tenant’s name is missing.</li>
            <li>The notice was posted on the door.</li>
            <li>An old version of a form was used. Always download the current one.</li>
          </ul>
        ),
      },
    ],
  },
  {
    slug: 'rent-increase',
    title: 'Ontario Rent Increase Guideline 2027: 1.9% | LandlordEzy',
    description:
      'Ontario’s 2027 rent increase guideline is 1.9%. How much you can raise the rent, the 90-day N1 and 12-month rules, exempt units, and deposit interest.',
    h1: 'Ontario rent increases in 2027: the 1.9% guideline',
    dek: 'Ontario’s rent increase guideline for 2027 is 1.9%, down from 2.1% in 2026. Here’s how much you can raise the rent, when, and how to give notice.',
    minutes: 5,
    card: 'The 1.9% guideline, the N1 rules, exempt units and the deposit top-up.',
    answer: (
      <>
        In 2027 you can raise most rents by up to <strong>1.9%</strong>: once every 12 months, with at least 90 days’ written
        notice on Form N1. Units first occupied after November 15, 2018 are exempt from the guideline, but not from the notice and
        timing rules.
      </>
    ),
    sources: [
      { label: 'Ontario.ca: residential rent increases', href: official.rentIncreases },
      { label: 'Residential Tenancies Act, 2006 (e-Laws)', href: official.rta },
    ],
    sections: [
      {
        id: 'guideline',
        title: 'The 2027 guideline is 1.9%',
        body: (
          <>
            <p>
              The guideline applies to rent increases that take effect between January 1 and December 31, 2027. It’s based on
              Ontario’s Consumer Price Index and is the most a landlord can raise the rent for most tenancies in a year without approval from
              the Landlord and Tenant Board.
            </p>
            <table>
              <caption className="sr-only">Ontario rent increase guideline by year</caption>
              <thead>
                <tr>
                  <th scope="col">Year</th>
                  <th scope="col">Guideline</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['2027', '1.9%'],
                  ['2026', '2.1%'],
                  ['2025', '2.5%'],
                  ['2024', '2.5%'],
                  ['2023', '2.5%'],
                  ['2022', '1.2%'],
                  ['2021', '0% (rent freeze)'],
                  ['2020', '2.2%'],
                ].map(([y, g]) => (
                  <tr key={y}>
                    <td>{y}</td>
                    <td>{g}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ),
      },
      {
        id: 'rules',
        title: 'The three rules',
        body: (
          <ol>
            <li>
              <strong>Once every 12 months.</strong> Count from the last increase or, if there hasn’t been one, the day the tenancy
              began.
            </li>
            <li>
              <strong>At least 90 days’ written notice,</strong> on the LTB’s Form N1. A mailed notice counts as given five days after
              mailing.
            </li>
            <li>
              <strong>No more than the guideline</strong> for the year the increase takes effect, unless the unit is exempt or the
              Board approves more.
            </li>
          </ol>
        ),
      },
      {
        id: 'example',
        title: 'An example',
        tool: 'rent',
        body: (
          <p>
            The rent is $1,950 and the last increase took effect March 1, 2026. The next increase can take effect March 1, 2027, at
            up to 1.9%: a new rent of $1,987.05, or $37.05 more a month. Served by hand, the N1 must reach the tenant by December 1,
            2026, or be mailed by November 26. Work out any tenancy below.
          </p>
        ),
      },
      {
        id: 'exempt',
        title: 'Exempt units',
        body: (
          <p>
            The guideline doesn’t apply to units occupied for the first time for residential purposes after November 15, 2018. You
            can raise the rent on those units by more than the guideline, but the 90-day notice and 12-month rules still apply.
          </p>
        ),
      },
      {
        id: 'agi',
        title: 'Going above the guideline',
        body: (
          <p>
            For units covered by the guideline, an increase above it needs an order from the Board on Form L5 (an above-guideline
            increase), for things like major capital work, a large jump in municipal taxes or new security services. A tenant can
            also agree to an above-guideline increase on Form N10 in exchange for capital work or a new service.
          </p>
        ),
      },
      {
        id: 'deposit',
        title: 'Don’t forget the deposit',
        body: (
          <p>
            Each year you owe interest on a last month’s rent deposit at the guideline rate: 1.9% for interest due in 2027. When the
            rent goes up, you can keep that interest to top the deposit up toward the new rent. The{' '}
            <a href={url('tools/rent-deposit-interest-calculator/')}>deposit interest calculator</a> shows the split.
          </p>
        ),
      },
    ],
  },
  {
    slug: 'ltb-forms',
    title: 'Ontario LTB Forms Explained: N, L, T and A Forms | LandlordEzy',
    description:
      'Every Landlord and Tenant Board form, what it’s for and how it’s filed: N notices, L landlord applications, T tenant applications and A forms. Updated for Bill 60.',
    h1: 'Ontario LTB forms, explained',
    dek: 'Every Landlord and Tenant Board form a landlord is likely to meet, what it’s for, and how it’s filed. Updated for the forms that changed on September 21, 2026.',
    minutes: 8,
    card: 'Every N, L, T and A form in one place, with what it’s for and how to file it.',
    answer: (
      <>
        Use the current forms: the N5, N6, N8, N12, N13, L1, L2, L9, L10 and T5 changed on September 21, 2026, and old versions
        stop being accepted on <strong>November 30, 2026</strong>. Notices go to the other side; applications are filed with the
        Board, most of them online through the Tribunals Ontario Portal.
      </>
    ),
    sources: [
      { label: 'Tribunals Ontario: forms, filing and fees', href: official.ltbForms },
      { label: 'Tribunals Ontario: LTB operational update, September 21, 2026', href: official.bill60Update },
    ],
    sections: [
      {
        id: 'changed',
        title: 'Forms that changed on September 21, 2026',
        body: (
          <p>
            The N5, N6, N8, N12, N13, L1, L2, L9, L10 and T5 were updated with Bill 60. Previous versions stop being accepted on
            November 30, 2026. Always download the current form from{' '}
            <a href={official.ltbForms} rel="noopener">
              Tribunals Ontario
            </a>
            .
          </p>
        ),
      },
      { id: 'landlord-notices', title: 'Notices a landlord gives', body: <FormTable rows={landlordNotices} label="Notices a landlord gives" /> },
      { id: 'tenant-notices', title: 'Notices a tenant gives', body: <FormTable rows={tenantNotices} label="Notices a tenant gives" /> },
      { id: 'landlord-applications', title: 'Landlord applications', body: <FormTable rows={landlordApplications} label="Landlord applications" filing /> },
      { id: 'tenant-applications', title: 'Tenant applications', body: <FormTable rows={tenantApplications} label="Tenant applications" filing /> },
      { id: 'either', title: 'Applications either side can file', body: <FormTable rows={otherApplications} label="Applications either side can file" filing /> },
      {
        id: 'tips',
        title: 'Before you file',
        body: (
          <ul>
            <li>Notices are given to the other side; applications are filed with the Board.</li>
            <li>When you apply after a notice, you file a Certificate of Service showing when and how you gave it.</li>
            <li>Applications marked “Tribunals Ontario Portal” are filed online through the Board’s portal.</li>
          </ul>
        ),
      },
    ],
  },
]

export function guideBySlug(slug: string): Guide {
  const g = guides.find((x) => x.slug === slug)
  if (!g) throw new Error(`Unknown guide: ${slug}`)
  return g
}
