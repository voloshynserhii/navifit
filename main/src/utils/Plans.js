import { lightning, BMI, OK, warning, body, dumbbells, fire } from "./icons"

const steps = [
    {
        title: 'Jaki jest Twój cel?',
        value: 'goal',
        options: [
            {
                title: 'Zrzucenie wagi',
                value: 'looseWeight'
            },
            {
                title: 'Zbudować masę mięśniową',
                value: 'gainMuscles'
            },
            {
                title: 'Wzmocnij mięśnie',
                value: 'musclePower'
            },
            {
                title: 'Posiadanie idealnego plażowego ciała',
                value: 'idealBody'
            },
        ]
    },
    {
        title: 'Wybierz płeć',
        value: 'gender',
        options: [
            {
                title: 'Mężczyzna',
                value: 'male'
            },
            {
                title: 'Kobieta',
                value: 'female'
            },
        ]
    },
    // {
    //     title: 'Jaki jest Twój typ sylwetki?',
    //     subTitle: 'Każdy typ ciała ma określoną strukturę metaboliczną',
    //     value: 'bodyType',
    //     options: [
    //         {
    //             title: 'Smukły',
    //             value: '1'
    //         },
    //         {
    //             title: 'Średnia budowa',
    //             value: '2'
    //         },
    //         {
    //             title: 'Stockowy',
    //             value: '3'
    //         },
    //         {
    //             title: 'Znaczna nadwaga ',
    //             value: '4'
    //         },
    //     ]
    // },
    // {
    //     title: 'Opisz swój typowy dzień',
    //     subTitle: 'Mężczyźni którzy chcą schudnąć, wymagają bardziej spersonalizowanego podejścia w zależności od aktualnego stylu życia.',
    //     value: 'dayType',
    //     options: [
    //         {
    //             title: 'Przeważnie w domu',
    //             value: '1'
    //         },
    //         {
    //             title: 'W biurze',
    //             value: '2'
    //         },
    //         {
    //             title: 'Chodzę na długie spacery',
    //             value: '3'
    //         },
    //         {
    //             title: 'Praca fizyczna',
    //             value: '4'
    //         },
    //     ]
    // },
    {
        title: 'Zmiana zachowania a restrykcyjna dieta',
        subTitle: 'Pracujemy poprzez tworzenie nawyków, co zapewnia długotrwałe rezultaty',
        isGraphic: true,
        icon: <div style={{ display: 'flex' }}>{lightning}</div>,
    },
    // {
    //     title: 'Czy odczuwasz dolegliwości żołądkowe w ciągu dnia?',
    //     value: 'hunger',
    //     options: [
    //         {
    //             title: 'Tak',
    //             value: '1'
    //         },
    //         {
    //             title: 'Nie',
    //             value: '2'
    //         },
    //     ]
    // },
    // {
    //     title: 'Ile czasu minęło, odkąd miałeś idealną wagę?',
    //     value: 'idealWeight',
    //     options: [
    //         {
    //             title: 'Mniej niż 1 rok',
    //             value: '1',
    //         },
    //         {
    //             title: '1-3 lata',
    //             value: '2',
    //         },
    //         {
    //             title: 'Ponad 3 lata',
    //             value: '3',
    //         },
    //         {
    //             title: 'Nigdy nie byłem w idealnej wadze',
    //             value: '4',
    //         },
    //     ]
    // },
    // {
    //     title: 'Wybierz wszystko, co dotyczy Ciebie:',
    //     value: 'behavior',
    //     long: true,
    //     options: [
    //         {
    //             title: 'Jem późno w nocy',
    //             value: '1'
    //         },
    //         {
    //             title: 'Nie śpię wystarczająco',
    //             value: '2'
    //         },
    //         {
    //             title: 'Zawsze jedzą słodycze',
    //             value: '3'
    //         },
    //         {
    //             title: 'Uwielbiam napoje gazowane',
    //             value: '4'
    //         },
    //         {
    //             title: 'Spożywam dużo soli',
    //             value: '5'
    //         },
    //     ]
    // },
    // {
    //     title: 'Trenujesz?',
    //     subTitle: 'Ważne jest, aby wziąć pod uwagę poziom aktywności dla mężczyzny, który chce schudnąć i pracuje w biurze.',
    //     value: 'training',
    //     options: [
    //         {
    //             title: 'Prawie brak aktywności fizycznej',
    //             value: '1',
    //         },
    //         {
    //             title: 'Tylko spacery',
    //             value: '2',
    //         },
    //         {
    //             title: '1-2 razy w tygodniu',
    //             value: '3',
    //         },
    //         {
    //             title: '3-5 razy w tygodniu',
    //             value: '4',
    //         },
    //         {
    //             title: '5-7 razy w tygodniu',
    //             value: '5',
    //         },
    //     ]
    // },
    // {
    //     title: 'Jaka jest twoja energia z dnia na dzień?',
    //     value: 'energy',
    //     options: [
    //         {
    //             title: 'Równomierna',
    //             value: '1',
    //         },
    //         {
    //             title: 'Przejadam pod czas posiłku',
    //             value: '2',
    //         },
    //         {
    //             title: 'Uczuwam zmęczenia po zjedzeniu posiłku',
    //             value: '3',
    //         },
    //     ]
    // },
    // {
    //     title: 'Ile godzin śpisz?',
    //     value: 'sleep',
    //     options: [
    //         {
    //             title: 'Mniej niż 5 godzin',
    //             value: '1',
    //         },
    //         {
    //             title: '5-6 godzin',
    //             value: '2',
    //         },
    //         {
    //             title: '7-8 godzin',
    //             value: '3',
    //         },
    //         {
    //             title: 'Ponad 8 godzin',
    //             value: '4',
    //         },
    //     ]
    // },
    // {
    //     title: 'Ile wody wypijasz codziennie?',
    //     value: 'water',
    //     options: [
    //         {
    //             title: 'Tylko kawa lub herbata',
    //             value: '1',
    //         },
    //         {
    //             title: 'Mniej niż 2 szklanki',
    //             value: '2',
    //         },
    //         {
    //             title: '2-6 szklanek',
    //             value: '3',
    //         },
    //         {
    //             title: '7-10 szklanek',
    //             value: '4',
    //         },
    //         {
    //             title: 'Ponad 10 szklanek',
    //             value: '5',
    //         },
    //     ]
    // },
    // {
    //     title: 'Ile czasu jesteś gotów poświęcić na przygotowanie jednego posiłku?',
    //     value: 'cooking',
    //     options: [
    //         {
    //             title: 'Mniej niż 30 min',
    //             value: '1',
    //         },
    //         {
    //             title: '30-60 min',
    //             value: '2',
    //         },
    //         {
    //             title: 'Ponad 1 godzinę',
    //             value: '3',
    //         },
    //     ]
    // },
    // {
    //     title: 'Czy masz jakieś ograniczenia dietetyczne lub alergie?',
    //     value: 'alergy',
    //     long: true,
    //     options: [
    //         {
    //             title: 'Nie toleruję laktozy',
    //             value: '1',
    //         },
    //         {
    //             title: 'Nie jem glutenu',
    //             value: '2',
    //         },
    //         {
    //             title: 'Jestem wegetarianinem',
    //             value: '3',
    //         },
    //         {
    //             title: 'Jestem weganinem',
    //             value: '4',
    //         },
    //     ]
    // },
    // {
    //     title: 'Zaznacz /%warzywa które chcesz uwzględnić w diecie:',
    //     value: 'vegetables',
    //     long: true,
    //     options: [
    //         {
    //             title: 'Brokuły',
    //             value: '1',
    //         },
    //         {
    //             title: 'Kalafior',
    //             value: '2',
    //         },
    //         {
    //             title: 'Szparag',
    //             value: '3',
    //         },
    //         {
    //             title: 'Papryka',
    //             value: '4',
    //         },
    //         {
    //             title: 'Bakłażan',
    //             value: '5',
    //         },
    //         {
    //             title: 'Kapusta',
    //             value: '6',
    //         },
    //         {
    //             title: 'Szpinak',
    //             value: '7',
    //         },
    //         {
    //             title: 'Cebula',
    //             value: '8',
    //         },
    //     ]
    // },
    // {
    //     title: 'Zaznacz /%zboża które chcesz uwzględnić w diecie:',
    //     value: 'grains',
    //     long: true,
    //     filtered: true,
    //     options: [
    //         {
    //             title: 'Ryż',
    //             value: '1',
    //         },
    //         {
    //             title: 'Komosa ryżowa',
    //             value: '2',
    //         },
    //         {
    //             title: 'Kuskus',
    //             value: '3',
    //             gluten: true
    //         },
    //         {
    //             title: 'Gryka',
    //             value: '4',
    //         },
    //         {
    //             title: 'Amarant',
    //             value: '5',
    //         },
    //         {
    //             title: 'Mąka kukurydziana',
    //             value: '6',
    //         },
    //         {
    //             title: 'Kasza jaglana',
    //             value: '7',
    //         },
    //         {
    //             title: 'Bulgur',
    //             value: '8',
    //             gluten: true
    //         },
    //         {
    //             title: 'Kasza manna',
    //             value: '9',
    //         },
    //     ]
    // },
    // {
    //     title: 'Zaznacz /%produkty które chcesz uwzględnić w diecie:',
    //     value: 'desired',
    //     long: true,
    //     filtered: true,
    //     options: [
    //         {
    //             title: 'Awokado',
    //             value: '1'
    //         },
    //         {
    //             title: 'Fasolka',
    //             value: '2'
    //         },
    //         {
    //             title: 'Grzyby',
    //             value: '3'
    //         },
    //         {
    //             title: 'Mleko',
    //             value: '4',
    //             lactose: true,
    //             nonVegan: true
    //         },
    //         {
    //             title: 'Hummus',
    //             value: '5'
    //         },
    //         {
    //             title: 'Mleko roślinne',
    //             value: '6'
    //         },
    //         {
    //             title: 'Jajka',
    //             value: '7',
    //             nonVegan: true
    //         },
    //         {
    //             title: 'Twarożek',
    //             value: '8',
    //             lactose: true,
    //             nonVegan: true
    //         },
    //     ]
    // },
    // {
    //     title: 'Zaznacz /%mięso /%i /%ryby które chcesz uwzględnić w diecie:',
    //     value: 'meat',
    //     long: true,
    //     filtered: true,
    //     options: [
    //         {
    //             title: 'Indyk',
    //             value: '1',
    //             nonVegetarian: true,
    //             nonVegan: true
    //         },
    //         {
    //             title: 'Wołowina',
    //             value: '2',
    //             nonVegetarian: true,
    //             nonVegan: true
    //         },
    //         {
    //             title: 'Kurczak',
    //             value: '3',
    //             nonVegetarian: true,
    //             nonVegan: true
    //         },
    //         {
    //             title: 'Wieprzowina',
    //             value: '4',
    //             nonVegetarian: true,
    //             nonVegan: true
    //         },
    //         {
    //             title: 'Ryba',
    //             value: '5',
    //             nonVegan: true
    //         },
    //         {
    //             title: 'Owoce morza',
    //             value: '6',
    //             nonVegan: true
    //         },
    //     ]
    // },
    {
        title: 'Jaka jest Twoja wysokość?',
        value: 'height',
        unit: 'cm',
        typeNumber: true,
        min: 100,
        max: 250,
        subTitles: {
            normal: {
                title: 'Obliczanie BMI',
                text: 'Wskaźnik masy ciała (BMI) to miara procentowa tkanki tłuszczowej powszechnie stosowana do oszacowania poziomu ryzyka potencjalnych problemów zdrowotnych.',
                icon: BMI
            }
        }
    },
    {
        title: 'Jaka jest Twoja /%aktualna waga?',
        value: 'weight',
        unit: 'kg',
        typeNumber: true,
        min: 30,
        max: 250,
        subTitles: {
            normal: {
                title: 'Twoje BMI wynosi number i jest uważane za normalne',
                text: 'Zaczynasz od świetnego miejsca! Teraz na podstawie Twojego BMI stworzymy program dostosowany do Twoich potrzeb.',
                icon: OK
            },
            lowerThanNormal: {
                title: 'Twoje BMI wynosi number, co oznacza otyłość',
                text: 'Stracąc trochę wagi, możesz wiele zyskać. Wykorzystamy Twoje BMI do stworzenia programu odchudzania, którego potrzebujesz.',
                icon: warning
            },
            higherThanNormal: {
                title: 'Twoje BMI wynosi number, co oznacza niedowagę',
                text: 'Przed Tobą trochę pracy, ale świetnie, że robisz ten pierwszy krok. Wykorzystamy Twoje BMI, aby stworzyć program specjalnie dla Ciebie.',
                icon: warning
            }
        }
    },
    {
        infoPage: true
    },
    {
        title: 'Ile masz lat?',
        value: 'age',
        unit: 'lat',
        typeNumber: true,
        min: 15,
        max: 100,
        subTitles: {
            normal: {
                title: 'Aby spersonalizować plan, prosimy o podanie wieku',
                text: 'Stwierdzono, że osoby starsze mają wyższy procent tkanki tłuszczowej w organizmie niż osoby młodsze o tym samym BMI.',
                icon: body

            }
        }
    },
    {
        title: 'Jaka jest Twoja /%pożądana waga?',
        value: 'desiredWeight',
        unit: 'kg',
        typeNumber: true,
        min: 30,
        max: 250,
        subTitles: {
            lowerThanNormal: {
                title: 'O o! Alarm o niskiej wadze!',
                text: 'Normalny zakres wagi dla Twojego wzrostu wynosi od 45 kg do 60 kg. Każda waga poniżej 45 kg jest klasyfikowana jako niedowaga i nie jest zalecana przez Światową Organizację Zdrowia.',
                icon: warning
            },
            higherThanNormal: {
                title: 'Ruszaj się: zwiększ swoją wagę o 50%.',
                text: 'Badanie przeprowadzone na Uniwersytecie w Utah wykazało, że zaledwie 5 minut ćwiczeń dziennie może utrzymać poziom sprawności, poprawić poziom energii i zapewnić lepszy sen.',
                icon: dumbbells
            },
            normal: {
                title: 'Warto: schudnąć 25% swojej wagi',
                text: 'Klinika Mayo przeprowadziła badanie, które wykazało, że osoby z nadwagą, które tracą 20% lub więcej masy ciała, są ponad dwukrotnie bardziej narażone na poprawę zdrowia metabolicznego niż osoby, które tracą tylko 5-10%.',
                icon: fire

            }
        }
    },
    {
        title: 'Zbliża się ważne wydarzenie?',
        value: 'desiredDate',
        typeDate: true,
        subTitles: {
            normal: {
                title: 'Motywacją',
                text: 'Posiadanie czegoś, na co warto czekać, może być świetną motywacją do osiągnięcia celu. Będziemy pamiętać o tym ważnym wydarzeniu podczas Twojej podróży.'
            }
        }
    },
    {
        title: 'Ostatni plan, jakiego będziesz potrzebować, aby uzyskać formę',
        isGraphic: true
    },
]

