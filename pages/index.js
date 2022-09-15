import Head from 'next/head'
import NFTPage from '../components/NFTPage'
import NFTRandom from '../components/NFTRandom'
export default function Home() {
  return (
    <div className="flex jc:center ai:center">
      <Head>
        <title>Senior project</title>
        <meta name="description" content="MFLab Senior project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w:80% t:center">
        <h1 className="f:60 f:white lh:2">
          NFTintrist
        </h1>
        <h1 className="f:40 f:white lh:1 t:left">
          Random Explore
        </h1>
        <NFTRandom />
        <hr />
        <h1 className="f:40 f:white lh:1 t:left">
          List Explore
        </h1>
        <NFTPage />
      </main>
    </div>
  )
}
