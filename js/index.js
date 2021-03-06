$(function () {

  //tab切换
  $('.tabs').on('click', 'li', function (e) {
    let $li = $(e.currentTarget)
    let index = $li.index()
    $li.addClass('active').siblings().removeClass('active')
    $('.tabContent').children().eq(index).addClass('active').siblings().removeClass('active')
  })
  createPlaylists()

  //推荐音乐list
  let $latestSongUl = $('#latestSong')
  var latestSong = new AV.Query('Song')
  latestSong.limit(10)
  latestSong.equalTo('new', true)
  latestSong.find().then(function (results) {
    createUlLi(results, $latestSongUl, 'latestSong')
    $('.latestSong #loading').remove()
  }, function (error) {
    alert(error)
  })
  //热歌榜list
  let $hotMusicOl = $('#hotMusicOl')
  var hotSongs = new AV.Query('Song')
  hotSongs.limit(20)
  hotSongs.equalTo('hot', true)
  hotSongs.find().then(function (results) {
    createOlLi(results, $hotMusicOl, 'hotMusic')
    $('.hotMusicContent #loading').remove()
  }, function (error) {
    alert(error)
  })


  let $searchContent = $('.searchContent')
  let $searchResult = $('.searchResult')
  let $searchTipsUl = $('.searchResult .searchTips')
  let $listUl = $('.searchResult .list')
  //输入input
  let timer
  $('input#search').on('input', function (e) {
    if (timer) {
      window.clearTimeout(timer)
    }
    timer = setTimeout(function () {
      // timer = null
      let $input = $(e.currentTarget)
      let value = $input.val().trim()
      setClearInput(true)
      if (value === '') {
        $searchContent.css({
          display: 'block'
        })
        $searchResult.css({
          display: 'none'
        })
        $('.searchInput .icon-cha').css({
          display: 'none'
        })
        return
      }

      var queryName = new AV.Query('Song')
      queryName.contains('name', value)
      var querySinger = new AV.Query('Song')
      querySinger.contains('singer', value)
      var queryAlbum = new AV.Query('Song')
      queryAlbum.contains('album', value)
      var queryTransName = new AV.Query('Song')
      queryTransName.contains('transName', value)
      var queryTransAlbum = new AV.Query('Song')
      queryTransAlbum.contains('transAlbum', value)
      var query = AV.Query.or(queryName, querySinger, queryAlbum, queryTransName, queryTransAlbum)

      query.find().then(function (results) {
        $searchContent.css({
          display: 'none'
        })
        $searchResult.css({
          display: 'block'
        })
        $searchTipsUl.empty()
        $listUl.empty()
        let div = `<div class="searchText">搜索"${value}"</div>`
        $searchTipsUl.append(div)
        checkSearchTipsLi(value, results, $searchTipsUl)
      }, function (error) {
        console.log(error)
      })

    }, 300)

  })

  //回车
  $('input#search').on('keypress', function (e) {
    let $input = $(e.currentTarget)
    let value = $input.val().trim()
    if (e.key === 'Enter') {
      querySearch(value)
      searchHistoryItem(value)
    }
  })

  //热门搜索
  $('.hotSearchItem').on('click', function (e) {
    let text = e.target.innerText
    querySearch(text)
  })

  //搜索hint
  function checkSearchTipsLi(value, results, $parent) {
    nameArray = []
    for (let i = 0; i < results.length; i++) {
      let song = results[i].attributes
      let name
      if (song.name.toLowerCase().indexOf(value) !== -1) {
        name = song.name
        createSearchTipsLi(name, nameArray, $parent)
      }
      if (song.singer.toLowerCase().indexOf(value) !== -1) {
        name = song.singer
        createSearchTipsLi(name, nameArray, $parent)
      }
      if (song.album.toLowerCase().indexOf(value) !== -1) {
        name = song.album
        createSearchTipsLi(name, nameArray, $parent)
      }
      if (song.transName.toLowerCase().indexOf(value) !== -1) {
        name = song.transName
        createSearchTipsLi(name, nameArray, $parent)
      }
      if (song.transAlbum.toLowerCase().indexOf(value) !== -1) {
        name = song.transAlbum
        createSearchTipsLi(name, nameArray, $parent)
      }
    }
  }

  //input清空
  function setClearInput(boolean) {
    let clearInput = `<svg class="icon icon-cha">
  <use xlink:href="#icon-cha"></use>
</svg>`
    $('.searchInput').append(clearInput)
    $('.searchInput .icon-cha').css({
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      right: '20px',
      fill: '#a6a4a4',
      width: '17px',
      height: '17px'
    })
    if (boolean) {
      $('.searchInput .icon-cha').css({
        display: 'block'
      })
    } else {
      $('.searchInput .icon-cha').css({
        display: 'none'
      })

    }
    $('.searchInput .icon-cha').on('click', function () {
      $('input#search').val('')
      $searchContent.css({
        display: 'block'
      })
      $searchResult.css({
        display: 'none'
      })
      $('.searchInput .icon-cha').css({
        display: 'none'
      })
      return
    })
  }

  //发送搜索请求
  function querySearch(value) {
    var queryName = new AV.Query('Song')
    queryName.contains('name', value)
    var querySinger = new AV.Query('Song')
    querySinger.contains('singer', value)
    var queryAlbum = new AV.Query('Song')
    queryAlbum.contains('album', value)
    var queryTransName = new AV.Query('Song')
    queryTransName.contains('transName', value)
    var queryTransAlbum = new AV.Query('Song')
    queryTransAlbum.contains('transAlbum', value)
    var query = AV.Query.or(queryName, querySinger, queryAlbum, queryTransName, queryTransAlbum)

    query.find().then(function (results) {
      $searchContent.css({
        display: 'none'
      })
      $searchResult.css({
        display: 'block'
      })
      $searchTipsUl.empty()
      $listUl.empty()
      $('input#search').val(value)
      setClearInput(true)
      if (results.length === 0) {
        $listUl.html('没有结果')
      } else {
        createUlLi(results, $listUl, 'searchSong')
      }
    }, function (error) {
      alert(error)
    })
  }


  function pad(number) {
    return number >= 10 ? number : '0' + number
  }

  function checkSq(sq, id, index) {
    if (sq) {
      let svg = `
    <svg class="icon icon-sq">
      <use xlink:href="#icon-sq"></use>
    </svg>`
      $('#' + id + index).append(svg)
    }
  }


  /*-------------拼接li -------------*/

  //无序数列li   id => string 
  function createUlLi(results, $parent, id) {
    let index = 1
    for (let i = 0; i < results.length; i++) {
      let song = results[i].attributes
      let songId = results[i].id
      let li = `<li>
                <a href="./html/song.html?id=${songId}">
                  <div class="listContentWrapper">
                    <div class="listContent">
                      <h3 class="line-clamp1">${song.name}</h3>
                      <p class="line-clamp1"><span id=${id + index}></span> ${song.singer} - ${song.album} </p>
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
      if (song.transName) {
        let span = `<span>(${song.transName})</span>`
        $parent.find($('.listContent h3')).eq(i).append(span)
      }
      checkSq(song.sq, id, index)
      index++
    }
  }

  //有序数列li  id => string
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
                  <a href="./html/song.html?id=${songId}">
                    <div class="listNumber"> ${pad(index)} </div>
                    <div class="listContentWrapper">
                      <div class="listContent">
                        <h3 class="line-clamp1">${song.name}</h3>
                        <p class="line-clamp1"><span id=${id + index}></span> ${song.singer} - ${song.album} </p>
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
        if (song.transName) {
          let span = `<span>(${song.transName})</span>`
          $parent.find($('.listContent h3')).eq(i).append(span)
        }
        checkSq(song.sq, id, index)
        index = parseInt(index) + 1
      }
    }
  }


  //搜索提示item
  function createSearchTipsLi(name, nameArray, $parent) {
    if ($.inArray(name, nameArray) == -1) {
      nameArray.push(name)
      let li = `<li class="searchTipsItem">
            <div class="icon-wrapper">
              <svg class="icon icon-search">
                <use xlink:href="#icon-search"></use>
              </svg>
            </div>
            <div class="itemContent">
              <h3>${name}</h3>
            </div>
          </li>`
      $parent.append(li)
      $('.searchTipsItem').on('click', function (e) {
        let itemText = $(e.currentTarget).find('h3')[0].innerText
        querySearch(itemText)
      })
    }
    return nameArray
  }


  //搜索历史item
  function searchHistoryItem(value) {
    let li = `<li class="searchHistoryItem">
          <div class="icon-wrapper">
            <svg class="icon icon-time">
              <use xlink:href="#icon-time"></use>
            </svg>
          </div>
          <div class="itemContent">
            <h3>${value}</h3>
            <svg id='fork' class="icon icon-fork">
              <use xlink:href="#icon-fork"></use>
            </svg>
          </div>
    </li>`
    $('.searchHistory ul').append(li)

    $('.itemContent').on('click', '#fork', function (e) {
      $($(e.target).parents(".searchHistoryItem")[0]).remove()
    })
    $('.searchHistoryItem').on('click', function (e) {
      let itemText = $(e.currentTarget).find('h3')[0].innerText
      querySearch(itemText)
    })
  }

  //playlists 的 item
  function createPlaylists() {
    let array = [{
      name: '心情明朗，万物可爱',
      cover: './img/playList/1.jpg',
    }, {
      name: '人生不会重启，但未来总是可期',
      cover: './img/playList/2.jpg',
    }, {
      name: '快乐还是忧伤 狂躁与唯美的碰撞',
      cover: './img/playList/3.jpg',
    }, {
      name: '这些歌如感情一般 没有前奏也没有尾奏',
      cover: './img/playList/4.jpg',
    }, {
      name: '韩国hiphop-纯粹的音乐 特立独行又温柔于心',
      cover: './img/playList/5.jpg',
    }, {
      name: '8D环绕歌曲，戴上耳机',
      cover: './img/playList/6.jpg',
    }]

    for (let i = 0; i < array.length; i++) {
      let li = `
        <li>
          <a href="./html/playlist.html">
            <div class="cover">
              <img src="${array[i].cover}" alt="">
            </div>
            <p class="line-clamp2">${array[i].name}</p>
          </a>
        </li>
      `
      $('.playlists .songs').append(li)
    }
    $('.playlists #loading').remove()
  }

})