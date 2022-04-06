import "./home-page.css";
import { Note } from "../../components";
import { useNote } from "../../context/note-context";

const HomePage = () => {
  const { notesList } = useNote();
  return (
    <>
      {notesList.map(({ enable, title, _id, color, text, dateTime }) => (
        <Note
          key={_id}
          noteEnable={enable}
          noteTitle={title}
          _id={_id}
          noteColor={color}
          noteText={text}
          isArchive={false}
          dateTime={dateTime}
        />
      ))}
    </>
  );
};

export { HomePage };
