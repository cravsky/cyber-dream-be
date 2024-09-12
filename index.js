const PORT = process.env.PORT || 8000;
const express = require('express')
const cors = require('cors')
const OpenAi = require('openai');
require('dotenv').config();

const app = express()
app.use(express.json())
app.use(cors())

const openai = new OpenAi({ apiKey: process.env.OPENAI_API_KEY });

app.post('/interpret', async (req, res) => {
    const text = req.body.text || "Who invented AI?";


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


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})