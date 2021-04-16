var canvas = document.getElementById("snake-azul")
var context = canvas.getContext("2d")
var caixa = 32
var snakeazul = []
snakeazul[0] = {
    x: 8 * caixa,
    y: 8 * caixa
}
var direcao = "right"
var comida = {
    x: Math.floor(Math.random() * 15 + 1) * caixa,
    y: Math.floor(Math.random() * 15 + 1) * caixa
}

function criarFundo() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * caixa, 16 * caixa);
}

function criarCobrinha() {
    for (tamanho = 0; tamanho < snakeazul.length; tamanho++) {
        context.fillStyle = "blue";
        context.fillRect(snakeazul[tamanho].x, snakeazul[tamanho].y, caixa, caixa);
    }
}

function criarComida() {
    context.fillStyle = "#F39C12"
    context.fillRect(comida.x, comida.y, caixa, caixa)
}

/*  87 - Cima
    65 - Esquerda
    68 - Direita
    83 - Baixo
*/



function comecoJogo() {

    criarFundo()
    criarCobrinha()
    criarComida()

    var snakeazulX = snakeazul[0].x
    var snakeazulY = snakeazul[0].y

    if (direcao == "direita") {
        snakeazulX += caixa
    }
    if (direcao == "esquerda") {
        snakeazulX -= caixa
    }
    if (direcao == "cima") {
        snakeazulY -= caixa
    }
    if (direcao == "baixo") {
        snakeazulY += caixa
    }

    if (snakeazul[0].x > 15 * caixa && direcao == "direita") snakeazul[0].x = 0
    if (snakeazul[0].x < 0 && direcao == "esquerda") snakeazul[0].x = 16 * caixa
    if (snakeazul[0].y > 15 * caixa && direcao == "baixo") snakeazul[0].y = 0
    if (snakeazul[0].y < 0 && direcao == "cima") snakeazul[0].y = 16 * caixa
}

var Game = setInterval(comecoJogo(), 100)