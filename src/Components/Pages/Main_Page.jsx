import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Container, Button, Link as MuiLink } from "@mui/material";
import BottomNav from "./BottomNavigation";
import { formatDate, GET_fetchRequest, getWeekNumber } from "../../data"; // Подключаем расписание
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import { Link } from "react-router-dom";
import MessageSubgroup from "./MessageSubgroup";

const Main_Page = ({ currentUser, schedule }) => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Время в минутах
    const currentDay = now.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase(); // День недели
    const weekType = getWeekNumber(); // Тип недели (числитель или знаменатель)

    const pairsTime = [
        { start: 9 * 60, end: 10 * 60 + 30, type: "lesson", pairNumber: 1 },   // 1 пара
        { start: 10 * 60 + 31, end: 10 * 60 + 39, type: "break" },             // Перемена

        { start: 10 * 60 + 40, end: 12 * 60 + 10, type: "lesson", pairNumber: 2 }, // 2 пара
        { start: 12 * 60 + 11, end: 12 * 60 + 39, type: "break" },             // Перемена

        { start: 12 * 60 + 40, end: 14 * 60 + 10, type: "lesson", pairNumber: 3 }, // 3 пара
        { start: 14 * 60 + 11, end: 14 * 60 + 19, type: "break" },             // Перемена

        { start: 14 * 60 + 20, end: 15 * 60 + 50, type: "lesson", pairNumber: 4 }, // 4 пара
        { start: 15 * 60 + 51, end: 15 * 60 + 59, type: "break" },                  // Перемена

        { start: 16 * 60, end: 17 * 60 + 30, type: "lesson", pairNumber: 5 },  // 5 пара
        { start: 17 * 60 + 31, end: 17 * 60 + 39, type: "break" },             // Перемена

        { start: 17 * 60 + 40, end: 19 * 60 + 10, type: "lesson", pairNumber: 6 }, // 6 пара
        { start: 19 * 60 + 11, end: 19 * 60 + 19, type: "break" },             // Перемена

        { start: 19 * 60 + 20, end: 20 * 60 + 50, type: "lesson", pairNumber: 7 }, // 7 пара
        { start: 20 * 60 + 51, end: 20 * 60 + 59, type: "break" },             // Перемена

        { start: 21 * 60, end: 22 * 60 + 30, type: "lesson", pairNumber: 8 }, // 8 пара
    ];

    const pairsNumberShow = [
        { time: '9:00 - 10:30' },
        { time: '10:40 - 12:10' },
        { time: '12:40 - 14:10' },
        { time: '14:20 - 15:50' },
        { time: '16:00 - 17:30' },
        { time: '17:40 - 19:10' },
        { time: '19:20 - 20:50' },
        { time: '21:00 - 22:30' },
    ];

    function getUserSchedule(users, schedule, currentDay, currentWeek, pairNumber) {
        try {
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
                        pairNumber: pairNumber,
                        subject: fields[`main_subject`],
                        teacher: fields[`main_teacher`],
                        room: fields[`main_room`],
                        type: fields[`main_type`]
                    };
                    break;
                case "type2":
                    result = fields[`subgroup${userSubgroup}_subject`] ? {
                        pairNumber: pairNumber,
                        subject: fields[`subgroup${userSubgroup}_subject`],
                        teacher: fields[`subgroup${userSubgroup}_teacher`],
                        room: fields[`subgroup${userSubgroup}_room`],
                        type: fields[`subgroup${userSubgroup}_type`]
                    } : null;
                    break;
                case "type3": // Числитель/знаменатель
                    if (fields[`${currentWeek}_subject`]) {
                        result = {
                            pairNumber: pairNumber,
                            subject: fields[`${currentWeek}_subject`],
                            teacher: fields[`${currentWeek}_teacher`],
                            room: fields[`${currentWeek}_room`],
                            type: fields[`${currentWeek}_type`]
                        };
                    } else if (fields[`subgroup${userSubgroup}_subject`]) {
                        // Если пара общая для подгруппы
                        result = {
                            pairNumber: pairNumber,
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
                            pairNumber: pairNumber,
                            subject: fields[`subgroup${userSubgroup}_${currentWeek}_subject`],
                            teacher: fields[`subgroup${userSubgroup}_${currentWeek}_teacher`],
                            room: fields[`subgroup${userSubgroup}_${currentWeek}_room`],
                            type: fields[`subgroup${userSubgroup}_${currentWeek}_type`]
                        };
                    } else if (fields[`subgroup${userSubgroup}_subject`]) {
                        // Если пара общая для подгруппы
                        result = {
                            pairNumber: pairNumber,
                            subject: fields[`subgroup${userSubgroup}_subject`],
                            teacher: fields[`subgroup${userSubgroup}_teacher`],
                            room: fields[`subgroup${userSubgroup}_room`],
                            type: fields[`subgroup${userSubgroup}_type`]
                        };
                    }
                    break;
                case "type5":
                    result = fields[`subgroup${userSubgroup}_subject`] ? {
                        pairNumber: pairNumber,
                        subject: fields[`subgroup${userSubgroup}_subject`],
                        teacher: fields[`subgroup${userSubgroup}_teacher`],
                        room: fields[`subgroup${userSubgroup}_room`],
                        type: fields[`subgroup${userSubgroup}_type`]
                    } : fields[`subgroup${userSubgroup}_${currentWeek}_subject`] ? {
                        pairNumber: pairNumber,
                        subject: fields[`subgroup${userSubgroup}_${currentWeek}_subject`],
                        teacher: fields[`subgroup${userSubgroup}_${currentWeek}_teacher`],
                        room: fields[`subgroup${userSubgroup}_${currentWeek}_room`],
                        type: fields[`subgroup${userSubgroup}_${currentWeek}_type`]
                    } : null;
                    break;
                case "type6":
                    result = fields[`subgroup${userSubgroup}_${currentWeek}_subject`] ? {
                        pairNumber: pairNumber,
                        subject: fields[`subgroup${userSubgroup}_${currentWeek}_subject`],
                        teacher: fields[`subgroup${userSubgroup}_${currentWeek}_teacher`],
                        room: fields[`subgroup${userSubgroup}_${currentWeek}_room`],
                        type: fields[`subgroup${userSubgroup}_${currentWeek}_type`]
                    } : fields[`${currentWeek}_subject`] ? {
                        pairNumber: pairNumber,
                        subject: fields[`${currentWeek}_subject`],
                        teacher: fields[`${currentWeek}_teacher`],
                        room: fields[`${currentWeek}_room`],
                        type: fields[`${currentWeek}_type`]
                    } : null;
                    break;
                case "type7":
                    result = fields[`${currentWeek}_subject`] ? {
                        pairNumber: pairNumber,
                        subject: fields[`${currentWeek}_subject`],
                        teacher: fields[`${currentWeek}_teacher`],
                        room: fields[`${currentWeek}_room`],
                        type: fields[`${currentWeek}_type`]
                    } : fields[`subgroup${userSubgroup}_${currentWeek}_subject`] ? {
                        pairNumber: pairNumber,
                        subject: fields[`subgroup${userSubgroup}_${currentWeek}_subject`],
                        teacher: fields[`subgroup${userSubgroup}_${currentWeek}_teacher`],
                        room: fields[`subgroup${userSubgroup}_${currentWeek}_room`],
                        type: fields[`subgroup${userSubgroup}_${currentWeek}_type`]
                    } : null;
                    break;
                case "type8":
                    result = fields[`subgroup${userSubgroup}_${currentWeek}_subject`] ? {
                        pairNumber: pairNumber,
                        subject: fields[`subgroup${userSubgroup}_${currentWeek}_subject`],
                        teacher: fields[`subgroup${userSubgroup}_${currentWeek}_teacher`],
                        room: fields[`subgroup${userSubgroup}_${currentWeek}_room`],
                        type: fields[`subgroup${userSubgroup}_${currentWeek}_type`]
                    } : fields[`subgroup${userSubgroup}_denominator_subject`] ? {
                        pairNumber: pairNumber,
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
        } catch {
            return "Нет занятия";
        }
    }

    const findNextPairNumber = (groupSchedule, currentPairNumber) => {
        if (!groupSchedule || groupSchedule.length === 0) return null;

        // Найти следующую пару в расписании, которая идёт после текущей
        for (let i = 0; i < groupSchedule.length; i++) {
            if (groupSchedule[i].pairNumber > currentPairNumber) {
                return groupSchedule[i].pairNumber;
            }
        }

        return null; // Если пар больше нет
    };

    // Обновляем основную логику определения следующей пары
    const currentInterval = pairsTime.find(pair => currentTime >= pair.start && currentTime <= pair.end);

    let currentPair, nextPair;

    if (currentInterval?.type === "lesson") {
        // Если сейчас идёт пара
        currentPair = getUserSchedule(currentUser, schedule, currentDay, weekType, currentInterval.pairNumber);

        // Определяем следующую пару
        const groupSchedule = schedule[currentUser.group]?.[currentDay];
        const nextPairNumber = findNextPairNumber(groupSchedule, currentInterval.pairNumber);
        nextPair = nextPairNumber ? getUserSchedule(currentUser, schedule, currentDay, weekType, nextPairNumber) : "Нет занятия";
    } else if (currentInterval?.type === "break") {
        // Если сейчас перемена
        const groupSchedule = schedule[currentUser.group]?.[currentDay];
        const nextPairNumber = findNextPairNumber(groupSchedule, currentInterval.pairNumber);
        console.log(currentInterval.pairNumber)

        currentPair = "Перемена";
        nextPair = nextPairNumber ? getUserSchedule(currentUser, schedule, currentDay, weekType, nextPairNumber) : "Нет занятия";
    } else {
        // Если нет текущего интервала
        currentPair = "Нет занятия";
        const groupSchedule = schedule[currentUser.group]?.[currentDay];
        const nextPairNumber = findNextPairNumber(groupSchedule, 0); // Искать с первой пары
        nextPair = nextPairNumber ? getUserSchedule(currentUser, schedule, currentDay, weekType, nextPairNumber) : "Нет занятия";
    }

    return (
        <Box
            sx={{
                height: `100dvh`,
                p: "0px",
                display: "flex",
                flexDirection: "column",
                justifyContent: 'space-between'
            }}
        >
            <Box
                sx={{
                    p: "15px",
                    height: 'calc(100% - 60px)'
                }}
            >
                <Container
                    sx={{
                        p: "0",
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                        mb: "20px",
                    }}
                >
                    <Box>
                        <Typography component="p" sx={{ fontSize: "13px", fontWeight: '600' }}>
                            {formatDate()}
                        </Typography>
                        <Typography component="p" sx={{ fontSize: "18px", fontWeight: "700", margin: "15px 0 5px 0" }}>
                            {currentUser.fullName || "Гость"}
                        </Typography>

                        <Typography component="p" sx={{ fontSize: "13px", fontWeight: "500", display: "flex" }}>
                            Текущая неделя:{" "}
                            <div style={{ color: "#81212D", fontWeight: "600", paddingLeft: "5px" }}>{weekType == 'numerator' ? "Числитель" : "Знаменатель"}</div>
                        </Typography>
                    </Box>
                </Container>

                {currentUser.subgroup != 'нет подгруппы' && currentUser.role != 'student' ?
                    <Container
                        sx={{
                            p: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: "15px",
                            overflowY: "auto",
                        }}
                    >
                        {currentPair == 'Перемена' ? <Typography>Перемена</Typography> :
                            currentPair == 'Нет занятия' ? (<Typography>В данный момент занятия нет</Typography>) :
                                <>
                                    <Typography variant="p" fontWeight="bold" sx={{ fontSize: "20px" }}>
                                        Текущая пара
                                    </Typography>

                                    <Card sx={{ boxShadow: 'none', borderRadius: '10px', flexShrink: 0, mb: '10px' }}>
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
                                                        color: '#000000',
                                                        fontWeight: '500',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '5px',
                                                    }}
                                                >
                                                    <LocalLibraryOutlinedIcon style={{ color: '#81212D', fontSize: 14 }} />
                                                    {currentPair.pairNumber} пара
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: '13px',
                                                        color: '#000000',
                                                        fontWeight: '500',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '5px',
                                                    }}
                                                >
                                                    <AccessTimeIcon style={{ color: '#81212D', fontSize: 14 }} />
                                                    {pairsNumberShow[currentInterval.pairNumber - 1]?.time}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: '13px',
                                                        color: '#000000',
                                                        fontWeight: '500',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '5px',
                                                    }}
                                                >
                                                    <PersonOutlineOutlinedIcon style={{ color: '#81212D', fontSize: 14 }} />
                                                    {currentPair.teacher}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: '13px',
                                                        color: '#000000',
                                                        fontWeight: '500',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '5px',
                                                    }}
                                                >
                                                    <ErrorOutlineIcon style={{ color: '#81212D', fontSize: 14 }} />
                                                    {currentPair.room?.[0]} корпус, {currentPair.room} аудитория
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </>
                        }

                        <Typography variant="p" fontWeight="bold" sx={{ fontSize: "20px" }}>
                            Следующая пара
                        </Typography>
                        {nextPair != 'Нет занятия' ? (
                            <Card sx={{ boxShadow: 'none', borderRadius: '10px', flexShrink: 0, mb: '10px' }}>
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
                                                color: '#000000',
                                                fontWeight: '500',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                            }}
                                        >
                                            <LocalLibraryOutlinedIcon style={{ color: '#81212D', fontSize: 14 }} />
                                            {nextPair.pairNumber} пара
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: '13px',
                                                color: '#000000',
                                                fontWeight: '500',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                            }}
                                        >
                                            <AccessTimeIcon style={{ color: '#81212D', fontSize: 14 }} />
                                            {pairsNumberShow[currentInterval.pairNumber]?.time}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: '13px',
                                                color: '#000000',
                                                fontWeight: '500',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                            }}
                                        >
                                            <PersonOutlineOutlinedIcon style={{ color: '#81212D', fontSize: 14 }} />
                                            {nextPair.teacher}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: '13px',
                                                color: '#000000',
                                                fontWeight: '500',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                            }}
                                        >
                                            <ErrorOutlineIcon style={{ color: '#81212D', fontSize: 14 }} />
                                            {nextPair.room?.[0]} корпус, {nextPair.room} аудитория
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        ) : (
                            <Typography>Нет следующей пары</Typography>
                        )}
                    </Container>
                    :
                    <MessageSubgroup />
                }
            </Box >

            <BottomNav active={0} />
        </Box >
    );
};

export default Main_Page;
