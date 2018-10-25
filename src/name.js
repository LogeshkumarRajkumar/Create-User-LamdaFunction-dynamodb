var dynamo = require('dynamodb');
var Joi = require('joi');

const awsCredentials = {
    region: "us-east-1",
    accessKeyId: process.env.AccessKey,
    secretAccessKey: process.env.SecretKey
};

dynamo.AWS.config.update(awsCredentials);

var Names = dynamo.define('Names', {
    hashKey: 'name',
    schema: {
        name: Joi.string(),
        user_id: Joi.string()
    },
    tableName: 'Names'
});

const create = function (data) {
    return new Promise(function (resolve, reject) {
        return Names.create(data, function (error, res) {
            if (error) {
                return reject(error)
            };
            return resolve(res)
        })
    });
}

const get = function (col, data) {
    return new Promise(function (resolve, reject) {
        return Names.get({ [col]: data }, function(error, res){
            if (error) {
                return reject(error)
            };
            return resolve(res)
        })
    });
}

module.exports = {
    create,
    get
};