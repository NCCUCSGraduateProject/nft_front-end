import { useState, useEffect } from "react";
import NFTBlock from "./NFTBlock";
function NFTPage() {
  const [page, setpage] = useState(1);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(`/api/list/${page}`).then((res) => {
      res.json().then((data) => {
        setList(data);
      });
    });
  }, [page]);
  return (
    <>
      <div className="flex w:full jc:center my:10">
        <button
          className="h:50 w:50 f:20 bg:transparent b:1|solid|gray r:10 f:white"
          onClick={() => setpage((page) => page - 1)}
        >
          &larr;
        </button>
        <div className="h:50 w:50 lh:3.125rem t:center f:25 f:bold f:white">
          {page}
        </div>
        <button
          className="h:50 w:50 f:20 bg:transparent b:1|solid|gray r:10 f:white"
          onClick={() => setpage((page) => page + 1)}
        >
          &rarr;
        </button>
      </div>
      <div className="grid grid-cols:5 jc:space-between ai:center">
        {list.map((item) => (
          <NFTBlock key={item.uri} uri={item.uri} imageUrl={item.image_preview_url} />
        ))}
      </div>
    </>
  );
}

export default NFTPage;
