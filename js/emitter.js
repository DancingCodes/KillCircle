// 炮管移动角度
body.addEventListener('mousemove', (e) => {
    emitter.style.transform = ` rotateZ(${getAngle(e.pageX, e.pageY)}deg)`
})

// 发射炮弹
body.addEventListener('click', (e) => {
    fireShells(getAngle(e.pageX, e.pageY))
})

// 炮弹发射
function fireShells(angle) {
    // 填充
    const shell = document.createElement('div')
    shell.className = 'shell'
    body.appendChild(shell)
    // 减去炮管宽度
    let shellX = emitterData.x - artilleryData.width / 2
    let shellY = emitterData.y - artilleryData.width / 2
    // 增加击中判定
    shellHitDetermine(shell)
    // 固定步长值
    const speed = 8
    // 炮弹尺寸
    const shellSize = 20
    shell.style.width = `${shellSize}px`
    shell.style.height = `${shellSize}px`
    // XY步长
    const xRate = Math.sin(angle * Math.PI / 180) * speed
    const yRate = Math.cos(angle * Math.PI / 180) * speed
    // 设置默认位置
    shell.style.left = `${shellX}px`
    shell.style.top = `${shellY}px`

    // 发射
    const fireTimer = setInterval(() => {
        // 递增
        shellX += xRate;
        shellY -= yRate;
        shell.style.left = `${shellX}px`
        shell.style.top = `${shellY}px`
        // 击中判定
        shellHitDetermine(shellX, shellX + shellSize, shellY, shellY + shellSize)
        // 撞墙消失
        if ((shellX <= 0 || shellX >= body.offsetWidth - 10) || (shellY <= 0)) {
            clearInterval(fireTimer)
            shell.remove()
        }
    }, 10)
}

// 炮弹击中判定
function shellHitDetermine(left, right, top, bottom) {
    for (let i = 0; i < monsterList.length; i++) {
        const monsterLeft = monsterList[i].element.offsetLeft
        const monsterRight = monsterList[i].element.offsetWidth + monsterLeft
        const monsterTop = monsterList[i].element.offsetTop
        const monsterBottom = monsterList[i].element.offsetHeight + monsterTop
        if (right >= monsterLeft && left <= monsterRight && top <= monsterBottom) {
            monsterList[i].element.remove()
            clearInterval(monsterList[i].attackTimer)
            monsterList.splice(i, 1)
        }
    }
}