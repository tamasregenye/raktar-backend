function notFoundHandler(keres, valasz) {
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
        // a végleges alkalmazásban ne szerpeljen a konkrét hibaüzenet biztonsági okokból
        "magyarazat": hiba.message
    })
}

module.exports = { notFoundHandler, serverErrorHandler };