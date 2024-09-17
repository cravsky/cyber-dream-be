const PORT = process.env.PORT || 3000;
const express = require('express')
const cors = require('cors')
const OpenAi = require('openai');
require('dotenv').config();

const app = express()
app.use(express.json())

function setCorsHeaders(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
}

app.use(setCorsHeaders);


// const corsOptions = {
//     origin: 'https://cravsky.github.io/cyber-dream/', // Replace with the actual GitHub Pages URL
//     methods: ['POST', 'GET', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// };
// app.use(cors(corsOptions))
app.use(cors())

const openai = new OpenAi({ apiKey: process.env.OPENAI_API_KEY });

app.options('*', cors())
app.post('/api', async (req, res) => {
    const text = req.body.text || "I was flying in the sky";

    const completion = await openai.chat.completions.create({
        messages: [{
            "role": "system",
            "content": "You are a fortune teller. Provide a dream interpretation. No bullet points. No ambiguity. Let your answer be a narrative. Finish with a quote. Predict what the future holds."
        },
        {
            "role": "user",
            "content": text
        }],
        model: "gpt-4o-mini",
        max_tokens: 2048,
    })

    console.log(completion)
    console.log(completion.choices[0].message.content)

    res.send({ response: completion.choices[0].message.content })

})

app.post('/api/test', async (req, res) => {

    res.send({
        "response": "Mockup odpowiedzi. Wszystko działa!"
    })
})

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`)
})