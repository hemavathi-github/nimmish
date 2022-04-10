var balloon2
var database
var position
var dbscale

function preload(){
backgroundImage= loadImage("Hot Air Ballon-01.png")
balloonImage= loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png")

}
function setup() {
  createCanvas(800,400);
  database= firebase.database();

 
  balloon2= createSprite(100,200,40,40)
  balloon2.addAnimation("balloon",balloonImage)
  
  var balloonPosition= database.ref('balloon/position')
  balloonPosition.on("value",readPosition, showError)
  var balloonPosition1= database.ref('balloon/dbscale')
  balloonPosition1.on("value",readPosition1, showError)


}

function draw() {
  background(backgroundImage); 
  balloon2.scale=dbscale
  
  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0,0)
  } 
  if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0,0)
  }
  if(keyDown(UP_ARROW)){
   updateHeight(0,-10,-0.01)
   balloon2.addAnimation("balloon",balloonImage)
   //balloon2.scale=balloon2.scale-no
  }
  if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10,0.01)
    balloon2.addAnimation("balloon",balloonImage)
   // balloon2.scale=balloon2.scale+no
  }
  //console.log(balloon2.x)
  //console.log(balloon2.y)
  drawSprites();

}
function updateHeight(x,y,s){
database.ref('balloon/position').update({
  'x': position.x+ x,
  'y': position.y+ y
})
database.ref('balloon').update({
  'dbscale': dbscale+s
  })
}
function readPosition(data){
  position=data.val();
  balloon2.x = position.x;
  balloon2.y= position.y;
 }
 function readPosition1(data){
  dbscale=data.val();
  console.log(dbscale)
 //scale = dbscale
  }
function showError(){
  console.log("An error in writing the database")
}