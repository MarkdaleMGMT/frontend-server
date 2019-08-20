module.exports ={
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASS
    },
    tls : {
  ciphers : 'SSLv3'
}
};
