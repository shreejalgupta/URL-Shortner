import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [inputIs, setInputIs] = useState("");
  const [errorIs, setErrorIs] = useState("");
  const [errorStatus, setErrorStatus] = useState(true);
  const [allUrls, setAllUrls] = useState([]);

  const allUrl = async () => {
    try {
      const urlIs = await axios.get("https://url-shortner-1-pscj.onrender.com/api/url");

      const allUrlIs = urlIs.data.data.allUrl;
      setAllUrls(allUrlIs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allUrl();
  }, []);

  const handleChange = (e) => {
    setInputIs(e.target.value);
  };

  const handleClick = async () => {
    if (inputIs.trim() == "") {
      setErrorStatus(true);
      setErrorIs("Try something like https://example.com/page.");
      return;
    }
    if (
      inputIs.includes("http://") == false &&
      inputIs.includes("https://") == false
    ) {
      setErrorStatus(true);
      setErrorIs(
        "That doesn't look like a web address. Try something like https://example.com/page.",
      );
    }
    setErrorIs(false);

    try {
      const newUrl = await axios.post("https://url-shortner-1-pscj.onrender.com/api/url-create", {
        url: inputIs.trim(),
      });
      setAllUrls((prev) => [...prev, newUrl.data.data]);
      
    } catch (error) {}
    
  };

  const handleCopyClick = (code) => {
      
    const baseUrl = `https://url-shortner-1-pscj.onrender.com/${code}`

    navigator.clipboard.writeText(baseUrl)
      .then(() => {
        alert("Copied: " + baseUrl);
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
      });
      
  }

  const deleteUrl = async (id) => {
    try {
      await axios.delete(`https://url-shortner-1-pscj.onrender.com/api/delete/${id}`);

      const newAllUrls = allUrls.filter((e) => e._id !== id);

      setAllUrls(newAllUrls);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUrlClick = (item) => {
    setAllUrls((prev) =>
      prev.map((url) =>
        url._id === item._id
          ? { ...url, click: Number(url.click || 0) + 1 }
          : url,
      ),
    );
  };

  return (
    <div className=" min-h-screen bg-gray-900 text-white p-6 ">
      {/* Creating Part */}
      <div className=" mx-auto max-w-2xl flex flex-col gap-7">
        {/* Heading & Input*/}
        <div className="flex flex-col gap-6 py-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl text-yellow-50 font-semibold">
              Shorten a Link
            </h2>
            <p className="text-gray-300">
              Paste a long address, get a short code you can share. Everything
              stays in this browser.
            </p>
          </div>
          {/* Input */}
          <div className="bg-[#182220] p-5 rounded-lg flex flex-col gap-4">
            <div className="border border-gray-700 px-3 py-2 rounded-lg">
              <input
                value={inputIs}
                onChange={handleChange}
                type="text"
                placeholder="https://example.com"
                className="w-full h-full outline-none focus-within:outline-none"
              />
            </div>
            <button
              onClick={handleClick}
              className="bg-green-800 px-3 py-2 rounded-lg text-lg font-medium tracking-wide w-full md:w-50 hover:bg-green-700 cursor-pointer duration-200"
            >
              Create
            </button>
            {errorStatus && <p className="text-red-400 text-xs">{errorIs}</p>}
          </div>
        </div>

        {/* Recent */}
        <div>
          <div className="flex justify-between text-yellow-50 border-b py-4 border-b-gray-500">
            <h3 className="text-xl">Recent links</h3>
            {/* count dynamic */}
            <p className="text-xl">
              <span>{allUrls.length}</span> Saved
            </p>
          </div>

          {/* dynamic links */}
          <div className="w-full h-full">
            {/* dynamic */}
            {allUrls.map((e, i) => (
              <div key={i} className="flex flex-col gap-2 border-b border-b-gray-500 py-4">
                <div className="flex flex-col ">
                  <a
                    href={`https://url-shortner-1-pscj.onrender.com/${e.shortCode}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => handleUrlClick(e)}
                    className="cursor-pointer hover:underline "
                  >
                    {e.shortCode}
                  </a>
                  <p className="w-full overflow-x-scroll no-scrollbar">
                    {e.originalUrl}
                  </p>
                </div>
                <div className="flex gap-4">
                  <p className="px-3 py-2 bg-gray-800 rounded-lg text-green-50">
                    {e.click} clicks
                  </p>
                  <button onClick={() => handleCopyClick(e.shortCode)} className="border border-white rounded-lg px-3 py-2 hover:bg-white hover:text-black duration-150 cursor-pointer">
                    Copy Link
                  </button>
                  <a
                    href={`https://url-shortner-1-pscj.onrender.com/${e.shortCode}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => handleUrlClick(e)}
                    className="px-3 py-2 bg-green-900 rounded-lg cursor-pointer hover:bg-green-800 duration-300"
                  >
                    Open
                  </a>
                  <button
                    className="px-3 py-2 bg-red-900 rounded-lg cursor-pointer hover:bg-red-800 duration-300 "
                    onClick={() => deleteUrl(e._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
