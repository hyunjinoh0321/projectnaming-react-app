
import React, {useState} from 'react';
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';

export default function TestPage() {

    const [content, setContent] = useState("");
    const modules = {
        toolbar: [
          [{ font: [] }],
          [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
      };
    
    const formats = [
        "font",
        "size",
        "header",
        "color",
        "background",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
      ];

    return (
        <>
            <ReactQuill
                style={{ height: "400px", margin: "4px" }}
                theme="snow"
                value={content}
                modules={modules}
                formats={formats}
                onChange={setContent}
                placeholder="내용을 입력하세요."
            />
        </>        
    );
}
