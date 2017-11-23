const jq2 = window.jQuery.noConflict()
jq2(function ($) {
  let findTargets
  console.info('[sonarr-mpv]', 'Modifying page...')

  if (findTargets) clearInterval(findTargets)
  findTargets = setInterval(modTargets, 1000)

  function modTargets () {
    const els = $('.fc-event.success, .episode-title-cell.renderable')

    addMpvLink()
    if (els.length > 1) {
      return els.each(function () {
        $(this).on('click', e => setTimeout(addMpvLink, 1000))
      })
    }

    console.warn('[sonarr-mpv]', 'No supported targets on this page.')
    if (findTargets) clearInterval(findTargets)
    findTargets = setInterval(modTargets, 4816)
  }

  function addMpvLink () {
    $('div.episode-file-info tbody .renderable.string-cell')
      .css('color', '#00AAFA')
      .css('cursor', 'pointer')
      .css('transition', 'all ease-in 900ms')
      .on('click', function (e) {
        e.preventDefault()
        const self = $(this)
        self.css('color', 'purple')
        window.location.replace(`mpv://${self.text().trim()}`)
      })
  }
})
