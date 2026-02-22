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
/*
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
*/
// Konfiguracja Firebase (dane weźmiesz z ustawień projektu w Firebase)
const firebaseConfig = {
  databaseURL: "https://shopping-list-cccee-default-rtdb.firebaseio.com/" 
};

// Inicjalizacja
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const listRef = database.ref('shopping-list');

// ELEMENTY DOM
const itemInput = document.getElementById('item-input');
const addButton = document.getElementById('add-button');
const shoppingList = document.getElementById('shopping-list');

// 1. WYSYŁANIE DO BAZY
function addItem() {
  const text = itemInput.value.trim();
  if (text === "") return;

  // Push tworzy unikalne ID dla każdego przedmiotu
  listRef.push({
    text: text,
    completed: false
  });

  itemInput.value = "";
}

// 2. ODBIERANIE Z BAZY (Działa automatycznie na wszystkich urządzeniach!)
listRef.on('value', (snapshot) => {
  shoppingList.innerHTML = ""; // Czyścimy listę przed odświeżeniem
  const data = snapshot.val();

  for (let id in data) {
    const item = data[id];
    const li = document.createElement('li');
    if (item.completed) li.classList.add('completed');

    li.innerHTML = `
      <span>${item.text}</span>
      <button onclick="removeItem('${id}')" class="delete-btn">Usuń</button>
    `;

    // Zmiana statusu kupione/niekupione
    li.querySelector('span').onclick = () => {
      listRef.child(id).update({ completed: !item.completed });
    };

    shoppingList.appendChild(li);
  }
});

// 3. USUWANIE Z BAZY
function removeItem(id) {
  listRef.child(id).remove();
}

addButton.addEventListener('click', addItem);