function renderBall(centerX, centerY, radius, drawColor) {
    canvasContext.beginPath();
    canvasContext.fillStyle = drawColor;
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
    canvasContext.closePath();
}

function render() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    renderFloor();

    enemyX = theFloor[20].x;

    //renderPlayer(playerX, playerY, playerWidth, playerHeight, "green");

    renderBall(ballX, ballY, ballRadius, "blue");
    renderTile(25, 350, 150, 10, "grey");
    renderBall(joystickX, joystickY, joystickRadius, "black");
    renderBall(buttonX, buttonY, buttonRadius, "black");

    if(enemyAlive)
    {
        renderTile(enemyX, enemyY, 75, 75, "black");
    }

    if(ballY < 0)
    {
        ballY = 0;
    }
    else if(ballY + ballRadius > canvas.height)
    {
        ballY = canvas.height - ballRadius;
        falling = false;
    }

    if(upwardVelocity)
    {
        if(ballY < 100)
        {
            upwardVelocity = false;
            falling = true;
        }
        ballY -= 10;
    }

    if(ballX > enemyX && ballX < enemyX + 75)
    {
        if(falling && ballY > 250)
        {
            enemyAlive = false;
        }
    }

    if(ballY + ballRadius < (canvas.height - floorHeight) && !upwardVelocity)
    {
        ballY += 15;
    }

    MoveBall();

    requestAnimationFrame(render);
}

function renderFloor() {
    for(var col = 0; col < theFloorColumns; col++)
    {
        theFloorX = theFloor[col].x;
        theFloorY = 362;

        renderTile(theFloorX, theFloorY, floorWidth, floorHeight, "Black");

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

function renderPlayer(leftX, topY, width, height, drawColor) {

    canvasContext.beginPath();
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
    canvasContext.drawImage(playerImage, leftX, topY);
    canvasContext.closePath(); 
    
}

function renderTile(leftX, topY, width, height, drawColor) {
    canvasContext.beginPath();
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
    canvasContext.closePath();
}

{/*function spriteDefine(x, y, imageSRC, velx, vely) {
    this.zindex = 0;
    this.x = x;
    this.y = y;
    this.vx = velx;
    this.vy = vely;
    this.sImage = new Image();
    this.sImage.src = imageSRC;
}
spriteDefine.prototype.renderF = function(width, height)
{
    canvasContext.drawImage(this.sImage, this.x, this.y, width, height);
}
spriteDefine.prototype.render = function()
{
    canvasContext.drawImage(this.sImage, this.x, this.y);
}
spriteDefine.prototype.update = function(deltaTime)
{
    this.x += deltaTime * this.vx;
    this.y += deltaTime * this.vy;
}*/}