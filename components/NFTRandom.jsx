import { useState, useEffect } from "react";
import NFTBlock from "./NFTBlock";
function NFTRandom() {
  const [list, setList] = useState([]);
  const randomNumber = 25;
  const scale = 2;
  useEffect(() => {
    fetch(`/api/list/random?number=${randomNumber}`).then((res) => {
      res.json().then((data) => {
        // let randomNumber * 0.2 elements are selected
        const selected = data.slice(0, randomNumber * 0.2);
        const nonSelected = data.slice(randomNumber * 0.2);
        selected.map((item) => {
          item.scale = scale;
        });
        nonSelected.map((item) => {
          item.scale = 1;
        });
        const res = [...selected, ...data.slice(randomNumber * 0.2)];
        // shuffle the list
        for (let i = res.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [res[i], res[j]] = [res[j], res[i]];
        }
        console.log(res);
        setList(res);
      });
    });
  }, []);

  return (
    <div className="w:max-content">
      <h1 className="f:40 f:white lh:2 t:left w:full">Random Explore</h1>
      <div className="m:0 p:0 grid grid-auto-flow:row|dense grid-template-cols:repeat(5,1fr) grid-template-rows:repeat(10,1fr) w:1000 h:2000 gap:20">
        {list.map((item) => (
          <div
            className={`block grid-col-span:${item.scale} grid-row-span:${item.scale}
            w:full h:full flex jc:center ai:top`}
            key={item.uri}
          >
            <NFTBlock
              size={"full"}
              scale={item.scale}
              uri={item.uri}
              key={item.uri}
              imageUrl={item.image_url || ""}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NFTRandom;
