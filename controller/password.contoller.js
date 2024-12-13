const bcrypt = require("bcrypt");


const generatePasswordHash = async (request, response) => {
  try {
    const { password } = request.body;

    if (!password) {
      return response.status(400).send({
        message: "Password is required",
      });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

    return response.status(200).send({
      message: "Password hash generated successfully",
      hashedPassword,
    });
  } catch (err) {
    console.error("Error generating password hash:", err);
    return response.status(500).send({
      message: "Internal server error",
    });
  }
};


const verifyPasswordHash = async (request, response) => {
  try {
    const { password, hash } = request.body;

    if (!password || !hash) {
      return response.status(400).send({
        message: "Password and hash are required",
      });
    }

    
    const isMatch = await bcrypt.compare(password, hash);

    return response.status(200).send({
      message: "Password verification completed",
      isMatch, 
    });
  } catch (err) {
    console.error("Error verifying password hash:", err);
    return response.status(500).send({
      message: "Internal server error",
    });
  }
};

module.exports = {
  generatePasswordHash,
  verifyPasswordHash,
};