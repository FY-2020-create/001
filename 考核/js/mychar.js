function char(dat1,dat2) {
    var ctx = document.getElementById('MyChart').getContext('2d');
    // let date1=[65, 59, 80, 81, 56, 55, 40];
     let date2=[13, 79, 20, 40, 80, 2, 60];
    /* console.log(["1","2","3","4","5"]);
    console.log(dat1); */
    var chart = new Chart(ctx, {
        // 要创建的图表类型
        type: 'line',
    
        // 数据集
         data : {
            labels: Days,
            datasets: [
                {    label:"day",
                    pointBackgroundColor:"rgba(255,48,48,0.2)",
                    data:dat1
                },
                {    label:'night',      
                    pointBackgroundColor:"rgba(255,48,48,0.2)",
                    data: dat2
                }
            ]
        },
    
        // 配置选项
        options: {}
    })  
   /*  var c=document.getElementById("MyChart");
    var ctx=c.getContext("2d");
    let n=1;
    for(var i=0,len=dat1.length;i<len;i++){
        ctx.beginPath();
        ctx.moveTo((n-1)*200+20,dat1[i]);
        ctx.quadraticCurveTo((n-1)*200+50,100,n*200+20,dat1[i+1]);
        ctx.stroke(); 
        n++;
        console.log(i);
        console.log(dat1[i]);
    } */
}


