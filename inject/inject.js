const $ = se => document.querySelector(se)
const $$ = se => document.querySelectorAll(se)

if (window.sonarr) {
  checkfortriggers()
  setInterval(checkfortriggers, 1900)
}

if (!window.sonarr) {
  let readyStateCheckInterval = setInterval(function () {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval)
      window.sonarr = true
      console.log('Adding Triggers')

      addtriggers()
      setInterval(checkfortriggers, 1900)
    }
  }, 10)
}

function checkfortriggers () {
  if ($$('.fc-event.success').length < 1) return console.log('Not implemented.')
  if (!$$('.fc-event.success')[0].getAttribute('data-sonarr')) {
    console.log('Re-adding triggers')
    addtriggers()
  }
}

function turntolink () {
  const ln = $('div.episode-file-info tbody .renderable.string-cell')
  if (ln) {
    ln.style.color = 'rgb(0, 170, 250)'
    ln.style.cursor = 'pointer'
    ln.addEventListener('click', function (e) {
      e.preventDefault()
      window.location.replace(`mpv://${ln.innerText.trim()}`)
    })
  }
}

function addtriggers () {
  $$('.fc-event.success').forEach(function (El) {
    El.addEventListener('click', () => setTimeout(turntolink, 1000), false)
    El.setAttribute('data-sonarr', 'added')
  })
}
