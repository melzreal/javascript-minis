document.getElementById('chuck-form').addEventListener('submit', function (e) {
    e.preventDefault();

    getChuckJokes();

})


function getChuckJokes() {

    let jokeHtml = document.querySelector('.jokes');
    const nr = document.querySelector('input[type="number"]').value;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', `http://api.icndb.com/jokes/random/${nr}`, true);

    console.log(`http://api.icndb.com/jokes/random/${nr}`)
    xhr.onload = function () {
        if (this.status === 200) {
            let response = JSON.parse(this.responseText);

            let output = '';

            if (response.type === 'success') {

                response.value.forEach(function (jo) {
                    output += `<li>${jo.joke}</li>\n<br>`
                })
                console.log(output)
            } else {
                output += '<ul><li>Something went wrong</li></ul>'
            }

            jokeHtml.innerHTML = output;

        }
    }
    xhr.send();

}