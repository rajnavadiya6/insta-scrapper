const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  getMediaByCode,
  getUserByUsername,
  getMediaByLocation,
  getMediaByTag,
  getMediaLikesByCode,
  getMediaCommentsByCode,
  generalSearch,
  getUserIdFromUsername,
  getUserProfilePicture,
  getTaggedUsersByCode,
  getMediaOwnerByCode,
} = require("instapro");
const ig = require("instagram-scraping");
const userInstagram = require("user-instagram");

app.use(cors());
app.use(bodyParser.json());

app.get("/api1", async (req, res) => {
  const { search } = req.query;
  //   const media = await getUserByUsername("akhaykumar");
  const data = await generalSearch(search);
  res.json(data);
});

app.get("/scrapeTag", async (req, res) => {
  const { search } = req.query;
  const media = await ig.scrapeTag(search);
  res.json(media);
});

app.get("/userInstagram", async (req, res) => {
  const { search } = req.query;
  const data = await generalSearch(search);
  const detailsusers = await Promise.all(
    data.users.map(async (item) => await userInstagram(item.user.username))
  );
  data.users = detailsusers;
  // const media = await userInstagram(search);
  res.json(data);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
