from flask import Flask, jsonify
from flask_socketio import SocketIO, send
import math
import random

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'

socketIo = SocketIO(app, cors_allowed_origins="*")

app.debug = True
app.host = 'localhost'

starting_number = 1
display = [0, 0, 0]


def getRandomInt(min, max):
    min = math.ceil(min)
    max = math.floor(max)
    tmp = math.floor(random.random() * (max - min + 1)) + min

    # Check that no 2 numbers are same
    if tmp == starting_number or tmp == display[1]:
        return getRandomInt(min, max)
    else:
        return tmp

# Function to sort array randomly - Fisher–Yates shuffle algorithm


def sortRandomly(array):
    i = len(array)-2
    while i > 0:
        j = math.floor(i * random.random())
        tmp = array[i]
        array[i] = array[j]
        array[j] = tmp
        i = i-1


def update_display():
    global starting_number
    display[0] = starting_number
    display[1] = getRandomInt(1, 10)
    display[2] = getRandomInt(1, 10)

    print(display)
    sortRandomly(display)


@socketIo.on("message")
def handleMessage(msg):
    # print(starting_number)
    update_display()

    global starting_number
    if (msg == starting_number):
        starting_number = starting_number + 1
        print("yes")
    else:
        print("no")

    send([display, starting_number], broadcast=True)
    return None


if __name__ == '__main__':
    socketIo.run(app)
