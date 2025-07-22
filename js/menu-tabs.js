// Menu Tabs Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const spiceButtons = document.querySelectorAll('.spice-btn');

    // Filter functionality variables
    let activeFilters = new Set(['all']);
    let activeSpiceFilter = null;

    // Function to toggle filter section visibility
    function toggleFilterVisibility(activeTab) {
        const filterSection = document.querySelector('.filter-section');
        if (filterSection) {
            if (activeTab === 'happy-hour' || activeTab === 'drinks' || activeTab === 'vegan') {
                filterSection.style.display = 'none';
            } else {
                filterSection.style.display = 'block';
            }
        }
    }

    // Check for hash in URL and switch to corresponding tab
    function switchToTabFromHash() {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            const targetButton = document.querySelector(`[data-tab="${hash}"]`);
            const targetContent = document.getElementById(hash);
            
            if (targetButton && targetContent) {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to target button and content
                targetButton.classList.add('active');
                targetContent.classList.add('active');
                
                // Reset filters when switching tabs
                resetFilters();
                
                // Hide filter section for Happy Hour tab
                toggleFilterVisibility(hash);
                return;
            }
        }
        
        // If no valid hash, initialize first tab as active
        if (tabButtons.length > 0 && tabContents.length > 0) {
            tabButtons[0].classList.add('active');
            tabContents[0].classList.add('active');
            
            // Set initial filter visibility
            const firstTabId = tabContents[0].id;
            toggleFilterVisibility(firstTabId);
        }
    }

    // Initialize tabs based on hash or default to first tab
    switchToTabFromHash();

    // Listen for hash changes (browser back/forward)
    window.addEventListener('hashchange', switchToTabFromHash);

    // Tab switching functionality - only if tab buttons exist
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Update URL hash
                window.location.hash = targetTab;
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
            
            // Show corresponding tab content
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // Reset filters when switching tabs
            resetFilters();                // Hide filter section for Happy Hour tab
                toggleFilterVisibility(targetTab);
            });
        });
    }

    function resetFilters() {
        activeFilters = new Set(['all']);
        activeSpiceFilter = null;
        
        // Reset filter button states - only if they exist
        if (filterButtons.length > 0) {
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.filter === 'all') {
                    btn.classList.add('active');
                }
            });
        }
        
        if (spiceButtons.length > 0) {
            spiceButtons.forEach(btn => btn.classList.remove('active'));
        }
        
        // Show all items
        showAllItems();
    }

    function showAllItems() {
        const allMenuItems = document.querySelectorAll('.menu-item');
        allMenuItems.forEach(item => {
            item.classList.remove('hidden');
            
            // Also show all combo options
            const comboOptions = item.querySelectorAll('.combo-option');
            comboOptions.forEach(option => {
                option.style.display = 'flex';
            });
        });
    }

    function filterItems() {
        const currentTab = document.querySelector('.tab-content.active');
        if (!currentTab) return;

        const menuItems = currentTab.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            let shouldShow = true;

            // Check if it's a combo parent item
            if (item.classList.contains('combo-parent')) {
                // For combo items, check if any combo option matches the filters
                const comboOptions = item.querySelectorAll('.combo-option');
                let hasMatchingOption = false;

                comboOptions.forEach(option => {
                    let optionMatches = true;

                    // Check dietary filters for combo option
                    if (!activeFilters.has('all')) {
                        const optionDietary = option.dataset.dietary || '';
                        const optionDietaryArray = optionDietary.split(',').map(d => d.trim()).filter(d => d);
                        
                        const hasMatchingDietary = Array.from(activeFilters).some(filter => 
                            optionDietaryArray.includes(filter)
                        );
                        
                        if (!hasMatchingDietary) {
                            optionMatches = false;
                        }
                    }

                    // Check spice level filter for combo option
                    if (activeSpiceFilter && optionMatches) {
                        const optionSpice = option.dataset.spice || '';
                        if (optionSpice !== activeSpiceFilter) {
                            optionMatches = false;
                        }
                    }

                    // Show/hide individual combo options
                    if (optionMatches) {
                        option.style.display = 'flex';
                        hasMatchingOption = true;
                    } else {
                        option.style.display = 'none';
                    }
                });

                // Show combo parent if any option matches
                shouldShow = hasMatchingOption;
            } else {
                // Regular menu item filtering (existing logic)
                // Check dietary filters
                if (!activeFilters.has('all')) {
                    const itemDietary = item.dataset.dietary || '';
                    const itemDietaryArray = itemDietary.split(',').map(d => d.trim()).filter(d => d);
                    
                    const hasMatchingDietary = Array.from(activeFilters).some(filter => 
                        itemDietaryArray.includes(filter)
                    );
                    
                    if (!hasMatchingDietary) {
                        shouldShow = false;
                    }
                }

                // Check spice level filter
                if (activeSpiceFilter && shouldShow) {
                    const itemSpice = item.dataset.spice || '';
                    if (itemSpice !== activeSpiceFilter) {
                        shouldShow = false;
                    }
                }
            }

            // Show or hide item
            if (shouldShow) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    // Dietary filter button events - only if filter buttons exist
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                if (filter === 'all') {
                    // Reset to show all
                    activeFilters = new Set(['all']);
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                } else {
                    // Toggle specific filter
                    if (activeFilters.has(filter)) {
                        activeFilters.delete(filter);
                        this.classList.remove('active');
                    } else {
                        activeFilters.delete('all');                        activeFilters.add(filter);
                        this.classList.add('active');
                        
                        // Remove 'all' button active state
                        const allButton = document.querySelector('.filter-btn[data-filter="all"]');
                        if (allButton) allButton.classList.remove('active');
                    }
                    
                    // If no filters selected, default to 'all'
                    if (activeFilters.size === 0) {
                        activeFilters.add('all');
                        const allButton = document.querySelector('.filter-btn[data-filter="all"]');
                        if (allButton) allButton.classList.add('active');
                    }
                }
                
                filterItems();
            });
        });
    }

    // Spice level filter events - only if spice buttons exist
    if (spiceButtons.length > 0) {
        spiceButtons.forEach(button => {
            button.addEventListener('click', function() {
                const spiceLevel = this.dataset.spice;
                
                // Toggle spice filter
                if (activeSpiceFilter === spiceLevel) {
                    activeSpiceFilter = null;
                    this.classList.remove('active');
                } else {
                    spiceButtons.forEach(btn => btn.classList.remove('active'));
                    activeSpiceFilter = spiceLevel;
                    this.classList.add('active');
                }
                
                filterItems();
            });
        });
    }

    // Smooth scroll for tab content
    function smoothScrollToContent() {
        const tabsSection = document.querySelector('.menu-tabs-section');
        if (tabsSection) {
            tabsSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Optional: Add smooth scroll when tab changes
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                setTimeout(smoothScrollToContent, 100);
            });
        });
    }
});
