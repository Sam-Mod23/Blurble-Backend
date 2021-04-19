import axios from "axios";

const request = axios.create({
  baseURL: "https://www.googleapis.com/books",
});

export const fetchBook = (title) => {
  return request
    .get("/v1/volumes", {
      params: {
        q: title,
      },
    })
    .then((data) => {
      return data.data.items;
    });
};
