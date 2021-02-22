from flask import Flask, request, jsonify

app = Flask(__name__)

@app.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@app.route('/barcodes/last', methods=['GET', 'POST'])
def lastID():
    if request.method == "POST":
        # Set last id
        params = request.json
        if not 'lastID' in params:
            return '{"message": "missing lastID parameter"}', 400

        setLastID(params['lastID'])
        return jsonify(None)
    
    # Get last id
    return jsonify(getLastID())


def getLastID():
    with open('lastid.txt', 'r') as reader:
        return int(reader.read())

def setLastID(lastID):
    with open('lastid.txt', 'w') as writer:
        writer.write(str(lastID))

if __name__ == "__main__":
    app.run(debug=False)