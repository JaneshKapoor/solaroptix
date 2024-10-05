// src/components/Dashboard.js
import React, { useState } from 'react';
import { Button, Card, Progress, Switch, Layout, Menu, Avatar, Upload, Table, Slider } from 'antd';  // Ant Design components
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LineChartOutlined, PieChartOutlined, SettingOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';
import Papa from 'papaparse';  // Import PapaParse for CSV parsing
import 'tailwindcss/tailwind.css';
import { useAuthState } from 'react-firebase-hooks/auth';  // Firebase hook to get user data
import icon from '../assets/Icon.png';  // Import SolarOptix logo
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';  // Recharts for charts

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);  // Get user info (photoURL and displayName)
  const [collapsed, setCollapsed] = useState(false);  // To handle sidebar collapse
  const [selectedMenu, setSelectedMenu] = useState('1');  // Track selected menu (1=Overview, 2=Insights)
  const [sliderValue, setSliderValue] = useState(50);  // State for slider value
  const [appliances, setAppliances] = useState({
    airConditioner: true,
    waterHeater: true,
    samsungTv: false,
    refrigerator: false,
  });

  // Handler for slider change
  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const solarPercentage = sliderValue;  // Dependency on solar
  const electricityPercentage = 100 - sliderValue;  // Dependency on electricity board

  // Handler for toggling appliance status
  const handleApplianceSwitch = (appliance) => {
    setAppliances((prevState) => ({
      ...prevState,
      [appliance]: !prevState[appliance],
    }));
  };

  // Function to render smaller Progress dials with grey color if appliances are off
  const renderProgressDial = (isOn, percentage) => {
    return (
      <Progress
        type="circle"
        percent={percentage}
        width={40}  // Smaller size for dials
        strokeColor={isOn ? '#1890ff' : '#d9d9d9'}  // Blue if ON, Grey if OFF
      />
    );
  };

  const [data, setData] = useState([]);  // State to hold CSV data

  // Define table columns for CSV content
  const columns = [
    { title: 'Appliance', dataIndex: 'Appliance', key: 'Appliance' },
    { title: 'Load (Watts)', dataIndex: 'Load', key: 'Load' },
    { title: 'Hours', dataIndex: 'Hours', key: 'Hours' },
    { title: 'Units Consumed (kWh)', dataIndex: 'Units', key: 'Units' },  // Calculated units
  ];

  // Handle CSV Upload and Parsing
  const handleFileUpload = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        const parsedData = result.data.slice(1).map((row) => ({
          Appliance: row[0],
          Load: parseFloat(row[1]),
          Hours: parseFloat(row[2]),
          Units: ((parseFloat(row[1]) * parseFloat(row[2])) / 1000).toFixed(2),  // Calculate units consumed
        }));

        setData(parsedData);
        toast.success("File uploaded successfully!");
      },
      header: false,
    });
    return false;  // Prevent automatic upload
  };

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate('/');
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  // Sample data for charts
  const dataSample = [
    { name: 'Mon', usage: 30, savings: 12 },
    { name: 'Tue', usage: 50, savings: 20 },
    { name: 'Wed', usage: 40, savings: 18 },
    { name: 'Thu', usage: 45, savings: 22 },
    { name: 'Fri', usage: 60, savings: 30 },
    { name: 'Sat', usage: 35, savings: 15 },
    { name: 'Sun', usage: 55, savings: 25 },
  ];

  const renderContent = () => {
    if (selectedMenu === '1') {
      return (
        <div className="grid grid-cols-3 gap-4">
          {/* Today's Usage */}
          <Card className="col-span-1">
            <h2 className="text-lg font-semibold">Today's Usage</h2>
            <div className="flex justify-between mt-4">
              <div className="text-red-500">12.2 kWh used</div>
              <div className="text-green-500">2.2 kWh saved</div>
            </div>
            <div className="mt-4 text-right">
              <span className="text-sm text-gray-500">12 Hours</span>
            </div>

            {/* Solar vs Electricity Slider */}
            <div className="mt-6">
              <h3 className="text-md font-semibold mb-2">Energy Source</h3>
              <div className="flex justify-between">
                <span>Solar Energy</span>
                <span>Electricity Board</span>
              </div>
              <Slider
                min={0}
                max={100}
                defaultValue={50}
                onChange={handleSliderChange}
              />
              <div className="flex justify-between mt-2">
                <span>{solarPercentage}% Solar</span>
                <span>{electricityPercentage}% Electricity</span>
              </div>
            </div>
          </Card>

          {/* Equipment Status with Progress Dials */}
          <Card className="col-span-1 mt-4">
            <h2 className="text-lg font-semibold">Equipment Status</h2>
            <div className="flex justify-between items-center mt-4">
              <span>Air Conditioner</span>
              <Switch checked={appliances.airConditioner} onChange={() => handleApplianceSwitch('airConditioner')} />
              {renderProgressDial(appliances.airConditioner, 80)}
            </div>
            <div className="flex justify-between items-center mt-4">
              <span>Water Heater</span>
              <Switch checked={appliances.waterHeater} onChange={() => handleApplianceSwitch('waterHeater')} />
              {renderProgressDial(appliances.waterHeater, 60)}
            </div>
            <div className="flex justify-between items-center mt-4">
              <span>Samsung TV</span>
              <Switch checked={appliances.samsungTv} onChange={() => handleApplianceSwitch('samsungTv')} />
              {renderProgressDial(appliances.samsungTv, 40)}
            </div>
            <div className="flex justify-between items-center mt-4">
              <span>Refrigerator</span>
              <Switch checked={appliances.refrigerator} onChange={() => handleApplianceSwitch('refrigerator')} />
              {renderProgressDial(appliances.refrigerator, 20)}
            </div>
          </Card>

          {/* Daily Tips */}
          <Card className="col-span-1">
            <h2 className="text-lg font-semibold">Daily Tips</h2>
            <p>Switch to LED lightbulbs in high-use areas to reduce lighting costs.</p>
          </Card>

          {/* Goals */}
          <Card className="col-span-1">
            <h2 className="text-lg font-semibold">Goals</h2>
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm">Target Achieved</div>
              <Progress type="dashboard" percent={80} />
            </div>
            <div className="text-sm mt-2 text-center">240 kWh of 300 kWh</div>
          </Card>

          {/* Monthly Statistics */}
          <Card className="col-span-2 mt-4">
            <h2 className="text-lg font-semibold">Monthly Statistics</h2>

            {/* Line Chart */}
            <LineChart width={600} height={300} data={dataSample}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="usage" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="savings" stroke="#82ca9d" />
            </LineChart>

            {/* Bar Chart */}
            <BarChart width={600} height={300} data={dataSample} className="mt-4">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="usage" fill="#8884d8" />
              <Bar dataKey="savings" fill="#82ca9d" />
            </BarChart>
          </Card>
        </div>
      );
    } else if (selectedMenu === '2') {
      return (
        <div style={{ padding: '20px' }}>
          <h2>Upload Your Appliance CSV File</h2>
          <p>The CSV should have the following columns: Appliance, Load (Watts), Hours.</p>

          {/* Upload Button */}
          <Upload beforeUpload={handleFileUpload} accept=".csv">
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>

          {/* Display the parsed CSV data in a table */}
          {data.length > 0 && (
            <>
              <h3 style={{ marginTop: '20px' }}>Uploaded Data</h3>
              <Table dataSource={data} columns={columns} pagination={false} />
            </>
          )}
        </div>
      );
    }
  };

  return (
    <Layout className="min-h-screen">
      {/* Sidebar */}
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="flex flex-col items-center p-4 text-white text-xl">
          <img src={icon} alt="SolarOptix Logo" className="w-10 h-10 mb-2" />
          {!collapsed && <span>SolarOptix</span>}  {/* Hide SolarOptix text when collapsed */}
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} selectedKeys={[selectedMenu]} onClick={({ key }) => setSelectedMenu(key)}>
          <Menu.Item key="1" icon={<LineChartOutlined />}>
            Overview
          </Menu.Item>
          <Menu.Item key="2" icon={<PieChartOutlined />}>
            Insights
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            Goals
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="5" onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Layout */}
      <Layout className="site-layout">
        <Header className="bg-white shadow-md p-4 flex justify-between items-center">
          <div className="text-lg font-semibold">Dashboard</div>

          {/* User Profile Section */}
          <div className="flex items-center">
            <Avatar src={user?.photoURL} size="small" className="mr-2" />  {/* User's photoURL */}
            <span className="mr-4">{user?.displayName || "User"}</span>  {/* User's displayName */}
            <Button onClick={handleLogout} type="primary">Logout</Button>
          </div>
        </Header>
        <Content className="m-4">
          {renderContent()}  {/* Render dynamic content based on selected menu */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
