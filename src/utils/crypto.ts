import Encrypt from "jsencrypt-ext";

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAimgQx3B2n6jQecToVqdm
AUpaLnOT+0DoRdiIRncOkSUrDWR5oz3VrCE8kmhw4VaBzQs3nH9fXt3cMLGQq7MN
lCYEx+pEbx2+etrRzPV7oW1hZdkd8SodS1LaFWGElTbPlhpqjZwFvFXa5rukLuqE
velxirLYurRAcbMSRsr/HJkuSviY7Nez9sJj8eHnlarJB3N2/vHSyK8upg3Frsgg
8hXuPUX3FFhxTvntqiCvF1mlAvtjKqf99dmbwYPgaFSUqBmT1SVuEATHDavQKwTQ
RLlQ8etYVgdYIdm9sXU6rYLuaHOi8yubnPfboUCDjF0bM/dD2OZVM5DTElJ+tb0E
JQIDAQAB
-----END PUBLIC KEY-----`;

const privateKey = ``;

// 公钥加密（分段）
export function encrypt<T = any>(data: T) {
    const encryptor = new Encrypt();
    // 设置公钥
    encryptor.setPublicKey(publicKey);
    // 对需要加密的数据进行加密
    const str = encryptor.encrypt(JSON.stringify(data));
    return str === false ? "" : str;
}

// 私钥解密（分段）
export function decrypt(data: string) {
    const encryptor = new Encrypt();
    // 设置公钥
    encryptor.setPublicKey(privateKey);
    // 对需要加密的数据进行解密
    const str = encryptor.decrypt(data);
    return str === false ? "" : JSON.parse(str);
}