const app = require("./app");
// const config = require('config')
// const path = require('path');

const host = process.env.APP_HOST
const port = process.env.APP_PORT



app.listen(port, () => {
    console.log(`Galaxy Node app is listening at http://${host}:${port}`)
})