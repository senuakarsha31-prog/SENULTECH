const products = [
    // --- SMARTPHONES ---
    { 
        name: 'Samsung Galaxy S24 Ultra', 
        cat: 'Smartphones', 
        price: '$1,299', 
        status: 'In Stock', 
        tag: 'Flagship', 
        desc: '6.8-inch Dynamic AMOLED 2X, Snapdragon 8 Gen 3, Built-in S-Pen.',
        img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop' 
    },
    { 
        name: 'Apple iPhone 15 Pro Max', 
        cat: 'Smartphones', 
        price: '$1,199', 
        status: 'In Stock', 
        tag: 'Best Seller', 
        desc: 'Titanium design, A17 Pro chip, 5x Telephoto camera.',
        img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop' 
    },
    { 
        name: 'ASUS ROG Phone 8 Pro', 
        cat: 'Smartphones', 
        price: '$1,199', 
        status: 'Low Stock', 
        tag: 'Gaming Beast', 
        desc: '165Hz AMOLED display, AirTrigger controls, Snapdragon 8 Gen 3.',
        img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop' 
    },
    { 
        name: 'Google Pixel 8 Pro', 
        cat: 'Smartphones', 
        price: '$999', 
        status: 'In Stock', 
        tag: 'AI Phone', 
        desc: 'Google Tensor G3 chip, best-in-class computational photography.',
        img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop' 
    },

    // --- SMARTWATCHES ---
    { 
        name: 'Apple Watch Series 9', 
        cat: 'Smartwatches / Wearables', 
        price: '$399', 
        status: 'In Stock', 
        tag: 'Popular', 
        desc: 'S9 SiP chip, Double Tap gesture, brighter display.',
        img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop' 
    },
    { 
        name: 'Apple Watch Ultra 2', 
        cat: 'Smartwatches / Wearables', 
        price: '$799', 
        status: 'In Stock', 
        tag: 'Rugged', 
        desc: '49mm titanium case, 100m water resistance, dual-frequency GPS.',
        img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop' 
    },
    { 
        name: 'Samsung Galaxy Watch 6 Classic', 
        cat: 'Smartwatches / Wearables', 
        price: '$399', 
        status: 'In Stock', 
        tag: 'Rotating Bezel', 
        desc: 'Advanced sleep tracking, BioActive sensor, sapphire crystal glass.',
        img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop' 
    },
    { 
        name: 'Samsung Galaxy Watch 6', 
        cat: 'Smartwatches / Wearables', 
        price: '$299', 
        status: 'In Stock', 
        tag: 'Best Value', 
        desc: 'Sleek aluminum frame, body composition analysis, personalized HR zones.',
        img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop' 
    }
];

let currentCat = 'All';

function renderProducts() {
    const grid = document.getElementById('productGrid');
    const search = document.getElementById('searchInput').value.toLowerCase();
    grid.innerHTML = '';

    products.filter(p => {
        const matchesCat = currentCat === 'All' || p.cat === currentCat;
        const matchesSearch = p.name.toLowerCase().includes(search) || p.desc.toLowerCase().includes(search);
        return matchesCat && matchesSearch;
    }).forEach(p => {
        grid.innerHTML += `
            <div class="card">
                <div class="card-img-wrapper">
                    <img src="${p.img}" alt="${p.name}" class="card-img" />
                    <span class="card-tag tag-offer">${p.tag}</span>
                </div>
                <div class="card-body">
                    <h3>${p.name}</h3>
                    <p>${p.desc}</p>
                </div>
                <div>
                    <span class="card-tag tag-stock">${p.status}</span>
                    <div class="price-row">
                        <span class="price">${p.price}</span>
                        <button class="btn-buy" onclick="openModal('${p.name}', '${p.price}')">Buy Now</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function selectCategory(cat, btn) {
    currentCat = cat;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts();
}

function filterProducts() { 
    renderProducts(); 
}

function openModal(name, price) {
    document.getElementById('checkoutProduct').innerText = `Item: ${name} (${price})`;
    document.getElementById('checkoutModal').style.display = 'flex';
}

function closeModal() { 
    document.getElementById('checkoutModal').style.display = 'none'; 
}

function handlePayment(e) {
    e.preventDefault();
    alert('⚡ Payment Successful! Order confirmed.');
    closeModal();
}

renderProducts();
