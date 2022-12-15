import { useState } from 'react'
import Head from 'next/head'
import NFTRandom from '../components/NFTRandom'
export default function Home() {
  const [showModal, setShowModal] = useState(false)

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
        <div className="flex flex:col jc:center ai:center">
          <NFTRandom />
        </div>
      </main>
    </div>
  )
}
