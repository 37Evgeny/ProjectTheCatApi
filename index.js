const fetchCatButton = document.getElementById('fetch-cat-button');
const catContainer = document.getElementById('cat-container');
const galleryContainer = document.getElementById('gallery-container');
const clearAllButton = document.getElementById('clearAllButton');
//создаем массив для хранения изображений
let catImages = [];

//функция для получения изображения
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

//отображаем текущее изображение
function displayCat(imgUrl) {
    catContainer.innerHTML = `<img src="${imgUrl}" alt="Cute Cat">`;
}


function displayGallery() {
    //Генерирует HTML для каждого изображения, добавляя атрибут data-index, чтобы хранить индекс изображения в массиве.
    galleryContainer.innerHTML = catImages.map((url, index) => 
        `<img src="${url}" alt="Cat" data-index="${index}" style="max-width: 100px; margin: 5px; cursor: pointer;">`
    ).join('');

    // добавляем обработчик события клика на каждое изображение
    const images = galleryContainer.querySelectorAll('img');
    images.forEach(image => {
        //При клике на изображение мы получаем его индекс и используем splice для удаления этого изображения из массива catImages.
        image.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            // Удаляем изображение из массива и обновляем галерею
            catImages.splice(index, 1);
            displayGallery();
        });
    });
}

  // Добавляем обработчик события для кнопки очистки
  clearAllButton.addEventListener('click', () => {
    catImages = []; // Очищаем массив изображений
    displayGallery(); // Обновляем галерею
});

// Добавляем обработчик событий для кнопки
fetchCatButton.addEventListener('click', fetchCat);