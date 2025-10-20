document.addEventListener('DOMContentLoaded', () => {
    const createTokenBtn = document.querySelector('.create-new-token-btn');
    const popupOverlay = document.getElementById('createTokenPopup');
    
    if (createTokenBtn && popupOverlay) {
        createTokenBtn.addEventListener('click', () => {
            popupOverlay.style.display = 'flex';
        });

        popupOverlay.addEventListener('click', (event) => {
            // Close popup if clicked outside the content
            if (event.target === popupOverlay) {
                popupOverlay.style.display = 'none';
            }
        });
    }

    // --- Combined Settings Dropdown Logic for Desktop and Mobile ---
    const allSettingsIcons = document.querySelectorAll('.header__settings-icon, .mobile-menu-settings');

    allSettingsIcons.forEach(icon => {
        icon.addEventListener('click', (event) => {
            event.stopPropagation();
            const parentProfile = event.currentTarget.closest('.header__user-profile, .mobile-menu-profile');

            if (parentProfile) {
                const dropdown = parentProfile.querySelector('.settings-dropdown');

                if (dropdown) {
                    dropdown.classList.toggle('show');
                }
            }
        });
    });

    // --- Combined Theme Switcher Logic ---
    const themeToggles = document.querySelectorAll('#themeToggle, #themeToggleMobile');

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
        themeToggles.forEach(toggle => {
            if(toggle) toggle.checked = (theme === 'dark');
        });
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    themeToggles.forEach(toggle => {
        if(toggle) {
            toggle.addEventListener('change', () => {
                const newTheme = toggle.checked ? 'dark' : 'light';
                localStorage.setItem('theme', newTheme);
                applyTheme(newTheme);
            });
        }
    });

    // --- Close dropdown when clicking outside ---
    document.addEventListener('click', (event) => {
        document.querySelectorAll('.settings-dropdown').forEach(dropdown => {
            const parentProfile = dropdown.closest('.header__user-profile, .mobile-menu-profile');
            const settingsIcon = parentProfile ? parentProfile.querySelector('.header__settings-icon, .mobile-menu-settings') : null;

            if (dropdown.classList.contains('show') && !dropdown.contains(event.target) && !(settingsIcon && settingsIcon.contains(event.target))) {
                dropdown.classList.remove('show');
            }
        });
    });

    // --- Language Submenu Logic ---
    // NOTE: Language switching is handled in translations.js
    document.querySelectorAll('.language-item').forEach(item => {
        item.addEventListener('click', (event) => {
            event.stopPropagation();
            item.classList.toggle('submenu-active');
        });
    });

    // ============================================
    // МОБИЛЬНОЕ МЕНЮ
    // ============================================
    (function () {
        "use strict";

        const burgerBtn = document.querySelector(".header__burger-menu");
        const overlay = document.querySelector(".mobile-menu-overlay");
        const drawer = document.querySelector(".mobile-menu-drawer");
        const closeBtn = document.querySelector(".mobile-menu-close");
        const navLinks = document.querySelectorAll(".mobile-menu-link");

        if (!burgerBtn || !overlay || !drawer) {
            console.error("Mobile menu elements not found!");
            return;
        }

        const closeMenu = () => {
            overlay.classList.remove("active");
            document.body.style.overflow = "";
        }

        burgerBtn.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            overlay.classList.add("active");
            document.body.style.overflow = "hidden";
        });

        if (closeBtn) {
            closeBtn.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                closeMenu();
            });
        }

        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) closeMenu();
        });

        drawer.addEventListener("click", function (e) {
            e.stopPropagation();
        });

        navLinks.forEach(link => link.addEventListener("click", closeMenu));

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && overlay.classList.contains("active")) closeMenu();
        });
    })();
});