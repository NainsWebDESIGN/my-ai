import { createVuetify } from "vuetify";
import * as VDateInput from "vuetify/labs/VDateInput";
import { zhHant } from "vuetify/locale";
import { aliases, mdi } from "vuetify/iconsets/mdi";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: { ...VDateInput },
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },
    // === DESIGN_TOKENS_AUTO: 由 repo-init 依 DESIGN.md 自動產生 ===
    theme: {
      defaultTheme: (() => {
        try {
          const prefs = localStorage.getItem("user-preferences");
          return prefs ? JSON.parse(prefs)?.theme || "dark" : "dark";
        } catch {
          return "dark";
        }
      })(),
      themes: {
        light: {
          colors: {
            primary: "#1976d2",
            "on-primary": "#ffffff",
            background: "#f5f5f5",
            surface: "#ffffff",
            "on-surface": "#212121",
          },
        },
        dark: {
          colors: {
            primary: "#1976d2",
            "on-primary": "#ffffff",
            background: "#121212",
            surface: "#1e1e1e",
            "on-surface": "#ffffff",
          },
        },
      },
    },
    // === DESIGN_TOKENS_AUTO_END ===
    locale: {
      locale: "zhHant",
      fallback: "sv",
      messages: { zhHant },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});