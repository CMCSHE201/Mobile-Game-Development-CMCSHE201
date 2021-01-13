class Enemy{

    //Enemy constructor class
    constructor(){

        //Enemy postion variables
        this.position = {
            x:0,
            y:0
        };

        //Enemy dimension variables
        this.dimension = {
            width:50,
            height:50
        };

        //Enemy alive state
        this.alive = true;

        //Enemy Image variables
        this.enemyImage = new Image();

        this.enemyImage.src = "Sprites/Botty.png";
    }

    //Render enemy function
    render(leftX, topY, enemyImage){
        canvasContext.beginPath();
        canvasContext.drawImage(enemyImage, leftX, topY);
        canvasContext.closePath();
    }
}