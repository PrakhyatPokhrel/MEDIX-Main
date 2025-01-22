import subprocess
import os

def run_server(script_path, port):
    command = f'flask run --port={port} --no-reload'
    env = {**os.environ, 'FLASK_APP': script_path, 'FLASK_ENV': 'development'}
    process = subprocess.Popen(command, env=env, shell=True)
    return process

if __name__ == '__main__':
    base_py_path = r'C:\medix\MEDIX-Main\medix_backend\base.py'
    heart_model_server_path = r'C:\medix\MEDIX-Main\medix_backend\heart_model_server.py'
    diabetes_py_path = r'C:\medix\MEDIX-Main\medix_backend\diabetes.py'

    base_process = run_server(base_py_path, 5000)
    heart_process = run_server(heart_model_server_path, 5001)
    diabetes_process = run_server(diabetes_py_path, 5002)

    print("Servers started. Press Ctrl+C to exit.")

    try:
        base_process.wait()
        heart_process.wait()
        diabetes_process.wait()
    except KeyboardInterrupt:
        print("Shutting down servers...")
        base_process.terminate()
        heart_process.terminate()
        diabetes_process.terminate()
