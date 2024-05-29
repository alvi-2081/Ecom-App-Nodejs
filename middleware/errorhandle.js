const handleErrors = (err, req, res, next) => {
    console.error(err.stack);
}  