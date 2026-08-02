const products = [
    { name: 'Quantum Phone Pro', cat: 'Smartphones', price: '$999', status: 'In Stock', tag: 'Special Offer', desc: '6.7-inch OLED 120Hz display with Neural Chipset.' },
    { name: 'Nebula Fold X', cat: 'Smartphones', price: '$1,499', status: 'In Stock', tag: 'New Arrival', desc: 'Flexible AMOLED dual screen gadget.' },
    { name: 'Pulse Lite 5G', cat: 'Smartphones', price: '$399', status: 'Low Stock', tag: 'In Stock', desc: 'Affordable high-speed 5G mobile.' },
    { name: 'TitanBlade RTX Rig', cat: 'Laptops', price: '$2,499', status: 'In Stock', tag: 'Special Offer', desc: 'Intel i9, RTX 4090, 32GB RAM powerhouse.' },
    { name: 'CyberBook Air M3', cat: 'Laptops', price: '$1,199', status: 'In Stock', tag: 'New Arrival', desc: 'Ultra-thin carbon fiber chassis.' },
    { name: 'MatrixStation Pro', cat: 'Laptops', price: '$3,299', status: 'Pre-Order', tag: 'New Arrival', desc: 'Dual-screen workstation for creators.' },
    { name: 'SonicPulse ANC', cat: 'Audio & Headphones', price: '$249', status: 'In Stock', tag: 'Special Offer', desc: 'Spatial audio with 40h battery life.' },
    { name: 'NeuralEars TWS', cat: 'Audio & Headphones', price: '$179', status: 'In Stock', tag: 'In Stock', desc: 'Active Noise Canceling wireless earbuds.' },
    { name: 'ChronoX Cyber Watch', cat: 'Smartwatches / Wearables', price: '$349', status: 'In Stock', tag: 'New Arrival', desc: 'Titanium bezel with biometric tracking.' },
    { name: 'HoloVisor AR', cat: 'Smartwatches / Wearables', price: '$799', status: 'Pre-Order', tag: 'Special Offer', desc: 'Heads-up display augmented reality glasses.' },
    { name: 'HyperClick RGB Board', cat: 'Gaming Accessories', price: '$149', status: 'In Stock', tag: 'In Stock', desc: 'Hot-swappable mechanical gaming keyboard.' },
    { name: 'PrecisionAim Wireless', cat: 'Gaming Accessories', price: '$89', status: 'In Stock', tag: 'In Stock', desc: '26k DPI optical sensor mouse.' }
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
                <div>
                    <span class="card-tag tag-offer">${p.tag}</span>
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

// Initial render call when script loads
renderProducts();
