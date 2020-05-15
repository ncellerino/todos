import app from "./app";
import { PORT } from "./config/Environment";

app.listen(PORT, function() {
  console.log(`Example app listening on port ${PORT}!`);
});
