class HttpError extends Error{
    constructor(message,status){
        super(message)
        this.status= status;
    }
}
class NotFound extends HttpError{
    constructor(message){
        super(message,404)
    }
}
class Unauthorized extends HttpError{
    constructor(message){
        super(message,401)
    }
}
class Forbidden extends HttpError{
    constructor(message){
        super(message,403)
    }
}
class Conflict extends HttpError{
    constructor(message){
        super(message,409)
    }
}
class InternalServerError extends HttpError{
    constructor(message){
        super(message,500)
    }
}
class BadRequest extends HttpError{
    constructor(message){
        super(message,400)
    }
}


async function errorHandler(err,req,res,next){
    if(err instanceof HttpError){
        return res.status(err.status).send(err.message)
    }
    console.error(err)
    return res.status(500).send("internal error")

}

module.exports = {NotFound,errorHandler,Unauthorized,Forbidden,Conflict,InternalServerError,BadRequest}