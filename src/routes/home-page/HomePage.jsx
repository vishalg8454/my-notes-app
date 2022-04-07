import "./home-page.css";
import { Note } from "../../components";
import { useNote } from "../../context/note-context";

const HomePage = () => {
  const { notesList } = useNote();
  return (
    <>
      {notesList.length === 0 && (
        <h2 className="show-empty-header">No Notes to show. </h2>
      )}
      {notesList.map(({ enable, title, _id, color, text, dateTime, tags }) => (
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
};

export { HomePage };
