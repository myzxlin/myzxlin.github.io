// 轮播图-跳转切换
var img = document.querySelectorAll("#box img"); 
var ul = document.getElementById("pointer");
var li = document.querySelectorAll("#pointer li");
var index = 0;        

function show (x) {  
    for (let i=0; i<img.length; i++) {
        img[i].style.display = "none";    
        li[i].style.backgroundColor = "";  
    }
    img[x].style.display = "block";      
    li[x].style.backgroundColor = "#D2B48C"; 
}
function scroll () {  
    show(index);
    index++; 
    if (index == img.length) index = 0;
};
var timer = setInterval(scroll, 2000); 

for (let i=0; i<img.length; i++) {
    li[i].index = i;
}

ul.onclick = function (event) { 
    if (event.target.index){
        clearInterval(timer);  
        show(event.target.index);
        timer = setInterval(scroll, 2000);
        index = event.target.index;
    }
}