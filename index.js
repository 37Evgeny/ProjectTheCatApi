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
        console.log(data)
        //создаем объект
        const imgUrl = {
            url:data[0].url,
            likes: 0
        }
        // Отображаем текущее изображение
        displayCat(imgUrl.url);
        // Сохраняем изображение в галерею
        catImages.push(imgUrl);
        console.log(imgUrl)
        // обновляем галерею
        displayGallery();
    } catch (error) {
        console.error('Ошибка получения изображения:', error);
    }
}

//отображаем текущее изображение
function displayCat(imgUrl) {
    catContainer.innerHTML = `<img src="${imgUrl}" alt="Cute Cat">`;
}

// функция добавления в галерею
function displayGallery() {
    // проходим по массиву объектов 
    galleryContainer.innerHTML = catImages.map((item, index) => `
        <div class="gallery-item">
            <img src="${item.url}" alt="Cat" data-index="${index}" style="max-width: 100px; margin: 5px; cursor: pointer;">
            <div class="like-button" data-index="${index}">${item.likes} ❤️</div>
        </div>
    `).join('');

    // Добавление обработчиков событий для кнопок "лайк"
    const likeButtons = galleryContainer.querySelectorAll('.like-button');
    likeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            catImages[index].likes++; // Увеличиваем количество лайков
            displayGallery(); // Обновляем галерею
        });

    });

    // добавляем обработчик события клика на каждое изображение
    const images = galleryContainer.querySelectorAll('img');
    images.forEach(image => {
        //При клике на изображение мы получаем его индекс и используем splice для удаления этого изображения из массива catImages.
        image.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            // Удаляем изображение из массива и обновляем галерею
            catImages.splice(index, 1);
             // обновляем галерею
            displayGallery();
        });
    });
}

  // Добавляем обработчик события для кнопки очистки
  clearAllButton.addEventListener('click', () => {
    catImages = []; // Очищаем массив изображений
    displayGallery(); // Обновляем галерею
});

 // function to set a given theme/color-scheme
 function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

// функция переключения темы
function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}

// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
        document.getElementById('slider').checked = false;
    } else {
        setTheme('theme-light');
      document.getElementById('slider').checked = true;
    }
})();

// Добавляем обработчик событий для кнопки
fetchCatButton.addEventListener('click', fetchCat);