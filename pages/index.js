import { useRouter } from 'next/router'
import Head from 'next/head'
import NFTRandom from '../components/NFTRandom'
export default function Home() {

  const router = useRouter()
  return (
    <div className="flex jc:center ai:center">
      <Head>
        <title>Senior project</title>
        <meta name="description" content="MFLab Senior project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w:80% t:center">
        <h1 className="f:60 f:white lh:1">
          NFTintrist
        </h1>
        <div className="flex flex:row jc:center gap:20">
          <div
            className={`w:200 h:40 px:20 f:white f:20 bg:linear-gradient(135deg,#313131|0%,#373737|100%) flex m:0 jc:center ai:center r:10 cursor:pointer shadow:9px|9px|18px|rgba(21,21,21,0.2),9px|-9px|18px|rgba(21,21,21,0.2),-9px|-9px|18px|rgba(83,83,83,0.9),9px|9px|23px|rgba(21,21,21,0.9) shadow:inset|9px|9px|18px|rgba(21,21,21,0.2),inset|9px|-9px|18px|rgba(21,21,21,0.2),inset|-9px|-9px|18px|rgba(83,83,83,0.9),inset|9px|9px|23px|rgba(21,21,21,0.9):hover opacity:0.8:hover ~500ms|ease`}
            onClick={() => {
              router.push("/likedItem");
            }}
          >
            Liked Item
          </div>
          <div
            className={`w:200 h:40 px:20 f:white f:20 bg:linear-gradient(135deg,#313131|0%,#373737|100%) flex m:0 jc:center ai:center r:10 cursor:pointer shadow:9px|9px|18px|rgba(21,21,21,0.2),9px|-9px|18px|rgba(21,21,21,0.2),-9px|-9px|18px|rgba(83,83,83,0.9),9px|9px|23px|rgba(21,21,21,0.9) shadow:inset|9px|9px|18px|rgba(21,21,21,0.2),inset|9px|-9px|18px|rgba(21,21,21,0.2),inset|-9px|-9px|18px|rgba(83,83,83,0.9),inset|9px|9px|23px|rgba(21,21,21,0.9):hover opacity:0.8:hover ~500ms|ease`}
            onClick={() => {
              router.push("/choose");
            }}
          >
            Choose Item
          </div>
          <div
            className={`w:200 h:40 px:20 f:white f:20 bg:linear-gradient(135deg,#313131|0%,#373737|100%) flex m:0 jc:center ai:center r:10 cursor:pointer shadow:9px|9px|18px|rgba(21,21,21,0.2),9px|-9px|18px|rgba(21,21,21,0.2),-9px|-9px|18px|rgba(83,83,83,0.9),9px|9px|23px|rgba(21,21,21,0.9) shadow:inset|9px|9px|18px|rgba(21,21,21,0.2),inset|9px|-9px|18px|rgba(21,21,21,0.2),inset|-9px|-9px|18px|rgba(83,83,83,0.9),inset|9px|9px|23px|rgba(21,21,21,0.9):hover opacity:0.8:hover ~500ms|ease`}
            onClick={() => {
              router.push("/u2i");
            }}
          >
            U2I Recommendation
          </div>
        </div>
        <div className="flex flex:col jc:center ai:center">
          <NFTRandom />
        </div>
      </main>
    </div>
  )
}
