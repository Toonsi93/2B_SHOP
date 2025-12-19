// Configuration des produits - REMPLACEZ LES URLs ICI
const products = [
    {
        id: 1,
        name: "Coque iPhone 15 Arc-en-Ciel",
        price: 29.99,
        color: "rainbow",
        category: ["rainbow", "all"],
        imageUrl: "https://i.imgur.com/t77kYrg.pngIMG_6933.jpg", // REMPLACEZ
        description: "Coque "
    },
    {
        id: 2,
        name: "Coque iPhone 15 Transparente",
        price: 24.99,
        color: "transparent",
        category: ["transparent", "all"],
        imageUrl: "https://votre-domaine.com/images/transparent-case1.jpg", // REMPLACEZ
        description: "Coque 100% transparente"
    },
    {
        id: 3,
        name: "Coque iPhone 15 Rouge Transparent",
        price: 26.99,
        color: "red",
        category: ["red", "all"],
        imageUrl: "https://votre-domaine.com/images/red-transparent-case1.jpg", // REMPLACEZ
        description: "Coque rouge transparente"
    },
    {
        id: 4,
        name: "Coque iPhone 15 Noire",
        price: 27.99,
        color: "black",
        category: ["black", "all"],
        imageUrl: "https://votre-domaine.com/images/black-case1.jpg", // REMPLACEZ
        description: "Coque noire élégante"
    },
    {
        id: 5,
        name: "Coque iPhone 14 Arc-en-Ciel",
        price: 27.99,
        color: "rainbow",
        category: ["rainbow", "all"],
        imageUrl: "https://votre-domaine.com/images/rainbow-case2.jpg", // REMPLACEZ
        description: "Arc-en-ciel pour iPhone 14"
    },
    {
        id: 6,
        name: "Coque iPhone 14 Transparente",
        price: 22.99,
        color: "transparent",
        category: ["transparent", "all"],
        imageUrl: "https://votre-domaine.com/images/transparent-case2.jpg", // REMPLACEZ
        description: "Transparente iPhone 14"
    }
];

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Charger le thème
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    document.body.className = savedTheme;
    updateThemeText();
    
    // Afficher les produits
    displayProducts('all');
    
    // Initialiser le panier
    updateCartCount();
    
    // Gestionnaires d'événements
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('cartIcon').addEventListener('click', toggleCart);
    document.getElementById('closeCart').addEventListener('click', toggleCart);
    document.getElementById('checkoutBtn').addEventListener('click', goToCheckout);
    document.getElementById('proceedPayment').addEventListener('click', goToPayment);
    
    // Filtres produits
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            displayProducts(this.dataset.filter);
        });
    });
    
    // Fermer panier en cliquant à l'extérieur
    document.addEventListener('click', function(event) {
        const cartSidebar = document.getElementById('cartSidebar');
        const cartIcon = document.getElementById('cartIcon');
        if (cartSidebar.classList.contains('active') && 
            !cartSidebar.contains(event.target) && 
            !cartIcon.contains(event.target)) {
            toggleCart();
        }
    });
});

// Afficher les produits
function displayProducts(filter) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.category.includes(filter));
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Créer une carte produit
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Déterminer la classe de couleur
    let colorClass = '';
    let colorText = '';
    switch(product.color) {
        case 'rainbow':
            colorClass = 'color-rainbow';
            colorText = 'Arc-en-Ciel';
            break;
        case 'transparent':
            colorClass = 'color-transparent';
            colorText = 'Transparent';
            break;
        case 'red':
            colorClass = 'color-red';
            colorText = 'Rouge Transparent';
            break;
        case 'black':
            colorClass = 'color-black';
            colorText = 'Noir';
            break;
    }
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.imageUrl}" alt="${product.name}" 
                 onerror="this.src='https://via.placeholder.com/300x300/6a11cb/ffffff?text=Coque+iPhone'">
        </div>
        <div class="product-info">
            <div class="product-title">
                <h3>${product.name}</h3>
                <span class="product-color ${colorClass}">${colorText}</span>
            </div>
            <p class="product-description">${product.description}</p>
            <div class="product-price">${product.price.toFixed(2)}€</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-cart-plus"></i> Ajouter au panier
            </button>
        </div>
    `;
    
    return card;
}

// Changer le thème
function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('light-theme')) {
        body.classList.replace('light-theme', 'dark-theme');
        localStorage.setItem('theme', 'dark-theme');
    } else {
        body.classList.replace('dark-theme', 'light-theme');
        localStorage.setItem('theme', 'light-theme');
    }
    updateThemeText();
}

function updateThemeText() {
    const themeText = document.querySelector('.theme-text');
    if (document.body.classList.contains('dark-theme')) {
        themeText.textContent = 'Mode Clair';
    } else {
        themeText.textContent = 'Mode Sombre';
    }
}

// Panier
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
    if (document.getElementById('cartSidebar').classList.contains('active')) {
        displayCartItems();
    }
}

function goToCheckout() {
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    if (cart.length === 0) {
        alert('Votre panier est vide !');
        return;
    }
    toggleCart();
    setTimeout(() => {
        window.location.href = 'payment.html';
    }, 300);
}

function goToPayment() {
    window.location.href = 'payment.html';
}