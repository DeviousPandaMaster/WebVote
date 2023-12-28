##https://codepen.io/Kenan-Kazan-12/pen/dyrbVGx
import flask
from flask import request, jsonify, render_template

app = flask.Flask(__name__)
app.config["DEBUG"] = True

VoteOptions = []
Votes = {}

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/choices', methods=['GET'])
def choices():
    return render_template('choices.html')

@app.route('/api/set_options', methods=['POST'])
def set_choices():
    choices = request.json.get('options')
    VoteOptions.clear()
    Votes.clear()
    for i in choices:
        VoteOptions.append({"label" : i, "value" : i})
        Votes.update({i : 0})
    return "ok"

@app.route('/api/vote_options', methods=['GET'])
def api_vote_options():
    return VoteOptions

@app.route('/api/read', methods=['GET'])
def api_read():
    return Votes

@app.route("/api/write", methods=['POST'])
def api_write():
    vote = request.json.get('vote')
    num = Votes.get(vote)
    num = int(num) + 1 
    Votes.update({vote: num})
    return "ok"

app.run(host="0.0.0.0", port="8080")
