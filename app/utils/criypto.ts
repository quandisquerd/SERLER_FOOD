import CryptoJS from 'crypto-js';
const key: any = process.env.NEXT_PUBLIC_SECRET_KEY;
export function encryptMessage(message: any): string {
    const messageStr = typeof message === 'string' ? message : JSON.stringify(message);
    return CryptoJS.AES.encrypt(messageStr, CryptoJS.enc.Utf8.parse(key), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString();
}
export function decryptMessage(ciphertext: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}
