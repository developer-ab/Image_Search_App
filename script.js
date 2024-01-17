const apiKey = "x_jkLflL3MqmcgXcTuEsj0EXpvVATIR8bXH0pFtmLlw";

const formElement = document.querySelector('form');
const input = document.getElementById('searchInput');
const searchResultContainer = document.querySelector('.searchResultContainer');
const showMore = document.getElementById('showMore');

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = input.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;

    const response = await fetch(url);
    // console.log(response);
    const data = await response.json();
    console.log(data);

    const results = data.results

    if(page === 1){
        searchResultContainer.innerHTML = "";
    }

    results.map((result) =>{
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('searchResult');

        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResultContainer.appendChild(imageWrapper);

    });

    page++;

    if(page > 1){
        showMore.style.display = "block"
    }
}

formElement.addEventListener('submit', (event) =>{
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener('click', () =>{
    searchImages();
});

