const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');
const { requireAuth } = require("../../utils/auth");

const { Tweet, User } = db;

router.use(requireAuth);

router.get(
    "/",
    asyncHandler(async (req, res) => {
        const tweets = await Tweet.findAll({
            include: [{ model: User, as: "user", attributes: ["username"] }],
            order: [["createdAt", "DESC"]],
            attributes: ["id", "message"],
        });
        res.json({ tweets });
    })
);

// const validateTweet = [
//     check("message")
//         .exists({ checkFalsy: true })
//         .withMessage("Tweet can't be empty."),
//     //  message cannot be longer than 280 characters:
//     check("message")
//         .isLength({ max: 280 })
//         .withMessage("Tweet can't be longer than 280 characters."),
//     handleValidationErrors,
// ];

router.post(
    "/",
    asyncHandler(async (req, res) => {
        const { message } = req.body;
        const tweet = await Tweet.create({ message, userId: req.user.id });
        res.json({ tweet });
    })
);

module.exports = router;
