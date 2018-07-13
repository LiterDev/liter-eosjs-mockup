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

exports.home = async (req, res, next) => {
  try {

    eos.getTransactions({accountName: 'user'}).then(result => console.log(result));
    res.json('hello');
  } catch (error) {
    next(error);
  }
};


exports.address = async (req, res, next) => {
  try {
    const user = req.body.userId;
    console.log(user);
    const activePrivate = ecc.seedPrivate(user);
    const activePublic = ecc.privateToPublic(activePrivate);

    console.log(activePublic);
    console.log(activePrivate);

    eos.newaccount({
      creator: 'user',
      name: user,
      owner: activePublic,
      active: activePublic,
      recovery: 'user'
    });



    res.json({'walletPrivateAddress': activePrivate, 'walletAddress': activePublic, 'userId': user});
  } catch (error) {
    next(error);
  }
};

exports.reward = async (req, res, next) => {
  try {
    const user = req.body.userId;
    const reward = req.body.rewardLiterCube;
    const rewardType = req.body.engagementType;
    const reviewId = req.body.reviewId;
    console.log(user);
    console.log(reward);
    console.log(rewardType);
    //let transactionId;

    const rewardInfo = {'reviewId': reviewId, 'rewardType': rewardType};
    eos.transaction('eosio.token', currency => {
      currency.transfer('user', user, reward + ' EOS', rewardInfo);
    }).then(result => {
        console.log(result.transaction_id);
        //transactionId = result.transaction_id;
        res.json({'transactionId': result.transaction_id});
      }
    );

  } catch (error) {
    next(error);
  }
};


