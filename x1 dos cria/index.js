//Davi Oton RA:24124
//Miguel Lopes RA:24142
//João Torres RA:24529

const canvas = document.querySelector('canvas')
const screen = canvas.getContext('2d') // renderiza a tela

canvas.width = 1000
canvas.height = 576

screen.fillRect(
    0,
    0,
    canvas.width,
    canvas.height)

const gravity = 0.7

const background = new Sprite({
    position: { x: 0, y: 0 }, imageSrc: "./imagens/cenario.png"

})

const player = new Luta({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    imageSrc: "./imagens/player/padrao.png",
    framesMax: 2,
    scale: 0.2,
    offset: { x: 75, y: 50 },
    sprites: {
        idle: {
            imageSrc: "./imagens/player/padrao.png",
            framesMax: 2,
        },
        runRight: {
            imageSrc: "./imagens/player/andar direita.png",
            framesMax: 2,
        },
        runLeft: {
            imageSrc: "./imagens/player/andar esquerda.png",
            framesMax: 2,
        },
        jump: {
            imageSrc: "./imagens/player/jump.png",
            framesMax: 2,
        },
        fall: {
            imageSrc: "./imagens/player/jump.png",
            framesMax: 2,
        },
        attackbasic: {
            imageSrc: "./imagens/player/Ataque.png",
            framesMax: 4,
        },
        attacksuper: {
            imageSrc: "./imagens/player/especial.png",
            framesMax: 3,
        }
    },
    attackbox: {
        offset: {
            x: 20,
            y: 50
        },
        width: 20,
        height: 50
    }
})

const enemy = new Luta({
    position: { x: 400, y: 100 },
    velocity: { x: 0, y: 0 },
    imageSrc: "./imagens/enemy/Respirando (esquerda).png",
    framesMax: 4,
    scale: 2.4,
    offset: { x: -50, y: 50 },
    sprites: {
        idle: {
            imageSrc: "./imagens/enemy/Respirando (esquerda).png",
            framesMax: 4,
        },
        runRight: { 
            imageSrc: "./imagens/enemy/Andando (direita).png",
            framesMax: 3,
        },
        runLeft: { 
            imageSrc: "./imagens/enemy/Andando (esquerda).png",
            framesMax: 3,
        },
        jump: { 
            imageSrc: "./imagens/enemy/Pulando (esquerda).png",
            framesMax: 4,
        },
        fall: { 
            imageSrc: "./imagens/enemy/Pulando (esquerda).png",
            framesMax: 4,
        },
        attackbasic: {
            imageSrc: "./imagens/enemy/Ataque (esquerda).png",
            framesMax: 4,
        },
        attacksuper: {
            imageSrc: "./imagens/enemy/Ataque especial (esquerda).png",
            framesMax: 6,
        }
    },
    attackbox: {
        offset: {
            x: -25,
            y: 50
        },
        width: 25,
        height: 50
    }

})

const keys = { //corrige um bug de deteccao ao precionar a tecla para movimentar o personagem
    d: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    Shift: { pressed: false },
    Control:{ pressed: false },
    ArrowRight: { pressed: false },
    ArrowLeft: { pressed: false },
    ArrowDown: { pressed: false },
}



contador()

function animate() { //cria a animação (repeticao em loop)
    window.requestAnimationFrame(animate)
    screen.fillStyle = 'pink'
    screen.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0


    if (keys.d.pressed && player.lastKey === 'd') { //corrige um bug de deteccao ao precionar a tecla para movimentar o personagem
        player.velocity.x = 5
        player.switchSprite('runRight')
    }

    else if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
        player.switchSprite('runLeft')
    }
    else if(keys.s.pressed && player.lastKey === 's'){
        player.switchSprite('attackbasic')
    }
    else if(keys.Shift.pressed && player.lastKey === 'Shift'){
        player.switchSprite('attacksuper')
    }
    
    else  {
        player.switchSprite('idle')
    }

    if (player.velocity.y < 0) {
        player.switchSprite('jump')
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    }



    if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') { //corrige um bug de deteccao ao precionar a tecla para movimentar o personagem
        enemy.velocity.x = 5
        enemy.switchSprite('runRight')
    }

    else if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
        enemy.switchSprite('runLeft')
    } 
    else if(keys.ArrowDown.pressed && enemy.lastKey === 'ArrowDown') {
        enemy.switchSprite('attackbasic')
        
    }
    else if(keys.Control.pressed && enemy.lastKey === 'Control'){
        enemy.switchSprite('attacksuper')
    }

    else  {
        enemy.switchSprite('idle')
        
    }

    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
    }

    //detector de colisoes

    if (rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    })
        && player.isAttacking && player.framesCurrent === 3) {
        player.isAttacking = false
        enemy.health -= 4

        document.querySelector('#vidaenemy').style.width = enemy.health + '%'
        console.log('dano player')

        player.super += 5
        document.querySelector('#playerSuper').style.width = player.super*2.5 + '%';
    }

    if (player.isAttacking && player.framesCurrent === 3) {
        player.isAttacking = false
    }

    if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    })
        && enemy.isAttacking && enemy.framesCurrent === 3) { // alterar qnd o jao mandar as sprites
        enemy.isAttacking = false
        player.health -= 4
        document.querySelector('#vidaplayer').style.width = player.health + '%'
        console.log('dano enemy')

        enemy.super += 5
        document.querySelector('#enemySuper').style.width = enemy.super*2.5 + '%';
        
    }

    if (enemy.isAttacking && enemy.framesCurrent === 3) {
        enemy.isAttacking = false
    }


    if (enemy.health <= 0 || player.health <= 0) {
        ganhador({ player, enemy, idtempo })
    }

}
animate()

window.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break

        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break

        case 'w':
            if (!player.isJumping) {
                player.velocity.y = -15;
                player.isJumping = true;
            }
            break

        case 's':
            player.isAttacking = true
            player.lastKey = 's'
            keys.s.pressed = true
            player.attack()

            break

        case 'Shift': // Ataque especial do player
            
            if (player.ataqueSuper()) {
                player.isAttackingSuper = true
                player.lastKey = 'Shift'
                keys.Shift.pressed = true
                player.realAttack()
                enemy.health -= 20;
                document.querySelector('#vidaenemy').style.width = enemy.health + '%';
            }

            break

//enemy

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break

        case 'ArrowUp':
            if (!enemy.isJumping) {
                enemy.velocity.y = -15;
                enemy.isJumping = true;
            }
            break

        case 'ArrowDown':
            enemy.isAttacking = true
            enemy.lastKey = 'ArrowDown'
            keys.ArrowDown.pressed = true
            enemy.attackEnemy()
            break
            
        case 'Control': // Ataque especial do player
            if (enemy.ataqueSuperEnemy()) {
                enemy.isAttackingSuper = true
                enemy.lastKey = 'Control'
                keys.Control.pressed = true
                enemy.realAttackEnemy()
                player.health -= 20;
                document.querySelector('#vidaplayer').style.width = player.health + '%';
            }
            break
    }
    console.log(event.key)
})

window.addEventListener('keyup', (event) => { // quando soltar a tecla o boneco para d andar
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break

        case 'a':
            keys.a.pressed = false
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break

    }
    console.log(event)
})