// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Design category filtering
const categoryTabs = document.querySelectorAll('.tab-btn');
const designItems = document.querySelectorAll('.design-item');

categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        categoryTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        const category = tab.getAttribute('data-category');
        
        // Show/hide design items based on category
        designItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// File upload handling
const fileInput = document.getElementById('photos');
const fileLabel = document.querySelector('.file-upload-label span');

if (fileInput) {
    fileInput.addEventListener('change', function() {
        const fileCount = this.files.length;
        if (fileCount > 0) {
            fileLabel.textContent = `${fileCount} file(s) selected`;
        } else {
            fileLabel.textContent = 'Click to upload or drag photos here';
        }
    });
}

// Form submission handling
const orderForm = document.querySelector('.order-form');
const contactForm = document.querySelector('.contact-form form');

if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const orderData = {};
        
        for (let [key, value] of formData.entries()) {
            orderData[key] = value;
        }
        
        // Simulate order processing
        showNotification('Order submitted successfully! We\'ll contact you soon.', 'success');
        
        // Reset form
        this.reset();
        fileLabel.textContent = 'Click to upload or drag photos here';
        
        console.log('Order Data:', orderData);
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// Product card interactions
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    const selectBtn = card.querySelector('.btn-product');
    if (selectBtn) {
        selectBtn.addEventListener('click', () => {
            // Scroll to order section
            document.getElementById('order').scrollIntoView({
                behavior: 'smooth'
            });
            
            // Pre-select the product type in the form
            const productName = card.querySelector('h3').textContent;
            const productSelect = document.querySelector('select[name="product"]');
            if (productSelect) {
                const option = Array.from(productSelect.options).find(opt => 
                    opt.textContent.toLowerCase().includes(productName.toLowerCase())
                );
                if (option) {
                    productSelect.value = option.value;
                }
            }
        });
    }
});

// Design item selection
const designItemsClickable = document.querySelectorAll('.design-item');
designItemsClickable.forEach(item => {
    item.addEventListener('click', () => {
        // Remove selection from other items
        designItemsClickable.forEach(i => i.classList.remove('selected'));
        // Add selection to clicked item
        item.classList.add('selected');
        
        // Update design select in form
        const designName = item.querySelector('h4').textContent;
        const designSelect = document.querySelector('select[name="design"]');
        if (designSelect) {
            const category = item.getAttribute('data-category');
            if (category) {
                designSelect.value = category;
            }
        }
        
        showNotification(`Selected design: ${designName}`, 'info');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.product-card, .design-item, .step, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS for selected design items
const style = document.createElement('style');
style.textContent = `
    .design-item.selected {
        border: 3px solid var(--primary-purple);
        transform: translateY(-5px);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Show all design items initially
    designItems.forEach(item => {
        item.style.display = 'block';
    });
    
    // Add loading animation to images when they would be loaded
    setTimeout(() => {
        document.querySelectorAll('.gallery-placeholder, .photo-placeholder, .design-preview').forEach(placeholder => {
            placeholder.style.backgroundImage = 'linear-gradient(45deg, var(--light-purple), var(--primary-purple))';
        });
    }, 1000);
});

// Price calculator (basic implementation)
function calculatePrice() {
    const productSelect = document.querySelector('select[name="product"]');
    const quantityInput = document.querySelector('input[name="quantity"]');
    
    if (!productSelect || !quantityInput) return;
    
    const basePrices = {
        'mini-polaroids': 2.99,
        'photostrips': 4.99,
        'a4-posters': 8.99,
        'polaroids': 3.99,
        'postcards': 1.99
    };
    
    const product = productSelect.value;
    const quantity = parseInt(quantityInput.value) || 1;
    
    if (product && basePrices[product]) {
        const total = basePrices[product] * quantity;
        
        // Create or update price display
        let priceDisplay = document.querySelector('.price-display');
        if (!priceDisplay) {
            priceDisplay = document.createElement('div');
            priceDisplay.className = 'price-display';
            priceDisplay.style.cssText = `
                background: var(--light-purple);
                padding: 1rem;
                border-radius: 10px;
                margin-top: 1rem;
                text-align: center;
                font-weight: 600;
                color: var(--dark-purple);
            `;
            quantityInput.parentNode.appendChild(priceDisplay);
        }
        
        priceDisplay.innerHTML = `
            <div>Estimated Total: <span style="font-size: 1.2rem; color: var(--primary-purple);">$${total.toFixed(2)}</span></div>
            <small style="color: var(--medium-gray);">Final price may vary based on design complexity</small>
        `;
    }
}

// Add event listeners for price calculation
document.addEventListener('DOMContentLoaded', () => {
    const productSelect = document.querySelector('select[name="product"]');
    const quantityInput = document.querySelector('input[name="quantity"]');
    
    if (productSelect) productSelect.addEventListener('change', calculatePrice);
    if (quantityInput) quantityInput.addEventListener('input', calculatePrice);
});