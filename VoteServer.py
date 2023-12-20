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

@app.route('/api/vote_options', methods=['GET'])
def api_vote_options():
    return VoteOptions

@app.route('/api/read', methods=['GET'])
def api_read():
    return Votes

@app.route("/api/<write>", methods=['POST'])
def api_write(write):
    vote = request.json['vote']
    num = Votes.get(vote)
    num = int(num) + 1 
    Votes.update({vote: num})
    return "ok"

app.run()
