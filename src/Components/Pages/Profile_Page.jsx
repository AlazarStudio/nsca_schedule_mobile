import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import BottomNav from "./BottomNavigation";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { formatDate, getWeekNumber } from "../../data";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const Profile_Page = ({ currentUser }) => {
    const navigate = useNavigate(); // Используем хук useNavigate

    const handleLogout = () => {
        Cookies.remove("currentUser");
        navigate("/login"); // Правильное использование навигации
    };

    const weekType = getWeekNumber();
    return (
        <Box
            sx={{
                height: `100dvh`,
                p: "0px",
                backgroundColor: "#f5f5f5",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
        >
            <Container sx={{ p: "15px" }}>
                <Typography
                    component="p"
                    sx={{
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "textSecondary",
                    }}
                >
                    {formatDate()}
                </Typography>

                <Typography component="p" sx={{ fontSize: "18px", fontWeight: "700", margin: "15px 0 5px 0", display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    {currentUser.fullName || "Гость"}
                    <LogoutOutlinedIcon onClick={handleLogout} />
                </Typography>

                <Typography component="p" sx={{ fontSize: "13px", fontWeight: "500", display: "flex" }}>
                    Текущая неделя:{" "}
                    <div style={{ color: "#81212D", fontWeight: "600", paddingLeft: "5px" }}>{weekType == 'numerator' ? "Числитель" : "Знаменатель"}</div>
                </Typography>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mt: '30px',
                    gap: '30px'
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px'
                    }}>
                        <Typography sx={{
                            backgroundColor: '#fff',
                            padding: '22px 20px',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Box sx={{ fontSize: '17px', fontWeight: '600' }}>Группа:</Box>
                            <Box sx={{ fontSize: '15px', fontWeight: '500' }}>{currentUser.group}</Box>
                        </Typography>

                        <Typography sx={{
                            backgroundColor: '#fff',
                            padding: '22px 20px',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Box sx={{ fontSize: '17px', fontWeight: '600' }}>Подгруппа:</Box>
                            <Box sx={{ fontSize: '15px', fontWeight: '500' }}>{currentUser.subgroup}</Box>
                        </Typography>
                    </Box>
                </Box>
            </Container>

            <BottomNav active={2} />
        </Box>
    );
};

export default Profile_Page;
