const $ = sel => {
  const el = document.querySelectorAll(sel)
  return el.length === 1 ? el[0] : el
}

let {Sonarr} = window

let lookForTargets

if (!Sonarr) {
  let checkPageState = setInterval(function () {
    if (document.readyState === 'complete') {
      clearInterval(checkPageState)
      Sonarr = true

      console.info('[sonarr-mpv]', 'Modifying page...')
    }
  }, 10)
}

if (lookForTargets) clearInterval(lookForTargets)
lookForTargets = setInterval(addLaunchTriggers, 1000)

function addLaunchTriggers () {
  const targets = $('.fc-event.success, .episode-title-cell.renderable')

  if (targets.length > 1) {
    ;[].filter.call(targets, t => !t.getAttribute('data-sonarr')).forEach(t => {
      t.addEventListener('click', () => setTimeout(addMpvLink, 1000))
      t.setAttribute('data-sonarr', 'added')
    })
  } else {
    // Popup might already be on screen
    addMpvLink()

    // Or not
    console.warn('[sonarr-mpv]', 'No supported targets on this page.')

    // Increase the interval -- waiting for page change
    if (lookForTargets) clearInterval(lookForTargets)
    lookForTargets = setInterval(addLaunchTriggers, 4816)
  }
}

function addMpvLink () {
  const fileLink = $('div.episode-file-info tbody .renderable.string-cell')
  if (fileLink) {
    // Make it look like a link
    Object.assign(fileLink.style, {
      color: 'rgb(0, 170, 250)',
      cursor: 'pointer',
      transition: 'all ease-in 500ms'
    })

    // Open mpv on click
    fileLink.addEventListener('click', function (e) {
      e.preventDefault()
      this.style.color = 'purple'
      setTimeout(() => {
        this.style.color = 'rgb(0, 170, 250)'
      }, 5000)
      window.location.replace(`mpv://${fileLink.innerText.trim()}`)
    })
  }
}
