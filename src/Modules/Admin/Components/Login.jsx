import Logo from '../assets/images/police-logo.png';
import { useState } from 'react';
import { Space, Typography } from 'antd';

const { Text, Link } = Typography;

export default function Login({handleLogin, setLoggedOfficer}) {
  const [logon_name, setLogonName] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ logon_name, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          setLoggedOfficer({
            'id': data.officer.id, 
            'full_name': data.officer.full_name,
            'phone_number': data.officer.phone_number,
            'logon_name': data.officer.logon_name,
            'password': data.officer.password,
            'address': data.officer.address,
            'status': data.officer.status,
            'role': data.officer.role,
            'created_at': data.officer.created_at,
            'team': data.officer.team    
          })
          handleLogin();
        }
      })
      .catch((error) => {
        // Handle error here
        console.error(error);
      });
  };
  return (
    <div className='grid bg-[#EEEEEE] h-[100vh]'>
      <Space direction="horizontal" className='justify-center w-full mt-5'>
        <Text strong style={{fontSize: 25}}>Police Station Record Management System</Text>
      </Space>
      <div className="flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8 ">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-52 w-auto"
              src={Logo}
              alt="PoliceStation Logo"
            />
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="logon-name" className="sr-only">
                  Email address
                </label>
                <input
                  id="logon-name"
                  name="name"
                  type="text"
                  value={logon_name}
                  onChange={(e) => setLogonName(e.target.value)}
                  autoComplete="logon-name"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Logon Name"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                
                Sign in
              </button> 
            </div>
          </form>
        </div>
      </div>
      <div className='grid justify-center'>
        <Space direction='horizontal mt-12'>
          <Text className='justify-center' style={{fontSize: 25}}>City Police Department</Text>
        </Space>
        <Space direction='horizontal mt-12'>
          <Text>Access the secure record management system to manage and store police station records efficiently.</Text>
        </Space>
        <Space direction='horizontal'>
          <Link href="https://ant.design" target="_blank">
            Terms Of Use
          </Link>
        </Space>
      </div>
    </div>
  )
}