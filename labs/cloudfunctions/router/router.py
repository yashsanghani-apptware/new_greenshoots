from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/notify', methods=['POST'])
def notify():
    # Retrieve JSON data from the request
    data = request.get_json()
    # Print the data to the console for mock handling
    print("Received notification:", data)
    # You can add additional logic here to handle different types of notifications
    return jsonify({'status': 'success', 'message': 'Notification received'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

