import Head from 'next/head'
import NFTDetail from '../../components/NFTDetail'
export default function Detail(props) {
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
                <NFTDetail data={props} />
            </main>
        </div>
    )
}
export async function getServerSideProps(context) {
    const uri = context.query.uri || [];
    const res = await fetch(`${process.env.URL}/api/detail/${uri.join("/")}`)
    const data = await res.json()
    return { props: data };
}