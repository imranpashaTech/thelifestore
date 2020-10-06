'use strict';

const globalConst = require('../const/globalConst');

module.exports.upload = (file,path) => {
    let uploadFile = file;

    
    // Use the mv() method to place the file somewhere on your server
    uploadFile.mv(path, function(err) {
      if (err)
        return res.status(500).send(err);

      res.send('File uploaded!');
    });
    
}

module.exports.isValidDate = (value) => {
  if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;

  const date = new Date(value);
  if (!date.getTime()) return false;
  return date.toISOString().slice(0, 10) === value;
}

module.exports.getCurrentDate_ddmmyy = () => {
  let today = new Date();
  return ((today.getDate())+'-'+(today.getMonth()+1)+'-'+(today.getFullYear()+"").substring(2,4)).toString(); 
}

module.exports.convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
}

module.exports.inv_net_amt = (amt) => {

  return (amt/100).toFixed(2);

}

module.exports.inv_gross_amt = (net_amt) => {

  return (net_amt *(100/(100 + globalConst.val.GST))).toFixed(2);
  
}

module.exports.inv_gst_amt = (gross_amt) => {

  return  ((gross_amt * globalConst.val.GST)/100).toFixed(2);
  
}











