import { useState } from 'react'
import Head from 'next/head'
import NFTPage from '../components/NFTPage'
import NFTLike from '../components/NFTLike'
import NFTRandom from '../components/NFTRandom'
import ChooseModal from '../components/Modal'
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
        {/* <h1 className="f:40 f:white lh:1 t:left">
          Liked Item
        </h1>
        <NFTLike />

        <div>
          <button className="h:30 bg:gray-8 b:1px f:white" onClick={() => setShowModal(true)}>Open Modal</button>
          <button className="h:30 bg:gray-8 b:1px f:white" onClick={() => {
            window.localStorage.removeItem("like")
            window.dispatchEvent(new Event("storage"));
          }}>Clear Like</button>
        </div> 
        <hr /> */}
        <div className="flex flex:col jc:center ai:center">
          <NFTRandom />
        </div>
        {/* <hr /> */}
        {/* <h1 className="f:40 f:white lh:1 t:left">
          List Explore
        </h1>
        <NFTPage /> */}
      </main>
      {showModal && <ChooseModal onClose={() => { setShowModal(false) }} />}
    </div>
  )
}
