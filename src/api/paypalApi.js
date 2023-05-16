// const baseUrl = 'https://api.sandbox.paypal.com';
const baseUrl = "https://api-m.sandbox.paypal.com";
var base64 = require("base-64");
import axios from "axios";
let clientId =
  "AQl4zv6sYhOq7N5bcOSXSXTVB3o3qWyIvRzXn5IFCF5XSBaBsPSodZOeAO3-6SOMl9llyPOWBBwJsRSW";
let secretKey =
  "EGOpa53RGGRFlZle4oqeKR_HMyruc_1oJde7FUQNma6QjM-__Xe_wT0OmNvQajyWx0g_DgFlw5VA2ss3";

// let orderDetail = {
//   intent: 'CAPTURE',
//   purchase_units: [
//     {
//       items: [
//         {
//           name: 'Create Account',
//           description: '',
//           quantity: '1',
//           unit_amount: {
//             currency_code: 'USD',
//             value: '1.00',
//           },
//         },
//       ],
//       amount: {
//         currency_code: 'USD',
//         value: '1.00',
//         breakdown: {
//           item_total: {
//             currency_code: 'USD',
//             value: '1.00',
//           },
//         },
//       },
//     },
//   ],
//   application_context: {
//     return_url: 'https://example.com/return',
//     cancel_url: 'https://example.com/cancel',
//   },
// };

const generateToken = () => {
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append(
    "Authorization",
    "Basic " + base64.encode(`${clientId}:${secretKey}`)
  );

  var requestOptions = {
    method: "POST",
    headers: headers,
    body: "grant_type=client_credentials",
  };
  return new Promise((resolve, reject) => {
    fetch(baseUrl + "/v1/oauth2/token", requestOptions)
      .then((response) => response.text())
      .then((response) => {
        let { access_token } = JSON.parse(response);
        resolve(access_token);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const createOrder = (token = "", orderDetail) => {
  console.log("order detail pass..", orderDetail);
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderDetail),
  };

  return new Promise((resolve, reject) => {
    fetch(baseUrl + "/v2/checkout/orders", requestOptions)
      .then((response) => response.text())
      .then((response) => {
        let res = JSON.parse(response);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const capturePayment = (id, token = "", orderDetail) => {
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderDetail),
  };

  return new Promise((resolve, reject) => {
    fetch(baseUrl + `/v2/checkout/orders/${id}/capture`, requestOptions)
      .then((response) => response.text())
      .then((response) => {
        let res = JSON.parse(response);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {
  generateToken,
  createOrder,
  capturePayment,
};
