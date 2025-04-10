function index(req,res,next){
    if(req.session.idUser==null){
        res.redirect('/user/login');
    }else{
        res.render('piano/index.html.twig', { notes: ["C","D","E","F","G","A","B"],volume: 0,pitch:0 });
    }
};

module.exports = {
    index
};