import "./label-page.css";
import { useNote } from "../../context/note-context";
import { useUser } from "../../context/user-context";
import { useEffect, useState } from "react";
import { LabelChip, Note } from "../../components";

const LabelPage = () => {
  const { notesList } = useNote();
  const [labels, setLabels] = useState([]);
  const {encodedToken} = useUser();

  useEffect(() => {
    notesList.forEach((note) =>
      note.tags.forEach((tag) =>
        setLabels((prev) => [...new Set([...prev, tag])])
      )
    );
  }, [notesList]);

  if (!encodedToken) {
    return <h2 className="show-empty-header">Login to view your labels.</h2>;
  }

  return (
    <main>
      {labels.length === 0 && (
        <h2 className="show-empty-header">No Labels to show.</h2>
      )}
      {labels.map((label) => {
        return (
          <>
            {" "}
            <LabelChip labelName={label} />
            {}
            {notesList
              .filter((note) => note.tags.some((tag) => tag === label))
              .map(({ enable, title, _id, color, text, dateTime, tags }) => (
                <Note
                  key={_id}
                  noteEnable={enable}
                  noteTitle={title}
                  _id={_id}
                  noteColor={color}
                  noteText={text}
                  isArchive={false}
                  dateTime={dateTime}
                  noteTags={tags}
                />
              ))}
          </>
        );
      })}
    </main>
  );
};

export { LabelPage };
