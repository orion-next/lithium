import { ColorSchemeUtility } from "./theme.ts";

const Application = {
    InitializeColorSchemeToggle: () => {
        // Initialize theme toggle button

        const COLOR_SCHEME_KEY = `${window.location.hostname}-ColorScheme`;
        const savedScheme = localStorage.getItem(COLOR_SCHEME_KEY);
        const colorScheme = savedScheme ?? document.documentElement.dataset.defaultTheme ?? "auto";
        const isDarkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches === true;

        // Initialize saved theme settings to default value
        if (!savedScheme) localStorage.setItem(COLOR_SCHEME_KEY, colorScheme);

        // Set theme to correct value based on saved settings or user system preference
        if (colorScheme == 'dark' || (colorScheme == 'auto' && isDarkModePreferred)) {
            document.documentElement.dataset.colorScheme = 'dark';
        } else {
            document.documentElement.dataset.colorScheme = 'light';
        }

        const themeToggle = document.getElementById('theme-toggle');
        new ColorSchemeUtility(themeToggle);
    },

    AddBackButtonListener: () => {
        document.querySelectorAll("[data-js-action='back']").forEach((el: Element) => {
            el.addEventListener('click', (evt: Event) => {
                if (document.referrer.indexOf(window.location.host) !== -1) { 
                    evt.preventDefault();
                    history.back();
                } else {
                    window.location.replace("/");
                }
            });
        });
    },

    AddGalleryScrollListener: () => {
        const gallery = document.querySelector("[data-gallery-scroll]") as HTMLElement;
        const popup = document.querySelector(".popup") as HTMLElement;

        if (!gallery || !popup) return;

        popup.addEventListener('click', () => {
            // Clear children
            popup.innerHTML = '';

            // Hide popup viewer
            popup.classList.add("hidden");
        });

        [...gallery.children].forEach((el: Element) => {
            el.addEventListener('click', (evt: Event) => {
                // Clone element
                const cloneElement = el.cloneNode(true);
                cloneElement.addEventListener('click', () => {
                    // Clear children
                    popup.innerHTML = '';

                    // Hide popup viewer
                    popup.classList.add("hidden");
                })

                // Show popup viewer
                popup.classList.remove("hidden");

                // Add clone to popup viewer
                popup.appendChild(cloneElement);
            })
        })
    }
}

const OnApplicationLoad = () => {
    Application.InitializeColorSchemeToggle();
    Application.AddBackButtonListener();
    Application.AddGalleryScrollListener();
}


window.addEventListener('load', () => {
    setTimeout(OnApplicationLoad, 0);
});