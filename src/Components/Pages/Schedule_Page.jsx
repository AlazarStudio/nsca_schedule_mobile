import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Tab, Tabs, Chip, Card, CardContent } from "@mui/material";
import BottomNav from "./BottomNavigation";
import { getWeekNumber, formatDate } from "../../data";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import MessageSubgroup from "./MessageSubgroup";

const Schedule_Page = ({ currentUser, schedule }) => {
    function transformScheduleForTeachers(schedule, weekType) {
        let teacherSchedule = {};

        Object.entries(schedule).forEach(([groupName, group]) => {
            Object.entries(group).forEach(([day, lessons]) => {
                if (!Array.isArray(lessons)) return;

                let hasLessons = false;
                let uniqueLessons = new Set();

                lessons.forEach(lesson => {
                    Object.entries(lesson.fields).forEach(([key, value]) => {
                        if (key.includes('_teacher') && value) {
                            let teacherName = value;
                            let baseKey = key.replace('_teacher', '');

                            if (!teacherSchedule[teacherName]) {
                                teacherSchedule[teacherName] = {};
                            }

                            if (!teacherSchedule[teacherName][day]) {
                                teacherSchedule[teacherName][day] = [];
                            }

                            let lessonWeekType = baseKey.includes('numerator') ? 'numerator' :
                                baseKey.includes('denominator') ? 'denominator' : 'all';

                            if (weekType === 'all' || lessonWeekType === 'all' || weekType === lessonWeekType) {
                                let lessonData = {
                                    pairNumber: lesson.pairNumber,
                                    subject: lesson.fields[baseKey + '_subject'],
                                    room: lesson.fields[baseKey + '_room'],
                                    type: lesson.fields[baseKey + '_type'],
                                    weekType: lessonWeekType,
                                    group: groupName
                                };

                                let lessonKey = `${day}-${lessonData.pairNumber}-${lessonData.type}-${lessonData.group}`;
                                if (!uniqueLessons.has(lessonKey)) {
                                    uniqueLessons.add(lessonKey);
                                    teacherSchedule[teacherName][day].push(lessonData);
                                    hasLessons = true;
                                }
                            }
                        }
                    });
                });

                Object.keys(teacherSchedule).forEach(teacher => {
                    if (!teacherSchedule[teacher][day]) {
                        teacherSchedule[teacher][day] = [];
                    }
                });
            });
        });

        return teacherSchedule;
    }

    const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const weekType = getWeekNumber();
    const currentDay = (new Date().getDay() + 6) % 7;
    const [selectedDay, setSelectedDay] = useState(currentDay);

    const teacherSchedule = transformScheduleForTeachers(schedule, weekType);

    const handleChange = (event, newValue) => {
        setSelectedDay(newValue);
    };

    const pairsNumberShow = [
        { time: '09:00 - 10:30' },
        { time: '10:40 - 12:10' },
        { time: '12:40 - 14:10' },
        { time: '14:20 - 15:50' },
        { time: '16:00 - 17:30' },
        { time: '17:40 - 19:10' },
        { time: '19:20 - 20:50' },
        { time: '21:00 - 21:30' },
    ];

    const pairsTime = [
        { start: 9 * 60, end: 10 * 60 + 30, type: "lesson", pairNumber: 1 },
        { start: 10 * 60 + 40, end: 12 * 60 + 10, type: "lesson", pairNumber: 2 },
        { start: 12 * 60 + 40, end: 14 * 60 + 10, type: "lesson", pairNumber: 3 },
        { start: 14 * 60 + 20, end: 15 * 60 + 50, type: "lesson", pairNumber: 4 },
        { start: 16 * 60, end: 17 * 60 + 30, type: "lesson", pairNumber: 5 },
        { start: 17 * 60 + 40, end: 19 * 60 + 10, type: "lesson", pairNumber: 6 },
        { start: 19 * 60 + 20, end: 20 * 60 + 50, type: "lesson", pairNumber: 7 },
        { start: 21 * 60, end: 22 * 60 + 30, type: "lesson", pairNumber: 8 },
    ];

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Время в минутах

    const isPairDone = (currentTime, pairNumber, pairsTime, day = currentDay) => {
        if ((currentTime > pairsTime[pairNumber].end && day == selectedDay) || day > selectedDay) {
            return 'done'
        }

        if (currentTime >= pairsTime[pairNumber].start && currentTime <= pairsTime[pairNumber].end && day == selectedDay) {
            return 'now'
        }

        if (currentTime < pairsTime[pairNumber].start || day != selectedDay) {
            return 'notStart'
        }
    }

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

    const getScheduleForDayTeacher = (daySchedule) => {
        if (!daySchedule || daySchedule.length === 0) return [];

        return daySchedule
            .map((pair) => {
                return {
                    pairNumber: pair.pairNumber,
                    subject: pair.subject,
                    room: pair.room,
                    type: pair.type,
                    teacher: pair.group,
                };
            })
            .filter((pair) => pair !== null); // Убираем пустые значения
    };

    const renderDaySchedule = (day, schedule) => (
        <Box
            key={day}
            sx={{
                mt: 2,
                height: 'calc(100% - 161px)',
                overflowY: 'auto', // Скролл для длинного списка
            }}
        >
            <Box>
                {schedule.length > 0 ? (
                    schedule.filter(pair => pair && pair.pairNumber !== undefined).map((pair, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: '15px',
                            }}>
                            <Box sx={{
                                width: '50px',
                                borderRight: '1px solid #848484',
                                position: 'relative',
                                fontSize: '12px'
                            }} >
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    textAlign: 'right',
                                    pr: '10px'
                                }}>
                                    <div style={{ fontWeight: '600' }}>{pairsNumberShow[pair.pairNumber - 1].time.split(' - ')[0]}</div>
                                    <div style={{ fontWeight: '400', fontSize: '10px', color: '#848484' }}>{pairsNumberShow[pair.pairNumber - 1].time.split(' - ')[1]}</div>
                                </Box>

                                {isPairDone(currentTime, pair.pairNumber - 1, pairsTime) == 'done' &&
                                    <>
                                        <div style={{
                                            width: '11px',
                                            height: '11px',
                                            borderRadius: '50%',
                                            border: '1px solid #848484',
                                            backgroundColor: '#F2F2F7',
                                            position: 'absolute',
                                            top: '4px',
                                            right: '-6px'
                                        }} />

                                        <div style={{
                                            width: '7px',
                                            height: '7px',
                                            borderRadius: '50%',
                                            backgroundColor: '#848484',
                                            position: 'absolute',
                                            top: '6px',
                                            right: '-4px'
                                        }} />
                                    </>
                                }

                                {isPairDone(currentTime, pair.pairNumber - 1, pairsTime) == 'now' &&
                                    <>
                                        <div style={{
                                            width: '11px',
                                            height: '11px',
                                            borderRadius: '50%',
                                            border: '1px solid #81212D',
                                            backgroundColor: '#F2F2F7',
                                            position: 'absolute',
                                            top: '4px',
                                            right: '-6px'
                                        }} />

                                        <div style={{
                                            width: '7px',
                                            height: '7px',
                                            borderRadius: '50%',
                                            backgroundColor: '#81212D',
                                            position: 'absolute',
                                            top: '6px',
                                            right: '-4px'
                                        }} />
                                    </>
                                }

                                {isPairDone(currentTime, pair.pairNumber - 1, pairsTime) == 'notStart' &&
                                    <div style={{
                                        width: '11px',
                                        height: '11px',
                                        borderRadius: '50%',
                                        border: '1px solid #848484',
                                        backgroundColor: '#F2F2F7',
                                        position: 'absolute',
                                        top: '4px',
                                        right: '-6px'
                                    }} />
                                }

                            </Box>

                            <Card
                                key={index}
                                sx={{
                                    width: 'calc(100% - 50px)',
                                    boxShadow: 'none',
                                    borderRadius: '10px',
                                    mb: '10px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <CardContent
                                    sx={{
                                        display: 'flex',
                                        p: '0px !important',
                                        height: 'auto', // Высота зависит от содержимого
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '30px',
                                            height: 'auto', // Растягивается по высоте содержимого
                                            backgroundColor: '#81212D',
                                        }}
                                    ></Box>

                                    <Box
                                        sx={{
                                            width: 'calc(100% - 30px)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '25px',
                                            p: '16px !important',
                                            flexGrow: 1, // Заполняет оставшееся пространство
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                            <Typography sx={{ fontSize: '17px', fontWeight: '700' }}>
                                                {pair.subject}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: '13px',
                                                    fontWeight: '600',
                                                    color: '#00000060',
                                                }}
                                            >
                                                {pair.type}
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
                                                <LocalLibraryOutlinedIcon
                                                    style={{ color: '#81212D', fontSize: 14 }}
                                                />
                                                {pair.pairNumber} пара
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
                                                <PersonOutlineOutlinedIcon
                                                    style={{ color: '#81212D', fontSize: 14 }}
                                                />
                                                {pair.teacher}
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
                                                <ErrorOutlineIcon
                                                    style={{ color: '#81212D', fontSize: 14 }}
                                                />
                                                {pair.room[0]} корпус, {pair.room} аудитория
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    ))
                ) : (
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                            textAlign: 'center',
                            mt: 2,
                        }}
                    >
                        Нет занятий
                    </Typography>
                )}
            </Box>
        </Box>
    );

    const renderSchedule = () => {
        const dayKey = days[selectedDay]; // Используем `days` для получения ключа расписания
        const daySchedule = currentUser.role == 'user' ? schedule[currentUser.group]?.[dayKey] : currentUser.role == 'teacher' && teacherSchedule[currentUser.fullName]?.[dayKey]; // Получаем расписание для выбранного дня

        const userSchedule = getScheduleForDay(daySchedule, currentUser.subgroup, weekType);
        const teacherScheduleData = getScheduleForDayTeacher(daySchedule);

        let scheduleData = currentUser.role == 'user' ? userSchedule : currentUser.role == 'teacher' && teacherScheduleData;

        return renderDaySchedule(weekDays[selectedDay], scheduleData); // Передаём русский день и расписание
    };

    return (
        <Box
            sx={{
                height: `100dvh`,
                backgroundColor: "#f5f5f5",
                display: "flex",
                flexDirection: "column",
                justifyContent: 'space-between'
            }}
        >
            <Container sx={{
                p: "15px",
                height: 'calc(100% - 60px)'
            }}>
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

                <Typography component="p" sx={{ fontSize: "18px", fontWeight: "700", margin: "15px 0 5px 0" }}>
                    {currentUser.fullName || "Гость"}
                </Typography>

                <Typography component="p" sx={{ fontSize: "13px", fontWeight: "500", display: "flex" }}>
                    Текущая неделя:{" "}
                    <div style={{ color: "#81212D", fontWeight: "600", paddingLeft: "5px" }}>{weekType == 'numerator' ? "Числитель" : "Знаменатель"}</div>
                </Typography>


                {currentUser.role == 'teacher' || (currentUser.role == 'student' && currentUser.subgroup && currentUser.subgroup != 'нет подгруппы') ?
                    <>
                        <Tabs
                            value={selectedDay}
                            onChange={handleChange}
                            variant="fullWidth"
                            sx={{
                                mt: '30px',
                                mb: 2,
                                overflow: 'auto',
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

                        {renderSchedule()}
                    </>
                    :
                    <MessageSubgroup />
                }
            </Container>

            <BottomNav active={1} />
        </Box>
    );
};

export default Schedule_Page;
