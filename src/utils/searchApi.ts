import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/search";

export const searchAll = async (keyword: string) => {
  const response = await axios.get(`${BASE_URL}/all`, {
    params: { keyword },
  });
  return response.data;
};

export const searchSongs = async (keyword: string) => {
  const response = await axios.get(`${BASE_URL}/songs`, {
    params: { keyword },
  });
  return response.data;
};

export const searchArtists = async (keyword: string) => {
  const response = await axios.get(`${BASE_URL}/artists`, {
    params: { name: keyword },
  });
  return response.data;
};

export const searchAlbums = async (keyword: string) => {
  const response = await axios.get(`${BASE_URL}/albums`, {
    params: { title: keyword },
  });
  return response.data;
};
