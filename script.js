
// this is the height both rects will add up to
var totalRectHeight;
// the height of our top rectangle
var topRectHeight;
// the height of our bottom rectangle
var bottomRectHeight;
// the current time in minutes
var currentMinute;
// the current time in seconds
var currentSecond;

// for our droplet, the y value
var dropY = 0;
// a flag for when we are animating the droplet
var dropping = false;

function setup() {
  // make the canvas fullscreen
  createCanvas(windowWidth, windowHeight);
  // background is white
  background(255);
}

function draw() {

  // `clear()` resets the frame so we can redraw
  // http://p5js.org/reference/#/p5/clear
  clear();

  // get the minute and second component of the current time
  // http://p5js.org/reference/#/p5/minute
  // http://p5js.org/reference/#/p5/second
  currentMinute = minute();
  currentSecond = second();

  /**
   * Draw Recangles
   */

  // the total height for both rectangles added up is half the total
  // canvas height
  totalRectHeight = height/2;

  // set the height of the bottm rectangle by mapping the total number of
  // minutes (60) to the total possible height of the rectangle (`totalRectHeight`)
  // so 3 seconds will be 3/60 * totalRectHeight
  // http://p5js.org/reference/#/p5/map
  bottomRectHeight = map(currentMinute, 0, 60, 0, totalRectHeight);
  // we'll just use the remaining height by subtracting bottomRectHeight
  // from our total for the top height
  topRectHeight = totalRectHeight - bottomRectHeight;

  // set our fill color
  fill(0, 0, 255);
  // no outline
  noStroke();

  // draw top rect
  // http://p5js.org/reference/#/p5/rect
  rect(0, 0, width, topRectHeight);
  // draw bottom rect
  rect(0, height-bottomRectHeight, width, bottomRectHeight);

  /**
   * Draw Drop
   */

  // we're going to start our drop on the 59th second, and keep animating
  // it so long as `dropping` is positive (remember `||` is "OR" )
  if(dropping || currentSecond === 59) {

    // set a flag to indicate that we're animating the drop
    dropping = true;

    // with every draw cycle we'll add 10 to the drop y value
    dropY = dropY + 10;

    // call our `drawDrop` function (below)
    drawDrop(width/2, dropY, width/25);

    // once the drop is past the bottom (y is greater than canvas height)
    // then we reset everything
    if(dropY > height) {
      dropping = false;
      dropY = 0;
    }

  }
  // draw a simple time display to keep track
  drawTime();

}


/**
 * This will draw our droplet given an x, y, and radius
 */
function drawDrop(x,y,r) {

  // draw a circle
  // http://p5js.org/reference/#/p5/ellipse
  ellipse(x, y, r*2, r*2);

  // draw a polygon to create the triangle
  // at the top of the drop
  // http://p5js.org/reference/#/p5/beginShape
  // http://p5js.org/reference/#/p5/vertex
  beginShape();
    // start at the middle-left of the circle
    vertex(x-r, y);
    // next to the "peak" at the center of the circle and above
    vertex(x, y-3*r);
    // finish the shape to the middle-right of the circle
    vertex(x+r, y);
  endShape(CLOSE);
}



/**
 * This will draw a simple timecode so we can keep track of the time
 */
function drawTime() {

  // `push()` and `pop()` let us save and restore current draw style settings
  // like `fill`, `stroke`, etc.
  // http://p5js.org/reference/#/p5/push
  // http://p5js.org/reference/#/p5/pop
  push();
    textSize(20)
    fill(255);
    text(hour()+":"+minute()+":"+second(), 50, height-10);
  pop();
}

