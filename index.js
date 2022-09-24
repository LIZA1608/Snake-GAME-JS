const canvas=document.querySelector('canvas')//yeh hum ne us element ko select kiya jis per hum ko 
const ctx=canvas.getContext('2d')//yeh contxt provide karta ki hum ne 2d bnana hain ya 3d
// ctx.fillStyle='black'//rec box ka color black hain 
// ctx.fillRect(0,0,50,40)//yeh app ka structure crete karne mein help karti hain,it contains 4 parameter
// starting point ->0,0  height ->50 width->40
//snake ke lye hum ko ek array bnana padega

let square= 50 ;// yeh decide kar raha hain uska height and width
var snakeCell=[[0,0]]; // yeh uska cell describe kar raha hainn or usku dynamic bane ke liye hum ne 2d array bna liya 
let bHight=700;
let bWidth=1450;
let direction ='right';
let GameOver= false;
let foodG = generateRandomCell()
let score=0;

document.addEventListener('keydown',function(e){
//  console.log(e)

if(e.key==='ArrowRight'){// 
  direction='right'
}
else if(e.key==='ArrowLeft'){
    direction='left'
}
else if(e.key==='ArrowDown'){
    direction='down';
}
else{
    direction='up'
}
})

function update(){// this function intially jo snake ke andar changes la rahe hain woh is mein hoga
//  console.log("hello update")
// ctx.clearRect(0,0,bWidth,bHight) //jo ki aage cell ko remove karega starting position se
headX = snakeCell[snakeCell.length-1][0]  // yeh iska last wla cellpoint coordinate decide karge
headY=snakeCell[snakeCell.length-1][1] 

if(direction==='right'){
    newX=headX+square
    newY=headY
    if(newX===bWidth){
        GameOver=true
    }
}
else if(direction==='down'){
    newX=headX
    newY=headY+square
    if(newY===bHight){
        GameOver=true
    }
}
else if(direction==='left'){
    newX=headX-square
    newY=headY
    if(newX<0){
        GameOver=true
    }
}
else{
    newX=headX
    newY=headY-square
    if(newY<0){
        GameOver=true
    }
}
if(newX===foodG[0] && newY===foodG[1]){// is case mein jab food ke woh kha jaye tab uski ength badh jaye
   foodG=generateRandomCell()
   score+=1;
}
else{
    snakeCell.shift()
}
//  newX=headX+square // is k andar agar x axis along move karna hain is liye hum square ki value add ka denge 
//  newY=headY 
 snakeCell.push([newX,newY])
//  snakeCell.shift([newX,newY])//yeh aage se naye naye cell ko remove karta jayeda


}

function draw(){ // to cerate snake 
// hum idher for loop ka use karenge taki ittrate kar sake 

if(GameOver===true){
    clearInterval(Id)
    ctx.font='20px sans-serif'
    ctx.fillText('GameOver',60,70);
     return;
}
ctx.clearRect(0,0,bWidth,bHight)
for(let cell of snakeCell){
   ctx.fillStyle='green';
    ctx.fillRect(cell[0],cell[1],square,square)
}
ctx.fillStyle='black';
ctx.fillRect(foodG[0],foodG[1],square,square)//four parameter to create any structure//is ke bina kuch draw nhi hu sakta 
ctx.font='20px sans-sarif'
ctx.fillText(`SCORE  ${score}`,20,20)//to show the score we cerate  a text 
}

let Id=setInterval(function(){ //parameter->call back function and  ke time ki kab yeh call hoga
update()
draw()
},100)
// setInterval function update and draw to run karega infinte time 

// // this will give random value 
// console.log(Math.random());
// console.log(Math.random()*10);

// console.log(Math.round(Math.random()*10))
// console.log(Math.round(Math.random()*100)/100);

function generateRandomCell(){
    return[
     Math.round(Math.random()*(bWidth-square)/square)*square ,
    Math.round(Math.random()*(bHight-square)/square)*square
    ];
}
// console.log(Math.round(Math.random()*(bWidth-square)/square)*square)// to generate food  and hamesha random coordinate generte hone woh 50 ke multiple mein hota hain
//jitna hamara snake ka size hain 

