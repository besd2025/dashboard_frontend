import axios from "axios";

const server = process.env.NEXT_PUBLIC_API_URL;

// ✅ Lire un cookie spécifique côté client
// const getAccessToken = () => {
//   if (typeof window !== "undefined") {
//     const cookies = document.cookie.split("; ");
//     console.log(cookies);
//     const accessTokenCookie = cookies.find((row) =>
//       row.startsWith("accessToken=")
//     );
//     console.log(accessTokenCookie?.split("=")[1]);
//     return accessTokenCookie?.split("=")[1] || null;
//   }
//   return null;
// };

// const getAccessToken = () => {
//   if (typeof window !== "undefined") {
//     const cookies = document.cookie.split("; ");
//     const accessTokenCookie = cookies.find((row) =>
//       row.startsWith("accessToken=")
//     );
//     if (!accessTokenCookie) return null;
//     const token = accessTokenCookie.split("=")[1];
//     return token || null;
//   }
//   return null;
// };
const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken") || null;
  }
  return null;
};
// ✅ Instance Axios
export const api = axios.create({
  baseURL: server,
  headers: {
    "Content-Type": "application/json",
    "X-Signature-web": process.env.NEXT_PUBLIC_SIGNATURE,
  },
});

// ✅ Ajouter automatiquement le token aux requêtes
api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Fonction générique de requête
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
    console.error("❌ API Request Error:", error);
    throw error;
  }
};
