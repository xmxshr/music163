# 网易云音乐（移动端）
使用 jQuery 实现移动端网易云音乐，包含首页、推荐歌单、播放器三个页面。

# 预览
电脑请使用`Chrome`打开，并`右键->检查`打开开发者模式，使用移动端模拟器查看。或使用手机扫描二维码打开链接。

预览链接：[预览](https://xmxshr.github.io/music163/)  
二维码：  
[![1514712938.png](https://i.loli.net/2017/12/31/5a48af73a614f.png)](https://i.loli.net/2017/12/31/5a48af73a614f.png)

# 技术
jQuery/动态REM/LeanCloud

后端数据存储使用了`LeanCloud`，具体可查询 [LeanCloud数据存储入门教程](https://leancloud.cn/docs/leanstorage-started-js.html) 。

# 实现的功能
- 音乐播放、暂停
- 搜索单曲、歌手、专辑
- 热门搜索
- 搜索历史记录
- 排行榜
- 推荐歌单
- 歌词(&歌词翻译)

# 运行
1. clone 项目至本地 `git clone https://github.com/xmxshr/music163.git`
2. 进入项目文件夹 `cd music163`
3. 安装http服务器`http-server`： `npm i http-server -g`
4. 启动http服务器 `http-server -c-1`
3. 使用浏览器打开 `http://127.0.0.1:8080`

# 难点
### 播放页面的旋转光盘
光盘分为三层，上层亮光投影、光盘内部图片、黑色底盘。   
将黑色底盘固定不动，上层亮光投影、光盘内部图片添加『360°无限旋转』的动画。
### 歌词的截取、滚动
根据所下载的歌词格式，写一个正则表达式，将歌词变为一个如下数组。
```
const lyrics = [{
  time: '00:00',
  lyric: '作词/作曲',
},{
  ...
}];
```
其中`time`表示当前句歌词显示时间，`lyric`表示当前句歌词。    
遍历数组`lyrics` 创建标签`<p data-time=${array[i].time}>${array[i].lyric}</p>`。    
使用HTML5新标签`<audio>`， 根据`audio.currentTime`可得到当前音乐播放时间。设置一个定时器，定时判断『当前句歌词』。    
#### 获取当前句歌词：
```
const $lyrics = $('.song-description .lyric .words p');
  let $whichLine;
  for (let i = 0; i < array.length; i++) {
    // 最后一句歌词
    if (i === array.length - 1) {
      $whichLine = $lyrics.eq(i);
    // 上一句歌词时间 <= 当前时间 <= 下一句歌词时间
    } else if ($lyrics.eq(i).attr('data-time') <= currentTime && currentTime < $lyrics.eq(i + 1).attr('data-time')) {
      $whichLine = $lyrics.eq(i);
      break;
    }
  }
```
#### 滚动歌词并变色：
```
if ($whichLine) {
  $whichLine.addClass('active').prev().removeClass('active');
  const top = $whichLine.offset().top;
  const ctTop = $('.song-description .lyric .words').offset().top;
  const delta = top - ctTop - $('.song-description .lyric').innerHeight()*lineHeight / 3;
  $('.song-description .lyric .words').css({
    transform: `translateY(-${delta/fontSize}rem)`;
  });
}
```
# 细节
### 为推荐搜索加定时器
搜索时监听搜索框的`input`事件，以提供『推荐搜索』。即只要输入就会发送请求。
为了阻止不必要的请求，可在监听函数里加一个定时器。在用户停止输入之后，再提供『推荐搜索』选项。
```
let timer;
$('input#search').on('input', (e) => {
  if (timer) {
    window.clearTimeout(timer);
  }
  timer = setTimeout(() => {
    const $input = $(e.currentTarget);
    const inputValue = $input.val().trim();
    // 显示input清空按钮
    setClearInput(true);
    if (inputValue === '') return;
    // 发送『推荐搜索』请求
    query.find().then((results) => {
      ...
    }).catch();
  }, 300);
}
```

