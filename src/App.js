import { useState, useEffect } from "react";
import http from "./config/http";
import { saveLocalStorage, getToken } from "./config/auth";

function App() {
  const [me, setMe] = useState(null);

  const newHerokuLink =
    "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https%3A%2F%2Fagger-test.herokuapp.com%2Fauth%2Fgoogle&client_id=674936621759-7vk2uua66megncl9e4sbhhlgt3a55tk2.apps.googleusercontent.com&access_type=offline&response_type=code&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payload = params.get("payload");
    if (payload) {
      saveLocalStorage(JSON.parse(payload));
    }
    if (getToken()) {
      async function getMe() {
        await http
          .get("/auth/me", {
            withCredentials: true,
          })
          .then((res) => setMe(res.data));
      }
      getMe();
    }
  }, []);

  if (me) {
    return <p>hi {JSON.stringify(me)}</p>;
  }

  const authUser = async () => {
    const { data } = await http.post("/auth/", {
      email: "wagner@email.com",
      password: "123456",
    });
    saveLocalStorage(data);
    http.defaults.headers["x-auth-token"] = data.token;
  };

  return (
    <div className="App">
      <a href={newHerokuLink}>LOGIN WITH GOOGLE</a>
      <button onClick={() => authUser()}> auth </button>
    </div>
  );
}

export default App;
