const createParser = text => {
    let index = 0
    const isDigit = ch => {
        if (ch < '0') return false
        if (ch > '9') return false
        return true
    }
    const consumeNonDigits = () => {
        while (index < text.length && !isDigit(text.charAt(index))) {
            index++
        }
    }
    const digitToNumber = digit => {
        return digit - '0'
    }
    const consumeDigits = max => {
        let accumulator = 0
        let remain = max
        while (index < text.length && isDigit(text.charAt(index)) && remain > 0) {
            const digit = text.charAt(index)
            index++
            remain--
            accumulator = accumulator * 10 + digitToNumber(digit)
        }
        return accumulator
    }
    const digits = howMany => {
        consumeNonDigits()
        return consumeDigits(howMany)
    }
    return {digits}
}

const add2000ifLessThan1000 = value => {
    if (value < 1000) return value + 2000
    else return value
}

const leadingZeroes = (number, length) => {
    let numberString = number.toString()
    let padding = '0'.repeat(length - numberString.length)
    return padding + numberString
}

const minMax = (min, max, actual) => {
    return Math.max(min, Math.min(max, actual))
}

const createValidator = text => {
    const parser = createParser(text)
    const year = minMax(1900, 9999, add2000ifLessThan1000(parser.digits(4)))
    const month = minMax(1, 12, parser.digits(2))
    const day = minMax(1, 31, parser.digits(2))
    const hour = minMax(0, 23, parser.digits(2))
    const minute = minMax(0, 59, parser.digits(2))
    const second = minMax(0, 59, parser.digits(2))
    const date = new Date(year, month - 1, day, hour, minute, second)
    return dateToParts(date)
}

const dateToParts = date => {
    const year = date.getFullYear()
    const month = date.getMonth()+1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const wellFormed = `${leadingZeroes(year, 4)}-${leadingZeroes(month, 2)}-${leadingZeroes(day, 2)} ${leadingZeroes(hour, 2)}:${leadingZeroes(minute, 2)}:${leadingZeroes(second, 2)}`
    const text = wellFormed
    const localDate = date.toString()
    const utcDate = date.toUTCString()
    const isoDate = date.toISOString()
    return {
        text, year, month, day, hour, minute, second, date, wellFormed, localDate, utcDate, isoDate
    }
}

const userDateToWellFormed = value => {
    if(value == null) return null
    if(value.search(/\d/) === -1) return null
    return createValidator(value).wellFormed
}

const userDateToIso= value => {
    if(value == null) return null
    if(value.search(/\d/) === -1) return null
    return createValidator(value).isoDate
}

const isoDateToWellFormed = value => {
    if(value == null) return null
    return dateToParts(new Date(value)).wellFormed
}

const isoDateToLocal = value => {
    if(value == null) return null
    return dateToParts(new Date(value)).localDate
}

const userDateToUtc = value => {
    if(value == null) return null
    if(value.search(/\d/) === -1) return null
    return createValidator(value).utcDate
}

const userDateToLocal = value => {
    if(value == null) return null
    if(value.search(/\d/) === -1) return null
    return createValidator(value).localDate
}

const dateFormat = "YYYY-MM-DD HH:MM:SS"

export {
    createValidator,
    dateFormat,
    userDateToIso,
    userDateToWellFormed,
    isoDateToWellFormed,
    userDateToUtc,
    userDateToLocal,
    isoDateToLocal
}
