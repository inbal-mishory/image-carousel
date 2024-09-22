// HTML Elements
const carousel = document.querySelector('.carousel');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
const mainImage = document.querySelector(".main-image");
const mainImageTitle = document.querySelector(".main-image-title");
const carouselItemsImages = document.querySelectorAll('.carousel-item-image');

const totalItems = carouselItemsImages.length;
let currentIndex = 2;
const imageWidth = 235;


// Move Carousel items right
arrowLeft.addEventListener("click", () => {
  moveCarousel(-1);
});

// Move Carousel items left
arrowRight.addEventListener("click", () => {
  moveCarousel(1);
});

function changeMainImage(index) {
  mainImage.classList.add("fadeOutTransition");
  setTimeout(() => {
    mainImage.src = carouselItemsImages[index].src;
    mainImageTitle.innerHTML = carouselItemsImages[index].alt;
    mainImage.classList.remove("fadeOutTransition");
  }, 500);
}

function moveCarousel(direction) {
  const prevIndex = currentIndex;
  currentIndex = (currentIndex + direction + totalItems) % totalItems;
  const nextIndex = (currentIndex + (direction * 3) + totalItems) % totalItems;
  const nextCarouselItem = carouselItemsImages[nextIndex];

  carousel.style.transform = `translateX(${direction * -imageWidth}px)`;
  carousel.classList.add("sliding-transition");

  setTimeout(() => {
    carousel.style.transform = "";
    carousel.classList.remove("sliding-transition");
    setActiveImage(currentIndex);
    changeMainImage(currentIndex);
    if (direction === -1) {
      carousel.insertBefore(nextCarouselItem, carousel.firstChild);
    } else {
      carousel.appendChild(nextCarouselItem);
    }
  }, 500);
}

function setActiveImage(index) {
  carouselItemsImages.forEach(image => {
    image.classList.remove('active');
  });
  carouselItemsImages[index].classList.add('active');
}