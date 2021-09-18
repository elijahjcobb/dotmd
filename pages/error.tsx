import type {GetServerSideProps, NextPage} from 'next'

interface ErrorPageProps {
    msg: string | null;
}

const page: NextPage<ErrorPageProps> = props => {
	return <div>
        <span>Error.</span>
        {props.msg && <span>{props.msg}</span>}
        <a href="https://drive.google.com">Open Google Drive</a>
    </div>
}

export const getServerSideProps: GetServerSideProps<ErrorPageProps> = async (context) => {
    return {
        props: {
            msg: context.query.msg as string | undefined ?? null
        }
    }
}

export default page;