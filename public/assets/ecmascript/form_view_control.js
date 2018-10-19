let logIN = $("#login_button");
let signUP = $("#signup_button");
let signUP_form = $('#signupSection');
let logIN_form = $(`#loginSection`);

logIN.on("click", function(){
  signUP_form.fadeOut(600);
  setTimeout(function(){
    logIN_form.fadeIn(600);
  }, 550);
});

signUP.on("click", function(){
  logIN_form.fadeOut(600);
  setTimeout(function(){
    signUP_form.fadeIn(600);
  }, 550);
});
