// Locations page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map interactions
    initializeMapFeatures();
    
    // Handle location card interactions
    initializeLocationCard();
});

function initializeMapFeatures() {
    const mapContainer = document.getElementById('map');
    
    if (mapContainer) {
        // Add loading state
        mapContainer.addEventListener('load', function() {
            console.log('Map loaded successfully');
        });
        
        // Handle any map interaction errors
        mapContainer.addEventListener('error', function() {
            console.warn('Map failed to load, showing fallback');
            showMapFallback();
        });
    }
}

function initializeLocationCard() {
    // Handle call button clicks
    const callButtons = document.querySelectorAll('[data-fd="contact-us-button"]');
    callButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track call interaction
            trackInteraction('call_button_clicked');
        });
    });
    
    // Handle directions button clicks
    const directionsButtons = document.querySelectorAll('[data-fd="get-directions-button"]');
    directionsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track directions interaction
            trackInteraction('directions_button_clicked');
        });
    });
    
    // Handle phone link clicks
    const phoneLinks = document.querySelectorAll('[data-fd="phone-link"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track phone interaction
            trackInteraction('phone_link_clicked');
        });
    });
}

function showMapFallback() {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        mapContainer.innerHTML = `
            <div class="map-fallback">
                <div class="fallback-content">
                    <i class="fas fa-map-marker-alt"></i>
                    <h3>Unable to load map</h3>
                    <p>391 Benton Park Road, Newcastle upon Tyne NE7 7EE</p>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=Sanskrit Restaurant, 391 Benton Park Road, Newcastle upon Tyne NE7 7EE" 
                       target="_blank" class="btn btn-primary">
                        Get Directions
                    </a>
                </div>
            </div>
        `;
    }
}

function trackInteraction(action) {
    // Analytics tracking for user interactions
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': 'locations_page',
            'event_label': 'sanskrit_restaurant'
        });
    }
    
    console.log('User interaction:', action);
}

// Update opening hours status
function updateOpeningStatus() {
    const statusElement = document.querySelector('.css-jqs2rm');
    if (!statusElement) return;
    
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hour * 60 + minutes; // Convert to minutes
    
    // Restaurant hours (in minutes from midnight)
    const hours = {
        // Breakfast: 8:00 AM - 3:00 PM (Daily)
        // Dinner: Mon-Fri: 5:00 PM - 10:30 PM, Sat-Sun: 3:00 PM - 10:30 PM
        1: { breakfast: { open: 8 * 60, close: 15 * 60 }, dinner: { open: 17 * 60, close: 22.5 * 60 } }, // Monday
        2: { breakfast: { open: 8 * 60, close: 15 * 60 }, dinner: { open: 17 * 60, close: 22.5 * 60 } }, // Tuesday
        3: { breakfast: { open: 8 * 60, close: 15 * 60 }, dinner: { open: 17 * 60, close: 22.5 * 60 } }, // Wednesday
        4: { breakfast: { open: 8 * 60, close: 15 * 60 }, dinner: { open: 17 * 60, close: 22.5 * 60 } }, // Thursday
        5: { breakfast: { open: 8 * 60, close: 15 * 60 }, dinner: { open: 17 * 60, close: 22.5 * 60 } }, // Friday
        6: { breakfast: { open: 8 * 60, close: 15 * 60 }, dinner: { open: 15 * 60, close: 22.5 * 60 } }, // Saturday
        0: { breakfast: { open: 8 * 60, close: 15 * 60 }, dinner: { open: 15 * 60, close: 22.5 * 60 } }  // Sunday
    };
    
    const todayHours = hours[day];
    let statusText = '';
    let isOpen = false;
    
    // Check if currently in breakfast hours
    const breakfastHours = todayHours.breakfast;
    const dinnerHours = todayHours.dinner;
    
    if (breakfastHours && currentTime >= breakfastHours.open && currentTime < breakfastHours.close) {
        // Restaurant is open for breakfast
        isOpen = true;
        const closeTime = formatTime(Math.floor(breakfastHours.close / 60), breakfastHours.close % 60);
        statusText = `Open for breakfast until ${closeTime}`;
    } else if (dinnerHours && currentTime >= dinnerHours.open && currentTime < dinnerHours.close) {
        // Restaurant is open for dinner
        isOpen = true;
        const closeTime = formatTime(Math.floor(dinnerHours.close / 60), dinnerHours.close % 60);
        statusText = `Open for dinner until ${closeTime}`;
    } else if (breakfastHours && currentTime < breakfastHours.open) {
        // Restaurant opens for breakfast later today
        const openTime = formatTime(Math.floor(breakfastHours.open / 60), breakfastHours.open % 60);
        statusText = `Opens for breakfast at ${openTime}`;
    } else if (dinnerHours && currentTime > breakfastHours.close && currentTime < dinnerHours.open) {
        // Between breakfast and dinner
        const openTime = formatTime(Math.floor(dinnerHours.open / 60), dinnerHours.open % 60);
        statusText = `Opens for dinner at ${openTime}`;
    } else if (dinnerHours && currentTime < dinnerHours.open && currentTime > breakfastHours.close) {
        // After breakfast, before dinner
        const openTime = formatTime(Math.floor(dinnerHours.open / 60), dinnerHours.open % 60);
        statusText = `Opens for dinner at ${openTime}`;
    } else {
        // Restaurant is closed, find next opening
        const tomorrow = (day + 1) % 7;
        const tomorrowHours = hours[tomorrow];
        if (tomorrowHours && tomorrowHours.breakfast) {
            const openTime = formatTime(Math.floor(tomorrowHours.breakfast.open / 60), tomorrowHours.breakfast.open % 60);
            statusText = `Closed - Opens tomorrow at ${openTime}`;
        } else {
            statusText = 'Closed';
        }
    }
    
    statusElement.textContent = statusText;
    
    // Update icon color based on status (subtle indicator)
    const iconElement = document.querySelector('[data-fd="open-icon"]');
    if (iconElement) {
        iconElement.style.color = isOpen ? '#28a745' : '#dc3545';
        // Remove any previous content and keep it clean
        iconElement.innerHTML = '';
    }
}

function formatTime(hour, minute) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    const displayMinute = minute === 0 ? '' : `:${minute.toString().padStart(2, '0')}`;
    return `${displayHour}${displayMinute} ${period}`;
}

// Update status immediately and then every minute
updateOpeningStatus();
setInterval(updateOpeningStatus, 60000);

// Add styles for map fallback
const locationStyles = `
    .map-fallback {
        height: 600px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        border-radius: 12px;
        text-align: center;
    }
    
    .fallback-content {
        padding: 2rem;
        max-width: 400px;
    }
    
    .fallback-content i {
        font-size: 4rem;
        color: #6c757d;
        margin-bottom: 1rem;
    }
    
    .fallback-content h3 {
        color: #495057;
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }
    
    .fallback-content p {
        color: #6c757d;
        margin-bottom: 2rem;
        font-size: 1.1rem;
    }
    
    .fallback-content .btn {
        padding: 0.75rem 2rem;
        font-size: 1.1rem;
        border-radius: 25px;
        text-decoration: none;
        background: var(--primary-color);
        color: white;
        border: none;
        transition: all 0.3s ease;
    }
    
    .fallback-content .btn:hover {
        background: var(--primary-dark);
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(218, 165, 32, 0.3);
    }
`;

// Add location styles to head
const locationStyleSheet = document.createElement('style');
locationStyleSheet.textContent = locationStyles;
document.head.appendChild(locationStyleSheet);
