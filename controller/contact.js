module.exports = (app) =>{

  app.post(`/message_sent`, function(req, res){
    res.render('contact', {sent: true});
  });

}
