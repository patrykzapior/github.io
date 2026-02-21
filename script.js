const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    // reset
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    // aktywuj klikniętą
    tab.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});

const zoomableImages = document.querySelectorAll('.zoomable');
const imgLightbox = document.getElementById('img-lightbox');
const imgLightboxContent = document.getElementById('img-lightbox-content');

zoomableImages.forEach(img => {
  img.addEventListener('click', () => {
    imgLightboxContent.src = img.src; // TEN SAM PLIK
    imgLightbox.style.display = 'flex';
  });
});

imgLightbox.addEventListener('click', () => {
  imgLightbox.style.display = 'none';
});