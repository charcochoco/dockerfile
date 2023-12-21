const { Router } = require("express");
const requireRoles = require("../middlewares/require-role");
const requireAuth = require("../middlewares/require-auth");
const User = require("../models/User");
const Hash = require("../utils/hash");

/**
 * @param {Express.Application} app
 * @param {Router} router
 */
module.exports = function (app, router) {
  router.get(
    "/users",
    [requireAuth, requireRoles(["ADMIN"])],
    async (req, res) => {
      try {
        res.status(200).send(await User.find({ role: "RESTAURANT" }));
      } catch (e) {
          res.status(400).send(e);
      }     
    }
  );

  router.get("/users/@me", [requireAuth], async (req, res) => {
    try {
      res.status(200).send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }        
  });

  router.post("/user", [requireAuth, requireRoles(["ADMIN"])], async (req, res) => {
    try {
      const user = await User.create({
        email: req.body.restaurantUser?.email,
        name: req.body.restaurantUser?.name,
        role: "RESTAURANT",
        password: await Hash.hash(req.body.restaurantUser?.password),
        address: req.body.restaurantUser?.address,
        postalCode: req.body.restaurantUser?.postalCode,
        city: req.body.restaurantUser?.city,
      });

      res.status(201).send(user);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  router.delete("/user/:id", [requireAuth, requireRoles(["ADMIN"])], async (req, res) => {
    try {
      const user = await User.deleteOne({_id : req.params.id});

      res.status(200).send(user);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  router.patch("/user/:id", [requireAuth, requireRoles(["RESTAURANT"])], async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body.restaurantUser,
        { new: true, runValidators: true }
      );

      res.status(200).send(user);
    } catch (e) {
      res.status(400).send(e);
    }
  });
};
