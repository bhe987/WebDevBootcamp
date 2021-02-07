// Thursday Feb 4, 2021 start with 441. Defining ExpressError Class
class ExpressError extends Error {
    constructor(message, statusCode){
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;