from machine import Pin
import time

class Keypad:
    def __init__(self, rows_pins, cols_pins, key_map):
        self.rows = [Pin(pin, Pin.OUT) for pin in rows_pins]
        self.cols = [Pin(pin, Pin.IN, Pin.PULL_DOWN) for pin in cols_pins]
        self.key_map = key_map

    def scan(self):
        for row_idx, row in enumerate(self.rows):
            row.value(1)  # Ativa a linha
            for col_idx, col in enumerate(self.cols):
                if col.value() == 1:  # Verifica a coluna ativa
                    row.value(0)  # Reseta a linha
                    return self.key_map[row_idx][col_idx]
            row.value(0)  # Reseta a linha
        return None