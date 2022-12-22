import Link from "next/link";
import Head from "next/head";
import User from "../components/u2i/User";
export default function U2i() {
  return (
    <div className="flex jc:center ai:center">
      <Head>
        <title>Senior project</title>
        <meta name="description" content="MFLab Senior project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w:80% t:center">
        <h1 className="f:40 f:white lh:1 t:left">U2I Recommendation</h1>

        <div className="flex flex:col jc:center ai:center">
          <User />
        </div>
        <div className="w:full flex jc:center">
          <Link
            href="/"
            className="overflow:hidden w:fit px:20 flex r:20px bg:linear-gradient(135deg,#313131|0%,#373737|100%) m:0 jc:center ai:center position:rel shadow:9px|9px|18px|rgba(21,21,21,0.2),9px|-9px|18px|rgba(21,21,21,0.2),-9px|-9px|18px|rgba(83,83,83,0.9),9px|9px|23px|rgba(21,21,21,0.9) cursor:pointer shadow:inset|9px|9px|18px|rgba(21,21,21,0.2),inset|9px|-9px|18px|rgba(21,21,21,0.2),inset|-9px|-9px|18px|rgba(83,83,83,0.9),inset|9px|9px|23px|rgba(21,21,21,0.9):hover opacity:0.8:hover"
          >
            <h3 className="f:white t:center">Back to Home</h3>
          </Link>
        </div>
      </main>

    </div>
  );
}
