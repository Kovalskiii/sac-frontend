const chooseFileBtn = document.getElementById('uploadImage');
const fileChosen = document.getElementById('selectedImage');

chooseFileBtn.addEventListener('change', (e) => {
  if (chooseFileBtn.files[0]) {
    fileChosen.textContent = chooseFileBtn.files[0].name
  }
  else {
    fileChosen.textContent = "Image not selected";
  }
})
