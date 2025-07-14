import axios from "axios";

const server = process.env.NEXT_PUBLIC_API_URL;

/* ------------------------------------------------------------------ */
/*  Récupère le token (localStorage)                                   */
/* ------------------------------------------------------------------ */
const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken") || null;
  }
  return null;
};

/* ------------------------------------------------------------------ */
/*  Instance Axios SANS Content‑Type par défaut                        */
/* ------------------------------------------------------------------ */
export const api = axios.create({
  baseURL: server,
  headers: {
    "X-Signature-web": process.env.NEXT_PUBLIC_SIGNATURE,
  },
});

/* ------------------------------------------------------------------ */
/*  Interceptor : ajoute automatiquement le Bearer token              */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/*  Fonction générique fetchData                                      */
/* ------------------------------------------------------------------ */
export const fetchData = async (
  method,
  url,
  { params = {}, body = null, additionalHeaders = {} } = {}
) => {
  try {
    const headers = { ...additionalHeaders };
    let finalBody = body;

    // ➜ Si ce n’est PAS du FormData → JSON
    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
      finalBody = body ? JSON.stringify(body) : null;
    }
    // ➜ Sinon, on laisse Axios gérer le multipart/form‑data

    const response = await api({
      method,
      url,
      params,
      data: finalBody,
      headers,
    });

    return method.toLowerCase() === "get" ? response.data : response.status;
  } catch (error) {
    console.error("❌ API Request Error:", error);
    throw error;
  }
};
