const httpStatus = require('http-status');
const { omit } = require('lodash');
const { handler: errorHandler } = require('../middlewares/error');

const Eos = require('eosjs'); // Eos = require('./src')

// Optional configuration..
/*const config = {
  keyProvider: ['5J41WoR23c8cDYNBGdoNSRR7BEm5sric3VfiEchKdAFLiR7bYbx'], // WIF string or array of keys..
  httpEndpoint: 'http://192.168.0.172:8888',
  /!*mockTransactions: () => 'pass', // or 'fail'
  transactionHeaders: (expireInSeconds, callback) => {
    callback(null/!*error*!/, headers)
  },*!/
  expireInSeconds: 60,
  broadcast: true,
  debug: false,
  sign: true
}*/

const config = {
  keyProvider: ['5KU2rsGJMzvHCp9xWEemzfMEnemLm3c66XumYvqhJM8P5ALc9cd'], // WIF string or array of keys..
  httpEndpoint: 'http://127.0.0.1:8888',
  //httpEndpoint: 'http://192.168.0.172:8888',
  /*transactionHeaders: (expireInSeconds, callback) => {
    callback(null, headers);
  },*/
  expireInSeconds: 60,
  broadcast: true,
  debug: false,
  sign: true
}

const eos = Eos.Localnet(config);
/*
const options = {
  broadcast: false,
  sign: true,
  authorization: null
};
*/

exports.hello = async (req, res, next) => {
  try {
    //eos.getBlock(1).then(result => {console.log(result)});


    //eos.transfer();
    //let options = {broadcast: false};
    //eos.transfer({from: 'user', to: 'tester', quantity: '1 EOS', memo: ''}).then(result => console.log(result));
    /*eos.transaction({
      actions: [
        {
          account: 'eosio.token',
          name: 'transfer',
          authorization: [{
            actor: 'user',
            permission: 'active'
          }],
          data: {
            from: 'user',
            to: 'tester',
            quantity: '1 EOS',
            memo: ''
          }
        }
      ]
    }).then(result => console.log(result));*/
    /*eos.transaction('eosio.token', currency => {
      currency.transfer('user', 'tester', '1 EOS', '');
    }).then(result => console.log(result));*/
    eos.getTransactions({accountName: 'user'}).then(result => console.log(result));
    res.json('hello');
  } catch (error) {
    next(error);
  }
};
