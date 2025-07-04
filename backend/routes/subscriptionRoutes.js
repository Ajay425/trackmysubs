const express = require("express");

const {
    addSubscription,
    getAllSubscriptions,
    updateSubscription,
    deleteSubscription,
} = require("../controllers/subscriptionController");
const { protect } = require("../middlewares/authMiddlewares");

const router = express.Router();

router.post("/add-subscription", protect, addSubscription);
router.get("/get-subscriptions", protect, getAllSubscriptions);
router.put("/update-subscription/:id", protect, updateSubscription);
router.delete("/delete-subscription/:id", protect, deleteSubscription);

module.exports = router;