const countBMI = ({ height, weight }) => {
    return Number(weight / (height * height) * 10000).toFixed(2)
}

// const countIBW = ({ height, gender }) => {
//     const value = gender === 'female' ? height - 10 : height
    
//     return Number(22 * ((value * value) / 10000)).toFixed(2)
// }

const countWeightDiapasone = ({ height, gender }) => {
    const value = gender === 'female' ? height - 10 : height
    const lowerLimit = Number(18.5 * ((value * value) / 10000)).toFixed(2)
    const higherLimit = Number(25 * ((value * value) / 10000)).toFixed(2)
    
    return { lowerLimit, higherLimit }
}

const getWarning = (currentStep, answers) => {
    if (currentStep.subTitles) {
        const shouldChoose = Object.keys(currentStep.subTitles).length > 1

        const normal = {
            title: currentStep.subTitles.normal.title,
            text: currentStep.subTitles.normal.text,
            icon: currentStep.subTitles.normal.icon
        }
        
        if (!shouldChoose) {
            return normal
        } else { 
            const { weight, height, gender, desiredWeight } = answers
            const { min, max } = currentStep

            if (currentStep.value === 'weight' && weight && weight >= min && weight <= max) {
                const BMI = countBMI({ height, weight })

                if (BMI < 18.5) {
                    return {
                        title: currentStep.subTitles.lowerThanNormal.title.replace('number', BMI),
                        text: currentStep.subTitles.lowerThanNormal.text,
                        icon: currentStep.subTitles.lowerThanNormal.icon
                    } 
                } else if (BMI >= 25) {
                    return {
                        title: currentStep.subTitles.higherThanNormal.title.replace('number', BMI),
                        text: currentStep.subTitles.higherThanNormal.text,
                        icon: currentStep.subTitles.higherThanNormal.icon
                    }
                } else {
                    return {...normal, title: normal.title.replace('number', BMI)}
                }
            } else if (currentStep.value === 'desiredWeight' && desiredWeight && desiredWeight >= min && desiredWeight <= max) {
                const { lowerLimit, higherLimit } = countWeightDiapasone({ height, gender })
                
                if (desiredWeight < lowerLimit) {
                    return {
                        title: currentStep.subTitles.lowerThanNormal.title,
                        text: currentStep.subTitles.lowerThanNormal.text,
                        icon: currentStep.subTitles.lowerThanNormal.icon
                    }
                } else if (desiredWeight > higherLimit) {
                    return {
                        title: currentStep.subTitles.higherThanNormal.title,
                        text: currentStep.subTitles.higherThanNormal.text,
                        icon: currentStep.subTitles.higherThanNormal.icon
                    }
                } else {
                    return normal
                }                
            }
        }

    }

    return undefined
}

