"use client";
import React, { useState, useRef } from "react";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Space,
  Table,
  Popconfirm,
  Typography,
  Modal,
  Form,
  Row,
  Col,
} from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";

type InputRef = React.MutableRefObject<Input>;

interface DataType {
  key: string;
  name: string;
  dob: string; // Ajout du champ dob (Date de naissance)
  tel: string; // Ajout du champ tel (Téléphone)
  email: string; // Ajout du champ email (Email)
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: "1",
    name: "Roua Ben Tiba",
    dob: "09-02-2003",
    tel: "99800500",
    email: "Bentibaroua95@gmail.com",
  },
  {
    key: "2",
    name: "Ghariani Arwa",
    dob: "28-04-2001",
    tel: "53551442",
    email: "gharianiarwa01@.com",
  },
  {
    key: "3",
    name: "Salah Mohamed",
    dob: "03-03-1990",
    tel: "96300400",
    email: "Salah@example.com",
  },
  {
    key: "4",
    name: "Ali Mohamed",
    dob: "22-05-2000",
    tel: "99758213",
    email: "ali@example.com",
  },
];

const App: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const searchInput = useRef<InputRef>(null);
  const [dataSource, setDataSource] = useState(data);

  const handleSearch = (
    selectedKeys: React.Key[],
    confirm: (close: boolean) => void,
    dataIndex: DataIndex
  ) => {
    confirm(false);
    setSearchText(selectedKeys[0] as string);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): { filterDropdown: React.FC<FilterDropdownProps> } => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            if (node) {
              searchInput.current = node as unknown as InputRef;
            }
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      key: "dob",
      width: "20%",
      ...getColumnSearchProps("dob"),
    },
    {
      title: "Tel",
      dataIndex: "tel",
      key: "tel",
      width: "20%",
      ...getColumnSearchProps("tel"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "25%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Operation",
      dataIndex: "operation",
      width: "35%",
      render: (_: any, record: DataType) => {
        return (
          <Space size="middle">
            <Typography.Link onClick={() => handleEdit(record.key)} key="edit">
              <EditOutlined />
              Edit
            </Typography.Link>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <Button type="primary" danger>
                <DeleteOutlined /> Delete
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const handleEdit = (key: React.Key) => {
    console.log("Edit Key:", key);
    // Implement edit logic here
  };

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const handleAdd = () => {
    form.validateFields().then((values) => {
      const newData = {
        key: Math.random().toString(),
        ...values,
      };
      setDataSource([...dataSource, newData]);
      setVisible(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Add New Employee
      </Button>
      <Table columns={columns} dataSource={dataSource} />
      <Modal
        title="Add New Employee"
        visible={visible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button key="add" type="primary" onClick={handleAdd}>
            Add
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter name" }]}
              >
                <Input placeholder="Enter name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dob"
                label="Date of Birth"
                rules={[
                  { required: true, message: "Please enter date of birth" },
                ]}
              >
                <Input placeholder="Enter date of birth" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="tel"
                label="Tel"
                rules={[{ required: true, message: "Please enter tel" }]}
              >
                <Input placeholder="Enter tel" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Please enter email" }]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default App;
