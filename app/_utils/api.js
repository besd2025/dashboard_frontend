import axios from "axios";

const server = process.env.NEXT_PUBLIC_API_URL; // URL du serveur API

// Fonction pour lire le token côté client uniquement
const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return cookieStore.get("accessToken")?.value || null;
  }
  return null;
};
// Création d'une instance Axios
export const api = axios.create({
  baseURL: server,
  headers: {
    "Content-Type": "application/json",
    "X-Signature-web": process.env.NEXT_PUBLIC_SIGNATURE, // Signature personnalisée
  },
});

// Intercepteur pour ajouter le token à chaque requête si présent
api.interceptors.request.use(
  (config) => {
    const access_token = getAccessToken();
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fonction générique pour faire des appels API
export const fetchData = async (
  method,
  url,
  { params = {}, body = null, additionalHeaders = {} } = {}
) => {
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

    return method === "get" ? response.data : response.status;
  } catch (error) {
    console.error("Request failed", error);
    throw error;
  }
};
