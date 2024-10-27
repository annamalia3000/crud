import { useEffect, useState } from "react";
import axios from "axios";
import { Note } from "./components/Note/Note";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

type NoteInfo = {
  id: number;
  content: string;
};

const App: React.FC = () => {
  const [notes, setNotes] = useState<NoteInfo[]>([]);
  const [note, setNote] = useState("");
  const url = "http://localhost:7070/notes";

  //получение всех заметок
  const fetchNotes = async () => {
    try {
      const response = await axios.get(url);
      setNotes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
    console.log("Fetch");
  }, []);

  //добавление заметки
  const addNote = async () => {
    if (note.trim() !== "") {
      try {
        await axios.post(url, {
          id: 0,
          content: note,
        });
        setNote("");
        fetchNotes();
        console.log("Add");
      } catch (error) {
        console.log(error);
      }
    }
  };

  //удаление заметки
  const removeNote = async (id: number) => {
    try {
      await axios.delete(`${url}/${id}`);
      fetchNotes();
      console.log("Delete");
    } catch (error) {
      console.log(error);
    }
  };

  const updateNote = () => {
    fetchNotes();
    console.log("Update");
  };

  return (
    <div className="app">
      <div className="notes">
        <h2 className="title">Notes</h2>
        <button className="update-button" type="button" onClick={updateNote}>
          <i className="fa fa-undo"></i>
        </button>
      </div>
      <div className="notes-container">
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            content={note.content}
            removeNote={removeNote}
          />
        ))}
      </div>
      <div className="new-note">
        <h3 className="new-note-title">New Note</h3>
        <div className="textarea-container">
          <textarea
            className="new-note-textarea"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button className="submit-button" type="button" onClick={addNote}>
            <i className="fa fa-location-arrow"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
