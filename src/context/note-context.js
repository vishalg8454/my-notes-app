import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./user-context";
import { useToast } from "./toast-context";
import { color } from "@mui/system";

const NoteContext = createContext(null);

const useNote = () => useContext(NoteContext);

const NoteProvider = ({ children }) => {
  const [notesList, setNotesList] = useState([]);
  const { encodedToken } = useUser();
  const { showToast } = useToast();

  useEffect(() => {
    console.log(notesList);
  }, [notesList]);

  function addBlankNote() {
    console.log("adding note");
    if (encodedToken) {
      setNotesList([
        ...notesList,
        { enable: true, title: "", _id: 244, color: "white", text: "" },
      ]);
    } else {
      showToast({ message: "Login to add notes", type: "failure" });
    }
  }

  function removeBlankNote() {
    setNotesList(notesList.filter((note) => note._id !== 244));
  }

  function saveNoteHandler({ title, _id, color, text }) {
    console.log("inside save note");
    console.log(title, _id);
    if (color === "" || text === "") {
      showToast({ message: "Note body cannot be empty", type: "failure" });
      removeBlankNote();
      return;
    }
    if (_id === 244) {
      postNote({ title: title, _id: _id, color: color, text: text });
    } else {
      editNote({ title: title, _id: _id, color: color, text: text });
    }
  }

  function postNote({ title, _id, color, text }) {
    if (encodedToken) {
      (async () => {
        try {
          const noteData = await axios.post(
            `/api/notes`,
            {
              note: { title: title, enable: false, color: color, text: text },
            },
            {
              headers: {
                authorization: encodedToken,
              },
            }
          );
          setNotesList(noteData.data.notes);
          showToast({ message: "Note added successfully", type: "success" });
        } catch (error) {
          console.log(error);
          showToast({ message: "Error in adding note", type: "failure" });
        }
      })();
    } else {
      showToast({ message: "Login to add notes", type: "failure" });
    }
  }

  function editNote({ title, _id, color, text }) {
    if (encodedToken) {
      (async () => {
        try {
          const noteData = await axios.post(
            `/api/notes/${_id}`,
            {
              note: { title: title, enable: false, color: color, text: text },
            },
            {
              headers: {
                authorization: encodedToken,
              },
            }
          );
          setNotesList(noteData.data.notes);
          showToast({ message: "Note edited successfully", type: "success" });
        } catch (error) {
          console.log(error);
          showToast({ message: "Error in editing notes", type: "failure" });
        }
      })();
    } else {
      showToast({ message: "Login to edit notes", type: "failure" });
    }
  }

  return (
    <NoteContext.Provider value={{ notesList, addBlankNote, saveNoteHandler }}>
      {children}
    </NoteContext.Provider>
  );
};

export { NoteProvider, useNote };
