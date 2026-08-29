// =============================================
// STEP 1: CART DRAWER TOGGLE
// =============================================
const cartIcon = document.getElementById('cartIcon');
const cartDrawer = document.getElementById('cartDrawer');
const overlay = document.getElementById('overlay');
const closeCartBtn = document.getElementById('closeCartBtn');

function openCart() {
    cartDrawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeCart() {
    cartDrawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}
cartIcon.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCart();
});

// =============================================
// STEP 2: DYNAMIC HERO TAGLINE
// =============================================
const taglines = [
    "Express yourself. Wear your vibe.",
    "Style that speaks for you.",
    "Be bold. Be you. Shop now.",
    "Discover fashion that fits your soul."
];
let currentIndex = 0;
const taglineElement = document.getElementById('heroTagline');

function rotateTagline() {
    if (!taglineElement) return;
    taglineElement.style.opacity = '0';
    setTimeout(() => {
        taglineElement.textContent = taglines[currentIndex];
        taglineElement.style.opacity = '1';
        currentIndex = (currentIndex + 1) % taglines.length;
    }, 400);
}
setInterval(rotateTagline, 5000);
rotateTagline();

// =============================================
// STEP 3: PRODUCT DATA (with descriptions)
// =============================================
const products = [{
    id: 1,
    name: 'iPhone 15 pro max',
    category: 'Phones',
    price: 1199.00,
    rating: 4.8,
    reviews: 120,
    image: 'https://picsum.photos/seed/1/400/400',
    inStock: true,
    description: 'Latest flagship with titanium frame, A17 chip, and 48MP camera.'
}, {
    id: 2,
    name: 'MacBook Air M3',
    category: 'Laptops',
    price: 1099.00,
    rating: 4.6,
    reviews: 105,
    image: 'https://picsum.photos/seed/2/400/400',
    inStock: true,
    description: 'Ultra-slim laptop with 13-inch Liquid Retina display and all-day battery.'
}, {
    id: 3,
    name: 'Samsung Galaxy Tab S9',
    category: 'Tablets',
    price: 799.99,
    rating: 4.9,
    reviews: 204,
    image: 'https://picsum.photos/seed/3/400/400',
    inStock: true,
    description: 'Premium Android tablet with S Pen, 11-inch AMOLED screen, and DeX support.'
}, {
    id: 4,
    name: 'Wireless Charging Pad',
    category: 'Accessories',
    price: 29.99,
    rating: 4.3,
    reviews: 45,
    image: 'https://picsum.photos/seed/4/400/400',
    inStock: true,
    description: 'Fast Qi-compatible charger for all Qi-enabled devices. LED indicator included.'
}, {
    id: 5,
    name: 'Dell XPS 16',
    category: 'Laptops',
    price: 1499.99,
    rating: 4.4,
    reviews: 147,
    image: 'https://picsum.photos/seed/5/400/400',
    inStock: true,
    description: '16-inch ultrabook with Intel Core Ultra 9, 4K OLED touchscreen, and long battery life.'
}, {
    id: 6,
    name: 'Apple Watch Ultra 2',
    category: 'Smartwatches',
    price: 799.00,
    rating: 4.9,
    reviews: 270,
    image: 'https://picsum.photos/seed/6/400/400',
    inStock: true,
    description: 'Rugged smartwatch with precise GPS, 49mm display, and advanced health sensors.'
}, {
    id: 7,
    name: 'Google Pixel Fold',
    category: 'Phones',
    price: 1799.00,
    rating: 4.8,
    reviews: 106,
    image: 'https://picsum.photos/seed/7/400/400',
    inStock: false,
    description: 'Foldable phone with 7.6-inch inner screen, Tensor G2, and pure Android experience.'
}, {
    id: 8,
    name: 'USB-C Hub 7-in-1',
    category: 'Accessories',
    price: 39.99,
    rating: 4.0,
    reviews: 78,
    image: 'https://picsum.photos/seed/8/400/400',
    inStock: true,
    description: 'Expand your laptop with HDMI, USB 3.0, SD card slot, and power delivery pass-through.'
}, {
    id: 9,
    name: 'Galaxy Watch 6 Classic',
    category: 'Smartwatches',
    price: 399.00,
    rating: 4.7,
    reviews: 198,
    image: 'https://picsum.photos/seed/9/400/400',
    inStock: true,
    description: 'Elegant atainless steel watch with rotating bezel, advanced sleep tracking, and ECG.'
}];

