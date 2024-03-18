const { connection } = require("../db");

exports.getUser = (req, res) => {
    const userId = req.params.userId;
    connection.query(
        'SELECT Fname, Lname, Collage, Major, Role FROM member WHERE userId = ?',
        [userId],
        function(err, results) {
          res.json(results);
    });
};

exports.addUser = (req, res, next) => {
    connection.query(
        'INSERT INTO `member`(`userId`, `Fname`, `Lname`, `Collage`, `Major`, `StudentCode`, `Role`) VALUES (?,?,?,?,?,?,?)',
        [req.body.userId, req.body.Fname, req.body.Lname, req.body.Collage, req.body.Major, req.body.StudentCode, req.body.Role],
        function(err, results) {
            if (err) {
                res.status(500).json({ error: 'เกิดข้อผิดพลาดในการสร้างผู้ใช้' });
            } else {
                res.status(201).send('ผู้ใช้ถูกสร้างเรียบร้อยแล้ว');
            }
    });
};
