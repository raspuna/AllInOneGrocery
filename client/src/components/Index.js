import React from "react";
import Header from "./Header";
import GoogleMapAPI from "./util/GoogleMapPlace";
function Index() {
  return (
    <div>
      <Header />
      <GoogleMapAPI />
      <div>Store List HERE</div>
    </div>
  );
}

export default Index;
