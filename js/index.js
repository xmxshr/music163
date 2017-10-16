
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
  for (let i = 0; i < results.length; i++) {
    let song = results[i].attributes
    let songId = results[i].id
    let li = `
          <li>
            <a href="./song.html?id=${songId}">
              <h3>${song.name}</h3>
              <p>
                <svg class="icon icon-sq">
                  <use xlink:href="#icon-sq"></use>
                </svg>
                ${song.singer} - 专辑 </p>
              <svg class="icon icon-play">
                <use xlink:href="#icon-play"></use>
              </svg>
            </a>
          </li>
    `
    $latestSongUl.append(li)
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
    if(song.hot){
      let li = `
              <li>
                <a href="./song.html?id=${songId}">
                  <div class="listNumber"> ${pad(index)} </div>
                <div class="listContent">
                    <h3>${song.name}</h3>
                    <p>
                      <svg class="icon icon-sq">
                        <use xlink:href="#icon-sq"></use>
                      </svg>
                      ${song.singer} - 专辑 </p>
                    <svg class="icon icon-play">
                      <use xlink:href="#icon-play"></use>
                    </svg>
                </div>
                </a>
              </li>`    
      $hotMusicOl.append(li)  
      index = parseInt(index) + 1
    }
  }
  $('.hotMusicContent #loading').remove()
}, function (error) {
  console.log(error)
})

function pad(number){
  return number >= 10 ? number : '0' + number
}