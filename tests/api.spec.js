import { test, expect, request } from '@playwright/test';

const newBooking = {
  firstname: 'Ed',
  lastname: 'Chekanov',
  totalprice: 1000,
  depositpaid: true,
  bookingdates: {
    checkin: '2025-10-23',
    checkout: '2025-11-07',
  },
};
const updatedBooking = {
  firstname: 'Ivan',
  lastname: 'Aleksev',
  totalprice: 5000,
  depositpaid: true,
  bookingdates: {
    checkin: '2025-10-24',
    checkout: '2025-11-07',
  },
};
let bookingId;
let token;

test.describe('API-тесты для Restful-booker', () => {
  const baseURL = 'https://restful-booker.herokuapp.com';

  test('Создание бронирования (Create - POST)', async ({ request }) => {
    const response = await request.post(`${baseURL}/booking`, {
      data: newBooking,
    });

    expect(response.status()).toBe(200);

    const createdBooking = await response.json();
    expect(createdBooking).toHaveProperty('bookingid');
    bookingId = createdBooking.bookingid;
    expect(createdBooking.booking).toMatchObject(newBooking);
  });

  test('Получение информации о бронировании (Read - GET)', async ({
    request,
  }) => {
    const response = await request.get(`${baseURL}/booking/${bookingId}`);

    expect(response.status()).toBe(200);

    const gottenBooking = await response.json();
    expect(gottenBooking).toMatchObject(newBooking);
  });

  test('Обновление бронирования (Update - PUT)', async ({ request }) => {
    const authResponse = await request.post(`${baseURL}/auth`, {
      data: {
        username: 'admin',
        password: 'password123',
      },
    });

    const authInfo = await authResponse.json();
    token = authInfo.token;

    const response = await request.put(`${baseURL}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
      data: updatedBooking,
    });

    expect(response.status()).toBe(200);

    const gottenBooking = await response.json();
    expect(gottenBooking).toMatchObject(updatedBooking);
  });

  test('Удаление бронирования (Delete - DELETE)', async ({ request }) => {
    const response = await request.delete(`${baseURL}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    expect(response.status()).toBe(201);

    const getResponse = await request.get(`${baseURL}/booking/${bookingId}`);

    expect(getResponse.status()).toBe(404);
  });
});
