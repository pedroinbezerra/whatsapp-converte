import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.css';
import { Layout, Menu, Image, Typography, Modal, Badge } from 'antd';
import { CodeFilled, GithubFilled, HeartFilled, LinkedinFilled, WhatsAppOutlined } from '@ant-design/icons'
import axios from 'axios';

const { Text } = Typography;
const { Header, Content, Footer } = Layout;

const clicksUrl = import.meta.env.VITE_GET_CLICKS;
const changelogUrl = import.meta.env.VITE_GET_CHANGELOG;
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

const iconSize: React.CSSProperties = {
  fontSize: '125%'
};

const AppLayout: React.FC = () => {
  const [totalClicks, setTotalClicks] = useState(1);
  const [changelogModalOpen, setChangelogModalOpen] = useState(false);
  const [localChangelogVersion, setLocalChangelogVersion] = useState(sessionStorage.getItem('changelog_version') || '');
  const [changelog, setChangelog] = useState(['Tudo certo!']);
  const [countChanges, setCountChanges] = useState(0);

  const openChangelogModal = () => {
    setChangelogModalOpen(true);
    setCountChanges(0);
  }

  useEffect(() => {
    const config = {
      headers: {
        'apiKey': apiKey
      }
    };

    axios.get(clicksUrl, config)
      .then((response: any) => {
        setTotalClicks(response.data);
      })

    axios.get(changelogUrl, config)
     .then((response: any) => {
        const {version, changes} = response.data;

        if(!localChangelogVersion || localChangelogVersion !== version) {
          setCountChanges(changes.length || 0);
        }

        setLocalChangelogVersion(version);
        setChangelog(changes);

        sessionStorage.setItem('changelog_version', version);
      })
  }, []);

  const contacts = [
    {
      key: '1',
      icon: <GithubFilled style={iconSize}/>,
      onClick: () => window.location.href = 'https://github.com/pedroinbezerra'
    },
    {
      key: '2',
      icon: <LinkedinFilled style={iconSize}/>,
      onClick: () => window.location.href = 'https://www.linkedin.com/in/pedroinbezerra/'
    },
    {
      key: '3',
      icon: <WhatsAppOutlined style={iconSize}/>,
      onClick: () => window.location.href = 'whatsapp://send?phone=5585986701595'
    }, 
    {
      key: '4',
      icon: 
        <Badge count={countChanges} size='small'>
          <CodeFilled style={iconSize}/>
        </Badge>,
      onClick: () => openChangelogModal()
    }
  ];

  const items = contacts.map((item) => ({ ...item }));

  return (
    <React.StrictMode>
      <>
        <div style={containerStyle}>
          <Header style={headerStyle}>
            <div className="demo-logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              items={items}
              style={menuStyle}
            />
            {!!totalClicks && <Text style={{color: '#ffffffa6'}} ><HeartFilled style={iconSize}/> {totalClicks}</Text>}
          </Header>
          <Content style={contentStyle}>
            <App />
          </Content>
          <Footer style={footerStyle}>
            <Image src='/logo.png' width={'192px'} />
          </Footer>
        </div>
      </>
      <Modal title={`Novidades da versão ${localChangelogVersion}`} open={changelogModalOpen} onCancel={() => setChangelogModalOpen(false)} centered closable footer="">
        <ul>
          {
            
            changelog.map((change, index) => (
              <li key={index}>{change}</li>
            ))
            
          }
        </ul>
      </Modal>
    </React.StrictMode>
  );
};

ReactDOM.render(<AppLayout />, document.getElementById('root'));
