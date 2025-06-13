import axios from "axios";

const server = process.env.NEXT_PUBLIC_API_URL; // URL du serveur API

// Fonction pour obtenir le token d'accès
/*const getAccessToken = () => {
  return request.cookies.get('accessToken')?.value;// Récupère le token depuis localStorage
}; */
// Fonction pour lire le cookie côté client
const getAccessToken = () => {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(new RegExp('(^| )accessToken=([^;]+)'));
    return match ? match[2] : null;
  }
  return null;
};

export const api = axios.create({
  baseURL: server,
  headers: {
    'Content-Type': 'application/json',
    'X-Signature-web': process.env.NEXT_PUBLIC_SIGNATURE, // Signature pour la sécurité
  },
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use((config) => {
  const access_token = getAccessToken();
  console.log("Access Token:", access_token);
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const fetchData = async (method, url, { params = {}, body = null, additionalHeaders = {} } = {}) => {
  try {
    const headers = {
      ...additionalHeaders,
    };

    const response = await api({
      method,
      url,
      params,
      data: body,
      headers,
    });

    if (method === "get") {
      return response.data;
    } else {
      return response.status;
    }
  } catch (error) {
    console.error('Request failed', error);
    throw error;  
  }
};