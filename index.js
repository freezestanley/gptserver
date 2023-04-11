//👇🏻index.js
const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv')
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const PORT = 4000;
dotenv.config()
const GPT_API_KEY = process.env.GPT_API_KEY


if (!GPT_API_KEY) {
    console.log("请配置 ChatGPT API Key")
    return
}

const configuration = new Configuration({
    apiKey: GPT_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

app.post("/convert", async (req, res) => {
    //👇🏻 解构 JSON 对象
    let { value } = req.body;

    //👇🏻 向 ChatGPT 提问
    const prompt = `Convert the JSON object into Typescript interfaces \n ${value} Please, I need the only the code, I don't need any explanations.`;

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
    });


    res.json({
        message: "Successful",
        response: completion.data.choices[0].message.content,
    });
});

app.post("/comments", async (req, res) => {
    //👇🏻 解构 JSON 对象
    let { value } = req.body;

    //👇🏻 向 ChatGPT 提问
    const prompt = `Add Chinese comments for each line of code, \n I need the only the code, I don't need any explanations ${value} \n`;
    console.log('================================================================')
    console.log(prompt)
    console.log('================================================================')

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
    });


    res.json({
        message: "Successful",
        response: completion.data.choices[0].message.content,
    });
});

app.post("/mock", async (req, res) => {
    //👇🏻 解构 JSON 对象
    let { value } = req.body;

    //👇🏻 向 ChatGPT 提问
    const prompt = `根据这段数据格式 \n ${value} \n 生成2条测试数据并被包含在一个数组里, I need the mock data, I don't need any explanations.`;
    console.log('================================================================')
    console.log(prompt)
    console.log('================================================================')
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
    });


    res.json({
        message: "Successful",
        response: completion.data.choices[0].message.content,
    });
});

app.listen(PORT, () => {
    console.log(`Node.js 服务正在监听 ${PORT} 端口 ...`);
});