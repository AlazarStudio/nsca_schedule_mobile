import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#81212D", // Основной цвет
        },
        secondary: {
            main: "#FFFFFF", // Вторичный цвет (пример)
        },
    },
    typography: {
        fontFamily: "Roboto, Arial, sans-serif", // Шрифт по умолчанию
    },
});

export default theme;
