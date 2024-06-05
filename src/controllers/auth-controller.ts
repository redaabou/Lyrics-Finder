// importe the user model from the database

const singUpPost = async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  try {
    // creat a new user

    // return just for the test
    res.json({ email, password, firstname, lastname });
  } catch (error) {
    res.status(404).json({ error });
  }
};
const logInPost = async (req, res) => {
  const { email, password } = req.body;
  try {
    // find the user that has that unique email and much the passowrd and than return it

    // return just for the test
    res.json({ email, password });
  } catch (error) {
    res.status(404).json({ error });
  }
};

export { singUpPost, logInPost };
