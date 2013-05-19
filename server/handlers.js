module.exports = {
    index : function (req, res) {
        console.log('hello');
        res.send('hello');
    },

    find : function (req, res) {
        req.session.status = 'find';
        res.end();
    }



}
