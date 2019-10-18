const axios = require('axios');

(async () => {
  const {
    data: { token },
  } = await axios.post('http://localhost:3000/auth/login', {
    username: 'rakesh',
    password: 'raku12346',
  });
  // console.log(data);
  console.log(token);
  try {
    const { data } = await axios.get('http://localhost:3000/auth', {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
})();
