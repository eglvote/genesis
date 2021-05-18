const pad = (int, digits) =>
    int.length >= digits
        ? int
        : new Array(digits - int.length + 1).join('0') + int

export const zeroPad = (str, digits) => {
    str = String(str)
    const nums = str.match(/[0-9]+/g)

    nums.forEach((num) => {
        str = str.replace(num, pad(num, digits))
    })

    return str
}

export const truncateEthAddress = (address) =>
    address.slice(0, 6) +
    '...' +
    address.slice(address.length - 4, address.length)
