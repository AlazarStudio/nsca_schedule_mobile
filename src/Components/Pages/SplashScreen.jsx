import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Box, Typography, Container } from "@mui/material";

const SplashScreen = () => {
    const currentUser = JSON.parse(Cookies.get("currentUser") || "{}");

    return (
        <Container
            maxWidth="xs"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <Box
                component="img"
                src="/favicon-ncsa.png"
                alt="Логотип"
                sx={{ width: "120px", height: "120px", mb: 3 }}
            />
            <Typography
                variant="h6"
                component="p"
                sx={{ textAlign: "center", fontWeight: "bold" }}
            >
                Добрый день <br />{currentUser.name || "Гость"}!
            </Typography>
        </Container>
    );
};

export default SplashScreen;
