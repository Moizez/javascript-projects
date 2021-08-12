let modalQtd = 1
let modalId = null
let cart = []

const q = e => document.querySelector(e)
const qs = e => document.querySelectorAll(e)


// Listagem das pizzas
data.map((item, index) => {
    let pizza = q('.models .pizza-item').cloneNode(true)

    pizza.setAttribute('data-id', index)
    pizza.querySelector('.pizza-item--img img').src = item.img
    pizza.querySelector('.pizza-item--price').innerHTML = item.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    pizza.querySelector('.pizza-item--name').innerHTML = item.name
    pizza.querySelector('.pizza-item--desc').innerHTML = item.description

    //Modal
    pizza.querySelector('a').addEventListener('click', e => {
        e.preventDefault()

        let id = e.target.closest('.pizza-item').getAttribute('data-id')
        modalQtd = 1
        modalId = id

        q('.pizzaBig img').src = data[id].img
        q('.pizzaInfo h1').innerHTML = data[id].name
        q('.pizzaInfo--desc').innerHTML = data[id].description
        q('.pizzaInfo--actualPrice').innerHTML = data[id].price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

        q('.pizzaInfo--size.selected').classList.remove('selected')

        qs('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex === 2) {
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = data[id].sizes[sizeIndex]
        })

        q('.pizzaInfo--qt').innerHTML = modalQtd

        q('.pizzaWindowArea').style.opacity = 0
        q('.pizzaWindowArea').style.display = 'flex'
        setTimeout(() => {
            q('.pizzaWindowArea').style.opacity = 1
        }, 200);
    })
    q('.pizza-area').append(pizza)
})

// Eventos do modal
const closeModal = () => {
    q('.pizzaWindowArea').style.opacity = 0
    setTimeout(() => {
        q('.pizzaWindowArea').style.display = 'none'
    }, 500);
}

qs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach(i => {
    i.addEventListener('click', closeModal)
})

q('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQtd > 1) {
        modalQtd--
        q('.pizzaInfo--qt').innerHTML = modalQtd
    }
})

q('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQtd++
    q('.pizzaInfo--qt').innerHTML = modalQtd
})

qs('.pizzaInfo--size').forEach(size => {
    size.addEventListener('click', () => {
        q('.pizzaInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
    })
})

q('.pizzaInfo--addButton').addEventListener('click', () => {
    // Qual pizza? Qual o tamanho? Quantas pizzas?
    let size = q('.pizzaInfo--size.selected').getAttribute('data-id')

    // Verificações
    let checker = `${data[modalId].id}@${size}`

    let findIdChecker = cart.findIndex(item => item.checker == checker)

    if (findIdChecker > -1) {
        cart[findIdChecker].qtd += modalQtd
    } else {

        cart.push({
            id: data[modalId].id,
            size: parseInt(size),
            qtd: modalQtd,
            checker,
        })
    }

    updateCart()
    closeModal()

})

q('.menu-openner').addEventListener('click', () => {
    if (cart.length > 0) {
        q('aside').style.left = 0
    }

})

q('.menu-closer').addEventListener('click', () => {
    q('aside').style.left = '100vw'
})

const updateCart = () => {

    q('.menu-openner span').innerHTML = cart.length

    if (cart.length > 0) {
        q('aside').classList.add('show')
        q('.cart').innerHTML = ''

        let subtotal = 0
        let discount = 0
        let total = 0

        for (let i in cart) {
            let pizzaItem = data.find(item => item.id == cart[i].id)
            subtotal += pizzaItem.price * cart[i].qtd


            let cartItem = q('.models .cart--item').cloneNode(true)

            let initials
            switch (cart[i].size) {
                case 0:
                    initials = 'P'
                    break
                case 1:
                    initials = 'M'
                    break
                case 2:
                    initials = 'G'
                    break
                default:
                    break
            }

            cartItem.querySelector('img').src = pizzaItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = `${pizzaItem.name} (${initials})`
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qtd
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (cart[i].qtd > 1) {
                    cart[i].qtd--
                } else {
                    cart.splice(i, 1)
                }
                updateCart()
            })
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qtd++
                updateCart()
            })

            q('.cart').append(cartItem)

        }

        discount = subtotal * 0.1
        total = subtotal - discount

        q('.subtotal span:last-child').innerHTML = subtotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        q('.desconto span:last-child').innerHTML = discount.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        q('.total span:last-child').innerHTML = total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })



    } else {
        q('aside').classList.remove('show')
        q('aside').style.left = '100vw'
    }

}