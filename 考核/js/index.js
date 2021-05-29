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

   let cont1=document.querySelector('#container1');
  Ajax_get('https://www.tianqiapi.com/free/day?appid=78738631&appsecret=L4CsoB72',(res)=>{
      console.log(res);
      let temp =`
      <p id="txt-pub-time">中央气象台 ${res.update_time}发布<p>
      <div id="ct-main">
      <p id="txt-temperature">${res.tem}°</p>
      <p id="txt-name">${res.wea}</p>
  </div>
  <div class='container'>
      <p class="item2"><i></i><span>&nbsp;</span></p>
      <p class="item2"><i></i><span>${res.win}&nbsp;${res.win_speed}</span></p>
      <p class="item2"><i></i><span>&nbsp;</span></p>
      <p class="item2"><i></i><span>&nbsp;</span></p>
  </div>
     <div>
         <p></p>
     </div>      
        <div><img src="" alt=""></div> `

        let div =document.createElement('div');
        div.innerHTML =temp;
        div.className='container'
 cont1.appendChild(div);
  })

function wea_img(t,q){

  if(q==='day'){

    switch(t){
    case 'rain': return'http://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/day/07.png';
    case 1:;
    }
  }
  else{

    switch(t){
      case 'rain': return'http://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/day/07.png';
      case 1:;
      }
  }

}


var dat1=[];
var dat2=[];
var Days=[];
  Ajax_get('https://v0.yiketianqi.com/api/worldchina?appid=78738631&appsecret=L4CsoB72',(res)=>{
    
  console.log(res);
  let co_ol=document.querySelector('#cont2-ol');
  for(var i=0,len =21;i<len;i++)
  {
    let temp =`
    <p class="txt-time">${res.hours[i].time}</p>
    <img src="http:////mat1.gtimg.com/pingjs/ext2020/weather/mobile2.0/assets/weather/day/01.svg" alt="">
    <p class="txt-tem">${res.hours[i].tem}°</p>`
    let li=document.createElement('li');
    li.innerHTML=temp;
    li.className="item";
    li.style.cssText="width: 3.24615%;";
    co_ol.appendChild(li);
  }


  let data1=[];
  let data2=[];
  let cb=[];
  let ol_day=document.querySelector('#ol-day');
  let days=res.month;
  for(var i=0,len =6;i<len;i++)
  {
    cb[i]=days[i].dateOfWeek;
    data1[i]=days[i].day.temperature;
    data2[i]=days[i].night.temperature;
    let c=wea_img(days[i].day.precipType,'day');
    let b=wea_img(days[i].night.precipType,'night');
    let temp2 =`
    <p class="day">${days[i].date.replace(/2021-/i, "")}</p>
<p class="date">${days[i].dateOfWeek}</p>
<div>
   <p class="weather"></p>
   <img src="${c}" alt="">
</div>
<div  style="margin-top: 244px;">
    <img src="${b}" alt="">
    <p class="weather"></p>
</div>
<p class="wind">${days[i].night.windDirCompass+'风'}</p>
<p class="wind"></p>
`
    let li=document.createElement('li');
    li.innerHTML=temp2;
    li.className="item";
    li.style.cssText="width: 3.136667%;";
    ol_day.appendChild(li);
  }

dat1=data1.map((value)=>{
  return Number(value)
})
dat2=data2.map((value)=>{
  return Number(value)
})
Days=cb.map((t)=>{
  return t.replace(/星期/, "周")
})
char(dat1,dat2)
/* console.log(cb);
console.log(Days); */
  });
  
/* Ajax_get('https://geoapi.qweather.com/v2/city/lookup?location=重庆&key=faf7c0d90dbe4fb9a12a71c8ad7f7e91',(res)=>{
console.log(res);
}) */
 let B=[];
Ajax_get('https://devapi.qweather.com/v7/indices/1d?type=1,2,3,4,5,6,7,8&location=101010100&key=faf7c0d90dbe4fb9a12a71c8ad7f7e91',(res)=>{
  console.log(res);
  let L =document.querySelector('#live-ul');
  let j=0;
  for(var i=0,len=res.daily.length;i<len;i++)
  {
    let temp3=`
    <p href="#" class="liv_txt" onclick="click_on(this)">${res.daily[i].name}</p>
    <p class="liv_cate">${res.daily[i].category}</p>
    `
    B[j]=res.daily[i].name;
    B[j+1]=res.daily[i].text;
    j+=2;
   let li=document.createElement('li');
   li.innerHTML=temp3;
   li.className='item3';
  L.appendChild(li);
  }
  }) 

  function click_on(t){
    console.log(1);
    let h3=document.querySelector('w_h3');
  /*   Ajax_get('https://devapi.qweather.com/v7/indices/1d?type=1,2,3,4,5,6,7,8&location=101010100&key=faf7c0d90dbe4fb9a12a71c8ad7f7e91',(res)=>{

    for(var i=0,len=res.daily.length;i<len;i++)
  {
    if(res.daily.name==t.innerHTML)
    {
      h3.innerHTML=res.daily.name;
      let p=document.querySelector('w-p');
      p.innerHTML=res.daily.text
    }
  
  }
  }) */

  for(var i=0,len=B.length;i<len;i++)
  {
    
    console.log(t.innerHTML);
    if(B[i]==t.innerHTML)
    {
      window.onload=function () {
        h3.innerHTML=B[i];
      let p=document.querySelector('w-p');
      p.innerHTML=B[i+1];
      
      }
      break;
    }
  
  }
   let E=document.querySelector('.window');
   console.log( E.style);
   E.style.cssText='opacity: 1;'
  }
