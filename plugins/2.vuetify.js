// Vuetify configuration
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { mdi } from 'vuetify/iconsets/mdi'
import { md2 } from 'vuetify/blueprints'
import colors from 'vuetify/lib/util/colors'



const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#F9FAFB',
    surface: "#FFFFFF",
    primary: "#6200EE",
    "primary-darken-1": "#3700B3",
    secondary: "#03DAC6",
    "secondary-darken-1": "#018786",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
    labeling_service_tag: "#6200EE",
  },
};

const myCustomDarkTheme = {
  dark: true,
  colors: {
    background: '#202839ff',
    surface: "#2f3649ff",
    primary: "#6200EE",
    "primary-darken-1": colors.purple.darken1,
    secondary: "#03DAC6",
    "secondary-darken-1": "#018786",
    error: "#CF6679",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
    labeling_service_tag: "#BB86FC",
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    blueprint: md2,
    icons: {
      defaultSet: 'mdi',
      sets: {
        mdi,
      },
    },
    theme: {
      defaultTheme: "myCustomDarkTheme",
      themes: {
        myCustomLightTheme,
        myCustomDarkTheme,
      },
    },
  });
  nuxtApp.vueApp.use(vuetify);
});
