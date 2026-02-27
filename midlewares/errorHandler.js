/**
 * 
 * @param {Request} keres 
 * @param {*} valasz 
 */
function notFoundHandler(keres, valasz){
    valasz.status(404).json(
        {
            "hiba": "A kért érték nem található",
            "url": keres.originalUrl
        }
    );
}

module.exports = { notFoundHandler };