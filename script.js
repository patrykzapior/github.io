/* ============================================================
   1. KONFIGURACJA USŁUG (FIREBASE + SUPABASE)
   ============================================================ */

// Dane z Firebase Console -> Project Settings
const firebaseConfig = {
  databaseURL: "https://shopping-list-cccee-default-rtdb.firebaseio.com/"
};
firebase.initializeApp(firebaseConfig);
const dbFirebase = firebase.database();
const listRef = dbFirebase.ref('shopping-list');

// Dane z Supabase -> Settings -> API
const supabaseUrl = 'https://sagwegxmvzcpfhxtosfu.supabase.co';
const supabaseKey = 'sb_publishable_K4GICQ13uODan3npC5tp3Q_pcgs6hko';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);


/* ============================================================
   2. OBSŁUGA ZAKŁADEK (TABS)
   ============================================================ */
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Pobieramy ID z atrybutu data-tab
    const targetId = tab.getAttribute('data-tab'); 
    
    if (!targetId) return; // Jeśli przycisk nie ma data-tab, nic nie rób

    // 1. Usuwamy klasę active ze wszystkich przycisków
    tabs.forEach(t => t.classList.remove('active'));
    // 2. Ukrywamy wszystkie sekcje treści
    contents.forEach(c => c.classList.remove('active'));

    // 3. Dodajemy klasę active do klikniętego przycisku
    tab.classList.add('active');
    
    // 4. Pokazujemy właściwą sekcję
    const targetContent = document.getElementById(targetId);
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    // Jeśli wejdziemy w galerię Supabase (tab6), odświeżamy zdjęcia
    if (targetId === 'tab6') {
        odswiezGalerieSupabase();
    }
  });
});

/* ============================================================
   3. LISTA ZAKUPÓW (FIREBASE REALTIME)
   ============================================================ */
const itemInput = document.getElementById('item-input');
const addButton = document.getElementById('add-button');
const shoppingList = document.getElementById('shopping-list');

// Dodawanie do Firebase
function addItem() {
    const text = itemInput.value.trim();
    if (text === "") return;
    listRef.push({ text: text, completed: false });
    itemInput.value = "";
}

if (addButton) {
    addButton.addEventListener('click', addItem);
    itemInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addItem(); });
}

// Synchronizacja z Firebase (Odbieranie danych)
listRef.on('value', (snapshot) => {
    shoppingList.innerHTML = "";
    const data = snapshot.val();
    for (let id in data) {
        const item = data[id];
        const li = document.createElement('li');
        if (item.completed) li.classList.add('completed');
        
        li.innerHTML = `
            <span>${item.text}</span>
            <button onclick="removeItem('${id}')" class="delete-btn">Usuń</button>
        `;

        li.querySelector('span').onclick = () => {
            listRef.child(id).update({ completed: !item.completed });
        };
        shoppingList.appendChild(li);
    }
});

function removeItem(id) {
    listRef.child(id).remove();
}

/* ============================================================
   4. GALERIA ZDJĘĆ (SUPABASE STORAGE + DB)
   ============================================================ */
const photoInput = document.getElementById('photo-input');
const cloudGallery = document.getElementById('cloud-gallery');
const uploadStatus = document.getElementById('upload-status');

if (photoInput) {
    photoInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        uploadStatus.innerText = "Wysyłanie zdjęcia...";

        // 1. Upload do Storage (Bucket: 'koty')
        const fileName = `${Date.now()}_${file.name}`;
        const { data: uploadData, error: uploadError } = await supabaseClient.storage
            .from('koty')
            .upload(fileName, file);

        if (uploadError) {
            uploadStatus.innerText = "Błąd: " + uploadError.message;
            return;
        }

        // 2. Pobranie URL
        const { data: urlData } = supabaseClient.storage
            .from('koty')
            .getPublicUrl(fileName);

        // 3. Zapis do bazy Supabase (Tabela: 'photos')
        const { error: dbError } = await supabaseClient
            .from('photos')
            .insert([{ url: urlData.publicUrl }]);

        if (dbError) {
            uploadStatus.innerText = "Błąd bazy danych.";
            console.error("Złapany błąd:", dbError);
        } else {
            uploadStatus.innerText = "Dodane!";
            odswiezGalerieSupabase();
        }
    });
}

async function odswiezGalerieSupabase() {
    if (!cloudGallery) return;
    const { data: photos, error } = await supabaseClient
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return;

    cloudGallery.innerHTML = "";
    photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.url;
        img.className = 'main-image zoomable';
        img.onclick = () => otworzLightbox(photo.url);
        cloudGallery.appendChild(img);
    });
}

/* ============================================================
   5. LIGHTBOX & INICJALIZACJA
   ============================================================ */
const imgLightbox = document.getElementById('img-lightbox');
const imgLightboxContent = document.getElementById('img-lightbox-content');

function otworzLightbox(src) {
    imgLightboxContent.src = src;
    imgLightbox.style.display = 'flex';
}

if (imgLightbox) {
    imgLightbox.onclick = () => imgLightbox.style.display = 'none';
}

// Obsługa kliknięć dla zdjęć statycznych w HTML
document.querySelectorAll('.zoomable').forEach(img => {
    img.addEventListener('click', () => otworzLightbox(img.src));
});

// Start
window.onload = () => {
    odswiezGalerieSupabase();
};