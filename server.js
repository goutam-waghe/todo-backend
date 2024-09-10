import { app } from "./app.js";
import { dbConnect } from "./database/dbConnect.js";
dbConnect();
app.listen(process.env.PORT, () => {
  console.log(`server is listing on port ${process.env.PORT}`);
});
