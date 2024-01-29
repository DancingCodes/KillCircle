// 怪兽列表
let monsterList = []
// 怪兽尺寸
const monsterSize = 50

const generateMonstersTimer = setInterval(() => {
    if (monsterList.length >= 10) {
        return
    }
    // 设置随机X轴
    const randomX = Math.random() * (body.offsetWidth - monsterSize);
    // 生成怪兽
    const shell = document.createElement('div')
    shell.style.left = `${randomX}px`
    shell.style.height = `${monsterSize}px`
    shell.style.width = `${monsterSize}px`
    shell.className = 'monster'
    body.appendChild(shell)
    // 设置怪兽对象
    const monsterObj = {
        attackTimer: null,
        element: shell
    }
    // 发动攻击
    launchAttack(monsterObj)
    // 添加怪兽列表
    monsterList.push(monsterObj)

}, 500)

// 怪兽发动攻击
function launchAttack(monsterObj) {
    // 起始位置
    let monsterX = monsterObj.element.offsetLeft
    let monsterY = monsterObj.element.offsetTop
    // 角度
    const angle = getAngle(monsterX, monsterY)
    // 固定步长值
    const speed = 1
    // XY步长
    const xRate = Math.sin(angle * Math.PI / 180) * speed
    const yRate = Math.cos(angle * Math.PI / 180) * speed

    monsterObj.attackTimer = setInterval(() => {
        // 递增
        monsterX -= xRate;
        monsterY += yRate;
        monsterObj.element.style.left = `${monsterX}px`
        monsterObj.element.style.top = `${monsterY}px`
        // 杀死比赛
        killGame(monsterX, monsterX + monsterSize, monsterY, monsterY + monsterSize, monsterObj)
    }, 10);
}

// 杀死比赛
function killGame(left, right, top, bottom, monsterObj) {
    const emitterLeft = emitter.offsetLeft
    const emitterright = emitterLeft + emitter.offsetWidth
    const emitterTop = emitter.offsetTop
    const emitterBottom = emitterTop + emitter.offsetHeight
    if (right >= emitterLeft && left <= emitterright && bottom >= emitterTop) {
        clearInterval(generateMonstersTimer)
        clearInterval(monsterObj.attackTimer)
        alert('无了')
    }

}