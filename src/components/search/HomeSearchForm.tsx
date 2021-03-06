import React from "react";
import {Button, Col, Form, Input, Row} from "antd";
import {useHttp} from "../../hooks/http.hook";
import {useNavigate, useSearchParams} from "react-router-dom";

type HomeSearchFormProps = {
  address: string,
  homeNumber: string
}

type formData = {
  street: string,
  homeNumber: string
}

export const HomeSearchForm: React.FC<HomeSearchFormProps> = ({ address, homeNumber }) => {

  const navigate = useNavigate();

  const onFormSubmitHandler = (values: formData) => {
    navigate(`/home/${values.street}?number=${values.homeNumber}`);
  }

  return (
    <div>
      <Form
        onFinish={onFormSubmitHandler}
      >
        <Form.Item
          style={{display: 'inline-block', marginRight: '5px'}}
          rules={[{ required: true, message: 'Введите Улицу!' }]}
          name='street'
        >
          <Input placeholder="Улица" name="street" value={address}/>
        </Form.Item>
        <Form.Item
          style={{display: 'inline-block'}}
          rules={[{ required: true, message: 'Введите номер дома!' }]}
          name='homeNumber'
        >
          <Input placeholder="Дом" name="homeNumber" value={homeNumber} style={{width: 100}}/>
        </Form.Item>
        <Form.Item>
          <Row justify={"center"}>
            <Col>
              <Button type="primary" htmlType="submit">Поиск</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
}