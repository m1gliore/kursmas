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

export {month, genre}