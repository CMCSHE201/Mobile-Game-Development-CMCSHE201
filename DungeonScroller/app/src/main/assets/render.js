//Render the UI
function renderUI(leftX, topY, Image) {
    canvasContext.beginPath();
    canvasContext.drawImage(Image, leftX, topY);
    canvasContext.closePath();
}

//Main render function
function render() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    resizeCanvas();
    renderBackground();

    //If game is in playing state
    if(!introScreen && !gameOverScreen)
    {
        //Display player's score and lives
        styleText("red", '32px impact', 'left', 'middle');
        canvasContext.fillText("Score: " + theScore, 8, 20);
        canvasContext.fillText("Lives: " + lives, 8, 50);

        //Render pause or play button
        if(!gamePaused)
        {
            renderUI(pauseX, pauseY, pauseImage, 50, 50);
        }
        else
        {
            renderUI(pauseX, pauseY, playImage, 50, 50);
        }

        //Display remaining time
        styleText("red", '32px impact', 'center', 'middle');
        var timeLeft = 30 - timer;
        canvasContext.fillText("Time Left: " + timeLeft.toFixed(0), (canvas.width / 2), 20);

        //Lives reset
        if(lives > 3)
        {
            lives = 3;
        }

        renderFloor();

        //Checks if the player is moving right
        if(playerRight)
        {
            //Changes sprite depending on movement state
            if (!player.movementState.falling && !player.movementState.jumping)
            {
                player.render(player.position.x, player.position.y, player.playerImage[player.frame], player.dimension.width, player.dimension.height);
            }
            else if (player.movementState.jumping)
            {
                player.render(player.position.x, player.position.y, player.playerJumpImage, player.dimension.width, player.dimension.height);
            }
            else if (player.movementState.falling)
            {
                player.render(player.position.x, player.position.y, player.playerFallImage, player.dimension.width, player.dimension.height);
            }
        }
        else
        {
            //If the player is moving left then change sprite facing left
            if (!player.movementState.falling && !player.movementState.jumping)
            {
                player.render(player.position.x, player.position.y, player.playerImageLeft[player.frame], player.dimension.width, player.dimension.height);
            }
            else if (player.movementState.jumping)
            {
                player.render(player.position.x, player.position.y, player.playerJumpImageLeft, player.dimension.width, player.dimension.height);
            }
            else if (player.movementState.falling)
            {
                player.render(player.position.x, player.position.y, player.playerFallImageLeft, player.dimension.width, player.dimension.height);
            }
        }

        //Renders enemies if they are alive
        if(enemy.alive)
        {
            enemy.position.x = theFloor[enemyPos[0]].x;
            enemy.render(enemy.position.x, enemy.position.y, enemy.enemyImage, enemy.dimension.width, enemy.dimension.height);
        }

        if(enemy2.alive)
        {
            enemy2.position.x = theFloor[enemyPos[1]].x;
            enemy2.render(enemy2.position.x, enemy2.position.y, enemy2.enemyImage, enemy2.dimension.width, enemy2.dimension.height);
        }

        if(enemy3.alive)
        {
            enemy3.position.x = theFloor[enemyPos[2]].x;
            enemy3.render(enemy3.position.x, enemy3.position.y, enemy3.enemyImage, enemy3.dimension.width, enemy3.dimension.height);
        }

        //If all enemies are defeated
        if(!enemy.alive && !enemy2.alive && !enemy3.alive)
        {
            //Respawn enemies in new locations
            enemyPos[0] = Math.floor(Math.random() * (theFloorColumns - 40)) + 15;
            while(enemyPos[0] == oldEnemyPos[0] || enemyPos[0] == oldEnemyPos[1] || enemyPos[0] == oldEnemyPos[2])
            {
                enemyPos[0] = Math.floor(Math.random() * (theFloorColumns - 40)) + 15;
            }
            enemy.position.x = theFloor[enemyPos[0]];
            enemy.alive = true;

            enemyPos[1] = Math.floor(Math.random() * (theFloorColumns - 40)) + 15;
            while(enemyPos[1] == enemyPos[0] || enemyPos[1] == oldEnemyPos[0] || enemyPos[1] == oldEnemyPos[1] || enemyPos[1] == oldEnemyPos[2])
            {
                enemyPos[1] = Math.floor(Math.random() * (theFloorColumns - 40)) + 15;
            }
            enemy2.position.x = theFloor[enemyPos[1]];
            enemy2.alive = true;

            enemyPos[2] = Math.floor(Math.random() * (theFloorColumns - 40)) + 15;
            while(enemyPos[2] == enemyPos[0] || enemyPos[2] == enemyPos[1] || enemyPos[2] == oldEnemyPos[0] || enemyPos[2] == oldEnemyPos[1] || enemyPos[2] == oldEnemyPos[2])
            {
                enemyPos[2] = Math.floor(Math.random() * (theFloorColumns - 40)) + 15;
            }
            enemy3.position.x = theFloor[enemyPos[2]];
            enemy3.alive = true;
        }

        //Render joystick holder
        renderTile(25, canvas.height - 50, 150, 10, "white")

        //Set UI positions
        var joystickPosX = joystickX - 25;
        var joystickPosY = joystickY - 25;

        var buttonPosX = buttonX - 25;
        var buttonPosY = buttonY - 25;

        //Increments timer if game is not paused
        if(!gamePaused)
        {
            if(!mobile)
            {
                timer += (elapsed / 3);
            }
            else
            {
                timer += 0.025;
            }
        }

        //Renders all UI
        renderUI(buttonPosX, buttonPosY, buttonImage, 50, 50);

        if(!joystickL && !joystickR)
        {
            renderUI(joystickPosX, joystickPosY, joystickImage, 50, 50);
        }
        else if(joystickL)
        {
            renderUI(joystickPosX, joystickPosY, joystickLeft, 50, 50);
        }
        else
        {
            renderUI(joystickPosX, joystickPosY, joystickRight, 50, 50);
        }

        //Checks if the game is paused
        if(!gamePaused)
        {
            //Moves the player
            player.movement();

            //Checks for collision between player and enemies
            if (enemy.alive)
            {
                player.enemyCollisionDetection(enemy);
            }
            if (enemy2.alive)
            {
                player.enemyCollisionDetection(enemy2);
            }
            if (enemy3.alive)
            {
                player.enemyCollisionDetection(enemy3);
            }
        }

        //Checks if time has run out
        if(timer >= 30)
        {
            //Changes game state
            gameOverScreen = true;
            timer = 0;
        }

        //Moves player
        Move();
    }
    else if(introScreen)
    {
        //Displays all information needed for intro screen
        styleText("blue", '32px impact', 'center', 'middle');
        canvasContext.fillText("Dungeon Runner", (canvas.width / 2), (canvas.height / 2 - 50));
        canvasContext.fillText("Click on screen to play.", (canvas.width / 2), (canvas.height / 2));
        styleText("red", '32px impact', 'center', 'middle');
        canvasContext.fillText("Destroy enemies by jumping on them.", (canvas.width / 2), (canvas.height / 2 + 100));
        canvasContext.fillText("Get highest score before running out of time.", (canvas.width / 2), (canvas.height / 2 + 150));

        styleText("red", '24px impact', 'center', 'middle');
        canvasContext.fillText("Use Slider to move player.", (canvas.width / 4), 20);
        renderUI(((canvas.width / 4) - 25), 40, joystickImage, 50, 50);
        canvasContext.fillText("Use Button to jump.", ((canvas.width / 4) * 3), 20);
        renderUI((((canvas.width / 4) * 3)- 25), 40, buttonImage, 50, 50);
    }
    else
    {
        //Display all information needed for end game screens
        styleText("blue", '32px impact', 'center', 'middle');
        canvasContext.fillText("Game Over", (canvas.width / 2), (canvas.height / 2 - 50));
        canvasContext.fillText("Score: " + theScore, (canvas.width / 2), (canvas.height / 2));
        canvasContext.fillText("Click on screen to play again.", (canvas.width / 2), (canvas.height / 2 + 50));
    }
    requestAnimationFrame(render);
}

