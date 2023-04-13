import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return (
    <main
      className={`${inter.className} bg-slate-900 flex items-center justify-center bg-fill`}
    >
      <div className="max-w-5xl mx-auto p-5 text-white">
        <h1 className="text-4xl font-bold text-amber-500">Tools</h1>
        <div className="mt-5">
          <Link href="/imageRandom" className="hover:text-amber-200">
            &rarr; Random Image Generator Unsplash
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Home;
