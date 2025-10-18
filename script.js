


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







    // Settings Dropdown Logic



    const settingsIcon = document.querySelector('.header__settings-icon');



    // There are multiple dropdowns with the same ID, which is invalid HTML.



    // We should use a class or query for the one relevant to the current page.



    // For now, let's assume we only care about the first one found.



    const settingsDropdown = document.querySelector('.settings-dropdown');



    const languageItem = document.querySelector('.language-item');



    const themeToggle = document.getElementById('themeToggle');







    if (settingsIcon && settingsDropdown) {



        settingsIcon.addEventListener('click', (event) => {



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



    if(themeToggle) {



        themeToggle.addEventListener('change', () => {



            document.body.classList.toggle('dark-theme');



            // Here you would also save the user's preference, e.g., in localStorage



        });



    }







        // Prevent dropdown from closing when language item is clicked and toggle submenu







        if (languageItem) {







            languageItem.addEventListener('click', (event) => {







                event.stopPropagation();







                languageItem.classList.toggle('submenu-active');







            });







        }



});


