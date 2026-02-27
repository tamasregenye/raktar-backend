function notFoundHandler(keres, valasz){
    valasz.status(404).json(
        {
            "hiba": "A kért végpont nem található",
            "url": keres.originalUrl
        }
    );
}

function serverErrorHandler(hiba, keres, valasz, next) {
    valasz.status(500).json({
        "valasz": "Hiba a szerveren.",
        //konkreét hiba üzenete fejlesztés miatt, a tényleges alkalmazásban nem használjuk
        "magyarázat": hiba.message
    })
}

module.exports = { notFoundHandler, serverErrorHandler };