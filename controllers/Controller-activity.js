const { activity } = require("../models/index");

class ControllerActivity {
  static async getAll(req, res, next) {
    try {
      let activities = await activity.findAll();
      res.status(200).json({
        status: "Success",
        message: "Success",
        data: activities,
      });
    } catch (error) {
      console.log(error, "error getting all activities");
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      let id = req.params.id;
      let group = await activity.findByPk(id);
      if (!group) {
        throw { name: "ActivityNotFound", id: id };
      }
      console.log(group);
      res.status(200).json({
        status: "Success",
        message: "Success",
        data: group,
      });
    } catch (error) {
      next(error);
    }
  }

  static async post(req, res, next) {
    try {
      let { title, email } = req.body;
      let newGroup = await activity.create({ title, email });
      res.status(201).json({
        status: "Success",
        message: "Success",
        data: newGroup,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async patch(req, res, next) {
    try {
      let { title } = req.body;
      let id = req.params.id;
      let group = await activity.findByPk(id);
      if (!group) {
        throw { name: "ActivityNotFound", id: id };
      }
      let newGroup = await activity.update({ title }, { where: { id: id } });
      group.title = title;
      res.status(200).json({
        status: "Success",
        message: "Success",
        data: group,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      let id = req.params.id;
      let group = await activity.findByPk(id);
      if (!group) {
        throw { name: "ActivityNotFound", id: id };
      }
      await group.destroy()
      res.status(200).json({status: "Success", message: `Activity with ID ${id} deleted`})
    } catch (error) {
        console.log(error)
        next(error)
    }
  }
}

module.exports = ControllerActivity;
