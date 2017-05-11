if (window.sonarr) {
  window.checkfortriggers()
  setInterval(window.checkfortriggers, 1900)
}

if (!window.sonarr) {
  const readyStateCheckInterval = setInterval(function () {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval)
      window.sonarr = true
      console.log('Adding Triggers')
      window.addtriggers()
      setInterval(window.checkfortriggers, 1900)
    }
  }, 10)
}

window.checkfortriggers = function () {
  if (
  document
    .querySelectorAll('.fc-event.success')[0]
    .getAttribute('data-sonarr') !== 'added'
  ) {
    console.log('Re-adding triggers')
    window.addtriggers()
  }
}

window.turntolink = function () {
  const linkDom = document.querySelector('div.episode-file-info tbody .renderable.string-cell')
  if (linkDom) {
    const ln = document.createElement('a')
    ln.href = '#'
    ln.setAttribute('onclick', `window.location.href="mpv://${linkDom.innerText}";`)
    ln.innerHTML = linkDom.innerText
    linkDom.innerHTML = ln.outerHTML
    linkDom.addEventListener('click', function () {
      setTimeout(function () {
        window.history.go(-1)
      }, 2000)
    })
  }
}

window.addtriggers = function () {
  document.querySelectorAll('.fc-event.success').forEach(function (El) {
    El.addEventListener('click', function () {
      setTimeout(window.turntolink, 1000)
      window.turntolink()
    }, false)
    El.setAttribute('data-sonarr', 'added')
  })
}
