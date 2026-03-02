const methodNotAllowed = (keres, valasz) => {
    valasz.status(405).json({
        "hiba": "A kérés nem engedélyezett!",
        "magyarazat": `A ${keres.method} nem támogatott ezen a(z) ${keres.originalURL} url alatt.`
    })
}

module.exports = {methodNotAllowed}