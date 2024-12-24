import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Box, Typography, Container } from "@mui/material";

const SplashScreen = () => {
    const currentUser = JSON.parse(Cookies.get("currentUser") || "{}");

    const [viewHeight, setViewHeight] = useState(window.innerHeight);

    useEffect(() => {
        const updateHeight = () => setViewHeight(window.innerHeight);
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    return (
        <Container
            maxWidth="xs"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: `${viewHeight}px`,
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
