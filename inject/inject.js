if (window.sonarr) {
  console.log('sonarr-mpv is running...')
}

if (!window.sonarr) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval)
      window.sonarr = true

      ;(function () {
        function turntolink () {
          var linkDom = document.querySelector('div.episode-file-info tbody .renderable.string-cell')
          if (linkDom) {
            var ln = document.createElement('a')
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

        document.querySelectorAll('.fc-event.success').forEach(function (El) {
          El.addEventListener('click', function () {
            setTimeout(turntolink, 1000)
            turntolink()
          }, false)
        })
      })()
    }
  }, 10)
}
