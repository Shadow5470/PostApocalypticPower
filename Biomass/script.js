// var objectsSources = ['Leaves (1).png','Tree.png','Sticks (2).png'];
// var lSelect;
// var cSelect;
// var rSelect;
// var left;
// var center;
// var right;
// var curPos = 42;
// var pressed;
// var playerTop;
// var rightTop;
//
// var player = document.getElementById("player");
// function keyPressing(event){
//   pressed=event.which;
//   if(pressed===37&&curPos>40){
//     player.style.left;
//     player.style.left=""+(curPos-20)+"%";
//     curPos = curPos - 20;
//   }else if(pressed===39&&curPos<60){
//       player.style.left=""+(curPos+20)+"%";
//       curPos = curPos + 20;
//   }else if(pressed==32){
//     alert(parseInt(right.style.top));
//   }
// }
//
// setInterval(function(){
//      curPos = parseInt(window.getComputedStyle('player').getPropertyValue("left"));
//
//     rightTop = parseInt(window.getComputedStyle('right').getPropertyValue("top"));
//     if( rightTop<500 && blockTop>300){
//         alert("Game over.");
//         block.style.animation = "none";
//     }
// },1);
// function Startup(){
// document.getElementById('start').style.visibility="hidden";
// document.getElementById('runwayDiv').style.animation="animate 60s linear infinite";
//
//   //left
//    lSelect = Math.floor(Math.random() * 3);
//
//    left = document.createElement("img");
//   left.src=objectsSources[lSelect];
//   left.id="left";
//   document.getElementById('body').appendChild(left);
//   //center
//      cSelect = Math.floor(Math.random() * 3);
//
//
//   center = document.createElement("img");
//   center.src=objectsSources[cSelect];
//   center.id="center";
//   document.getElementById('body').appendChild(center);
//   //right
//      rSelect = Math.floor(Math.random() * 3);
//
//
//    right = document.createElement("img");
//   right.src=objectsSources[rSelect];
//   right.id="right";
//   document.getElementById('body').appendChild(right);
//
//  setTimeout(regen,2000);
// }
// function regen(){
//  lSelect = Math.floor(Math.random() * 3);
//  left.src=objectsSources[lSelect];
//  left.style.top="-20%";
//
//   cSelect = Math.floor(Math.random() * 3);
//     center.src=objectsSources[cSelect];
//   center.style.top="-20%";
//
//
//   rSelect = Math.floor(Math.random() * 3);
//   right.src=objectsSources[rSelect];
//   if(lSelect===1&&cSelect==1){
//     rSelect=2;
//   }else if(lSelect===1&&rSelect==1){
//     cSelect=0;
//   }else if(cSelect === 1&&rSelect==1){
//     lSelect=2;
//   }
//   right.style.top="-20%";
//  setTimeout(regen,2000);
//
// }
alert("Hello and welcome to biomass, you will need to collect resources in order to power the generator.");
alert("Collect 20 green squares to power the generator, and win the game");
var counterMillion;
var counter1=0;
document.addEventListener("keydown", event => {
  if(event.key==="ArrowLeft"){moveLeft();}
  if(event.key==="ArrowRight"){moveRight();}
});
var character = document.getElementById("character");
function moveLeft(){
    let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    left -= 100;
    if(left>=0){
        character.style.left = left + "px";
    }
}
function moveRight(){
    let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    left += 100;
    if(left<300){
        character.style.left = left + "px";
    }
}
var block = document.getElementById("block");
var counter = 0;
block.addEventListener('animationiteration', () => {
    var random = Math.floor(Math.random() * 3);
    var randomC=Math.floor(Math.random()*2)
    if(randomC==1){
      block.style.backgroundColor="green";

    }else{
      block.style.backgroundColor="red";
    }
    left = random * 100;
    block.style.left = left + "px";
    counter++;
    if(counterMillion===true){
      counter1+=1;
      counterMillion=false;
    }
    if(counter1===21){
      alert("Congradulations, you won!");
        block.style.animation = "none";
    }
});
setInterval(function(){
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var blockTop = parseInt(window.getComputedStyle(block).getPropertyValue("top"));
    if(characterLeft==blockLeft && blockTop<500 && blockTop>300){
      if(block.style.backgroundColor==="green"){
        counterMillion = true;
        document.getElementById('score').value=''+counter1+'';

      }else{
        alert("Game over");
        location.reload();
        block.style.animation = "none";
      }
    }
},1);




document.getElementById("right").addEventListener("touchstart", moveRight);
document.getElementById("left").addEventListener("touchstart", moveLeft);
