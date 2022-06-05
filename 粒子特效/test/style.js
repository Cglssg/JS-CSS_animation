var canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
    //获取上下文绘图环境
var ctx = canvas.getContext("2d")
    //设置粒子数组
var particlesArray = []
    //根据网页大小限制生成粒子数量
var count = parseInt(canvas.height / 100 * canvas.width / 100)
    //设置粒子类
class Particle {
    //类构造器
    constructor(x, y) {
        //粒子坐标
        this.x = x
        this.y = y
            //随机设定粒子移动方向
        this.directionY = 0.5 - Math.random()
        this.directionX = 0.5 - Math.random()
    }
    update() {
        //更新粒子状态，进行渲染
        this.y += this.directionY
        this.x += this.directionX
    }
    draw() {
        //开始绘画粒子
        ctx.beginPath()
            //绘制粒子
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2) //圆心 x，y，半径为2，起始角0，终止角360（画出一个半径为2像素的点）
        ctx.fillStyle = "white"
            //填充圆（点）
        ctx.fill()
    }
}
//创建粒子
function createParticle() {
    //随机坐标生成粒子，并加入粒子数组
    var x = Math.random() * canvas.width
    var y = Math.random() * canvas.height
    particlesArray.push(new Particle(x, y))
}

function handleParticle() {
    for (var i = 0; i < particlesArray.length; i++) {
        var particle = particlesArray[i]
            //渲染当前粒子，更新方向并且绘画出移动后的位置，自解类似帧动画
        particle.update()
        particle.draw()
            //如果粒子超出屏幕范围就删除粒子
        if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
            //从下标为i的元素开始，删除一个元素，即删除i粒子
            particlesArray.splice(i, 1)
        }
        //绘制粒子连线
        for (var j = i; j < particlesArray.length; j++) {
            dx = particlesArray[i].x - particlesArray[j].x
            dy = particlesArray[i].y - particlesArray[j].y
                //两个粒子间的长度
            long = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
                //如果两粒子之间的距离小于100px，则绘制连线
            if (long < 100) {
                ctx.beginPath()
                ctx.strokeStyle = "rgba(255,255,255," + (1 - long / 200) + ")" //根据距离自动处理透明度
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
                ctx.lineWidth = 1
                ctx.stroke()
            }
        }
    }
}

function draw() {
    //清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)
        //当前粒子数量小于指定数量cout则继续绘画
    if (particlesArray.length < count) {
        createParticle()
    }
    handleParticle()
}
setInterval(() => {
    draw(), 1
})