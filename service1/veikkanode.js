const express = require('express');
const { execSync } = require('child_process');
const axios = require('axios');

const app = express();

// Get the container's IP address
const getIpAddress = () => {
  const command = 'hostname -i';
  const result = execSync(command);
  return result.toString().trim();
};

// List running processes
const getRunningProcesses = () => {
  const command = 'ps ax';
  const result = execSync(command);
  return result.toString().trim();
};

// Get disk space info
const getDiskSpace = () => {
  const command = 'df -h';
  const result = execSync(command);
  return result.toString().trim();
};

// Get system uptime
const getUptime = () => {
  const command = 'uptime';
  const result = execSync(command);
  const output = result.toString().trim();

  try {
    const uptime = output.split('up ')[1].split(',')[0];
    return uptime.trim();
  } catch (error) {
    return 'Could not parse uptime';
  }
};

// Collect data from Service2
const connectService2 = async () => {
  try {
    const response = await axios.get('http://service2:3333/');
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

app.get('/', async (req, res) => {
  const service1Data = {
    Service: {
      "IP Address": getIpAddress(),
      "Running Processes": getRunningProcesses(),
      "Disk Space": getDiskSpace(),
      "Uptime": getUptime()
    }
  };

  const service2Data = await connectService2();

  const combinedData = {
    "Service1": service1Data,
    "Service2": service2Data
  };

  res.json(combinedData);
});

app.listen(8199, () => {
  console.log('Service1 running on port 8199');
});
