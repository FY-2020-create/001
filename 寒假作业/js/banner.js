                var aImg = document.querySelectorAll('.container img'); 
                var aLi = document.querySelectorAll('.container li');
                var bLi = document.querySelectorAll('.point li');
                var btnLeft = document.querySelector('.left');
                var btnRight=document.querySelector('.right');
                var index = 0;        
                var lastIndex = 0;
              
                var aListname=["img1","img2","img3","img4","img5","img6","img7","img8","img9","img10"];
                
                function nextImg(){
                    aListname.unshift(aListname[9]);
                    aListname.pop();
                    for(var i=0,len=aListname.length;i<len;i++)
                    {
                       aLi[i].setAttribute("id",aListname[i]);
                    }
                    lastIndex=index;
                    index++;
                    if(index>9) {
                        index=0;
                    }
                    bLi[lastIndex].className='li1';
                    bLi[index].className='active3';
                }
                function lastImg(){
                    aListname.push(aListname[0]);
                    aListname.shift();
                    for(var i=0,len=aListname.length;i<len;i++)
                    {
                       aLi[i].setAttribute("id",aListname[i]);
                    }
                    lastIndex=index;     
                     if(index>0&&index<=9){
                      index--;
                     }
                    else {
                        index=9;
                    }
                    bLi[lastIndex].className='li1';
                    bLi[index].className='active3';
                }
                setInterval(nextImg,4000);

                      