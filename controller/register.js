const handleRegister = (db, bcrypt) => (req, res) => {
  const { name, email, username, password } = req.body;
  const saltRounds = 10;

  db
    .transaction(trx => {
      trx
        .insert({
          username,
          hash: bcrypt.hashSync(password, saltRounds)
        })
        .into('login')
        .returning('username')
        .then(data => {
          trx
            .insert({
              name,
              email,
              username: data[0].username,
              joined: new Date()
            })
            .into('users')
            .returning('*')
            .then(data => {
              res.json(data[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err =>{
        res.status(400).json("cannot create user");
    });
}

module.exports = {
  handleRegister,
}
