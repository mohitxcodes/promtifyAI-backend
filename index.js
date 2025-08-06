const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const {OpenAI} = require("openai")

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI(
    {
        apiKey: process.env.OPENAI_API_KEY,
    }
)

app.post('/chat', async (req, res) => {
    const {messages} = req.body;
    try {
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages,
        })

    } catch (error) {
        
    }
})