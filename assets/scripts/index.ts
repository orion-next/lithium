import { ColorSchemeUtility } from "./theme";

const Application = {
    InitializeColorSchemeToggle: () => {
        // Initialize theme toggle button
            
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

        for (let i=0; i<gallery.children.length; i++) {
            let el = gallery.children.item(i) as HTMLElement;

            el.addEventListener('click', (evt: Event) => {
                // Clone element
                const cloneElement = el.cloneNode(true) as HTMLElement;

                let fullImageURL = el.dataset.image;
                let cloneImage = cloneElement.querySelector("img");
                if (!fullImageURL || !cloneImage) return;

                cloneImage.src = fullImageURL;

                cloneElement.addEventListener('click', () => {
                    // Clear children
                    popup.innerHTML = '';
                    
                    // Reset scrolling
                    document.body.dataset.preventScroll = "false";
                    document.body.style.top = '';

                    // Hide popup viewer
                    popup.classList.add("hidden");
                })

                // Show popup viewer
                popup.classList.remove("hidden");

                // Prevent background scrolling
                document.body.dataset.preventScroll = "true";
                document.body.style.top = `-${window.scrollY}px`;

                // Add clone to popup viewer
                popup.appendChild(cloneElement);
            })
        }
    }
}

window.addEventListener('load', () => {
    setTimeout(() => {
        Application.InitializeColorSchemeToggle();
        Application.AddBackButtonListener();
        Application.AddGalleryScrollListener();

        // document.body.dataset.loading = "false";
    }, 0);
});