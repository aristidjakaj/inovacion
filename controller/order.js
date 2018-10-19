const expressValidator = require (`express-validator`);
const session = require (`express-session`);
const bodyParser = require (`body-parser`);

module.exports = (app) =>{

  app.use(bodyParser.urlencoded({extended: false}));
  app.use(expressValidator());
  app.use(session({secret: `big project today`, saveUninitialized: false, resave: false}));

  app.get(`/buy_heineken`, function(req, res){
    res.render(`buy_forms/buy_form_heineken`, {Hsuccess: req.session.Hsuccess, HorderErrors: req.session.HorderErrors, counter: false});
  });

  app.post(`/heineken_order`, function (req, res) {

    console.log(req.body.quantity);

    let errors = req.validationErrors() || [];

    if (req.body.quantity < 100) {
      errors.push({
        param: `quantity`,
        msg: `The quantity that you entered is smaller than the minimum order`
      });

      req.session.HorderErrors = errors;
      return res.redirect(`/buy_heineken`);
    }

    req.session.Hsuccess = true;
    res.redirect(`/buy_heineken`);
  });

  app.get(`/buy_pepsi`, function(req, res){
    res.render(`buy_forms/buy_form_pepsi`, {Psuccess: req.session.Psuccess, PorderErrors: req.session.PorderErrors, counter: false});
  });

  app.post(`/pepsi_order`, function (req, res) {

    console.log(req.body.quantity);

    let errors = req.validationErrors() || [];

    if (req.body.quantity < 150) {
      errors.push({
        param: `quantity`,
        msg: `The quantity that you entered is smaller than the minimum order`
      });

      req.session.PorderErrors = errors;
      return res.redirect(`/buy_pepsi`);
    }

    req.session.Psuccess = true;
    res.redirect(`/buy_pepsi`);
  });

  app.get(`/buy_nescafe`, function(req, res){
    res.render(`buy_forms/buy_form_nescafe`, {Nsuccess: req.session.Nsuccess, NorderErrors: req.session.NorderErrors, counter: false});
  });

  app.post(`/nescafe_order`, function (req, res) {

    console.log(req.body.quantity);

    let errors = req.validationErrors() || [];

    if (req.body.quantity < 80) {
      errors.push({
        param: `quantity`,
        msg: `The quantity that you entered is smaller than the minimum order`
      });

      req.session.NorderErrors = errors;
      return res.redirect(`/buy_nescafe`);
    }

    req.session.Nsuccess = true;
    res.redirect(`/buy_nescafe`);
  });

  app.get(`/buy_glina`, function(req, res){
    res.render(`buy_forms/buy_form_glina`, {Gsuccess: req.session.Gsuccess, GorderErrors: req.session.GorderErrors, counter: false});
  });

  app.post(`/glina_order`, function (req, res) {

    console.log(req.body.quantity);

    let errors = req.validationErrors() || [];

    if (req.body.quantity < 200) {
      errors.push({
        param: `quantity`,
        msg: `The quantity that you entered is smaller than the minimum order`
      });

      req.session.GorderErrors = errors;
      return res.redirect(`/buy_glina`);
    }

    req.session.Gsuccess = true;
    res.redirect(`/buy_glina`);
  });

  app.get(`/buy_dragon`, function(req, res){
    res.render(`buy_forms/buy_form_dragon`, {Dsuccess: req.session.Dsuccess, DorderErrors: req.session.DorderErrors, counter: false});
  });

  app.post(`/dragon_order`, function (req, res) {

    console.log(req.body.quantity);

    let errors = req.validationErrors() || [];

    if (req.body.quantity < 90) {
      errors.push({
        param: `quantity`,
        msg: `The quantity that you entered is smaller than the minimum order`
      });

      req.session.DorderErrors = errors;
      return res.redirect(`/buy_dragon`);
    }

    req.session.Dsuccess = true;
    res.redirect(`/buy_dragon`);
  });
}
