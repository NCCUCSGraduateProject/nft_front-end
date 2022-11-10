import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import placeholder from "../public/placeholder.png";
import Spinner from "./Spinner";
const NFTBlock = (props) => {
  const { uri, imageUrl } = props;
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Link href={`/detail/${uri}`}>
      <div
        className="flex max-w:360 w:90% h:256 my:5 jc:center ai:center b:1|solid|gray r:10 cursor:pointer position:rel"
        key={uri}
      >
        {isLoading && (
          <div className="h:50 w:50">
            <Spinner />
          </div>
        )}
        <Image
          src={imageUrl || placeholder}
          alt={uri}
          layout="fill"
          objectFit="contain"
          className={`r:10 ${isLoading ? "hide" : ""}`}
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>
    </Link>
  );
};
export default NFTBlock;
