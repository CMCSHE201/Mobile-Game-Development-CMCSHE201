var canvas;
var canvasContext;
var canvasX;
var canvasY;
var mouseIsDown = 0;
var lastPt=null;

//Joystick Variables
var joystickX = 100;
var joystickY = 355;
var joystickRadius = 20;

var joystickL = false;
var joystickR = false;

var joystickMove = false;

//Button Variables
var buttonX;
var buttonY;
var buttonRadius = 20;

//Pause Variables
var pauseX;
var pauseY;

//Player and Enemy Classes created
let player;
let enemy;
let enemy2;
let enemy3;

//Player direction boolean
var playerRight = true;

//Player lives and score
var lives;
var theScore = 0;

//Floor variables
var theFloorColumns = 75;
var floorWidth = 50;
var floorHeight = 50;
var theFloor = [];
var theFloorActive = [];
var theFloorX;
var theFloorY;
var floorRendered = false;
var floorDX = 0;
var baseFloorX;

//Enemy positions
var enemyPos = [];
var oldEnemyPos = [];

var enemyX = [];
var enemyY = [];

//Images variables
var stoneBrick = new Image();
var crackedBrick = new Image();
var mossyBrick = new Image();
var imageChoice = [];

var backgroundImage = new Image();

var joystickImage = new Image();
var joystickLeft = new Image();
var joystickRight = new Image();

var buttonImage = new Image();
var pauseImage = new Image();
var playImage = new Image();

//Timer and delta time variables
var timer = 0;

var startTimeMS;
var elapsed;

//Sounds
var robotDeath;
var playerHit;
var playerDeath;
var myMusic;
var musicPlaying = false;

//Game state variables
var gamePaused = false;
var introScreen = true;
var gameOverScreen = false;

//Platform Checker
var mobile;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    //Intitialise game
    init();

    lives = 3;

    canvasX = canvas.width/2;
    canvasY = canvas.height - 30;

    //Initialise player and enemies
    player = new Player();
    enemy = new Enemy();
    enemy2 = new Enemy();
    enemy3 = new Enemy();

    //Initialise UI
    buttonX = canvas.width - 100;
    buttonY = canvas.height - 50;

    joystickY = canvas.height - 50;

    pauseX = canvas.width - 100;
    pauseY = 5;

    //Set player position
    playerPosX = (canvas.width * 0.4);
    playerPosY = (canvas.height / 2);

    //Set enemy positions
    enemyX[0] = theFloor[17].x;
    enemyY[0] = (canvas.height - floorWidth - 50);

    enemyX[1] = theFloor[24].x;
    enemyY[1] = (canvas.height - floorWidth - 50);

    enemyX[2] = theFloor[35].x;
    enemyY[2] = (canvas.height - floorWidth - 50);

    enemyPos[0] = 17;
    enemyPos[1] = 24;
    enemyPos[2] = 35;

    oldEnemyPos[0] = 17;
    oldEnemyPos[1] = 24;
    oldEnemyPos[2] = 35;

    enemy.position.x = enemyX[0];
    enemy.position.y = enemyY[0];

    enemy2.position.x = enemyX[1];
    enemy2.position.y = enemyY[1];

    enemy3.position.x = enemyX[2];
    enemy3.position.y = enemyY[2];

    startTimeMS = Date.now();

    //Load sounds and play music
    robotDeath = new sound("Audio/RobotDeath.wav");
    playerHit = new sound("Audio/BenOof.wav");
    playerDeath = new sound("Audio/BenDeath.wav")
    myMusic = new sound("Audio/music.wav");
    myMusic.play();

    //Check if game is running
    if(!gameOverScreen)
    {
        gameLoop();
    }
}

function gameLoop() {
    render();
    elapsed = (Date.now() - startTimeMS) / 1000;
}

function init() {
	canvas = document.getElementById('gameCanvas');

	if (canvas.getContext) {
		//Set Event Listeners for window, mouse and touch
		window.addEventListener('resize', resizeCanvas, false);
		window.addEventListener('orientationchange', resizeCanvas, false);
		canvas.addEventListener("mousedown", touchDown, false);
		canvas.addEventListener("mousemove", touchXY, true);
	    canvas.addEventListener("mouseup", touchUp, false);
		canvas.addEventListener("touchstart", touchDownM, false);
		canvas.addEventListener("touchmove", touchXYM, true);
	    canvas.addEventListener("touchend", touchUp, false);
	    document.body.addEventListener("touchcancel", touchUp, false);

        //Create floor
	    initFloor();
	    backgroundImage.src = "Sprites/Background.png";
        stoneBrick.src = "Sprites/StoneBrick.png";
        crackedBrick.src = "Sprites/CrackedBrick.png";
        mossyBrick.src = "Sprites/MossyBrick.png";

        //Create UI
        joystickImage.src = "Sprites/Slider.png";
        joystickLeft.src = "Sprites/SliderLeft.png";
        joystickRight.src = "Sprites/SliderRight.png";

        buttonImage.src = "Sprites/JumpButton.png";
        pauseImage.src = "Sprites/PauseButton.png";
        playImage.src = "Sprites/PlayButton.png";

        //Create random number for randomly generated floor
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
    //Set positions of floor tiles
    for(var col = 0; col < theFloorColumns; col++)
    {
        theFloor[col] = { x: (col * floorWidth), y: (canvas.height - floorWidth) };
        theFloorActive[col] = true;

    }
    theFloorX = (col * floorWidth);
    theFloorY = canvas.height - floorWidth;
}

function Move(){

    if (!gamePaused)
    {
        //Check if joystick is at max value
        if(joystickX > 110 && theFloor[theFloorColumns - 1].x > canvas.width)
        {
            //Lock joystick in max place and adjust necessary variables
            playerRight = true;
            joystickL = false;
            joystickR = true;
            for(var col = 0; col < theFloorColumns; col++)
            {
                theFloor[col].x += -(joystickX - 100) / 75 * 6;
            }
            //Animate player
            player.animate();
        }
        //Check if joystick is at min value
        else if(joystickX < 90 && theFloor[0].x < -5)
        {
            //Lock joystick in minimum place and adjust necessary variables
            playerRight = false;
            joystickR = false;
            joystickL = true;
            for(var col = 0; col < theFloorColumns; col++)
            {
                theFloor[col].x -= (joystickX - 100) / 75 * 6;
            }
            //Animate player
            player.animate();
        }
        else
        {
            //Adjust variables
            joystickL = false;
            joystickR = false;
        }
    }
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    //Play sound
    this.play = function(){
        this.sound.play();
    }
    //Stop sound
    this.stop = function(){
        this.sound.pause();
    }
}