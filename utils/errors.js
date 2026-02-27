const methodNotAllowed = (keres, valasz) => {
    valasz.status(405).json({
        "hiba": "A kérés nem engedélyezett!",
        "magyarazat": `A ${keres.method} nem támogatott a(z) ${keres.originalUrl} url alatt.`
    })
<<<<<<< HEAD

=======
>>>>>>> origin/main
}

module.exports = { methodNotAllowed }