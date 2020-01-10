handleProfileGet = db => (req, res) => {
  const { id } = req.params;
  //search through databse to find matching user id
  db("users")
    .where({ id: id })
    .select("*")
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        //Didnt find user within database
        res.status(404).json("User not found");
      }
    })
    .catch(err => res.status(400).json("error getting user"));
};

module.exports = {
  handleProfileGet: handleProfileGet
};
