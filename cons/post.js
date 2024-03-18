const { connection } = require("../db");

exports.getPost = (req, res) => {
    const userId = req.params.userId;
    connection.query(
        'SELECT * FROM post WHERE userId = ?',
        [userId],
        function(err, results) {
          res.json(results);
    });
};

exports.getPostID = (req, res) => {
  const Post_id = req.params.Post_id;
  connection.query(
      'SELECT * FROM post WHERE Post_id = ?',
      [Post_id],
      function(err, results) {
        res.json(results);
  });
};

exports.getPostEdit = (req, res) => {
  const Post_id = req.params.Post_id;
  connection.query(
      'SELECT * FROM post WHERE Post_id = ?',
      [Post_id],
      function(err, results) {
        res.json(results);
  });
};

exports.getPosts = (req, res) => {
    connection.query(
        'SELECT * FROM `post`',
        function(err, results, fields) {
          res.json(results);
        }
    );
};

exports.getCategory = (req, res) => {
    const category = req.params.category; 
    connection.query(
        'SELECT * FROM `post` WHERE `category` = ?',
        [category],
        function(err, results, fields) {
          res.json(results);
        }
    );
  };

exports.getformuserIdCat = (req, res) => {
    const category = req.params.category;
    const userId = req.params.userId;
    connection.query(
        'SELECT * FROM `post` WHERE `category` = ? AND `userId` = ?',
        [category, userId],
        function(err, results, fields) {
            res.json(results);
        }
    );
};  

exports.addPost = (req, res, next) => {
  connection.query(
      'INSERT INTO `post`(`userId`, `title`, `category`, `location`, `detail`, `images`, `date`, `time`) VALUES (?,?,?,?,?,?,?,?)',
      [req.body.userId, req.body.Title, req.body.Category, req.body.Location, req.body.Detail, req.body.Images, req.body.Date, req.body.Time],
      function(err, results) {
        if (err) {
          res.json(err);
        } else {
          res.send('Post has Create!!');
        }
      });
};

exports.addPostTest = (req, res, next) => {
  const currentDate = new Date();
  connection.query(
      'INSERT INTO `ptest`(`title`, `userId`, `date`, `images`, `location`, `category`) VALUES (?,?,?,?,?,?)',
      [req.body.title, req.body.userId, currentDate, req.body.images, req.body.location, req.body.category],
      function(err, results) {
        if (err) {
          res.json(err);
        } else {
          res.send('Post has Create!!');
        }
      });
};

exports.UpdatePost = (req, res, next) => {
  connection.query(
      'UPDATE `post` SET `title`=?, `category`=?, `location`=?, `detail`=?, `images`=? WHERE Post_id  = ?',
      [req.body.title, req.body.category, req.body.location, req.body.detail, req.body.images, req.params.Post_id ],
      function(err, results) {
        if (err) {
          res.json(err);
        } else {
          res.send('Post has been updated successfully!');
        }
    });
};

exports.deletePost = (req, res) => {
  connection.query(
      'DELETE FROM `post` WHERE Post_id = ?',
      [req.params.Post_id],
      function(err, results) {
        if (err) {
          res.status(500).json({ error: err.message }); // แก้ไขตรงนี้
          return;
        }
        res.status(200).json(results); // แก้ไขตรงนี้
      }
  );
};
