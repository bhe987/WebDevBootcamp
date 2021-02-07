// Thursday Feb 4, 2021 441.
module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}