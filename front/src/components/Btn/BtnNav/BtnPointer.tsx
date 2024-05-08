/*import React, { useState } from "react";
import { Button, Drawer, Layout, message } from "antd";
import { SmileOutlined, ClockCircleOutlined } from "@ant-design/icons";

const PointerPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const startTimer = () => {
    setTimerRunning(true);
    setStartTime(Date.now()); // Enregistrer l'heure de début
  };

  const stopTimer = () => {
    if (timerRunning) {
      setTimerRunning(false);
      setEndTime(Date.now()); // Enregistrer l'heure de fin
    } else {
      message.warning("Timer not started.");
    }
  };

  const calculateDuration = () => {
    if (startTime && endTime) {
      const durationMilliseconds = endTime - startTime;
      const durationSeconds = Math.floor(durationMilliseconds / 1000);
      const hours = Math.floor(durationSeconds / 3600);
      const minutes = Math.floor((durationSeconds % 3600) / 60);
      const seconds = durationSeconds % 60;
      return `${hours}h ${minutes}m ${seconds}s`;
    }
    return "Timer not stopped.";
  };

  const handleRegisterClick = () => {
    const duration = calculateDuration();
    message.success(`Today's work time: ${duration}`);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showDrawer}
        style={{ width: "110px", marginRight: "50px" }}
      >
        Pointer
      </Button>
      <Drawer
        title="Don't forget to Point Your Day"
        width={520}
        closable={false}
        onClose={onClose}
        open={open}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Comic Sans MS, Comic Sans, cursive",
          fontSize: 20,
        }}
      >
        <Button
          type="primary"
          onClick={timerRunning ? stopTimer : startTimer}
          style={{ marginBottom: "20px", marginLeft: 130, marginTop: 100 }}
          icon={<ClockCircleOutlined />}
        >
          {timerRunning ? "Stop Timer" : "Start Timer"}
        </Button>
        <p>
          {timerRunning
            ? "Timer running..."
            : "Press 'Start Timer' to begin your work day."}
        </p>
        <Button
          type="primary"
          onClick={handleRegisterClick}
          style={{ marginLeft: 150 }}
        >
          Register
        </Button>
        <div style={{ marginTop: "20px" }}>
          {endTime && (
            <p>
              Total work time today: <strong>{calculateDuration()}</strong>
            </p>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default PointerPage;*/
import React, { useState } from "react";
import { Button, Drawer, message } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import axios from "axios"; // Assurez-vous d'importer axios

const PointerPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const startTimer = () => {
    setTimerRunning(true);
    setStartTime(Date.now()); // Enregistrer l'heure de début
  };

  const stopTimer = () => {
    if (timerRunning) {
      setTimerRunning(false);
      setEndTime(Date.now()); // Enregistrer l'heure de fin
    } else {
      message.warning("Timer not started.");
    }
  };

  const handleRegisterClick = async () => {
    if (!startTime || !endTime) {
      message.error("Please start and stop the timer before registering.");
      return;
    }

    const formattedStartTime = new Date(startTime).toISOString();
    const formattedEndTime = new Date(endTime).toISOString();

    try {
      const response = await axios.post(
        "http://localhost:6000/api/pointerpresence",
        {
          entryTime: formattedStartTime,
          exitTime: formattedEndTime,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user!.token}`, // Assurez-vous que ceci est configuré correctement
          },
        }
      );
      message.success(`Presence registered successfully: ${response.data}`);
    } catch (error) {
      message.error("Failed to register presence");
      console.error("Error registering presence:", error.response.data);
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showDrawer}
        style={{ width: "110px", marginRight: "50px" }}
      >
        Pointer
      </Button>
      <Drawer
        title="Don't forget to Point Your Day"
        width={520}
        closable={false}
        onClose={onClose}
        open={open}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Comic Sans MS, Comic Sans, cursive",
          fontSize: 20,
        }}
      >
        <Button
          type="primary"
          onClick={timerRunning ? stopTimer : startTimer}
          style={{ marginBottom: "20px", marginLeft: 130, marginTop: 100 }}
          icon={<ClockCircleOutlined />}
        >
          {timerRunning ? "Stop Timer" : "Start Timer"}
        </Button>
        <p>
          {timerRunning
            ? "Timer running..."
            : "Press 'Start Timer' to begin your work day."}
        </p>
        <Button
          type="primary"
          onClick={handleRegisterClick}
          style={{ marginLeft: 150 }}
        >
          Register
        </Button>
      </Drawer>
    </>
  );
};

export default PointerPage;
