const crypto = require("crypto");
const { config } = require("../config");

class CryptoLib {
  constructor() {
    this.secret = config.secret.substring(0, 31);
  }

  encrypt(text) {
    const iv = crypto.randomBytes(16);

    let cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(this.secret),
      iv
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
  }

  decrypt(text) {
    let iv = Buffer.from(text.iv, "hex");
    let encryptedText = Buffer.from(text.encryptedData, "hex");
    let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}

module.exports = { CryptoLib };
