import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.css';
import { Layout, Menu, Image, Typography } from 'antd';
import { GithubFilled, HeartFilled, LinkedinFilled, WhatsAppOutlined } from '@ant-design/icons'
import axios from 'axios';

const { Text } = Typography;
const { Header, Content, Footer } = Layout;

const url = import.meta.env.VITE_GET_CLICKS;
const apiKey = import.meta.env.VITE_API_KEY;

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh'
};

const contentStyle: React.CSSProperties = {
  flex: '1',
  textAlign: 'center',
  alignContent: 'center',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center'
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  backgroundColor: '#054640',
  pointerEvents: 'none',
  alignContent: 'center',
};

const menuStyle: React.CSSProperties = {
  flex: 1,
  minWidth: 0,
  backgroundColor: '#054640'
};

const AppLayout: React.FC = () => {
  const [totalClicks, setTotalClicks] = useState();

  useEffect(() => {
    const config = {
      headers: {
        'apiKey': apiKey
      }
    };

    axios.get(url, config)
      .then((response: any) => {
        setTotalClicks(response.data);
      })
  }, []);

  const contacts = [
    {
      key: '1',
      icon: <GithubFilled />,
      onClick: () => window.location.href = 'https://github.com/pedroinbezerra'
    },
    {
      key: '2',
      icon: <LinkedinFilled />,
      onClick: () => window.location.href = 'https://www.linkedin.com/in/pedroinbezerra/'
    },
    {
      key: '3',
      icon: <WhatsAppOutlined />,
      onClick: () => window.location.href = 'whatsapp://send?phone=5585986701595'
    }
  ];

  const items = contacts.map((item) => ({ ...item }));

  return (
    <React.StrictMode>
      <div style={containerStyle}>
        <Header style={headerStyle}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            items={items}
            style={menuStyle}
          />
          {totalClicks && <Text style={{color: '#ffffffa6'}} ><HeartFilled /> {totalClicks}</Text>}
        </Header>
        <Content style={contentStyle}>
          <App />
        </Content>
        <Footer style={footerStyle}>
          <Image src='/logo.png' width={'192px'} />
        </Footer>
      </div>
    </React.StrictMode>
  );
};

ReactDOM.render(<AppLayout />, document.getElementById('root'));
