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

// OBSŁUGA LISTY ZAKUPÓW
const itemInput = document.getElementById('item-input');
const addButton = document.getElementById('add-button');
const shoppingList = document.getElementById('shopping-list');

// Funkcja dodawania elementu
function addItem() {
  const text = itemInput.value.trim();
  if (text === "") return;

  const li = document.createElement('li');
  li.innerHTML = `
    <span>${text}</span>
    <button class="delete-btn">Usuń</button>
  `;

  // Kliknięcie w tekst oznacza "kupione" (przekreślenie)
  li.querySelector('span').addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  // Przycisk usuwania
  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
  });

  shoppingList.appendChild(li);
  itemInput.value = ""; // wyczyść pole
}

// Reaguj na przycisk i klawisz Enter
addButton.addEventListener('click', addItem);
itemInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addItem();
});