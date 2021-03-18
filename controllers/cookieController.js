module.exports.hello = (req, res) => {
  console.log(req.user);
  res.json("hello");
};
