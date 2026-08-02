// Catalog Data
const products = [
  { id: 1, name: "iPhone 15 Pro Max", category: "apple", price: 1199, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500" },
  { id: 2, name: "Samsung Galaxy S24 Ultra", category: "samsung", price: 1299, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500" },
  { id: 3, name: "iPhone 14", category: "apple", price: 699, image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=500" },
  { id: 4, name: "Samsung Galaxy Z Fold 5", category: "samsung", price: 1799, image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500" },
  { id: 5, name: "Apple AirPods Pro (2nd Gen)", category: "accessories", price: 249, image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500" },
  { id: 6, name: "Samsung Galaxy Watch 6", category: "accessories", price: 299, image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500" }
];

let cart = [];

// DOM Elements
const productGrid = document.getElementById("productGrid");
const cartDrawer = document.getElementById("cartDrawer");
const backdrop = document.getElementById("backdrop");
const openCartBtn = document.getElementById("openCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartCount = document.getElementById("cartCount");
const drawerCount = document.getElementById("drawerCount");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartTotal = document.getElementById("cartTotal");
const searchInput = document.getElementById("searchInput");
const filterBtns = document.querySelectorAll(".filter-btn");

// Render Products
function renderProducts(items) {
  productGrid.innerHTML = "";
  if (items.length === 0) {
    productGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No products found matching your search.</p>`;
    return;
  }

  items.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3 class="product-title">${product.name}</h3>
      <div class="product-price">$${product.price}</div>
      <button class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productGrid.appendChild(card);
  });
}

// Add Item to Cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  updateCartUI();
  toggleCart(true);
}

// Remove Item from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

// Update Cart Display
function updateCartUI() {
  cartCount.textContent = cart.length;
  drawerCount.textContent = cart.length;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-msg">Your cart is currently empty.</p>`;
    cartTotal.textContent = "$0.00";
    return;
  }

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";
    itemEl.innerHTML = `
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>$${item.price}</p>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${index})"><i class="fa-solid fa-trash"></i></button>
    `;
    cartItemsContainer.appendChild(itemEl);
  });

  cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Toggle Cart Visibility
function toggleCart(open) {
  if (open) {
    cartDrawer.classList.add("open");
    backdrop.classList.add("active");
  } else {
    cartDrawer.classList.remove("open");
    backdrop.classList.remove("active");
  }
}

// Filtering Logic
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    
    const cat = btn.dataset.category;
    if (cat === "all") {
      renderProducts(products);
    } else {
      renderProducts(products.filter(p => p.category === cat));
    }
  });
});

// Search Logic
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
});

// Event Listeners
openCartBtn.addEventListener("click", () => toggleCart(true));
closeCartBtn.addEventListener("click", () => toggleCart(false));
backdrop.addEventListener("click", () => toggleCart(false));

// Initialize
renderProducts(products);

