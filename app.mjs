import express from 'express';
import cors from 'cors'
const app = express()
const port = process.env.PORT || 3000
let list = []
app.use(express.json())
app.use(cors())
app.post('/todo', (req, res) => {
    list.push(req.body.text);
    res.send({
        massage: "Your item added",
        data: list
    })
})
app.get('/list', (req, res) => {
    res.send({
        massage: "list",
        data: list

    })
})
app.delete('/remove', (req, res) => {
    list = []
    res.send("Items deleted")
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})