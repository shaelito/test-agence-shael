exports.con = {
    index: function(req, res) {
        //res.send('kkkkk')
        res.send(test.render('index', {}));
    }
}