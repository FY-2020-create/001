
let Ajax_get = (url,fn) =>{ 
  //实例化XMLHttpRequest对象
  const xhr = new XMLHttpRequest();
  //初始化一个get请求
  xhr.open('get',url,true);
  //接收返回值
  xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      const res = JSON.parse(xhr.responseText);
     // const res=xhr.responseText;
     /*  console.log(res); */
      console.log('请求成功');   
      fn(res);
    } else {
      console.log('请求失败');
    }
  } 
};
//发送请求
xhr.send();
}

function banner(){
  Ajax_get('http://sandyz.ink:3000/banner',(res)=>{
      let li =document.querySelectorAll('.imglist ul li');
       let date =res.banners; 
      for(var i=0;len=date.length,i<len;i++){
         let temp = `
         <img  alt="" src="${date[i].imageUrl}"/>
         `
         let a =document.createElement('a');
         a.innerHTML =temp;
         li[i].appendChild(a);
      }
  })
}
banner();



function recommend(){
    Ajax_get('http://musicapi.leanapp.cn/personalized?limit=10',(res)=>{
        let con_2 =document.querySelector('.con-2');
        let date =res.result;
        date.forEach(e => {
           // console.log(e);
            let temp = `
            <a id='${e.id}' onclick="musiclist(this)" href="#">
              <div style="background: url('${e.picUrl}'); background-size: 205px 205px;">
                    <p >${ Math.ceil(e.playCount/10000)}万</p>
              </div>
                  <p class="p1">${e.name}</p>
            </a>
            `
            let span =document.createElement('span');
            span.innerHTML =temp;
            con_2.appendChild(span);
        });
    })
}
recommend();

function song_list_on(){
  document.querySelector('.d2-2-3').style.display='block';
  Ajax_get('http://musicapi.leanapp.cn/top/playlist/highquality?limit=1',(res)=>{
  document.querySelector('.boutique img').src=res.playlists[0].coverImgUrl;
/*   let a =""+res.playlists[0].coverImgUrl;
  document.querySelector('.boutique').cssText="url(a)" ;  */
  let ps=document.querySelectorAll('.boutique p');

  ps[0].innerHTML= res.playlists[0].name;
  ps[1].innerHTML= res.playlists[0].copywriter;
  ps[0].style.fontWeight='600';
  });

  Ajax_get('http://musicapi.leanapp.cn/top/playlist?limit=50',(res)=>{
    let song_list =document.querySelector('.song_list');
    let date =res.playlists;
    date.forEach(e => {
       // console.log(e);
        let temp = `
        <a id='${e.id}' onclick="musiclist(this)" href="#">
          <div style="background: url('${e.coverImgUrl}'); background-size: 205px 205px;">
                <p >${Math.ceil(e.playCount/10000)}万</p>
          </div>
              <p class="p1">${e.name}</p>
        </a>
        `
        let span =document.createElement('span');
        span.innerHTML =temp;
        span.className='songSquare';
        song_list.appendChild(span);
  });
});
}
function song_list_off(){
  document.querySelector('.d2-2-3').style.display='none';
}

function myDate (data) {
  var date = new Date(data)
  var Y = date.getFullYear() + '年'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日'
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return Y + M + D + h + m + s
}


