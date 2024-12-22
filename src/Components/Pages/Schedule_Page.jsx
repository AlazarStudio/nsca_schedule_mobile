import React from "react";
import { Box, Typography } from "@mui/material";
import BottomNav from "./BottomNavigation";

const Schedule_Page = () => {
    return (
        <Box sx={{ pb: 7 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 3, textAlign: "center" }}>
                Расписание
            </Typography>

            <BottomNav active={1} />
        </Box>
    );
};

export default Schedule_Page;
