import crypto from "node:crypto";

export const hashPassword = async (password: string) => {
  const salt = crypto.randomBytes(16);
  const hash = await new Promise<Buffer>((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) return reject(err);
      resolve(derivedKey);
    });
  });
  return `${salt.toString("hex")}:${hash.toString("hex")}`;
};

export const verifyPassword = async (password: string, stored: string) => {
  const [saltHex, hashHex] = stored.split(":");
  const salt = Buffer.from(saltHex, "hex");
  const hash = Buffer.from(hashHex, "hex");
  const derived = await new Promise<Buffer>((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) return reject(err);
      resolve(derivedKey);
    });
  });
  return crypto.timingSafeEqual(hash, derived);
};
