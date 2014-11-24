function TouchPad()
{
    this.touchable = 'createTouch' in document;

    this.start = function(){
        alert("Touchable:" + this.touchable);
        if (this.touchable) {
            this.intID = setInterval(localUpdate, 50);
            document.onmousemove = this.updateMousePos;
        }
    }

}

function Joy(){
    //virtual joystick for ipad
    //console.log("joystick created");
    //when activated, document will have the following properties
    //mouseX, mouseY: touch read as mouse input
    //diffX, diffY: touch motion read as a joystick input
    //if virtKeys is set true
    //joystick inputs will be read as arrow keys

    //properties
    SENSITIVITY = 50;
    diffX = 0;
    diffY = 0;
    var touches = [];
    var startX;
    var startY;

    //define event handlers
    this.onTouchStart = function(event){
        result = "touch: ";
        touches = event.touches;
        startX = touches[0].screenX;
        startY = touches[0].screenY;
        result += "x: " + startX + ", y: " + startY;
        //define mouse position based on touch position
        this.mouseX = startX;
        this.mouseY = startY;
        //console.log(result);
    } // end onTouchStart

    this.onTouchMove = function(event){
        result = "move: "
        event.preventDefault();
        touches = event.touches;
        //map touch position to mouse position
        this.mouseX = touches[0].screenX;
        this.mouseY = touches[0].screenY;
        this.diffX = touches[0].screenX - startX;
        this.diffY = touches[0].screenY - startY;
        result += "dx: " + this.diffX + ", dy: " + this.diffY;


        /*
        //manage virtual keys if enabled
        if (virtKeys){
            THRESHHOLD = 10;
            if (this.diffX > THRESHHOLD){
                keysDown[K_RIGHT] = true;
            } else {
                keysDown[K_RIGHT] = false;
            } // end if

            if (this.diffX < -THRESHHOLD){
                keysDown[K_LEFT] = true;
            } else {
                keysDown[K_LEFT] = false;
            } // end if

            if (this.diffY > THRESHHOLD){
                keysDown[K_DOWN] = true;
            } else {
                keysDown[K_DOWN] = false;
            } // end if

            if (this.diffY < -THRESHHOLD){
                keysDown[K_UP] = true;
            } else {
                keysDown[K_UP] = false;
            } // end if

        } // end if
        */
    } // end onTouchMove

    this.onTouchEnd = function(event){
        result = "no touch";
        touches = event.touches;
        this.diffX = 0;
        this.diffY = 0;

        /*
        //turn off all virtual keys
        if (virtKeys){
            keysDown[K_LEFT] = false;
            keysDown[K_RIGHT] = false;
            keysDown[K_UP] = false;
            keysDown[K_DOWN] = false;
        }
        */
    } // end onTouchEnd

    // add utility methods to retrieve various attributes
    this.getDiffX = function(){
        //compensate for possible null
        if (document.diffX == null){
            document.diffX = 0;
        } // end if
        return document.diffX;
    }
    this.getDiffY = function(){
        //compensate for possible null
        if (document.diffY == null){
            document.diffY = 0;
        } // end if
        return document.diffY;
    }

    this.getMouseX = function(){return document.mouseX;}
    this.getMouseY = function(){return document.mouseY;}

    //add event handlers if appropriate
    touchable = 'createTouch' in document;
    if (touchable){
        document.addEventListener('touchstart', this.onTouchStart, false);
        document.addEventListener('touchmove', this.onTouchMove, false);
        document.addEventListener('touchend', this.onTouchEnd, false);
    } // end if

} // end joy class def


function localUpdate(){
    update();
}