const filterIngredients = (restrictions, list = []) => {
    let newList = [...list]

    if (restrictions[1]) {
        newList = newList.filter(item => !item['lactose'])
    }
    if (restrictions[2]) {
        newList = newList.filter(item => !item['gluten'])
    }
    if (restrictions[3]) {
        newList = newList.filter(item => !item['nonVegetarian'])
    }
    if (restrictions[4]) {
        newList = newList.filter(item => !item['nonVegan'])
    }

    return newList
}

const ingredients = {
    vegetables: [
        {
            title: 'broccoli',
            value: '1',
            id: '1'
        },
        {
            title: 'cauliflower',
            value: '2',
            id: '2'
        },
        {
            title: 'asparagus',
            value: '3',
            id: '6'
        },
        {
            title: 'bellPepper',
            value: '4',
            id: '3'
        },
        {
            title: 'eggplant',
            value: '4',
            id: '4'
        },
        {
            title: 'cabbage',
            value: '5',
            id: '5'
        },
        {
            title: 'spinach',
            value: '7',
            id: '7'
        },
        {
            title: 'onion',
            value: '8',
            id: '8'
        },
    ],
    grains: [
        {
            title: 'rice',
            value: '1',
            id: '9'
        },
        {
            title: 'quinoa',
            value: '2',
            id: '10'
        },
        {
            title: 'couscous',
            value: '3',
            gluten: true,
            id: '11'
        },
        {
            title: 'buckwheat',
            value: '4',
            id: '12'
        },
        {
            title: 'amaranth',
            value: '5',
            id: '13'
        },
        {
            title: 'cornmeal',
            value: '6',
            id: '14'
        },
        {
            title: 'milletGroats',
            value: '7',
            id: '15'
        },
        {
            title: 'bulgur',
            value: '8',
            gluten: true,
            id: '16'
        },
        {
            title: 'semolina',
            value: '9',
            id: '17'
        },
    ],
    desiredProducts: [
        {
            title: 'avocado',
            value: '1',
            id: '18'
        },
        {
            title: 'peas',
            value: '2',
            id: '19'
        },
        {
            title: 'mushrooms',
            value: '3',
            id: '20'
        },
        {
            title: 'milk',
            value: '4',
            lactose: true,
            nonVegan: true,
            id: '22'
        },
        {
            title: 'hummus',
            value: '5',
            id: '24'
        },
        {
            title: 'plantMilk',
            value: '6',
            id: '25'
        },
        {
            title: 'eggs',
            value: '7',
            nonVegan: true,
            id: '21'
        },
        {
            title: 'cottageCheese',
            value: '8',
            lactose: true,
            nonVegan: true,
            id: '23'
        },
    ],
    meat: [
        {
            title: 'turkey',
            value: '1',
            nonVegetarian: true,
            nonVegan: true,
            id: '26'
        },
        {
            title: 'beef',
            value: '2',
            nonVegetarian: true,
            nonVegan: true,
            id: '27'
        },
        {
            title: 'chicken',
            value: '3',
            nonVegetarian: true,
            nonVegan: true,
            id: '28'
        },
        {
            title: 'pork',
            value: '4',
            nonVegetarian: true,
            nonVegan: true,
            id: '29'
        },
        {
            title: 'fish',
            value: '5',
            nonVegan: true,
            id: '30'
        },
        {
            title: 'seafood',
            value: '6',
            nonVegan: true,
            id: '31'
        },
    ]
}

export { steps, filterIngredients, ingredients, getWarning }