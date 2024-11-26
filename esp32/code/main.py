import network, urequests, ujson

from machine import I2C, Pin
from time import sleep
from lcd_i2c import LCD
from keypad import Keypad

keypad_rows_pins = [Pin(13), Pin(12), Pin(14), Pin(27)]
keypad_cols_pins = [Pin(26), Pin(25), Pin(33), Pin(32)]
keys = [['1', '2', '3', 'A'],
        ['4', '5', '6', 'B'],
        ['7', '8', '9', 'C'],
        ['*', '0', '#', 'D']]

keys_letters = ['A', 'B', 'C', 'D']

keypad = Keypad(keypad_rows_pins, keypad_cols_pins, keys)

i2c = I2C(0, scl=Pin(22), sda=Pin(21))
I2C_ADDR = 0x3F
lcd = LCD(addr=I2C_ADDR, cols=16, rows=2, i2c=i2c)

alert = {"led": Pin(15, Pin.OUT), "buzzer": Pin(18, Pin.OUT)}

user_input = ""
user_hidden_input = ""
is_id_submited = False
is_password_submited = False

lcd.begin()
API_URL = "https://4d27-187-111-223-26.ngrok-free.app"

def play_alert():
    alert["led"].on()
    alert["buzzer"].on()
    
def stop_alert():
    alert["led"].off()
    alert["buzzer"].off()

def connect_wifi():
    ssid = "MINHA_REDE_WIFI" # Sim, não vou revelar ela pra vc
    password = "SENHA_DA_MINHA_REDE_WIFI"
    
    sta_if = network.WLAN(network.STA_IF)
    sta_if.active(True)
    
    if not sta_if.isconnected():
        print("Conectando-se ao Wifi", end="")
        sta_if.connect(ssid, password)
        
        while not sta_if.isconnected():
            sleep(1)
            print(".", end="")
            
    print("\nWifi conectado")
    print("Configuração da rede:", sta_if.ifconfig())
    
connect_wifi()

employee = None

while True:
    user_input = user_hidden_input = ""
    while not is_id_submited:
        lcd.clear()
        lcd.set_cursor(col=0, row=0)
        lcd.print("Digite seu ID: ")
        lcd.set_cursor(col=0, row=1)
        lcd.print(user_input)
    
        key_pressed = keypad.read_keypad()
    
        if key_pressed:
            if keys_letters.count(key_pressed) == 0 and key_pressed != "*" and key_pressed != "#":
                user_input += key_pressed
                
            elif key_pressed == "*":
                user_input = ""
            elif key_pressed == "#":
                employee_id = int(user_input)
                user_input = ""
                try:
                    response = urequests.get(f"{API_URL}/employees/{employee_id}")
                    if response.status_code == 200:
                        employee = ujson.loads(response.text)
                        is_id_submited = True
                        lcd.clear()
                    elif response.status_code == 404:
                        lcd.clear()
                        lcd.set_cursor(col=0, row=0)
                        lcd.print("Funcionario nao")
                        lcd.set_cursor(col=0, row=1)
                        lcd.print("encontrado")
                        play_alert()
                        sleep(1)
                        stop_alert()
                        sleep(4)
                    else:
                        lcd.clear()
                        lcd.set_cursor(col=0, row=0)
                        lcd.print("Erro no servidor")
                        sleep(999)
                        print("Erro ao pegar os dados: ", response.status_code)
                except Exception as e:
                    print("Erro ao fazer requisição:", e)
                finally:
                    response.close()
        sleep(0.1)
        
    while not is_password_submited:
        lcd.clear()
        lcd.set_cursor(col=0, row=0)
        lcd.print("Digite sua senha:")
        lcd.set_cursor(col=0, row=1)
        lcd.print(user_hidden_input)
        
        key_pressed = keypad.read_keypad()
    
        if key_pressed:
            if key_pressed != "*" and key_pressed != "#":
                user_input += key_pressed
                user_hidden_input += "*"
            elif key_pressed == "*":
                user_input = user_hidden_input = ""
            elif key_pressed == "#":
                employee_password = user_input
                user_input = user_hidden_input = ""
                
                if employee_password != employee["password"]:
                    play_alert()
                    lcd.clear()
                    lcd.home()
                    lcd.print("Senha incorreta")
                    sleep(3)
                    stop_alert()
                else:
                    is_password_submited = True
                    lcd.clear()
        sleep(0.1)
    
    lcd.set_cursor(col=0, row=0)
    
    data = {
        "employeeId": int(employee["id"])
    }
        
    headers = {
        "Content-Type": "application/json"
    }
    
    try:
        response = urequests.post(f"{API_URL}/attendances", headers=headers, json=data)
        
        if response.status_code == 200:
            print(f"Bem-vindo {employee['name']}")
        elif response.status_code == 404:
            print(f"Funcionário de ID {employee_id} não encontrado")
        else:
            print("Erro ao resgistrar: ", response.status_code)
    except Exception as e:
        print(e)
    finally:
        response.close()
        
    employee_name = employee['name'].split()
    employee_name = employee_name[0]
    lcd.print("Bem-vindo(a)")
    lcd.set_cursor(col=0, row=1)
    lcd.print(employee_name)
    sleep(5)
    is_id_submited = is_password_submited = False