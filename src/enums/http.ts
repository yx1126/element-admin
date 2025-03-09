export enum ResultStatus {
    SUCCESS = 200,
    TOKEN_EXPIRATION = 424,
    USER_ERROR = 425,
    UNKNOW_ERROR = 426,
}

export enum Methods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
}

export enum ContentType {
    TEXT = "text/plain;charset=UTF-8",
    JSON = "application/json;charset=UTF-8",
    FORM_DATA = "multipart/form-data;charset=UTF-8",
    FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
}