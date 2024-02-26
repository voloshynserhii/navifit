const steps = [
    {},
    {
        title: 'Wybierz płeć',
        value: 'sex',
        options: [
            {
                title: 'Mężczyzna',
                src: '/man-icon.png',
                value: 'male'
            },
            {
                title: 'Kobieta',
                src: '/woman-icon.png',
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
                title: 'Ektomorficzny',
                subTitle: 'Szczupły i długi, szybki metabolizm',
                src: '/ektomorph.png',
                value: '1'
            },
            {
                title: 'Mezomorficzny',
                subTitle: 'Umięśniony i dobrze zbudowany, średni metabolizm',
                src: '/mezomorph.png',
                value: '2'
            },
            {
                title: 'Endomorficzny',
                subTitle: 'Okrągła, szeroka sylwetka, powolny metabolizm',
                src: '/endomorph.png',
                value: '3'
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
                src: '/house.png',
                value: '1'
            },
            {
                title: 'W biurze',
                src: '/office.png',
                value: '2'
            },
            {
                title: 'Chodzę na długie spacery',
                src: '/walk.png',
                value: '3'
            },
            {
                title: 'Praca fizyczna',
                src: '/work.png',
                value: '4'
            },
        ]
    },
    {
        title: 'Zmiana zachowania a restrykcyjna dieta',
        subTitle: 'Pracujemy poprzez tworzenie nawyków, co zapewnia długotrwałe rezultaty',
        value: 'diet',
    },
    {
        title: 'Czy odczuwasz dolegliwości żołądkowe w ciągu dnia?',
        value: 'hunger',
        options: [
            {
                title: 'Tak',
                src: '/yes.png',
                value: '1'
            },
            {
                title: 'Nie',
                src: '/no.png',
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
                title: 'Nigdy nie byłem w mojej idealnej wadze',
                value: '4',
            },
        ]
    },
    {
        title: 'Wybierz wszystko, co dotyczy Ciebie:',
        value: 'behavior',
        options: [
            {
                checkbox: true,
                title: 'Jem późno w nocy',
                value: '1'
            },
            {
                checkbox: true,
                title: 'Nie śpię wystarczająco',
                value: '2'
            },
            {
                checkbox: true,
                title: 'Nie mogę zrezygnować z jedzenia słodyczy',
                value: '3'
            },
            {
                checkbox: true,
                title: 'Uwielbiam napoje gazowane',
                value: '4'
            },
            {
                checkbox: true,
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
        options: [
            {
                checkbox: true,
                title: 'Nie toleruję laktozy',
                value: '1',
            },
            {
                checkbox: true,
                title: 'Nie jem glutenu',
                value: '2',
            },
            {
                checkbox: true,
                title: 'Jestem wegetarianinem',
                value: '3',
            },
            {
                checkbox: true,
                title: 'Jestem weganinem',
                value: '4',
            },
        ]
    },
    {
        title: 'Zaznacz warzywa, które chcesz uwzględnić w diecie:',
        value: 'vegetables',
        options: [
            {
                checkbox: true,
                title: 'Brokuły',
                value: '1',
            },
            {
                checkbox: true,
                title: 'Kalafior',
                value: '2',
            },
            {
                checkbox: true,
                title: 'Szparag',
                value: '3',
            },
            {
                checkbox: true,
                title: 'Papryka',
                value: '4',
            },
            {
                checkbox: true,
                title: 'Bakłażan',
                value: '5',
            },
            {
                checkbox: true,
                title: 'Kapusta',
                value: '6',
            },
            {
                checkbox: true,
                title: 'Szpinak',
                value: '7',
            },
            {
                checkbox: true,
                title: 'Cebula',
                value: '8',
            },
        ]
    },
    {
        title: 'Zaznacz zboża, które chcesz uwzględnić w diecie:',
        value: 'grains',
        options: [
            {
                checkbox: true,
                title: 'Ryż',
                value: '1',
            },
            {
                checkbox: true,
                title: 'Komosa ryżowa',
                value: '2',
            },
            {
                checkbox: true,
                title: 'Kuskus',
                value: '3',
            },
            {
                checkbox: true,
                title: 'Gryka',
                value: '4',
            },
            {
                checkbox: true,
                title: 'Amarant',
                value: '5',
            },
            {
                checkbox: true,
                title: 'Mąka kukurydziana',
                value: '6',
            },
            {
                checkbox: true,
                title: 'Kasza jaglana',
                value: '7',
            },
            {
                checkbox: true,
                title: 'Bulgur',
                value: '8',
            },
            {
                checkbox: true,
                title: 'Kasza manna',
                value: '9',
            },
        ]
    },
    {
        title: 'Zaznacz produkty, które chcesz uwzględnić w diecie:',
        value: 'desired',
        options: [
            {
                checkbox: true,
                title: 'Awokado',
                value: '1'
            },
            {
                checkbox: true,
                title: 'Fasolka',
                value: '2'
            },
            {
                checkbox: true,
                title: 'Grzyby',
                value: '3'
            },
            {
                checkbox: true,
                title: 'Mleko',
                value: '4'
            },
            {
                checkbox: true,
                title: 'Hummus',
                value: '5'
            },
            {
                checkbox: true,
                title: 'Mleko roślinne',
                value: '6'
            },
            {
                checkbox: true,
                title: 'Jajka',
                value: '7'
            },
            {
                checkbox: true,
                title: 'Twarożek',
                value: '8'
            },
        ]
    },
    {
        title: 'Zaznacz mięso i ryby, które chcesz uwzględnić w diecie:',
        value: 'meat',
        options: [
            {
                checkbox: true,
                title: 'Indyk',
                value: '1'
            },
            {
                checkbox: true,
                title: 'Ryba',
                value: '2'
            },
            {
                checkbox: true,
                title: 'Owoce morza',
                value: '3'
            },
            {
                checkbox: true,
                title: 'Kurczak',
                value: '4'
            },
            {
                checkbox: true,
                title: 'Wieprzowina',
                value: '5'
            },
            {
                checkbox: true,
                title: 'Wołowina',
                value: '6'
            },
        ]
    },
    {
        title: 'Jaka jest Twoja pożądana waga?',
        value: 'desiredWeight',
        min: 30,
        max: 200
    },
    {
        title: 'Sprawdźmy wymiary twojego ciała',
        value: 'dimensions',
        inputTypes: [
            {
                title: 'Wiek',
                value: 'age',
                min: 10,
                max: 100
            },
            {
                title: 'Wysokość',
                value: 'height',
                min: 100,
                max: 230
            },
            {
                title: 'Aktualna waga',
                value: 'weight',
                min: 30,
                max: 300
            },
        ]
    },
    {
        title: 'Kiedy?',
        value: 'desiredDate',
    },
]

export { steps }