// import { useEffect, useState } from "react";
import classes from "./note.module.css";

type NoteProps = {
  id: number;
  content: string;
  removeNote: (id: number) => void;
};

export const Note: React.FC<NoteProps> = ({ id, content, removeNote }) => {
  return (
    <div className={classes["note-item"]}>
      <span className={classes["content"]}>{content}</span>
      <button
        className={classes["remove-button"]}
        onClick={() => removeNote(id)}
      >
        <i className="fa fa-times"></i>
      </button>
    </div>
  );
};
