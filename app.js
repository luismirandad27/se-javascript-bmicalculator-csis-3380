const express = require("express");
const app = express();

// Set pug as the view engine
app.set("view engine", "pug");
app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Listening on port 3000
app.listen(3000, () => {
  console.log("The application is running on localhost:3000!");
});

// Get method to render index page
app.get("/", (req, res) => {
  res.render("index");
});

// Post method to calculate BMI
app.post("/bmi", (req, res) => {
    
    // Getting the variables from the form
    const age = req.body.age;
    const height = req.body.height;
    const weight = req.body.weight;

    // Validating if the values are empty
    if (!age || !height || !weight) {
        res.render("index", { result: "Please enter all the fields." });
        return;
    }

    // Making validations for the inputs
    if (isNaN(age) || age <= 0) {
        res.render("index", { result: "Please enter a valid age." });
        return;
    }

    if (isNaN(height) || height <= 0) {
        res.render("index", { result: "Please enter a valid height." });
        return;
    }

    if (isNaN(weight) || weight <= 0) {
        res.render("index", { result: "Please enter a valid weight." });
        return;
    }

    // Calculating the BMI (formula is 
    const bmi = parseFloat(weight) / (parseFloat(height) * parseFloat(height) * 0.0001);

    res.render("index", { result: `Your BMI Result is: ${bmi.toFixed(1)}` , age: age, height: height, weight: weight});
    return;

});