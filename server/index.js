const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

const run = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@small-blog.1wwj7up.mongodb.net/?retryWrites=true&w=majority`
  );
  console.log('MongoBD is Connected');
};
run().catch((err) => console.log(err));


app.get('/',(req,res)=>{
  res.send ('Server is OK')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
