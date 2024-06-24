const errorMiddleware = (err,req,res,next) =>{
    const statusCode =err.statusCode || 500;
    const messsage = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success:true,
        messsage,
        statusCode
    });
}

export {errorMiddleware}
