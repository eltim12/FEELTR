module.exports = (score) => {
    let letter = ''
    if (score > 85) {
        letter = "A"
    } else if (score > 70) {
        letter = "B"
    } else if (score > 55) {
        letter = "C"
    } else if (score <= 55) {
        letter = "E"
    } else {
        letter = "empty"
    }
    return letter
}