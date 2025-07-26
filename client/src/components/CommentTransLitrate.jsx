import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function CommentTransLitrate() {
  const [text, setText] = useState("");

  // Update state on typing
  const handleChange = (e) => setText(e.target.value);

  // Detect Space Key
  const handleKeyDown = async (e) => {
    if (e.key === " ") {
      const words = text.trim().split(" ");
      const lastWord = words[words.length - 1];

      if (lastWord) {
        const hindiWord = await transliterateToHindi(lastWord);
        words[words.length - 1] = hindiWord;
        setText(words.join(" ") + " "); // Add space back
      }
    }
  };

  // Call Google Input Tools API
  const transliterateToHindi = async (word) => {
    try {
      const response = await fetch(
        `https://inputtools.google.com/request?text=${word}&itc=hi-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8`
      );
      const data = await response.json();
      console.log("response", data);
      if (data[0] === "SUCCESS") {
        return data[1][0][1][0]; // First suggestion
      }
      return word; // fallback if API fails
    } catch {
      return word; // fallback
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("comment ", text);
  };

  return (
    <div className="py-2">
      <h2 className="mb-2.5">
        Type in English "aajkal" → Converts to Hindi "आजकल" after pressing Space
        key
      </h2>
      <Textarea
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={6}
        cols={50}
        placeholder="Type here..."
        // style={{ fontSize: "18px", padding: "10px" }}
      />
      <Button className="mt-5.5" onClick={handleSubmit}>
        comment
      </Button>
    </div>
  );
}
