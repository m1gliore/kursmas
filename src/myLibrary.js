import {DateTime} from "luxon";

const month = (month) => {
    let ruMonth = ""

    switch (month) {
        case 1:
            ruMonth = "января"
            break
        case 2:
            ruMonth = "февраля"
            break
        case 3:
            ruMonth = "марта"
            break
        case 4:
            ruMonth = "апреля"
            break
        case 5:
            ruMonth = "мая"
            break
        case 6:
            ruMonth = "июня"
            break
        case 7:
            ruMonth = "июля"
            break
        case 8:
            ruMonth = "августа"
            break
        case 9:
            ruMonth = "сентября"
            break
        case 10:
            ruMonth = "октября"
            break
        case 11:
            ruMonth = "ноября"
            break
        case 12:
            ruMonth = "декабря"
            break
        default:
            break
    }

    return ruMonth
}

const genre = (genre) => {
    let ruGenre = ""

    switch (genre) {
        case "HORROR":
            ruGenre = "Хоррор"
            break
        case "DETECTIVE":
            ruGenre = "Детектив"
            break
        case "COMEDY":
            ruGenre = "Комедия"
            break
        case "ADVENTURES":
            ruGenre = "Приключения"
            break
        case "CARTOON":
            ruGenre = "Мультфильм"
            break
        case "THRILLER":
            ruGenre = "Триллер"
            break
        default:
            break
    }

    return ruGenre
}

const latinGenre = (genre) => {
    let enGenre = ""

    switch (genre) {
        case "Хоррор":
            enGenre = "HORROR"
            break
        case "Детектив":
            enGenre = "DETECTIVE"
            break
        case "Комедия":
            enGenre = "COMEDY"
            break
        case "Приключения":
            enGenre = "ADVENTURES"
            break
        case "Мультфильм":
            enGenre = "CARTOON"
            break
        case "Триллер":
            enGenre = "THRILLER"
            break
        default:
            break
    }

    return enGenre
}

const fileHandler = (file, setImageUrl) => {
    if (file) {
        setImageUrl(URL.createObjectURL(file))
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onerror = (error) => {
            alert(`Error: ${error}`)
        }
    }
}

function translitRuEn(str) {
    const magic = function (lit) {
        const arrayLits = [["а", "a"], ["б", "b"], ["в", "v"], ["г", "g"], ["д", "d"], ["е", "e"], ["ё", "yo"], ["ж", "zh"],
            ["з", "z"], ["и", "i"], ["й", "j"], ["к", "k"], ["л", "l"], ["м", "m"], ["н", "n"], ["о", "o"], ["п", "p"], ["р", "r"],
            ["с", "s"], ["т", "t"], ["у", "u"], ["ф", "f"], ["х", "h"], ["ц", "c"], ["ч", "ch"], ["ш", "w"], ["щ", "shh"], ["ъ", "''"],
            ["ы", "y"], ["ь", "'"], ["э", "e"], ["ю", "yu"], ["я", "ya"], ["А", "A"], ["Б", "B"], ["В", "V"], ["Г", "G"], ["Д", "D"],
            ["Е", "E"], ["Ё", "YO"], ["Ж", "ZH"], ["З", "Z"], ["И", "I"], ["Й", "J"], ["К", "K"], ["Л", "L"], ["М", "M"], ["Н", "N"],
            ["О", "O"], ["П", "P"], ["Р", "R"], ["С", "S"], ["Т", "T"], ["У", "U"], ["Ф", "F"], ["Х", "H"], ["Ц", "C"], ["Ч", "CH"],
            ["Ш", "W"], ["Щ", "SHH"], ["Ъ", ""], ["Ы", "Y"], ["Ь", ""], ["Э", "E"], ["Ю", "YU"], ["Я", "YA"], ["0", "0"], ["1", "1"],
            ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["a", "a"], ["b", "b"],
            ["c", "c"], ["d", "d"], ["e", "e"], ["f", "f"], ["g", "g"], ["h", "h"], ["i", "i"], ["j", "j"], ["k", "k"], ["l", "l"],
            ["m", "m"], ["n", "n"], ["o", "o"], ["p", "p"], ["q", "q"], ["r", "r"], ["s", "s"], ["t", "t"], ["u", "u"], ["v", "v"],
            ["w", "w"], ["x", "x"], ["y", "y"], ["z", "z"], ["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"],
            ["G", "G"], ["H", "H"], ["I", "I"], ["J", "J"], ["K", "K"], ["L", "L"], ["M", "M"], ["N", "N"], ["O", "O"], ["P", "P"],
            ["Q", "Q"], ["R", "R"], ["S", "S"], ["T", "T"], ["U", "U"], ["V", "V"], ["W", "W"], ["X", "X"], ["Y", "Y"], ["Z", "Z"]]
        const efim360ru = arrayLits.map(i => {
            if (i[0] === lit) {
                return i[1]
            } else {
                return undefined
            }
        }).filter(i => i !== undefined)
        if (efim360ru.length > 0) {
            return efim360ru[0]
        } else {
            return "-"
        }
    }
    return Array.from(str).map(i => magic(i)).join("")
}

const seancesDates = [DateTime.now().toISO().split("T")[0],
    DateTime.now().plus({days: 1}).toISO().split("T")[0],
    DateTime.now().plus({days: 2}).toISO().split("T")[0],
    DateTime.now().plus({days: 3}).toISO().split("T")[0],
    DateTime.now().plus({days: 4}).toISO().split("T")[0],
    DateTime.now().plus({days: 5}).toISO().split("T")[0],
    DateTime.now().plus({days: 6}).toISO().split("T")[0]]

export {month, genre, fileHandler, translitRuEn, latinGenre, seancesDates}