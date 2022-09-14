import Link from "next/link";
const NFTBlock = (props) => {
  const { uri, imageUrl } = props;
  return (
    <Link href={`/detail/${uri}`}>
      <div
        className="flex w:256 h:256 jc:center ai:center b:1|solid|gray r:10 cursor:pointer"
        key={uri}
      >
        <img className="max-w:100% max-h:100% r:10" src={imageUrl} />
      </div>
    </Link>
  );
};
export default NFTBlock;
