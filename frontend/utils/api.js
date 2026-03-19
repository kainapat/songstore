/**
 * frontend/utils/api.js
 * API client for calling backend
 */

const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:3000';

/**
 * เรียก API จาก Backend พร้อมจัดการ error
 */
async function callAPI(method, endpoint, data = null) {
  try {
    const url = `${API_URL}${endpoint}`;
    let response;
    
    switch (method) {
      case 'GET':
        response = await axios.get(url);
        break;
      case 'POST':
        response = await axios.post(url, data);
        break;
      case 'PUT':
        response = await axios.put(url, data);
        break;
      case 'DELETE':
        response = await axios.delete(url);
        break;
      default:
        throw new Error('Method not supported');
    }
    
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`API ${method} ${endpoint}:`, error.response.data);
      throw new Error(error.response.data.message || 'Server error');
    } else if (error.request) {
      console.error(`API ${method} ${endpoint}: No response`);
      throw new Error('Cannot connect to server');
    } else {
      console.error(`API ${method} ${endpoint}:`, error.message);
      throw error;
    }
  }
}

module.exports = callAPI;
