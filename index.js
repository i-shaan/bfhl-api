import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const FULL_NAME = "john_doe"; 
const DOB = "17091999";      
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input, data must be an array",
      });
    }

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let concatLetters = [];

    data.forEach((item) => {
      if (/^-?\d+$/.test(item)) {
        const num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(item.toString());
        } else {
          odd_numbers.push(item.toString());
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        concatLetters.push(...item.split(""));
      } else {
        special_characters.push(item);
      }
    });


    concatLetters = concatLetters.reverse();
    let concat_string = concatLetters
      .map((ch, idx) =>
        idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
      )
      .join("");

    const response = {
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    };

    console.log("Successful /bfhl request:", {
      user_id: response.user_id,
      sum: response.sum,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters
    });

    return res.status(200).json(response);
  } catch (err) {
    console.error("Error in /bfhl:", err.message);
    return res.status(500).json({
      is_success: false,
      message: "Server error",
      error: err.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
