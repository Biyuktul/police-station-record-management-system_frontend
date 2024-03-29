import { useState, useEffect } from 'react';
import { Table, Button, Input, Select, Tag, Popover, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import MapComponent from './Map';
import IncidentsTable from './IncidentsTable'
import ComplaintList from './ComplainTable';

const Incidents = ({privileges, loggedOfficer}) => {
  const [incidents, setIncidents] = useState([]);
	const [statusFilter, setStatusFilter] = useState('All');
  const [position, setPosition] = useState([9.0222, 38.7468]);
  const [location, setLocation] = useState('Addis Ababa');
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [addVisible, setAddVisible] = useState(false);

  
  const apiKey = '47a1a977c1be42aab4956e1a035278f0';

  const getLocationCoordinates = (location) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}, Addis Ababa, Ethiopia&key=${apiKey}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.results[0] && data.results[0].geometry) {
          const { lat, lng } = data.results[0].geometry;
          console.log(`${lat} ${lng}`)
          setPosition([lat, lng]);
        } else {
          console.log("no location found")
        }
        
        
      })
      .catch(error => {
        console.error(error);
      });
  }

  
  

	

  const handleModalClose = () => {
    setSelectedIncident(null);
    setDetailVisible(false);
  };
  
  const handleExport = () => {
    // do some operation here
  }
	const handleOk = (values) => {
    const newIncident = {
      caseType: values.caseType,
      status: values.status,
      priority: values.priority,
      date: values.date,
      description: values.description,
      victims: [
        {
          name: values.victimName,
          age: values.victimAge,
          gender: values.victimGender,
          contact: values.victimContact,
        },
      ],
      witnesses: [
        {
          name: values.witnessName,
          age: values.witnessAge,
          gender: values.witnessGender,
          contact: values.witnessContact,
          statement: values.witnessStatement,
        },
      ]
    };
    console.log(values);
    setIncidents([...incidents, newIncident]);
    setAddVisible(false);
  
  };

  const handleLocationClick = (record) => {
    getLocationCoordinates(record.location)
  };
    
      return (
        <div className="flex flex-col h-full">
      <div className="flex-grow mr-15">
        <ComplaintList 
          setIncidents={setIncidents}
          handleLocationClick={handleLocationClick}
          location={location}
          setSelectedIncident={setSelectedIncident}
          setDetailVisible={setDetailVisible} 
          setAddVisible={setAddVisible}
          addVisible={addVisible}
          statusFilter={statusFilter}
          handleOk={handleOk}
          privileges={privileges}
          loggedOfficer={loggedOfficer}
        />
        <MapComponent position={position} />
      </div>

      {selectedIncident && (
        <Modal 
          visible={detailVisible} 
          onCancel={handleModalClose} 
          footer={[
            <Button key="export" type="primary" onClick={handleExport} style={{backgroundColor: '#1677ff'}}>
              Export
            </Button>,
          ]}
          >
          <h2>Incident Details</h2>
          <p>Icident Type: {selectedIncident.caseType}</p>
          <p>Status: {selectedIncident.status}</p>
          <p>Date: {selectedIncident.date}</p>
          <p>Victim name: {selectedIncident.name}</p>
          <p>Victim contact: {selectedIncident.contact}</p>
          <p>Wittness Name: {selectedIncident.name}</p>
          <p>Wittness contact: {selectedIncident.contact}</p>
        </Modal>
      )}
    </div>
      );
    };
    
    export default Incidents;