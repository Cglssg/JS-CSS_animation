var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d');
var starMaxNum = 50

canvas.width = window.innerWidth
canvas.height = window.innerHeight / 2.5
    //定义星星数组
var starsArr = []

function Star(x, y) {
    //设置坐标
    this.x = x
    this.y = y;
    //星星移动
    this.directionX = 1;
    this.directionY = 1;

    //设置星星大小(半径)
    this.size = Math.random() * 2.5

    //设置星星颜色
    this.color = getColor()

    //星星透明度
    this.transparence = (canvas.height - this.y) / canvas.height
}

Star.prototype = {
    //绘制星星
    drawStar: function() {
        //注意，一定要加  beginPath()  ，否则每次所绘制的点属于同一个路径路径，执行fill是就会造成填充
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)

        ctx.fillStyle = this.color + ',' + (canvas.height - this.y) / canvas.height + ')'
        ctx.fill()
        ctx.closePath()
    },
    //更新星星坐标  
    updataStar: function() {
        this.x += this.directionX
        this.y += this.directionY
    }
}

//随机获取颜色
function getColor() {
    var red = Math.random() * 255 + 1;
    var blue = Math.random() * 255 + 1;
    var green = Math.random() * 255 + 1;
    return 'rgba(' + red + ',' + green + ',' + blue + '';
}

//只能生成在top和left生成星星，产生流星流星效果
function getStarPosition() {
    var x = Math.random() * canvas.width
    var y = Math.random() * canvas.height

    return { x, y }
}

//创建星星
function creatStars() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    switch (parseInt(Math.random() * 2 % 2)) {
        case 1:
            starsArr.push(new Star(x, 0))
            break;
        case 0:
            starsArr.push(new Star(0, y))
            break;
    }

}

//开始绘画
function draw() {
    if (starsArr.length < starMaxNum) {
        creatStars();
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)


    for (var i = 0; i < starsArr.length; i++) {
        if (starsArr[i].x < 0 || starsArr[i].x > canvas.width || starsArr[i].y < 0 || starsArr[i].y > canvas.height) {
            starsArr.splice(i, 1)
        }
        starsArr[i].updataStar()
        starsArr[i].drawStar()
    }
}

setInterval(() => {
    draw(), 1

})