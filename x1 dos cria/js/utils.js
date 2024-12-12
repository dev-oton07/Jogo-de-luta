//Davi Oton RA:24124
//Miguel Lopes RA:24142
//João Torres RA:24529

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (rectangle1.attackbox.position.x + rectangle1.attackbox.width >= rectangle2.position.x
        && rectangle1.attackbox.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.attackbox.position.y + rectangle1.attackbox.height >= rectangle2.position.y
        && rectangle1.attackbox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function ganhador({ player, enemy, idtempo }) {
    clearTimeout(idtempo)
    document.querySelector('#msgDePerda').style.display = 'flex'
    if (player.health == enemy.health) {
        document.querySelector('#msgDePerda').innerHTML = 'Empate'
        console.log('perdeu =( ')
    } else if (player.health > enemy.health) {
        document.querySelector('#msgDePerda').innerHTML = 'Player 1 ganhou'
        document.querySelector('#msgDePerda').style.display = 'flex'

    } else if (player.health < enemy.health) {
        document.querySelector('#msgDePerda').innerHTML = 'Player 2 ganhou'
        document.querySelector('#msgDePerda').style.display = 'flex'

    }
}

let tempo = 60
let idtempo
function contador() {
    idtempo = setTimeout(contador, 1000)
    if (tempo > 0) {
        tempo--
        document.querySelector('#tempo').innerHTML = tempo

    }
    if (tempo === 0) {
        ganhador({ player, enemy, idtempo })
    }

}
