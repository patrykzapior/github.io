/* ============================================================
   KONFIGURACJA SUPABASE
   Dane znajdziesz w: Settings -> API -> Project URL / anon key
   ============================================================ */
const supabaseUrl = 'https://sagwegxmvzcpfhxtosfu.supabase.co';
const supabaseKey = 'sb_publishable_K4GICQ13uODan3npC5tp3Q_pcgs6hko';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

/* ==========================
   OBSŁUGA ZAKŁADEK (TABS)
   ========================== */
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    // Resetowanie aktywnych klas
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    // Aktywacja klikniętej zakładki i jej treści
    tab.classList.add('active');
    const targetElement = document.getElementById(target);
    if (targetElement) {
        targetElement.classList.add('active');
    }
    
    // Specyficzna logika dla galerii przy przełączaniu
    if (target === 'tab-gallery') {
        odswiezGalerieSupabase();
    }
  });
});

/* ==========================
   LISTA ZAKUPÓW (LOCAL)
   ========================== */
const itemInput = document.getElementById('item-input');
const addButton = document.getElementById('add-button');
const shoppingList = document.getElementById('shopping-list');

if (addButton) {
    addButton.addEventListener('click', addItem);
    itemInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addItem();
    });
}

function addItem() {
    const text = itemInput.value.trim();
    if (text === "") return;

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${text}</span>
        <button class="delete-btn">Usuń</button>
    `;

    li.querySelector('span').addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
    });

    shoppingList.appendChild(li);
    itemInput.value = "";
}

/* ==========================================
   OBSŁUGA SUPABASE (STORAGE + DATABASE)
   ========================================== */
const photoInput = document.getElementById('photo-input');
const cloudGallery = document.getElementById('cloud-gallery');
const uploadStatus = document.getElementById('upload-status');

if (photoInput) {
    photoInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        uploadStatus.innerText = "Wysyłanie zdjęcia...";

        // 1. Wysyłanie pliku do Storage (Bucket: 'koty')
        const fileName = `${Date.now()}_${file.name}`;
        const { data: uploadData, error: uploadError } = await supabaseClient.storage
            .from('koty')
            .upload(fileName, file);

        if (uploadError) {
            console.error("Błąd Storage:", uploadError);
            uploadStatus.innerText = "Błąd wysyłania do Storage.";
            return;
        }

        // 2. Pobranie publicznego URL
        const { data: urlData } = supabaseClient.storage
            .from('koty')
            .getPublicUrl(fileName);

        const publicUrl = urlData.publicUrl;

        // 3. Zapisanie linku w tabeli 'photos'
        const { error: dbError } = await supabaseClient
            .from('photos')
            .insert([{ url: publicUrl }]);

        if (dbError) {
            console.error("Błąd Bazy Danych:", dbError);
            uploadStatus.innerText = "Błąd zapisu w bazie danych.";
        } else {
            uploadStatus.innerText = "Zdjęcie dodane!";
            odswiezGalerieSupabase(); // Odśwież galerię po dodaniu
        }
    });
}

async function odswiezGalerieSupabase() {
    if (!cloudGallery) return;

    const { data: photos, error } = await supabaseClient
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Błąd pobierania:", error);
        return;
    }

    cloudGallery.innerHTML = ""; // Czyścimy przed załadowaniem
    photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.url;
        img.className = 'main-image zoomable';
        img.alt = "Zdjęcie kota";
        
        // Podpięcie lightboxa pod nowe zdjęcia
        img.addEventListener('click', () => otworzLightbox(img.src));
        
        cloudGallery.appendChild(img);
    });
}

/* ==========================
   LIGHTBOX (POWIĘKSZANIE)
   ========================== */
const imgLightbox = document.getElementById('img-lightbox');
const imgLightboxContent = document.getElementById('img-lightbox-content');

// Obsługa statycznych zdjęć (jeśli jakieś zostały w HTML)
document.querySelectorAll('.zoomable').forEach(img => {
    img.addEventListener('click', () => otworzLightbox(img.src));
});

function otworzLightbox(src) {
    if (imgLightbox && imgLightboxContent) {
        imgLightboxContent.src = src;
        imgLightbox.style.display = 'flex';
    }
}

if (imgLightbox) {
    imgLightbox.addEventListener('click', () => {
        imgLightbox.style.display = 'none';
    });
}

/* ==========================
   INICJALIZACJA PRZY STARCIE
   ========================== */
window.onload = () => {
    odswiezGalerieSupabase();
};