// Main script file for the e-commerce website

// Initialize cart from local storage or create empty cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Product database - in a real app this would come from a backend
const productsDB = [
    {
        id: '1',
        name: 'Wireless Headphones',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        category: 'electronics',
        description: 'Premium noise cancelling wireless headphones with high fidelity sound.',
        rating: 4.5,
        reviews: 24,
        specifications: {
            'Brand': 'SoundMaster',
            'Model': 'WH-1000XM4',
            'Color': 'Black',
            'Battery Life': 'Up to 30 hours',
            'Connectivity': 'Bluetooth 5.0',
            'Noise Cancellation': 'Active Noise Cancellation',
            'Weight': '254g'
        }
    },
    {
        id: '2',
        name: 'Smart Watch',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
        category: 'electronics',
        description: 'Track your fitness, receive notifications and more with this stylish smartwatch.',
        rating: 5.0,
        reviews: 18,
        specifications: {
            'Brand': 'TechFit',
            'Model': 'SmartFit Pro',
            'Color': 'Silver',
            'Battery Life': 'Up to 7 days',
            'Connectivity': 'Bluetooth 5.0',
            'Water Resistance': 'IP68',
            'Weight': '48g'
        }
    },
    {
        id: '3',
        name: 'Polaroid Camera',
        price: 89.99,
        oldPrice: 99.99,
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        category: 'electronics',
        description: 'Capture memories instantly with this retro-style polaroid camera.',
        rating: 4.0,
        reviews: 12,
        specifications: {
            'Brand': 'InstaPic',
            'Model': 'Retro X1',
            'Color': 'Vintage Blue',
            'Film Type': 'Instant Film',
            'Flash': 'Built-in',
            'Battery': 'Rechargeable Li-ion',
            'Weight': '450g'
        }
    },
    {
        id: '4',
        name: 'Running Sneakers',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
        category: 'clothing',
        description: 'Comfortable running shoes with cushioned soles for maximum support.',
        rating: 4.5,
        reviews: 32,
        specifications: {
            'Brand': 'SpeedRunner',
            'Model': 'Air Zoom',
            'Color': 'White/Blue',
            'Material': 'Breathable Mesh',
            'Sole': 'Rubber',
            'Closure': 'Lace-up',
            'Weight': '280g'
        }
    },
    {
        id: '5',
        name: 'Basketball Shoes',
        price: 159.99,
        image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
        category: 'clothing',
        description: 'Professional basketball shoes with ankle support and premium grip.',
        rating: 5.0,
        reviews: 28,
        specifications: {
            'Brand': 'JumpMaster',
            'Model': 'Pro Court 3',
            'Color': 'Black/Red',
            'Material': 'Synthetic Leather',
            'Sole': 'High-traction Rubber',
            'Closure': 'Lace-up',
            'Weight': '340g'
        }
    },
    {
        id: '6',
        name: 'Red Sneakers',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        category: 'clothing',
        description: 'Stylish red sneakers perfect for casual outfits and everyday wear.',
        rating: 4.0,
        reviews: 15,
        specifications: {
            'Brand': 'UrbanStep',
            'Model': 'Classic Red',
            'Color': 'Red',
            'Material': 'Canvas',
            'Sole': 'Rubber',
            'Closure': 'Lace-up',
            'Weight': '220g'
        }
    }
];

