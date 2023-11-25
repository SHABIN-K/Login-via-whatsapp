var express = require("express");
var router = express.Router();

const connection = require("../config/connection");
const { getOtp, sendOtp } = require("../helpers/otp-helper");
const { connectWeb, getStatus } = require("../helpers/web-helper");

let storedOtp = null;

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index");
});

router.post("/generate", async (req, res) => {
  const { phone } = req.body;
  const otp = getOtp(phone);
  const client = connection.getClient();

  try {
    storedOtp = { otp };
    const respone = await sendOtp(otp, phone, client);
    console.log(respone);
    res.render("index", { generated: true });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).send("Error sending OTP");
  }
});

router.post("/verify", (req, res) => {
  const { otp } = req.body;

  if (storedOtp && otp === storedOtp.otp) {
    res.render("index", { success: true });
  } else {
    res.render("index", { success: false });
  }
});

router.get("/login", async function (req, res, next) {
  try {
    const client = connection.getClient();
    await connectWeb(client);
    res.send(`Successfully logged into WhatsApp`);
  } catch (error) {
    console.error("Error connecting to WhatsApp:", error);
    res.status(500).send("Error connecting to WhatsApp");
  }
});

router.get("/status", async function (req, res, next) {
  try {
    const client = connection.getClient();
    const status = await getStatus(client);
    res.send(`WhatsApp Status: ${status}`);
  } catch (error) {
    console.error("Error getting WhatsApp status:", error);
    res.status(500).send("Error getting WhatsApp status");
  }
});

module.exports = router;
