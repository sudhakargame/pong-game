const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d')
const up = document.getElementById("up")
const down = document.getElementById("down")

canvas.width = 1024
canvas.height = 512

class Ball{
  constructor(){
    this.position = {
      x:canvas.width/2,
      y:canvas.height/2
    }
    this.velocity={
      x:-5,
      y:5
    }
    this.radius = 15
    this.color = "skyblue"
  }
  draw(){
    c.beginPath()
    c.fillStyle = this.color
    c.arc(this.position.x,this.position.y,
    this.radius,0,360)
    c.fill()
    c.closePath()
  }
  update(){
   this.draw()
   this.position.x += this.velocity.x
   this.position.y += this.velocity.y
  }
}

class Player{
  constructor({position}){
    this.position = position
    this.velocity = {
      x:0,
      y:0
    }
    this.width = 10
    this.height = 150
    this.color = "lightgrey"
  }
  draw(){
    c.fillStyle = this.color
    c.fillRect(this.position.x,
    this.position.y,this.width,this.height)
  }
  update(){
    this.draw()
    this.position.y += this.velocity.y
  }
}

const ball = new Ball()
const player = new Player({
  position:{
      x:20,
      y:canvas.height/2 - 10
    }
})
const enemy = new Player({
  position:{
      x:canvas.width-20,
      y:canvas.height/2 - 10
    }
})

function animate(){
  requestAnimationFrame(animate)
  c.fillStyle = "grey"
  c.fillRect(0,0,1024,512)
  ball.update()
  player.update()
  enemy.update()
  // ball collision with border
  if (ball.position.x>=canvas.width)
     ball.velocity.x = -5
  else if (ball.position.x <= 0) { 
     ball.position.x = canvas.width/2
     ball.position.y = canvas.height/2  }
  else if (ball.position.y >= canvas.height)
     ball.velocity.y = -5
  else if (ball.position.y <= 0)
     ball.velocity.y = 5
  // player border collision
  if (player.position.y + player.height>= canvas.height
  || player.position.y <= 0)
  player.velocity.y = 0
  // player collision with ball
  if (ball.position.x-ball.radius<=player.position.x+player.width
  && ball.position.y-ball.radius>=player.position.y
  && ball.position.y-ball.radius <=player.position.y+player.height)
  ball.velocity.x = 5
  // enemy AI 
  enemy.position.y = ball.position.y-70
  if ( enemy.position.y <= 0)
  enemy.position.y = 0
  else if (enemy.position.y+enemy.height>=canvas.height)
  enemy.position.y = canvas.height-150
  
    // enemy collision with ball
  if (ball.position.x+ball.radius>=enemy.position.x)
  ball.velocity.x = -5
  
}
animate()

up.addEventListener("touchstart",()=>{
     player.velocity.y = -10
})
up.addEventListener("touchend",()=>{
     player.velocity.y = 0
})
down.addEventListener("touchstart",()=>{
     player.velocity.y = 10
})
down.addEventListener("touchend",()=>{
     player.velocity.y = 0
})
