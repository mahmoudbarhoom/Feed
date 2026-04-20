// script.js - Animal Feed Marketing System

// ====================== بيانات المنتجات ======================
const products = [
  {
    id: 1,
    name: "علف برويلر ستارتر",
    category: "duajn",
    price: 18500,
    unit: "طن",
    image: "https://m.media-amazon.com/images/I/71gj7LCFtCL._AC_UF1000,1000_QL80_.jpg",
    description: "علف بادئ للدواجن البرويلر - جودة ممتازة"
  },
  {
    id: 2,
    name: "علف برويلر نامي",
    category: "duajn",
    price: 17200,
    unit: "طن",
    image: "https://alzira3a.com/wp-content/uploads/2021/12/%D8%A7%D8%B9%D9%84%D8%A7%D9%81-%D8%AF%D9%88%D8%A7%D8%AC%D9%86.jpg",
    description: "علف نامي للدواجن البرويلر"
  },
  {
    id: 3,
    name: "علف أبقار محلبات",
    category: "cows",
    price: 14500,
    unit: "طن",
    image: "https://almaraai-alhadeetha.com/wp-content/uploads/2022/12/Dairy-Feed-16-Pellet-50-KG-1.jpg",
    description: "علف مركز للأبقار المحلبات"
  },
  {
    id: 4,
    name: "علف أغنام وماعز",
    category: "sheep",
    price: 12800,
    unit: "طن",
    image: "https://cdn.wikifarmer.com/images/detailed/2017/07/Feeding-Sheep-Ar.jpg",
    description: "علف كامل للأغنام والماعز"
  },
  {
    id: 5,
    name: "علف أسماك عائم",
    category: "fish",
    price: 23500,
    unit: "طن",
    image: "https://gate.ahram.org.eg/Media/News/2022/4/28/19_2022-637867438813546731-354.jpg",
    description: "علف أسماك عالي البروتين"
  },
  {
    id: 6,
    name: "علف لاير (بياض)",
    category: "duajn",
    price: 16800,
    unit: "طن",
    image: "https://media.egyin.com/2024/8/large/1753163556463420240822092808288.jpg",
    description: "علف خاص للدجاج البياض"
  }
];

// ====================== إدارة السلة ======================
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// حفظ السلة
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

// تحديث عدد المنتجات في السلة
function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    countEl.textContent = totalItems;
  }
}

// إضافة منتج إلى السلة
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCart();
  alert(`تم إضافة ${product.name} إلى السلة`);
}

// عرض المنتجات في الصفحة الرئيسية (Trending)
function displayTrendingProducts() {
  const container = document.getElementById('trending-products');
  if (!container) return;

  container.innerHTML = '';

  products.forEach(product => {
    const card = `
      <div class="col-md-4 col-lg-3">
        <div class="card product-card h-100">
          <img src="${product.image}" class="card-img-top" height="180" style="object-fit: cover;">
          <div class="card-body d-flex flex-column">
            <h6 class="card-title">${product.name}</h6>
            <p class="text-success fw-bold">${product.price.toLocaleString()} جنيه / ${product.unit}</p>
            <p class="card-text small text-muted">${product.description}</p>
            <button onclick="addToCart(${product.id})" class="btn btn-success mt-auto">
              <i class="fas fa-cart-plus"></i> أضف إلى السلة
            </button>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });
}

// عرض جميع المنتجات في صفحة products.html
function displayAllProducts() {
  const container = document.getElementById('products-list');
  if (!container) return;

  container.innerHTML = '';

  products.forEach(product => {
    const card = `
      <div class="col-md-6 col-lg-4">
        <div class="card product-card h-100">
          <img src="${product.image}" class="card-img-top" height="200" style="object-fit: cover;">
          <div class="card-body">
            <h5>${product.name}</h5>
            <p class="text-success fw-bold fs-5">${product.price.toLocaleString()} جنيه / ${product.unit}</p>
            <p class="text-muted">${product.description}</p>
            <button onclick="addToCart(${product.id})" class="btn btn-success w-100">
              أضف إلى السلة
            </button>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });
}

// عرض محتوى السلة في cart.html
function displayCart() {
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('total-price');
  if (!container) return;

  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = `<div class="col-12 text-center py-5"><h4>السلة فارغة</h4></div>`;
    if (totalEl) totalEl.textContent = '0';
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItem = `
      <div class="col-12 mb-3">
        <div class="card">
          <div class="card-body d-flex align-items-center">
            <img src="${item.image}" width="80" height="80" style="object-fit: cover; border-radius: 8px;">
            <div class="ms-3 flex-grow-1">
              <h6>${item.name}</h6>
              <p class="mb-1">${item.price.toLocaleString()} جنيه / ${item.unit}</p>
              <div class="d-flex align-items-center gap-2">
                <button onclick="changeQuantity(${index}, -1)" class="btn btn-sm btn-outline-secondary">-</button>
                <span class="fw-bold px-3">${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)" class="btn btn-sm btn-outline-secondary">+</button>
                <span class="text-muted ms-3">${item.unit}</span>
              </div>
            </div>
            <div class="text-end">
              <p class="fw-bold mb-1">${itemTotal.toLocaleString()} جنيه</p>
              <button onclick="removeFromCart(${index})" class="btn btn-sm btn-danger">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += cartItem;
  });

  if (totalEl) totalEl.textContent = total.toLocaleString() + ' جنيه';
}

// تغيير الكمية
function changeQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity < 1) cart[index].quantity = 1;
  saveCart();
  displayCart();
}

// حذف منتج من السلة
function removeFromCart(index) {
  if (confirm('هل تريد حذف هذا المنتج من السلة؟')) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
  }
}

// تهيئة الصفحة حسب الصفحة الحالية
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  if (document.getElementById('trending-products')) {
    displayTrendingProducts();
  }

  if (document.getElementById('products-list')) {
    displayAllProducts();
  }

  if (document.getElementById('cart-items')) {
    displayCart();
  }
});
