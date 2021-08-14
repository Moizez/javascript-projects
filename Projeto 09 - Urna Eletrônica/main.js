const q = e => document.querySelector(e)

let titulo = q('.tela--infoCandidato span')
let cargo = q('.tela--infoCargo span')
let descricao = q('.tela--confirmacao')
let instrucao = q('.tela--instrucao')
let imagem = q('.tela--imagem')
let input = q('.tela--input')

let faseAtual = 0
let numero = ''
let votoBranco = false
let votos = []

const iniciar = () => {
    let fase = data[faseAtual]

    let inputHTML = ''
    numero = ''
    votoBranco = false

    for (let i = 0; i < fase.numeros; i++) {
        if (i === 0) {
            inputHTML += '<div class="tela--numero pisca"></div>'
        } else {
            inputHTML += '<div class="tela--numero"></div>'
        }
    }

    titulo.style.display = 'none'
    cargo.innerHTML = fase.titulo
    descricao.innerHTML = ''
    instrucao.style.display = 'none'
    imagem.innerHTML = ''
    input.innerHTML = inputHTML

}

const atualizaTela = () => {
    let fase = data[faseAtual]
    let candidato = fase.candidatos.filter(i => i.numero === numero)

    if (candidato.length > 0) {
        candidato = candidato[0]
        titulo.style.display = 'block'
        descricao.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}<br>Vice-prefeito: ${candidato.vice}`
        instrucao.style.display = 'block'

        let fotosHTML = ''

        for (let i in candidato.fotos) {
            if (candidato.fotos[i].pequeno) {
                fotosHTML += `<div class="tela--candidato pequeno"><img src="images/${candidato.fotos[i].url}" alt="Candidato A"/>${candidato.fotos[i].legenda}</div>`
            } else {
                fotosHTML += `<div class="tela--candidato"><img src="images/${candidato.fotos[i].url}" alt="Candidato A"/>${candidato.fotos[i].legenda}</div>`
            }
        }
        imagem.innerHTML = fotosHTML
    } else {
        titulo.style.display = 'block'
        instrucao.style.display = 'block'
        descricao.innerHTML = '<div class="tela--nulobranco pisca">VOTO NULO</div>'
    }

}

const teclado = (n) => {
    let valor = q('.tela--numero.pisca')
    if (valor) {
        valor.innerHTML = n
        numero = `${numero}${n}`

        valor.classList.remove('pisca')
        if (valor.nextElementSibling) {
            valor.nextElementSibling.classList.add('pisca')
        } else {
            atualizaTela()
        }
    }
}

const branco = () => {
    numero = ''
    votoBranco = true
    titulo.style.display = 'block'
    instrucao.style.display = 'block'
    input.innerHTML = ''
    imagem.innerHTML = ''
    descricao.innerHTML = '<div class="tela--nulobranco pisca">VOTO EM BRANCO</div>'
}

const corrige = () => {
    iniciar()
}

const confirma = () => {
    let fase = data[faseAtual]

    let votoConfirmado = false

    if (votoBranco) {
        votoConfirmado = true
        votos.push(
            {
                fase: data[faseAtual].titulo,
                voto: 'branco'
            })
    } else if (numero.length === fase.numeros) {
        votoConfirmado = true
        votos.push(
            {
                fase: data[faseAtual].titulo,
                voto: numero
            })
    }

    if (votoConfirmado) {
        faseAtual++
        if (data[faseAtual]) {
            iniciar()
        } else {
            q('.tela').innerHTML = '<div class="tela--fim pisca">FIM</div>'
            console.log(votos)
        }

    }

}

iniciar()