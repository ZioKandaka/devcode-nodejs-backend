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

  static async post(req, res, next) {
    try {
      let { title, activity_group_id, is_active } = req.body;
      let newTodo = await todo.create({
        title,
        activity_group_id,
        is_active,
        priority: "very-high",
      });
      res.status(201).json({
        status: "Success",
        message: "Success",
        data: newTodo,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async patch(req, res, next) {
    try {
      let id = req.params.id;
      let { title, priority, is_active } = req.body;
      let todoData = await todo.findByPk(id);
      if (!todoData) {
        throw { name: "TodoNotFound" };
      }
      let newTodo = await todo.update(
        { title, priority, is_active },
        { where: { id: id } }
      );
      todoData.title = title;
      todoData.priority = priority;
      todoData.is_active = is_active;
      res.status(200).json({
        status: "Success",
        message: "Success",
        data: todoData,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      let id = req.params.id;
      let data = await todo.findByPk(id);
      if (!data) {
        throw { name: "TodoNotFound", id: id};
      }
      await data.destroy();
      res
        .status(200)
        .json({ status: "Success", message: `Todo with ID ${id} deleted` });
    } catch (error) {
        console.log(error)
        next(error)
    }
  }
}

module.exports = ControllerTodo;
