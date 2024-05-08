"use client";
import React, { useState } from "react";
import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Calendar, Button, Form, Input, Modal } from "antd";
import { Card, Col, Rate, Row, Spin, Typography } from "antd";
import type { Dayjs } from "dayjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

const getListData = (value: Dayjs) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
        { type: "error", content: "This is error event." },
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "This is warning event" },
        { type: "success", content: "This is very long usual event......" },
        { type: "error", content: "This is error event 1." },
        { type: "error", content: "This is error event 2." },
        { type: "error", content: "This is error event 3." },
        { type: "error", content: "This is error event 4." },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const App: React.FC = () => {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [content, setContent] = useState("");
  const [eventID, setEventID] = useState(null); // ID of the event to update
  const [deleteEventFlag, setDeleteEventFlag] = useState(false); // État pour gérer la suppression

  const [form] = Form.useForm(); // Utilisez le hook useForm

  const handleDateSelect = (value: Dayjs) => {
    setSelectedDate(value);
    setShowModal(true);
  };

  const handleFormSubmit = () => {
    // Enregistrez le contenu dans la date sélectionnée
    form.submit(); // Soumettez le formulaire
  };

  const onFinish = async (values: any) => {
    if (eventID && deleteEventFlag) {
      await deleteEvent(eventID); // DELETE method
      setDeleteEventFlag(false); // Reset the delete flag
    } else if (eventID) {
      await updateEvent(eventID, values); // PUT method
    } else {
      await createEvent(values); // POST method
    }
  };

  const createEvent = async (values: any) => {
    try {
      const response = await axios.post(
        "http://localhost:6000/api/createplanning",
        {
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user!.token}`,
          },
        }
      );
      console.log("Event created:", response.data);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const updateEvent = async (id: any, values: any) => {
    try {
      const response = await axios.put(
        `http://localhost:6000/api/updateEmployeePlanning/${id}`,
        {
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user!.token}`,
          },
        }
      );
      console.log("Event updated:", response.data);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };
  const deleteEvent = async (id: any) => {
    try {
      const response = await axios.delete(
        `http://localhost:6000/api/deleteEmployeePlanning/${id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user!.token}`,
          },
        }
      );
      console.log("Event deleted:", response.data);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  const { isLoading, error } = useQuery({
    queryKey: ["plan"],
    queryFn: async () => {
      const response = await axios.get(
        "https://api.github.com/repos/TanStack/query"
      );
      const data = await response.json();
      return data;
    },
  });

  return (
    <>
      <Calendar
        cellRender={dateCellRender}
        onSelect={handleDateSelect}
        monthCellRender={monthCellRender}
      />
      <Modal
        title="Ajouter un contenu"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleFormSubmit}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item label="Date sélectionnée">
            <Input value={selectedDate?.format("YYYY-MM-DD")} disabled />
          </Form.Item>
          <Form.Item
            label="Contenu"
            name="message"
            rules={[{ required: true, message: "Please input your content!" }]}
          >
            <Input.TextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="default"
              onClick={() => setDeleteEventFlag(true)}
              loading={isLoading}
            >
              Supprimer l'événement
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default App;
