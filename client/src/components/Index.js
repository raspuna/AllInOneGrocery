import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import GoogleMapAPI from "./util/GoogleMapPlace";
function Index() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/user/getLoggedInUser`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Header user={user} />
      {user && <GoogleMapAPI user={user} />}
      <div>Store List HERE</div>
    </div>
  );
}

export default Index;
