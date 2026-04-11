const canvas = document.getElementById('myCanvas');
const c = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

let move1d = false;
let move1u = false;
let heightp1 = 0;
let move2d = false;
let move2u = false;
let heightp2 = 0;

window.addEventListener('keydown',function(event){
    if(event.key == 's')
        move1d = true;
    if(event.key == 'w')
        move1u = true;
    if(event.key == 'i')
        move2d = true;
    if(event.key == 'k')
        move2u = true;

})

window.addEventListener('keyup',function(event){
    if(event.key == 's')
        move1d = false;
    if(event.key == 'w')
        move1u = false;
    if(event.key == 'i')
        move2d = false;
    if(event.key == 'k')
        move2u = false;

})

function Player1(){
    this.h = heightp1;

    this.draw = function(){
        c.beginPath();
        c.fillStyle = '#A0CD60';
        c.fillRect(0,this.h,20,50);

    };
    
     this.update = function(){
        this.h = heightp1%500;
        
        this.draw();
    }
}

function Ball(){
    this.x = 25;
    this.y = 10;
    this.dx = 2;
    this.dy = 2;

    this.draw = function(){
        c.beginPath();
        c.fillStyle = '#50c7c7';
        c.arc(this.x, this.y, 8, 0, 6.28)
        c.fill();
    }

    this.update = function(){

        this.x = this.x + this.dx;
        this.y = this.y + this.dy;

        if(this.y<10){
            this.dy = -this.dy;
        }

        if(this.y>490){
            this.dy = -this.dy;
        }

        this.draw();
    }

}

function collision(x1,y1,r1, x2,y2,l){
    
    return(Math.abs(x2-x1)<= r1 && (y1>=y2 && y1<y2+l));
    
}

function Player2(){
    this.h = heightp2;

    this.draw = function(){
        c.beginPath();
        c.fillStyle = '#A0CD60';
        c.fillRect(480,this.h,20,50);

    };
    
     this.update = function(){
        this.h = heightp2;
    

        this.draw();
    }
}

let p1 = new Player1();
let p2 = new Player2();
let ball = new Ball();

function animate(){
requestAnimationFrame(animate);

c.fillStyle = "black";
c.fillRect(0,0,500,500)

if(move1d && heightp1<450)
        heightp1 = heightp1 +5;
        if(move1u&& heightp1>0)
        
        heightp1 = heightp1 -5;

if(move2d && heightp2<450)
        heightp2 = heightp2 +5;
        if(move2u && heightp2>0)
        
        heightp2 = heightp2 -5;


if(collision(ball.x, ball.y, 8, 20, p1.h,50))
{
    ball.x = ball.x + 10;
    ball.dx = -ball.dx;
   
}


if(collision(ball.x, ball.y, 8, 480, p2.h,50))
{
    ball.dx = -ball.dx;
    
}

p1.update();
p2.update();
ball.update();

}

animate();