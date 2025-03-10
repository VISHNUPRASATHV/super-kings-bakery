// Theme Switching
function initializeTheme() {
    const themeSwitch = document.querySelector('.theme-switch');
    const icon = themeSwitch.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeSwitch.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-switch i');
    if (theme === 'dark') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Sample product data (replace with MongoDB data in production)
const sampleProducts = [
    {
        name: "Classic Croissant",
        description: "Buttery, flaky, and perfectly golden",
        price: 3.99,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        category: "pastries"
    },
    {
        name: "Chocolate Cake",
        description: "Rich and moist chocolate cake with ganache",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        category: "cakes"
    },
    {
        name: "Fresh Bread",
        description: "Artisanal sourdough bread",
        price: 5.99,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        category: "bread"
    },
    {
        name: "Macarons",
        description: "Colorful French macarons",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        category: "sweets"
    }
];

// Function to create product cards
function createProductCard(product) {
    return `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
            </div>
        </div>
    `;
}

// Function to load products from MongoDB
async function loadProducts() {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();
        const productContainer = document.getElementById('productContainer');
        if (productContainer) {
            productContainer.innerHTML = products.map(createProductCard).join('');
            initializeProductFilters();
        }
    } catch (error) {
        console.error('Error loading products:', error);
        // Fallback to sample products if API fails
        const productContainer = document.getElementById('productContainer');
        if (productContainer) {
            productContainer.innerHTML = sampleProducts.map(createProductCard).join('');
            initializeProductFilters();
        }
    }
}

// Function to initialize product filters
function initializeProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.dataset.category;

            productCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Grid hover effects
function initializeGridHover() {
    const gridItems = document.querySelectorAll('.grid-item');
    
    gridItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.02)';
            item.style.zIndex = '1';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
            item.style.zIndex = '0';
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Initialize features when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    loadProducts();
    initializeGridHover();
}); 