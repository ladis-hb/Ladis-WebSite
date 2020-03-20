import {AES} from "crypto-js"
const key = "U2FsdGVkX19azQsk+0wge1f9vL1fzwGWs/WCWlfw3NZsl9ewF5ITLgrXb6X4k7mDxq3TYDd2qjReJGNuEVWUaw"

export /**
 *
 *
 * @param {string} passwd 密码
 * @param {string} key 用户注册时间
 * @returns
 */
const CryptoEncode = (passwd:string)=>{
    return AES.encrypt(passwd,key).toString()
}

export const CryptoDncode = (passwd:string)=>{
    console.log({passwd,key});
    
    return AES.decrypt(passwd,key)
}

/**
 * 加密（需要先加载lib/aes/aes.min.js文件）
 */
export const encrypt = (word) => {
    var key = CryptoJS.enc.Utf8.parse("46cc793c53dc451b");
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}
/**
 * 解密
 */
export const decrypt = (word) => {
    var key = CryptoJS.enc.Utf8.parse("46cc793c53dc451b");
    var decrypt = CryptoJS.AES.decrypt(word, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}