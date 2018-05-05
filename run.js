window.jQuery.noConflict()(function ($) {
  console.info('[sonarr-mpv]', 'Modifying page...')

  let findTargets
  findTargets = reset(modTargets, 1, findTargets)

  function modTargets () {
    let noEl = true
    $('.fc-event.success, .episode-title-cell.renderable').each(function (id) {
      $(this).off('click').on('click', e => setTimeout(addMpvLink, 1e3))
      noEl && (noEl = false)
    })

    if (noEl) {
      addMpvLink()
      console.warn('[sonarr-mpv]', 'No supported targets on this page.')
      findTargets = reset(modTargets, 4.5, findTargets)
    }
  }

  function addMpvLink () {
    $('div.episode-file-info tbody .renderable.string-cell')
      .css('color', '#00AAFA')
      .css('cursor', 'pointer')
      .css('transition', 'all ease-in 900ms')
      .off('click')
      .on('click', function (e) {
        e.preventDefault()
        const self = $(this)
        self.css('color', 'purple')
        setTimeout(() => self.css('color', '#00AAFA'), 3e3)
        window.location.replace(`mpv://${self.text().trim()}`)
      })
  }
})

function reset (cb, interval, timer) {
  if (timer) clearInterval(timer)
  return setInterval(cb, interval*1e3)
}
