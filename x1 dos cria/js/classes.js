//Davi Oton RA:24124
//Miguel Lopes RA:24142
//João Torres RA:24529

class Sprite {
    constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 } }) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 12
        this.offset = offset
    }

    draw() {
        screen.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale)
        //console.log('carregamento')
    }

    animateFrame() {
        this.framesElapsed++

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++
            }
            else {
                this.framesCurrent = 0
            }
        }
    }

    update() {
        this.draw()
        this.animateFrame()

    }
}

class Luta extends Sprite {
    constructor({ position, velocity, color = 'blue', imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 }, sprites, attackbox = { offset: {}, width: undefined, height: undefined } }) { //{position, velocity} as chaves fazem com que nao seja necessario declarar os objts na ordem, fazendo com que sejam representados por um objt só
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })

        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackbox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackbox.offset,
            width: attackbox.width,
            height: attackbox.height,
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 12
        this.sprites = sprites

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        } console.log(this.sprites)



        this.isJumping = false
        this.super = 0
        this.isAttackingSuper
    }




    update() {
        this.draw()
        this.animateFrame()

        this.attackbox.position.x = this.position.x + this.attackbox.offset.x
        this.attackbox.position.y = this.position.y + this.attackbox.offset.y

        screen.fillRect(this.attackbox.position.x,
            this.attackbox.position.y,
            this.attackbox.position.width,
            this.attackbox.position.height)


        this.position.x += this.velocity.x
        this.position.y += this.velocity.y //movimento do personagem

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 100) {
            this.velocity.y = 0;
            this.position.y = 326
            this.isJumping = false; // Personagem está no chão, pode pular novamente
        } else {
            this.velocity.y += gravity;
        }


        // Impedir que o personagem saia dos limites da tela
        if (this.position.x <= 0) {
            this.position.x = 0;
        } else if (this.position.x + this.width >= canvas.width) {
            this.position.x = canvas.width - this.width;
        }


    }

    attack() {
        this.switchSprite('attackbasic')
        this.isAttacking = true
        setTimeout(()=>{
            this.isAttacking = false
            keys.s.pressed = false
            
        }, 600)
    }
    attackEnemy() {
        this.switchSprite('attackbasic')
        this.isAttacking = true
        setTimeout(()=>{
            this.isAttacking = false
            keys.ArrowDown.pressed = false
            
        }, 600)}
    
    ataqueSuper() {
        if (this.super >= 20) {
            this.super = 0;
            document.querySelector('#playerSuper').style.width = 0 + '%'
            return true;
        }
        return false
    }
    realAttack() {
        this.switchSprite('attacksuper')
        this.isAttackingSuper = true
        setTimeout(()=>{
            this.isAttackingSuper = false
            keys.Shift.pressed = false
        }, 600)
    }
    ataqueSuperEnemy() {
        {
            if (this.super >= 20) {
                this.super = 0;
                document.querySelector('#enemySuper').style.width = 0 + '%'
                return true;
            }
            return false
        }
    }
    realAttackEnemy() {
        this.switchSprite('attacksuper')
        this.isAttackingSuper = true
        setTimeout(()=>{
            this.isAttackingSuper = false
            keys.Control.pressed = false
        }, 1000)
    }

    
    

    switchSprite(sprite) {

        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0
                }
                break;
            case 'runRight':
                if (this.image !== this.sprites.runRight.image) {
                    this.image = this.sprites.runRight.image
                    this.framesMax = this.sprites.runRight.framesMax
                    this.framesCurrent = 0
                }

                break;
            case 'runLeft':
                if (this.image !== this.sprites.runLeft.image) {
                    this.image = this.sprites.runLeft.image
                    this.framesMax = this.sprites.runLeft.framesMax
                    this.framesCurrent = 0
                }
                break;
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                }

                break;

            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent = 0
                }

                break;

            case 'attackbasic':
                if (this.image !== this.sprites.attackbasic.image) {
                    this.image = this.sprites.attackbasic.image
                    this.framesMax = this.sprites.attackbasic.framesMax
                    this.framesCurrent = 0
                }

                break;
            case 'attacksuper':
                if (this.image !== this.sprites.attacksuper.image) {
                    this.image = this.sprites.attacksuper.image
                    this.framesMax = this.sprites.attacksuper.framesMax
                    this.framesCurrent = 0
                }

                break;
        }
    }
}
