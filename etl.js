const axios = require('axios');

(async () => {
  const { data } = await axios.post('http://localhost:3000/auth/login', {
    username: 'rakesh',
    password: 'raku1246',
  });
  console.log(data);
})();
