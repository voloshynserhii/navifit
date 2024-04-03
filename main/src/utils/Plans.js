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
        value: 'sex',
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
    {
        title: 'Jaki jest Twój typ sylwetki?',
        subTitle: 'Każdy typ ciała ma określoną strukturę metaboliczną',
        value: 'bodyType',
        options: [
            {
                title: 'Smukły',
                value: '1'
            },
            {
                title: 'Średnia budowa',
                value: '2'
            },
            {
                title: 'Stockowy',
                value: '3'
            },
            {
                title: 'Znaczna nadwaga ',
                value: '4'
            },
        ]
    },
    {
        title: 'Opisz swój typowy dzień',
        subTitle: 'Mężczyźni którzy chcą schudnąć, wymagają bardziej spersonalizowanego podejścia w zależności od aktualnego stylu życia.',
        value: 'dayType',
        options: [
            {
                title: 'Przeważnie w domu',
                value: '1'
            },
            {
                title: 'W biurze',
                value: '2'
            },
            {
                title: 'Chodzę na długie spacery',
                value: '3'
            },
            {
                title: 'Praca fizyczna',
                value: '4'
            },
        ]
    },
    {
        title: 'Zmiana zachowania a restrykcyjna dieta',
        subTitle: 'Pracujemy poprzez tworzenie nawyków, co zapewnia długotrwałe rezultaty',
        value: 'diet',
        isGraphic: true
    },
    {
        title: 'Czy odczuwasz dolegliwości żołądkowe w ciągu dnia?',
        value: 'hunger',
        options: [
            {
                title: 'Tak',
                value: '1'
            },
            {
                title: 'Nie',
                value: '2'
            },
        ]
    },
    {
        title: 'Ile czasu minęło, odkąd miałeś idealną wagę?',
        value: 'idealWeight',
        options: [
            {
                title: 'Mniej niż 1 rok',
                value: '1',
            },
            {
                title: '1-3 lata',
                value: '2',
            },
            {
                title: 'Ponad 3 lata',
                value: '3',
            },
            {
                title: 'Nigdy nie byłem w idealnej wadze',
                value: '4',
            },
        ]
    },
    {
        title: 'Wybierz wszystko, co dotyczy Ciebie:',
        value: 'behavior',
        long: true,
        options: [
            {
                title: 'Jem późno w nocy',
                value: '1'
            },
            {
                title: 'Nie śpię wystarczająco',
                value: '2'
            },
            {
                title: 'Zawsze jedzą słodycze',
                value: '3'
            },
            {
                title: 'Uwielbiam napoje gazowane',
                value: '4'
            },
            {
                title: 'Spożywam dużo soli',
                value: '5'
            },
        ]
    },
    {
        title: 'Trenujesz?',
        subTitle: 'Ważne jest, aby wziąć pod uwagę poziom aktywności dla mężczyzny, który chce schudnąć i pracuje w biurze.',
        value: 'training',
        options: [
            {
                title: 'Prawie brak aktywności fizycznej',
                value: '1',
            },
            {
                title: 'Tylko spacery',
                value: '2',
            },
            {
                title: '1-2 razy w tygodniu',
                value: '3',
            },
            {
                title: '3-5 razy w tygodniu',
                value: '4',
            },
            {
                title: '5-7 razy w tygodniu',
                value: '5',
            },
        ]
    },
    {
        title: 'Jaka jest twoja energia z dnia na dzień?',
        value: 'energy',
        options: [
            {
                title: 'Równomierna',
                value: '1',
            },
            {
                title: 'Przejadam pod czas posiłku',
                value: '2',
            },
            {
                title: 'Uczuwam zmęczenia po zjedzeniu posiłku',
                value: '3',
            },
        ]
    },
    {
        title: 'Ile godzin śpisz?',
        value: 'sleep',
        options: [
            {
                title: 'Mniej niż 5 godzin',
                value: '1',
            },
            {
                title: '5-6 godzin',
                value: '2',
            },
            {
                title: '7-8 godzin',
                value: '3',
            },
            {
                title: 'Ponad 8 godzin',
                value: '4',
            },
        ]
    },
    {
        title: 'Ile wody wypijasz codziennie?',
        value: 'water',
        options: [
            {
                title: 'Tylko kawa lub herbata',
                value: '1',
            },
            {
                title: 'Mniej niż 2 szklanki',
                value: '2',
            },
            {
                title: '2-6 szklanek',
                value: '3',
            },
            {
                title: '7-10 szklanek',
                value: '4',
            },
            {
                title: 'Ponad 10 szklanek',
                value: '5',
            },
        ]
    },
    {
        title: 'Ile czasu jesteś gotów poświęcić na przygotowanie jednego posiłku?',
        value: 'cooking',
        options: [
            {
                title: 'Mniej niż 30 min',
                value: '1',
            },
            {
                title: '30-60 min',
                value: '2',
            },
            {
                title: 'Ponad 1 godzinę',
                value: '3',
            },
        ]
    },
    {
        title: 'Czy masz jakieś ograniczenia dietetyczne lub alergie?',
        value: 'alergy',
        long: true,
        options: [
            {
                title: 'Nie toleruję laktozy',
                value: '1',
            },
            {
                title: 'Nie jem glutenu',
                value: '2',
            },
            {
                title: 'Jestem wegetarianinem',
                value: '3',
            },
            {
                title: 'Jestem weganinem',
                value: '4',
            },
        ]
    },
    {
        title: 'Zaznacz /%warzywa które chcesz uwzględnić w diecie:',
        value: 'vegetables',
        long: true,
        options: [
            {
                title: 'Brokuły',
                value: '1',
            },
            {
                title: 'Kalafior',
                value: '2',
            },
            {
                title: 'Szparag',
                value: '3',
            },
            {
                title: 'Papryka',
                value: '4',
            },
            {
                title: 'Bakłażan',
                value: '5',
            },
            {
                title: 'Kapusta',
                value: '6',
            },
            {
                title: 'Szpinak',
                value: '7',
            },
            {
                title: 'Cebula',
                value: '8',
            },
        ]
    },
    {
        title: 'Zaznacz /%zboża które chcesz uwzględnić w diecie:',
        value: 'grains',
        long: true,
        filtered: true,
        options: [
            {
                title: 'Ryż',
                value: '1',
            },
            {
                title: 'Komosa ryżowa',
                value: '2',
            },
            {
                title: 'Kuskus',
                value: '3',
                gluten: true
            },
            {
                title: 'Gryka',
                value: '4',
            },
            {
                title: 'Amarant',
                value: '5',
            },
            {
                title: 'Mąka kukurydziana',
                value: '6',
            },
            {
                title: 'Kasza jaglana',
                value: '7',
            },
            {
                title: 'Bulgur',
                value: '8',
                gluten: true
            },
            {
                title: 'Kasza manna',
                value: '9',
            },
        ]
    },
    {
        title: 'Zaznacz /%produkty które chcesz uwzględnić w diecie:',
        value: 'desired',
        long: true,
        filtered: true,
        options: [
            {
                title: 'Awokado',
                value: '1'
            },
            {
                title: 'Fasolka',
                value: '2'
            },
            {
                title: 'Grzyby',
                value: '3'
            },
            {
                title: 'Mleko',
                value: '4',
                lactose: true,
                nonVegan: true
            },
            {
                title: 'Hummus',
                value: '5'
            },
            {
                title: 'Mleko roślinne',
                value: '6'
            },
            {
                title: 'Jajka',
                value: '7',
                nonVegan: true
            },
            {
                title: 'Twarożek',
                value: '8',
                lactose: true,
                nonVegan: true
            },
        ]
    },
    {
        title: 'Zaznacz /%mięso /%i /%ryby które chcesz uwzględnić w diecie:',
        value: 'meat',
        long: true,
        filtered: true,
        options: [
            {
                title: 'Indyk',
                value: '1',
                nonVegetarian: true,
                nonVegan: true
            },
            {
                title: 'Wołowina',
                value: '2',
                nonVegetarian: true,
                nonVegan: true
            },
            {
                title: 'Kurczak',
                value: '3',
                nonVegetarian: true,
                nonVegan: true
            },
            {
                title: 'Wieprzowina',
                value: '4',
                nonVegetarian: true,
                nonVegan: true
            },
            {
                title: 'Ryba',
                value: '5',
                nonVegan: true
            },
            {
                title: 'Owoce morza',
                value: '6',
                nonVegan: true
            },
        ]
    },
    {
        title: 'Jaka jest Twoja /%pożądana waga?',
        value: 'desiredWeight',
        unit: 'kg',
        typeNumber: true,
        min: 30,
        max: 250
    },
    {
        title: 'Jaka jest Twoja /%aktualna waga?',
        value: 'weight',
        unit: 'kg',
        typeNumber: true,
        min: 30,
        max: 250
    },
    {
        title: 'Jaka jest Twoja wysokość?',
        value: 'height',
        unit: 'cm',
        typeNumber: true,
        min: 100,
        max: 250
    },
    {
        title: 'Ile masz lat?',
        value: 'age',
        unit: 'lat',
        typeNumber: true,
        min: 15,
        max: 100
    },
    {
        title: 'Kiedy?',
        value: 'desiredDate',
        typeDate: true
    },
]

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

export { steps, filterIngredients, ingredients }