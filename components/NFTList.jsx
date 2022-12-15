import { useState, useEffect } from "react";
import NFTBlock from "./NFTBlock";
function NFTList(props) {
  const list = props.list;
  console.log(list);
  return (
    <>
      <div className="m:0 p:0 grid grid-auto-flow:row|dense grid-template-cols:repeat(5,1fr) w:full gap:20">
        {list.map((item, index) => (
          <div
            className={`block
            w:full h:full flex jc:center ai:top`}
            key={index}
          >
            <NFTBlock
              size={"full"}
              scale={1}
              uri={item.uri}
              key={index}
              imageUrl={item.image_url || ""}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default NFTList;
