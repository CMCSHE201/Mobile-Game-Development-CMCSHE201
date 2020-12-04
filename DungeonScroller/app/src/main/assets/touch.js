function touchUp(evt) {
	evt.preventDefault();

	//console.log(ballY);
	//console.log(enemyY);

    joystickMove = false;

	// Terminate touch path
	lastPt=null;
	mouseIsDown = 0;

    ballDY = 0;
}

function touchDown(evt) {
	evt.preventDefault();
	mouseIsDown = 1;

    touchDownPos = { x: evt.touches[0].pageX, y: evt.touches[0].pageY };

    if(touchDownPos.x > (joystickX - joystickRadius) && touchDownPos.x < (joystickX + joystickRadius))
    {
        if (touchDownPos.y > 335 && touchDownPos.y < 375)
        {
            joystickMove = true;
        }
    }

    if(touchDownPos.x > (buttonX - buttonRadius) && touchDownPos.x < (buttonX + buttonRadius))
    {
        if (touchDownPos.y > (buttonY - buttonRadius) && touchDownPos.y < (buttonY + buttonRadius))
        {
            upwardVelocity = true;
        }
    }
    touchXY(evt);
}

function touchXY(evt) {
	evt.preventDefault();

	if(lastPt!=null) {
		var touchX = evt.touches[0].pageX - canvas.offsetLeft;
		var touchY = evt.touches[0].pageY - canvas.offsetTop;

		if(joystickMove)
		{
		    if(touchX < 25)
		    {
		        joystickX = 25;
		    }
		    else if(touchX > 175)
		    {
		        joystickX = 175;
		    }
		    else
		    {
		        joystickX = touchX;
		    }
		}
	}
	lastPt = {x:evt.touches[0].pageX, y:evt.touches[0].pageY};
}