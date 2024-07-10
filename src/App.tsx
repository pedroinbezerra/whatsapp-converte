import './App.css'
import TextArea from 'antd/es/input/TextArea';
import { Button, Flex, Form, message, Space } from 'antd';
import PhoneInput from "antd-phone-input";
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function App() {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  const newLink = () => {
    form.resetFields();
    setVisible(true);
  };

  const info = () => {
    messageApi.info('Copiado para a área de transferência');
  };

  const [link, setLink] = useState('https://api.whatsapp.com/send?');
  const defaultCountry = 'BR';

  const onFinish = (values: any) => {
    try {
      const phoneNumber =  values.phone.countryCode + values.phone.areaCode + values.phone.phoneNumber;
      if(phoneNumber.length === 13) {
        const redirectLink = `https://api.whatsapp.com/send?phone=${phoneNumber}` + (values.message ? `&text=${values.message}` : '');
        setLink(redirectLink);
        setVisible(false);
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
                  <Form.Item name="phone" label="Telefone" rules={[{ required: true, validator(rule, value, callback) {
                    if(value && (value.countryCode + value.areaCode + value.phoneNumber).length  < 13) {
                      return Promise.reject();
                    }

                    return Promise.resolve();
                  }, }]}>
                      <PhoneInput
                      placeholder="Insira seu telefone"
                      defaultCountry={defaultCountry}
                      limitMaxLength={true}
                      />
                  </Form.Item>

                  <Form.Item name="message" label="Mensagem" rules={[{ required: false }]}>
                    <TextArea showCount maxLength={50} placeholder="Insira aqui sua mensagem" />
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
