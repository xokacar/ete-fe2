import React, { useState } from "react";
import { Button, Container, Text } from "@mui/material";
import { styled } from "@mui/system";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const StyledInput = styled("input")({
  display: 'none',

});

const StyledButton = styled(Button)({
  backgroundColor: "#0077cc",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#005da6",
  },
});

const Title = styled(Text)({
  fontWeight: "bold",
  fontSize: "3rem",
  textAlign: "center",
  marginBottom: "2rem",
});

const Slogan = styled(Text)({
  fontSize: "1.5rem",
  textAlign: "center",
  marginBottom: "2rem",
});

function App() {
  const [emotion, setEmotion] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploadClicked, setIsUploadClicked] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    setIsUploadClicked(true);
    setError(null);
    setMessage("Uploading file...");

    const formData = new FormData();
    formData.append("file", selectedFile);

    // Copyright (c) 2023 @xokacar(https://kharj.tech)

    try {
      // Upload the file and wait for the response
      const response = await fetch("http://127.0.0.1:8000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Server responded with ${response.status}: ${response.statusText}`
        );
      }

      // Parse the response and set the emotion state variable
      const data = await response.json();
      setEmotion(data.emotion);

      // Clear the selected file and connection status
      setSelectedFile(null);

      setIsUploaded(true);
      setMessage("File uploaded successfully.");

      // Open a YouTube video based on the emotion output
      const videoIds = {
        neutral: "",
        calm: "7gphiFVVtUI",
        happy: "ZbZSe6N_BXs",
        sad: "wtOHNhG0EZc",
        angry: "Oqz2QNV58fw",
        fearful: "EKLWC93nvAU",
        disgust: "UfcAVejslrU",
        surprised: "2lCxeWvnMZY",
      };

      const videoId = videoIds[data.emotion]; // get the video ID for the corresponding emotion
      setMessage(`Redirecting you to a ${data.emotion} music video...`);

      // Wait for 3 seconds before redirecting to the music video
      setTimeout(() => {
        window.location.href = `https://www.youtube.com/watch?v=${videoId}`;
      }, 3000);
    } catch (error) {
      console.error(error);
      setError("Server error");
      setSelectedFile(null);
    }
  };

  return (
    <StyledContainer>
      <Title variant="h1">Embrace the Emotions</Title>
      <Slogan variant="h3">
        Upload your voice and let us find the emotion for you
      </Slogan>
      <label htmlFor="file-input">
        <StyledInput
          id="file-input"
          type="file"
          onChange={handleFileChange}
          inputProps={{
            accept: "audio/*",
          }}
        />
        <StyledButton
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
          onClick={handleUpload}
        >
          Upload your voice 😊
        </StyledButton>
      </label>
      {selectedFile && (
        <Text variant="body1" sx={{ marginTop: "20px", color: "black" }}>
          Your file is uploaded: {selectedFile.name}
        </Text>
      )}

      {error && (
        <Text variant="body1" sx={{ marginTop: "20px", color: "red" }}>
          {error}
        </Text>
      )}

      <StyledButton
        variant="contained"
        component="span"
        startIcon={<CloudUploadIcon />}
        onClick={handleUpload}
        sx={{ marginTop: "20px" }}
      >
        Run
      </StyledButton>
      {emotion && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text variant="h5" sx={{ color: "black" }}>
            Predicted emotion
          </Text>
          <Text
            variant="h5"
            sx={{ marginTop: "10px", color: "red", fontWeight: "bold" }}
          >
            {emotion}
          </Text>
        </div>
      )}
      {message && (
        <Text variant="body1" sx={{ marginTop: "20px", color: "black" }}>
          {message}
        </Text>
      )}
    </StyledContainer>
  );
}

export default App;