// DOM elements - using optional chaining to prevent errors if elements don't exist
const cartCountEl = document.querySelector('.cart-count');
const cartItemsEl = document.querySelector('.cart-items');
const cartTotalEl = document.querySelector('.cart-total');
const subtotalEl = document.querySelector('.subtotal');
const taxEl = document.querySelector('.tax');
const shippingEl = document.querySelector('.shipping');
const userSectionEl = document.querySelector('.user-section');
const userDropdownEl = document.querySelector('.user-dropdown');
const userAvatarEl = document.querySelector('.user-avatar');
const userNameEl = document.querySelector('.user-name');
const productsContainer = document.querySelector('.products-container');

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateUserUI();
    
    // Initialize page-specific functionality
    if (window.location.pathname.includes('cart.html')) {
        renderCartItems();
        updateCartTotal();
    } else if (window.location.pathname.includes('products.html')) {
        initializeProductsPage();
    } else if (window.location.pathname.includes('product-detail.html')) {
        initializeProductDetailPage();
    } else if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        initializeHomePage();
    }
    
    // Toggle user dropdown
    document.querySelector('.user-info')?.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdownEl?.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        userDropdownEl?.classList.remove('show');
    });
    
    // Logout button event
    document.querySelector('.logout-btn')?.addEventListener('click', logout);
    
    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.btn.btn-primary').forEach(button => {
        if (button.textContent.includes('Add to Cart')) {
            button.addEventListener('click', function() {
                const productCard = this.closest('.product-card') || this.closest('article');
                if (productCard) {
                    const productName = productCard.querySelector('h3').textContent;
                    const product = productsDB.find(p => p.name === productName);
                    if (product) {
                        addToCart(product);
                    }
                }
            });
        }
    });
    
    // Make product cards clickable to go to detail page
    makeProductCardsClickable();
});

// Page Initialization Functions
function initializeProductsPage() {
    // Add event listeners to category and sort filters
    const categorySelect = document.querySelector('select');
    const sortSelect = document.querySelectorAll('select')[1];
    const searchInput = document.querySelector('input[placeholder="Search products..."]');
    
    categorySelect?.addEventListener('change', filterProducts);
    sortSelect?.addEventListener('change', filterProducts);
    searchInput?.addEventListener('input', filterProducts);
}

function initializeHomePage() {
    // Featured products section
    const featuredContainer = document.querySelector('.featured-products');
    if (featuredContainer) {
        // Display featured products (limited to 4)
        const featuredProducts = productsDB.slice(0, 4);
        featuredProducts.forEach(product => displayFeaturedProduct(product, featuredContainer));
    }
}

function initializeProductDetailPage() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        window.location.href = 'products.html';
        return;
    }
    
    // Find product in database
    const product = productsDB.find(p => p.id === productId);
    if (!product) {
        window.location.href = 'products.html';
        return;
    }
    
    // Update page with product details
    document.title = `${product.name} | E-Shop`;
    document.getElementById('product-main-image').src = product.image;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-category').textContent = product.category;
    document.getElementById('full-description').textContent = product.description;
    
    // Update specifications tab
    const specsBody = document.getElementById('specs-body');
    if (specsBody && product.specifications) {
        specsBody.innerHTML = '';
        for (const [key, value] of Object.entries(product.specifications)) {
            specsBody.innerHTML += `
                <tr>
                    <td>${key}</td>
                    <td>${value}</td>
                </tr>
            `;
        }
    }
    
    // Add event listener to "Add to Cart" button
    const addToCartBtn = document.getElementById('add-to-cart');
    const quantityInput = document.getElementById('product-quantity');
    const decreaseBtn = document.querySelector('.quantity-btn.decrease');
    const increaseBtn = document.querySelector('.quantity-btn.increase');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);
            addToCart(product, quantity);
        });
    }
    
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
    }
    
    if (increaseBtn) {
        increaseBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue < 10) {
                quantityInput.value = currentValue + 1;
            }
        });
    }
    
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to current button and pane
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Display related products
    const relatedContainer = document.getElementById('related-products-container');
    if (relatedContainer) {
        // Get products in the same category
        const relatedProducts = productsDB
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 4);
        
        relatedProducts.forEach(relatedProduct => {
            const productCard = document.createElement('article');
            productCard.classList.add('product-card');
            productCard.dataset.id = relatedProduct.id;
            productCard.innerHTML = `
                <img src="${relatedProduct.image}" alt="${relatedProduct.name}">
                <div class="product-content">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <h3>${relatedProduct.name}</h3>
                        <div style="color: var(--secondary);">
                            ${generateStarRating(relatedProduct.rating)}
                        </div>
                    </div>
                    <p>${relatedProduct.description.substring(0, 60)}...</p>
                    <p class="price">$${relatedProduct.price.toFixed(2)}</p>
                    <button class="btn btn-primary add-to-cart-btn" data-id="${relatedProduct.id}">Add to Cart</button>
                </div>
            `;
            
            relatedContainer.appendChild(productCard);
            
            // Add event listener to "Add to Cart" button
            const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
            addToCartBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent navigation to product detail
                addToCart(relatedProduct);
            });
            
            // Make product card clickable
            productCard.addEventListener('click', (e) => {
                // Don't navigate if the click was on the "Add to Cart" button
                if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                    return;
                }
                window.location.href = `product-detail.html?id=${relatedProduct.id}`;
            });
            productCard.style.cursor = 'pointer';
        });
    }
}

