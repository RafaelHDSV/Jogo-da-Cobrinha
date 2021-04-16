var canvas = document.getElementById("snake-vermelha");
var context = canvas.getContext("2d");
var box = 32;
var snakevermelha = [];
snakevermelha[0] = {
    x: 8 * box,
    y: 8 * box
}
var direction = "right"
var comida = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
var min = 0
var seg = 0
var tempo = 1000
var cron
var pontos = 0

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for (i = 0; i < snakevermelha.length; i++) {
        context.fillStyle = "red";
        context.fillRect(snakevermelha[i].x, snakevermelha[i].y, box, box);
    }
}

function ligarCronometro() {
    cron = setInterval(timerCronometro, tempo)
}

function pararCronometro() {
    clearInterval(cron)
    clearInterval(jogo)
    alert("O seu tempo acabou!!")
    alert("Recarregue a página para voltar a jogar")
}


function timerCronometro() {
    seg++

    if (seg == 60) {
        seg = 0
        min++

        if (min == 60) {
            min = 0
        }
    }

    var format = (min < 10 ? '0' + min : min) + ':' + (seg < 10 ? '0' + seg : seg)
    document.getElementById("cronometro").innerText = format
}

function contarPontos() {

    document.getElementById("pontos-vermelho").innerText = (`Pontos: ${pontos}`)
}


function criarComida() {
    context.fillStyle = "#F39C12"
    context.fillRect(comida.x, comida.y, box, box)
}

document.addEventListener('keydown', update)


function update(Event) {
    if (Event.keyCode == 37 && direction != "right") {
        direction = "left";
    }
    if (Event.keyCode == 38 && direction != "down") {
        direction = "up";
    }
    if (Event.keyCode == 39 && direction != "left") {
        direction = "right";
    }
    if (Event.keyCode == 40 && direction != "up") {
        direction = "down";
    }
}

function iniciarJogo() {
    if (snakevermelha[0].x > 15 * box && direction == "right") snakevermelha[0].x = 0
    if (snakevermelha[0].x < 0 && direction == "left") snakevermelha[0].x = 16 * box
    if (snakevermelha[0].y > 15 * box && direction == "down") snakevermelha[0].y = 0
    if (snakevermelha[0].y < 0 && direction == "up") snakevermelha[0].y = 16 * box

    for (i = 1; i < snakevermelha.length; i++, pontos++) {
        if (snakevermelha[0].x == snakevermelha[i].x && snakevermelha[0].y == snakevermelha[i].y) {
            clearInterval(cron)
            clearInterval(jogo)
            alert("Game Over, você encostou no seu próprio corpo!!")
            alert("Recarregue a página para voltar a jogar")
        }
    }

    if (seg >= 30) {
        pararCronometro()
    }

    criarBG();
    criarCobrinha();
    criarComida()

    var snakevermelhaX = snakevermelha[0].x
    var snakevermelhaY = snakevermelha[0].y

    if (direction == "right") {
        snakevermelhaX += box
    }
    if (direction == "left") {
        snakevermelhaX -= box
    }
    if (direction == "up") {
        snakevermelhaY -= box
    }
    if (direction == "down") {
        snakevermelhaY += box
    }

    if (snakevermelhaX != comida.x || snakevermelhaY != comida.y) {
        snakevermelha.pop()
    } else {
        comida.x = Math.floor(Math.random() * 15 + 1) * box,
            comida.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    var newHead = {
        x: snakevermelhaX,
        y: snakevermelhaY
    }

    snakevermelha.unshift(newHead)
}

var jogo = setInterval(iniciarJogo, 100)