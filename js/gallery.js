const images = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

//Створення розмітки елементів

const galleryEl = document.querySelector(".gallery");

//Зверни увагу на те, що зображення огорнуте посиланням,
// у якого атрибут href вказує на шлях до файлу з зображенням.
//  Отже клік по ньому може викликати завантаження зображення на
//  комп’ютер користувача. Заборони цю поведінку за замовчуванням.

galleryEl.addEventListener("click", handleLinkClick);

function handleLinkClick(e) {
  if (!e.target.closest(".gallery-link")) {
    return;
  }

  e.preventDefault();
}

//продовжуєм створювати розмітку (за допомогою 3 функцій)

function imageTemplate(image) {
  return `<li class="gallery-item">
  <a class="gallery-link" href="${image.original}">
    <img
      class="gallery-image"
      src="${image.preview}"
      data-source="${image.original}"
      alt="${image.description}"
    />
  </a>
</li>`;
}

function imagesTemplate(images) {
  return images.map(imageTemplate).join("");
}

function renderImages() {
  const markup = imagesTemplate(images);
  galleryEl.innerHTML = markup;
}

renderImages();

//5 - Делегування

galleryEl.addEventListener("click", handleItemClick);

function handleItemClick(e) {
  if (!e.target.closest(".gallery-item")) {
    return;
  }

  const imageEl = e.target.closest(".gallery-item").querySelector("img");
  const largeImageUrl = imageEl.getAttribute("data-source");

  openModal(largeImageUrl);
}

//Modal window create

//Створити змінну instance в глобальній зоні видимості, щоб використовувати далі в коді
let instance;

//функція для відкриття модалки
function openModal(largeImageUrl) {
  //код взятий з сайту бібліотеки basic light box
  instance = basicLightbox.create(
    `
    <img src="${largeImageUrl}" width="800" height="600">
`,

    //об'єкт з додатковими властивостями basic light box
    {
      onShow: (instance) => {
        document.addEventListener("keydown", handleCloseModal);
      },
      onClose: (instance) => {
        document.removeEventListener("keydown", handleCloseModal);
      },
    }
  );

  //метод відкриття модалки
  instance.show();
}

//функція для закриття модалки
function closeModal() {
  //метод закриття модалки
  instance.close();
}

function handleCloseModal(e) {
  if (e.code === "Escape") {
    closeModal();
  }
}
