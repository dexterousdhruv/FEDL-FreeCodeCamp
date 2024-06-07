import {marked} from "marked";
import { useEffect, useRef, useState } from "react";
import Data from "./Data";

function App() {
  const [markdown, setMarkdown] = useState(Data);
  const [overflow, setOverflow] = useState(false)

  let previewHeight 
 
  const getHtml = (content) => {
    return marked(content);
  };

  useEffect(() => setMarkdown(Data), [Data])
  useEffect(() => {
    let previewHeight = document.getElementById('preview-container').offsetHeight
    console.log(preview.offsetHeight)
    setOverflow(previewHeight > 508 ? true : false )
  }, [previewHeight])

  return (
    <div className="h-full max-xsm:mb-20">
      <div className={`flex items-center px-6 md:px-12 py-4 bg-purple-600`}>
        <div className=" flex items-center gap-x-4 text-lg sm:text-2xl text-white font-semibold ">
          <img
            src="https://cdn.icon-icons.com/icons2/2699/PNG/512/markdown_here_logo_icon_169967.png"
            className="bg-white p-1"
            alt=""
            width={30}
          />
          Markdown Editor
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-full justify-center items-center gap-x-5 gap-y-10 pt-16">
        <div className="w-[240px] xxx-sm:w-[300px] xx-sm:w-[350px] xsm:w-[450px] h-[550px] shadow-lg rounded-md overflow-hidden">
          <h1 className="bg-purple-600 text-center py-2 text-white">
            Markdown
          </h1>
          <textarea
            id="editor"
              className="h-[92%] w-[97%] outline-none resize-none ml-[3%] "
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          ></textarea>
        </div>
        <div id='preview-container' className="w-[240px] xxx-sm:w-[300px] xx-sm:w-[350px] xsm:w-[450px] h-[550px] shadow-lg rounded-md overflow-hidden">
          <h1 className="bg-purple-600  text-center py-2 text-white">Preview</h1>
          <div
            id="preview"
            className={`  w-[97%] h-[92.3%] ml-[3%]  ${ overflow ? 'overflow-y-scroll' : ''}` }
            dangerouslySetInnerHTML={{ __html: getHtml(markdown) }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
