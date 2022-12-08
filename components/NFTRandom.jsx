import { useState, useEffect } from "react";
import NFTBlock from "./NFTBlock";
function NFTRandom() {
  const [list, setList] = useState([]);
  const randomNumber = 25;
  const scale = 2;
  const getRandomNFT = () => {
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
        setList((prev) => [...prev, ...res]);
      });
    });
  }
  useEffect(() => {
    getRandomNFT();
    // 無限滾動函數
    function infiniteScroll() {
      // 設置滾動事件監聽器
      window.addEventListener("scroll", () => {
        // 檢查是否到達頁面底部
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          // 在此處添加需要在到達頁面底部時進行的操作
          console.log("到達頁面底部");
          getRandomNFT();
        }
      });
    }

    // 在頁面加載時調用無限滾動函數
    infiniteScroll();
  }, []);

  return (
    <div className="w:full">
      <h1 className="f:40 f:white lh:2 t:left w:full">Random Explore</h1>
      <div className="m:0 p:0 grid grid-auto-flow:row|dense grid-template-cols:repeat(6,1fr) w:full gap:20">
        {list.map((item,index) => (
          <div
            className={`block grid-col-span:${item.scale} grid-row-span:${item.scale}
            w:full h:full flex jc:center ai:top`}
            key={index}
          >
            <NFTBlock
              size={"full"}
              scale={item.scale}
              uri={item.uri}
              key={index}
              imageUrl={item.image_url || ""}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NFTRandom;
