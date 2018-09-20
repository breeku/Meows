const form = document.querySelector('div.modal div.modal-dialog div.modal-content div.modal-body form')
const loadingElement = document.querySelector('.loading')
const meowsElement = document.querySelector('.meows')
const APIURL = window.location.hostname === 'localhost' ? 'http://localhost:5000/meows' : 'https://meows-api.now.sh/meows';

loadingElement.style.display = ''

listAllMeows()

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    const name = formData.get('name')
    const content = formData.get('content')

    const meow = {
        name,
        content
    };
    loadingElement.style.display = ''
    
    fetch(APIURL, {
        method: 'POST',
        body: JSON.stringify(meow),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json()
        .then(createdMeow => {
            $(function () {
                $('#meowModal').modal('toggle');
             });
            loadingElement.style.display = 'none'
            form.reset();
            listAllMeows()
        }))
    })

function listAllMeows() {
    meowsElement.innerHTML = ''
    fetch(APIURL)
        .then(response => response.json()
        .then(meows => {
            meows.reverse()
            meows.forEach(meow => {
                const div = document.createElement('div')
                div.classList.add('card', 'bg-primary', 'text-white', 'my-3', 'w-50', 'meowCards')

                const cardBody = document.createElement('div')
                cardBody.classList.add('card-body')

                const header = document.createElement('h3')
                header.classList.add('card-title')
                header.textContent = meow.name

                const contents = document.createElement('p')
                contents.classList.add('card-text')
                contents.textContent = meow.content

                const date = document.createElement('small')
                date.classList.add('card-subtitle')
                date.textContent = moment(new Date(meow.created)).fromNow()

                cardBody.appendChild(header)
                cardBody.appendChild(contents)
                cardBody.appendChild(date)
                div.appendChild(cardBody)

                meowsElement.appendChild(div)
            })
            loadingElement.style.display = 'none'
        }))
}