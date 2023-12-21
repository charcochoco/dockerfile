const { Router } = require("express");
const requireRoles = require("../middlewares/require-role");
const requireAuth = require("../middlewares/require-auth");
const Order = require("../models/Order");

/**
 * @param {Express.Application} app
 * @param {Router} router
 */
module.exports = function (app, router) {
  router.get(
    "/user/:id/orders",
    [requireAuth, requireRoles(["RESTAURANT"])],
    async (req, res) => {
        try {
            res.status(200).send(await Order.find({ status: "PROCESSED" ,userId: req.params.id }));
        } catch (e) {
            res.status(400).send(e);
        }
    }
  );

  router.patch("/user/:userId/order/:orderId",[requireAuth, requireRoles(["RESTAURANT"])], async (req, res) => {
    try {
      const order = await Order.findOneAndUpdate(
        { _id: req.params.orderId, userId: req.params.userId },
        { status: "CANCELED" },
        { new: true, runValidators: true }
      );

      res.status(200).send(order);
    } catch (e) {
      res.status(400).send(e);
    }
  });
};
