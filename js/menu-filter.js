// Menu filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    initMenuFilters();
});

function initMenuFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (filterButtons.length === 0 || menuItems.length === 0) {
        return; // Exit if not on a menu page
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter menu items
            filterMenuItems(menuItems, filter);
        });
    });
}

function filterMenuItems(menuItems, filter) {
    menuItems.forEach(item => {
        const categories = item.getAttribute('data-categories') || '';
        const categoryList = categories.split(' ').filter(cat => cat.length > 0);
        
        if (filter === 'all') {
            showMenuItem(item);
        } else if (categoryList.includes(filter)) {
            showMenuItem(item);
        } else {
            hideMenuItem(item);
        }
    });
}

function showMenuItem(item) {
    item.style.display = 'block';
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    
    // Animate in
    setTimeout(() => {
        item.style.transition = 'all 0.3s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    }, 50);
}

function hideMenuItem(item) {
    item.style.transition = 'all 0.3s ease';
    item.style.opacity = '0';
    item.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        item.style.display = 'none';
    }, 300);
}

// Search functionality (can be added to menu pages)
function initMenuSearch() {
    const searchInput = document.getElementById('menu-search');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        menuItems.forEach(item => {
            const title = item.querySelector('.menu-item-title').textContent.toLowerCase();
            const description = item.querySelector('.menu-item-description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || searchTerm === '') {
                showMenuItem(item);
            } else {
                hideMenuItem(item);
            }
        });
    });
}

// Price range filtering (can be enhanced for future use)
function initPriceFilter() {
    const priceFilter = document.getElementById('price-filter');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (!priceFilter) return;
    
    priceFilter.addEventListener('change', function() {
        const maxPrice = parseFloat(this.value);
        
        menuItems.forEach(item => {
            const priceText = item.querySelector('.menu-item-price').textContent;
            const price = parseFloat(priceText.replace('£', ''));
            
            if (price <= maxPrice) {
                showMenuItem(item);
            } else {
                hideMenuItem(item);
            }
        });
    });
}

// Allergen filtering
function initAllergenFilter() {
    const allergenFilters = document.querySelectorAll('.allergen-filter');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (allergenFilters.length === 0) return;
    
    allergenFilters.forEach(filter => {
        filter.addEventListener('change', function() {
            filterByAllergens();
        });
    });
    
    function filterByAllergens() {
        const selectedAllergens = Array.from(allergenFilters)
            .filter(filter => filter.checked)
            .map(filter => filter.value);
        
        if (selectedAllergens.length === 0) {
            // Show all items if no allergens selected
            menuItems.forEach(item => showMenuItem(item));
            return;
        }
        
        menuItems.forEach(item => {
            const dietary = item.getAttribute('data-dietary') || '';
            const dietaryList = dietary.split(',').map(d => d.trim()).filter(d => d.length > 0);
            
            // Show item only if it has all the selected dietary requirements
            const meetsAllRequirements = selectedAllergens.every(requirement => {
                // Convert allergen to dietary requirement (e.g., 'dairy' becomes 'dairy-free')
                const dietaryRequirement = requirement + '-free';
                return dietaryList.includes(dietaryRequirement);
            });
            
            if (meetsAllRequirements) {
                showMenuItem(item);
            } else {
                hideMenuItem(item);
            }
        });
    }
}

// Spice level filtering
function initSpiceFilter() {
    const spiceFilter = document.getElementById('spice-filter');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (!spiceFilter) return;
    
    spiceFilter.addEventListener('change', function() {
        const selectedLevel = this.value;
        
        if (selectedLevel === 'all') {
            menuItems.forEach(item => showMenuItem(item));
            return;
        }
        
        menuItems.forEach(item => {
            const spiceLevel = item.getAttribute('data-spice') || 'mild';
            
            if (spiceLevel === selectedLevel) {
                showMenuItem(item);
            } else {
                hideMenuItem(item);
            }
        });
    });
}

