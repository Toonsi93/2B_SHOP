// Gestion du panier
let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

// Ajouter au panier
function addToCart(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const existingItem = shoppingCart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        shoppingCart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            color: product.color,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    showAddedToCartMessage(product.name);
    
    // Si le panier est ouvert, mettre à jour l'affichage
    if (document.getElementById('cartSidebar').classList.contains('active')) {
        displayCartItems();
    }
}

// Obtenir produit par ID
function getProductById(id) {
    return products.find(p => p.id === id);
}

// Sauvegarder panier
function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
}

// Mettre à jour le compteur
function updateCartCount() {
    const totalItems = shoppingCart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

// Afficher message d'ajout
function showAddedToCartMessage(productName) {
    // Créer une notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${productName} ajouté au panier !</span>
    `;
    
    // Style de la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00b09b, #96c93d);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Afficher les articles du panier
function displayCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (shoppingCart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Votre panier est vide</p>
            </div>
        `;
        cartTotal.textContent = '0.00€';
        return;
    }
    
    let itemsHTML = '';
    let total = 0;
    
    shoppingCart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        itemsHTML += `
            <div class="cart-item">
                <img src="${item.imageUrl}" alt="${item.name}"
                     onerror="this.src='https://via.placeholder.com/60/6a11cb/ffffff?text=Coque'">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.price.toFixed(2)}€</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="remove-item" onclick="removeFromCart(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="cart-item-total">
                    ${itemTotal.toFixed(2)}€
                </div>
            </div>
        `;
    });
    
    cartItems.innerHTML = itemsHTML;
    cartTotal.textContent = `${total.toFixed(2)}€`;
}

// Mettre à jour la quantité
function updateQuantity(index, change) {
    if (shoppingCart[index].quantity + change < 1) {
        removeFromCart(index);
        return;
    }
    
    shoppingCart[index].quantity += change;
    saveCart();
    updateCartCount();
    displayCartItems();
}

// Supprimer du panier
function removeFromCart(index) {
    shoppingCart.splice(index, 1);
    saveCart();
    updateCartCount();
    displayCartItems();
}

// Ajouter les animations CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);