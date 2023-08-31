import axios, { InternalAxiosRequestConfig } from "axios";

export const AxiosInstance = axios.create({
  baseURL: "https://api.imgur.com/3",
  headers: {
    Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
  }
})

AxiosInstance.interceptors.request.use((config): InternalAxiosRequestConfig => {
  console.log('requesting url ', config.url);
  return {
    ...config
  }
})
