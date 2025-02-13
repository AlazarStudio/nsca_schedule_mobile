import React from "react";
import { Typography, Box, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

function MessageSubgroup({ children, ...props }) {
    return (
        <Box sx={{ textAlign: "center", mt: 3, p: 2, bgcolor: "#f8d7da", borderRadius: "8px" }}>
            <Typography variant="h6" sx={{ color: "#721c24", fontWeight: "bold" }}>
                У Вас не выбрана подгруппа
            </Typography>
            <Typography variant="body1" sx={{ color: "#721c24", mt: 1 }}>
                Перейдите в{" "}
                <MuiLink component={Link} to="/profile" sx={{ fontWeight: "bold", color: "#d63384", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
                    Профиль
                </MuiLink>{" "}
                и выберите Вашу подгруппу
            </Typography>
        </Box>
    );
}

export default MessageSubgroup;