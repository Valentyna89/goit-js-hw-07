import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector(".gallery");

const imageList = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<div class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src='${preview}'
      data-source='${original}'
      alt='${description}'
    />
  </a>
</div>`
  )
  .join("");

gallery.insertAdjacentHTML("afterbegin", imageList);

gallery.addEventListener("click", showImage);

function showImage(e) {
  e.preventDefault();

  const isImg = e.target.classList.contains("gallery__image");

  if (!isImg) {
    return;
  }

  const instance = basicLightbox.create(
    `
    <img src="${e.target.dataset.source}" width='800' height="600">
`,
    {
      onShow: (instance) => window.addEventListener("keydown", onCloseImg),
      onClose: (instance) => window.removeEventListener("keydown", onCloseImg),
    }
  );
  instance.show();

  function onCloseImg(e) {
    if (e.code === "Escape") {
      instance.close();
    }
  }
}