// =============================================
// STEP 4: FILTER, SORT & SEARCH LOGIC
// =============================================
const searchInput = document.getElementById('searchInput');
const categoryCheckboxes = document.querySelectorAll('.sidebar input[type="checkbox"]');
const priceSlider = document.querySelector('.price-slider');
const priceRangeText = document.querySelector('.price-range-text');
const sortSelect = document.querySelector('.sort-select');
const productGrid = document.getElementById('productGrid');

function getFilteredProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const activeCategories = [];
    categoryCheckboxes.forEach(cb => {
        if (cb.checked) activeCategories.push(cb.value);
    });
    const maxPrice = parseFloat(priceSlider.value);

    let filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = activeCategories.length === 0 || activeCategories.includes(product.category);
        const matchesPrice = product.price <= maxPrice;
        return matchesSearch && matchesCategory && matchesPrice;
    });

    const sortBy = sortSelect.value;
    if (sortBy === 'price-low-high') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high-low') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-high') {
        filtered.sort((a, b) => b.rating - a.rating);
    }
    return filtered;
}

function updatePriceDisplay() {
    if (priceRangeText) {
        const spans = priceRangeText.querySelectorAll('span');
        if (spans.length >= 2) {
            spans[1].textContent = `$${priceSlider.value}`;
        }
    }
}

function attachFilterEvents() {
    searchInput.addEventListener('input', () => {
        renderProducts(getFilteredProducts());
    });
    categoryCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            renderProducts(getFilteredProducts());
        });
    });
    priceSlider.addEventListener('input', () => {
        updatePriceDisplay();
        renderProducts(getFilteredProducts());
    });
    sortSelect.addEventListener('change', () => {
        renderProducts(getFilteredProducts());
    });
}

// =============================================
// STEP 5: CART LOGIC (with LocalStorage)
// =============================================
let cart = [];
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const cartCountBadge = document.getElementById('cartCount');

function loadCart() {
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    } else {
        cart = [];
    }
    updateCart();
}

function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function updateCart() {
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-bag" style="font-size: 48px; color: #ddd;"></i>
                <p style="margin-top: 12px;">Cart is empty. Start shopping!</p>
            </div>
        `;
        if (cartTotalElement) cartTotalElement.textContent = '$0.00';
    } else {
        let html = '';
        let total = 0;
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            html += `
                <div class="cart-item" data-index="${index}" style="display: flex; align-items: center; gap: 12px; padding: 8px 0;">
                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;" />
                    <div style="flex: 1;">
                        <div style="font-weight: 600; font-size: 14px;">${item.name}</div>
                        <div style="color: var(--gray); font-size: 13px;">$${item.price.toFixed(2)}</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <button class="qty-btn" data-id="${item.id}" data-delta="-1" style="width: 28px; height: 28px; border-radius: 50%; border: 1px solid var(--light-gray); background: transparent; cursor: pointer; font-weight: 700;">−</button>
                        <span style="min-width: 20px; text-align: center; font-weight: 600;">${item.quantity}</span>
                        <button class="qty-btn" data-id="${item.id}" data-delta="1" style="width: 28px; height: 28px; border-radius: 50%; border: 1px solid var(--light-gray); background: transparent; cursor: pointer; font-weight: 700;">+</button>
                        <button class="remove-btn" data-id="${item.id}" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 20px; margin-left: 4px;">&times;</button>
                    </div>
                </div>
            `;
        });
        cartItemsContainer.innerHTML = html;
        if (cartTotalElement) {
            cartTotalElement.textContent = `$${total.toFixed(2)}`;
        }
    }

    if (cartCountBadge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountBadge.textContent = totalItems;
    }
    saveCart();

    // Update quantity displays on product cards
    document.querySelectorAll('.qty-display').forEach(el => {
        const id = parseInt(el.dataset.id);
        const cartItem = cart.find(item => item.id === id);
        el.textContent = cartItem ? cartItem.quantity : 0;
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.inStock) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    updateCart();
    showToast(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function changeQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    const newQuantity = item.quantity + delta;
    if (newQuantity <= 0) {
        removeFromCart(productId);
    } else {
        item.quantity = newQuantity;
        updateCart();
    }
}

// Toast Notification
function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: var(--text);
            color: var(--bg);
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            box-shadow: 0 8px 24px rgba(0,0,0,0.2);
            z-index: 9999;
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
            white-space: nowrap;
        `;
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 2000);
}

