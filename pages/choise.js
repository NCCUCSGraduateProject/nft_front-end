import { useState, useEffect } from "react";
import Head from "next/head";
import NFTList from "../components/NFTList";
import ChooseModal from "../components/Modal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [list, setList] = useState([]);
  const [choiseList, setChoiseList] = useState(undefined);
  useEffect(() => {
    const checkUserData = () => {
      let uriList = window.localStorage.getItem("choise");
      if (uriList) {
        uriList = JSON.parse(uriList);
        setChoiseList(uriList);
      } else {
        setChoiseList([]);
      }
    }
    checkUserData();
    window.addEventListener("storage", checkUserData);
    return () => {
      window.removeEventListener("storage", checkUserData);
    };
  }, []);

  const getRandomNFT = () => {
    fetch(`/api/list/random?number=${10}`).then((res) => {
      res.json().then((data) => {
        setList(data);
      });
    });
  }

  const getLikeNFTRecommend = () => {
    fetch(`/api/list/recommend?number=${10}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likeList: choiseList,
      }),
    }).then((res) => {
      res.json().then((data) => {
        setList(data);
      });
    });
  }

  useEffect(() => {
    if (choiseList === undefined) { return; }
    if (choiseList.length > 0) {
      getLikeNFTRecommend();
    } else {
      getRandomNFT();
    }
  }, [choiseList]);

  return (
    <div className="flex jc:center ai:center">
      <Head>
        <title>Senior project</title>
        <meta name="description" content="MFLab Senior project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w:80% t:center">
        {/* <h1 className="f:60 f:white lh:1">NFTintrist</h1> */}
        <h1 className="f:40 f:white lh:1 t:left">Choise Item</h1>
        {choiseList !== undefined && <NFTList list={choiseList} />}

        <div className="my:20 flex flex-row jc:center ai:center gap:50">
          <div
            className={`h:40 px:20 f:white f:20 bg:linear-gradient(135deg,#313131|0%,#373737|100%) flex m:0 jc:center ai:center r:10 cursor:pointer shadow:9px|9px|18px|rgba(21,21,21,0.2),9px|-9px|18px|rgba(21,21,21,0.2),-9px|-9px|18px|rgba(83,83,83,0.9),9px|9px|23px|rgba(21,21,21,0.9) shadow:inset|9px|9px|18px|rgba(21,21,21,0.2),inset|9px|-9px|18px|rgba(21,21,21,0.2),inset|-9px|-9px|18px|rgba(83,83,83,0.9),inset|9px|9px|23px|rgba(21,21,21,0.9):hover opacity:0.8:hover ~500ms|ease`}
            onClick={() => setShowModal(true)}
          >
            Open Modal
          </div>
          <div
            className={`h:40 px:20 f:white f:20 bg:linear-gradient(135deg,#313131|0%,#373737|100%) flex m:0 jc:center ai:center r:10 cursor:pointer shadow:9px|9px|18px|rgba(21,21,21,0.2),9px|-9px|18px|rgba(21,21,21,0.2),-9px|-9px|18px|rgba(83,83,83,0.9),9px|9px|23px|rgba(21,21,21,0.9) shadow:inset|9px|9px|18px|rgba(21,21,21,0.2),inset|9px|-9px|18px|rgba(21,21,21,0.2),inset|-9px|-9px|18px|rgba(83,83,83,0.9),inset|9px|9px|23px|rgba(21,21,21,0.9):hover opacity:0.8:hover ~500ms|ease`}
            onClick={() => {
              window.localStorage.removeItem("choise");
              window.dispatchEvent(new Event("storage"));
            }}
          >
            Clear Choise
          </div>
        </div>
        <hr />

        <h1 className="f:40 f:white lh:1 t:left">Recommend</h1>
        {list !== undefined && <NFTList list={list} />}
      </main>
      {showModal && (
        <ChooseModal
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
