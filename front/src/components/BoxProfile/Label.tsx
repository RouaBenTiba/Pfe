/*import React, { useState } from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
} from "antd";
import { Option } from "antd/lib/mentions";
import { UploadOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

// Interface pour décrire la structure des données utilisées dans le formulaire
interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}
const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
// Options pour le composant Cascader représentant les lieux géographiques
const residences: DataNodeType[] = [
  {
    value: "France",
    label: "France",
    children: [
      {
        value: "Lyon",
        label: "Lyon",
        children: [
          {
            value: "Villeurbanne",
            label: "Villeurbanne",
          },
        ],
      },
    ],
  },
  {
    value: "Tunisie",
    label: "Tunisie",
    children: [
      {
        value: "Monastir",
        label: "Monastir",
        children: [
          {
            value: "Sahline",
            label: "Sahline",
          },
          {
            value: "Monastir",
            label: "Monastir",
          },
          {
            value: "Jammel",
            label: "Jammel",
          },
          {
            value: "Khnis",
            label: "Khnis",
          },
        ],
      },
      {
        value: "Tunis",
        label: "Tunis",
        children: [
          {
            value: "Ariana",
            label: "Ariana",
          },
          {
            value: "Benarous",
            label: "Benarous",
          },
        ],
      },
    ],
  },
];

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Option value="216">+216</Option>
      <Option value="33">+33</Option>
    </Select>
  </Form.Item>
);
interface LabelProps {
  onUpdateUserName: (newName: string) => void;
  onUpdateUserImage: (newImage: string) => void;
}

const App: React.FC<LabelProps> = ({ onUpdateUserName, onUpdateUserImage }) => {
  const [editMode, setEditMode] = useState(true);
  const [formData, setFormData] = useState<any>({});
  const [name, setName] = useState("Arwa Ghariani");
  const [image, setImage] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleImageChange = (info: any) => {
    if (info.file.status === "done") {
      const imageUrl = URL.createObjectURL(info.file.originFileObj);
      setImage(imageUrl);
      onUpdateUserImage(imageUrl); // Appeler la fonction de mise à jour de l'image
    }
  };

  const handleSubmit = () => {
    onUpdateUserName(name);
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    setFormData(values);
    setEditMode(true);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 40,
      }}
    >
      <Form
        style={{ width: "50%" }}
        initialValues={formData}
        onFinish={onFinish}
        layout="vertical"
        disabled={editMode}
      >
        <Form.Item>
          {editMode ? (
            <Button
              type="primary"
              onClick={() => setEditMode(false)}
              style={{ float: "right" }}
              disabled={!editMode}
            >
              Modifier
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => setEditMode(false)}
              style={{ float: "right" }}
              disabled={editMode}
            >
              Save
            </Button>
          )}
        </Form.Item>
        <Form.Item label="Name:" style={{ width: "100%" }}>
          <Input value={name} onChange={handleNameChange} />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="Email:"
          style={{ width: "100%" }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="residence"
          label="Habitual Residence:"
          rules={[
            {
              type: "array",
            },
          ]}
          style={{ width: "100%" }}
        >
          <Cascader options={residences} />
        </Form.Item>
        <Form.Item name="phone" label="Phone Number:" style={{ width: "100%" }}>
          <Input addonBefore={prefixSelector} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password:"
          hasFeedback
          style={{ width: "100%" }}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="repeat_password"
          label="Confirm Password:"
          dependencies={["password"]}
          hasFeedback
          style={{ width: "100%" }}
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="photo"
          label="Changer photo de profile:"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          style={{ width: "100%" }}
        >
          {editMode && (
            <Upload
              action="/upload.do"
              listType="picture"
              onChange={handleImageChange}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          )}
        </Form.Item>
        <Form.Item>
          {editMode && (
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              onClick={handleSubmit}
            >
              Register
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;*/
import React, { useState } from "react";
import { Button, Cascader, Form, Input, Select, Upload, message } from "antd";
import { Option } from "antd/lib/mentions";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const App = ({ onUpdateUserName, onUpdateUserImage }) => {
  const [editMode, setEditMode] = useState(true);
  const [formData, setFormData] = useState({});

  const handleImageChange = async (info: any) => {
    if (info.file.status === "done") {
      const formData = new FormData();
      formData.append("photo", info.file.originFileObj);
      try {
        const response = await axios.post(
          "http://localhost:6000/api/profiles",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const imageUrl = response.data.path; // Assuming your server returns the path to the stored image
        onUpdateUserImage(imageUrl); // Update parent component state with new image URL
        message.success("Image uploaded successfully");
      } catch (error) {
        console.error("Failed to upload image:", error);
        message.error("Failed to upload image");
      }
    }
  };

  const onFinish = async (values: any) => {
    setFormData(values);
    await updateProfile(values);
  };

  const updateProfile = async (values: any) => {
    try {
      const response = await axios.put(
        "http://localhost:6000/api/profile",
        { ...values },
        {
          headers: {
            Authorization: `Bearer ${session?.user!.token}`,
          },
        }
      );
      console.log("Profile updated:", response.data);
      message.success("Profile updated successfully");
      onUpdateUserName(values.name); // Update parent component state with new name
    } catch (error) {
      console.error("Failed to update profile:", error);
      message.error("Failed to update profile");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
      <Form
        style={{ width: "50%" }}
        initialValues={formData}
        onFinish={onFinish}
        layout="vertical"
        disabled={editMode}
      >
        <Form.Item>
          {editMode ? (
            <Button
              type="primary"
              onClick={() => setEditMode(false)}
              style={{ float: "right" }}
            >
              Edit
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => setEditMode(true)}
              style={{ float: "right" }}
            >
              Save
            </Button>
          )}
        </Form.Item>
        <Form.Item label="Name:" name="name" style={{ width: "100%" }}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email:" style={{ width: "100%" }}>
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Phone Number:" style={{ width: "100%" }}>
          <Input />
        </Form.Item>
        <Form.Item
          name="photo"
          label="Change Profile Photo:"
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
          style={{ width: "100%" }}
        >
          <Upload
            action="#"
            listType="picture"
            beforeUpload={() => false} // Prevent the default behavior of uploading
            onChange={handleImageChange}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
