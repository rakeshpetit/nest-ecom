const axios = require('axios');

(async () => {
  // try {
  //   const {
  //     data: { token },
  //   } = await axios.post('http://localhost:3000/api/auth/register', {
  //     username: 'rakesh',
  //     password: 'raku12345',
  //     seller: true
  //   });
  //   console.log(token);
  // } catch (err) {
  //   console.log(err);
  // }
  const {
    data: { token },
  } = await axios.post('http://localhost:3000/api/auth/login', {
    username: 'rakseller',
    password: 'raku12345',
  });
  console.log(token);
  try {
    const { data } = await axios.get('http://localhost:3000/api/auth', {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
})();
