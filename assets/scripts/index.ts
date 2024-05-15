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
    }
}

const OnApplicationLoad = () => {
    Application.InitializeColorSchemeToggle();
}


window.addEventListener('load', () => {
    setTimeout(OnApplicationLoad, 0);
});