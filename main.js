var canvas = document.getElementById('my_canvas');
var ctx = canvas.getContext('2d');
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

var color = '#000000';
var size = 10;
var mouse = {x: 0, y: 0};
var last_mouse = {x: 0, y: 0};
var line = false;
var isPencil = false;
var isDown = false;
var isLine = false;
var isRect = false;
var isRectfill = false;
var isCircle = false;
var isCirclefill = false;


document.getElementById('line').addEventListener('mousedown', function(e){
    reset();
    isLine = true;
});

document.getElementById('pencil').addEventListener('mousedown', function(e){
    reset();
    isPencil = true;
});

document.getElementById('rectangle').addEventListener('mousedown', function(e){
    reset();
    isRect = true;
});

document.getElementById('circle').addEventListener('mousedown', function(e){
    reset();
    isCircle = true;
});

document.getElementById('circlefill').addEventListener('mousedown', function(e){
    reset();
    isCirclefill = true;
});

document.getElementById('rectanglefill').addEventListener('mousedown', function(e){
    reset();
    isRectfill = true;
});

var mousePosition = canvas.addEventListener('mousemove', function(e) {
    if(isPencil){
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        freedraw();
    }else if (isLine || isRect || isCircle || isCirclefill || isRectfill) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
    }
}, false);

var lastPos = canvas.addEventListener('mousedown', function(e) {
    if(isLine ||isRect || isCircle || isCirclefill || isRectfill){
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;
    } else if (isPencil) {
        ctx.beginPath();
        ctx.moveTo(last_mouse.x, last_mouse.y);
    }
}, false);

var drawLine = canvas.addEventListener('mouseup', function() {
    ctx.lineWidth = size;
    ctx.strokeStyle = color;
    if(isLine){
        draw();
    }else if (isRect) {
        drawRect();
    }else if(isCircle){
        drawCircle();
    }else if(isCirclefill){
        drawCirclefill();
    }else if(isRectfill){
        drawRectfill();
    }
}, false);

function draw() {
    ctx.beginPath();
    ctx.moveTo(last_mouse.x, last_mouse.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
    ctx.closePath();
};

function freedraw(){
    ctx.beginPath();
    ctx.moveTo(last_mouse.x, last_mouse.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
    ctx.closePath();
}

function drawRect(){
    ctx.beginPath();
    ctx.strokeStyle = color;
    var width = last_mouse.x - mouse.x;
    var height = last_mouse.y - mouse.y;
    console.log(width);
    if(width < 0){
        width = Math.abs(width);
    }else if(height < 0){
        height = Math.abs(height);
    }
    ctx.strokeRect(mouse.x, mouse.y, width , height);
    ctx.stroke();

}

function drawCircle(){
    ctx.beginPath();
    var radius = mouse.x - last_mouse.x;
    if(radius < 0){
        radius = last_mouse.x - mouse.x;
    }
    ctx.arc(mouse.x, mouse.y, radius, mouse.x, last_mouse.x* Math.PI);
    ctx.stroke();
}

function drawCirclefill(){
    drawCircle();
    ctx.fillStyle = color;
    ctx.fill();
}

function drawRectfill(){
    ctx.beginPath();
    var width = last_mouse.x - mouse.x;
    var height = last_mouse.y - mouse.y;
    console.log(width);
    if(width < 0){
        width = Math.abs(width);
    }else if(height < 0){
        height = Math.abs(height);
    }
    ctx.fillStyle = color;
    ctx.fillRect(mouse.x, mouse.y, width, height);
    ctx.fill();
}

function changeColor(){
    color = document.getElementById('color').value;
}

function changeSize(){
    size = document.getElementById('stroke_size').value;
}


var save = document.getElementById('save');
save.addEventListener('click', function (e) {
    var dataURL = canvas.toDataURL('image/png');
    save.href = dataURL;
});

function erase(){
    color = "#FFFFFF";
}

function clear(a){
    a.getContext('2d').clearRect(0,0,a.width,a.height);
}

function reset(){
    isRect = false;
    isRectfill = false;
    isLine = false;
    isPencil = false;
    isCircle = false;
    isCirclefill = false;
};
