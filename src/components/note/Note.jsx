import React, { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import { useState } from "react";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import "react-quill/dist/quill.snow.css";
import "./note.css";

const Note = ({
  _id,
  noteEnable = false,
  noteText = "",
  noteColor = "white",
  noteTitle = "",
}) => {
  const [text, setText] = useState(noteText);
  const [enable, setEnable] = useState(noteEnable);
  const [color, setColor] = useState(noteColor);
  const [title, setTitle] = useState(noteTitle);

  const inputRef = useRef();

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: ["small", false, "large", "huge"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: [] }, { align: [] }],
    ],
  };

  const noModules = {
    toolbar: false,
  };

  function saveNoteClickHandler(){
      
  }

  return (
    <div className="note-container" style={{ backgroundColor: color }}>
      <input
        className="note-title"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Click to add title"
        disabled={!enable}
        value={title}
      />
      <ReactQuill
        value={text}
        modules={enable ? modules : noModules}
        onChange={(e) => setText(e)}
        readOnly={!enable}
        placeholder={"Write your note here..."}
        ref={inputRef}
      />
      <div className="btn-container">
        {enable && (
          <button className="note-cta" onClick={() => setEnable(false)}>
            Save Note
          </button>
        )}
        {!enable && (
          <button className="note-btn" onClick={() => {setEnable(true);saveNoteClickHandler()}}>
            <EditOutlinedIcon />
          </button>
        )}
        <button className="note-btn">
          <ArchiveOutlinedIcon />
        </button>
        <button className="note-btn">
          <DeleteOutlinedIcon style={{ cursor: "pointer" }} />
        </button>
      </div>
      <div
        className="color-panel"
        style={enable ? { display: "flex" } : { display: "none" }}
      >
        <div
          onClick={() => setColor("antiquewhite")}
          className="color"
          style={{ backgroundColor: "antiquewhite" }}
        ></div>
        <div
          onClick={() => setColor("darkseagreen")}
          className="color"
          style={{ backgroundColor: "darkseagreen" }}
        ></div>
        <div
          onClick={() => setColor("lightgreen")}
          className="color"
          style={{ backgroundColor: "lightgreen" }}
        ></div>
        <div
          onClick={() => setColor("lightsalmon")}
          className="color"
          style={{ backgroundColor: "lightsalmon" }}
        ></div>
        <div
          onClick={() => setColor("mistyrose")}
          className="color"
          style={{ backgroundColor: "mistyrose" }}
        ></div>
        <div
          onClick={() => setColor("skyblue")}
          className="color"
          style={{ backgroundColor: "skyblue" }}
        ></div>
      </div>
    </div>
  );
};

export { Note };
