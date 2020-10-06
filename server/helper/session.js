'use strict';

const globalConst = require('../const/globalConst');

function verifyToken(req) {
    if(!req.headers.authorization){
        return false;
        return res.status(401).json({ errors: "Unauthorized request" });
    }
    if(req.headers.authorization == req.session.token)
        return true;
    else
        return false;
}

module.exports.redirectLogin = (req,res,next) => {
    
    if(!req.session.userId){
        res.redirect(globalConst.path.login);
    }else{
        next();
    }

    // if(!req.session.userId && !verifyToken(req)){
    //     res.redirect(globalConst.path.login);
    // }else{
    //     next();
    // }
}

module.exports.redirectHome = (req,res,next) => {
    
    if(req.session.userId){
        switch(req.session.userType) {
            case 'C':
                res.redirect(globalConst.path.customer_dashboard);
                break;
            case 'S':
                res.redirect(globalConst.path.supplier_dashboard);
                break;
            case 'A':
                res.redirect(globalConst.path.admin_dashboard);
                break;
            default:
                res.redirect(globalConst.path.home);

          } 
    }else{
        next();
    }
}

module.exports.logout = (req,res,next) => {
    console.log(req.session);
    req.session.destroy(function(err) {
        console.log(err);
        return;
    });
    console.log(globalConst.path.login);

    res.redirect(globalConst.path.home);
    res.end();
}





