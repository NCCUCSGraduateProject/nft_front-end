import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import NFTBlock from "../NFTBlock";
function NFTDetail(props) {
  const { name, liked, recommend, user_address } = props.data;
  const [userRecommend, setUserRecommend] = useState([]);
  const [userLiked, setUserLiked] = useState([]);
  useEffect(() => {
    async function getNFT() {
      const image = recommend.map((item) => fetch(`/api/getImage?uri=${item}`));
      const imageData = await Promise.all(image);
      const top = imageData.map(async (item) => {
        const json = await item.json();
        return {
          imageUrl: json.image_url,
          ...json,
        };
      });
      const result = await Promise.all(top);
      setUserRecommend(result);
    }
    async function getLiked() {
      const image = liked.map((item) => fetch(`/api/getImage?uri=${item}`));
      const imageData = await Promise.all(image);
      const top = imageData.map(async (item) => {
        const json = await item.json();
        return {
          imageUrl: json.image_url,
          ...json,
        };
      });
      const result = await Promise.all(top);
      setUserLiked(result);
    }
    getLiked();
    getNFT();
  }, []);
  return (
    <>
      <div className="my:10vh r:20 px:40 py:20 shadow:inset|9px|9px|18px|rgba(21,21,21,0.2),inset|9px|-9px|18px|rgba(21,21,21,0.2),inset|-9px|-9px|18px|rgba(83,83,83,0.9),inset|9px|9px|23px|rgba(21,21,21,0.9)">
        <div className="flex jc:space-evenly my:20 gap:10">
          <div className="w:60% r:10 px:20">
            {/* <div className="w:30% r:10 px:20 bg:linear-gradient(135deg,#313131|0%,#373737|100%) m:0 position:rel shadow:9px|9px|18px|rgba(21,21,21,0.2),9px|-9px|18px|rgba(21,21,21,0.2),-9px|-9px|18px|rgba(83,83,83,0.9),9px|9px|23px|rgba(21,21,21,0.9)"> */}
            <h2 className="f:gray-60 t:left">Name</h2>
            <h1 className="f:white t:left">{name || "No name"}</h1>
            <h2 className="f:gray-60 t:left">Address</h2>
            <p className="f:white t:left f:20 max-h:100 overflow-y:scroll">
              {user_address || "No description"}
            </p>
          </div>
        </div>
      </div>

      <div className="my:10vh r:20 px:40 py:40 shadow:inset|9px|9px|18px|rgba(21,21,21,0.2),inset|9px|-9px|18px|rgba(21,21,21,0.2),inset|-9px|-9px|18px|rgba(83,83,83,0.9),inset|9px|9px|23px|rgba(21,21,21,0.9)">
        <h1 className="f:white t:left m:0|0|30|0">U2I recommend</h1>
        <div className="m:0 p:0 grid grid-auto-flow:row|dense grid-template-cols:repeat(10,1fr) w:full gap:20">
          {userRecommend.map((item, index) => (
            <div className="w:full" key={index}>
              <NFTBlock
                scale={1}
                uri={item.uri}
                key={index}
                imageUrl={item.imageUrl || ""}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="my:10vh r:20 px:40 py:40 shadow:inset|9px|9px|18px|rgba(21,21,21,0.2),inset|9px|-9px|18px|rgba(21,21,21,0.2),inset|-9px|-9px|18px|rgba(83,83,83,0.9),inset|9px|9px|23px|rgba(21,21,21,0.9)">
        <h1 className="f:white t:left m:0|0|30|0">User Liked Item</h1>
        <div className="m:0 p:0 grid grid-auto-flow:row|dense grid-template-cols:repeat(10,1fr) w:full gap:20">
          {userLiked.map((item, index) => (
            <div className="w:full" key={index}>
              <NFTBlock
                scale={1}
                uri={item.uri}
                key={index}
                imageUrl={item.imageUrl || ""}
              />
            </div>
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
