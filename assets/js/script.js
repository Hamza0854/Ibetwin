// Sidebar Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const navLeft = document.querySelector('.nav-left');
    const sidebarMenu = document.getElementById('sidebarMenu');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const closeIcon = document.getElementById('closeSidebar');
    const navTabs = document.querySelectorAll('.nav-tab');
    const contentSections = document.querySelectorAll('.content-section');
    const favoriteIcons = document.querySelectorAll('.favorite-icon');
    const dropdownHeader = document.getElementById('dropdownHeader');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    // Toggle sidebar menu
    function toggleSidebar() {
        sidebarMenu.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        
        // Prevent body scroll when sidebar is open
        if (sidebarMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    // Close sidebar
    function closeSidebar() {
        sidebarMenu.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Switch tab content
    function switchTab(targetTab) {
        // Remove active class from all tabs and content sections
        navTabs.forEach(tab => tab.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));

        // Add active class to clicked tab
        const activeTab = document.querySelector(`[data-tab="${targetTab}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        // Show corresponding content section
        const targetContent = document.getElementById(`${targetTab}Content`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }

    // Toggle favorite status
    function toggleFavorite(icon) {
        icon.classList.toggle('favorited');
        
        if (icon.classList.contains('favorited')) {
            icon.className = 'fas fa-star favorite-icon favorited';
        } else {
            icon.className = 'far fa-star favorite-icon';
        }
    }

    // Event listeners
    if (navLeft) {
        navLeft.addEventListener('click', toggleSidebar);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    if (closeIcon) {
        closeIcon.addEventListener('click', closeSidebar);
    }

    // Tab switching
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });

    // Favorite icons
    favoriteIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering parent click events
            toggleFavorite(this);
        });
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebarMenu.contains(e.target) && !navLeft.contains(e.target)) {
                closeSidebar();
            }
        }
    });

    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSidebar();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeSidebar();
        }
    });

    // Dropdown functionality
    function toggleDropdown() {
        console.log('Toggle dropdown clicked');
        console.log('dropdownMenu:', dropdownMenu);
        console.log('dropdownHeader:', dropdownHeader);
        
        if (dropdownMenu && dropdownHeader) {
            const isActive = dropdownMenu.classList.contains('active');
            
            if (!isActive) {
                // Position the dropdown
                const headerRect = dropdownHeader.getBoundingClientRect();
                dropdownMenu.style.top = (headerRect.bottom + 8) + 'px';
                dropdownMenu.style.left = headerRect.left + 'px';
                dropdownMenu.style.width = headerRect.width + 'px';
            }
            
            dropdownMenu.classList.toggle('active');
            dropdownHeader.classList.toggle('active');
            console.log('Dropdown toggled');
        }
    }

    function selectOption(selectedItem) {
        const optionText = selectedItem.querySelector('.option-text').textContent;
        const selectedOption = document.querySelector('.selected-option');
        
        // Update selected option display
        selectedOption.textContent = optionText;
        
        // Remove active class from all items
        dropdownItems.forEach(item => item.classList.remove('active'));
        
        // Add active class to selected item
        selectedItem.classList.add('active');
        
        // Close dropdown
        dropdownMenu.classList.remove('active');
        dropdownHeader.classList.remove('active');
    }

    // Dropdown event listeners
    if (dropdownHeader) {
        dropdownHeader.addEventListener('click', toggleDropdown);
    }

    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            selectOption(this);
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (dropdownHeader && dropdownMenu && 
            !dropdownHeader.contains(e.target) && 
            !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('active');
            dropdownHeader.classList.remove('active');
        }
    });

    // Language dropdown functionality
    const languageDropdown = document.getElementById('languageDropdown');
    const languageMenu = document.getElementById('languageMenu');
    const languageItems = document.querySelectorAll('.language-item');
    const languageText = document.querySelector('.language-text');

    function toggleLanguageDropdown() {
        if (languageMenu && languageDropdown) {
            languageMenu.classList.toggle('active');
            languageDropdown.classList.toggle('active');
        }
    }

    function selectLanguage(selectedItem) {
        const selectedLanguage = selectedItem.querySelector('.language-name').textContent;
        
        // Update selected language display
        languageText.textContent = selectedLanguage;
        
        // Remove active class from all items
        languageItems.forEach(item => item.classList.remove('active'));
        
        // Add active class to selected item
        selectedItem.classList.add('active');
        
        // Close dropdown
        languageMenu.classList.remove('active');
        languageDropdown.classList.remove('active');
    }

    // Language dropdown event listeners
    if (languageDropdown) {
        languageDropdown.addEventListener('click', toggleLanguageDropdown);
    }

    languageItems.forEach(item => {
        item.addEventListener('click', function() {
            selectLanguage(this);
        });
    });

    // Close language dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (languageDropdown && languageMenu && 
            !languageDropdown.contains(e.target) && 
            !languageMenu.contains(e.target)) {
            languageMenu.classList.remove('active');
            languageDropdown.classList.remove('active');
        }
    });

    // Odd items selection functionality
    const oddItems = document.querySelectorAll('.odd-item');
    const oddValues = document.querySelectorAll('.odd-value');
    
    function selectOddItem(clickedItem) {
        // Remove selected class from ALL odd items and odd values across the entire page
        oddItems.forEach(item => item.classList.remove('selected'));
        oddValues.forEach(item => item.classList.remove('selected'));
        
        // Add selected class only to the clicked item
        clickedItem.classList.add('selected');
    }
    
    // Add event listeners to all odd items
    oddItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            selectOddItem(this);
        });
    });
    
    // Add event listeners to all odd values (direct links)
    oddValues.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            selectOddItem(this);
        });
    });

    // Live link functionality - allow navigation to live page
    const liveLink = document.querySelector('.live-link');
    
    if (liveLink) {
        liveLink.addEventListener('click', function(e) {
            // Allow default link behavior to navigate to live.html
            // Add active class for visual feedback
            this.classList.add('active');
        });
    }

    // Coupon accordion functionality
    const couponItems = document.querySelectorAll('.coupon-item');
    
    couponItems.forEach(item => {
        const header = item.querySelector('.coupon-header');
        
        if (header) {
            header.addEventListener('click', function() {
                // Close all other accordion items
                couponItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });

    // Profile dropdown functionality
    const userSection = document.getElementById('userSection');
    const profileDropdown = document.getElementById('profileDropdown');
    const userIcon = document.getElementById('userIcon');
    const profileText = document.getElementById('profileText');
    
    function toggleProfileDropdown() {
        const isActive = userSection.classList.contains('active');
        
        if (!isActive) {
            // Open dropdown
            userSection.classList.add('active');
            profileDropdown.classList.add('active');
        } else {
            // Close dropdown
            userSection.classList.remove('active');
            profileDropdown.classList.remove('active');
        }
    }
    
    function closeProfileDropdown() {
        userSection.classList.remove('active');
        profileDropdown.classList.remove('active');
    }
    
    // Event listeners for profile dropdown
    if (userSection) {
        userSection.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleProfileDropdown();
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (profileDropdown && userSection && 
            !profileDropdown.contains(e.target) && 
            !userSection.contains(e.target)) {
            closeProfileDropdown();
        }
    });
    
    // Close dropdown when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && profileDropdown.classList.contains('active')) {
            closeProfileDropdown();
        }
    });

    // Filter bar search functionality
    const searchIcon = document.getElementById('searchIcon');
    const searchInputContainer = document.getElementById('searchInputContainer');
    const searchInput = document.getElementById('searchInput');
    const filterBar = document.querySelector('.filter-bar');
    const filterLeft = document.querySelector('.filter-left');
    const filterRight = document.querySelector('.filter-right');

    function toggleSearch() {
        const isActive = searchInputContainer.classList.contains('active');
        
        if (!isActive) {
            // Show search input
            searchInputContainer.classList.add('active');
            filterBar.classList.add('search-active');
            searchInput.focus();
        } else {
            // Hide search input
            searchInputContainer.classList.remove('active');
            filterBar.classList.remove('search-active');
            searchInput.value = '';
        }
    }

    function closeSearch() {
        searchInputContainer.classList.remove('active');
        filterBar.classList.remove('search-active');
        searchInput.value = '';
    }

    // Event listeners for search functionality
    if (searchIcon) {
        searchIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSearch();
        });
    }

    // Close search when clicking outside
    document.addEventListener('click', function(e) {
        if (searchInputContainer && searchIcon && 
            !searchInputContainer.contains(e.target) && 
            !searchIcon.contains(e.target)) {
            closeSearch();
        }
    });

    // Close search when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchInputContainer.classList.contains('active')) {
            closeSearch();
        }
    });

    // Handle search input
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                // Handle search functionality here
                console.log('Search for:', this.value);
                // You can add actual search logic here
            }
        });
    }

    // Sports navigation functionality
    const sportItems = document.querySelectorAll('.live-sport-item');
    const sportSections = document.querySelectorAll('#football, #tennis, #basketball');
    
    function switchSportSection(targetSport) {
        // Hide all sport sections
        sportSections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Show the target sport section
        const targetSection = document.getElementById(targetSport);
        if (targetSection) {
            targetSection.style.display = 'block';
        }
        
        // Remove active class from all sport items
        sportItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to clicked sport item
        const activeItem = document.querySelector(`[data-sport="${targetSport}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
        
        // Update filter category text based on selected sport
        const filterCategory = document.querySelector('.filter-category');
        if (filterCategory) {
            const sportNames = {
                'football': 'Futbol',
                'tennis': 'Tennis',
                'basketball': 'Basketball'
            };
            
            if (sportNames[targetSport]) {
                filterCategory.textContent = sportNames[targetSport];
            }
        }
        
        // Update background gradients for all live containers
        const liveContainers = document.querySelectorAll('.live-container');
        liveContainers.forEach(container => {
            // Remove all sport background classes
            container.classList.remove('football-bg', 'tennis-bg', 'basketball-bg');
            
            // Add the appropriate background class based on selected sport
            if (targetSport === 'football') {
                container.classList.add('football-bg');
            } else if (targetSport === 'tennis') {
                container.classList.add('tennis-bg');
            } else if (targetSport === 'basketball') {
                container.classList.add('basketball-bg');
            }
        });

        // Update background gradients for filter bar
        const filterBar = document.querySelector('.filter-bar');
        if (filterBar) {
            // Remove all sport background classes
            filterBar.classList.remove('football-bg', 'tennis-bg', 'basketball-bg');
            
            // Add the appropriate background class based on selected sport
            if (targetSport === 'football') {
                filterBar.classList.add('football-bg');
            } else if (targetSport === 'tennis') {
                filterBar.classList.add('tennis-bg');
            } else if (targetSport === 'basketball') {
                filterBar.classList.add('basketball-bg');
            }
        }

        // Update accent color variable for navbar underline and active item underline
        const navBar = document.querySelector('.live-nav-bottom');
        if (navBar) {
            let accent = '#137A5A';
            if (targetSport === 'tennis') accent = '#4d6b2e';
            if (targetSport === 'basketball') accent = '#9E6900';
            navBar.style.setProperty('--sport-accent', accent);
        }
    }
    
    // Add event listeners to sport items
    sportItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const sportType = this.getAttribute('data-sport');
            if (sportType) {
                switchSportSection(sportType);
            }
        });
    });
    
    // Set default active state (football)
    const defaultSportItem = document.querySelector('[data-sport="football"]');
    if (defaultSportItem) {
        defaultSportItem.classList.add('active');
        // Set initial accent color to football
        const navBar = document.querySelector('.live-nav-bottom');
        if (navBar) {
            navBar.style.setProperty('--sport-accent', '#137A5A');
        }
    }
    
    // Hide tennis and basketball sections by default
    const tennisSection = document.getElementById('tennis');
    const basketballSection = document.getElementById('basketball');
    if (tennisSection) {
        tennisSection.style.display = 'none';
    }
    if (basketballSection) {
        basketballSection.style.display = 'none';
    }
    
    // Set default football background for all live containers
    const liveContainers = document.querySelectorAll('.live-container');
    liveContainers.forEach(container => {
        container.classList.add('football-bg');
    });

    // Set default football background for filter bar
    const filterBarDefault = document.querySelector('.filter-bar');
    if (filterBarDefault) {
        filterBarDefault.classList.add('football-bg');
    }

    // Filter dropdown functionality
    const filterDropdownHeader = document.getElementById('filterDropdownHeader');
    const filterDropdownMenu = document.getElementById('filterDropdownMenu');
    const filterDropdownItems = document.querySelectorAll('.filter-dropdown-item');
    const filterText = document.querySelector('.filter-text');
    
    function toggleFilterDropdown() {
        if (filterDropdownMenu && filterDropdownHeader) {
            const isActive = filterDropdownMenu.classList.contains('active');
            
            if (!isActive) {
                // Position the dropdown
                const headerRect = filterDropdownHeader.getBoundingClientRect();
                filterDropdownMenu.style.top = (headerRect.bottom + 5) + 'px';
                filterDropdownMenu.style.right = '0px';
                filterDropdownMenu.style.width = '200px';
            }
            
            filterDropdownMenu.classList.toggle('active');
            filterDropdownHeader.classList.toggle('active');
        }
    }

    function selectFilterOption(selectedItem) {
        const optionText = selectedItem.querySelector('.filter-option-text').textContent;
        
        // Update selected option display
        filterText.textContent = optionText;
        
        // Remove active class from all items
        filterDropdownItems.forEach(item => item.classList.remove('active'));
        
        // Add active class to selected item
        selectedItem.classList.add('active');
        
        // Close dropdown
        filterDropdownMenu.classList.remove('active');
        filterDropdownHeader.classList.remove('active');
    }

    // Filter dropdown event listeners
    if (filterDropdownHeader) {
        filterDropdownHeader.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleFilterDropdown();
        });
    }

    filterDropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            selectFilterOption(this);
        });
    });

    // Close filter dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (filterDropdownHeader && filterDropdownMenu && 
            !filterDropdownHeader.contains(e.target) && 
            !filterDropdownMenu.contains(e.target)) {
            filterDropdownMenu.classList.remove('active');
            filterDropdownHeader.classList.remove('active');
        }
    });

    // Stats popup functionality
    const statsIcons = document.querySelectorAll('.stats-icon');
    
    function toggleStatsPopup(clickedIcon) {
        const container = clickedIcon.closest('.stats-icon-container');
        const popup = container.querySelector('.stats-popup');
        
        if (popup) {
            // Close all other popups first
            document.querySelectorAll('.stats-popup').forEach(otherPopup => {
                if (otherPopup !== popup) {
                    otherPopup.classList.remove('active');
                }
            });
            
            // Toggle current popup
            popup.classList.toggle('active');
        }
    }
    
    // Add event listeners to all stats icons
    statsIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleStatsPopup(this);
        });
    });
    
    // Close stats popups when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.stats-icon-container')) {
            document.querySelectorAll('.stats-popup').forEach(popup => {
                popup.classList.remove('active');
            });
        }
    });
});
