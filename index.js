const fetchCatButton = document.getElementById('fetch-cat-button');
const catContainer = document.getElementById('cat-container');
const galleryContainer = document.getElementById('gallery-container');
let catImages = [];

async function fetchCat() {
    try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search');
        const data = await response.json();
        const imgUrl = data[0].url;
        
        // Отображаем текущее изображение
        displayCat(imgUrl);

        // Сохраняем изображение в галерею
        catImages.push(imgUrl);
        displayGallery();
    } catch (error) {
        console.error('Ошибка получения изображения:', error);
    }
}

function displayCat(imgUrl) {
    catContainer.innerHTML = `<img src="${imgUrl}" alt="Cute Cat">`;
}

function displayGallery() {
    galleryContainer.innerHTML = catImages.map(url => `<img src="${url}" alt="Cat">`).join('');
}

// Добавляем обработчик событий для кнопки
fetchCatButton.addEventListener('click', fetchCat);