var goods;
var type=0;
var ids =[];
var imgs=[];
var singers=[];
var singName =[];
let listid =0;
var all_music=0;
var search_Count=0;
var goods2;
function musiclist(t){  
  let d2_2= document.querySelector('.music_list');
    d2_2.style.display='block';
    //var a = document.querySelector('.con-2 span a');
    let hr= 'http://sandyz.ink:3000/playlist/detail?id='+ t.id;
    listid =t.id;
    document.querySelector('.d2-2').style.display='none';
    function Xiang(){
    Ajax_get(hr,(res)=>{
     /*  console.log(res); */
      let tracks =res.playlist.tracks;
      goods2 =tracks;
      let playlist =res.playlist;     
      
      for(var i=0;len =tracks.length,i<len;i++)
      {
        imgs[i]=tracks[i].al.picUrl;
        ids[i]=tracks[i].id;
        singers[i]=tracks[i].ar[0].name;
        singName[i]=tracks[i].name;
      }
      document.querySelector('.div1 .d_img img').src=playlist.coverImgUrl;
      document.querySelector('.div1d h2').innerHTML=playlist.name;
      document.querySelector('.mlist_p1 a').innerHTML=playlist.tags;
      let p_a =document.querySelectorAll('.mlist_p2 a');
      p_a[0].innerHTML=playlist.trackCount;
      p_a[1].innerHTML = Math.ceil(playlist.playCount/10000);
      document.querySelector('.mlist_p3').innerHTML='简介：'+ playlist.description;
      document.querySelector('.div2_a2').innerHTML ='评论('+playlist.commentCount+')';
     /*  let count =0; */
      let tbody2 =document.querySelector('.div3 tbody'); 
      tbody2.innerHTML='';
      tracks.forEach(e => {
        let b = e.dt;    
        let a= duration (b);
        let c=e.ar[0].name;
        let len=e.ar.length;
        if(len>1){
          for(var i=1;i<len;i++)
          {
            c=c+'/'+e.ar[i].name;
          }
        }
        all_music++;
        let temp3 =`
        <td onclick="play(this)" id="${e.id}"><div class="td_t1"><a href="#">${e.name}</a></div></td>
        <td><div class="td_ser">${c}</div></td>
        <td><div class="td_alb">${e.al.name}</div></td>
        <td><div class="td_time">${a}</div></td>
        `
        let tr = document.createElement('tr');
        tr.className='tr2';
        tr.innerHTML = temp3;
        tbody2.appendChild(tr);
          /* count++;
          if(count==2){count=0}
          else{tr.style.backgroundColor='#F9F9F9'} */
        }); 
      let div4 = document.querySelector('.div4');
      div4.innerHTML='';
      let hr2 = 'http://musicapi.leanapp.cn/comment/playlist?id='+t.id;
      Ajax_get(hr2,(res)=>{
      let hotcomments = res.hotComments;
      let comments = res.comments;
      search_musicCount=0;
      hotcomments.forEach(e=>{
       
        let div = document.createElement('div'); 
        let temp4=`
        <img class='user_c_img' src="${e.user.avatarUrl}" />
        
        <p class='user_c'><a href="#" class='user_c_name'>${e.user.nickname}:</a>${e.content}</p>
        <li class='user_d'>${myDate(e.time)}</li>
        `
        div.innerHTML= temp4;
        div4.appendChild(div);
        
      })
      comments.forEach(e=>{
        let div = document.createElement('div');
        let temp4=`
        <img class='user_c_img' src="${e.user.avatarUrl}" />
       
        <p class='user_c'> <a href="#" class='user_c_name'>${e.user.nickname}:</a>${e.content}</p>
        <li class='user_d'>${myDate(e.time)}</li>
        `
        div.innerHTML= temp4;
        div4.appendChild(div)
      })
      })
     }); 
    } 
    Xiang();
    document.querySelector('.result').style.display='none';
    document.querySelector('.d2-2').style.display='none';
    return false;   
}
function appear_comment(){
  document.querySelector('.div4').style.display="block";
}
function disappear_comment(){
  document.querySelector('.div4').style.display="none";
}

function strong(t){
  let aa = document.querySelectorAll('.div2 a');
  /* console.log(aa.length); */
  for(var i = 0,len = aa.length;i<len;i++)
  {
    aa[i].style.cssText="font-size:13px;font-weight:500;border:none;margin-right:13px";
  }
  t.style.cssText="font-size:15px;font-weight:700;border-bottom: 3px solid #EC4141;margin-right:13px";
}

function strong2(t){
  let aa = document.querySelectorAll('.d2-2-1 a');
  /* console.log(aa.length); */
  for(var i = 0,len = aa.length;i<len;i++)
  {
    aa[i].style.cssText="font-size:15px;font-weight:500;border:none;"
  }
  t.style.cssText="font-size:22px;font-weight:700;border-bottom: 3px solid #EC4141;"
}

function strong3(t){
  let aa = document.querySelectorAll('.result_tag a');
  console.log(aa.length);
  for(var i = 0,len = aa.length;i<len;i++)
  {
    aa[i].style.cssText="font-size:14px;font-weight:500;"
  }
  t.style.cssText="font-size:15px;font-weight:700;"
  
}

function hotsearch(){
  let hr= 'http://musicapi.leanapp.cn/search/hot';
  Ajax_get(hr,(res)=>{
  // console.log(res);
  let data= res.result.hots;
  let lis = document.querySelectorAll('.search_div li a');
  for(var i=0,len= lis.length;i<len;i++)
  {
    lis[i].innerHTML=data[i].first;
  }
  })
}
function hotSearchOn(){
  document.querySelector('.search_div').style.display='block';
  hotsearch();
}
function hotSearchOff(){
  document.querySelector('.search_div').style.display='none';
}

