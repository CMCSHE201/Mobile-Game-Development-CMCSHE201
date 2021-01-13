class Player{

    //Constructor player class
    constructor(){

        //Position variables
        this.position = {
            x:(canvas.width * 0.4),
            y:(canvas.height / 2)
        };

        //Dimension variables
        this.dimension = {
            width:50,
            height:100
        };

        //movement state variables
        this.movementState = {
            jumping:false,
            falling:false
        };

        //Player images
        this.playerImage = [];
        this.playerFallImage = new Image();
        this.playerJumpImage = new Image();

        this.playerImageLeft = [];
        this.playerFallImageLeft = new Image();
        this.playerJumpImageLeft = new Image();

        for(var i = 0; i < 4; i++)
        {
            this.playerImage[i] = new Image();
            this.playerImageLeft[i] = new Image();
        }

        this.playerImage[0].src = "Sprites/BillyAnim/BillyStep1.png";
        this.playerImage[1].src = "Sprites/BillyAnim/BillyStep2.png";
        this.playerImage[2].src = "Sprites/BillyAnim/BillyStep3.png";
        this.playerImage[3].src = "Sprites/BillyAnim/BillyStep4.png";
        this.playerImageLeft[0].src = "Sprites/BillyAnim/BillyLStep1.png";
        this.playerImageLeft[1].src = "Sprites/BillyAnim/BillyLStep2.png";
        this.playerImageLeft[2].src = "Sprites/BillyAnim/BillyLStep3.png";
        this.playerImageLeft[3].src = "Sprites/BillyAnim/BillyLStep4.png";

        this.playerFallImage.src = "Sprites/BillyFall.png";
        this.playerJumpImage.src = "Sprites/BillyJump.png";
        this.playerFallImageLeft.src = "Sprites/BillyFallLeft.png";
        this.playerJumpImageLeft.src = "Sprites/BillyJumpLeft.png";

        //Player animation variables
        this.frameTimer = 0.05;
        this.frameTimeMax = 0.017;
        this.frame = 0;
    }

    //Render function for player
    render(leftX, topY, playerImage){
        canvasContext.beginPath();
        canvasContext.drawImage(playerImage, leftX, topY);
        canvasContext.closePath();
    }

    //Moves player
    movement(){
        //Checks if player is at top of screen
        if(player.position.y < 0)
        {
            player.position.y = 0;
        }
        else if(player.position.y + player.dimension.height >= canvas.height - floorHeight)
        {
            //Sets player position to floor level
            player.position.y = canvas.height - player.dimension.height - floorHeight;
            player.movementState.falling = false;
        }

        //Checks if the player is jumping
        if(player.movementState.jumping)
        {
            if(!mobile)
            {
                //Checks if player has reached peak of jump
                if(player.position.y < (canvas.height / 2))
                {
                    //Sets players state to falling
                    player.movementState.jumping = false;
                    player.movementState.falling = true;
                }
            }
            else
            {
                //Checks if player has reached peak of jump
                if(player.position.y < 100)
                {
                    //Sets players state to falling
                    player.movementState.jumping = false;
                    player.movementState.falling = true;
                }
            }
            //Player jumping velocity
            player.position.y -= 10;
        }

        //Affect player with gravity if possible
        if(player.position.y + player.dimension.height < (canvas.height - floorHeight) && !player.movementState.jumping)
        {
            player.position.y += 15;
        }
    }

    //Checks collision between enemy and player
    enemyCollisionDetection(enemyObject){
        var xDistance = (enemyObject.position.x - this.position.x);
        var yDistance = (enemyObject.position.y - this.position.y);

        if(xDistance < 0)
        {
            if((xDistance * -1) < enemyObject.dimension.width && yDistance < this.dimension.height)
            {
                //Checks if player is falling as they can only destroy enemy when doing so
                if(this.movementState.falling)
                {
                    //Destroys enemy
                    enemyObject.alive = false;
                    //Adds to score
                    theScore += 100;
                    //Plays enemy death sound
                    robotDeath.play();
                }
                else
                {
                    //Reduces lives if player is hit by enemy instead
                    lives--;

                    //player death sound plays and game is ended if player runs out of lives
                    if(lives == 0)
                    {
                        playerDeath.play();
                        gameOverScreen = true;
                    }
                    else if(lives == 3)
                    {
                        initFloor();
                    }
                    else
                    {
                        //If player has lives left then reset player and play player hit sound
                        playerHit.play();
                        initFloor();
                    }
                }
            }
        }
        else
        {
            if(xDistance < this.dimension.width && yDistance < this.dimension.height)
             {
                if(this.movementState.falling)
                {
                    enemyObject.alive = false;
                    theScore += 100;
                    robotDeath.play();
                }
                else
                {
                    lives--;
                    if(lives == 0)
                    {
                        playerDeath.play();
                        gameOverScreen = true;
                    }
                    else if(lives == 3)
                    {
                        initFloor();
                    }
                    else
                    {
                        playerHit.play();
                        initFloor();
                    }
                }
             }
        }

    }

    //Animate player
    animate()
    {
        this.frameTimer = this.frameTimer - elapsed;
        if(this.frameTimer <= 0)
        {
            this.frameTimer = this.frameTimeMax;
            this.frame++;
            if(this.frame > 3)
            {
                this.frame = 0;
            }
        }
    }
}