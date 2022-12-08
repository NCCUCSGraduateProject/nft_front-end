import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import placeholder from "../public/placeholder.png";
import Spinner from "./Spinner";
const NFTBlock = (props) => {
  const { uri, imageUrl, size, scale } = props;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <div
      // className={`p:10 w:${size} aspect:1/1 bg:linear-gradient(135deg,#313131|0%,#373737|100%) flex m:0 jc:center ai:center r:10 cursor:pointer position:rel shadow:9px|9px|18px|rgba(21,21,21,0.2),9px|-9px|18px|rgba(21,21,21,0.2),-9px|-9px|18px|rgba(83,83,83,0.9),9px|9px|23px|rgba(21,21,21,0.9) x:-5:hover y:-10:hover opacity:0.8:hover ~500ms|linear`}
      className={`p:10 w:${size} aspect:1/1 bg:linear-gradient(135deg,#313131|0%,#373737|100%) flex m:0 jc:center ai:center r:10 cursor:pointer position:rel shadow:9px|9px|18px|rgba(21,21,21,0.2),9px|-9px|18px|rgba(21,21,21,0.2),-9px|-9px|18px|rgba(83,83,83,0.9),9px|9px|23px|rgba(21,21,21,0.9) shadow:inset|9px|9px|18px|rgba(21,21,21,0.2),inset|9px|-9px|18px|rgba(21,21,21,0.2),inset|-9px|-9px|18px|rgba(83,83,83,0.9),inset|9px|9px|23px|rgba(21,21,21,0.9):hover opacity:0.8:hover ~500ms|ease`}
      key={uri}
      onClick={() => {
        router.push(`/detail/${uri}`);
      }}
    >
      {isLoading && (
        <div className="h:50 w:50">
          <Spinner />
        </div>
      )}
      <Image
        src={imageUrl || placeholder}
        alt={uri}
        fill
        sizes="90%"
        className={`r:10 ${isLoading ? "hide" : "block"} position:rel!`}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
};
export default NFTBlock;
