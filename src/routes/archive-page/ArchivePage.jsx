import "./archive-page.css";
import { useNote } from "../../context/note-context";
import { useUser } from "../../context/user-context";
import { Note } from "../../components";

const ArchivePage = () => {
  const { archiveList } = useNote();
  const { encodedToken } = useUser();
  if (!encodedToken) {
    return <h2 className="show-empty-header">Login to view your archives.</h2>;
  }
  return (
    <>
      {archiveList.length === 0 && (
        <h2 className="show-empty-header">Archive list is empty</h2>
      )}
      {archiveList.map(
        ({ enable, title, _id, color, text, dateTime, tags }) => (
          <Note
            key={_id}
            noteEnable={enable}
            noteTitle={title}
            _id={_id}
            noteColor={color}
            noteText={text}
            isArchive={true}
            dateTime={dateTime}
            noteTags={tags}
          />
        )
      )}
    </>
  );
};

export { ArchivePage };
