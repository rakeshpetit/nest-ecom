const axios = require('axios');

(async () => {
  const { data } = await axios.post('http://localhost:3000/auth/register', {
    username: 'rakesh',
    password: 'raku12346',
  });
  console.log(data);
})();
