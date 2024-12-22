import React from "react";
import { Box, Typography } from "@mui/material";
import BottomNav from "./BottomNavigation";

const Profile_Page = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

    return (
        <Box sx={{ pb: 7 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 3, textAlign: "center" }}>
                Профиль
            </Typography>
            <Box sx={{ mt: 2, p: 2 }}>
                <Typography variant="h6">Имя: {currentUser.name || "Гость"}</Typography>
                <Typography>Группа: ПМ-131</Typography>
                <Typography>Подгруппа: 1</Typography>
            </Box>
            <BottomNav active={2} />
        </Box>
    );
};

export default Profile_Page;
