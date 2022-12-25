import Link from "next/link";
import Image from "next/image";
import placeholder from "../../public/placeholder.png";
import { useState, useEffect } from "react";
import NFTBlock from "../NFTBlock";
import { useRouter } from "next/router";
function NFTDetail(props) {
  const router = useRouter();
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
            <h2 className="f:gray-60 t:left">Name</h2>
            <h1 className="f:white t:left">{name || "No name"}</h1>
            <h2 className="f:gray-60 t:left">User liked item count</h2>
            <p className="f:white t:left f:20 max-h:100">{userLiked.length}</p>
            <div className="w:60% r:10 px:20 flex flex:row gap:10 jc:space-evenly">
              <div className="w:30% r:10 px:20 bg:linear-gradient(135deg,#313131|0%,#373737|100%) m:0 position:rel shadow:9px|9px|18px|rgba(21,21,21,0.2),9px|-9px|18px|rgba(21,21,21,0.2),-9px|-9px|18px|rgba(83,83,83,0.9),9px|9px|23px|rgba(21,21,21,0.9)"></div>
              {/* <div>
              <h2 className="f:gray-60 t:left">Name</h2>
              <h1 className="f:white t:left">{name || "No name"}</h1>
            </div>
            <div>
              <h2 className="f:gray-60 t:left">User liked item count</h2>
              <h1 className="f:white t:left">{userLiked.length}</h1>
            </div> */}
            </div>
          </div>
          <div className="overflow:hidden p:2% w:20% aspect:1/1 flex r:20px bg:linear-gradient(135deg,#313131|0%,#373737|100%) m:0 jc:center ai:center position:rel shadow:9px|9px|18px|rgba(21,21,21,0.2),9px|-9px|18px|rgba(21,21,21,0.2),-9px|-9px|18px|rgba(83,83,83,0.9),9px|9px|23px|rgba(21,21,21,0.9)">
            <Image
              src={userRecommend[0]?.imageUrl || placeholder}
              fill="fill"
              alt={name}
              className="r:20px position:rel!"
            />
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
      <div className="w:full flex jc:center my:50">
        <div
          className="overflow:hidden w:fit px:20 flex r:20px bg:linear-gradient(135deg,#313131|0%,#373737|100%) m:0 jc:center ai:center position:rel shadow:9px|9px|18px|rgba(21,21,21,0.2),9px|-9px|18px|rgba(21,21,21,0.2),-9px|-9px|18px|rgba(83,83,83,0.9),9px|9px|23px|rgba(21,21,21,0.9) cursor:pointer shadow:inset|9px|9px|18px|rgba(21,21,21,0.2),inset|9px|-9px|18px|rgba(21,21,21,0.2),inset|-9px|-9px|18px|rgba(83,83,83,0.9),inset|9px|9px|23px|rgba(21,21,21,0.9):hover opacity:0.8:hover"
          onClick={() => {
            router.push("/");
          }}
        >
          <h3 className="f:white t:center">Back to Home</h3>
        </div>
      </div>
    </>
  );
}

export default NFTDetail;
