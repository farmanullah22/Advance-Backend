const asyncHandler = (requestHander) => {
    (req, res, next) => {
        Promise.resolve(requestHander(req, res, next)).catch((error) => next(error));
    }
}



export { asyncHandler };

    // Now exact this is the same as above function but separated from it for better understanding

//  const asyncHandler = (fn) => async (req, res, next) => {
//    try {
//      await fn(req, res, next);
//    } 
//    catch (error) {
//     res.status(error?.status || 500).json({
//         success: false,
//         message: error?.message || "Internal Server Error",
//         error: error || error?.stack
//     });
//    }
//  };

//  export default asyncHandler;