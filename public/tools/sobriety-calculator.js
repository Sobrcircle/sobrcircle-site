// Sobriety calculator for /sobriety-calculator/.
// Loaded as a file (the site's CSP blocks inline scripts). Everything runs in
// the browser; the date never leaves the device.
(function () {
  var form = document.getElementById('sc-form')
  var input = document.getElementById('sc-date')
  var out = document.getElementById('sc-result')
  if (!form || !input || !out) return

  // Same milestones the app awards badges for.
  // Kept in date order: 24 hours, months 1-11, 1 year, 18 months, then yearly.
  var MILESTONES = [{ label: '24 Hours', days: 1 }]
  for (var m = 1; m <= 11; m++) MILESTONES.push({ label: m + (m === 1 ? ' Month' : ' Months'), months: m })
  for (var y = 1; y <= 100; y++) {
    MILESTONES.push({ label: y + (y === 1 ? ' Year' : ' Years'), months: y * 12 })
    if (y === 1) MILESTONES.push({ label: '18 Months', months: 18 })
  }

  function startOfDay(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate())
  }

  function addMonths(d, n) {
    var r = new Date(d.getFullYear(), d.getMonth() + n, 1)
    var last = new Date(r.getFullYear(), r.getMonth() + 1, 0).getDate()
    r.setDate(Math.min(d.getDate(), last))
    return r
  }

  function daysBetween(a, b) {
    return Math.round((startOfDay(b) - startOfDay(a)) / 86400000)
  }

  function milestoneDate(start, ms) {
    if (ms.days) {
      var d = new Date(start)
      d.setDate(d.getDate() + ms.days)
      return d
    }
    return addMonths(start, ms.months)
  }

  function plural(n, word) {
    return n.toLocaleString() + ' ' + word + (n === 1 ? '' : 's')
  }

  function render(start) {
    var today = startOfDay(new Date())
    var days = daysBetween(start, today)
    if (days < 0) {
      out.innerHTML = '<p>That date is in the future. Pick the day you started.</p>'
      return
    }

    var years = 0, months = 0
    while (addMonths(start, (years * 12) + 12) <= today) years++
    while (addMonths(start, (years * 12) + months + 1) <= today) months++
    var anchor = addMonths(start, years * 12 + months)
    var rest = daysBetween(anchor, today)

    var parts = []
    if (years) parts.push(plural(years, 'year'))
    if (months) parts.push(plural(months, 'month'))
    if (rest || !parts.length) parts.push(plural(rest, 'day'))

    var upcoming = []
    for (var i = 0; i < MILESTONES.length && upcoming.length < 4; i++) {
      var when = milestoneDate(start, MILESTONES[i])
      if (when > today) upcoming.push({ label: MILESTONES[i].label, date: when })
    }
    var next = upcoming[0] || null

    var html = '<p class="sc-big">' + days.toLocaleString() + '</p>' +
      '<p class="sc-label">' + (days === 1 ? 'day' : 'days') + ' sober</p>' +
      '<p class="sc-breakdown">' + parts.join(', ') + '</p>' +
      '<p class="sc-stats">' + plural(Math.floor(days / 7), 'week') + ' &middot; ' +
      plural(days * 24, 'hour') + '</p>'
    if (next) {
      var left = daysBetween(today, next.date)
      html += '<p class="sc-next">Next milestone: <strong>' + next.label + '</strong> on ' +
        next.date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) +
        ' (' + plural(left, 'day') + ' to go)</p>'
      if (upcoming.length > 1) {
        html += '<ul class="sc-upcoming">' + upcoming.slice(1).map(function (u) {
          return '<li><span>' + u.label + '</span><span>' +
            u.date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) + '</span></li>'
        }).join('') + '</ul>'
      }
    }
    out.innerHTML = html
  }

  function parse(value) {
    var p = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
    if (!p || +p[1] < 1900) return null
    return new Date(+p[1], +p[2] - 1, +p[3])
  }

  var t = new Date()
  input.min = '1900-01-01'
  input.max = t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0')

  form.addEventListener('submit', function (e) {
    e.preventDefault()
    var d = parse(input.value)
    if (!d) { out.innerHTML = '<p>Pick your sobriety date to see your time.</p>'; return }
    render(d)
  })
  // Update when the field is left, not on every keystroke while a year is typed.
  input.addEventListener('blur', function () {
    var d = parse(input.value)
    if (d) render(d)
  })
})()
