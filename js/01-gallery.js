import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector(".gallery");
const galleryMarkup = createGallery(galleryItems);
gallery.insertAdjacentHTML("beforeend", galleryMarkup);

function createGallery(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>
      `;
    })
    .join("");
}

gallery.addEventListener("click", onGalleryItemClick);

function onGalleryItemClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== "IMG") {
    return;
  }

  const largeImageUrl = evt.target.dataset.source;

  const instance = basicLightbox.create(
    `<img src="${largeImageUrl}" width="800" height="600" style="border-radius: 10px;">`,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", (evt) => {
          if (evt.code === "Escape") {
            instance.close();
          }
        });
      },
      onClose: (instance) => {
        document.removeEventListener("keydown", (evt) => {
          if (evt.code === "Escape") {
            instance.close();
          }
        });
      },
    }
  );

  instance.show();
}
