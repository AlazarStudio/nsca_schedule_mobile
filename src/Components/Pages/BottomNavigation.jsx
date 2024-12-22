import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";

const BottomNav = ({ active }) => {
    const navigate = useNavigate();
    const [value, setValue] = useState(active);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 0) navigate("/main");
        if (newValue === 1) navigate("/schedule");
        if (newValue === 2) navigate("/profile");
    };

    return (
        <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0, borderTop: '1px solid #DADADA', padding: '5px 0' }}
        >
            <BottomNavigation value={value} onChange={handleChange} sx={{
                '& .MuiBottomNavigationAction-root': {
                    color: '#999999',
                },
                '& .Mui-selected': {
                    color: '#2BB0C9 !important',
                    fontSize: '14px'
                },
            }}>
                <BottomNavigationAction label="Главная" icon={<HomeIcon />} sx={{
                    '& .MuiBottomNavigationAction-label': {
                        fontSize: '12px',
                    },
                }} />
                <BottomNavigationAction label="Расписание" icon={<CalendarTodayIcon />} sx={{
                    '& .MuiBottomNavigationAction-label': {
                        fontSize: '12px',
                    },
                }} />
                <BottomNavigationAction label="Профиль" icon={<PersonIcon />} sx={{
                    '& .MuiBottomNavigationAction-label': {
                        fontSize: '12px',
                    },
                }} />
            </BottomNavigation>
        </Paper>
    );
};

export default BottomNav;
