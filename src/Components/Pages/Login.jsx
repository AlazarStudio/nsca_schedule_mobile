import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { users } from "../../data";
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    InputAdornment,
    IconButton,
    CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = ({ currentUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    if (currentUser) {
        navigate("/main");
    }

    const handleLogin = () => {
        // Убираем фокус с активного элемента (снимаем клавиатуру)
        const activeElement = document.activeElement;
        if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
            activeElement.blur();
        }

        // Проверяем пользователя
        const user = users.find(
            (u) => u.username === username && u.password === password
        );

        if (!user) {
            setError("Неверный логин или пароль");
            return;
        }

        // Показать анимацию загрузки
        setLoading(true);

        // Сохраняем пользователя в куки
        Cookies.set("currentUser", JSON.stringify(user), { expires: 7 }); // Хранить 7 дней

        // Задержка перед переходом
        setTimeout(() => {
            setLoading(false);
            navigate("/main");
        }, 1000);
    };

    return (
        <Container
            maxWidth="xs"
            sx={{
                display: "flex",
                flexDirection: "column",
                height: `100dvh`,
                padding: "20px",
                justifyContent: "center",
                gap: 3,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <Box
                    component="img"
                    src="/favicon-ncsa.png"
                    alt="Логотип"
                    sx={{ width: "100px", height: "100px" }}
                />
                <Typography variant="h5" component="h1" fontWeight="bold">
                    Вход
                </Typography>

                <Box component="form" sx={{ width: "100%" }}>
                    <TextField
                        label="Логин"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        error={!!error}
                        margin="normal"
                    />
                    <TextField
                        label="Пароль"
                        variant="outlined"
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!error}
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {error && (
                        <Typography color="error" variant="body2" align="center" mt={1}>
                            {error}
                        </Typography>
                    )}
                </Box>
            </Box>

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                        height: "50px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        textTransform: "none",
                        borderRadius: "8px",
                    }}
                    onClick={handleLogin}
                >
                    Войти
                </Button>
            )}
        </Container>
    );
};

export default Login;
