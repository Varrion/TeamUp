// context.js
import React, {useContext, useMemo, useState} from "react";
import {ThemeProvider} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {createMuiTheme} from "@material-ui/core";
import {Gender} from "../services/UserService";

const CustomThemeContext = React.createContext(null);

const CustomThemeProvider = ({children}) => {
    const [dark, setDark] = useState(false);
    const [loggedUserGender, setLoggedUserGender] = useState(Gender.Male);

    const myTheme = {
        palette: {
            type: dark ? "dark" : "light",
            primary: {
                main: loggedUserGender === Gender.Female ? '#f50057' : '#1976d2',
            }
        },
        typography: {
            h3: {
                fontFamily: ["Trirong", "serif"].join(','),
                textTransform: "uppercase",
                fontStyle: "oblique",
                fontWeight: "bold"
            }
        }
    }

    const toggleDarkMode = () => {
        setDark(!dark);
    }

    const changeMainColorByUserGender = (gender) => {
        setLoggedUserGender(gender);
    }

    const theme = useMemo(
        () => {
            return createMuiTheme(myTheme)
        }, [dark, loggedUserGender]);

    return (
        <CustomThemeContext.Provider value={{
            toggleDarkMode: toggleDarkMode,
            changeMainColorByUserGender: changeMainColorByUserGender
        }}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </CustomThemeContext.Provider>
    );
}

export default CustomThemeProvider;

export function useToggleTheme() {
    const context = useContext(CustomThemeContext);
    if (context === undefined) {
        throw new Error("useCustomThemeContext must be used within an CustomThemeProvider");
    }
    return context;
}
