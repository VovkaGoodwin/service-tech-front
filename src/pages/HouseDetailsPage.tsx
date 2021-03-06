import React, {useEffect, useState} from 'react'
import {useParams, useSearchParams} from "react-router-dom";
import {Abon, Home} from "../types/dataTypes";
import {Col, Row, Spin, Table} from "antd";
import {useHttp} from "../hooks/http.hook";
import {AbonsTable} from "../components/AbonsTable";

export const HouseDetailsPage: React.FC = () => {
  const [ loading, setLoading ] = useState(false);
  const [ abons, setAbons ] = useState<Abon[]>([]);
  const [ searchParams ] = useSearchParams();
  const { request } = useHttp();
  const params  = useParams();

  useEffect(() => {
    setLoading(true);
    request.post<{ home: Home }>('/api/search/home', { street: params.street, homeNumber: searchParams.get('number') })
      .then(response => {
        if (response.status === 200) {
          setAbons(response.data.home.abons);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Row align={"middle"} justify={"center"}>
        <Col>
          <AbonsTable abons={abons} loading={loading} />
        </Col>
      </Row>
    </div>
  );
}