'use strict';
module.exports = (sequelize, DataTypes) => {
  var Business_User = sequelize.define('Business_User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    businessName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING(10),
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    NIPT: DataTypes.SMALLINT,
    streetAddress: DataTypes.STRING,
    city: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    businessType: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Business_User;
};
