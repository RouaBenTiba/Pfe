"use client";
import React, { useState } from "react";
import { Col, Row, Alert, Form, Input, Typography, Avatar } from "antd";
import profile from "../../images/profile.webp";
import Label from "./Label";
const App: React.FC = () => {
  const [userName, setUserName] = useState("ArwaRoua TibaGhariani"); // Définir nom par défaut
  const [userImage, setUserImage] = useState(profile.src); // Définir image par défaut

  const updateUserName = (newName: string) => {
    setUserName(newName);
  };
  const updateUserImage = (newImage: string) => {
    setUserImage(newImage);
  };

  return (
    <Row>
      <Col
        className="bloc2"
        span={17}
        push={7}
        style={{
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          backgroundColor: "#F5F7F8",
        }}
      >
        <Label
          onUpdateUserName={updateUserName}
          onUpdateUserImage={updateUserImage}
        />
      </Col>
      <Col
        className="bloc1"
        span={7}
        pull={17}
        style={{
          border: "0.15px solid #ede1e7",
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          backgroundColor: "#F3F3F3",
          display: "flex",
          flexDirection: "column", // Pour aligner le contenu verticalement
          alignItems: "center", // Pour centrer le contenu horizontalement
          justifyContent: "center",
        }}
      >
        {/* Utilisation du composant Avatar pour afficher la photo de profil */}
        <Avatar size={128} src={userImage} />
        <p>{userName}</p>
      </Col>
    </Row>
  );
};

export default App;
