'use strict';
const { User } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll()

    return queryInterface.bulkInsert(
      "Tweets",
      [
        {
          message: "Hey there",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: users[0].id,
        },
        {
          message: "I'm tweeting",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: users[0].id,
        },
        {
          message: "Hilarious",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: users[1].id,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Tweets", null, {});
  }
};
