import React, { useState } from "react";
import { Box, Container, Typography, Tab, Tabs, Chip } from "@mui/material";
import BottomNav from "./BottomNavigation";
import { schedule, getWeekNumber, formatDate } from "../../data";

const Schedule_Page = ({ currentUser }) => {
    const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const weekType = getWeekNumber();
    const [selectedDay, setSelectedDay] = useState(0); // Выбранный день недели

    const handleChange = (event, newValue) => {
        setSelectedDay(newValue);
    };

    const getScheduleForDay = (daySchedule, userSubgroup, weekType) => {
        if (!daySchedule || daySchedule.length === 0) return [];

        return daySchedule
            .map((pair) => {
                const fields = pair.fields;
                const type = pair.type;

                switch (type) {
                    case "type1": // Общая пара
                        return {
                            pairNumber: pair.pairNumber,
                            subject: fields.main_subject,
                            teacher: fields.main_teacher,
                            room: fields.main_room,
                            type: fields.main_type,
                        };

                    case "type2": // Пары по подгруппам
                        return fields[`subgroup${userSubgroup}_subject`] ? {
                            pairNumber: pair.pairNumber,
                            subject: fields[`subgroup${userSubgroup}_subject`],
                            teacher: fields[`subgroup${userSubgroup}_teacher`],
                            room: fields[`subgroup${userSubgroup}_room`],
                            type: fields[`subgroup${userSubgroup}_type`],
                        } : null;

                    case "type3": // Числитель/знаменатель
                        if (fields[`${weekType}_subject`]) {
                            return {
                                pairNumber: pair.pairNumber,
                                subject: fields[`${weekType}_subject`],
                                teacher: fields[`${weekType}_teacher`],
                                room: fields[`${weekType}_room`],
                                type: fields[`${weekType}_type`],
                            };
                        }
                        break;

                    case "type4":
                        if (fields[`subgroup${userSubgroup}_${weekType}_subject`]) {
                            return {
                                pairNumber: pair.pairNumber,
                                subject: fields[`subgroup${userSubgroup}_${weekType}_subject`],
                                teacher: fields[`subgroup${userSubgroup}_${weekType}_teacher`],
                                room: fields[`subgroup${userSubgroup}_${weekType}_room`],
                                type: fields[`subgroup${userSubgroup}_${weekType}_type`],
                            };
                        } else if (fields[`subgroup${userSubgroup}_subject`]) {
                            return {
                                pairNumber: pair.pairNumber,
                                subject: fields[`subgroup${userSubgroup}_subject`],
                                teacher: fields[`subgroup${userSubgroup}_teacher`],
                                room: fields[`subgroup${userSubgroup}_room`],
                                type: fields[`subgroup${userSubgroup}_type`],
                            };
                        }
                        break;

                    case "type5": // Подгруппы, числитель/знаменатель или общий случай
                        return fields[`subgroup${userSubgroup}_subject`] ? {
                            pairNumber: pair.pairNumber,
                            subject: fields[`subgroup${userSubgroup}_subject`],
                            teacher: fields[`subgroup${userSubgroup}_teacher`],
                            room: fields[`subgroup${userSubgroup}_room`],
                            type: fields[`subgroup${userSubgroup}_type`],
                        } : fields[`subgroup${userSubgroup}_${weekType}_subject`] ? {
                            pairNumber: pair.pairNumber,
                            subject: fields[`subgroup${userSubgroup}_${weekType}_subject`],
                            teacher: fields[`subgroup${userSubgroup}_${weekType}_teacher`],
                            room: fields[`subgroup${userSubgroup}_${weekType}_room`],
                            type: fields[`subgroup${userSubgroup}_${weekType}_type`],
                        } : null;

                    case "type6": // Числитель/знаменатель или общий случай
                        return fields[`subgroup${userSubgroup}_${weekType}_subject`] ? {
                            pairNumber: pair.pairNumber,
                            subject: fields[`subgroup${userSubgroup}_${weekType}_subject`],
                            teacher: fields[`subgroup${userSubgroup}_${weekType}_teacher`],
                            room: fields[`subgroup${userSubgroup}_${weekType}_room`],
                            type: fields[`subgroup${userSubgroup}_${weekType}_type`],
                        } : fields[`${weekType}_subject`] ? {
                            pairNumber: pair.pairNumber,
                            subject: fields[`${weekType}_subject`],
                            teacher: fields[`${weekType}_teacher`],
                            room: fields[`${weekType}_room`],
                            type: fields[`${weekType}_type`],
                        } : null;

                    case "type7": // Общий или подгрупповой числитель/знаменатель
                        return fields[`${weekType}_subject`] ? {
                            pairNumber: pair.pairNumber,
                            subject: fields[`${weekType}_subject`],
                            teacher: fields[`${weekType}_teacher`],
                            room: fields[`${weekType}_room`],
                            type: fields[`${weekType}_type`],
                        } : fields[`subgroup${userSubgroup}_${weekType}_subject`] ? {
                            pairNumber: pair.pairNumber,
                            subject: fields[`subgroup${userSubgroup}_${weekType}_subject`],
                            teacher: fields[`subgroup${userSubgroup}_${weekType}_teacher`],
                            room: fields[`subgroup${userSubgroup}_${weekType}_room`],
                            type: fields[`subgroup${userSubgroup}_${weekType}_type`],
                        } : null;

                    case "type8": // Комбинированные подгруппы и числитель/знаменатель
                        return fields[`subgroup${userSubgroup}_${weekType}_subject`] ? {
                            pairNumber: pair.pairNumber,
                            subject: fields[`subgroup${userSubgroup}_${weekType}_subject`],
                            teacher: fields[`subgroup${userSubgroup}_${weekType}_teacher`],
                            room: fields[`subgroup${userSubgroup}_${weekType}_room`],
                            type: fields[`subgroup${userSubgroup}_${weekType}_type`],
                        } : fields[`subgroup${userSubgroup}_denominator_subject`] ? {
                            pairNumber: pair.pairNumber,
                            subject: fields[`subgroup${userSubgroup}_denominator_subject`],
                            teacher: fields[`subgroup${userSubgroup}_denominator_teacher`],
                            room: fields[`subgroup${userSubgroup}_denominator_room`],
                            type: fields[`subgroup${userSubgroup}_denominator_type`],
                        } : null;

                    default:
                        return null;
                }
            })
            .filter((pair) => pair !== null); // Убираем пустые значения
    };

    const renderDaySchedule = (day, schedule) => (
        <Box key={day} sx={{ mt: 2, height: 'calc(100vh - 246px)', overflow: 'hidden', overflowY: 'auto' }}>
            {schedule.length > 0 ? (
                schedule.map((pair, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            background: "#fff",
                            borderRadius: "12px",
                            mb: 2,
                            p: 2,
                        }}
                    >
                        <Typography variant="body1" sx={{ fontWeight: "600" }}>
                            {pair.subject}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                            {pair.teacher}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            {pair.room}
                        </Typography>
                        <Chip
                            label={pair.type}
                            size="small"
                            sx={{
                                alignSelf: "flex-start",
                                backgroundColor:
                                    pair.type === "Лекция" ? "#E0F7FA" : "#FFEBEE",
                                color: pair.type === "Лекция" ? "#006064" : "#C62828",
                            }}
                        />
                    </Box>
                ))
            ) : (
                <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ textAlign: "center", mt: 2 }}
                >
                    Нет занятий
                </Typography>
            )}
        </Box>
    );

    const renderSchedule = () => {
        const dayKey = days[selectedDay]; // Используем `days` для получения ключа расписания
        const daySchedule = schedule[currentUser.group]?.[dayKey]; // Получаем расписание для выбранного дня
        const userSchedule = getScheduleForDay(daySchedule, currentUser.subgroup, weekType);
        return renderDaySchedule(weekDays[selectedDay], userSchedule); // Передаём русский день и расписание
    };

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
                <Typography
                    component="h1"
                    sx={{
                        fontSize: "24px",
                        fontWeight: "700",
                        mt: 2,
                        mb: 1,
                        color: "#81212D",
                    }}
                >
                    Расписание
                </Typography>
                <Typography component="p" sx={{ fontSize: "14px", mb: 3 }}>
                    Текущая неделя:{" "}
                    <span style={{ color: "#81212D", fontWeight: "600" }}>
                        {weekType === "numerator" ? "Числитель" : "Знаменатель"}
                    </span>
                </Typography>

                <Tabs
                    value={selectedDay}
                    onChange={handleChange}
                    variant="fullWidth"
                    sx={{
                        mb: 2,
                        "& .MuiTabs-indicator": { display: "none" },
                    }}
                >
                    {weekDays.map((day, index) => (
                        <Tab
                            key={index}
                            label={day}
                            sx={{
                                minWidth: 0,
                                textTransform: "none",
                                fontWeight: "600",
                                fontSize: "14px",
                                padding: "6px",
                                borderRadius: "8px",
                                backgroundColor: "#fff",
                                "&.Mui-selected": {
                                    backgroundColor: "#81212D",
                                    color: "#fff",
                                },
                                "&:not(.Mui-selected)": {
                                    backgroundColor: "#fff",
                                    color: "#000",
                                },
                                marginRight: day !== "Сб" ? "8px" : "0px",
                            }}
                        />
                    ))}
                </Tabs>

                {/* Расписание для выбранного дня */}
                {renderSchedule()}
            </Container>

            <BottomNav active={1} />
        </Box>
    );
};

export default Schedule_Page;
