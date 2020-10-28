var objectsSources = ['Leaves (1).png','Tree.png','Sticks (2).png'];
var lSelect;
var cSelect;
var rSelect;
var left;
var center;
var right;
function Startup(){

document.getElementById('start').style.visibility="hidden";
document.getElementById('runwayDiv').style.animation="animate 60s linear infinite";

  alert("Good Luck!");
  //left
   lSelect = Math.floor(Math.random() * 3);

   left = document.createElement("img");
  left.src=objectsSources[lSelect];
  left.id="left";
  document.getElementById('body').appendChild(left);
  //center
     cSelect = Math.floor(Math.random() * 3);


  center = document.createElement("img");
  center.src=objectsSources[cSelect];
  center.id="center";
  document.getElementById('body').appendChild(center);
  //right
     rSelect = Math.floor(Math.random() * 3);


   right = document.createElement("img");
  right.src=objectsSources[rSelect];
  right.id="right";
  document.getElementById('body').appendChild(right);
 setTimeout(regen,3000);
}
function regen(){
 lSelect = Math.floor(Math.random() * 3);
 left.src=objectsSources[lSelect];
 left.style.top="-20%";

  cSelect = Math.floor(Math.random() * 3);
    center.src=objectsSources[cSelect];
  center.style.top="-20%";

if(lSelect===1&&cSelect==1){
  rSelect=0;
}
  rSelect = Math.floor(Math.random() * 3);
  right.src=objectsSources[rSelect];

  right.style.top="-20%";
 setTimeout(regen,3000);
}