//Renders the background
function renderBackground() {
    canvasContext.beginPath();
    canvasContext.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    canvasContext.closePath();
}

//Renders the floor
function renderFloor() {
    for(var col = 0; col < theFloorColumns; col++)
    {
        theFloorX = theFloor[col].x;
        theFloorY = canvas.height - floorHeight;
        if(theFloorActive[col])
        {
            renderTile(theFloorX, theFloorY, floorWidth, floorHeight, "Black");

            //Renders the floor tile based in the randomly generated choice of image
            switch(imageChoice[col]) {
            case 0:
                canvasContext.drawImage(stoneBrick, theFloorX, theFloorY);
                break;
            case 1:
                canvasContext.drawImage(crackedBrick, theFloorX, theFloorY);
                break;
            case 2:
                canvasContext.drawImage(mossyBrick, theFloorX, theFloorY);
                break;
            default:
                canvasContext.drawImage(stoneBrick, theFloorX, theFloorY);
                break;
            }
        }
    }
}

//Renders tiles
function renderTile(leftX, topY, width, height, drawColor) {
    canvasContext.beginPath();
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
    canvasContext.closePath();
}

//Stylises text
function styleText(txtColour, txtFont, txtAlign, txtBaseline) {
    canvasContext.fillStyle = txtColour;
    canvasContext.font = txtFont;
    canvasContext.textAlign = txtAlign;
    canvasContext.textBaseline = txtBaseline;
}