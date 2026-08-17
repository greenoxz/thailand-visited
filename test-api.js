import handler from './api/donations.js';

const req = { method: 'GET' };
const res = {
  status: (code) => {
    console.log('Status:', code);
    return res;
  },
  json: (data) => {
    console.log('JSON:', data);
    return res;
  },
  setHeader: (key, value) => {
    console.log('Header:', key, value);
  }
};

handler(req, res).catch(console.error);