// Combined filtering function
function initAdvancedFiltering() {
    const filters = {
        category: document.querySelectorAll('.filter-btn'),
        search: document.getElementById('menu-search'),
        price: document.getElementById('price-filter'),
        allergens: document.querySelectorAll('.allergen-filter'),
        spice: document.getElementById('spice-filter')
    };
    
    function applyAllFilters() {
        const menuItems = document.querySelectorAll('.menu-item');
        const activeCategory = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
        const searchTerm = filters.search?.value.toLowerCase().trim() || '';
        const maxPrice = filters.price ? parseFloat(filters.price.value) : Infinity;
        const selectedAllergens = Array.from(filters.allergens)
            .filter(filter => filter.checked)
            .map(filter => filter.value);
        const selectedSpice = filters.spice?.value || 'all';
        
        menuItems.forEach(item => {
            let shouldShow = true;
            
            // Category filter
            if (activeCategory !== 'all') {
                const categories = item.getAttribute('data-categories') || '';
                const categoryList = categories.split(' ').filter(cat => cat.length > 0);
                if (!categoryList.includes(activeCategory)) {
                    shouldShow = false;
                }
            }
            
            // Search filter
            if (searchTerm && shouldShow) {
                const title = item.querySelector('.menu-item-title').textContent.toLowerCase();
                const description = item.querySelector('.menu-item-description').textContent.toLowerCase();
                if (!title.includes(searchTerm) && !description.includes(searchTerm)) {
                    shouldShow = false;
                }
            }
            
            // Price filter
            if (shouldShow && filters.price) {
                const priceText = item.querySelector('.menu-item-price').textContent;
                const price = parseFloat(priceText.replace('£', ''));
                if (price > maxPrice) {
                    shouldShow = false;
                }
            }
            
            // Allergen filter (now dietary filter)
            if (shouldShow && selectedAllergens.length > 0) {
                const dietary = item.getAttribute('data-dietary') || '';
                const dietaryList = dietary.split(',').map(d => d.trim()).filter(d => d.length > 0);
                
                // Check if item meets all dietary requirements
                const meetsAllRequirements = selectedAllergens.every(requirement => {
                    const dietaryRequirement = requirement + '-free';
                    return dietaryList.includes(dietaryRequirement);
                });
                
                if (!meetsAllRequirements) {
                    shouldShow = false;
                }
            }
            
            // Spice filter
            if (shouldShow && selectedSpice !== 'all') {
                const spiceLevel = item.getAttribute('data-spice') || 'mild';
                if (spiceLevel !== selectedSpice) {
                    shouldShow = false;
                }
            }
            
            // Show or hide item
            if (shouldShow) {
                showMenuItem(item);
            } else {
                hideMenuItem(item);
            }
        });
    }
    
    // Add event listeners to all filters
    Object.values(filters).flat().forEach(filter => {
        if (filter) {
            const eventType = filter.type === 'text' ? 'input' : 'change';
            filter.addEventListener(eventType, applyAllFilters);
        }
    });
}

// Initialize search functionality if search input exists
document.addEventListener('DOMContentLoaded', function() {
    initMenuSearch();
    initPriceFilter();
    initAllergenFilter();
    initSpiceFilter();
    // initAdvancedFiltering(); // Uncomment for advanced filtering
});

// Add animation to filter results
const filterStyles = `
    .menu-item {
        transition: all 0.3s ease;
    }
    
    .menu-item.filtering {
        opacity: 0.5;
        transform: scale(0.95);
    }
    
    .filter-btn {
        position: relative;
        overflow: hidden;
    }
    
    .filter-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        transition: left 0.5s;
    }
    
    .filter-btn:hover::before {
        left: 100%;
    }
    
    .menu-section {
        margin-bottom: 4rem;
    }
    
    .menu-section .section-title {
        text-align: left;
        margin-bottom: 2rem;
        position: relative;
        padding-bottom: 1rem;
    }
    
    .menu-section .section-title::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 60px;
        height: 3px;
        background: var(--primary-color);
    }
`;

// Add filter styles to head
const filterStyleSheet = document.createElement('style');
filterStyleSheet.textContent = filterStyles;
document.head.appendChild(filterStyleSheet);
