const userGateway = require("./userGateway");

const inquiryUser = async (id) => {
  return await userGateway.getUser(id);
};

module.exports = {inquiryUser};
