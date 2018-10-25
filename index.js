const user = require('./src/user');
const name = require('./src/name');
const email = require('./src/email');
const uuid = require('uuid/v1');

const awsCredentials = {
    region: "us-east-1",
    accessKeyId: process.env.AccessKey,
    secretAccessKey: process.env.SecretKey
};

const isUserAlreadyAvailable = async function(user){
    var matchedNames = await name.get('name', user.name);
    if (matchedNames!=null) return false;

    var matchedEmails = await email.get('email', user.email);
    if (matchedEmails!=null) return false;
    return true;
};

const addUser = async function(userReq){
    userReq.user_id = `user-${uuid()}`;
    const emailData = {
        email: userReq.email,
        user_id: userReq.user_id
    }
    try{
        var res = await email.create(emailData);
    }catch(err){
        throw err;
    }

    const nameData = {
        name: userReq.name,
        user_id: userReq.user_id
    }
    try{
        var res = await name.create(nameData);;
    }catch (err){
        throw err;
    }

    try
    {
        var res = await user.create(userReq);
    }
    catch (err){
        throw err;
    }
    return 'Successfully Created';
}

function validate(user){
    return !user.name || !user.email ? false : true;
}

exports.handler = async function(event, context, callback){
    const user = event;
    var isValid = await isUserAlreadyAvailable(user);
    const isValidData = validate(user);
    if(isValidData==false){
        console.log("Empty UserName or Email");
        callback('Empty UserName or Email') ;       
    }
    if (isValid) {
        try {
            var res = await addUser(user);
            callback(null, res);
        }
        catch(err){
            console.log(err);
            callback('some error occured');
        }
    }
    else
    {
        callback('User Already Exist')
    }
};