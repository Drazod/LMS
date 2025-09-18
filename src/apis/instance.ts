import axios from 'axios'
import { API_URL } from "@/configs/ApiConfig";

const API = axios.create({
	baseURL: API_URL,
});

export default API