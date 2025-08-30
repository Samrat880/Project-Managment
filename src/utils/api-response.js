class ApiResponse {
    constructor(statusCode, data, message = "User registered successfully and verification email has been sent on your email") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export {ApiResponse};