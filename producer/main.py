from flask import Flask, flash, render_template, request, redirect, url_for
from producer import producer, acked
SERVER = Flask(__name__, template_folder='templates', static_folder='static')
SERVER.secret_key = 'producer'
@SERVER.route('/')
def index():
    return render_template('index.html')

@SERVER.route('/vote', methods=['POST', 'GET'])
def vote():
    data = {
        "voter": request.form['voter'],
        "pet": request.form['pet'],
    }
    producer.produce('votes', key=data['voter'], value=data['pet'], callback=acked)
    producer.poll(1)
    flash(f'{ data["voter"]} your vote for {data["pet"]} has been registered')
    return redirect(url_for('index'))
if __name__ == '__main__':
    SERVER.run(debug=True)