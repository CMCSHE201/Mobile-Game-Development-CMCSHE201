var canvas;
var canvasContext;
var canvasX;
var canvasY;
var mouseIsDown = 0;
var lastPt=null;

var ballX;
var ballY;
var ballRadius = 40;

var playerX;
var playerY;
var playerDX = 0;
var playerDY = 0;
var playerWidth = 50;
var playerHeight = 50;

var joystickX = 100;
var joystickY = 355;
var joystickRadius = 20;

var buttonX;
var buttonY = 355;
var buttonRadius = 20;

var sPlayer;

var joystickMove = false;

var theFloorColumns = 50;
var floorWidth = 50;
var floorHeight = 50;
var theFloor = [];
var theFloorX;
var theFloorY;
var floorRendered = false;
var floorDX = 0;
var baseFloorX;

var stoneBrick = new Image();
var crackedBrick = new Image();
var mossyBrick = new Image();
var imageChoice = [];

var playerImage = new Image();

var upwardVelocity = false;
var falling = false;
var jumpTrigger = false;
var enemyAlive = true;

var enemyX;
var enemyY;

var startTimeMS;

var gameOverScreen = false;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    init();

    canvasX = canvas.width/2;
    canvasY = canvas.height - 30;

    playerX = (canvas.width/2);
    playerY = (canvas.height/2);

    ballX = (canvas.width * 0.4);
    ballY = (canvas.height/2);

    buttonX = canvas.width - 100;

    enemyX = theFloor[20].x;
    enemyY = (canvas.height - floorWidth - 75);

    startTimeMS = Date.now();

    if(!gameOverScreen)
    {
        gameLoop();
    }
}

function gameLoop() {
    render();
    var elapsed = (Date.now() - startTimeMS) / 1000;
}

function renderPlayer(delta) {
    sPlayer.render();
}

function update(deltaTime) {
    sPlayer.update(deltaTime);
}

function init() {
	canvas = document.getElementById('gameCanvas');

	if (canvas.getContext) {
		//Set Event Listeners for window, mouse and touch
		window.addEventListener('resize', resizeCanvas, false);
		window.addEventListener('orientationchange', resizeCanvas, false);
		canvas.addEventListener("touchstart", touchDown, false);
		canvas.addEventListener("touchmove", touchXY, true);
	    canvas.addEventListener("touchend", touchUp, false);
	    document.body.addEventListener("touchcancel", touchUp, false);

	    initFloor();
        stoneBrick.src = "Sprites/StoneBrick.png";
        crackedBrick.src = "Sprites/CrackedBrick.png";
        mossyBrick.src = "Sprites/MossyBrick.png";
        playerImage.src = "Sprites/Billy.png";

        for(var col = 0; col < theFloorColumns; col++)
        {
            imageChoice[col] = Math.round(Math.random() * 2);
        }
	    resizeCanvas();
	}
}

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function initFloor() {
    for(var col = 0; col < theFloorColumns; col++)
    {
        theFloor[col] = { x: (col * floorWidth), y: (canvas.height - floorWidth) };

    }
    theFloorX = (col * floorWidth);
    theFloorY = canvas.height - floorWidth;
}

function MoveBall(){

    if(joystickX > 110)
    {
        for(var col = 0; col < theFloorColumns; col++)
        {
            theFloor[col].x += -(joystickX - 100) / 75 * 6;
        }
    }
    else if(joystickX < 90)
    {
        for(var col = 0; col < theFloorColumns; col++)
        {
            theFloor[col].x -= (joystickX - 100) / 75 * 6;
        }
    }
}