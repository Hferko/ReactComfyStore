import axios from "axios";

const productionUrl = 'https://strapi-store-server.onrender.com/api';

export const customFetch = axios.create({
  baseURL: productionUrl,
})

export const formatPrice = (price) => {
  const euroAmount = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency:  'EUR'
  }).format((price/100).toFixed(2));
  return euroAmount;
}