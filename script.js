


document.addEventListener('DOMContentLoaded', () => {



    const createTokenBtn = document.querySelector('.create-new-token-btn');
    const popupOverlay = document.getElementById('createTokenPopup');
    console.log('createTokenBtn:', createTokenBtn);
    console.log('popupOverlay:', popupOverlay);







    if (createTokenBtn && popupOverlay) {



        createTokenBtn.addEventListener('click', () => {
            console.log('Create Token button clicked!');
            popupOverlay.style.display = 'flex';
        });







        popupOverlay.addEventListener('click', (event) => {



            // Close popup if clicked outside the content



            if (event.target === popupOverlay) {



                popupOverlay.style.display = 'none';



            }



        });



    }







    // Settings Dropdown Logic



    const settingsIcon = document.querySelector('.header__settings-icon');
    const settingsDropdown = document.querySelector('.settings-dropdown');
    console.log('settingsIcon:', settingsIcon);
    console.log('settingsDropdown:', settingsDropdown);



    const languageItem = document.querySelector('.language-item');



    const themeToggle = document.getElementById('themeToggle');







    if (settingsIcon && settingsDropdown) {



        settingsIcon.addEventListener('click', (event) => {
            console.log('Settings icon clicked!');
            event.stopPropagation(); // Prevent the document click from firing immediately
            // Because there are multiple dropdowns, we need to find the one next to the clicked icon
            const parentProfile = event.currentTarget.closest('.header__user-profile');
            const dropdown = parentProfile.querySelector('.settings-dropdown');
            dropdown.classList.toggle('show');
        });



    }







    // Close dropdown when clicking outside



    document.addEventListener('click', (event) => {



        const allDropdowns = document.querySelectorAll('.settings-dropdown');



        allDropdowns.forEach(dropdown => {



            if (dropdown.classList.contains('show') && !dropdown.contains(event.target) && !event.target.matches('.header__settings-icon')) {



                dropdown.classList.remove('show');



            }



        });



    });



    



            // Theme Switcher Logic
            console.log('themeToggle element:', themeToggle);

            const applyTheme = (theme) => {
                console.log('Applying theme:', theme);
                console.log('Body classList BEFORE:', Array.from(document.body.classList));
                if (theme === 'dark') {
                    document.body.classList.add('dark-theme');
                    if (themeToggle) themeToggle.checked = true;
                } else {
                    document.body.classList.remove('dark-theme');
                    if (themeToggle) themeToggle.checked = false;
                }
                console.log('Body classList AFTER:', Array.from(document.body.classList));
            };

            // Apply saved theme on page load
            const savedTheme = localStorage.getItem('theme') || 'light';
            console.log('Saved theme:', savedTheme);
            applyTheme(savedTheme);

            // Add event listeners to both toggles
            if (themeToggle) {
                themeToggle.addEventListener('change', () => {
                    console.log('Theme toggle changed. Checked state:', themeToggle.checked);
                    const newTheme = themeToggle.checked ? 'dark' : 'light';
                    localStorage.setItem('theme', newTheme);
                    applyTheme(newTheme);
                });
            }



    







    







    



        







            // --- I18n Language Switching Logic ---







            const setLanguage = (lang) => {







                document.querySelectorAll('[data-i18n-key]').forEach(element => {







                    const key = element.getAttribute('data-i18n-key');







                    const translation = translations[lang][key];







                    if (translation) {







                        // Handle different element types (e.g., inputs, buttons, text)







                        if (element.placeholder !== undefined) {







                            element.placeholder = translation;







                        } else {







                            element.textContent = translation;







                        }







                    }







                });







                // Save language choice







                localStorage.setItem('language', lang);







            };







        







            // Set language on page load







            const savedLang = localStorage.getItem('language') || 'en';







            setLanguage(savedLang);







        







            // Add event listeners to language selection buttons







            // Note: This needs to be robust against multiple dropdowns on the page







            document.querySelectorAll('.language-option').forEach(button => {







                button.addEventListener('click', (event) => {







                    const lang = event.currentTarget.textContent.trim().toLowerCase() === 'russian' ? 'ru' : 'en';







                    setLanguage(lang);







                    // Optionally close the dropdown







                    const dropdown = event.currentTarget.closest('.settings-dropdown');







                    if (dropdown) {







                        dropdown.classList.remove('show');







                    }







                });







            });







        















        







            







        







                // Prevent dropdown from closing when language item is clicked and toggle submenu







        







                if (languageItem) {







                languageItem.addEventListener('click', (event) => {







                    event.stopPropagation();







                    languageItem.classList.toggle('submenu-active');







                });







            }



});


