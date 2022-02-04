const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '2a6935ec1f2b43a7b66ff08400d8a37b',
 });

const handleImageDetect = (req, res) => {
  const input = req.body.input;

  app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.status(400).json("cannot detect image");
    })
}

const handleImageEntry = (db) => (req, res) => {
  const { id } = req.body;
  
  db
    .select('entries')
    .from('users')
    .where({
      id
    })
    .increment('entries', 1)
    .returning('entries')
    .then(data => {
      res.json(data[0].entries)
    })
    .catch(err => {
      res.status(400).json("cannot add entry");
    });
}

module.exports = {
  handleImageEntry,
  handleImageDetect,
}
