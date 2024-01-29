const body = document.body
const emitter = document.querySelector('.emitter')
const artillery = document.querySelector('.artillery')

// 设置炮台大小及位置
const emitterData = {
    x: body.offsetWidth / 2,
    y: body.offsetHeight,
    emitterSize: 100
}

// 设置炮台样式
emitter.style.width = `${emitterData.emitterSize}px`
emitter.style.height = `${emitterData.emitterSize}px`
emitter.style.left = `${emitterData.x - emitterData.emitterSize / 2}px`
emitter.style.top = `${emitterData.y - emitterData.emitterSize / 2}px`

const artilleryData = {
    width: 20,
    height: 80,
}

// 设置炮管样式
artillery.style.width = `${artilleryData.width}px`
artillery.style.height = `${artilleryData.height}px`
artillery.style.left = `calc(50% - ${artilleryData.width / 2}px)`
artillery.style.bottom = `${emitterData.emitterSize / 2}px`

// 获取角度
function getAngle(endX, endY) {
    const x = endX - emitterData.x
    const y = - (endY - emitterData.y)
    return Math.atan2(x, y) * (180 / Math.PI)
}