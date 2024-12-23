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
    return weekNumber % 2 === 0 ? 'denominator' : 'numerator';
}

// ----------------------------------------------------------------------------

export const schedule = {
    "ПМ-131": {
        "monday": [
            {
                "pairNumber": 1,
                "type": "type1",
                "fields": {
                    "main_subject": "Математика",
                    "main_teacher": "Джатдоев Алим Сеит-Алиевич",
                    "main_room": "211",
                    "main_type": "Лекционное занятие"
                }
            },
            {
                "pairNumber": 2,
                "type": "type2",
                "fields": {
                    "subgroup1_subject": "Математика",
                    "subgroup1_teacher": "Васильев Дмитрий Сергеевич",
                    "subgroup1_room": "247",
                    "subgroup1_type": "Лекционное занятие",
                    "subgroup2_subject": "Математика",
                    "subgroup2_teacher": "Алексеев Александр Александрович",
                    "subgroup2_room": "247",
                    "subgroup2_type": "Лекционное занятие"
                }
            },
            {
                "pairNumber": 3,
                "type": "type3",
                "fields": {
                    "numerator_subject": "Математика",
                    "numerator_teacher": "Васильев Дмитрий Сергеевич",
                    "numerator_room": "247",
                    "numerator_type": "Лекционное занятие",
                    "denominator_subject": "Математика",
                    "denominator_teacher": "Алексеев Александр Александрович",
                    "denominator_room": "247",
                    "denominator_type": "Практическое занятие"
                }
            },
            {
                "pairNumber": 4,
                "type": "type4",
                "fields": {
                    "subgroup1_numerator_subject": "Математика",
                    "subgroup1_numerator_teacher": "Алексеев Александр Александрович",
                    "subgroup1_numerator_room": "247",
                    "subgroup1_numerator_type": "Лекционное занятие",
                    "subgroup1_denominator_subject": "Информатика",
                    "subgroup1_denominator_teacher": "Алексеев Александр Александрович",
                    "subgroup1_denominator_room": "247",
                    "subgroup1_denominator_type": "Лабораторная работа",
                    "subgroup2_subject": "Математика",
                    "subgroup2_teacher": "Алексеев Александр Александрович",
                    "subgroup2_room": "216",
                    "subgroup2_type": "Практическое занятие"
                }
            },
            {
                "pairNumber": 5,
                "type": "type5",
                "fields": {
                    "subgroup1_subject": "Математика",
                    "subgroup1_teacher": "Алексеев Александр Александрович",
                    "subgroup1_room": "247",
                    "subgroup1_type": "Лабораторная работа",
                    "subgroup2_numerator_subject": "Математика",
                    "subgroup2_numerator_teacher": "Алексеев Александр Александрович",
                    "subgroup2_numerator_room": "247",
                    "subgroup2_numerator_type": "Лекционное занятие",
                    "subgroup2_denominator_subject": "Математика",
                    "subgroup2_denominator_teacher": "Алексеев Александр Александрович",
                    "subgroup2_denominator_room": "247",
                    "subgroup2_denominator_type": "Практическое занятие"
                }
            },
            {
                "pairNumber": 6,
                "type": "type6",
                "fields": {
                    "subgroup1_numerator_subject": "Математика",
                    "subgroup1_numerator_teacher": "Морозов Владимир Петрович",
                    "subgroup1_numerator_room": "247",
                    "subgroup1_numerator_type": "Лекционное занятие",
                    "subgroup2_numerator_subject": "Математика",
                    "subgroup2_numerator_teacher": "Алексеев Александр Александрович",
                    "subgroup2_numerator_room": "218",
                    "subgroup2_numerator_type": "Лекционное занятие",
                    "denominator_subject": "Математика",
                    "denominator_teacher": "Алексеев Александр Александрович",
                    "denominator_type": "Практическое занятие",
                    "denominator_room": "216"
                }
            },
            {
                "pairNumber": 7,
                "type": "type7",
                "fields": {
                    "numerator_subject": "Математика",
                    "numerator_teacher": "Алексеев Александр Александрович",
                    "numerator_room": "216",
                    "numerator_type": "Лекционное занятие",
                    "subgroup1_denominator_subject": "Математика",
                    "subgroup1_denominator_teacher": "Алексеев Александр Александрович",
                    "subgroup1_denominator_room": "247",
                    "subgroup1_denominator_type": "Практическое занятие",
                    "subgroup2_denominator_subject": "Математика",
                    "subgroup2_denominator_teacher": "Алексеев Александр Александрович",
                    "subgroup2_denominator_room": "247",
                    "subgroup2_denominator_type": "Лабораторная работа"
                }
            },
            {
                "pairNumber": 8,
                "type": "type8",
                "fields": {
                    "subgroup1_numerator_subject": "Математика",
                    "subgroup1_numerator_teacher": "Морозов Владимир Петрович",
                    "subgroup1_numerator_room": "247",
                    "subgroup1_numerator_type": "Лекционное занятие",
                    "subgroup2_numerator_subject": "Информатика",
                    "subgroup2_numerator_teacher": "Алексеев Александр Александрович",
                    "subgroup2_numerator_room": "247",
                    "subgroup2_numerator_type": "Лекционное занятие",
                    "subgroup1_denominator_subject": "Математика",
                    "subgroup1_denominator_teacher": "Васильев Дмитрий Сергеевич",
                    "subgroup1_denominator_room": "216",
                    "subgroup1_denominator_type": "Лабораторная работа",
                    "subgroup2_denominator_subject": "Информатика123",
                    "subgroup2_denominator_teacher": "Алексеев Александр Александрович",
                    "subgroup2_denominator_room": "216",
                    "subgroup2_denominator_type": "Лабораторная работа"
                }
            }
        ],
        "tuesday": [],
        "wednesday": [],
        "thursday": [],
        "friday": [],
        "saturday": [],
        "sunday": []
    }
}

export const users = [
    {
        id: 1,
        username: "student1",
        password: "password123",
        name: "Джатдоев Алим",
        group: "ПМ-131",
        subgroup: '1',
        role: "student",
    },
    {
        id: 2,
        username: "student2",
        password: "password456",
        name: "Чагарова Аминат",
        group: "ПМ-131",
        subgroup: '2',
        role: "student",
    },
];
