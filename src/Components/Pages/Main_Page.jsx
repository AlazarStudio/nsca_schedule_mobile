import React from "react";
import { Box, Typography, Card, CardContent, Container, Button } from "@mui/material";
import BottomNav from "./BottomNavigation";
import { formatDate, getWeekNumber, schedule } from "../../data"; // Подключаем расписание
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const Main_Page = ({ currentUser }) => {
    // Получаем текущую дату и время
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Время в минутах
    const currentDay = now.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase(); // День недели
    const weekType = getWeekNumber(); // Тип недели (числитель или знаменатель)

    const pairsTime = [
        { start: 9 * 60, end: 10 * 60 + 30 },   // 1 пара
        { start: 10 * 60 + 40, end: 12 * 60 + 10 }, // 2 пара
        { start: 12 * 60 + 40, end: 14 * 60 + 10 }, // 3 пара
        { start: 14 * 60 + 20, end: 15 * 60 + 50 }, // 4 пара
        { start: 16 * 60, end: 17 * 60 + 30 }, // 5 пара
        { start: 17 * 60 + 40, end: 19 * 60 + 10 }, // 6 пара
    ];

    const pairsNumberShow = [
        { time: '9:00 - 10:30' },
        { time: '10:40 - 12:10' },
        { time: '12:40 - 14:10' },
        { time: '14:20 - 15:50' },
        { time: '16:00 - 17:30' },
        { time: '17:40 - 19:10' },
        { time: '19:20 - 20:50' },
        { time: '21:00 - 21:30' },
    ];

    const currentPairNumber = pairsTime.findIndex(pair => currentTime >= pair.start && currentTime <= pair.end + 10) + 1;
    const nextPairNumber = currentPairNumber + 1;

    let currentPair
    let nextPair

    const groupSchedule = schedule[currentUser.group]?.[currentDay];

    function getUserSchedule(users, schedule, currentDay, currentWeek, pairNumber) {
        // Найти текущего пользователя
        const user = users;

        if (!user) {
            throw new Error("Пользователь не найден");
        }

        // Получить группу пользователя
        const userGroup = user.group;
        const userSubgroup = user.subgroup;

        // Проверить расписание для группы пользователя
        const groupSchedule = schedule[userGroup];
        if (!groupSchedule || !groupSchedule[currentDay]) {
            throw new Error("Расписание для текущего дня не найдено");
        }

        // Найти расписание для указанной пары
        const pairSchedule = groupSchedule[currentDay].find(
            (pair) => pair.pairNumber === pairNumber
        );

        if (!pairSchedule) {
            throw new Error("Пара не найдена");
        }

        // Извлечь информацию в зависимости от типа пары
        const fields = pairSchedule.fields;
        const type = pairSchedule.type;
        let result;

        switch (type) {
            case "type1":
                result = {
                    subject: fields[`main_subject`],
                    teacher: fields[`main_teacher`],
                    room: fields[`main_room`],
                    type: fields[`main_type`]
                };
                break;
            case "type2":
                result = fields[`subgroup${userSubgroup}_subject`] ? {
                    subject: fields[`subgroup${userSubgroup}_subject`],
                    teacher: fields[`subgroup${userSubgroup}_teacher`],
                    room: fields[`subgroup${userSubgroup}_room`],
                    type: fields[`subgroup${userSubgroup}_type`]
                } : null;
                break;
            case "type3": // Числитель/знаменатель
                if (fields[`${currentWeek}_subject`]) {
                    result = {
                        subject: fields[`${currentWeek}_subject`],
                        teacher: fields[`${currentWeek}_teacher`],
                        room: fields[`${currentWeek}_room`],
                        type: fields[`${currentWeek}_type`]
                    };
                } else if (fields[`subgroup${userSubgroup}_subject`]) {
                    // Если пара общая для подгруппы
                    result = {
                        subject: fields[`subgroup${userSubgroup}_subject`],
                        teacher: fields[`subgroup${userSubgroup}_teacher`],
                        room: fields[`subgroup${userSubgroup}_room`],
                        type: fields[`subgroup${userSubgroup}_type`]
                    };
                }
                break;
            case "type4": // Комбинация подгрупп и числителя/знаменателя
                if (fields[`subgroup${userSubgroup}_${currentWeek}_subject`]) {
                    result = {
                        subject: fields[`subgroup${userSubgroup}_${currentWeek}_subject`],
                        teacher: fields[`subgroup${userSubgroup}_${currentWeek}_teacher`],
                        room: fields[`subgroup${userSubgroup}_${currentWeek}_room`],
                        type: fields[`subgroup${userSubgroup}_${currentWeek}_type`]
                    };
                } else if (fields[`subgroup${userSubgroup}_subject`]) {
                    // Если пара общая для подгруппы
                    result = {
                        subject: fields[`subgroup${userSubgroup}_subject`],
                        teacher: fields[`subgroup${userSubgroup}_teacher`],
                        room: fields[`subgroup${userSubgroup}_room`],
                        type: fields[`subgroup${userSubgroup}_type`]
                    };
                }
                break;
            case "type5":
                result = fields[`subgroup${userSubgroup}_subject`] ? {
                    subject: fields[`subgroup${userSubgroup}_subject`],
                    teacher: fields[`subgroup${userSubgroup}_teacher`],
                    room: fields[`subgroup${userSubgroup}_room`],
                    type: fields[`subgroup${userSubgroup}_type`]
                } : fields[`subgroup${userSubgroup}_${currentWeek}_subject`] ? {
                    subject: fields[`subgroup${userSubgroup}_${currentWeek}_subject`],
                    teacher: fields[`subgroup${userSubgroup}_${currentWeek}_teacher`],
                    room: fields[`subgroup${userSubgroup}_${currentWeek}_room`],
                    type: fields[`subgroup${userSubgroup}_${currentWeek}_type`]
                } : null;
                break;
            case "type6":
                result = fields[`subgroup${userSubgroup}_${currentWeek}_subject`] ? {
                    subject: fields[`subgroup${userSubgroup}_${currentWeek}_subject`],
                    teacher: fields[`subgroup${userSubgroup}_${currentWeek}_teacher`],
                    room: fields[`subgroup${userSubgroup}_${currentWeek}_room`],
                    type: fields[`subgroup${userSubgroup}_${currentWeek}_type`]
                } : fields[`${currentWeek}_subject`] ? {
                    subject: fields[`${currentWeek}_subject`],
                    teacher: fields[`${currentWeek}_teacher`],
                    room: fields[`${currentWeek}_room`],
                    type: fields[`${currentWeek}_type`]
                } : null;
                break;
            case "type7":
                result = fields[`${currentWeek}_subject`] ? {
                    subject: fields[`${currentWeek}_subject`],
                    teacher: fields[`${currentWeek}_teacher`],
                    room: fields[`${currentWeek}_room`],
                    type: fields[`${currentWeek}_type`]
                } : fields[`subgroup${userSubgroup}_${currentWeek}_subject`] ? {
                    subject: fields[`subgroup${userSubgroup}_${currentWeek}_subject`],
                    teacher: fields[`subgroup${userSubgroup}_${currentWeek}_teacher`],
                    room: fields[`subgroup${userSubgroup}_${currentWeek}_room`],
                    type: fields[`subgroup${userSubgroup}_${currentWeek}_type`]
                } : null;
                break;
            case "type8":
                result = fields[`subgroup${userSubgroup}_${currentWeek}_subject`] ? {
                    subject: fields[`subgroup${userSubgroup}_${currentWeek}_subject`],
                    teacher: fields[`subgroup${userSubgroup}_${currentWeek}_teacher`],
                    room: fields[`subgroup${userSubgroup}_${currentWeek}_room`],
                    type: fields[`subgroup${userSubgroup}_${currentWeek}_type`]
                } : fields[`subgroup${userSubgroup}_denominator_subject`] ? {
                    subject: fields[`subgroup${userSubgroup}_denominator_subject`],
                    teacher: fields[`subgroup${userSubgroup}_denominator_teacher`],
                    room: fields[`subgroup${userSubgroup}_denominator_room`],
                    type: fields[`subgroup${userSubgroup}_denominator_type`]
                } : null;
                break;
            default:
                throw new Error("Неизвестный тип пары");
        }

        return result || "Нет занятия";
    }

    if (groupSchedule) {
        currentPair = getUserSchedule(currentUser, schedule, currentDay, weekType, currentPairNumber);
        nextPair = getUserSchedule(currentUser, schedule, currentDay, weekType, nextPairNumber);
    }

    return (
        <Box
            sx={{
                height: "100vh",
                p: "15px",
            }}
        >
            <Container
                sx={{
                    p: "0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    mb: "30px",
                }}
            >
                <Box>
                    <Typography component="p" sx={{ fontSize: "13px" }}>
                        {formatDate()}
                    </Typography>
                    <Typography component="p" sx={{ fontSize: "24px", fontWeight: "700", margin: "10px 0 5px 0" }}>
                        {currentUser.name || "Гость"}
                    </Typography>

                    <Typography component="p" sx={{ fontSize: "13px", fontWeight: "500", display: "flex" }}>
                        Неделя:{" "}
                        <div style={{ color: "#2BB0C9", fontWeight: "600", paddingLeft: "5px" }}>{weekType == 'numerator' ? "ЧИслитель" : "Знаменатель"}</div>
                    </Typography>
                </Box>
            </Container>

            <Container
                sx={{
                    p: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    height: "calc(100% - 158px)",
                    overflowY: "auto",
                }}
            >
                <Typography variant="p" fontWeight="bold" sx={{ fontSize: "20px" }}>
                    Текущая пара
                </Typography>
                {currentPair ? (
                    <Card sx={{ boxShadow: 'none', borderRadius: '10px', flexShrink: 0, mb: '25px' }}>
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
                                    {currentPair.subject}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        color: '#00000060',
                                    }}
                                >
                                    {currentPair.type}
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
                                    {pairsNumberShow[currentPairNumber - 1].time}
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
                                    <PersonOutlineOutlinedIcon style={{ color: '#2BB0C9', fontSize: 14 }} />
                                    {currentPair.teacher}
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
                                    {currentPair.room[0]} корпус, {currentPair.room} аудитория
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ) : (
                    <Typography>Нет текущей пары</Typography>
                )}

                <Typography variant="p" fontWeight="bold" sx={{ fontSize: "20px" }}>
                    Следующая пара
                </Typography>
                {nextPair ? (
                    <Card sx={{ boxShadow: 'none', borderRadius: '10px', flexShrink: 0, mb: '25px' }}>
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
                                    {nextPair.subject}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        color: '#00000060',
                                    }}
                                >
                                    {nextPair.type}
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
                                    {pairsNumberShow[currentPairNumber].time}
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
                                    <PersonOutlineOutlinedIcon style={{ color: '#2BB0C9', fontSize: 14 }} />
                                    {nextPair.teacher}
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
                                    {nextPair.room[0]} корпус, {nextPair.room} аудитория
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ) : (
                    <Typography>Нет следующей пары</Typography>
                )}
            </Container>

            <BottomNav active={0} />
        </Box >
    );
};

export default Main_Page;
