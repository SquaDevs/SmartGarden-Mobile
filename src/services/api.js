import axios from 'axios';

const url = 'http://localhost:3000';
const api = axios.create({
  baseURL: url,
});

// const url = 'https://dev.ianoliveira.com.br:9443';

// class api {
//   constructor() {
//     this.url;
//   }

//   async get(path) {
//     try {
//       const response = await fetch(`${this.url}${path}`);
//       return response;
//     } catch (e) {
//       return e;
//     }
//   }

//   async post(path, body) {
//     try {
//       const response = await fetch(`${this.url}${path}`, {
//         method: 'POST',
//         body: JSON.stringify(body),
//       });
//       return response;
//     } catch (e) {
//       return e;
//     }
//   }
// }

export default api;
