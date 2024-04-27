const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

const categories = require("./data/categories.json");
const news = require("./data/news.json");

app.get("/", (req, res) => {
  res.send("News server");
});

app.get("/news-categories", (req, res) => {
  res.send(categories);
});

app.get('/news', (req,res)=>{
    res.send(news)
})

app.get("/news/:id", (req, res) => {
  const id = req.params.id;
  const selectedNews = news.find((n) => n._id === id);
  res.send(selectedNews);
  console.log(req.params.id);
});

app.get("/category/:id", (req, res) => {
  const categoryId = req.params.id;
  if (categoryId === "0") {
    res.send(news);
  } else {
    const categoryNews = news.filter((n) => n.category_id === categoryId);
    res.send(categoryNews);
  }
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
