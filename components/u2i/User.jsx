import { useState, useEffect, useRef } from "react";
import UserBlock from "./UserBlock";
function User() {
  const [list, setList] = useState([]);
  const pageRef = useRef(1);
  const getRandomNFT = () => {
    fetch(`/api/list/user?page=${pageRef.current}&divide=20`).then((res) => {
      res.json().then((data) => {
        let newList = data.map((item) => {
          return {
            ...item,
          };
        });
        setList((list) => [...list, ...newList]);
      });
    });
  };
  useEffect(() => {
    getRandomNFT();
    // 無限滾動函數
    function infiniteScroll() {
      // 設置滾動事件監聽器
      window.addEventListener("scroll", () => {
        // 檢查是否到達頁面底部
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          // 在此處添加需要在到達頁面底部時進行的操作
          getRandomNFT();
          pageRef.current++;
        }
      });
    }

    // 在頁面加載時調用無限滾動函數
    infiniteScroll();
  }, []);

  return (
    <div className="w:full">
      <h1 className="f:40 f:white lh:2 t:left w:full">Random Explore</h1>
      <div className="m:0 p:0 flex flex:col jc:left w:full gap:20">
        {list.map((item, index) => (
          <div
            className={`block grid-col-span:${item.scale} grid-row-span:${item.scale}
            w:full h:full flex jc:center ai:top`}
            key={index}
          >
            <UserBlock user={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;
