function getOffset() {
    var now = new Date();
    return now.getTimezoneOffset()
}

/**
 * mongodb save time to UTC
 * https://docs.mongodb.com/v3.2/tutorial/model-time-data/
 * @param {*} time 
 */
function returnCorrectTime(time) {
    return new Date( time - getOffset() * 60000 );
}

module.exports = {
    returnCorrectTime
}