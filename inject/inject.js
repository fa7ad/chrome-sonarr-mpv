const $ = se => document.querySelector(se)
const $$ = se => document.querySelectorAll(se)

let lookForTargets

if (window.sonarr) {
  addLaunchTriggers()
  lookForTargets = setInterval(addLaunchTriggers, 1000)
}

if (!window.sonarr) {
  let checkPageState = setInterval(function () {
    if (document.readyState === 'complete') {
      clearInterval(checkPageState)
      window.sonarr = true

      console.log('[sonarr-mpv]', 'Modifying page...')
      lookForTargets = setInterval(addLaunchTriggers, 1000)
    }
  }, 10)
}

function addLaunchTriggers () {
  if ($$('.fc-event.success, .episode-title-cell.renderable').length > 1) {
    const targetElements = Array.from(
      $$('.fc-event.success, .episode-title-cell.renderable')
    ).filter(el => !el.getAttribute('data-sonarr'))

    targetElements.forEach(t => {
      t.addEventListener('click', () => setTimeout(addMpvLink, 1100))
      t.setAttribute('data-sonarr', 'added')
    })
  } else {
    console.warn('[sonarr-mpv]', "This page doesn't have any supported target.")
    clearInterval(lookForTargets)
    lookForTargets = setInterval(addLaunchTriggers, 5000)
  }
}

function addMpvLink () {
  const popup = $('div.episode-file-info tbody .renderable.string-cell')
  if (popup) {
    popup.style.color = 'rgb(0, 170, 250)'
    popup.style.cursor = 'pointer'
    popup.addEventListener('click', e => {
      e.preventDefault()
      window.location.replace(`mpv://${popup.innerText.trim()}`)
    })
  }
}
