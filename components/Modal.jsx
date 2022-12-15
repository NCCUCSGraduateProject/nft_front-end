import { useEffect, useState } from "react";
import Image from "next/image";
import Spinner from "./Spinner";
const BigNFTBlock = ({ uri, image_url, name }) => {
  const [isLoading, setIsLoading] = useState(false);
  const clickHandler = (uri, image_url) => {
    let uriList = window.localStorage.getItem("choise");
    if (uriList) {
      uriList = JSON.parse(uriList);
      uriList = uriList.filter((item) => item.uri !== uri);
      uriList.push({ uri, image_url: image_url });
    } else {
      uriList = [{ uri, image_url: image_url }];
    }
    window.localStorage.setItem("choise", JSON.stringify(uriList));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="flex flex:col max-w:1080 w:90% max-h:1920 h:90% jc:center ai:center">
      <div
        className={`p:10 w:90% h:90% aspect:1/1 bg:linear-gradient(135deg,#313131|0%,#373737|100%) flex m:0 jc:center ai:center r:10 cursor:pointer position:rel shadow:9px|9px|18px|rgba(21,21,21,0.2),9px|-9px|18px|rgba(21,21,21,0.2),-9px|-9px|18px|rgba(83,83,83,0.9),9px|9px|23px|rgba(21,21,21,0.9) shadow:inset|9px|9px|18px|rgba(21,21,21,0.2),inset|9px|-9px|18px|rgba(21,21,21,0.2),inset|-9px|-9px|18px|rgba(83,83,83,0.9),inset|9px|9px|23px|rgba(21,21,21,0.9):hover opacity:0.8:hover ~500ms|ease`}
        key={uri}
        onClick={(e) => {
          clickHandler(uri, image_url);
        }}
      >
        {isLoading && (
          <div className="h:50 w:50">
            <Spinner />
          </div>
        )}
        <Image
          src={image_url || ""}
          alt={uri}
          fill
          sizes="90%"
          className={`r:10 ${isLoading ? "hide" : "block"} position:rel!`}
          // onLoadingComplete={() => setIsLoading(false)}
        />
      </div>
      <div className="f:white t:center lh:5">{name || "NoName"}</div>
    </div>
  );
};

const ChooseModal = ({ onClose }) => {
  const [option, setOption] = useState(null);
  useEffect(() => {
    const init = async () => {
      const res = await fetch("/api/list/random?number=2");
      const data = await res.json();
      setOption(data.slice(0, 2));
    };
    init();
  }, []);

  return (
    <div
      className="abs w:100vw h:100vh top:0 bg:rgba(107,106,109,0.5) z:10 flex jc:center ai:center"
      onClick={onClose}
    >
      <div className="w:80% h:80% bg:#343434 opacity:100% z:20 r:50 flex jc:center ai:center flex:col">
        <div className="f:50 f:white lh:2 t:center">Choose One</div>
        <div className="flex jc:center ai:center h:80% w:90%">
          {!option && (
            <div className="h:50 w:50">
              <Spinner />
            </div>
          )}
          {option &&
            option.map(({ image_url, name, uri }) => (
              <BigNFTBlock
                key={uri}
                uri={uri}
                image_url={image_url}
                name={name}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseModal;
