from flask import render_template, Flask, request, redirect, url_for, send_file, jsonify
from hashlib import sha256
import shutil
import math 
import os
from zipfile import ZipFile
from datetime import datetime
from random import randint
from urllib.parse import unquote
from pathlib import Path

total, used, free = shutil.disk_usage("/")

total = math.floor(total / 1073741824)
free = math.floor(free / 1073741824)

print(total, free)

current_dir = os.path.dirname(__file__)
print(current_dir)
app = Flask(__name__)

password = sha256(input("Enter password for your Storaj: ").encode('utf-8')).hexdigest()



if not os.path.exists('storaj'):
    os.makedirs('storaj')
    
@app.route('/')


def index(pwd=None):

    if(request.args.get('pwd') == password):

        print("Index Authentication OK")
        return render_template('index.html', pwd=password)
    else:
        print("Index failed Authentication")
        return redirect(url_for("login"))

    


@app.route('/login/')

def login():
    return render_template('/login/index.html')

@app.route('/auth/', methods=["POST"])

def auth():
    if(sha256(request.form.get('password').encode('utf-8')).hexdigest() == password):
        print("Access granted")
        return redirect(url_for('index')+"?pwd="+password)
    else:
        print("Access denied")
        return redirect(url_for("login"))

@app.route('/dashboard/')

def dashboard():
    if(request.args.get('pwd') == password):
        print("Dashboard authentication OK")
        try:
            if(request.args.get("storage") == None):
                a # used to create exception

            return render_template('/dashboard/index.html')
        except:
            return redirect(url_for('dashboard')+"?pwd="+password+"&storage="+str(round(((free / (2**30)) / (total / (2**30))) * 100)))
    else:
        return redirect(url_for("login"))

@app.route('/files/')

def files():
    if(request.args.get("pwd") == password):
    
        files_list = os.listdir('./storaj/')
        print(files_list)
        return render_template('/files/index.html', files=files_list)
    else:
        return redirect(url_for("login"))

@app.route('/upload/')

def upload():
    if(request.args.get("pwd") == password):
        return render_template('/upload/index.html')
    else:
        return redirect(url_for("login"))

@app.route('/handler/', methods=['POST'])
def handler():
    if(request.args.get("pwd") == password):
        if 'file' in request.files:


            if("/" in str(request.files['file'].filename)):
                print("[INFO] Folder detected.")
                if not os.path.exists(os.path.join('./', 'storaj', str(request.files['file'].filename).split("/")[0])):
                    os.makedirs(os.path.join('./', 'storaj', str(request.files['file'].filename).split("/")[0]))
                else:
                    return jsonify({"status": "error", "message": "Another folder with the same name already exists."}), 500

            files = request.files.getlist('file')


            for file in files:
                if Path(os.path.join('./', 'storaj', file.filename)).exists():
                    return jsonify({"status": "error", "message": "Another file with the same name already exists."}), 500
                else:
                    file.save(os.path.join('./', 'storaj', file.filename))

            return jsonify({"status": "success", "message": "Files uploaded successfully."})
        else:
            return jsonify({"status": "error", "message": "No file or folder uploaded."}), 400
    else:
        return redirect(url_for("login"))




@app.route('/download/')

def download():
    if(request.args.get("pwd") == password):

        files_list = os.listdir('./storaj/')
        #print(files_list)
        filename = request.args.get('file')
        if filename:
            # Build the absolute file path based on the file name
            input_path = os.path.join('./', 'storaj', filename)
            if os.path.isfile(input_path):
                # if input path is a file, add it directly to the zip archive
                zip_path = os.path.join('./', 'tmp', filename + '.zip')
                with ZipFile(zip_path, 'w') as zip_file:
                    zip_file.write(input_path)
                
            elif os.path.isdir(input_path):
                # if input path is a directory, copy it to a temporary directory and add it to the zip archive
                zip_path = os.path.join('./', 'storaj', filename + '.zip')
                shutil.make_archive('./tmp/' + filename, 'zip', input_path)
                with ZipFile(zip_path, 'w') as zip_file:
                    zip_file.write('./tmp/' + filename + '.zip')
                os.remove('./tmp/' + filename + '.zip')
            else:
                # if input path is neither a file nor directory, return an error message
                return 'Invalid input path.'
            return send_file(zip_path, as_attachment=True)
        else:
            return 'Missing file parameter.'
    else:
        return redirect(url_for("login"))




if __name__ == "__main__":
    app.run()
