module.exports = (app) =>{
  app.get(`/`, function(req, res){
    res.render(`home`);
  });

  app.get(`/about`, function(req, res){
    res.render(`about`);
  });

  app.get(`/contact`, function(req, res){
    res.render(`contact`);
  });

  app.get(`/client`, function(req, res){
    res.render(`client`);
  });
}
