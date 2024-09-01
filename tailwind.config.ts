import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
    theme: {
        extend: {
            fontFamily: {
                // noto: ["Noto Sans", "DM Sans fallback", ...defaultTheme.fontFamily.sans],
                onest: ["Onest", "DM Sans fallback", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                envy: {
                    50: "#f1f8f3",
                    100: "#dcefdf",
                    200: "#bcdec3",
                    300: "#8fc69e",
                    400: "#60a776",
                    500: "#449761",
                    600: "#2d6e45",
                    700: "#245838",
                    800: "#1e472e",
                    900: "#1a3a28",
                    950: "#0e2016",
                },
            },
            fontSize: {
                xxs: ".65rem",
            },
        },
    },
};
