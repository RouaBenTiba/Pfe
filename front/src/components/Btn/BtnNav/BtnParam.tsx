import React, { useState } from "react";
import { Button, Modal } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const ParametreButton: React.FC = () => {
  const [visible, setVisible] = useState(false); // État pour contrôler la visibilité de la boîte modale

  // Fonction pour gérer la déconnexion et la redirection vers la page de connexion
  const handleLogout = () => {
    // Ajoutez ici la logique pour vous déconnecter si nécessaire
    // Puis redirigez vers la page de connexion
    window.location.href = "/Log/login"; // Redirection vers la page de connexion
  };

  return (
    <>
      {/* Bouton Paramètres */}
      <Button onClick={() => setVisible(true)}>
        <EllipsisOutlined />
      </Button>

      {/* Boîte modale */}
      <Modal
        title="Paramètres"
        visible={visible}
        onCancel={() => setVisible(false)} // Fonction pour fermer la boîte modale
        footer={[
          <Button key="logout" type="primary" onClick={handleLogout}>
            Log Out
          </Button>,
          <Button key="cancel" onClick={() => setVisible(false)}>
            Annuler
          </Button>,
        ]}
      >
        {/* Contenu supplémentaire de la boîte modale si nécessaire */}
      </Modal>
    </>
  );
};

export default ParametreButton;
