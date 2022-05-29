import axios from "axios";

const BASE_URL = "http://192.168.1.42:8000/";

export function register(name, email, password) {
  return axios.post(BASE_URL + "user/register", { name, email, password });
}

export function login(email, password) {
  return axios.post(BASE_URL + "user/login", { email, password });
}

export function getCompanies() {
  return axios.get(BASE_URL + "company");
}
export function createCompany(name, legalNumber, country, webSite) {
  return axios.post(BASE_URL + "company", {
    name,
    legalNumber,
    country,
    webSite,
  });
}

export function getCompany(id) {
  return axios.get(BASE_URL + "company/" + id);
}
export function editCompany(id, name, legalNumber, country, webSite) {
  return axios.put(BASE_URL + "company/" + id, {
    name,
    legalNumber,
    country,
    webSite,
  });
}
export function deleteCompany(id) {
  return axios.delete(BASE_URL + "company/" + id);
}

export function getProducts(companyId) {
  return axios.get(BASE_URL + "product/list/" + companyId);
}

export function createProduct(
  name,
  category,
  amount,
  amountUnit,
  companyName,
  companyId
) {
  return axios.post(BASE_URL + "product", {
    name,
    category,
    amount,
    amountUnit,
    companyName,
    companyId,
  });
}
export function editProduct(
  id,
  name,
  category,
  amount,
  amountUnit,
  companyName,
  companyId
) {
  return axios.put(BASE_URL + "product/" + id, {
    name,
    category,
    amount,
    amountUnit,
    companyName,
    companyId,
  });
}
export function deleteProduct(id) {
  return axios.delete(BASE_URL + "product/" + id);
}
export function getProduct(id) {
  return axios.get(BASE_URL + "product/" + id);
}

export function getAllProducts() {
  return axios.get(BASE_URL + "product");
}

export function getDashboard() {
  return axios.get(BASE_URL + "company/general/dashboard");
}
