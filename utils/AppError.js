class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode || 500;
        this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error'
        // whaterver error we raise should have some unique prop.. so so we can identify it , so
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor)
        // console.log("camed");
    }
}

module.exports = AppError;