// Function to update cart count in UI
function updateCartCount() {
    const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    if (cartCountEl) {
        cartCountEl.textContent = count;
        cartCountEl.style.display = count > 0 ? 'block' : 'none';
    }
}

// Function to update user interface based on login status
function updateUserUI() {
    const userSection = document.querySelector('.nav-buttons');
    if (currentUser) {
        userSection.innerHTML = `
            <div class="user-info">
                <span class="user-name">${currentUser.username}</span>
                <div class="user-dropdown">
                    <a href="#" class="dropdown-item">My Profile</a>
                    <a href="#" class="dropdown-item">My Orders</a>
                    <a href="#" class="dropdown-item logout-btn">Logout</a>
                </div>
            </div>
            <a href="cart.html" class="cart-icon">
                <i class="fas fa-shopping-cart"></i>
                <span class="cart-count">0</span>
            </a>
        `;
        updateCartCount();
    }
}

// Function to add items to cart
function addToCart(product, quantity = 1) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show success message
    const message = document.createElement('div');
    message.className = 'toast-message';
    message.textContent = 'Item added to cart successfully!';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Function to filter products
function filterProducts() {
    const category = document.querySelector('select')?.value;
    const sort = document.querySelectorAll('select')[1]?.value;
    const search = document.querySelector('input[placeholder="Search products..."]')?.value.toLowerCase();
    
    let filteredProducts = [...productsDB];
    
    // Apply category filter
    if (category && category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    // Apply search filter
    if (search) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(search) || 
            p.description.toLowerCase().includes(search)
        );
    }
    
    // Apply sorting
    if (sort) {
        switch(sort) {
            case 'price-low-high':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high-low':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name-a-z':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-z-a':
                filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
        }
    }
    
    // Update products display
    const productsContainer = document.querySelector('.products-container');
    if (productsContainer) {
        productsContainer.innerHTML = filteredProducts.map(product => `
            <article class="product-card" data-id="${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-content">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <h3>${product.name}</h3>
                        <div style="color: var(--secondary);">
                            ${generateStarRating(product.rating)}
                        </div>
                    </div>
                    <p>${product.description.substring(0, 60)}...</p>
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <button class="btn btn-primary add-to-cart-btn">Add to Cart</button>
                </div>
            </article>
        `).join('');
        
        makeProductCardsClickable();
    }
}

// Function to make product cards clickable
function makeProductCardsClickable() {
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't navigate if the click was on the "Add to Cart" button
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                return;
            }
            const productId = card.dataset.id;
            window.location.href = `product-detail.html?id=${productId}`;
        });
        card.style.cursor = 'pointer';
    });
}

// Function to display featured product
function displayFeaturedProduct(product, container) {
    const productCard = document.createElement('article');
    productCard.classList.add('product-card');
    productCard.dataset.id = product.id;
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-content">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <h3>${product.name}</h3>
                <div style="color: var(--secondary);">
                    ${generateStarRating(product.rating)}
                </div>
            </div>
            <p>${product.description.substring(0, 60)}...</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="btn btn-primary add-to-cart-btn">Add to Cart</button>
        </div>
    `;
    container.appendChild(productCard);
}

// Function to generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Function to handle logout
function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    updateUserUI();
    window.location.href = 'index.html';
}

// Add mobile menu functionality
document.querySelector('.mobile-menu-btn')?.addEventListener('click', () => {
    const nav = document.querySelector('nav');
    nav?.classList.toggle('show');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && !e.target.closest('.mobile-menu-btn')) {
        document.querySelector('nav')?.classList.remove('show');
    }
});

// Add CSS for toast messages
const style = document.createElement('style');
style.textContent = `
    .toast-message {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--secondary);
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
`;
document.head.appendChild(style);
