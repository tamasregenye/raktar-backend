function notFoundHandler(keres, valasz) {
    valasz.status(404).json({
        "hiba": "A kért végpont nem található",
        "url": keres.originalUrl
    });
}

module.exports = { notFoundHandler };