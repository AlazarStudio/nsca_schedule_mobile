import React from "react";
import { Box, Typography } from "@mui/material";
import BottomNav from "./BottomNavigation";
import { schedule, getWeekNumber } from "../../data";

const Schedule_Page = ({ currentUser }) => {
    const weekDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const weekType = getWeekNumber();

    const getScheduleForDay = (daySchedule, userSubgroup, weekType) => {
        if (!daySchedule || daySchedule.length === 0) return [];

        return daySchedule.map((pair) => {
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

                case "type4": // Комбинация подгрупп и числителя/знаменателя
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

                case "type5":
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

                case "type6":
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

                case "type7":
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

                case "type8":
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
        }).filter((pair) => pair !== null); // Убираем пустые значения
    };

    const renderSchedule = () => {
        return weekDays.map((day) => {
            const daySchedule = schedule[currentUser.group]?.[day];
            const userSchedule = getScheduleForDay(daySchedule, currentUser.subgroup, weekType);

            return (
                <Box key={day} sx={{ mt: 3 }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ textTransform: "capitalize" }}>
                        {day}
                    </Typography>
                    {userSchedule.length > 0 ? (
                        userSchedule.map((pair) => (
                            <Box key={pair.pairNumber} sx={{ mt: 1, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
                                <Typography variant="body1">
                                    <strong>Номер пары:</strong> {pair.pairNumber}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Предмет:</strong> {pair.subject}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Преподаватель:</strong> {pair.teacher}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Аудитория:</strong> {pair.room}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Тип:</strong> {pair.type}
                                </Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            Нет занятий
                        </Typography>
                    )}
                </Box>
            );
        });
    };

    return (
        <Box sx={{ backgroundColor: 'red' }}>

            {/* <Box sx={{ mt: 2 }}>{renderSchedule()}</Box> */}

            <BottomNav active={1} />
        </Box>
    );
};

export default Schedule_Page;
