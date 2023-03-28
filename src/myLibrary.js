const month = (month) => {
    let ruMonth = ""

    switch (month) {
        case 0:
            ruMonth = "января"
            break
        case 1:
            ruMonth = "февраля"
            break
        case 2:
            ruMonth = "марта"
            break
        case 3:
            ruMonth = "апреля"
            break
        case 4:
            ruMonth = "мая"
            break
        case 5:
            ruMonth = "июня"
            break
        case 6:
            ruMonth = "июля"
            break
        case 7:
            ruMonth = "августа"
            break
        case 8:
            ruMonth = "сентября"
            break
        case 9:
            ruMonth = "октября"
            break
        case 10:
            ruMonth = "ноября"
            break
        case 11:
            ruMonth = "декабря"
            break
        default:
            break
    }

    return ruMonth
}

export default month