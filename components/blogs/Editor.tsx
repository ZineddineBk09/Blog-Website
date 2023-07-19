"use client";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
const TextEditor = ({ setBody, body }: any) => {
  const editorRef = useRef<any>(null);

  const handleEditorChange = (content: any, editor: any) => {
    setBody(content);
  };

  return (
    <div>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
        init={{
          height: 500,
          menubar: true,
          plugins:
            "advlist autolink lists link image charmap preview anchor " +
            "searchreplace visualblocks code fullscreen " +
            "insertdatetime media table code help wordcount",
          toolbar:
            "undo redo | formatselect | fontsizeselect| " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onEditorChange={handleEditorChange}
        value="<p>This is the initial content of the editor</p>"
      />
      {/* <button onClick={log}>Log editor content</button> */}
    </div>
  );
};

export default TextEditor;
