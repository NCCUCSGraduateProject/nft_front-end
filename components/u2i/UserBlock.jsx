import { useState, useEffect } from "react";
import Link from "next/link";
import NFTBlock from "../NFTBlock";
const UserBlock = ({ user }) => {
  const { name, liked, user_address } = user;
  const [top5, setTop5] = useState([]);
  useEffect(() => {
    async function getNFT() {
      let top5 = liked.slice(0, 10);
      const image = top5.map((item) => fetch(`/api/getImage?uri=${item}`));
      const imageData = await Promise.all(image);
      top5 = imageData.map(async (item) => {
        const json = await item.json();
        return {
          imageUrl: json.image_url,
          ...json,
        };
      });
      const result = await Promise.all(top5);
      setTop5(result);
    }
    getNFT();
  }, [liked]);
  return (
    <div className="w:full">
      <Link href={`/user/${user_address}`}>
        <h1 className="f:20 f:white lh:1.2 t:left">{name}</h1>
      </Link>
      <div className="m:0 p:0 grid grid-auto-flow:row|dense grid-template-cols:repeat(10,1fr) w:full gap:20">
        {top5.map((item, index) => (
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
  );
};

export default UserBlock;
