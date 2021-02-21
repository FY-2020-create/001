var audio =document.querySelector('#audio');


function time(){
    var all_time = parseInt(audio.duration);
    var now_time = parseInt(audio.currentTime);
    var all_line = document.querySelector(".all_time");
    var line = document.querySelector(".now_time");
    var point = document.querySelector(".music_point");

    var voice_d =document.querySelector('.voice_d');
    var voice_p = document.querySelector('.voice_p');
    var voice_o = document.querySelector('.voice_o');
    
    var music_frame = 386;
    var L = (audio.currentTime / audio.duration) * 100;

    point.style.left = (L-0.2) + "%";
    line.style.width = L + "%";

    var m1 = parseInt(all_time/60);
    var s1= parseInt(all_time%60);
    if(m1<10){m1='0'+m1}
    if(s1<10){s1='0'+s1};
    var m2 = parseInt(now_time/60);
    var s2= parseInt(now_time%60);
    if(m2<10){m2='0'+m2}
    if(s2<10){s2='0'+s2};

    document.querySelector('.music-progress_p1').innerHTML=m2+':'+s2;

    document.querySelector('.music-progress_p2').innerHTML=m1+':'+s1;

     all_line.onmousedown = function (e) {
    var rate = (e.clientX - 585) / this.clientWidth*audio.duration;
    audio.currentTime = rate;
      };
      //进度条拖动
      point.onmousedown = function (e) {
        var x = e.clientX - this.offsetLeft; 
        document.onmousemove = function (e) {
          var R = ((e.clientX - x) / all_line.clientWidth) * 100;
          if (R <= 100 && R >= 0) {
            point.style.left = R + "%";
          }
          audio.currentTime = (R / 100) * audio.duration;
        };
        //释放鼠标
          document.onmouseup = function () {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      }
      //音量控制

      voice_d.onmousedown = function (e) {
      var rate = (e.clientX - 1412) / this.clientWidth;
      if (rate <= 1 && rate >= 0){
        audio.volume = rate;
        voice_o.style.left = rate*this.clientWidth + "px";
        voice_p.style.width = rate*this.clientWidth + "px";
      }
      };
      //音量条拖动
        voice_o.onmousedown = function () {
        document.onmousemove = function (e) {
          var x = e.clientX - 1412; 
          var R =  x/ voice_d.clientWidth ;
          if (R <= 1 && R >= 0) {
            voice_o.style.left = R*49-3 + "px";
            voice_p.style.width = R*49 + "px";
            audio.volume = R;
          }
        };
        //释放鼠标
          document.onmouseup = function () {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      }


}
audio.oncanplay =function (){time()}


function start(){
    if(audio.paused){
        audio.play();
        setInterval(function(){time()},100);
    }
    else{
        audio.pause();
    }
    img_change();
}
var ing =0;

function play(t){
  let a=t.id;
  let i =0;
  document.querySelector('#play_s').className='pause';
  goods2.forEach(e => {
    if(e.id==a)
    {ing =i}
    i++;
  });
  type=1;
play_id(a,ing);
}

function play_id(id,ing){
  let musicsrc = 'http://musicapi.leanapp.cn/music/url?id='+id;

  let cover =document.querySelector('.cover');
  let sing_name= document.querySelector('.sing_name');
  let singer_name= document.querySelector('.singer_name');
   Ajax_get(musicsrc,(res)=>{
       let data = res.data;
       /* console.log(data); */
       audio.src=data[0].url;  
       audio.play();
       setInterval(function(){time()},100); 
       document.querySelector('#play_s').className='pause';
});
   cover.src=imgs[ing];
   sing_name.innerHTML=singName[ing];
   singer_name.innerHTML=singers[ing];
   
   let img = document.querySelector('.cover2 img');
   let singerPic =document.querySelector('.singer img');
   img.src=singerPic.src;

   let a1=document.querySelector('.p2 a');
   let a2=document.querySelector('.p3 a');
   let as = document.querySelectorAll('.singer a');
   let div = document.querySelector('.d2_1_2 div')
   div.innerHTML=as[0].innerHTML;
   /* ps[2].innerHTML='歌手：'+as[1].innerHTML; */
   let id2 = ids[ing];
   Ajax_get('http://musicapi.leanapp.cn/song/detail?ids='+id2,(res)=>{
   /* console.log(res); */
   let data = res.songs;
  /*  ps[0].innerHTML=data[0].name; */
  a1.innerHTML=''+data[0].al.name;
  a2.innerHTML=''+data[0].ar[0].name;
 })
 singWord(id2);
}

function singWord(id2){
  
  Ajax_get('http://sandyz.ink:3000/lyric?id='+id2,(res)=>{
    /* console.log(res); */
    let d_lyric = document.querySelector('.d2_1_3');
    d_lyric.innerHTML='';
    let lyr =res.lrc.lyric.split("\n");
  for(var i=0;len=lyr.length,i<len;i++)
  {
     //console.log(lyr[i]); 
      let lyr2= lyr[i].split("]");
    let p =document.createElement('p');
    p.innerHTML=lyr2[1];
    d_lyric.appendChild(p);
  }
 
  });
}

function play_all(){
  let music = document.querySelector('.div3 .tbody2 tr td');
  let id =music.id;
  play_id(id,0);
  document.querySelector('#play_s').className='pause';
 /*  let musicsrc = 'http://musicapi.leanapp.cn/music/url?id='+music.className;
  let music_cover = 'http://musicapi.leanapp.cn/playlist/detail?id='+listid;
  let cover =document.querySelector('.cover');
  let sing_name= document.querySelector('.sing_name');
  let singer_name= document.querySelector('.singer_name');
   Ajax_get(musicsrc,(res)=>{
       
       let data = res.data;
       audio.src=data[0].url; 

       audio.play();
       setInterval(function(){time()},100); 
 
});
Ajax_get(music_cover,(res)=>{
   let date2 = res.playlist.tracks;
   console.log(date2);
   cover.src=date2[0].al.picUrl;
   sing_name.innerHTML=date2[0].name;
   singer_name.innerHTML=date2[0].ar[0].name;
}); */
}

function img_change(){ 
  let audio= document.querySelector('#audio');
  let t =document.querySelector('#play_s');
  let img = document.querySelector('.cover2 img');
  if(audio.paused){
    t.className='play';
    img.style.animationPlayState = "paused";
    }
    else{
      t.className='pause';
      img.style.animationPlayState = "running";
    }
}

function play_pre(){
  if(type==1)
  {
    if(ing>0&&ing<all_music){
      play_id(ids[ing-1],ing-1);
      ing--;
    }
  }
  else if(type==2)
  {
    if(ing>0&&ing<search_Count){
      let t=goods[ing-1].id;
      search_play_id(t,ing-1)
      ing--;
    }
   
  }
}

function play_next(){
  /* console.log(type); */
  if(type==1)
  {
    let t=all_music-1;
    if(ing>=0&&ing<t){
      play_id(ids[ing+1],ing+1);
      ing++;
    }
  }
  else if(type==2)
  {
    let t=search_Count-1;
    /* console.log(t); */
    if(ing>=0&&ing<t){
      let t=goods[ing+1].id;
      search_play_id(t,ing+1);
      ing++;
    }
  }
  }
   
  function detail(){
     let d2_1 = document.querySelector('.d2_1');
    d2_1.style.display='block';
};

  function detail_off(){
    let d2_1 = document.querySelector('.d2_1');
   d2_1.style.display='none';

 }

 function search_play(t){
  let a=t.id;
  let i =0;
  document.querySelector('#play_s').className='pause';
  goods.forEach(e => {
    let b = e.id;
    if(b==a)
    {ing =i}
    i++;
  });
  type=2;
  search_play_id(a,ing);
}

 function search_play_id(id,ing){
  let musicsrc = 'http://musicapi.leanapp.cn/music/url?id='+id;
   Ajax_get(musicsrc,(res)=>{
       let data = res.data;
       /* console.log(data); */
       audio.src=data[0].url;  
       audio.play();
       setInterval(function(){time()},100); 
       document.querySelector('#play_s').className='pause';
});

let sing_name= document.querySelector('.sing_name');
let singer_name= document.querySelector('.singer_name');
sing_name.innerHTML = goods[ing].name;
let c = goods[ing].artists[0].name;
if( goods[ing].artists.length>1)
{
  for(var j=1,len=goods[ing].artists.length;j<len;j++)
  {
    c=c+'/'+goods[ing].artists[j].name;
  }
}
singer_name.innerHTML = c;

Ajax_get('http://musicapi.leanapp.cn/song/detail?ids='+id,(res)=>{
  /* console.log(res); */
  document.querySelector('.cover').src=res.songs[0].al.picUrl;
  document.querySelector('.cover2 img').src=res.songs[0].al.picUrl;
});
 let a1=document.querySelector('.p2 a');
 let a2=document.querySelector('.p3 a');
 let div = document.querySelector('.d2_1_2 div')
 div.innerHTML=goods[ing].name;
 a1.innerHTML =''+goods[ing].album.name;
 a2.innerHTML =''+c;

 singWord(id);

}
