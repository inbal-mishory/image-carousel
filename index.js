// HTML Elements
const carousel = document.querySelector('.carousel');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
const mainImage = document.querySelector(".main-image");
const mainImageTitle = document.querySelector(".main-image-title");
const carouselItemsImages = document.querySelectorAll('.carousel-item-image');


const totalItems = carouselItemsImages.length;
let currentIndex = 0;
let prevIndex;
let nextIndex;

const imageWidth = 235;

// Add event listeners to carousel items
carouselItemsImages.forEach(image => {
  image.addEventListener("click", () => {
    const imageIndex = parseFloat(image.id);

    changeMainImage(imageIndex);

    if (imageIndex > currentIndex) {
      carouselGoBack(imageIndex); 
    } else {
      carouselGoForward(imageIndex);
    }
  })
})

// Move Carousel items right
arrowLeft.addEventListener("click", () => {
  carouselGoForward();
});

// Move Carousel items left
arrowRight.addEventListener("click", () => {
  carouselGoBack();
});

function changeMainImage(index) {
  mainImage.classList.add("fadeOutTransition");

  setTimeout(() => {
    mainImage.src = carouselItemsImages[index].src;
    mainImageTitle.innerHTML = carouselItemsImages[index].alt;
    mainImage.classList.remove("fadeOutTransition");
  }, 500)
}

function carouselGoForward(index = currentIndex) {
  prevIndex = index;
  currentIndex = (index - 1 + totalItems) % totalItems;
  const currentCarouselItem = carouselItemsImages[currentIndex];
  const prevCarouselItem = carouselItemsImages[prevIndex];

  // Carousel image shift
  carousel.style.transform = `translateX(-${imageWidth}px)`;
  currentCarouselItem.classList.add("fading-transition");

  carousel.insertBefore(currentCarouselItem, carousel.firstChild);

  setTimeout(() => {
    carousel.style.transform = "";
    carousel.classList.add("sliding-transition");
    currentCarouselItem.classList.add('active');
    // Load new main image and text
    changeMainImage(currentIndex);
  }, 10);

  setTimeout(() => {
    carousel.classList.remove("sliding-transition");
    currentCarouselItem.classList.remove("fading-transition");
    prevCarouselItem.classList.remove('active');
  }, 490);
}

function carouselGoBack(index = currentIndex) {
  prevIndex = index;
  currentIndex = (index + 1) % totalItems;
  const currentCarouselItem = carouselItemsImages[currentIndex];
  const prevCarouselItem = carouselItemsImages[prevIndex];

  // Carousel image shift
  carousel.classList.add("sliding-transition");

  changeMainImage(currentIndex);

  carousel.style.transform = `translateX(-${imageWidth}px)`;

  setTimeout(() => {
    currentCarouselItem.classList.add('active');
    prevCarouselItem.classList.remove('active');
    carousel.appendChild(prevCarouselItem);
    carousel.classList.remove("sliding-transition");
    carousel.style.transform = "";
  }, 500);
}