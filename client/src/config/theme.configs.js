import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";

export const themeModes = {
    dark: "dark",
    light: "light"
};

const themeConfigs = {
    custom: ({ mode }) => {
        const customPalette = mode === themeModes.dark ? {
            primary: {
                main: "#00838f",
                contrastText: "#ffffff"
            },
            secondary: {
                main: "#00bcd4",
                contrastText: "#ffffff"
            },
            background: {
                default: "#000000",
                paper: "#131313"
            }
        } : {
            primary: {
                main: "#00838f"
            },
            secondary: {
                main: "#00bcd4"
            },
            background: {
                default: colors.grey["100"],
            }
        };

        return createTheme({
            palette: {
                mode,
                ...customPalette
            },
            components: {
                MuiButton: {
                    defaultProps: { disableElevation: true }
                }
            }
        });
    }
};

export default themeConfigs;