const crypto = require ('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
function encrypt(text){
    const cipher = crpyto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concact([encrypted, cipher,fial()]);
    return {iv: iv.toString('hex'), encryptedData: encrypted.toString('hex')};
    }