// =============================================
// STEP 6: RENDER PRODUCTS (with data-id and qty display)
// =============================================
function renderProducts(productArray) {
    if (!productGrid) return;
    productGrid.innerHTML = '';

    if (productArray.length === 0) {
        productGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--gray);">
            <i class="fas fa-search" style="font-size: 48px; display: block; margin-bottom: 12px;"></i>
            No products found. Try adjusting your filters.
        </div>`;
        return;
    }

    productArray.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const cartItem = cart.find(item => item.id === product.id);
        const qty = cartItem ? cartItem.quantity : 0;

        const stockStatus = product.inStock ? `
            <div class="qty-selector" style="display: flex; align-items: center; gap: 10px; margin: 8px 0;">
                <button class="qty-btn" data-id="${product.id}" data-delta="-1" style="width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--light-gray); background: var(--white); cursor: pointer; font-weight: 700; color: var(--text);">−</button>
                <span class="qty-display" data-id="${product.id}" style="min-width: 28px; text-align: center; font-weight: 600; font-size: 16px;">${qty}</span>
                <button class="qty-btn" data-id="${product.id}" data-delta="1" style="width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--light-gray); background: var(--white); cursor: pointer; font-weight: 700; color: var(--text);">+</button>
            </div>
            <button class="btn-add" data-id="${product.id}">Add to Cart</button>
        ` : `<button class="btn-add" disabled>Out of Stock</button>`;

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" data-id="${product.id}" style="cursor: pointer;" />
            <div class="product-info">
                <span class="category-tag">${product.category}</span>
                <div class="name">${product.name}</div>
                <div class="rating">⭐ ${product.rating} (${product.reviews})</div>
                <div class="price">$${product.price.toFixed(2)}</div>
                ${stockStatus}
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// =============================================
// STEP 7: PRODUCT QUICK VIEW MODAL
// =============================================
const modalOverlay = document.getElementById('productModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalImg = document.getElementById('modalImg');
const modalCategory = document.getElementById('modalCategory');
const modalName = document.getElementById('modalName');
const modalRating = document.getElementById('modalRating');
const modalPrice = document.getElementById('modalPrice');
const modalDescription = document.getElementById('modalDescription');
const modalAddBtn = document.getElementById('modalAddBtn');
let currentModalProductId = null;

function openModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    currentModalProductId = productId;

    modalImg.src = product.image;
    modalImg.alt = product.name;
    modalCategory.textContent = product.category;
    modalName.textContent = product.name;
    modalRating.textContent = `⭐ ${product.rating} (${product.reviews} reviews)`;
    modalPrice.textContent = `$${product.price.toFixed(2)}`;
    modalDescription.textContent = product.description || "Premium quality product crafted with care. Perfect for your everyday needs.";

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

modalAddBtn.addEventListener('click', () => {
    if (currentModalProductId !== null) {
        addToCart(currentModalProductId);
        closeModal();
    }
});

modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Click on product image to open modal
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG' && e.target.closest('.product-card')) {
        const id = parseInt(e.target.dataset.id);
        if (!isNaN(id)) openModal(id);
    }
});

// =============================================
// STEP 8: EVENT DELEGATION FOR CART BUTTONS
// =============================================
document.addEventListener('click', (e) => {
    // Add to Cart
    if (e.target.classList.contains('btn-add') && !e.target.disabled) {
        const id = parseInt(e.target.dataset.id);
        if (!isNaN(id)) addToCart(id);
    }
    // Quantity buttons
    if (e.target.classList.contains('qty-btn')) {
        const id = parseInt(e.target.dataset.id);
        const delta = parseInt(e.target.dataset.delta);
        if (!isNaN(id) && !isNaN(delta)) changeQuantity(id, delta);
    }
    // Remove button
    if (e.target.classList.contains('remove-btn')) {
        const id = parseInt(e.target.dataset.id);
        if (!isNaN(id)) removeFromCart(id);
    }
});

// =============================================
// STEP 9: DARK MODE
// =============================================
const darkModeToggle = document.querySelector('.nav-actions .fa-moon');
if (darkModeToggle) {
    const body = document.body;
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.classList.remove('fa-moon');
        darkModeToggle.classList.add('fa-sun');
    }
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            darkModeToggle.classList.remove('fa-moon');
            darkModeToggle.classList.add('fa-sun');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            darkModeToggle.classList.remove('fa-sun');
            darkModeToggle.classList.add('fa-moon');
            localStorage.setItem('darkMode', 'disabled');
        }
    });
}

// =============================================
// STEP 10: INITIALIZE
// =============================================
attachFilterEvents();
updatePriceDisplay();
loadCart(); // This also calls updateCart() and renders products with qty
renderProducts(getFilteredProducts());

console.log('✅ All steps complete! Cart, Filter, Search, Sort, Dark Mode, and Quick View working.');

// =============================================
// STEP 06: CHECKOUT MODAL + ORDER HISTORY
// =============================================

// ---- DOM References ----
const checkoutOverlay = document.getElementById('checkoutOverlay');
const checkoutCloseBtn = document.getElementById('checkoutCloseBtn');
const checkoutName = document.getElementById('checkoutName');
const checkoutEmail = document.getElementById('checkoutEmail');
const checkoutAddress = document.getElementById('checkoutAddress');
const checkoutPhone = document.getElementById('checkoutPhone');
const checkoutItems = document.getElementById('checkoutItems');
const checkoutTotal = document.getElementById('checkoutTotal');
const placeOrderBtn = document.getElementById('placeOrderBtn');

const historyOverlay = document.getElementById('historyOverlay');
const historyCloseBtn = document.getElementById('historyCloseBtn');
const historyList = document.getElementById('historyList');

// Order History Array
let orderHistory = [];

// ---- Load Order History from LocalStorage ----
function loadOrderHistory() {
    const saved = localStorage.getItem('orderHistory');
    if (saved) {
        orderHistory = JSON.parse(saved);
    } else {
        orderHistory = [];
    }
}

// ---- Save Order History to LocalStorage ----
function saveOrderHistory() {
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
}

// ---- Open Checkout Modal ----
function openCheckout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    
    // ၁။ Cart Drawer ကို အရင်ပိတ်မယ်
    closeCart();
    
    // ၂။ Order Summary ကို ဖြည့်မယ်
    let html = '';
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <div class="checkout-item">
                <span>${item.name} × ${item.quantity}</span>
                <span>$${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });
    checkoutItems.innerHTML = html;
    checkoutTotal.textContent = `$${total.toFixed(2)}`;
    
    // ၃။ Checkout Modal ကို ဖွင့်မယ် (နည်းနည်းနောက်ကျမှ ပေါ်အောင်)
    setTimeout(() => {
        checkoutOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 300); // 0.3 စက္ကန့်ကြာမှ ပေါ်မယ် (Drawer ပိတ်တဲ့ animation နဲ့ လိုက်ဖက်အောင်)
}

// ---- Close Checkout Modal ----
function closeCheckout() {
    checkoutOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ---- Open Order History ----
function openHistory() {
    renderHistory();
    historyOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ---- Close Order History ----
function closeHistory() {
    historyOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ---- Render Order History ----
// ---- Render Order History (with delete buttons) ----
function renderHistory() {
    const clearBtn = document.getElementById('clearHistoryBtn');
    
    if (orderHistory.length === 0) {
        historyList.innerHTML = `<p style="text-align: center; color: var(--gray); padding: 40px 0;">No orders yet. Start shopping!</p>`;
        if (clearBtn) clearBtn.style.display = 'none';
        return;
    }
    
    if (clearBtn) clearBtn.style.display = 'inline-block';
    
    let html = '';
    // Show newest first (reverse)
    const sorted = [...orderHistory].reverse();
    sorted.forEach((order, displayIndex) => {
        const itemsList = order.items.map(item => `${item.name} (×${item.quantity})`).join(', ');
        // realIndex ကို တွက်မယ် (original array ထဲက index)
        const realIndex = orderHistory.length - 1 - displayIndex;
        html += `
            <div class="history-card">
                <div class="history-header">
                    <span class="history-id">#${order.id}</span>
                    <span>${order.date}</span>
                    <span class="history-status">${order.status}</span>
                    <button class="delete-single-btn" data-index="${realIndex}" style="
                        background: none; 
                        border: none; 
                        color: #ef4444; 
                        cursor: pointer; 
                        font-size: 20px;
                        padding: 0 4px;
                        font-weight: 300;
                    " title="Delete this order">&times;</button>
                </div>
                <div class="history-items">${itemsList}</div>
                <div class="history-total">Total: $${order.total.toFixed(2)}</div>
            </div>
        `;
    });
    historyList.innerHTML = html;
}

// ---- Place Order ----
function placeOrder() {
    // Validate form
    const name = checkoutName.value.trim();
    const email = checkoutEmail.value.trim();
    const address = checkoutAddress.value.trim();
    const phone = checkoutPhone.value.trim();

    if (!name || !email || !address || !phone) {
        showToast('Please fill in all fields!');
        return;
    }

    // Calculate total
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    // Create order object
    const order = {
        id: 'ORD-' + Date.now().toString().slice(-6),
        date: new Date().toLocaleString(),
        items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
        total: total,
        status: 'Confirmed',
        customer: { name, email, address, phone }
    };

    // Save to order history
    orderHistory.push(order);
    saveOrderHistory();

    // Clear cart
    cart = [];
    updateCart();

    // Close checkout
    closeCheckout();

    // Show success message
    showToast(`✅ Order placed! #${order.id}`);

    // Clear form
    checkoutName.value = '';
    checkoutEmail.value = '';
    checkoutAddress.value = '';
    checkoutPhone.value = '';
}

