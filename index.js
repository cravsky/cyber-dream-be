const PORT = process.env.PORT || 8000;
const express = require('express')
const cors = require('cors')
const OpenAi = require('openai');
require('dotenv').config();

const app = express()
app.use(express.json())
app.use(cors())
app.use(cors({
    origin: 'http://localhost:5173' // Zezwolenie na połączenia z localhost:5173
}));

const openai = new OpenAi({ apiKey: process.env.OPENAI_API_KEY });

app.post('/interpret', async (req, res) => {
    const text = req.body.text || "I was flying in the sky";

    res.send({
        "response": "Mockup odpowiedzi. Twoje marzenie o nieokreślonym mieście, w którym uciekasz przed zamaskowanymi napastnikami, odzwierciedla głęboko zakorzenione lęki oraz pragnienia związane z ucieczką przed trudnościami lub odpowiedzialnością, które czujesz w swoim codziennym życiu. Miasto, w którym się znajdujesz, jest symbolem twojego umysłu – chaotycznego, niepewnego, pełnego niezrealizowanych ambicji, w którym ciągle stawiasz czoła nowym wyzwaniom. Ucieczka, podczas gdy nie możesz się ruszać, wskazuje na uczucie bezsilności i frustracji, które mogą wynikać z sytuacji życiowych, w których czujesz ograniczenia, być może w relacjach osobistych lub zawodowych. Zatrzymanie w obliczu niebezpieczeństwa ukazuje wewnętrzny konflikt; chcesz zyskać kontrolę nad swoim życiem, lecz napotykasz przeszkody.\n\nObudziłeś się w momencie, gdy napastnicy cię dopadli, co może sugerować, że musisz zmierzyć się z problemami, które ignorujesz. To wyzwanie może być trudne, ale jego przezwyciężenie przyniesie ci ulgę i wyzwolenie. Przyszłość przynosi okazje do rozwoju oraz uwolnienia się od krępujących lęków, lecz będziesz musiał stawić czoła swoim obawom, aby móc je pokonać i przeobrazić swoje życie. Bądź otwarty na zmiany i skorzystaj z ich potencjału, aby zbudować rzeczywistość, o której marzysz. \n\nJak mówi przysłowie: \"Nie ma większej odwagi niż stawienie czoła własnym lękom.\""
    })

    // const completion = await openai.chat.completions.create({
    //     messages: [{
    //         "role": "system",
    //         "content": "You are a fortune teller. Provide a dream interpretation. No bullet points. No ambiguity. Let your answer be a narrative. Finish with a quote. Predict what the future holds."
    //     },
    //     {
    //         "role": "user",
    //         "content": text
    //     }],
    //     model: "gpt-4o-mini",
    //     max_tokens: 2048,
    // })

    // console.log(completion)
    // console.log(completion.choices[0].message.content)

    // res.send({ response: completion.choices[0].message.content })

})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})