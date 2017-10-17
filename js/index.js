
$('.tabs').on('click', 'li', function (e) {
  let $li = $(e.currentTarget)
  let index = $li.index()
  $li.addClass('active').siblings().removeClass('active')
  $('.tabContent').children().eq(index).addClass('active').siblings().removeClass('active')
})


var APP_ID = 'kaxDeQqtUfqR2j0BS0NY7v0S-gzGzoHsz'
var APP_KEY = '6kagcV1kNKFedU2vThc8lowF'

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})


let $latestSongUl = $('#latestSong')
var query = new AV.Query('Song')
query.limit(10)
query.find().then(function (results) {
  let index = 1
  for (let i = 0; i < results.length; i++) {
    let song = results[i].attributes
    let songId = results[i].id
    let li = `
          <li>
            <a href="./song.html?id=${songId}">
              <div class="listContentWrapper">
                <div class="listContent">
                  <h3>${song.name}</h3>
                  <p><span id=${'latestSong' + index}></span> ${song.singer} - ${song.album} </p>
                </div>  
                <div class="iconWrapper">
                  <svg class="icon icon-play">
                    <use xlink:href="#icon-play"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
    `
    $latestSongUl.append(li)
    if (song.sq) {
      let svg = `
      <svg class="icon icon-sq">
        <use xlink:href="#icon-sq"></use>
      </svg>`
      $('#latestSong' + index).append(svg)
    }
    index++
  }
  $('.latestSong #loading').remove()
}, function (error) {
  console.log(error)
})


let $hotMusicOl = $('#hotMusicOl')
var hotSongs = new AV.Query('Song')
hotSongs.limit(20)
hotSongs.find().then(function (results) {
  let index = 1
  for (let i = 0; i < results.length; i++) {
    let song = results[i].attributes
    let songId = results[i].id
    if (song.hot) {
      if (i <= 3) {
        $('.hotMusicContent .list .listNumber').css({
          color: '#df3436'
        })
      }
      let li = `
              <li>
                <a href="./song.html?id=${songId}">
                  <div class="listNumber"> ${pad(index)} </div>
                  <div class="listContentWrapper">
                    <div class="listContent">
                      <h3>${song.name}</h3>
                      <p><span id=${'hotMusic' + index}></span> ${song.singer} - ${song.album} </p>
                    </div>  
                    <div class="iconWrapper">
                      <svg class="icon icon-play">
                        <use xlink:href="#icon-play"></use>
                      </svg>
                    </div>
                  </div>
                </a>
              </li>`
      $hotMusicOl.append(li)
      if (song.sq) {
        let svg = `
        <svg class="icon icon-sq">
          <use xlink:href="#icon-sq"></use>
        </svg>`
        $('#hotMusic' + index).append(svg)
      }
      index = parseInt(index) + 1
    }
  }
  $('.hotMusicContent #loading').remove()
}, function (error) {
  console.log(error)
})

function pad(number) {
  return number >= 10 ? number : '0' + number
}
