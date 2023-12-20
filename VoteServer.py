##https://codepen.io/Kenan-Kazan-12/pen/dyrbVGx
import flask
from flask import request, jsonify, render_template

app = flask.Flask(__name__)
app.config["DEBUG"] = True

VoteOptions = []
Votes = {}

x = True
while x:
    print('Enter x if done')
    usrInput = input('Enter choice ->')
    if usrInput != 'x':
        VoteOptions.append({"label" : usrInput, "value" : usrInput})
        Votes.update({usrInput : 0})
    else:
        x = False

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/api/read', methods=['GET'])
def api_read():
    return Votes

@app.route("/api/<write>", methods=['PUT'])
def api_write(write):
    vote = request.json['vote']
    num = Votes.get(vote)
    num = num + 1 
    Votes.update({vote: num})
    return 200

app.run()