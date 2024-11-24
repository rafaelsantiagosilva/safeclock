from machine import Pin, I2C
from ssd1306 import SSD1306_I2C
from keypad import Keypad
from time import sleep

I2C_OLED = I2C(scl=Pin(22), sda=Pin(21))
oled_width = 128
oled_height = 64
oled = SSD1306_I2C(oled_width, oled_height, I2C_OLED)

keypad_rows_pins = [12, 13, 14, 15]
keypad_cols_pins = [32, 33, 25]
key_map = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#']
]

keypad = Keypad(keypad_rows_pins, keypad_cols_pins, key_map)
last_key = None

while True:
    oled.fill(0)
    oled.text("Pressione uma tecla:", 0, 0)

    key = keypad.scan()

    if key:
        last_key = key
        sleep(0.2)

    if last_key:
        oled.text(f"Tecla: {last_key}", 0, 20)
        print(last_key)

    oled.show()
