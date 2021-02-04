// Tues Feb 2, 2021 start with 433. Our Custom Error Class
class AppError extends Error {
    constructor(message, status){
        super();
        this.message = message;
        this.status = status;
    }
}

module.exports = AppError;