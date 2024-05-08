"use client";
import { useState } from "react";
import { DatePicker, Button, Select, Table, Space, Modal } from "antd";
import moment, { Moment } from "moment";

import "./style.css";

const { Option } = Select;

interface VacationRequest {
  id: number;
  startDate: Moment;
  endDate: Moment;
  type: string;
  status: string;
}

const VacationPage = () => {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [selectedType, setSelectedType] = useState<string>("");
  const [requests, setRequests] = useState<VacationRequest[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleStartDateChange = (date: Moment | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Moment | null) => {
    setEndDate(date);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };

  const handleRequestSubmit = () => {
    if (startDate && endDate && selectedType) {
      const newRequest: VacationRequest = {
        id: requests.length + 1,
        startDate,
        endDate,
        type: selectedType,
        status: "En attente",
      };
      setRequests([...requests, newRequest]);
      setIsModalVisible(false);
    } else {
      // Gérer le cas où les champs ne sont pas remplis
      // Vous pouvez afficher un message d'erreur ou effectuer une autre action
    }
  };

  const handleCancelRequest = (id: number) => {
    const updatedRequests = requests.map((request) =>
      request.id === id ? { ...request, status: "Annulée" } : request
    );
    setRequests(updatedRequests);
  };

  const columns = [
    {
      title: "Date de début",
      dataIndex: "startDate",
      key: "startDate",
      render: (date: Moment) => date.format("DD/MM/YYYY"),
    },
    {
      title: "Date de fin",
      dataIndex: "endDate",
      key: "endDate",
      render: (date: Moment) => date.format("DD/MM/YYYY"),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: VacationRequest) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => handleCancelRequest(record.id)}
            disabled={record.status !== "En attente"}
          >
            Annuler
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="vacation-page">
      <h1>Demandes de congés</h1>
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: 10 }}
      >
        Nouvelle demande
      </Button>
      <Modal
        title="Nouvelle demande de congés"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Annuler
          </Button>,
          <Button key="submit" type="primary" onClick={handleRequestSubmit}>
            Soumettre
          </Button>,
        ]}
      >
        <p>Date de début :</p>
        <DatePicker value={startDate} onChange={handleStartDateChange} />
        <p>Date de fin :</p>
        <DatePicker value={endDate} onChange={handleEndDateChange} />
        <p>Type de congé :</p>
        <Select value={selectedType} onChange={handleTypeChange}>
          <Option value="Maternité">Maternité</Option>
          <Option value="Maladie">Maladie</Option>
          <Option value="Congés annuels">Congés annuels</Option>
          <Option value="Un jour">Un jour</Option>
          {/* Ajoutez d'autres options de type de congé ici */}
        </Select>
      </Modal>
      <Table columns={columns} dataSource={requests} />
    </div>
  );
};

export default VacationPage;
