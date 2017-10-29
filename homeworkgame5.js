const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const backgroundImage = new Image();
backgroundImage.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxTS_1vXphF-oeeCu_rFzBNm3HfGM_3qlXLg78G48GFdShWcW3kQ';

const bloom = new Image();
bloom.src = 'http://vignette4.wikia.nocookie.net/magical-girl-mahou-shoujo/images/6/60/Winx_Club_Bloom_Magic_Winx_pose15.png/revision/latest?cb=20140521170558';

const ice = new Image();
ice.src = 'https://vignette.wikia.nocookie.net/winx/images/1/18/Icy_Dark_Witch.png/revision/latest?cb=20150714152622';

const rand = function(num) {
  return Math.floor(Math.random() * num) + 1;};

const badGuys = [];

const createPoints = function(count, canvasWidth, canvasHeight) {
  if (count === 0) {
    return badGuys; }

  const points = {
    image: ice,
    x: rand(canvasWidth-250),
    y: rand(canvasHeight-50),
    width: 250,
    height: 250,
    xDelta: 1,
    yDelta: 1, };

  badGuys[badGuys.length] = points;
  createPoints(count-1, canvasWidth, canvasHeight);};

createPoints(7, canvas.width, canvas.height);


const floor = canvas.height-300;
const maxJump = floor-200;
const blo = {
    image: bloom,
    x: 10,
    y: floor,
    width: 200,
    height: 250,
    xDelta: 15,
    yDelta: 0};


const draw = function() {
  context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  context.drawImage(blo.image, blo.x, blo.y, blo.width, blo.height);

  const helper = function(arr, index) {
    if(index === badGuys.length) {
      return;}
    context.drawImage(badGuys[index].image, badGuys[index].x, badGuys[index].y, badGuys[index].width, badGuys[index].height);
    helper(arr, index+1);};
  helper(badGuys, 0);};


const updateData = function() {
  if (blo.yDelta !== 0) {
    blo.y = blo.y - blo.yDelta;
    if (blo.y < maxJump) {
      blo.yDelta = -blo.yDelta;} 
    else if (blo.y >= floor) {
      blo.y = floor,
      blo.yDelta = 0;}}

  const helper = function(arr, index) {
    if(index === badGuys.length) {
      return;}
    badGuys[index].x += badGuys[index].xDelta;
    badGuys[index].y += badGuys[index].yDelta;
    if(badGuys[index].x >= canvas.width-badGuys[index].width || badGuys[index].x <= 0) {
      badGuys[index].xDelta = -badGuys[index].xDelta; }
 
    helper(arr, index+1) };
  helper(badGuys, 0);};

const loop = function() {
  draw();
  updateData();

  requestAnimationFrame(loop);};

loop();

const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;

document.addEventListener('keydown', function(event) {
	if(event.keyCode === rightKey) {
    blo.x = blo.x + blo.xDelta;
    if (blo.x >= canvas.width) {
      blo.x = -blo.width;}
  } else if (event.keyCode === leftKey) {
    blo.x = blo.x - blo.xDelta;
    if (blo.x <= -blo.width) {
      blo.x = canvas.width;}
  } else if (event.keyCode === upKey) {
    if (blo.yDelta === 0) {
      
      blo.yDelta = 5; }
  }
}, false);