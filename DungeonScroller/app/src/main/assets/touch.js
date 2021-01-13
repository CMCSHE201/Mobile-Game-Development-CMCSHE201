//Runs when the player finishes touch
function touchUp(evt) {
	evt.preventDefault();

    //Sets the joystick to not moving
    joystickMove = false;

	// Terminate touch path
	lastPt=null;
	mouseIsDown = 0;

}

//Runs when the player commences touch
function touchDown(evt) {
	evt.preventDefault();
	mouseIsDown = 1;
	mobile = false;
	//Checks if game is running
	if(!introScreen && !gameOverScreen)
	{
	    //Records position of touch
	    touchDownPos = { x: evt.clientX, y: evt.clientY};

        //Checks if game is paused
        if(!gamePaused)
        {
            //Checks if touch is on joystick
            if(touchDownPos.x > (joystickX - joystickRadius) && touchDownPos.x < (joystickX + joystickRadius))
            {
                if (touchDownPos.y > (joystickY - joystickRadius) && touchDownPos.y < (joystickY + joystickRadius))
                {
                    joystickMove = true;
                }
            }

            //Checks if touch is on jump button
            if(touchDownPos.x > (buttonX - buttonRadius) && touchDownPos.x < (buttonX + buttonRadius))
            {
                if (touchDownPos.y > (buttonY - buttonRadius) && touchDownPos.y < (buttonY + buttonRadius))
                {
                    if(!player.movementState.jumping || !player.movementState.falling)
                    {
                        player.movementState.jumping = true;
                    }
                }
            }

            //Checks if touch is on pause button
            if(touchDownPos.x > (pauseX - 25) && touchDownPos.x < (pauseX + 25))
            {
                if (touchDownPos.y > 5 && touchDownPos.y < 55)
                {
                    gamePaused = true;
                }
            }

        }
        else
        {
            //Checks if touch is on play button
            if(touchDownPos.x > (pauseX - 25) && touchDownPos.x < (pauseX + 25))
            {
                if (touchDownPos.y > 5 && touchDownPos.y < 55)
                {
                    gamePaused = false;
                }
            }
        }
        touchXY(evt);
	}
	else if(introScreen)
	{
	    //If game is in intro screen then play game
	    introScreen = false;
	}
	else
	{
	    //If game is in end screen return to intro screen and reset all variables
	    gameOverScreen = false;
	    introScreen = true;

	    theScore = 0;
	    lives = 4;
	    joystickX = 100;
	    joystickMaxR = false;
	    joystickMaxL = false;
	}
}

function touchDownM(evt) {
	evt.preventDefault();
	mouseIsDown = 1;
	mobile = true;
	//Checks if game is running
	if(!introScreen && !gameOverScreen)
	{
	    //Records position of touch
	    touchDownPos = { x: evt.touches[0].pageX, y: evt.touches[0].pageY};

        //Checks if game is paused
        if(!gamePaused)
        {
            //Checks if touch is on joystick
            if(touchDownPos.x > (joystickX - joystickRadius) && touchDownPos.x < (joystickX + joystickRadius))
            {
                if (touchDownPos.y > (joystickY - joystickRadius) && touchDownPos.y < (joystickY + joystickRadius))
                {
                    joystickMove = true;
                }
            }

            //Checks if touch is on jump button
            if(touchDownPos.x > (buttonX - buttonRadius) && touchDownPos.x < (buttonX + buttonRadius))
            {
                if (touchDownPos.y > (buttonY - buttonRadius) && touchDownPos.y < (buttonY + buttonRadius))
                {
                    if(!player.movementState.jumping || !player.movementState.falling)
                    {
                        player.movementState.jumping = true;
                    }
                }
            }

            //Checks if touch is on pause button
            if(touchDownPos.x > (pauseX - 25) && touchDownPos.x < (pauseX + 25))
            {
                if (touchDownPos.y > 5 && touchDownPos.y < 55)
                {
                    gamePaused = true;
                }
            }

        }
        else
        {
            //Checks if touch is on play button
            if(touchDownPos.x > (pauseX - 25) && touchDownPos.x < (pauseX + 25))
            {
                if (touchDownPos.y > 5 && touchDownPos.y < 55)
                {
                    gamePaused = false;
                }
            }
        }
        touchXY(evt);
	}
	else if(introScreen)
	{
	    //If game is in intro screen then play game
	    introScreen = false;
	}
	else
	{
	    //If game is in end screen return to intro screen and reset all variables
	    gameOverScreen = false;
	    introScreen = true;

	    theScore = 0;
	    lives = 4;
	    joystickX = 100;
	    joystickMaxR = false;
	    joystickMaxL = false;
	}
}

//Runs if players touch is in motion
function touchXY(evt) {
	evt.preventDefault();

	if(lastPt!=null) {

        var touchX = evt.clientX - canvas.offsetLeft;
        var touchY = evt.clientY - canvas.offsetTop;

        //Checks if player is moving joystick
		if(joystickMove)
		{
		    //checks if touch is past min or max joystick values
		    if(touchX < 25)
		    {
		        joystickX = 25;
		        joystickMaxL = true;
		    }
		    else if(touchX > 175)
		    {
		        joystickX = 175;
		        joystickMaxR = true;
		    }
		    else
		    {
		        //Moves joystick to the players touch
		        joystickX = touchX;
		        joystickMaxL = false;
		        joystickMaxR = false;
		    }
		}
	}
	//Records last touch point
	lastPt = {x:evt.clientX, y:evt.clientY};
}

function touchXYM(evt) {
	evt.preventDefault();

	if(lastPt!=null) {

	    var touchX = evt.touches[0].pageX - canvas.offsetLeft;
        var touchY = evt.touches[0].pageY - canvas.offsetTop;

        //Checks if player is moving joystick
		if(joystickMove)
		{
		    //checks if touch is past min or max joystick values
		    if(touchX < 25)
		    {
		        joystickX = 25;
		        joystickMaxL = true;
		    }
		    else if(touchX > 175)
		    {
		        joystickX = 175;
		        joystickMaxR = true;
		    }
		    else
		    {
		        //Moves joystick to the players touch
		        joystickX = touchX;
		        joystickMaxL = false;
		        joystickMaxR = false;
		    }
		}
	}
	//Records last touch point
	lastPt = {x:evt.touches[0].pageX, y:evt.touches[0].pageY};
}