function duration (b) {
  var date = new Date(b)
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return  m + s;
}

function doSearch(){
  let input = document.querySelector('#in1').value;
  if(input.length>0){
    headOff();
    let hr= 'http://musicapi.leanapp.cn/search?keywords='+ input;
  Ajax_get(hr,(res)=>{
  /* console.log(res); */
  let result_count= document.querySelector('.result_count');
  result_count.innerHTML="找到 "+res.result.songCount+" 首音乐";
  let data = res.result.songs;
  goods = data;
  document.querySelector('.tbody').innerHTML='';
  data.forEach(e=>{
  let b = e.duration;
  let a= duration(b);
  let tbody = document.querySelector('.tbody');
  let tr = document.createElement('tr');
  tr.id=e.id;
  tr.className="tr";
  let c=e.artists[0].name;
  let len=e.artists.length;
  if(len>1){
    for(var i=1;i<len;i++)
    {
      c=c+'/'+e.artists[i].name;
    }
  }
  search_Count++;
  let temp5=`
    <td onclick="search_play(this)" id="${e.id}"><div class="td_t1"><a href="#">${e.name}</a></div></td>
    <td><div class="td_ser">${c}</div></td>
    <td><div class="td_alb">${e.album.name}</div></td>
    <td><div class="td_time">${a}</div></td>
  `
  tr.innerHTML = temp5;
  tbody.appendChild(tr);
  });
  });
  }
  
}

function click_hotsearch(a){
  let b = a.innerHTML;
 document.querySelector('#in1').value =b;
 doSearch();
 hotSearchOff();
}

function headOff(){
  document.querySelector('.music_list').style.display='none';
  document.querySelector('.d2-2').style.display='none';
  document.querySelector('.result').style.display='block';
}
function headOn(){
  document.querySelector('.music_list').style.display='none';
  document.querySelector('.d2-2').style.display='block';
  document.querySelector('.result').style.display='none';
}

var goods3;
function login(){
 let img = document.querySelector('.d1-1 img');
 let userName= document.querySelector('.d1-1 .a1-2');

 let a =  document.querySelectorAll('.in2');
 let url = 'http://sandyz.ink:3000/login/cellphone?phone='+a[0].value+'&password='+a[1].value;
  
 a[0].value=a[1].value='';
 /* console.log(url); */
 
 const xhr = new XMLHttpRequest();
  xhr.open('post',url,true);
  //接收返回值
  xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      const res = JSON.parse(xhr.responseText);
     // const res=xhr.responseText;
     /*  console.log(res); */
      console.log('请求成功');   
      /* console.log(res);  */
      if(res.code==200){
        document.getElementById('D1').style.display="none";
        img.src = res.profile.avatarUrl;
        userName.innerHTML = res.profile.nickname;  
 
        let url = 'http://sandyz.ink:3000/user/playlist?uid='+res.account.id ;
        Ajax_get(url,(res)=>{
       /* console.log(res); */
       let data = res.playlist;
       goods3 = data;
       let userList = document.querySelector('.d2-1');
       data.forEach(e=>{
         let temp6 = `
          <p id="${e.id}" onclick="musiclist(this);bcchange(this)" >
           &nbsp;&nbsp;${e.name}        
          </p>
         `
         let a = document.createElement('a');
         a.innerHTML=temp6;
         a.href="#";
         userList.appendChild(a);
         })
       });
      }  
      else {
        alert('账号或者密码错误！');
      }
    } else {
      console.log('请求失败');
    }
  } 
 };
 //发送请求
xhr.send();
}

function strong4(t){
  let a =document.querySelectorAll('.d2-1 a');
  for(var i = 0,len = a.length;i<len;i++)
  {
    a[i].style.cssText=" background-color: #FFFFFF;"
  }
  a[t].style.cssText="background-color: #F6F6F7;"
}
function bcchange(t){
  let d =document.querySelectorAll('.d2-1 p');
  let c = 0;
  for(var i = 0,len = d.length;i<len;i++)
  {
    d[i].style.cssText="font-size:15px;font-weight:500;";
    if(d[i].innerHTML==t.innerHTML)
    {
      c=i;
    }
  }
  t.style.cssText="font-size:18px;font-weight:600;"
  strong4(c);
}