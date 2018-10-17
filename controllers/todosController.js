
exports.getTodos = function (_, res) {
    res.header('Content-Type', 'application/vnd.api+json');
    res.send("getTodos");
}