// ---- Event Listeners ----

// Checkout
document.querySelector('.btn-checkout').addEventListener('click', openCheckout);
checkoutCloseBtn.addEventListener('click', closeCheckout);
checkoutOverlay.addEventListener('click', (e) => {
    if (e.target === checkoutOverlay) closeCheckout();
});

// Place Order
placeOrderBtn.addEventListener('click', placeOrder);

// Order History (Navbar မှာ ခလုတ်အသစ်ထည့်မယ်)
// Navbar မှာ Order History ခလုတ်ကို ထည့်ဖို့ အောက်ပါအတိုင်း လုပ်ပါမယ်
const historyBtn = document.createElement('div');
historyBtn.className = 'nav-history';
historyBtn.innerHTML = `<i class="fas fa-receipt"></i>`;
historyBtn.title = 'Order History';
historyBtn.style.cssText = `
    cursor: pointer;
    font-size: 22px;
    color: var(--text);
    transition: 0.3s ease;
`;
historyBtn.addEventListener('mouseenter', () => {
    historyBtn.style.color = 'var(--primary)';
});
historyBtn.addEventListener('mouseleave', () => {
    historyBtn.style.color = 'var(--text)';
});
historyBtn.addEventListener('click', openHistory);

// Navbar ရဲ့ nav-actions ထဲကို ထည့်မယ်
// Navbar ရဲ့ nav-actions ထဲကို ထည့်မယ်
const navActions = document.querySelector('.nav-actions');
if (navActions) {
    // Moon icon ရဲ့နောက် (Cart icon ရဲ့ရှေ့) မှာ ထည့်မယ်
    const moonIcon = navActions.querySelector('.fa-moon');
    if (moonIcon) {
        // moon icon ရဲ့ parent (navActions) ထဲက moon icon ရဲ့ နောက်တစ်နေရာမှာ ထည့်မယ်
        const moonParent = moonIcon.parentElement; // nav-actions
        const cartBadge = moonParent.querySelector('.cart-badge');
        if (cartBadge) {
            moonParent.insertBefore(historyBtn, cartBadge);
        } else {
            moonParent.appendChild(historyBtn);
        }
    } else {
        navActions.appendChild(historyBtn);
    }
}

