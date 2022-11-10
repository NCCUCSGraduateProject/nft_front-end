import { useState, useEffect } from "react";
import NFTBlock from "./NFTBlock";
function NFTLike() {
  const [list, setList] = useState([]);
  useEffect(() => {
    function checkUserData() {
      let uriList = window.localStorage.getItem("like");
      if (uriList) {
        uriList = JSON.parse(uriList);
        setList(uriList);
      }
    }
    checkUserData();
    window.addEventListener("storage", checkUserData);
    return () => {
      window.removeEventListener("storage", checkUserData);
    };
  }, []);
  return (
    <>
      <div className="grid grid-cols:5 jc:space-between ai:center">
        {list.map((item) => (
          <NFTBlock
            key={item.uri}
            uri={item.uri}
            imageUrl={item.image_preview_url || ""}
          />
        ))}
      </div>
    </>
  );
}

export default NFTLike;
