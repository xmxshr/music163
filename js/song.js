$(function () {

  let id = location.search.match(/id=([^&]+)/)[1]
  var query = new AV.Query('Song')
  query.get(id).then(function (results) {
    let song = results.attributes
    let video = document.createElement('video')
    video.src = song.songUrl
    video.oncanplay = function () {
      video.play()
      $('.play-button .icon-play').css({display: 'none'})
      $('.play-button .icon-pause').css({display: 'block'})
      $('.disc-container .disc').addClass('active')
    }
    video.onended = function () {
      $('.disc-container .disc').removeClass('active')
    }
    bindEventButton(video)
    createSongInfo(song)
    getLyric(song, video)
  })

  function getLyric(song, video) {
    let lyric = song.lyric
    let regex = /\[(.+)\](.+)/
    let array = lyric.split(/\\n/)
    array.pop()
    console.log(array)
    
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
    array = array.filter(function(x){
      if(x !== undefined){return x}
    })
    console.log(array)
    setLyric(array, video)
  }


  function setLyric(array, video) {
    setInterval(function(){
      let currentTime = video.currentTime
      // createLyric(array)
      for(let i=0; i<array.length; i++){
          if(i === array.length-1){
            console.log(array[i].lyric)
          }else if(array[i].time <= currentTime && currentTime < array[i+1].time){
            console.log(array[i].lyric)
            break
          }
        }
        

    }, 300)
    
  }

  function createLyric(node){
    let p = `<p>${node.lyric}</p>`
    $('.song-description .lyric .word').append(p)
    $('.song-description .lyric .word').css({
      transform: 'translateY(-32px)'
    })
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


  //   let $lyric = $('.lyric .words')
  //   array.map(function(object){
  //     if(!object){return}
  //     let $p = $('<p></p>')
  //     $p.attr('data-time', object.time).text(object.words)
  //     $lyric.append($p)
  //   })
  // })






  function bindEventButton(video){
    $('.play-button').on('click', function () {
      let $playButton = $('.play-button .icon-play')
      let $pauseButton = $('.play-button .icon-pause')
      if ($playButton.css('display') === 'block') {
        $playButton.css({display: 'none'})
        $pauseButton.css({display: 'block'})
        video.play()
        $('.disc-container .disc').addClass('active')
      } else {
        $playButton.css({display: 'block'})
        $pauseButton.css({display: 'none'})
        video.pause()
        $('.disc-container .disc').removeClass('active')
      }
    })
  }

})


// play() pause()  onplay()  oncanplay() currentTime