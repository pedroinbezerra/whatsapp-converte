import './App.css'
import TextArea from 'antd/es/input/TextArea';
import { Button, Flex, Form, message, Space } from 'antd';
import PhoneInput from "antd-phone-input";
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';

const url = import.meta.env.VITE_ADD_CLICK;
const apiKey = import.meta.env.VITE_API_KEY;

function App() {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [link, setLink] = useState('');
  const defaultCountry = 'BR';

  const newLink = () => {
    form.resetFields();
    setVisible(true);
  };

  const info = () => {
    messageApi.info('Copiado para a área de transferência');
  };


  const onFinish = (values: any) => {
    try {
      const phoneNumber =  values.phone.countryCode + values.phone.areaCode + values.phone.phoneNumber;
      if(phoneNumber.length === 13) {
        const redirectLink = `https://api.whatsapp.com/send?phone=${phoneNumber}` + (values.message ? `&text=${values.message}` : '');
        setLink(redirectLink);
        setVisible(false);

        const config = {
          headers: {
            'apiKey': apiKey
          }
        };

        axios.get(url, config);
      }  
    } catch (error) {
      
    }
  };

  return (
    <>
        {contextHolder}
          <Flex gap="middle" align="center" vertical>
                <h1>Gerador de link para Whatsapp</h1>
                { visible && 
              <Form
                  form={form}
                  name="control-hooks"
                  onFinish={onFinish}
                >
                  {/* @ts-ignore */}
                  <Form.Item name="phone" label="Telefone" rules={[{ required: true, validator(role, value, callback) {
                    if(value && (value.countryCode + value.areaCode + value.phoneNumber).length  < 13) {
                      return Promise.reject();
                    }

                    return Promise.resolve();
                  }, }]}>
                      <PhoneInput
                      placeholder="Insira seu telefone"
                      // @ts-ignore
                      defaultCountry={defaultCountry} 
                      limitMaxLength={true}
                      />
                  </Form.Item>

                  <Form.Item name="message" label="Mensagem" rules={[{ required: false }]}>
                    <TextArea showCount maxLength={50} placeholder="Opcional" />
                  </Form.Item>

                  <Form.Item>
                    <Space>
                      <Button type="primary" htmlType="submit" style={{ backgroundColor: '#075e54', borderColor: '#075e54', color: 'white' }}>
                        Criar link
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              }

              { !visible && 
                <Flex gap="middle" vertical align='center'>
                  <a href={link} style={{color: 'black'}}>{link}</a>
                  <CopyToClipboard text={link}>
                    <Button style={{ backgroundColor: '#075e54', borderColor: '#075e54', color: 'white' }} onClick={info}>Copiar</Button>
                  </CopyToClipboard>

                  <Button style={{ backgroundColor: '#075e54', borderColor: '#075e54', color: 'white' }} onClick={newLink}>Novo</Button>
                </Flex>
              }
          </Flex>
    </>
  )
}

export default App
