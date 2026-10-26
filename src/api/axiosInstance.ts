import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

// Lists are paginated on the server (10 by default); 100 is the maximum it allows
export const MAX_PAGE_SIZE = 100;

export default axios.create({
    baseURL: baseUrl
})
