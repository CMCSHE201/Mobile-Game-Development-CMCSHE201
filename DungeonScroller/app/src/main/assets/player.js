class player{

    constructor(){

        this.position = {
            x = 0,
            y = 0
        };

        this.dimension = {
            radius = 40,
            width = 50,
            height = 50
        };

        this.movement = {
            jumping = false,
            falling = false
        };

        this.playerImage = new Image();
    }

    render(leftX, topY, playerImage, width, height){
        canvasContext.beginPath();
        canvasContext.fillRect(leftX, topY, width, height);
        canvasContext.drawImage(playerImage, leftX, topY);
        canvasContext.closePath();
    }

    collisionDetection(){

    }

    jump(){

    }

    movePlayer(){

    }
}