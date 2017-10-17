// var APP_ID = 'kaxDeQqtUfqR2j0BS0NY7v0S-gzGzoHsz';
// var APP_KEY = '6kagcV1kNKFedU2vThc8lowF';

// AV.init({
//   appId: APP_ID,
//   appKey: APP_KEY
// });





// 声明类型
var SongObject = AV.Object.extend('Song');
  var songObject1 = new SongObject();
  songObject1.set({
    name: '我发现你',
    singer: 'Fine乐团',
    album: 'I\'m Sorry',
    songUrl: 'http://oxwijsbmc.bkt.clouddn.com/song/%E6%AD%8C%E6%89%8B%EF%BC%9AFine%E4%B9%90%E5%9B%A2%E3%80%82%E6%89%80%E5%B1%9E%E4%B8%93%E8%BE%91%EF%BC%9AI%27m%20Sorry.mp3',
    coverUrl: ['http://oxwijsbmc.bkt.clouddn.com/cover1/%E6%AD%8C%E6%89%8B%EF%BC%9AFine%E4%B9%90%E5%9B%A2%E3%80%82%E6%89%80%E5%B1%9E%E4%B8%93%E8%BE%91%EF%BC%9AI%27m%20Sorry%281%29.jpg',
     'http://oxwijsbmc.bkt.clouddn.com/cover2/%E6%AD%8C%E6%89%8B%EF%BC%9AFine%E4%B9%90%E5%9B%A2%E3%80%82%E6%89%80%E5%B1%9E%E4%B8%93%E8%BE%91%EF%BC%9AI%27m%20Sorry%282%29.jpg'],
    hot: false,
    new: true,     
    sq:true
  });

  var songObject2 = new SongObject();
  songObject2.set({
    name: '我想',
    singer: '余佳运',
    album: '幸福三部曲',
    songUrl: 'http://oxwijsbmc.bkt.clouddn.com/song/%E6%AD%8C%E6%89%8B%EF%BC%9A%E4%BD%99%E4%BD%B3%E8%BF%90%E3%80%82%E6%89%80%E5%B1%9E%E4%B8%93%E8%BE%91%EF%BC%9A%E5%B9%B8%E7%A6%8F%E4%B8%89%E9%83%A8%E6%9B%B2.mp3',
    coverUrl: ['http://oxwijsbmc.bkt.clouddn.com/cover1/%E6%AD%8C%E6%89%8B%EF%BC%9A%E4%BD%99%E4%BD%B3%E8%BF%90%E3%80%82%E6%89%80%E5%B1%9E%E4%B8%93%E8%BE%91%EF%BC%9A%E5%B9%B8%E7%A6%8F%E4%B8%89%E9%83%A8%E6%9B%B2%281%29.jpg',
     'http://oxwijsbmc.bkt.clouddn.com/cover2/%E6%AD%8C%E6%89%8B%EF%BC%9A%E4%BD%99%E4%BD%B3%E8%BF%90%E3%80%82%E6%89%80%E5%B1%9E%E4%B8%93%E8%BE%91%EF%BC%9A%E5%B9%B8%E7%A6%8F%E4%B8%89%E9%83%A8%E6%9B%B2%282%29.jpg'],
    hot: false,
    new: true,     
    sq:true
  });
  var songObject3 = new SongObject();
  songObject3.set({
    name: '于心有愧',
    singer: '陈奕迅',
    album: 'H3M',
    songUrl: 'http://oxwijsbmc.bkt.clouddn.com/song/%E4%BA%8E%E5%BF%83%E6%9C%89%E6%84%A7%EF%BC%8CH3M%EF%BC%8C%E9%99%88%E5%A5%95%E8%BF%85.mp3',
    coverUrl: ['http://oxwijsbmc.bkt.clouddn.com/cover1/%E4%BA%8E%E5%BF%83%E6%9C%89%E6%84%A7%EF%BC%8CH3M%EF%BC%8C%E9%99%88%E5%A5%95%E8%BF%85%281%29.jpg',
     'http://oxwijsbmc.bkt.clouddn.com/cover2/%E4%BA%8E%E5%BF%83%E6%9C%89%E6%84%A7%EF%BC%8CH3M%EF%BC%8C%E9%99%88%E5%A5%95%E8%BF%85%282%29.jpg'],
    hot: false,
    new: true,     
    sq:true
  });
  // var songObject4 = new SongObject();
  // songObject4.set({
  //   name: '淘汰',
  //   singer: '陈奕迅',
  //   album: '认了吧',
  //   songUrl: 'http://oxwijsbmc.bkt.clouddn.com/song/%E6%B7%98%E6%B1%B0%20-%20%E9%99%88%E5%A5%95%E8%BF%85%20%E8%AE%A4%E4%BA%86%E5%90%A7.mp3',
  //   coverUrl: ['http://oxwijsbmc.bkt.clouddn.com/cover1/%E6%B7%98%E6%B1%B0%20-%20%E9%99%88%E5%A5%95%E8%BF%85%281%29.jpg',
  //    'http://oxwijsbmc.bkt.clouddn.com/cover2/%E6%B7%98%E6%B1%B0%20-%20%E9%99%88%E5%A5%95%E8%BF%85%282%29.jpg'],
  //   hot: false,
  //   new: true,     
  //   sq:true
  // });
  // var songObject5 = new SongObject();
  // songObject5.set({
  //   name: '童话镇',
  //   singer: '陈一发儿',
  //   album: '童话镇',
  //   songUrl: 'http://oxwijsbmc.bkt.clouddn.com/song/%E7%AB%A5%E8%AF%9D%E9%95%87%20-%20%E9%99%88%E4%B8%80%E5%8F%91%E5%84%BF%E6%89%80%E5%B1%9E%E4%B8%93%E8%BE%91%EF%BC%9A%E7%AB%A5%E8%AF%9D%E9%95%87.mp3',
  //   coverUrl: ['http://oxwijsbmc.bkt.clouddn.com/cover1/%E7%AB%A5%E8%AF%9D%E9%95%87%281%29.jpg',
  //    'http://oxwijsbmc.bkt.clouddn.com/cover2/%E7%AB%A5%E8%AF%9D%E9%95%87%282%29.jpg'],
  //   hot: false,
  //   new: true,     
  //   sq:true
  // });
 let songs = [songObject1, songObject2, songObject3]
  AV.Object.saveAll(songs).then(function(song) {
    console.log(song);
  }, function (error) {
     console.error(error);
  });