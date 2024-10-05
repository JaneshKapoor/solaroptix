// src/components/Dashboard.js
import React from 'react';
import { Button, Card, Progress, Switch, Layout, Menu } from 'antd';  // Ant Design components
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LineChartOutlined, PieChartOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css';

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();

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

  return (
    <Layout className="min-h-screen">
      <Sider collapsible>
        <div className="p-4 text-center text-white text-xl">SolarOptix</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
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

      <Layout className="site-layout">
        <Header className="bg-white shadow-md p-4 flex justify-between items-center">
          <div className="text-lg font-semibold">Dashboard</div>
          <Button onClick={handleLogout} type="primary">Logout</Button>
        </Header>

        <Content className="m-4">
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
              <div className="flex justify-between mt-4">
                <div>Usage</div>
                {/* Add graph/chart component for Monthly Statistics */}
              </div>
            </Card>

            {/* Equipment Status */}
            <Card className="col-span-1 mt-4">
              <h2 className="text-lg font-semibold">Equipment Status</h2>
              <div className="flex justify-between mt-4">
                <span>Air Conditioner</span>
                <Switch defaultChecked />
              </div>
              <div className="flex justify-between mt-4">
                <span>Water Heater</span>
                <Switch defaultChecked />
              </div>
              <div className="flex justify-between mt-4">
                <span>Samsung TV</span>
                <Switch />
              </div>
              <div className="flex justify-between mt-4">
                <span>Refrigerator</span>
                <Switch />
              </div>
            </Card>

            {/* Usage Comparison */}
            <Card className="col-span-2 mt-4">
              <h2 className="text-lg font-semibold">Usage Comparison</h2>
              <div className="mt-4">
                <div className="flex justify-between">
                  <div>Air Conditioner</div>
                  <div>6 hours</div>
                  <div>23.09 kWh</div>
                  <div>₹100</div>
                </div>
                <div className="flex justify-between mt-2">
                  <div>Samsung TV</div>
                  <div>10 hours</div>
                  <div>9.20 kWh</div>
                  <div>₹100</div>
                </div>
                <div className="flex justify-between mt-2">
                  <div>Washing Machine</div>
                  <div>2 hours</div>
                  <div>33.05 kWh</div>
                  <div>₹100</div>
                </div>
              </div>
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
