import { useEffect, useState } from "react";
import Image from "next/image";
import Spinner from "./Spinner";
const BigNFTBlock = ({ uri, image_url, name }) => {
  const [isLoading, setIsLoading] = useState(true);
  const clickHandler = (uri, image_url) => {
    let uriList = window.localStorage.getItem("like");
    if (uriList) {
      uriList = JSON.parse(uriList);
      uriList = uriList.filter((item) => item.uri !== uri);
      uriList.push({ uri, image_preview_url: image_url });
    } else {
      uriList = [{ uri, image_preview_url: image_url }];
    }
    window.localStorage.setItem("like", JSON.stringify(uriList));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div
      className="flex max-w:1080 w:90% max-h:1920 h:80% my:5 jc:center ai:center cursor:pointer position:rel flex:col"
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
        layout="fill"
        objectFit="contain"
        className={`r:10 ${isLoading ? "hide" : ""}`}
        onLoadingComplete={() => setIsLoading(false)}
      />
      <div className="f:white">{name || "NoName"}</div>
    </div>
  );
};

const ChooseModal = ({ onClose }) => {
  const [option, setOption] = useState(null);
  useEffect(() => {
    const init = async () => {
      const res = await fetch("/api/list/random");
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
      <div className="w:80% h:80% bg:gray-10 opacity:100% z:20 r:50">
        <div className="f:50 f:white lh:2 t:center ">Choose One</div>
        <div className="flex jc:center ai:center h:80%">
          {!option && (
            <div className="h:50 w:50">
              <Spinner />
            </div>
          )}
          {option &&
            option.map(({ image_url, name, uri }) => (
              <BigNFTBlock uri={uri} image_url={image_url} name={name} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseModal;
