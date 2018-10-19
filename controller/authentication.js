const bodyParser = require (`body-parser`);
const {sequelize} = require (`./../models/index`);
const expressValidator = require (`express-validator`);
const session = require (`express-session`);
const bcrypt = require (`bcrypt`);
const saltRounds = 8;

module.exports = (app) =>{
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(expressValidator());
  app.use(session({secret: `I am dead inside`, saveUninitialized: false, resave: false}));

  app.get(`/account`, function(req, res){
    res.render(`account`, {
      success: req.session.success,
      errors: req.session.errors,
      counter: false,
      name: req.session.name,
      logErrors: req.session.logErrors
    });
  });

  app.get('/logout', function(req, res){
     req.session.destroy((err) =>{
       if(err){
         console.log(err);
       }
       else{
         res.redirect('/');
       }
     });
   });

   app.get(`/ib`, function (req, res){
     res.render(`home`);
   });

   app.post(`/log-in`, function(req, res){
     console.log(req.body);

     sequelize.query(
       `SELECT businessName, email, password FROM business_users WHERE email = :email`,
     {
       replacements: {
         email: req.body.logInEmail
       },
       type: sequelize.QueryTypes.SELECT
     }
   ).then(result => {
     console.log(result);

     let errors = req.validationErrors() || [];

     if (typeof result[0]===`undefined`){
       errors.push({
         param: `logInEmail`,
         msg: `The email that you entered is incorrect`
       });

       req.session.logErrors = errors;
       return res.redirect(`/account`);
     }

     let comparePassword = bcrypt.compareSync(req.body.logInPassword, result[0].password);

     if(!comparePassword){
       errors.push({
         param: `logInPassword`,
         msg: `The password that you entered is incorrect`
       });

       req.session.logErrors = errors;
       return res.redirect(`/account`);
     }

     req.session.success = true;
     req.session.name = result[0].businessName;
     res.redirect(`/ib`);

   }).catch(err => {
     console.log(err);
   });
   });

  app.post(`/sign-up`, function(req, res){

    req.check(`password`, `Password is invalid`).isLength({min: 6}).equals(req.body.confirmPassword);

    sequelize.query(
      `SELECT businessName, phoneNumber, email, NIPT FROM business_users WHERE businessName= :businessName OR phoneNumber= :phoneNumber OR email= :email OR NIPT= :NIPT`,
    {
      replacements:{
        businessName: req.body.businessName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        NIPT: req.body.NIPT
      },
      type: sequelize.QueryTypes.SELECT
    }
  ).then( result =>{
    console.log(result);

    let counter = [false, false, false, false];

    for (let i = 0; i < result.length; i++) {
      if (result[i].businessName == req.body.businessName) {
        counter[0] = true;
      }
      if (result[i].phoneNumber == req.body.phoneNumber) {
        counter[1] = true;
      }
      if (result[i].email == req.body.email) {
        counter[2] = true;
      }
      if (result[i].NIPT == req.body.NIPT) {
        counter[3] = true;
      }
    }

    let errors = req.validationErrors() || [];

    if (counter[0]) {
      errors.push({
        param: `businessName`,
        msg:`Business Name is occupied`
      });
    }
    if (counter[1]) {
      errors.push({
        param: `phoneNumber`,
        msg: `Phone number is occupied`
      });
    }
    if (counter[2]) {
      errors.push({
        param: `email`,
        msg: `Email is occupied`
      });
    }
    if (counter[3]) {
      errors.push({
        param: `NIPT`,
        msg: `NIPT is occupied`
      });
    }

    if(errors.length !== 0){
      let c = 0;
      for (let i = 0; i < errors.length; i++) {
        if (errors[i].param==='password') {
          c++;
        }
      }
      if (c>1) {
        for (let i = 0; i < errors.length; i++) {
          if (c>1 && errors[i].param==='password') {
            errors.splice(i, 1);
            c--;
          }
          if (c<=1) {
            break;
          }
        }
      }
      req.session.errors = errors;
      req.session.success = false;
      return res.redirect('/account');
    }

    let hash = bcrypt.hashSync(req.body.password, saltRounds);

    req.session.success = true;
    req.session.name = req.body.businessName;

    sequelize.query(
      `INSERT INTO business_users (firstName, lastName, businessName, phoneNumber, email, password, NIPT, streetAddress, city, postalCode, businessType) VALUES (:firstName, :lastName, :businessName, :phoneNumber, :email, :password, :NIPT, :streetAddress, :city, :postalCode, :businessType)`,
      {
        replacements:{
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          businessName: req.body.businessName,
          phoneNumber: req.body.phoneNumber,
          email: req.body.email,
          password: hash,
          NIPT: req.body.NIPT,
          streetAddress: req.body.address,
          city: req.body.city,
          postalCode: req.body.postalCode,
          businessType: req.body.type
       }
      }
    ).then(result => {
      console.log(result);
      res.redirect(`/ib`);
    }).catch(err => {
      console.log(err);
    });
  }).catch(err =>{
    console.log(err);
  });
  });
}
