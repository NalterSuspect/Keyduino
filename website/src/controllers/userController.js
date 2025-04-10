const bcrypt = require('bcrypt');
const db = require('../services/db.service');

function login(req,res,next){
    res.render('user/login.html.twig');
};

function register(req,res,next){
    res.render('user/register.html.twig');
};

async function userLogIn(req,res,next){
    const userObj = await db.getUser(req.body.username);
    const match =await bcrypt.compare(req.body.password, userObj.password);
    if (match) {
        req.session.idUser = userObj.id;
        res.redirect('/piano/index');
      } else {
        res.redirect('login');
      }
}

async function userRegister(req,res,next){
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        db.createUser(req.body.username, hashedPassword)
        res.redirect("login");
      }catch(error){
        console.error(error);
      }
}

module.exports = {
    login,
    register,
    userLogIn,
    userRegister
};