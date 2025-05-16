import Encrypt from "jsencrypt-ext";

const publicKey = `
-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKfSt+NNYfJ0Pb54LyYaoBkU8aRopv9T
s1UASMq05ztPXxLNskUWpc4g+GoGQDEiT14uNXNXkYB91GtlPMMlnCkCAwEAAQ==
-----END PUBLIC KEY-----
`;

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