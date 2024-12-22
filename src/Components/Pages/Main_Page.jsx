import React from "react";
import { Box, Typography, Card, CardContent, Container } from "@mui/material";
import BottomNav from "./BottomNavigation";
import { formatDate, getWeekNumber } from "../../data";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Main_Page = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

    return (
        <Box sx={{
            height: '100vh',
            p: '15px',
        }}>
            <Container sx={{ p: '0', display: 'flex', flexDirection: 'column', gap: '15px', mb: '30px' }}>
                <Box>
                    <Typography component="p" sx={{ fontSize: '13px' }}>{formatDate()}</Typography>
                    <Typography component="p" sx={{ fontSize: '24px', fontWeight: '700', margin: '10px 0 5px 0' }}>{currentUser.name || "Гость"}</Typography>
                    <Typography component="p" sx={{ fontSize: '13px', fontWeight: '500', display: 'flex' }}>Неделя: <div style={{ color: '#2BB0C9', fontWeight: '600', paddingLeft: '5px' }}>{getWeekNumber()}</div></Typography>
                </Box>
            </Container>

            <Container
                sx={{
                    p: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    height: 'calc(100% - 140px)', // Контейнер занимает доступное пространство
                    overflowY: 'auto', // Включаем скролл
                }}
            >
                <Typography variant="p" fontWeight="bold" sx={{ fontSize: '20px' }}>
                    Текущая пара
                </Typography>

                <Card sx={{ boxShadow: 'none', borderRadius: '10px', flexShrink: 0, mb: '15px' }}>
                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '25px',
                            p: '16px !important',
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <Typography sx={{ fontSize: '17px', fontWeight: '700' }}>
                                Визуальные среды
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    color: '#00000060',
                                }}
                            >
                                Лекция
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <Typography
                                sx={{
                                    fontSize: '13px',
                                    color: '#2BB0C9',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                }}
                            >
                                <AccessTimeIcon style={{ color: '#2BB0C9', fontSize: 14 }} />
                                09:00 - 10:30
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '13px',
                                    color: '#2BB0C9',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                }}
                            >
                                <ErrorOutlineIcon style={{ color: '#2BB0C9', fontSize: 14 }} />
                                2 корпус, 217 аудитория
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>

                <Typography variant="p" fontWeight="bold" sx={{ fontSize: '20px' }}>
                    Следующая пара
                </Typography>

                <Card sx={{ boxShadow: 'none', borderRadius: '10px', flexShrink: 0, mb: '15px' }}>
                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '25px',
                            p: '16px !important',
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <Typography sx={{ fontSize: '17px', fontWeight: '700' }}>
                                Структуры и алгоритмы компьютерной обработки данных
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    color: '#00000060',
                                }}
                            >
                                Лекция
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <Typography
                                sx={{
                                    fontSize: '13px',
                                    color: '#2BB0C9',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                }}
                            >
                                <AccessTimeIcon style={{ color: '#2BB0C9', fontSize: 14 }} />
                                10:40 - 12:10
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '13px',
                                    color: '#2BB0C9',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                }}
                            >
                                <ErrorOutlineIcon style={{ color: '#2BB0C9', fontSize: 14 }} />
                                2 корпус, 217 аудитория
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Container>

            {/* Нижнее меню */}
            <BottomNav active={0} />
        </Box >
    );
};

export default Main_Page;
