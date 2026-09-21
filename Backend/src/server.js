import app from "./app/app.js"
import config from "./config/config.js";
import connectDB from "./config/db.js";

await connectDB();

const port = config.PORT;

app.listen(port, () => {
    console.log(`Server is Listning on port number ${port}`);
})