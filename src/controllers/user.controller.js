import Users from "../models/users.model.js";

async function getAllUsers(req, res, next) {
  try {
    const users = await Users.find(
      {},
      "_id firstName lastName country email"
    ).sort("asc");
    res.json(users);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
async function getById(req, res, next) {
  try {
    const user = await Users.findOne(
      { _id: req.params.id },
      "_id firstName lastName country email"
    );
    res.json(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
async function deleteUserById(req, res, next) {
  try {
    const user = await Users.deleteOne({ _id: req.params.id });
    res.json("User deleted.");
  } catch (err) {
    console.log(err);
    next(err);
  }
}
async function deleteUsers(req, res, next) {
  try {
    const users = await Users.find();
    await Users.deleteMany({ users });
    res.json("Users deleted.");
  } catch (err) {
    console.log(err);
    next(err);
  }
}
const userController = {
  getAllUsers,
  getById,
  deleteUserById,
  deleteUsers,
};
export default userController;
