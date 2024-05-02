

document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('#github-form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        document.querySelector('#user-list').innerHTML = ''
        const repoUl = document.querySelector('#repos-list')
        repoUl.innerHTML = ''

        const input = document.querySelector('#search')
        const userName = input.value.trim()

        fetch(`https://api.github.com/search/users?q=${userName}`)
            .then(res => {
                debugger
                if (!res.ok) {
                    throw new Error('Something went wrong!')
                }
                return res.json()
            })
            .then(data => {
                console.log(data)
                const ulList = document.querySelector('#user-list')


                data.items.forEach(user => {
                    const li = document.createElement('li')
                    li.innerHTML = `

                                        <span>User name: ${user.login}</span><br>
                                        <span>Status: ${user.type}</span><br>
                                        <img src="${user.avatar_url}" alt="Avatar">
                                        `
                    ulList.appendChild(li)


                    li.addEventListener('click', () => {

                        fetch(`https://api.github.com/users/${user.login}/repos`)

                            .then(res => {
                                if (!res.ok) {
                                    throw new Error('error')
                                }
                                debugger
                                return res.json()
                            })
                            .then(repos => {
                                repoUl.textContent = ''
                                repos.forEach(repo => {
                                    const li2 = document.createElement('li')
                                    li2.innerHTML = `<a href="${repo.html_url}">${repo.name}</a>`
                                    repoUl.appendChild(li2)
                                })
                            })
                    })

                })
            })
            .finally(() => {
                form.reset()
            })
    })

})

