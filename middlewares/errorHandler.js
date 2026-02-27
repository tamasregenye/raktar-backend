<<<<<<< HEAD
/**
 * 
 * @param {Request} keres 
 * @param {*} valasz 
 */


=======
>>>>>>> origin/main
function notFoundHandler(keres, valasz){
    valasz.status(404).json(
        {
            "hiba": "A kért végpont nem található",
            "url": keres.originalUrl
        }
    );
}

<<<<<<< HEAD


=======
>>>>>>> origin/main
module.exports = { notFoundHandler };