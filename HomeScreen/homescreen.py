from flask import Flask

app = Flask(__name__)

@app.route('/home')
def test():
  return 'A home screen will be here once we are done'

app.run()
