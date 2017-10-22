let $intro = $('#intro')
$intro.on('click', function () {
  let $upButton = $('.playlist-info .arrow .icon-arrow-up')
  let $downButton = $('.playlist-info .arrow .icon-arrow-down')
  if ($intro.hasClass('active')) {
    $intro.removeClass('active')
    $upButton.css('display', 'inline')
    $downButton.css('display', 'none')
  } else {
    $intro.addClass('active')
    $upButton.css('display', 'none')
    $downButton.css('display', 'inline')
  }
})


let $list = $('.playlist-content .list')
var query = new AV.Query('Song')
query.limit(10)
query.find().then(function (results) {
  for (let i = 0; i < results.length; i++) {
    let song = results[i].attributes
    let songId = results[i].id
    let li = `<li>
                <a href="./song.html?id=${songId}"> 
                  <div class="list-number">${i+1}</div>
                  <div class="list-content-wrapper">
                    <div class="list-text">
                      <h3 class="line-clamp1">${song.name}</h3>
                      <p class="line-clamp1"> ${song.singer} - ${song.album} </p>
                    </div>  
                    <div class="icon-wrapper">
                      <svg class="icon icon-play">
                        <use xlink:href="#icon-play"></use>
                      </svg>
                    </div>
                  </div>
                </a>
              </li>`
    $list.append(li)
    if (song.transName) {
      let span = `<span>(${song.transName})</span>`
      $list.find($('.list-text h3')).eq(i).append(span)
    }
  }
}, function (error) {
  alert(error)
})