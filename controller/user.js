const handleGetUser = (db) => (req, res) => {
  const { id } = req.params;

  db
    .select('*')
    .from('users')
    .where({
      id
    })
    .then(data => {
      if (data.length){
        res.json(data[0])
      } else {
        throw new Error
      }
    })
    .catch(err => {
      res.status(400).json("cannot find user");
    });
}

module.exports = {
  handleGetUser,
}
