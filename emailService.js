
module.exports = {
  sendMail(to, subject, message, from) {
    const params = {
      Destination: {
        ToAddresses: to
      },
      Message: {
        Body: {
            Text: {
                Charset: "UTF-8",
                Data: message
            }
           
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject
        }
      },
      ReturnPath: from,
      Source: from
    };
    return new Promise((resolve, reject) => {
      ses.sendEmail(params, (err, data) => {
        if (err) {
          reject(err, err.stack);
        } else {
          resolve(data);
        }
      });
    });
  }
};