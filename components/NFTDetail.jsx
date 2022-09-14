import Link from "next/link";
import { useState, useEffect } from "react";
import NFTBlock from "./NFTBlock";
function NFTDetail(props) {
  const { top10, image_url, description, name } = props.data;
  const [top10List, setTop10List] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const req = top10.map((id) => {
        return fetch(`/api/detail/${id}`);
      });
      const res = await Promise.all(req);
      const data = await Promise.all(res.map((r) => r.json()));
      setTop10List(data);
    }
    fetchData();
  }, [top10]);

  return (
    <>
      <div className="flex jc:space-between my:20">
        <div className="w:45% b:1|solid|gray r:10 px:20">
          <h2 className="f:white t:left">Name</h2>
          <h1 className="f:gray-80 t:left">{name}</h1>
          <h2 className="f:white t:left">Description</h2>
          <p className="f:gray-80 t:left f:20">{description}</p>
        </div>
        <div className="w:45% flex ai:center jc:center b:1|solid|gray r:10">
          <img src={image_url} alt="" className="" />
        </div>
      </div>
      <hr></hr>

      <h1 className="f:white t:left">Top5</h1>
      <div className="grid grid-cols:5 jc:space-between ai:center">
        {top10List.slice(0, 5).map((item) => (
          <NFTBlock
            key={item.uri}
            uri={item.uri}
            imageUrl={item.image_preview_url}
          />
        ))}
      </div>
      <h1 className="f:white t:left">Top10</h1>
      <div className="grid grid-cols:5 jc:space-between ai:center">
        {top10List.slice(5, 10).map((item) => (
          <NFTBlock
            key={item.uri}
            uri={item.uri}
            imageUrl={item.image_preview_url}
          />
        ))}
      </div>

      <Link href="/">
        <h3 className="f:white t:center cursor:pointer">Back to Home</h3>
      </Link>
    </>
  );
}

export default NFTDetail;
