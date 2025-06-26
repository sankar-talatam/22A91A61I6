const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

(async () => {
  // Import fetch dynamically and wait
  const fetch = (await import('node-fetch')).default;

  // const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMmE5MWE2MWk2QGFlYy5lZHUuaW4iLCJleHAiOjE3NTA5MjEzMjEsImlhdCI6MTc1MDkyMDQyMSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjUyMTVhZTlhLTBkMTgtNDJlYy04MmY2LTI5ZDY2NGNlODU1MiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InRhbGF0YW0gZHVyZ2EgbmFnYSBzYWkgc2Fua2FyIiwic3ViIjoiZDA2MzU5YjAtNmM5NC00ZjQ4LWFkZWQtMDljY2QzZGFmMjVhIn0sImVtYWlsIjoiMjJhOTFhNjFpNkBhZWMuZWR1LmluIiwibmFtZSI6InRhbGF0YW0gZHVyZ2EgbmFnYSBzYWkgc2Fua2FyIiwicm9sbE5vIjoiMjJhOTFhNjFpNiIsImFjY2Vzc0NvZGUiOiJORndnUlQiLCJjbGllbnRJRCI6ImQwNjM1OWIwLTZjOTQtNGY0OC1hZGVkLTA5Y2NkM2RhZjI1YSIsImNsaWVudFNlY3JldCI6InZja3JiTnlxalN4RHp2VEoifQ.x0uYNh187loFaSRPqPuoVcpApRlQIvpjFsmmUp_OT04"; // full token
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMmE5MWE2MWk2QGFlYy5lZHUuaW4iLCJleHAiOjE3NTA5MjM4ODQsImlhdCI6MTc1MDkyMjk4NCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImIxMDdmYmZkLWVhMmMtNDA1OS05Mzk1LWVmYmI2MmI1MGFiZCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InRhbGF0YW0gZHVyZ2EgbmFnYSBzYWkgc2Fua2FyIiwic3ViIjoiZDA2MzU5YjAtNmM5NC00ZjQ4LWFkZWQtMDljY2QzZGFmMjVhIn0sImVtYWlsIjoiMjJhOTFhNjFpNkBhZWMuZWR1LmluIiwibmFtZSI6InRhbGF0YW0gZHVyZ2EgbmFnYSBzYWkgc2Fua2FyIiwicm9sbE5vIjoiMjJhOTFhNjFpNiIsImFjY2Vzc0NvZGUiOiJORndnUlQiLCJjbGllbnRJRCI6ImQwNjM1OWIwLTZjOTQtNGY0OC1hZGVkLTA5Y2NkM2RhZjI1YSIsImNsaWVudFNlY3JldCI6InZja3JiTnlxalN4RHp2VEoifQ.0ywarxZZdMd8XIjrWMWCces6AOcsfdXhbTmalxHQXpQ";

  async function logToServer(stack, level, packageName, message) {
    const apiUrl = "http://20.244.56.144/evaluation-service/logs";

    const requestBody = {
      stack,
      level,
      package: packageName,
      message
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      console.log("✅ Log response:", data);
    } catch (error) {
      console.error("❌ Error logging:", error);
    }
  }

  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");

      app.listen(3001, async () => {
        console.log('Server running on port 3001');
        await logToServer("Backend", "INFO", "server.js", "Server started successfully on port 3001");
      });
    })
    .catch(async (err) => {
      console.error("❌ MongoDB connection error:", err);
      await logToServer("Backend", "ERROR", "server.js", `MongoDB connection failed: ${err.message}`);
    });

})();
