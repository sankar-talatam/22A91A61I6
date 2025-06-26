const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const credentials = {
  email: "22a91a61i6@aec.edu.in",
  name: "talatam durga naga sai sankar",
  rollNo: "22A91A61I6",
  clientID: "d06359b0-6c94-4f48-aded-09ccd3daf25a",
  clientSecret: "vckrbNyqjSxDzvTJ",
  accessCode: "NFwgRT"
};

const apiUrl = "http://20.244.56.144/evaluation-service/auth";

(async () => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    });

    const data = await response.json();

    console.log("🌐 Full Response:", data);

    if (data.access_token) {
      console.log("✅ New Access Token:", data.access_token);
    } else {
      console.error("❌ No access_token found in response.");
    }
  } catch (error) {
    console.error("❌ Failed to fetch token:", error);
  }
})();
