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
    } // end onTouchMove

    this.onTouchEnd = function(event){
        result = "no touch";
        touches = event.touches;
        this.diffX = 0;
        this.diffY = 0;
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
