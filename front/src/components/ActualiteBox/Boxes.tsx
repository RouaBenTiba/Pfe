"use client";
import React, { useEffect, useState } from "react";
import { Card, Col, Rate, Row, Spin, Typography } from "antd";
import logo from "../../images/logo.png";
import { GiftOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [daysRemaining, setDaysRemaining] = useState<number>(0);
  const [userName] = useState("Arwa Ghariani"); // Définir nom par défaut
  const { data: session } = useSession();
  const [mission] = useState(
    "Développement d'une plateforme de pointage en intégrant le reconnaissance faciale."
  );
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const dateStr = now.toLocaleDateString("fr-FR");
      const timeStr = now.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Calcul du nombre de jours restants pour la période de paie
      const lastDayOfMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0
      ).getDate();
      const remainingDays = lastDayOfMonth - now.getDate();

      setDate(dateStr);
      setTime(timeStr);
      setDaysRemaining(remainingDays);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["actualite"],
    queryFn: async () => {
      const response = await axios.get(
        "https://api.github.com/repos/TanStack/query",
        {
          headers: {
            Authorization: "Bearer " + session?.user!.token,
          },
        }
      );
      return response.data;
    },
  });

  if (isLoading) {
    return <Spin spinning />;
  }
  if (error) {
    console.log(error);
  }
  return (
    <div className="dashboardLayout">
      <Row gutter={[16, 16]}>
        {/* Colonne 1 */}
        <Col span={8}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card className="customCard">
                <div className="timeSection">
                  <Text
                    className="text-gray-600 text-sm"
                    style={{ color: "#4285f4" }}
                  >
                    {date}
                  </Text>
                  <Title level={1} className="font-bold text-gray-800">
                    {time}
                  </Title>
                </div>
              </Card>
            </Col>
            <Col span={24}>
              <Card className="customCard">
                <h3>Sommaire de la paie:</h3>
                <Title>{daysRemaining}</Title>
                <p>Jours restants pour ma période de paie.</p>
              </Card>
            </Col>
            <Col span={24}>
              <Card className="customCard">
                <h3>Demandes en attente:</h3>
                <div className="vloc">
                  <p>Rien à signaler</p>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Colonne 2 */}
        <Col span={8}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card className="customCard" style={{ height: 435 }}>
                <div className="logoSection">
                  <img
                    src={logo.src}
                    alt=""
                    style={{
                      width: "85px",
                    }}
                  />
                </div>
                <div className="siteInfo">
                  <h3>Point Y Day is the best way</h3>
                  <p>
                    C'est la plateforme idéale pour le pointage des employees et
                    suivi de présence.
                  </p>
                  <p>
                    Espace parfait pour suivre vos demandes de congés ou trouver
                    tous les employees de votre entreprise.
                  </p>
                  <p>Pointage avec reconnaissance faciale.</p>
                </div>
              </Card>
            </Col>
            <Col span={24}>
              <Card
                className="customCard"
                style={{ height: 175, marginTop: 10 }}
              >
                <h3>Anniversaire à venir:</h3>
                <div
                  className="vloc"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <GiftOutlined />
                  <p>Aucun cette semaine</p>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Colonne 3 */}
        <Col span={8}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card className="customCard">
                <h3>{userName}</h3>
                <p>Post: </p>
              </Card>
            </Col>
            <Col span={24}>
              <Card className="customCard">
                <h3>Mission:</h3>
                <p>{mission}</p>
              </Card>
            </Col>
            <Col span={24}>
              <Card className="customCard">
                <h3>Rates:</h3>
                <Rate allowHalf defaultValue={2.5} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
