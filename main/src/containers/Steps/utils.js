const steps = [
    {},
    {
        title: 'Wybierz płeć',
        options: [
            {
                title: 'Mężczyzna'
            },
            {
                title: 'Kobieta'
            },
        ]
    },
    {
        title: 'Jaki jest Twój typ sylwetki?',
        subTitle: 'Każdy typ ciała ma określoną strukturę metaboliczną',
        options: [
            {
                title: 'Ektomorficzny',
                subTitle: 'Szczupły i długi, szybki metabolizm'
            },
            {
                title: 'Mezomorficzny',
                subTitle: 'Umięśniony i dobrze zbudowany, średni metabolizm'
            },
            {
                title: 'Endomorficzny',
                subTitle: 'Okrągła, szeroka sylwetka, powolny metabolizm'
            },
        ]
    },
    {
        title: 'Opisz swój typowy dzień',
        subTitle: 'Mężczyźni którzy chcą schudnąć, wymagają bardziej spersonalizowanego podejścia w zależności od aktualnego stylu życia.',
        options: [
            {
                title: 'Przeważnie w domu'
            },
            {
                title: 'W biurze'
            },
            {
                title: 'Chodzę na długie spacery'
            },
            {
                title: 'Praca fizyczna'
            },
        ]
    },
    {
        title: 'Zmiana zachowania a restrykcyjna dieta',
        subTitle: 'Pracujemy poprzez tworzenie nawyków, co zapewnia długotrwałe rezultaty'
    },
    {
        title: 'Czy odczuwasz dolegliwości żołądkowe w ciągu dnia?',
        options: [
            {
                title: 'Tak'
            },
            {
                title: 'Nie'
            },
        ]
    },
    {
        title: 'Ile czasu minęło, odkąd miałeś idealną wagę?',
        options: [
            {
                title: 'Mniej niż 1 rok'
            },
            {
                title: '1-3 lata'
            },
            {
                title: 'Ponad 3 lata'
            },
            {
                title: 'Nigdy nie byłem w mojej idealnej wadze'
            },
        ]
    },
    {
        title: 'Wybierz wszystko, co dotyczy Ciebie:',
        options: [
            {
                checkbox: true,
                title: 'Jem późno w nocy'
            },
            {
                checkbox: true,
                title: 'Nie śpię wystarczająco'
            },
            {
                checkbox: true,
                title: 'Nie mogę zrezygnować z jedzenia słodyczy'
            },
            {
                checkbox: true,
                title: 'Uwielbiam napoje gazowane'
            },
            {
                checkbox: true,
                title: 'Spożywam dużo soli'
            },
        ]
    },
    {
        title: 'Trenujesz?',
        subTitle: 'Ważne jest, aby wziąć pod uwagę poziom aktywności dla mężczyzny, który chce schudnąć i pracuje w biurze.',
        options: [
            {
                title: 'Prawie brak aktywności fizycznej'
            },
            {
                title: 'Tylko spacery'
            },
            {
                title: '1-2 razy w tygodniu'
            },
            {
                title: '3-5 razy w tygodniu'
            },
            {
                title: '5-7 razy w tygodniu'
            },
        ]
    },
    {
        title: 'Jaka jest twoja energia z dnia na dzień?',
        options: [
            {
                title: 'Równomierna'
            },
            {
                title: 'Przejadam pod czas posiłku'
            },
            {
                title: 'Uczuwam zmęczenia po zjedzeniu posiłku'
            },
        ]
    },
    {
        title: 'Ile godzin śpisz?',
        options: [
            {
                title: 'Mniej niż 5 godzin'
            },
            {
                title: '5-6 godzin'
            },
            {
                title: '7-8 godzin'
            },
            {
                title: 'Ponad 8 godzin'
            },
        ]
    },
    {
        title: 'Ile wody wypijasz codziennie?',
        options: [
            {
                title: 'Tylko kawa lub herbata'
            },
            {
                title: 'Mniej niż 2 szklanki'
            },
            {
                title: '2-6 szklanek'
            },
            {
                title: '7-10 szklanek'
            },
            {
                title: 'Ponad 10 szklanek'
            },
        ]
    },
    {
        title: 'Ile czasu jesteś gotów poświęcić na przygotowanie jednego posiłku?',
        options: [
            {
                title: 'Mniej niż 30 min'
            },
            {
                title: '30-60 min'
            },
            {
                title: 'Ponad 1 godzinę'
            },
        ]
    },
    {
        title: 'Czy masz jakieś ograniczenia dietetyczne lub alergie?',
        options: [
            {
                checkbox: true,
                title: 'Nie toleruję laktozy'
            },
            {
                checkbox: true,
                title: 'Nie jem glutenu'
            },
            {
                checkbox: true,
                title: 'Jestem wegetarianinem'
            },
            {
                checkbox: true,
                title: 'Jestem weganinem'
            },
        ]
    },
    {
        title: 'Zaznacz warzywa, które chcesz uwzględnić w diecie:',
        options: [
            {
                checkbox: true,
                title: 'Brokuły'
            },
            {
                checkbox: true,
                title: 'Kalafior'
            },
            {
                checkbox: true,
                title: 'Szparag'
            },
            {
                checkbox: true,
                title: 'Papryka'
            },
            {
                checkbox: true,
                title: 'Bakłażan'
            },
            {
                checkbox: true,
                title: 'Kapusta'
            },
            {
                checkbox: true,
                title: 'Szpinak'
            },
            {
                checkbox: true,
                title: 'Cebula'
            },
        ]
    },
    {
        title: 'Zaznacz zboża, które chcesz uwzględnić w diecie:',
        options: [
            {
                checkbox: true,
                title: 'Ryż'
            },
            {
                checkbox: true,
                title: 'Komosa ryżowa'
            },
            {
                checkbox: true,
                title: 'Kuskus'
            },
            {
                checkbox: true,
                title: 'Gryka'
            },
            {
                checkbox: true,
                title: 'Amarant'
            },
            {
                checkbox: true,
                title: 'Mąka kukurydziana'
            },
            {
                checkbox: true,
                title: 'Kasza jaglana'
            },
            {
                checkbox: true,
                title: 'Bulgur'
            },
            {
                checkbox: true,
                title: 'Kasza manna'
            },
        ]
    },
    {
        title: 'Zaznacz produkty, które chcesz uwzględnić w diecie:',
        options: [
            {
                checkbox: true,
                title: 'Awokado'
            },
            {
                checkbox: true,
                title: 'Fasolka'
            },
            {
                checkbox: true,
                title: 'Grzyby'
            },
            {
                checkbox: true,
                title: 'Mleko'
            },
            {
                checkbox: true,
                title: 'Hummus'
            },
            {
                checkbox: true,
                title: 'Mleko roślinne'
            },
            {
                checkbox: true,
                title: 'Jajka'
            },
            {
                checkbox: true,
                title: 'Twarożek'
            },
        ]
    },
    {
        title: 'Zaznacz mięso i ryby, które chcesz uwzględnić w diecie:',
        options: [
            {
                checkbox: true,
                title: 'Indyk'
            },
            {
                checkbox: true,
                title: 'Ryba'
            },
            {
                checkbox: true,
                title: 'Owoce morza'
            },
            {
                checkbox: true,
                title: 'Kurczak'
            },
            {
                checkbox: true,
                title: 'Wieprzowina'
            },
            {
                checkbox: true,
                title: 'Wołowina'
            },
        ]
    },
    {
        title: 'Jaka jest Twoja pożądana waga?',
    },
    {
        title: 'Sprawdźmy wymiary twojego ciała',
    },
    {
        title: '',
    }
]

export { steps }