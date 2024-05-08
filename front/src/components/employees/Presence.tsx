"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Table, Button } from "antd";

// Function to fetch presence data
const fetchPresenceData = async () => {
  const { data } = await axios.get("http://localhost:6000/api/monpresence");
  return data;
};
const PresenceData = async (id: any) => {
  const { data } = await axios.get(`http://localhost:6000/api/presences/${id}`);
  return data;
};
const PresencePage = () => {
  const {
    data: tableData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["presence"],
    queryFn: fetchPresenceData,
    refetchInterval: 60000,
  });
  const onFinish = async (values: any) => {
    try {
      const response = await axios.put(
        "http://localhost:6000/api/validerprésence",
        {
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user!.token}`,
          },
        }
      );
      console.log("validation", response.data);
    } catch (error) {
      console.error("Error validation:", error);
    }
  };

  const columns = [
    { title: "Nom", dataIndex: "name", key: "name" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button onClick={() => onFinish(record)}>Save Changes</Button>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Presence Data</h1>
      <Table columns={columns} dataSource={tableData} />
    </div>
  );
};

export default PresencePage;
/*
"use client";
import { useState } from "react";
import { Table, Button } from "antd";
import { useQuery } from "@tanstack/react-query";
const data = [
  {
    key: "1",
    name: "Ghariani Arwa",
    presence: [false, false, false, false, false], // Exemple de présence pour les jours de la semaine (lundi à vendredi)
    editing: false,
    tempPresence: [true, true, false, false, true], // Valeur temporaire de présence pour l'édition
  },
  {
    key: "2",
    name: "Ben Tiba Roua",
    presence: [false, false, false, false, false],
    editing: false,
    tempPresence: [false, true, true, false, false],
  },
  // Ajoutez d'autres employés ici
];

const PresencePage = () => {
  const [tableData, setTableData] = useState(data);

  const handleEdit = (record) => {
    const newData = tableData.map((item) => {
      if (item.key === record.key) {
        // Initialiser les valeurs temporaires de présence avec les valeurs actuelles de présence
        return { ...item, editing: true, tempPresence: [...item.presence] };
      }
      return item;
    });
    setTableData(newData);
  };

  const handleSave = (record) => {
    const newData = tableData.map((item) => {
      if (item.key === record.key) {
        return { ...item, editing: false, presence: [...record.tempPresence] };
      }
      return item;
    });
    setTableData(newData);
    // Envoyer les données modifiées au backend
    console.log("Données modifiées:", newData);
  };

  const handlePresenceChange = (record, index) => {
    const newPresence = [...record.tempPresence];
    newPresence[index] = !newPresence[index];
    const newData = tableData.map((item) => {
      if (item.key === record.key) {
        return { ...item, tempPresence: newPresence };
      }
      return item;
    });
    setTableData(newData);
  };

  const columns = [
    {
      title: "Nom",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Présence",
      children: [
        {
          title: "Lundi",
          dataIndex: "presence[0]",
          key: "lundi",
          render: (_, record) => (
            <Button
              onClick={() => handlePresenceChange(record, 0)}
              type={
                record.editing
                  ? record.tempPresence[0]
                    ? "primary"
                    : "default"
                  : "text"
              }
            >
              {record.presence[0] ? "✔️" : "❌"}
            </Button>
          ),
        },
        {
          title: "Mardi",
          dataIndex: "presence[1]",
          key: "mardi",
          render: (_, record) => (
            <Button
              onClick={() => handlePresenceChange(record, 1)}
              type={
                record.editing
                  ? record.tempPresence[1]
                    ? "primary"
                    : "default"
                  : "text"
              }
            >
              {record.presence[1] ? "✔️" : "❌"}
            </Button>
          ),
        },
        {
          title: "Mercredi",
          dataIndex: "presence[2]",
          key: "mercredi",
          render: (_, record) => (
            <Button
              onClick={() => handlePresenceChange(record, 2)}
              type={
                record.editing
                  ? record.tempPresence[2]
                    ? "primary"
                    : "default"
                  : "text"
              }
            >
              {record.presence[2] ? "✔️" : "❌"}
            </Button>
          ),
        },
        {
          title: "Jeudi",
          dataIndex: "presence[3]",
          key: "jeudi",
          render: (_, record) => (
            <Button
              onClick={() => handlePresenceChange(record, 3)}
              type={
                record.editing
                  ? record.tempPresence[3]
                    ? "primary"
                    : "default"
                  : "text"
              }
            >
              {record.presence[3] ? "✔️" : "❌"}
            </Button>
          ),
        },
        {
          title: "Vendredi",
          dataIndex: "presence[4]",
          key: "vendredi",
          render: (_, record) => (
            <Button
              onClick={() => handlePresenceChange(record, 4)}
              type={
                record.editing
                  ? record.tempPresence[4]
                    ? "primary"
                    : "default"
                  : "text"
              }
            >
              {record.presence[4] ? "✔️" : "❌"}
            </Button>
          ),
        },
      ],
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <div>
          <Button type="text" onClick={() => handleEdit(record)}>
            Modifier
          </Button>
          {record.editing && (
            <Button type="primary" onClick={() => handleSave(record)}>
              Enregistrer
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Présence des jours</h1>
      <Table columns={columns} dataSource={tableData} />
    </div>
  );
};

export default PresencePage;*/
