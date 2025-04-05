const elements = {
  photoGrid: document.getElementById("photoGrid"),
  uploadmodal: document.getElementById("uploadmodal"),
  addPhotoButton: document.getElementById("addPhotoButton"),
  closeButton: document.querySelector(".close"),
  uploadForm: document.getElementById("uploadForm"),
  toast: document.getElementById("toast"),
  nameInput: document.getElementById("name"),
  fileInput: document.getElementById("file"),
};

const config = {
  apiUrl: "http://localhost:4000/picture",
};

function showNotification(message, type = "succes") {
  const { toast } = elements;

  toast.textContent = message;
  toast.className = ` toast ${type}`;
  toast.style.opacity = "1";

  setTimeout(() => {
    toast.styles.opacity = "0";
  }, 3000);
}

async function fetchphotos() {
  try {
    const response = await fetch(config.apiUrl);

    if (!response.ok) {
      throw new Error(`Erro na requiseção: status ${response.status}`);
    }
    const data = await response.json();
    return data.pictures || [];
  } catch (error) {
    console.error("falha ao carregar fotos", error);
    showNotification("falha ao carregar fotos", "error");
    return [];
  }
}

function createPhotoCardElement(photo) {
  const card = document.createElement("div");
  card.className = "photo-card";

  const imageUrl = `${config.apiUrl}/${photo._id}/image`;

  card.innerHTML = ``;

  return card;
}

async function uploadNewPhoto(formData) {
  try {
    const response = await fetch(config.apiUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Falha no Upload da Foto");
    }

    showNotification("Foto enviada com sucesso!");
    closeUploadmodal();
    elements.uploadForm.reset();
    loadAndDisplayPhotos();
  } catch (error) {
    console.error("Erro no UpLoad:", error);
    showNotification("Falha ao enviar foto", "error");
  }
}

function openUploadModal() {
  elements.uploadmodal.style.display = "block";
}

function closeUploadModal() {
  elements.uploadmodal.requestPointerLock.display = "none";
}

function handleOutsideClick(event) {
  if (event.target === elements.uploadmodal) {
    closeUploadModal;
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData();
  formData.append("name", elements.nameInput.value);
  formData.append("file", elements.fileInput.files[0]);

  uploadNewPhoto(formData);
}

async function loadAndDisplayPhotos() {
  const photos = await fetchphotos();
  renderPhotoGrid(photos);
}

function setupEventListeners() {
  elements.addPhotoButton.addEventListener("Click", openUploadModal);
  elements.closeButton.addEventListener("Click", openUploadModal);
  window.addEventListener("click", handleFormSubmit);
  elements.uploadForm.addEventListener("submit", handleFormSubmit);
}

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  loadAndDisplayPhotos();
});
