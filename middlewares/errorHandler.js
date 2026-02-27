function notFoundHandler(keres, valasz){
    valasz.status(404).json(
        {
            "hiba": "A kért végpont nem található",
            "url": keres.originalUrl
        }
    );
}

function serverErrorHandler(hiba, keres, valasz, next){
    valasz.status(500).json({
        "valasz":"Hiba a szerveren.",
        // konkrét hiba üzenet, fejlesztés során használjuk, a végleges alkalmazásba ne kerüljön bele
        "magyarazat": hiba.message
    })
}

module.exports = { notFoundHandler, serverErrorHandler };
