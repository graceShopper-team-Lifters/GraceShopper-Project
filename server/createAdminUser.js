const axios = require('axios');

const registerAdminUser = async () => {
  try {
    const response = await axios.post('http://localhost:8080/register', {
      username: 'adminuser',
      password: 'adminpassword',
    });

    console.log(response.data);
  } catch (error) {
    console.error('Error creating admin user:', error.response.data);
  }
};

registerAdminUser();