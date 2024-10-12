const {
    RecaptchaEnterpriseServiceClient,
}= require('@google-cloud/recapthca-enterprise');
const{PasswordCheckVerification} = require('recaptcha-password-checker-helpers');
const { createPasswordLeakAssessment } = require('./reCaptcha');
const client = new RecaptchaEnterpriseServiceClient();
async function checkPasswordLeak(projectId, username, password){
    const verification = await PasswordCheckVerification.create(
        username,
        password
    );
    const lookupHashPrefix = Buffer.from(
        verification.getLookupHashPrefix()
      ).toString('base64');
    const encryptedUserCredentialsHash = Buffer.from(verification.getencryptedUserCredentialsHash()
).toString('base64');
console.log('Hashes created');

    const credentials = await createPasswordLeakAssessment(
        projectId,
        lookupHashPerfix,
        encryptedUserCredentialsHash
    );
    const reencryptedUserCredtialHash = Buffer.from(
        credentials.reencryptedUserCredentialsHash.toString(),
        'base64'
    );
    const encryptedLeakMatchPrefixes = credentials.encryptedLeakMatchPrefixes.map(
        prefix =>{
            return Buffer.from(prefix.toString(), 'base64');
        }
    );
    const isLeaked = verification
        .verify(reencryptedUserCredentialsHash, encryptedLeakMatchPrefixes)
        .areCredentialsLeaked();

    console.log('Is Credential leaked: ${isleaked}')
}
