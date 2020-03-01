const chuckForm = document.querySelector('.chuck-form');
const clearButton = document.querySelector('.clear-jokes');
const jokeHtml = document.querySelector('.jokes');
const filter = document.querySelector('#filter');


loadEventListeners();

function loadEventListeners() {

    chuckForm.addEventListener('submit', getChuckJokes);
    clearButton.addEventListener('click', clearJokes);
    filter.addEventListener('keyup', filterJokes);
};



function getChuckJokes(e) {

    e.preventDefault();

    const nr = document.querySelector('input[type="number"]').value;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://api.icndb.com/jokes/random/${nr}`, true);


    xhr.onload = function () {
        if (this.status === 200) {
            let resp = JSON.parse(this.responseText);
            let output = '';

            if (resp.type === 'success') {
                resp.value.forEach(jo => {
                    addJoke(jo.joke);
                })

            } else {
                output += '<ul><li>Something went wrong</li></ul>'
                jokeHtml.innerHTML = output;
            }

        }
    }
    xhr.send();

}

function addJoke(joke) {


    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(joke));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    jokeHtml.appendChild(li);

}

function clearJokes() {
    jokeHtml.innerHTML = '';
}

function filterJokes(e) {
    //toggle filtering of tasks
    console.log('hey')
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (joke) {
        const item = joke.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            joke.style.display = 'block';
        } else {
            joke.style.display = 'none';
        }
    });
}