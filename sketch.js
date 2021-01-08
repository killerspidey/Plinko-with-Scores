const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine, world;
var particles = [];
var plinkos = [];
var divisions = [];

var divisionHeight = 300;
var score = 0;
var turn = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function setup() {
    createCanvas(800, 800);
    engine = Engine.create();
    world = engine.world;
    ground = new Ground(width / 2, height, width, 20);
    
    var xyz = Math.round(random(1, 20));
    xyz *= 50;
    
    console.log(xyz);
    
    for(var k = 0; k <= width; k += 80) {
        divisions.push(new Divisions(k, height - divisionHeight / 2, 10, divisionHeight));
    }
    
    for(var j = 75; j <= width; j += 50) {
        plinkos.push(new Plinko(j, 75));
    }
    
    for(var j = 50; j <= width - 10; j += 50) {
        plinkos.push(new Plinko(j, 175));
    }
    
    for(var j = 75; j <= width; j += 50) {
        plinkos.push(new Plinko(j, 275));
    }
    
    for(var j = 50; j <= width - 10; j += 50) {
        plinkos.push(new Plinko(j, 375));
    }
}

function draw() {
    background(0, 0, 0);
    textSize(20);
    Engine.update(engine);
    
    for(var i = 0; i < plinkos.length; i++) {
        plinkos[i].display();
    }
    
    for(var k = 0; k < divisions.length; k++) {
        divisions[k].display();
    }
    
    for(var j = 0; j < particles.length; j++) {
        particles[j].display();
    }
    
    textSize(30);
    fill(255, 255, 255);
    text("Score :" + score, 20, 35);
    
    /*if(particles != null) {
        particles.display();
        
        if(particles.body.position.x < 300 && particles.body.position.y > 760) {
            score += 500;
            
            if(turn === 5) {
                gameState = END;
            }
            
            if(particles.body.position.x > 301 && particles.body.position.x < 600) {
                score += 100;
                
                if(turn === 5) {
                    gameState = END;
                }
            }
            
            if(particles.body.position.x > 601 && particles.body.position.x < 900) {
                score += 200;
                
                if(turn === 5) {
                    gameState = END;
                }
            }
            
            particles = null;
        }
    }*/
    
    if(gameState === END) {
        push();
        strokeWeight(1);
        stroke("red");
        textSize(60);
        fill(255, 255, 255);
        text("Game Over", 200, 250);
        textSize(50);
        stroke("yellow");
        text("Press Space Key to Restart", 100, 340);
        pop();
    }
    
    fill(255, 255, 255);
    textSize(32);
    text("500", 15, 550);
    text("500", 95, 550);
    text("500", 175, 550);
    text("100", 255, 550);
    text("100", 334, 550);
    text("100", 415, 550);
    text("100", 495, 550);
    text("200", 575, 550);
    text("200", 655, 550);
    text("200", 735, 550);
}

function mousePressed() {
    if(gameState !== END) {
        turn += 1;
        particles = new Particle(mouseX, 10, 10, 10);
    }
}

function keyPressed() {
    if(keyCode === 32) {
        score = 0;
        turn = 0;
        gameState = PLAY;
    }
}