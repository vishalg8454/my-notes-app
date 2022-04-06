import "./archive-page.css";
import { useNote } from "../../context/note-context";
import { Note } from "../../components";

const ArchivePage = () => {
  const { archiveList } = useNote();
  return (
    <>
      {archiveList.length === 0 && <h2>Archive list is empty</h2>}
      {archiveList.map(({ enable, title, _id, color, text,dateTime }) => (
        <Note
          key={_id}
          noteEnable={enable}
          noteTitle={title}
          _id={_id}
          noteColor={color}
          noteText={text}
          isArchive={true}
          dateTime={dateTime}
        />
      ))}
    </>
  );
};

export { ArchivePage };
