// 轮播图-滑动切换
var inner2 = document.getElementById("inner2");
var img2 = document.querySelectorAll("#box2 img"); 
var ul2 = document.getElementById("pointer2");
var li2 = document.querySelectorAll("#pointer2 li");
var index2 = 0;
var imgWidth = 450+5;

function show2 (x) {
	inner2.style.transform = `translateX(-${x*imgWidth}px)`;  
	for(let i = 0; i< li2.length; i++)
        li2[i].style.backgroundColor = "";
    li2[x].style.backgroundColor = "#D2B48C";
}
function scroll2 () {
    show2(index);
    index2++;
	if (index2 == img2.length) index2 = 0;	
}
var timer2 = setInterval(scroll2, 2000);

for (let i=0; i<img2.length; i++) {
    li2[i].index2 = i;
}
ul2.onclick = function(event) {
	if(event.target.index){
		clearInterval(timer2);
		show2(event.target.index);
		timer2 = setInterval(timer2,2000);
		index2 = event.target.index;
	}
};
