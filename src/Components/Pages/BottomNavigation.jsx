import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

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
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0, borderRadius: '0', borderTop: '1px solid #999999' }}
        >
            <BottomNavigation value={value} onChange={handleChange} sx={{
                '& .MuiBottomNavigationAction-root': {
                    color: '#999999',
                    backgroundColor: '#ffffff'
                },
                '& .Mui-selected': {
                    color: '#81212D !important',
                    fontSize: '12px'
                },
            }}>
                <BottomNavigationAction label="Главная" icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.04373 13.446C4.04373 12.5988 4.38604 12.5142 4.83582 12.0995L12.0393 5.31691C12.7848 5.98247 13.4045 6.57769 14.1616 7.24555L18.3384 11.2129C18.8632 11.6959 19.9735 12.6923 19.9735 13.446V20.4582C19.9735 21.5072 19.2806 21.6616 18.2235 21.6616L15.0088 21.6004C14.9895 20.5856 14.9782 18.6418 14.9795 17.2445C14.9806 16.1203 14.7027 15.9067 13.8782 15.908C12.616 15.9101 11.4908 15.8726 10.0865 15.8726C9.37572 15.84 9.00891 16.1171 9.00891 17.0336L9.00835 21.6616C6.28014 21.6616 4.04373 22.1467 4.04373 20.2951V13.446ZM17.7047 1.3981H19.2192L19.1751 5.97465L17.6727 4.70222L17.7047 1.3981ZM21.9432 12.2267C21.3745 12.3535 21.1355 11.9126 19.4921 10.3802C17.651 8.56075 14.5186 5.49319 12.6223 3.86659C12.213 3.51545 11.7813 3.51259 11.5008 3.75946C8.85894 6.23932 5.26744 9.7519 2.82365 11.9896C2.22748 12.5355 0.945297 12.0105 1.79813 10.9646C2.77329 9.76874 10.0336 2.89812 11.3045 1.79976C11.6941 1.46306 12.0756 1.38275 12.4638 1.58967L21.6508 10.336C22.0546 10.7733 22.4291 10.9304 22.4647 11.4271C22.4925 11.8143 22.3803 12.1293 21.9432 12.2267ZM10.397 22.0063L10.4759 17.324L13.5412 17.3573C13.5635 19.4084 13.6181 20.929 13.5988 21.7801C13.5654 23.2541 14.0843 23.0097 17.9001 23.0071C20.5698 23.0441 21.4134 22.2231 21.4504 20.4334C21.4792 19.0393 21.4167 16.6854 21.4167 13.6596C22.8788 13.7007 24.1258 12.8952 23.9898 11.3269C23.8873 10.1439 22.4492 9.15792 21.8077 8.54877C20.8743 7.66274 20.6291 7.22836 20.6251 6.6978C20.6113 4.87508 20.6553 2.72489 20.6565 0.863802C20.6568 0.430196 20.3849 0.135136 19.8446 0.119332C19.0124 0.0949666 17.763 0.113038 16.9579 0.134916C16.4521 0.148638 16.1924 0.410958 16.187 0.936238C16.1782 1.77951 16.2138 2.39577 16.2001 3.10178C14.1048 1.33758 12.751 -0.939284 10.7443 0.407269L0.507716 10.2083C-0.688904 11.6145 0.322284 13.8465 2.57016 13.6394C2.67644 15.0854 2.56928 17.9649 2.57371 20.0393C2.57566 20.9348 2.80468 21.6684 3.1118 22.0646C3.65216 22.7419 4.29284 22.9621 5.13656 22.9901C6.18934 23.025 9.08377 23.0819 9.77761 22.9623C10.0697 22.9119 10.3691 22.6159 10.397 22.0063Z" fill={value == 0 ? '#81212D' : '#999999'} />
                    </svg>
                } sx={{
                    '& .MuiBottomNavigationAction-label': {
                        fontSize: '12px',
                    },
                }} />
                <BottomNavigationAction label="Расписание" icon={
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M22.3456 19.2342C20.9815 24.8027 12.4461 22.9118 13.7921 17.1656C15.1014 11.5765 23.7327 13.572 22.3456 19.2342ZM12.2356 18.8074C10.5 18.8074 4.2697 18.7951 2.12572 18.8092C1.61192 18.8125 1.46589 18.5899 1.46763 18.0659C1.47513 15.7994 1.39979 8.88543 1.47757 7.61368H19.5982L19.6246 12.511C14.9163 11.9199 12.2356 14.3497 12.2356 18.8074ZM3.92121 2.95055C3.92217 3.73268 3.83188 4.25402 4.69436 4.26645C5.48703 4.27786 5.31832 3.50083 5.34371 2.95207L7.85634 2.95055C7.85565 3.63242 7.86343 4.20049 8.54344 4.22354C9.28884 4.24884 9.25452 3.68072 9.25544 3.00045L11.7708 3.00956C11.7819 3.97218 11.8092 4.30016 12.4363 4.31833C13.293 4.34312 13.1359 3.99692 13.1707 2.95055L15.6845 2.96048C15.7352 3.80862 15.6043 4.30803 16.5187 4.34923C17.2203 4.38083 17.1684 3.67708 17.1647 3.00607C20.2181 3.03624 19.5526 3.52253 19.5662 6.2137H1.47688C1.44298 3.35079 1.2705 2.95055 3.92121 2.95055ZM3.92121 1.55034C-0.10776 1.55034 0.00726621 2.62969 0.00731671 6.41746C0.00735038 10.2027 -0.00399752 14.5109 0.00150711 18.3646C0.00872877 19.5354 0.402032 20.1657 1.49407 20.1799C3.37773 20.1728 9.94169 20.2076 12.2976 20.2076C12.3968 20.5768 13.5786 22.46 15.2642 23.4264C17.0134 24.4292 20.2373 24.2431 22.1895 22.483C25.0907 19.8673 24.3636 14.8119 21.0186 13.0024C21.0186 10.4608 20.9921 6.43641 20.9998 3.89491C20.9916 2.29692 20.4393 1.42395 17.0845 1.55034C17.0845 0.802841 17.258 0.144154 16.4446 0.127826C15.6011 0.110857 15.6844 0.657044 15.6842 1.55209L13.1686 1.54134C13.1686 0.801646 13.2273 0.134862 12.4629 0.143464C11.7058 0.152016 11.7705 0.777321 11.7705 1.54326L9.25544 1.54644C9.25544 0.819304 9.31224 0.153716 8.56051 0.139643C7.75478 0.12461 7.85607 0.744242 7.85653 1.54349L5.36046 1.54575C5.32164 0.816358 5.41109 0.16555 4.66566 0.160247C3.91086 0.154877 3.92121 0.530421 3.92121 1.55034Z" fill={value == 1 ? '#81212D' : '#999999'} />
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.4453 15.9051C17.4453 16.7193 17.4366 18.0391 17.4571 18.7405C18.4405 18.7366 19.6312 18.7302 20.6425 18.7377C21.3662 18.7485 21.4729 17.5132 20.6293 17.5257C20.3261 17.5302 19.3432 17.5102 18.7472 17.5102L18.7384 15.8557C18.7328 14.8781 17.4579 14.8916 17.4453 15.9051Z" fill={value == 1 ? '#81212D' : '#999999'} />
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.83163 9.03219H8.87473C9.28513 9.03219 9.62091 9.36797 9.62091 9.77837C9.62091 10.1888 9.28513 10.5246 8.87473 10.5246H7.83163C7.42122 10.5246 7.08544 10.1888 7.08544 9.77839C7.08544 9.36798 7.42122 9.03219 7.83163 9.03219Z" fill={value == 1 ? '#81212D' : '#999999'} />
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.9749 9.03219H13.018C13.4284 9.03219 13.7642 9.36797 13.7642 9.77837C13.7642 10.1888 13.4284 10.5246 13.018 10.5246H11.9749C11.5645 10.5246 11.2287 10.1888 11.2287 9.77839C11.2287 9.36798 11.5645 9.03219 11.9749 9.03219Z" fill={value == 1 ? '#81212D' : '#999999'} />
                        <path fillRule="evenodd" clipRule="evenodd" d="M16.1294 9.03219H17.1725C17.5829 9.03219 17.9187 9.36797 17.9187 9.77837C17.9187 10.1888 17.5829 10.5246 17.1725 10.5246H16.1294C15.719 10.5246 15.3832 10.1888 15.3832 9.77839C15.3832 9.36798 15.719 9.03219 16.1294 9.03219Z" fill={value == 1 ? '#81212D' : '#999999'} />
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.9749 12.1499H13.018C13.4284 12.1499 13.7642 12.4857 13.7642 12.8961C13.7642 13.3065 13.4284 13.6423 13.018 13.6423H11.9749C11.5645 13.6423 11.2287 13.3065 11.2287 12.8961C11.2287 12.4857 11.5645 12.1499 11.9749 12.1499Z" fill={value == 1 ? '#81212D' : '#999999'} />
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.83163 12.1499H8.87473C9.28513 12.1499 9.62091 12.4857 9.62091 12.8961C9.62091 13.3065 9.28513 13.6423 8.87473 13.6423H7.83163C7.42122 13.6423 7.08544 13.3065 7.08544 12.8961C7.08544 12.4857 7.42122 12.1499 7.83163 12.1499Z" fill={value == 1 ? '#81212D' : '#999999'} />
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.83163 15.3054H8.87473C9.28513 15.3054 9.62091 15.6411 9.62091 16.0516C9.62091 16.462 9.28513 16.7978 8.87473 16.7978H7.83163C7.42122 16.7978 7.08544 16.462 7.08544 16.0516C7.08544 15.6412 7.42122 15.3054 7.83163 15.3054Z" fill={value == 1 ? '#81212D' : '#999999'} />
                        <path fillRule="evenodd" clipRule="evenodd" d="M3.70622 15.3054H4.74931C5.15972 15.3054 5.49551 15.6411 5.49551 16.0516C5.49551 16.462 5.15972 16.7978 4.74931 16.7978H3.70622C3.29581 16.7978 2.96003 16.462 2.96003 16.0516C2.96003 15.6412 3.29581 15.3054 3.70622 15.3054Z" fill={value == 1 ? '#81212D' : '#999999'} />
                        <path fillRule="evenodd" clipRule="evenodd" d="M3.70622 12.1499H4.74931C5.15972 12.1499 5.49551 12.4857 5.49551 12.8961C5.49551 13.3065 5.15972 13.6423 4.74931 13.6423H3.70622C3.29581 13.6423 2.96003 13.3065 2.96003 12.8961C2.96003 12.4857 3.29581 12.1499 3.70622 12.1499Z" fill={value == 1 ? '#81212D' : '#999999'} />
                    </svg>
                } sx={{
                    '& .MuiBottomNavigationAction-label': {
                        fontSize: '12px',
                    },
                }} />
                <BottomNavigationAction label="Профиль" icon={<AccountCircleOutlinedIcon />} sx={{
                    '& .MuiBottomNavigationAction-label': {
                        fontSize: '12px',
                    },
                }} />
            </BottomNavigation>
        </Paper>
    );
};

export default BottomNav;
