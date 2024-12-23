import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import BottomNav from "./BottomNavigation";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { formatDate, getWeekNumber } from "../../data";

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
                height: "100vh",
                p: "15px",
                backgroundColor: "#f5f5f5",
            }}
        >
            <Container sx={{ p: "0" }}>
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
                <Typography component="p" sx={{ fontSize: "24px", fontWeight: "700", margin: "15px 0 5px 0" }}>
                    {currentUser.name || "Гость"}
                </Typography>
                <Typography component="p" sx={{ fontSize: "13px", fontWeight: "500", display: "flex" }}>
                    Текущая неделя:{" "}
                    <div style={{ color: "#81212D", fontWeight: "600", paddingLeft: "5px" }}>{weekType == 'numerator' ? "Числитель" : "Знаменатель"}</div>
                </Typography>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: 'calc(100vh - 183px)',
                    mt: '30px',
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
                            boxShadow: 'none',
                            mb: '15px',
                            backgroundColor: '#81212D',
                            color: '#fff'
                        }}
                        onClick={handleLogout}
                    >
                        Выйти
                    </Button>

                </Box>
            </Container>

            <BottomNav active={2} />
        </Box>
        // <Box sx={{ pb: 7 }}>
        //     <Typography variant="h5" fontWeight="bold" sx={{ mt: 3, textAlign: "center" }}>
        //         Профиль
        //     </Typography>



        //     <BottomNav active={2} />
        // </Box>
    );
};

export default Profile_Page;
