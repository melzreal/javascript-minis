document.getElementById('chuck-form').addEventListener('submit', function (e) {
    e.preventDefault();
    getChuckJokes();

})


function getChuckJokes() {

    let jokeHtml = document.querySelector('.jokes');
    const nr = document.querySelector('input[type="number"]').value;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', `http://api.icndb.com/jokes/random/${nr}`, true);

    xhr.onload = function () {
        if (this.status === 200) {
            let resp = JSON.parse(this.responseText);
            let output = '';

            if (resp.type === 'success') {
                resp.value.forEach(jo => {
                    output += `<ul><li>${jo.joke}</li>\n<br></ul>`
                })

            } else {
                output += '<ul><li>Something went wrong</li></ul>'
            }

            jokeHtml.innerHTML = output;

        }
    }
    xhr.send();

}