// History Close
historyCloseBtn.addEventListener('click', closeHistory);
historyOverlay.addEventListener('click', (e) => {
    if (e.target === historyOverlay) closeHistory();
});

// Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (checkoutOverlay.classList.contains('active')) closeCheckout();
        if (historyOverlay.classList.contains('active')) closeHistory();
    }
});

// ---- Load Order History on page load ----
loadOrderHistory();


// =============================================
// CLEAR ORDER HISTORY
// =============================================
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
        if (orderHistory.length === 0) {
            showToast('No orders to clear.');
            return;
        }
        
        // သေချာစေဖို့ Confirmation မေးမယ်
        if (confirm('Are you sure you want to delete all order history?')) {
            orderHistory = [];
            saveOrderHistory();
            renderHistory();
            showToast('🗑️ Order history cleared!');
        }
    });
}

// ---- Delete Single Order ----
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-single-btn')) {
        const index = parseInt(e.target.dataset.index);
        if (!isNaN(index) && index >= 0 && index < orderHistory.length) {
            if (confirm(`Delete order #${orderHistory[index].id}?`)) {
                orderHistory.splice(index, 1);
                saveOrderHistory();
                renderHistory();
                showToast('🗑️ Order deleted!');
            }
        }
    }
});

console.log('✅ Step 6: Checkout + Order History Complete!');