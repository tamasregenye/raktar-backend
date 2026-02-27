<<<<<<< HEAD
const  methodNotAllowed = (keres,valasz)=>{
    valasz.status(405).json({
        "hiba":"A kérés nem engedélyezett!",
=======
const methodNotAllowed = (keres, valasz) => {
    valasz.status(405).json({
        "hiba": "A kérés nem engedélyezett!",
>>>>>>> main
        "magyarazat": `A ${keres.method} nem támogatott a(z) ${keres.originalUrl} url alatt.`
    })
}

<<<<<<< HEAD
module.exports = {methodNotAllowed}
=======
module.exports = { methodNotAllowed }
>>>>>>> main
