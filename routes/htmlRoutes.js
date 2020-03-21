var db = require("../models");

module.exports = function(app) {
  
  app.get("/signup", (req, res) => {
    res.render("signup")
  })
/************************************************************ */ 

  app.get("/profile", async (req, res) => {

    var user = {

    //   userInfo: {
    //   zip: '10017',
    //   city:'NY',
    //   first_name: 'Antonio',
    //   last_name: 'Alvarado',
    //   id: true,
    //   isloggedin: true
    //   }
      
      
      
    }

    res.render("profile", user);//maybe change

    console.log("%%%%%%%%% is logged in", req.isAuthenticated());
    if(req.isAuthenticated()){

      db.Accounts.findOne({
        where:{
          uuid: req.session.passport.user
        }
      }).then(function(dbUser){
        var user = {
          userInfo: dbUser.dataValues,
          id: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        }
        res.render("profile", user);//maybe change
      })
    }
    else {
      var user = {
          id: null,
          isloggedin: req.isAuthenticated()
        }
      res.redirect("/");
    }
});

  app.get("*", (req, res) => {
    res.render("login")
  })

};
