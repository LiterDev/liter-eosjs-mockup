const httpStatus = require('http-status');
const {omit} = require('lodash');
const {handler: errorHandler} = require('../middlewares/error');

const Eos = require('eosjs'); // Eos = require('./src')
let {ecc} = Eos.modules;

//Optional configuration..

const config = {
  keyProvider: ['5KU2rsGJMzvHCp9xWEemzfMEnemLm3c66XumYvqhJM8P5ALc9cd'], // WIF string or array of keys..
  //keyProvider: ['5KTFBCz1rt5YLvxJCjMru9tjBnh8bNS5X7R5PfTBQ25RcEcN8C6'], // WIF string or array of keys..
  //httpEndpoint: 'http://192.168.0.172:8888',
  httpEndpoint: 'http://127.0.0.1:8888',
  //httpEndpoint: 'http://54.249.219.96:8888',
  /*transactionHeaders: (expireInSeconds, callback) => {
    callback(null, headers);
  },*/
  expireInSeconds: 60,
  broadcast: true,
  debug: false,
  sign: true
}

const eos = Eos.Localnet(config);
exports.write = async (req, res, next) => {
  try {
    const user = req.body.userId;
    const review = req.body.reviewId;
    console.log(user);
    console.log(review);

    eos.transaction({
      actions: [
        {
          account: 'write.code',
          name: 'post',
          authorization: [{
            actor: 'write.code',
            permission: 'active'
          }],
          data: {
            user: user,
            review_id: review

          }
        }
      ]
    }).then(result => console.log(result));
    res.json({'userId': user});
  } catch (error) {
    next(error);
  }
};


