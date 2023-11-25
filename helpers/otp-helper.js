module.exports = {
  getOtp: () => {
    const otp = Math.floor(10000 + Math.random() * 90000);
    console.log("Generated OTP:", otp);
    return otp.toString();
  },
  sendOtp: (otp, phone, client) => {
    const msg = `your otp is ${otp}`;

    return new Promise(async (resolve, reject) => {
      try {
        console.log("Sending OTP...");
        await client.sendMessage(`${phone}@c.us`, msg);
        console.log(`OTP sent to ${phone}.`);
        resolve(true);
      } catch (error) {
        console.error("Error occurred:", error);
        reject(false);
      }
    });
  },
};
