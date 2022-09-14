import Head from 'next/head'
import NFTPage from '../components/NFTPage'
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
        <NFTPage />
      </main>
    </div>
  )
}
