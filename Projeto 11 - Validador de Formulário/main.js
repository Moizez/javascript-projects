let validator = {
    handleSubmit: e => {
        e.preventDefault()
        let send = true
        let inputs = form.querySelectorAll('input')

        validator.clearErrors()

        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i]
            let check = validator.checkInput(input)
            if (check !== true) {
                send = false
                validator.showError(input, check)
            }
        }

        send = false

        if (send) {
            form.submit()
        }
    },
    checkInput: input => {
        let rules = input.getAttribute('data-rules')

        if (rules) {
            rules = rules.split('|')
            for (let i in rules) {
                let rule = rules[i].split('=')

                switch (rule[0]) {
                    case 'required':
                        if (input.value == '') {
                            return 'Campo obrigatório!'
                        }
                        break
                    case 'min':
                        if (input.value.length < rule[1]) {
                            return `Campo tem que ter pelo menos ${rule[1]} caracteres!`
                        }
                        break
                    case 'email':
                        if (input.value != '') {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if (!regex.test(input.value.toLowerCase())) {
                                return 'E-mail inválido! Digite seu e-mail corretamente.'
                            }
                        }
                        break

                }
            }
        }

        return true
    },
    showError: (input, error) => {
        input.style.borderColor = '#F00'

        let errorElement = document.createElement('div')
        errorElement.classList.add('error')
        errorElement.innerHTML = error

        input.parentElement.insertBefore(errorElement, input.ElementSibling)

    },
    clearErrors: () => {

        let inputs = form.querySelectorAll('input')
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style = ''
        }

        let errorElements = document.querySelectorAll('.error')
        for (let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove()
        }
    }
}

let form = document.querySelector('.validator')

form.addEventListener('submit', validator.handleSubmit)