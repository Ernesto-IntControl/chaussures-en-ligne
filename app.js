AOS.init();

const shoes = [];
for (let i = 1; i <= 20; i++) {
  shoes.push({
    id: i,
    name: `Chaussure ${i}`,
    category: i % 3 === 0 ? 'Homme' : (i % 3 === 1 ? 'Femme' : 'Sport'),
    image: `images/chs${i}.jpg`,
    price: 20 + i,
    description: `Description détaillée pour la chaussure ${i}. Confortable et stylée.`,
    promo: i % 5 === 0
  });
}

let cartCount = 0;
const container = document.getElementById('shoesContainer');
const cartBadge = document.getElementById('cartCount');

function renderShoes(list) {
  container.innerHTML = '';
  list.forEach(shoe => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.setAttribute('data-aos', 'fade-up');
    col.innerHTML = `
      <div class="card shadow-sm position-relative">
        ${shoe.promo ? '<span class="badge-promo">Promo</span>' : ''}
        <img src="${shoe.image}" class="card-img-top" alt="${shoe.name}" onclick="openLightbox('${shoe.image}')">
        <div class="card-body">
          <h5 class="card-title">${shoe.name}</h5>
          <p class="fw-bold text-primary">${shoe.price} $</p>
          <button class="btn btn-primary" onclick="toggleDetails(${shoe.id})">+ Détails</button>
          <button class="btn btn-outline-success ms-2" onclick="addToCart()">Ajouter au panier</button>
          <span class="favorite ms-2" onclick="toggleFavorite(this)">&#10084;</span>
          <div class="card-details" id="details-${shoe.id}">
            <p class="mt-2">${shoe.description}</p>
          </div>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

function toggleDetails(id) {
  const details = document.getElementById(`details-${id}`);
  details.style.display = (details.style.display === 'block') ? 'none' : 'block';
}

function addToCart() {
  cartCount++;
  cartBadge.textContent = cartCount;
}

function toggleFavorite(el) {
  el.classList.toggle('active');
}

function openLightbox(imgSrc) {
  const lightbox = document.createElement('div');
  lightbox.style.position = 'fixed';
  lightbox.style.top = '0';
  lightbox.style.left = '0';
  lightbox.style.width = '100%';
  lightbox.style.height = '100%';
  lightbox.style.background = 'rgba(0,0,0,0.8)';
  lightbox.style.display = 'flex';
  lightbox.style.alignItems = 'center';
  lightbox.style.justifyContent = 'center';
  lightbox.innerHTML = `<img src="${imgSrc}" style="max-width:90%; max-height:90%;">`;
  lightbox.onclick = () => document.body.removeChild(lightbox);
  document.body.appendChild(lightbox);
}

// Filtre catégorie
document.querySelectorAll('.dropdown-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const cat = item.getAttribute('data-category');
    if (cat === 'all') {
      renderShoes(shoes);
    } else {
      const filtered = shoes.filter(shoe => shoe.category === cat);
      renderShoes(filtered);
    }
  });
});

// Recherche
document.getElementById('searchForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const query = document.getElementById('searchInput').value.toLowerCase();
  const results = shoes.filter(shoe => shoe.name.toLowerCase().includes(query));
  renderShoes(results);
});

// Tri
document.getElementById('sortSelect').addEventListener('change', (e) => {
  const value = e.target.value;
  let sorted = [...shoes];
  if (value === 'asc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (value === 'desc') {
    sorted.sort((a, b) => b.price - a.price);
  }
  renderShoes(sorted);
});

// Initial render
renderShoes(shoes);
