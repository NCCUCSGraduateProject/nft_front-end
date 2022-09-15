import { useState, useEffect } from "react";
import NFTBlock from "./NFTBlock";
function NFTRandom() {
  const [page, setpage] = useState(1);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(`/api/list/random`).then((res) => {
      res.json().then((data) => {
        setList(data);
      });
    });
  }, [page]);
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

export default NFTRandom;
