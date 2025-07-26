import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const CommentComp = () => {
  const [text, setText] = useState();

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("comment ", text);
  };
  return (
    <div className="py-2">
      <h1 className="mb-2.5">you can now type in English</h1>
      <Textarea placeholder="Type here..." onChange={handleChange} />
      <Button className="mt-5.5" onClick={handleSubmit}>
        comment
      </Button>
    </div>
  );
};

export default CommentComp;
