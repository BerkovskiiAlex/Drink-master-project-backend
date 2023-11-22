/** @format */

import axios from "axios";

const body = {
  drink: "Hydra",
  category: "Cocktail",
  description: "Cool and refreshing",
  instructions: "Mix and serve over ice",
  glass: "Cocktail glass",
  alcoholic: "Non alcoholic",
  ingredients: [
    {
      title: "Light rum",
      ingredientId: "64aebb7f82d96cc69e0eb4a4",
    },
    {
      title: "Applejack",
      ingredientId: "64aebb7f82d96cc69e0eb4a5",
    },
  ],
};

const request = async (body) => {
  axios.post("http://localhost:3000/api/drinks/own/add", body, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWM3ODYyZGRmYjRjZWI2MjRmZGZlOSIsImlhdCI6MTcwMDU1ODk2MywiZXhwIjoxNzAwNjQxNzYzfQ.WytRWkI4FXoqSHiV6A0g-R9V8OzeqH0L4OAWBan6Ijc",
    },
  });
};

request(body);
