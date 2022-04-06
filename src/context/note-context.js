import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./user-context";
import { useToast } from "./toast-context";

const NoteContext = createContext(null);

const useNote = () => useContext(NoteContext);

const NoteProvider = ({ children }) => {
  const [notesList, setNotesList] = useState([]);
  const [archiveList, setArchiveList] = useState([]);
  const { encodedToken } = useUser();
  const { showToast } = useToast();

  function addBlankNote() {
    if (encodedToken) {
      setNotesList([
        ...notesList.filter((note) => note._id != 244),
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
          showToast({ message: "Error in editing notes", type: "failure" });
        }
      })();
    } else {
      showToast({ message: "Login to edit notes", type: "failure" });
    }
  }

  function archiveNote({ title, _id, color, text }) {
    if (encodedToken) {
      (async () => {
        try {
          const noteData = await axios.post(
            `/api/notes/archives/${_id}`,
            {
              note: { title: title, enable: false, color: color, text: text },
            },
            {
              headers: {
                authorization: encodedToken,
              },
            }
          );
          setArchiveList(noteData.data.archives);
          setNotesList(noteData.data.notes);
          showToast({ message: "Note archived successfully", type: "success" });
        } catch (error) {
          showToast({ message: "Error in archiving notes", type: "failure" });
        }
      })();
    } else {
      showToast({ message: "Login to archive notes", type: "failure" });
    }
  }

  function unarchiveNote({ title, _id, color, text }) {
    if (encodedToken) {
      (async () => {
        try {
          const noteData = await axios.post(
            `/api/archives/restore/${_id}`,
            {},
            {
              headers: {
                authorization: encodedToken,
              },
            }
          );
          setArchiveList(noteData.data.archives);
          setNotesList(noteData.data.notes);
          showToast({ message: "Note Unarchived successfully", type: "success" });
        } catch (error) {
          showToast({ message: "Error in Unarchiving notes", type: "failure" });
        }
      })();
    } else {
      showToast({ message: "Login to Unarchive notes", type: "failure" });
    }
  }

  function deleteNote({ title, _id, color, text }){
    if (encodedToken) {
      (async () => {
        try {
          const noteData = await axios.delete(
            `/api/notes/${_id}`,
            {
              headers: {
                authorization: encodedToken,
              },
            }
          );
          setNotesList(noteData.data.notes);
          showToast({ message: "Note Deleted successfully", type: "success" });
        } catch (error) {
          showToast({ message: "Error in Deleting notes", type: "failure" });
        }
      })();
    } else {
      showToast({ message: "Login to Delete notes", type: "failure" });
    }
  }

  function deleteArchiveNote({ title, _id, color, text }){
    if (encodedToken) {
      (async () => {
        try {
          const noteData = await axios.delete(
            `/api/archives/delete/${_id}`,
            {
              headers: {
                authorization: encodedToken,
              },
            }
          );
          setArchiveList(noteData.data.archives);
          showToast({ message: "Note Deleted successfully", type: "success" });
        } catch (error) {
          showToast({ message: "Error in Deleting notes", type: "failure" });
        }
      })();
    } else {
      showToast({ message: "Login to Delete notes", type: "failure" });
    }
  }

  return (
    <NoteContext.Provider
      value={{
        notesList,
        archiveList,
        addBlankNote,
        saveNoteHandler,
        archiveNote,
        unarchiveNote,
        deleteNote,
        deleteArchiveNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export { NoteProvider, useNote };
