const COLOR_SCHEME_VALUES = [ 'light', 'dark', 'auto' ];
type COLOR_SCHEME = 'light' | 'dark' | 'auto';

const IsColorScheme = (value: string|null) : value is COLOR_SCHEME => value ? COLOR_SCHEME_VALUES.includes(value) : false;

class ColorSchemeUtility {
    private LocalStorageKey = `${window.location.hostname}-ColorScheme`;
    private CurrentScheme : COLOR_SCHEME;
    private SystemPreferredScheme : COLOR_SCHEME;

    constructor(toggleEl: HTMLElement | null) {
        this.BindMatchMedia();
        this.CurrentScheme = this.ReadSavedSchemeFromStorage();

        this.DispatchEvent(document.documentElement.dataset.colorScheme as COLOR_SCHEME);

        if (toggleEl) this.BindClick(toggleEl);
    }

    private BindClick(el : HTMLElement) {
        el.addEventListener('click', () => {
            this.CurrentScheme = (this.IsColorSchemeDark()) ? 'light' : 'dark';
            this.UpdateHTMLColorScheme();

            if (this.CurrentScheme == this.SystemPreferredScheme) this.CurrentScheme = 'auto';
            this.SaveSchemeToStorage();
        })
    }

    private SaveSchemeToStorage() {
        localStorage.setItem(this.LocalStorageKey, this.CurrentScheme);
    }

    private ReadSavedSchemeFromStorage() : COLOR_SCHEME {
        const savedScheme = localStorage.getItem(this.LocalStorageKey);
        return IsColorScheme(savedScheme) ? savedScheme : 'auto';
    }

    private IsColorSchemeDark = () => (this.CurrentScheme == 'dark' || this.CurrentScheme == 'auto' && this.SystemPreferredScheme == 'dark'); 

    private UpdateHTMLColorScheme() {
        document.documentElement.dataset.colorScheme = (this.IsColorSchemeDark()) ? 'dark' : 'light';
        this.DispatchEvent(document.documentElement.dataset.colorScheme as COLOR_SCHEME);
    }

    private BindMatchMedia() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.SystemPreferredScheme = mediaQuery.matches ? 'dark' : 'light';
        
        mediaQuery.addEventListener('change', (e) => {
                this.SystemPreferredScheme = e.matches ? 'dark' : 'light';
                this.UpdateHTMLColorScheme();
            }
        );
    }

    private DispatchEvent(colorScheme: COLOR_SCHEME) {
        const evt = new CustomEvent('onColorSchemeChange', {
            detail: colorScheme
        });
        window.dispatchEvent(evt);
    }
}

export { ColorSchemeUtility };