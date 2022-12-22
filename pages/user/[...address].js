import Head from 'next/head'
import UserDetail from '../../components/u2i/UserDetail'
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
                <UserDetail data={props} />
            </main>
        </div>
    )
}
export async function getServerSideProps(context) {
    const address = context.query.address || [];
    const res = await fetch(`${process.env.URL}/api/user/${address.join("/")}`)
    const data = await res.json()
    return { props: data };
}