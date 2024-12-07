import CryptoJS from "crypto-js";
export const md5 = (str) => {
  if(!str) return ''
  const hash = CryptoJS.MD5(str)
  return hash.toString(CryptoJS.enc.Hex)
}