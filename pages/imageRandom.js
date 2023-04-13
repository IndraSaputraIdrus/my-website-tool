import { Inter } from "next/font/google";
import { useState } from "react";
import ModalBox from "@/components/ModalBox";
import axios from "axios";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [query, setQuery] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const [isActive, setIsActive] = useState(false);

  const [image, setImage] = useState({});

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleWidth = (e) => {
    setWidth((prev) => (e.target.validity.valid ? e.target.value : prev));
  };

  const handleHeight = (e) => {
    setHeight((prev) => (e.target.validity.valid ? e.target.value : prev));
  };

  const handleSubmit = async () => {
    const url = "https://api.unsplash.com/photos/random";
    const response = await axios.get(url, {
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_ACCESS_KEY}`,
      },
      params: {
        query,
        h: height,
        w: width,
      },
    });
    setImage({
      id: response.data.id,
      thumbnail: response.data.urls.regular,
      height,
      width,
    });
    setIsActive(true);
  };

  return (
    <>
      <main
        className={`${inter.className} bg-slate-900 flex items-center justify-center bg-fill`}
      >
        <div className="max-w-5xl mx-auto p-5 text-white">
          <h1 className="text-2xl md:text-3xl lg:text-6xl font-semibold text-center">
            Generate Random Image
          </h1>
          <div className="grid grid-cols-1 gap-5 mt-10">
            <div className="flex flex-col">
              <label htmlFor="keyword">Keyword</label>
              <input
                value={query}
                onChange={handleQuery}
                className="px-4 py-2 mt-2 rounded-md bg-slate-700 focus:ring-amber-500 focus:border-amber-500"
                type="text"
                id="keyword"
                placeholder="Masukkan Keyword e.g Mountain, City"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="width">Width</label>
              <input
                pattern="[0-9]*"
                value={width}
                onChange={handleWidth}
                className="px-4 py-2 mt-2 rounded-md bg-slate-700 focus:ring-amber-500 focus:border-amber-500"
                type="text"
                id="width"
                placeholder="Masukkan Width"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="height">Height</label>
              <input
                pattern="[0-9]*"
                value={height}
                onChange={handleHeight}
                className="px-4 py-2 mt-2 rounded-md bg-slate-700 focus:ring-amber-500 focus:border-amber-500"
                type="text"
                id="height"
                placeholder="Masukkan Height"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="bg-amber-500 text-black px-4 py-2 rounded-md mt-3 hover:bg-amber-400"
            >
              Generate
            </button>
          </div>
        </div>
        <ModalBox
          image={image}
          height={height || image.height}
          width={width || image.width}
          isActive={isActive}
          onClose={() => setIsActive(false)}
        />
      </main>
      <Footer />
    </>
  );
}
