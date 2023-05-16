const { todo } = require("../models/index");

class ControllerTodo {
  static async getAll(req, res, next) {
    try {
      let id = req.query.activity_group_id;
      if (!id) {
        throw { name: "NullID" };
      }
      let todos = await todo.findAll({
        where: {
          activity_group_id: id,
        },
      });
      res.status(200).json({
        status: "Success",
        message: "Success",
        data: todos,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      let id = req.params.id;
      let data = await todo.findByPk(id);
      if (!data) {
        throw { name: "TodoNotFound", id: id };
      }
      res.status(200).json({
        status: "Success",
        message: "Success",
        data: data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ControllerTodo;
