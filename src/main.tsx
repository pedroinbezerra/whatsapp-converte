import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { Image, Menu, MenuProps } from 'antd'
import { GithubFilled, LinkedinFilled, WhatsAppOutlined } from '@ant-design/icons'

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

const contacts = [
  {
    key: '1',
    icon: React.createElement(GithubFilled),
    onClick: () => window.location.href = 'https://github.com/pedroinbezerra'
  }, 
  {
    key: '2',
    icon: React.createElement(LinkedinFilled),
    onClick: () => window.location.href = 'https://www.linkedin.com/in/pedroinbezerra/'
  },
  {
    key: '3',
    icon: React.createElement(WhatsAppOutlined),
    onClick: () => window.location.href = 'whatsapp://send?phone=5585986701595'
  }
];

const items: MenuProps['items'] = contacts.map((item) => (item));
 


ReactDOM.createRoot(document.getElementById('root')!).render(
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
      </Header>
      <Content style={contentStyle}>
        <App />
      </Content>
      <Footer style={footerStyle}>
        <Image src='/logo.png' width={'192px'}/>
      </Footer>
    </div>
  </React.StrictMode>,
)
