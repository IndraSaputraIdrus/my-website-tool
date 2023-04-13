import axios from "axios";

const ModalBox = ({ isActive, onClose, image, width, height }) => {
  const handleClick = async () => {
    const apiUrl = `https://source.unsplash.com/${image.id}/${width}x${height}`;
    const filename = `${image.id}.png`;
    const req = await axios.get(apiUrl, { responseType: "arraybuffer" });
    const blob = new Blob([req.data], { type: req.headers["Content-Type"] });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-10 flex items-center justify-center transition-all duration-300 ease-out ${
        isActive ? "visible bg-black/40" : "invisible"
      }`}
    >
      <div
        className={`max-w-2xl bg-slate-800 p-5 rounded-md transition-all duration-300 ease-out ${
          isActive ? "scale-100 opacity-100" : "scale-105 opacity-0"
        }`}
      >
        <img src={image.thumbnail} className="w-full h-96 object-cover" />
        <button
          onClick={handleClick}
          className="text-center bg-amber-500 mt-5 py-2 px-4 block w-full rounded-md hover:bg-amber-400"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default ModalBox;
