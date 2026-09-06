import { test, expect } from '@playwright/test';
import 'dotenv/config';
import process from 'process';

test('POST /API/login - valid credentials returns 200', async ({ request }) => {
  const response = await request.post('https://www.ndosiautomation.co.za/API/login', {
    data: {
      email: process.env.NDOSI_EMAIL,
      password: process.env.NDOSI_PASSWORD,
    },
  });

  expect(response.status()).toBe(200);


});

 test('POST /API/login - invalid credentials', async ({ request }) => {
  const response = await request.post('https://www.ndosiautomation.co.za/API/login', {
    data: {
      email: process.env.NDOSI_EMAIL,
      password: 'wrong-password-123',
    },
  });

  console.log('Status for bad login:', response.status());
  expect(response.status()).toBe(401);
});

test('GET /API/profile - with valid token returns 200', async ({ request }) => {
  const loginResponse = await request.post('https://www.ndosiautomation.co.za/API/login', {
    data: {
      email: process.env.NDOSI_EMAIL,
      password: process.env.NDOSI_PASSWORD,
    },
  });
  const loginBody = await loginResponse.json();
  const token = loginBody.data.token;

  const profileResponse = await request.get('https://www.ndosiautomation.co.za/API/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log('Profile fetch status:', profileResponse.status());
  expect(profileResponse.status()).toBe(200);
});

test('GET /API/profile - no token returns 401', async ({ request }) => {
  const response = await request.get('https://www.ndosiautomation.co.za/API/profile');
  console.log('Profile fetch status with no token:', response.status());
  expect(response.status()).toBe(401);
});

test('POST /API/profile/image - no auth token returns 401', async ({ request }) => {
  const response = await request.post('https://www.ndosiautomation.co.za/API/profile/image', {
    multipart: {
      image: {
        name: 'Peony.jpeg',
        mimeType: 'image/jpeg',
        buffer: require('fs').readFileSync('test-data/Peony.jpeg'),
      },
    },
  });

  console.log('Status with no auth:', response.status());
});

test('POST /API/profile/image - valid token returns 200', async ({ request }) => {
  const loginResponse = await request.post('https://www.ndosiautomation.co.za/API/login', {
    data: {
      email: process.env.NDOSI_EMAIL,
      password: process.env.NDOSI_PASSWORD,
    },
  });
  const loginBody = await loginResponse.json();
  const token = loginBody.data.token;

  const uploadResponse = await request.post('https://www.ndosiautomation.co.za/API/profile/image', {
    headers: { Authorization: `Bearer ${token}` },
    multipart: {
  profilePicture: {
    name: 'Peony.jpeg',
    mimeType: 'image/jpeg',
    buffer: require('fs').readFileSync('test-data/Peony.jpeg'),
  },
},
  });

  console.log('Authenticated upload status:', uploadResponse.status());
  console.log('Authenticated upload status:', uploadResponse.status());
console.log('Response body:', await uploadResponse.text());
  expect(uploadResponse.status()).toBe(200);
});