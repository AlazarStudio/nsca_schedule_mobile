import React, { useState } from "react";
import { Box, Button, Container, Typography, MenuItem, Select, Dialog, DialogTitle, DialogActions } from "@mui/material";
import BottomNav from "./BottomNavigation";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { formatDate, getWeekNumber, PUT_fetchRequest } from "../../data";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const Profile_Page = ({ currentUser, setCurrentUser }) => {
    const navigate = useNavigate();

    // Состояние для выбора подгруппы
    const [selectedSubgroup, setSelectedSubgroup] = useState(
        currentUser.subgroup !== 'нет подгруппы' ? currentUser.subgroup : ""
    );

    // Состояние для управления модальным окном
    const [openModal, setOpenModal] = useState(false);

    const handleLogout = () => {
        Cookies.remove("currentUser");
        navigate("/login");
    };

    // Функция обновления подгруппы
    const changeSubgroup = async () => {
        if (!selectedSubgroup) return; // Не отправлять пустое значение

        try {
            await PUT_fetchRequest({ id: currentUser.id, subgroup: selectedSubgroup }, 'students');

            // Обновляем `currentUser` в куки
            const updatedUser = { ...currentUser, subgroup: selectedSubgroup };
            Cookies.set("currentUser", JSON.stringify(updatedUser), { expires: 7 });

            // Обновляем состояние
            setCurrentUser(updatedUser);
        } catch (error) {
            console.error("Ошибка обновления подгруппы:", error);
        }

        // Открываем модальное окно
        setOpenModal(true);
    };

    // Закрытие модального окна и переход на страницу расписания
    const handleCloseModal = () => {
        setOpenModal(false);
        navigate("/main");
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
                    <div style={{ color: "#81212D", fontWeight: "600", paddingLeft: "5px" }}>
                        {weekType === 'numerator' ? "Числитель" : "Знаменатель"}
                    </div>
                </Typography>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mt: '30px',
                    gap: '30px'
                }}>
                    {currentUser.role == 'teacher' 
                        ?
                        'Перподаватель'
                        :
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

                            {currentUser.subgroup !== 'нет подгруппы' ? (
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
                            ) : (
                                <Box sx={{
                                    backgroundColor: '#fff',
                                    padding: '20px',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                    alignItems: 'center'
                                }}>
                                    <Select
                                        value={selectedSubgroup}
                                        onChange={(e) => setSelectedSubgroup(e.target.value)}
                                        displayEmpty
                                        sx={{ width: '100%' }}
                                    >
                                        <MenuItem value="" disabled>Выберите подгруппу</MenuItem>
                                        <MenuItem value="1">1</MenuItem>
                                        <MenuItem value="2">2</MenuItem>
                                    </Select>
                                    <Button
                                        variant="contained"
                                        onClick={changeSubgroup}
                                        disabled={!selectedSubgroup}
                                    >
                                        Изменить
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    }
                </Box>
            </Container>

            <BottomNav active={2} />

            {/* Модальное окно */}
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Подгруппа успешно изменена</DialogTitle>
                <Typography sx={{ padding: "0 24px 16px" }}>
                    Вы будете перенаправлены к расписанию.
                </Typography>
                <DialogActions>
                    <Button onClick={handleCloseModal} variant="contained">ОК</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Profile_Page;
