import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import NFTBlock from "./NFTBlock";
function NFTDetail(props) {
  const { uri, image_url, description, name, i2iCv, itemCF } = props.data;
  const [recommend, setRecommend] = useState({});
  useEffect(() => {
    async function fetchData() {
      const i2iCvReq = i2iCv.top10.map((id) => {
        return fetch(`/api/detail/${id}`);
      });
      const itemCfReq = itemCF.top10.map((id) => {
        return fetch(`/api/detail/${id}`);
      });

      const i2iCvRes = await Promise.all(i2iCvReq);
      const i2iCvData = await Promise.all(i2iCvRes.map((r) => r.json()));

      setRecommend((prev) => {
        return {
          ...prev,
          i2iCv: i2iCvData,
        };
      });

      const itemCfRes = await Promise.all(itemCfReq);
      const itemCfdata = await Promise.all(itemCfRes.map((r) => r.json()));

      setRecommend((prev) => {
        return {
          ...prev,
          itemCf: itemCfdata,
        };
      });
    }
    fetchData();
  }, [props.data]);

  const add2Like = (uri, image_url) => {
    let uriList = window.localStorage.getItem("like");
    if (uriList) {
      uriList = JSON.parse(uriList);
      uriList = uriList.filter((item) => item.uri !== uri);
      uriList.push({ uri, image_url: image_url });
    } else {
      uriList = [{ uri, image_url: image_url }];
    }
    window.localStorage.setItem("like", JSON.stringify(uriList));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
      <div className="my:10vh r:20 px:40 py:20 shadow:inset|9px|9px|18px|rgba(21,21,21,0.2),inset|9px|-9px|18px|rgba(21,21,21,0.2),inset|-9px|-9px|18px|rgba(83,83,83,0.9),inset|9px|9px|23px|rgba(21,21,21,0.9)">
        <div className="flex jc:space-evenly my:20 gap:10">
          <div className="w:60% r:10 px:20">
            {/* <div className="w:30% r:10 px:20 bg:linear-gradient(135deg,#313131|0%,#373737|100%) m:0 position:rel shadow:9px|9px|18px|rgba(21,21,21,0.2),9px|-9px|18px|rgba(21,21,21,0.2),-9px|-9px|18px|rgba(83,83,83,0.9),9px|9px|23px|rgba(21,21,21,0.9)"> */}
            <h2 className="f:gray-60 t:left">Name</h2>
            <h1 className="f:white t:left">{name || "No name"}</h1>
            <h2 className="f:gray-60 t:left">Description</h2>
            <p className="f:white t:left f:20 max-h:100 overflow-y:scroll">
              {description || "No description"}
            </p>
          </div>
          <div className="overflow:hidden p:2% w:30% aspect:1/1 flex r:20px bg:linear-gradient(135deg,#313131|0%,#373737|100%) m:0 jc:center ai:center position:rel shadow:9px|9px|18px|rgba(21,21,21,0.2),9px|-9px|18px|rgba(21,21,21,0.2),-9px|-9px|18px|rgba(83,83,83,0.9),9px|9px|23px|rgba(21,21,21,0.9)">
            <Image
              src={image_url || ""}
              fill={true}
              alt={name}
              className="r:20px position:rel!"
            />
          </div>
        </div>
        <div
          className={`h:40 px:20 f:white f:20 bg:linear-gradient(135deg,#313131|0%,#373737|100%) flex m:0 jc:center ai:center r:10 cursor:pointer shadow:9px|9px|18px|rgba(21,21,21,0.2),9px|-9px|18px|rgba(21,21,21,0.2),-9px|-9px|18px|rgba(83,83,83,0.9),9px|9px|23px|rgba(21,21,21,0.9) shadow:inset|9px|9px|18px|rgba(21,21,21,0.2),inset|9px|-9px|18px|rgba(21,21,21,0.2),inset|-9px|-9px|18px|rgba(83,83,83,0.9),inset|9px|9px|23px|rgba(21,21,21,0.9):hover opacity:0.8:hover ~500ms|ease`}
          onClick={(e) => {
            add2Like(uri, image_url);
          }}
        >
          Like
        </div>
      </div>

      <div className="my:10vh r:20 px:40 py:20 shadow:inset|9px|9px|18px|rgba(21,21,21,0.2),inset|9px|-9px|18px|rgba(21,21,21,0.2),inset|-9px|-9px|18px|rgba(83,83,83,0.9),inset|9px|9px|23px|rgba(21,21,21,0.9)">
        <h1 className="f:white t:left lh:3">itemCF Top10</h1>
        <div className="flex jc:space-between ai:center h:200 my:20 w:full">
          {recommend.itemCf?.slice(0, 5).map((item) => (
            <NFTBlock
              size="160"
              key={item.uri}
              uri={item.uri}
              imageUrl={item.image_preview_url || ""}
            />
          ))}
        </div>
        <div className="flex jc:space-between ai:center h:200 my:20 w:full">
          {recommend.itemCf?.slice(5, 10).map((item) => (
            <NFTBlock
              size="160"
              key={item.uri}
              uri={item.uri}
              imageUrl={item.image_preview_url || ""}
            />
          ))}
        </div>
      </div>

      <div className="my:10vh r:20 px:40 py:20 shadow:inset|9px|9px|18px|rgba(21,21,21,0.2),inset|9px|-9px|18px|rgba(21,21,21,0.2),inset|-9px|-9px|18px|rgba(83,83,83,0.9),inset|9px|9px|23px|rgba(21,21,21,0.9)">
        <h1 className="f:white t:left lh:2">i2i CV Top10</h1>
        <div className="flex jc:space-between ai:center h:200 my:20 w:full">
          {recommend.i2iCv?.slice(0, 5).map((item) => (
            <NFTBlock
              size="160"
              key={item.uri}
              uri={item.uri}
              imageUrl={item.image_preview_url || ""}
            />
          ))}
        </div>
        <div className="flex jc:space-between ai:center h:200 my:20 w:full">
          {recommend.i2iCv?.slice(5, 10).map((item) => (
            <NFTBlock
              size="160"
              key={item.uri}
              uri={item.uri}
              imageUrl={item.image_preview_url || ""}
            />
          ))}
        </div>
      </div>
      <div className="w:full flex jc:center">
        <Link
          href="/"
          className="overflow:hidden w:fit px:20 flex r:20px bg:linear-gradient(135deg,#313131|0%,#373737|100%) m:0 jc:center ai:center position:rel shadow:9px|9px|18px|rgba(21,21,21,0.2),9px|-9px|18px|rgba(21,21,21,0.2),-9px|-9px|18px|rgba(83,83,83,0.9),9px|9px|23px|rgba(21,21,21,0.9) cursor:pointer shadow:inset|9px|9px|18px|rgba(21,21,21,0.2),inset|9px|-9px|18px|rgba(21,21,21,0.2),inset|-9px|-9px|18px|rgba(83,83,83,0.9),inset|9px|9px|23px|rgba(21,21,21,0.9):hover opacity:0.8:hover"
        >
          <h3 className="f:white t:center">Back to Home</h3>
        </Link>
      </div>
    </>
  );
}

export default NFTDetail;
