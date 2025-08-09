const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
app.post('/api/chat', async (req, res) => {
    try {
      // Accept either full messages array or a single message in `message`
      const { messages, message, model } = req.body;
  
      const payload = {
        model: model || 'llama-3.3-70b-versatile', // use any model name from Groq docs
        messages: messages || [{ role: 'user', content: message || 'Hello' }]
      };
  
      const groqRes = await axios.post(GROQ_URL, payload, {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 60000
      });
  
      // OpenAI-compatible response shape: choices[0].message.content
      const reply = groqRes.data?.choices?.[0]?.message?.content 
                  || groqRes.data?.choices?.[0]?.text 
                  || JSON.stringify(groqRes.data);
  
      res.json({ reply, raw: groqRes.data });
    } catch (err) {
      console.error('Groq error:', err.response?.data || err.message);
      res.status(err.response?.status || 500).json({ error: err.response?.data || err.message });
    }
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));