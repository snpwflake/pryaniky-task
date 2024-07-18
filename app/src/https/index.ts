import axios from "axios";

const HOST = "https://test.v5.pryaniky.com";
const $api = axios.create({
  baseURL: HOST,
  headers: {
    "Content-Type": "application/json",
    "x-auth": localStorage.getItem("token") || "",
  },
});

export default $api;
