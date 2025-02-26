import axios from "axios";

let adress = 'http://192.168.1.173:5000'
// let adress = 'http://62.217.177.31:5000'
// let adress = 'https://www.backend.ncsa-lk.ru'

export const GET_fetchRequest = async (name, setRequest) => {
    try {
        const response = await axios.get(`${adress}/api/${name}`);
        setRequest(response.data);
    } catch (err) {
        console.log(err.message);
    }
};

export const POST_fetchRequest = async (addInfo, name) => {
    try {
        const response = await axios.post(
            `${adress}/api/${name}`,
            addInfo,
        );
        return response.data.user;
    } catch (err) {
        console.log(err.message);
    }
};

export const PUT_fetchRequest = async (addInfo, name) => {
    try {
        const response = await axios.put(
            `${adress}/api/${name}/${addInfo.id}`,
            addInfo,
        );
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
};

export const formatDate = () => {
    const months = [
        "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
        "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
    ];
    const daysOfWeek = [
        "Воскресенье", "Понедельник", "Вторник", "Среда",
        "Четверг", "Пятница", "Суббота"
    ];

    const now = new Date();

    const day = now.getDate();
    const month = months[now.getMonth()];
    const weekday = daysOfWeek[now.getDay()];

    return `${day} ${month}, ${weekday}`;
};

export const getWeekNumber = (date = new Date()) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const diffInDays = Math.floor((date - startOfYear) / (1000 * 60 * 60 * 24));
    const weekNumber = Math.ceil((diffInDays + startOfYear.getDay() + 1) / 7);
    return weekNumber % 2 === 0 ? 'numerator' : 'denominator';
}

// ----------------------------------------------------------------------------

export const schedule = {}

export const users = [];