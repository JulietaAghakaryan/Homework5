const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const rand = function(num) {
  return Math.floor(Math.random() * num) + 1;};

const colorArray = ['#7FFF00', '#FF7F50', '#00008B', '#FF00FF', '#FFD700'];
const arrayPoints = [];

const createPoints = function(count, canvasWidth, canvasHeight) {
  if (count === 0) {
    return arrayPoints; }
  const points = {
    x: rand(canvasWidth-50),
    y: rand(canvasHeight-40),
    width: 50,
    height: 40,
    xDelta: 2,
    yDelta: 2,
    color: colorArray[rand(colorArray.length)]};

  arrayPoints[arrayPoints.length] = points;
  createPoints(count-1, canvasWidth, canvasHeight);};

createPoints(20, canvas.width, canvas.height);

  const draw = function() {
     context.clearRect(0, 0, canvas.width, canvas.height);
        const helper = function(arr, index) {
          if(index === arrayPoints.length) {
             return;}
    context.fillStyle = arrayPoints[index].color;
    context.fillRect(arrayPoints[index].x, arrayPoints[index].y, arrayPoints[index].width, arrayPoints[index].height);
    helper(arr, index+1);};
  helper(arrayPoints, 0);};

const updateData = function() {
  const helper = function(arr, index) {
    if(index === arrayPoints.length) {
      return; }
    arrayPoints[index].x += arrayPoints[index].xDelta;
    arrayPoints[index].y += arrayPoints[index].yDelta;
    if(arrayPoints[index].x >= canvas.width-arrayPoints[index].width || arrayPoints[index].x <= 0) {
      arrayPoints[index].xDelta = -arrayPoints[index].xDelta;
      arrayPoints[index].color = colorArray[rand(colorArray.length)]; }
    if(arrayPoints[index].y >= canvas.height-arrayPoints[index].height || arrayPoints[index].y <= 0) {
      arrayPoints[index].yDelta = -arrayPoints[index].yDelta;
      arrayPoints[index].color = colorArray[rand(colorArray.length)];}
    helper(arr, index+1); };
  helper(arrayPoints, 0);};

const loop = function() {
  draw();
  updateData();
requestAnimationFrame(loop);};

loop();