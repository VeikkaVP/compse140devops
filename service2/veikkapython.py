import subprocess
from flask import Flask, jsonify

app = Flask(__name__)

# Get the container's IP address
def getIpAddress():
    command = ['hostname', '-i']
    result = subprocess.run(command, stdout=subprocess.PIPE, text=True)
    return result.stdout.strip()

# List running processes
def getRunningProcesses():
    command = ['ps', '-ax']
    result = subprocess.run(command, stdout=subprocess.PIPE, text=True)
    return result.stdout.strip()

# Get disk space info
def getDiskSpace():
    command = ['df', '-h']
    result = subprocess.run(command, stdout=subprocess.PIPE, text=True)
    return result.stdout.strip()

# Get the system's uptime
def getUptime():
    command = ['uptime']
    result = subprocess.run(command, stdout=subprocess.PIPE, text=True)
    uptime_output = result.stdout.split("up ")[1].split(",")[0]
    return uptime_output.strip()


# Set up an app route to answer to any GET requests and respond with a JSON with the information wanted
@app.route('/', methods=['GET'])
def respond():
    data = {
        "Service": {
            "IP Address": getIpAddress(),
            "Running Processes": getRunningProcesses(),
            "Disk Space": getDiskSpace(),
            "Uptime": getUptime()
        }
    }
    return jsonify(data)

# Run the app on port 3333
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3333)
