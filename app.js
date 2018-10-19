const express = require(`express`);
const {sequelize} = require(`./models/index`);
let surf = require(`./controller/surf.js`);
let authentication = require(`./controller/authentication.js`);
let contact = require(`./controller/contact.js`);
let order = require(`./controller/order.js`);

let app=express();

sequelize.authenticate().then(() => {
  console.log(`Connection is successfully established`);

  app.set('view engine', 'ejs');
  app.use(express.static("public"));

  surf(app);

  authentication(app);

  contact(app);

  order (app);

  app.listen(5000);

}).catch( (err) => {
  console.log(`Unable to connect to database ${err}`);
});
