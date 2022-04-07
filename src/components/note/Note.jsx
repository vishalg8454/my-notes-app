import React, { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import { useState } from "react";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import "react-quill/dist/quill.snow.css";
import "./note.css";
import { useNote } from "../../context/note-context";
import { LabelChip } from "../../components";

const arr = [
  { value: "Urgent", id: 1 },
  { value: "Work", id: 2 },
  { value: "Office", id: 3 },
  { value: "To-do", id: 4 },
];

const Note = ({
  _id,
  noteEnable,
  noteText,
  noteColor,
  noteTitle,
  isArchive,
  dateTime,
  noteTags,
}) => {
  const [text, setText] = useState(noteText);
  const [enable, setEnable] = useState(noteEnable);
  const [color, setColor] = useState(noteColor);
  const [title, setTitle] = useState(noteTitle);
  const [tags, setTags] = useState(noteTags);

  // const { hour, minutes, day, month } = dateTime;

  const inputRef = useRef();

  const {
    saveNoteHandler,
    archiveNote,
    unarchiveNote,
    deleteNote,
    deleteArchiveNote,
  } = useNote();

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

  function checkBoxHandler(event) {
    const include = event.target.checked;
    const label = event.target.name;
    if (include) {
      setTags([...tags, label]);
    } else {
      setTags([...tags.filter((tag) => tag !== label)]);
    }
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
        <div className="date-container">
          <span className="date-txt">{`Created at: ${dateTime}`}</span>
        </div>
        {enable && (
          <button
            className="note-cta"
            onClick={() => {
              setEnable(false);
              saveNoteHandler({
                title: title,
                _id: _id,
                color: color,
                text: text,
                dateTime: dateTime,
                tags: tags,
              });
            }}
          >
            Save Note
          </button>
        )}
        {!enable && !isArchive && (
          <button
            className="note-btn"
            onClick={() => {
              setEnable(true);
            }}
          >
            <EditOutlinedIcon />
          </button>
        )}
        {isArchive ? (
          <button
            className="note-btn"
            onClick={() =>
              unarchiveNote({
                title: title,
                _id: _id,
                color: color,
                text: text,
                dateTime: dateTime,
              })
            }
          >
            <UnarchiveOutlinedIcon />
          </button>
        ) : (
          <button
            className="note-btn"
            onClick={() =>
              archiveNote({
                title: title,
                _id: _id,
                color: color,
                text: text,
                dateTime: dateTime,
              })
            }
          >
            <ArchiveOutlinedIcon />
          </button>
        )}

        <button
          className="note-btn"
          onClick={() =>
            isArchive
              ? deleteArchiveNote({
                  title: title,
                  _id: _id,
                  color: color,
                  text: text,
                  dateTime: dateTime,
                })
              : deleteNote({
                  title: title,
                  _id: _id,
                  color: color,
                  text: text,
                  dateTime: dateTime,
                })
          }
        >
          <DeleteOutlinedIcon style={{ cursor: "pointer" }} />
        </button>
      </div>

      {enable && (
        <div className="label-container">
          <ul className="label-ul">
            {arr.map(({ value, id }) => (
              <li key={id} className="label-li">
                <input
                  id={id}
                  type="checkbox"
                  name={value}
                  checked={tags.some((tag) => tag === value)}
                  onChange={(e) => checkBoxHandler(e)}
                />
                <label htmlFor={id}>{value}</label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!enable && tags.length > 0 && (
        <div className="label-chip-container">
          {tags.map((labelName) => (
            <LabelChip labelName={labelName} key={labelName} />
          ))}
        </div>
      )}
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
