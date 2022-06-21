import axios from "axios";
import { getToken } from "./auth";

// Instância do cliente HTTP para as requisições
const http = axios.create({
  baseURL: "https://agger-test.herokuapp.com",
});

// Padronizar requisições com json
http.defaults.headers["Content-type"] = "application/json";

// verificação se existe token
if (getToken()) {
  http.defaults.headers["x-auth-token"] = getToken();
}

export default http;
