import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import NFTBlock from "./NFTBlock";
function NFTDetail(props) {
  const { image_url, description, name, i2iCv, itemCF } = props.data;
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

  return (
    <>
      <div className="flex jc:space-between my:20 min-h:600">
        <div className="w:45% r:10 px:20 bg:linear-gradient(135deg,#313131|0%,#373737|100%) m:0 r:20px cursor:pointer position:rel shadow:9px|9px|18px|rgba(21,21,21,0.2),9px|-9px|18px|rgba(21,21,21,0.2),-9px|-9px|18px|rgba(83,83,83,0.9),9px|9px|23px|rgba(21,21,21,0.9)">
          <h2 className="f:gray-60 t:left">Name</h2>
          <h1 className="f:white t:left">{name}</h1>
          <h2 className="f:gray-60 t:left">Description</h2>
          <p className="f:white t:left f:20">{description}</p>
        </div>
        <div className="w:45% flex ai:center jc:center r:20px position:rel bg:linear-gradient(135deg,#313131|0%,#373737|100%) flex m:0 jc:center ai:center r:10 cursor:pointer position:rel shadow:9px|9px|18px|rgba(21,21,21,0.2),9px|-9px|18px|rgba(21,21,21,0.2),-9px|-9px|18px|rgba(83,83,83,0.9),9px|9px|23px|rgba(21,21,21,0.9)">
          <Image
            src={image_url || ""}
            width={500}
            height={500}
            alt={name}
            className="w:90% r:20px"
          />
        </div>
      </div>

      <h1 className="f:white t:left">itemCF Top10</h1>
      <div className="grid grid-cols:5 jc:space-between ai:center h:240 gap:20 my:20">
        {recommend.itemCf?.slice(0, 5).map((item) => (
          <NFTBlock
            size="full"
            scale={1.2}
            key={item.uri}
            uri={item.uri}
            imageUrl={item.image_preview_url || ""}
          />
        ))}
      </div>
      <div className="grid grid-cols:5 jc:space-between ai:center h:240 gap:20 my:20">
        {recommend.itemCf?.slice(5, 10).map((item) => (
          <NFTBlock
            size="full"
            scale={1.2}
            key={item.uri}
            uri={item.uri}
            imageUrl={item.image_preview_url || ""}
          />
        ))}
      </div>

      <h1 className="f:white t:left">i2i CV Top10</h1>
      <div className="grid grid-cols:5 jc:space-between ai:center h:240 gap:20 my:20">
        {recommend.i2iCv?.slice(0, 5).map((item) => (
          <NFTBlock
            size="full"
            scale={1.2}
            key={item.uri}
            uri={item.uri}
            imageUrl={item.image_preview_url || ""}
          />
        ))}
      </div>
      <div className="grid grid-cols:5 jc:space-between ai:center h:240 gap:20 my:20">
        {recommend.i2iCv?.slice(5, 10).map((item) => (
          <NFTBlock
            size="full"
            scale={1.2}
            key={item.uri}
            uri={item.uri}
            imageUrl={item.image_preview_url || ""}
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
