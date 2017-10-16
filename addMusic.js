var APP_ID = 'kaxDeQqtUfqR2j0BS0NY7v0S-gzGzoHsz';
var APP_KEY = '6kagcV1kNKFedU2vThc8lowF';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});





// 声明类型
var SongObject = AV.Object.extend('Song');
//   var songObject1 = new SongObject();
//   songObject1.set({
//     name: 'I PRAY 4 YOU',
//     singer: 'Apink BnN (普美, 南珠)'
//   });

//   var songObject2 = new SongObject();
//   songObject2.set({
//     name: '你以为',
//     singer: '左颜'
//   });
//   var songObject3 = new SongObject();
//   songObject3.set({
//     name: '理想三旬',
//     singer: '陈鸿宇'
//   });
//  let songs = [songObject1, songObject2, songObject3]
//   AV.Object.saveAll(songs).then(function(song) {
//     console.log(song);
//   }, function (error) {
//      console.error(error);
//   });