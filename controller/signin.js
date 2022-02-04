const handleSignin = (db, bcrypt) => (req, res) => {
  const { username, password } = req.body;

  db
    .select('*')
    .from('login')
    .where({
      username
    })
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);

      if (isValid) {
        db
          .select('*')
          .from('users')
          .where({
            username: data[0].username
          })
          .then(data => {
            res.json(data[0])
          });
      } else {
        res.status(404).json("cannot find user");
      }
    })
    .catch(err => {
      res.status(400).json("cannot login. try again later");
    });
}

module.exports = {
  handleSignin,
}
