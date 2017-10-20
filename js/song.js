$(function () {

  let id = location.search.match(/id=([^&]+)/)[1]
  var query = new AV.Query('Song')
  query.get(id).then(function (results) {
    let song = results.attributes
    let video = document.createElement('video')
    video.src = song.songUrl
    video.oncanplay = function () {
      video.play()
      $('.play-button .icon-play').css({
        display: 'none'
      })
      $('.play-button .icon-pause').css({
        display: 'block'
      })
      $('.disc-container .disc').addClass('active')
    }
    video.onended = function () {
      $('.disc-container .disc').removeClass('active')
    }
    bindEventButton(video)
    createSongInfo(song)


    getLyric(song.lyric, video)
    if (song.tlyric) {
      getTranslateLyric(song.tlyric)

    }
  })


  function getTranslateLyric(lyric) {
    let lyrics = lyric
    let regex = /\[(.+)\](.+)/
    let array = lyric.split(/\\n/)
    array.pop()
    array = array.map(function (string, index) {
      let matches = string.match(regex)
      if (matches) {
        let regexTime = /(\d+):(.+)/
        let minutes = +matches[1].match(regexTime)[1]
        let seconds = +matches[1].match(regexTime)[2]
        return {
          time: minutes * 60 + seconds,
          lyric: matches[2]
        }
      }
    })
    array = array.filter(function (x) {
      if (x !== undefined) {
        return x
      }
    })
    let $lyrics = $('.song-description .lyric .words p')
    for (let i = 0; i < array.length; i++) {
      let span = `<span class='tlyric'>${array[i].lyric}</span>`
      for (let j = 0; j < $lyrics.length; j++) {
        if (+$lyrics.eq(j).attr('data-time') === array[i].time) {
          $lyrics.eq(j).append(span)
          $lyrics.eq(j).addClass('addTlyric')
          break
        }
      }
    }
    $('.song-description .lyric .words .tlyric').css({
      fontSize: '14px',
      lineHeight: '14px',
      display: 'block'
    })
  }

  function getLyric(lyric, video) {
    let lyrics = lyric
    let regex = /\[(.+)\](.+)/
    let array = lyric.split(/\\n/)
    array.pop()
    array = array.map(function (string, index) {
      let matches = string.match(regex)
      if (matches) {
        let regexTime = /(\d+):(.+)/
        let minutes = +matches[1].match(regexTime)[1]
        let seconds = +matches[1].match(regexTime)[2]
        return {
          time: minutes * 60 + seconds,
          lyric: matches[2]
        }
      }
    })
    array = array.filter(function (x) {
      if (x !== undefined) {
        return x
      }
    })

    let $lyricCt = $('.song-description .lyric .words')
    for (let i = 0; i < array.length; i++) {
      let p = `<p data-time=${array[i].time}>${array[i].lyric}</p>`
      $lyricCt.append(p)
    }

    setLyric(array, video)

  }

  function setLyric(array, video) {
    setInterval(function () {
      let currentTime = video.currentTime
      let $lyrics = $('.song-description .lyric .words p')
      let $whichLine
      for (let i = 0; i < array.length; i++) {
        if (i === array.length - 1) {
          $whichLine = $lyrics.eq(i)
        } else if ($lyrics.eq(i).attr('data-time') <= currentTime && currentTime < $lyrics.eq(i + 1).attr('data-time')) {
          $whichLine = $lyrics.eq(i)
          break
        }
      }
      if ($whichLine) {
        $whichLine.addClass('active').prev().removeClass('active')
        let top = $whichLine.offset().top
        let ctTop = $('.song-description .lyric .words').offset().top
        let delta = top - ctTop - $('.song-description .lyric').innerHeight() / 3
        $('.song-description .lyric .words').css({
          transform: `translateY(-${delta}px)`
        })
      }
    }, 300)
  }

  function createSongInfo(song) {
    let h2 = `<span>${song.name}</span>
            <span class="line">-</span>
            <span class="singer">${song.singer}</span>`
    $('.song-title').append(h2)
    $('.disc-cover').attr("src", song.coverUrl[0])
    $('.song-background').css({
      backgroundImage: 'url(' + song.coverUrl[1] + ')',
      opacity: '1'
    })
  }

  function bindEventButton(video) {
    $('.play-button').on('click', function () {
      let $playButton = $('.play-button .icon-play')
      let $pauseButton = $('.play-button .icon-pause')
      if ($playButton.css('display') === 'block') {
        $playButton.css({
          display: 'none'
        })
        $pauseButton.css({
          display: 'block'
        })
        video.play()
        $('.disc-container .disc').addClass('active')
      } else {
        $playButton.css({
          display: 'block'
        })
        $pauseButton.css({
          display: 'none'
        })
        video.pause()
        $('.disc-container .disc').removeClass('active')
      }
    })
  }

})