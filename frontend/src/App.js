import React from 'react';

export default function App() {

  const [file, setFile] = React.useState();

  function uploadFile(file) {
    const req = new XMLHttpRequest();

    const formData = new FormData();
    formData.append("file", file, file.name);

    req.open("POST", "http://localhost:3001/upload");
    req.send(formData);
  }

  return (
    <div>
      <input 
        type="file" 
        onChange={(event) => {
          const file = event.target.files.item(0);
          if (file) {
            setFile(file);
          }
        }}/>
      <input 
        type="submit" 
        value="Upload"
        onClick={() => uploadFile(file)}
        />
    </div>
  );
}