const user = [
    { id: 1, account: 'BestStar', password: '20020220' },
    { id: 2, account: 'admin', password: '123456' }
]

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login')
    const account = document.getElementById('account')
    const password = document.getElementById('password')
    const errorMsg = document.getElementById('errorMsg')
    const welcomeMsg = document.getElementById('welcomeMsg')

    if (!form || !account || !password) return

    if (welcomeMsg) {
        welcomeMsg.textContent = '未登录'
        welcomeMsg.classList.remove('success')
    }

    const accPattern = /^[A-Za-z_][A-Za-z0-9_]{0,11}$/
    const pwdPattern = /^.{1,8}$/

    function showError() {
        if (errorMsg) {
            errorMsg.textContent = '账号/密码有误！'
            errorMsg.style.display = 'block'
        }

        account.classList.add('invalid')
        password.classList.add('invalid')

        if (welcomeMsg) {
            welcomeMsg.textContent = '未登录'
            welcomeMsg.classList.remove('success')
        }
    }

    function clearError() {
        if (errorMsg) {
            errorMsg.textContent = ''
            errorMsg.style.display = 'none'
        }

        account.classList.remove('invalid')
        password.classList.remove('invalid')
    }

    account.addEventListener('input', () => {
        let v = account.value
        v = v.replace(/[^A-Za-z0-9_]/g, '')

        if (/^\d/.test(v)) v = v.replace(/^\d+/, '')
        if (v.length > 12) v = v.slice(0, 12)
        if (account.value !== v) account.value = v

        if (accPattern.test(account.value)) {
            account.classList.remove('invalid')
        }

        if (password.value && pwdPattern.test(password.value)) {
            password.classList.remove('invalid')
        }

        if (accPattern.test(account.value) && pwdPattern.test(password.value)) {
            clearError()
        }
    })

    password.addEventListener('input', () => {
        if (password.value.length > 8) {
            password.value = password.value.slice(0, 8)
        }
        
        if (pwdPattern.test(password.value)) {
            password.classList.remove('invalid')
        }

        if (account.value && accPattern.test(account.value) && pwdPattern.test(password.value)) {
            clearError()
        }
    })

    function handleSubmitClick(e) {
        e.preventDefault()
        clearError()

        const acc = account.value.trim()
        const pwd = password.value

        if (!accPattern.test(acc) || !pwdPattern.test(pwd)) {
            showError()
            return
        }

        const matched = user.find((u) => u.account === acc && u.password === pwd)

        if (matched) {
            if (welcomeMsg) {
                welcomeMsg.textContent = '欢迎回来'
                welcomeMsg.classList.add('success')
            }

            form.reset()
            clearError()
            
            setTimeout(() => {
                if (welcomeMsg) {
                    welcomeMsg.textContent = '未登录'
                    welcomeMsg.classList.remove('success')
                }
            }, 5000)
        } else {
            showError()
        }
    }

    form.addEventListener('submit', handleSubmitClick)
})
