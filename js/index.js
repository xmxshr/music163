
var APP_ID = 'kaxDeQqtUfqR2j0BS0NY7v0S-gzGzoHsz'
var APP_KEY = '6kagcV1kNKFedU2vThc8lowF'

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})


$('.tabs').on('click', 'li', function (e) {
  let $li = $(e.currentTarget)
  let index = $li.index()
  $li.addClass('active').siblings().removeClass('active')
  $('.tabContent').children().eq(index).addClass('active').siblings().removeClass('active')
})


$('#searchInput').on('input', function (e) {
  let $input = $(e.currentTarget)
  let value = $input.val().trim()
  let $searchContent = $('.searchContent')
  let $searchResult = $('.searchResult')
  let $searchTipsUl = $('.searchResult .searchTips')
  let $listUl = $('.searchResult .list')
  
  if(value === ''){
    $searchContent.css({display: 'block'})
    $searchResult.css({display: 'none'})
    return 
  }

  var queryName = new AV.Query('Song')
  queryName.contains('name', value)
  var querySinger = new AV.Query('Song')
  querySinger.contains('singer', value)
  var queryAlbum = new AV.Query('Song')
  queryAlbum.contains('album', value)
  var query = AV.Query.or(queryName, querySinger, queryAlbum)

  query.find().then(function (results) {
    console.log(results)
    $searchContent.css({display: 'none'})
    $searchResult.css({display: 'block'})
    $listUl.empty()
    if(results.length === 0){
      $ul.html('没有结果')
    }else{
      createUlLi(results, $listUl, 'searchSong')
    }
  }, function (error) {
    console.log(error)
  })
})





let $latestSongUl = $('#latestSong')
var latestSong = new AV.Query('Song')
latestSong.limit(10)
latestSong.find().then(function (results) {
  createUlLi(results, $latestSongUl, 'latestSong')
  $('.latestSong #loading').remove()
}, function (error) {
  alert(error)
})

let $hotMusicOl = $('#hotMusicOl')
var hotSongs = new AV.Query('Song')
hotSongs.limit(20)
hotSongs.find().then(function (results) {
  createOlLi(results, $hotMusicOl, 'hotMusic')
  $('.hotMusicContent #loading').remove()
}, function (error) {
  alert(error)
})







function pad(number) {
  return number >= 10 ? number : '0' + number
}

function checkSvg(sq, id, index) {
  if (sq) {
    let svg = `
    <svg class="icon icon-sq">
      <use xlink:href="#icon-sq"></use>
    </svg>`
    $('#' + id + index).append(svg)
  }
}

function createUlLi(results, $parent, id) {
  let index = 1
  for (let i = 0; i < results.length; i++) {
    let song = results[i].attributes
    let songId = results[i].id
    let li = `<li>
                <a href="./song.html?id=${songId}">
                  <div class="listContentWrapper">
                    <div class="listContent">
                      <h3>${song.name}</h3>
                      <p><span id=${id + index}></span> ${song.singer} - ${song.album} </p>
                    </div>  
                    <div class="iconWrapper">
                      <svg class="icon icon-play">
                        <use xlink:href="#icon-play"></use>
                      </svg>
                    </div>
                  </div>
                </a>
              </li>`
    $parent.append(li)
    checkSvg(song.sq, id, index)
    index++
  }
}

function createOlLi(results, $parent, id) {
  let index = 1
  for (let i = 0; i < results.length; i++) {
    let song = results[i].attributes
    let songId = results[i].id
    if (song.hot) {
      if (i <= 3) {
        $('.list .listNumber').css({
          color: '#df3436'
        })
      }
      let li = `<li>
                  <a href="./song.html?id=${songId}">
                    <div class="listNumber"> ${pad(index)} </div>
                    <div class="listContentWrapper">
                      <div class="listContent">
                        <h3>${song.name}</h3>
                        <p><span id=${id + index}></span> ${song.singer} - ${song.album} </p>
                      </div>  
                      <div class="iconWrapper">
                        <svg class="icon icon-play">
                          <use xlink:href="#icon-play"></use>
                        </svg>
                      </div>
                    </div>
                  </a>
                </li>`
      $parent.append(li)
      checkSvg(song.sq, id, index)
      index = parseInt(index) + 1
    }
  }
}