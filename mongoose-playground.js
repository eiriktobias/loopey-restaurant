const { mongoose, Schema } = require("mongoose");

const Pizza = require("./models/Pizza.model");

mongoose
  .connect("mongodb://127.0.0.1:27017/loopeyRestaurant")
  .then((response) => {
    console.log(`Connected! Database Name: "${response.connections[0].name}"`);

    const pizzaOne = {
      title: "veggie",
      price: 12,
      dough: "classic",
    };

    //create a new document (a new pizza)
    return Pizza.create(pizzaOne);
  })
  .then((pizzaFromDB) => {
    console.log("a new pizza was created with id...", pizzaFromDB._id);
    return Pizza.find({ title: "margarita" });
  })
  .then((pizzasArr) => {
    console.log("I currently have this amount of pizzas...", pizzasArr.length);
    console.log(pizzasArr);

    //Model.findByIdAndUpdate(id, update [, options])
    return Pizza.findByIdAndUpdate(
      "6478ab28253a612d34d1b97f",
      { price: 20 },
      { returnDocument: "after" }
    );
  })
  .then((updatedPizzaFromDB) => {
    console.log("luis, your pizza was updated....");
    console.log(updatedPizzaFromDB);
  })
  .catch((err) => console.error("Error connecting to DB", err));
