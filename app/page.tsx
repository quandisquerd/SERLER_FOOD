import Link from 'next/link';
import './globals.css';
export default function Home() {
    return (
        <div>
            <h1>Home Page</h1>
            <Link href="/modules/product">
                Go to Product Page
            </Link>
        </div>
    );
}