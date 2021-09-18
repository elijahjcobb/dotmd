import type {GetServerSideProps, NextPage} from 'next'
import ErrorPage from "./error";

const page: NextPage = () => {
	return <ErrorPage msg={"Page not found..."}/>
}

export default page;