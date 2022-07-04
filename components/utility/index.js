
export function getRandomElem(arr = []) {
    return arr[getRandom(arr.length - 1)]
}



export function getRandom(limit) {
    return Math.ceil(Math.random() * limit)
}
