import React from "react";
import { Box, Button, Typography } from "@mui/material";
import BottomNav from "./BottomNavigation";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Profile_Page = ({ currentUser }) => {
    const navigate = useNavigate(); // Используем хук useNavigate

    const handleLogout = () => {
        Cookies.remove("currentUser");
        navigate("/login"); // Правильное использование навигации
    };

    return (
        <Box sx={{ pb: 7 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 3, textAlign: "center" }}>
                Профиль
            </Typography>
            <Box sx={{ mt: 2, p: 2 }}>
                <Typography variant="h6">Имя: {currentUser.name || "Гость"}</Typography>
                <Typography>Группа: {currentUser.group}</Typography>
                <Typography>Подгруппа: {currentUser.subgroup}</Typography>
            </Box>

            <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{
                    height: "50px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    textTransform: "none",
                    borderRadius: "8px",
                }}
                onClick={handleLogout}
            >
                Выйти
            </Button>

            <BottomNav active={2} />
        </Box>
    );
};

export default Profile_Page;
