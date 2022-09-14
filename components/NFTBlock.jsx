import Link from "next/link";
import Image from "next/image";
const NFTBlock = (props) => {
  const { uri, imageUrl } = props;
  return (
    <Link href={`/detail/${uri}`}>
      <div
        className="flex w:256 h:256 jc:center ai:center b:1|solid|gray r:10 cursor:pointer position:rel"
        key={uri}
      >
        <Image
          src={imageUrl}
          alt={uri}
          layout="fill"
          objectFit="contain"
          className="r:10"
        />
      </div>
    </Link>
  );
};
export default NFTBlock;
