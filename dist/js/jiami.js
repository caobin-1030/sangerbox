import CryptoJS from 'crypto-js'
/**
 * 加密（需要先加载lib/aes/aes.min.js文件）
 */
/**
 * 解密
 */
export const  decrypt=(word)=>{
  if(word.length>32){
  try {
    var content=word.substring(32);
      var key = CryptoJS.enc.Utf8.parse(word.substring(0,32));
      var decrypt = CryptoJS.AES.decrypt(content, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
      return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  } catch (e) {
  }
  }
  return "";
}