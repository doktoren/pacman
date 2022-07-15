def init_map():
    global mapdata
    mapdata = []
    add_row("11111011111")
    add_row("10001000001")
    add_row("10111111101")
    add_row("10101010101")
    add_row("11101110101")
    add_row("10000000101")
    add_row("10111011101")
    add_row("10100000001")
    add_row("10111010111")
    add_row("10000010001")
    add_row("11111011111")
def tegn_monster():
    global monster_led_index
    if -2 <= monster_x - pos_x and monster_x - pos_x <= 2:
        if -2 <= monster_y - pos_y and monster_y - pos_y <= 2:
            led.plot_brightness(monster_x - pos_x + 2,
                monster_y - pos_y + 2,
                monster_leds[monster_led_index])
            monster_led_index = (monster_led_index + 1) % 8
            music.play_sound_effect(music.create_sound_effect(WaveShape.NOISE,
                    5000,
                    100,
                    255,
                    213,
                    100,
                    SoundExpressionEffect.NONE,
                    InterpolationCurve.LINEAR),
                SoundExpressionPlayMode.IN_BACKGROUND)
def completed2():
    for xx in range(5):
        for yy in range(5):
            led.plot(xx, yy)
            basic.pause(100)
    basic.pause(1000)
    basic.show_leds("""
        # # . # #
                . . . . .
                . . . . .
                . # # # .
                # . . . #
    """)
    basic.pause(2000)
    for xx2 in range(5):
        for yy2 in range(5):
            led.plot(xx2, yy2)
            basic.pause(50)
    basic.pause(1000)
def restart():
    global is_playing, pos_y, pos_x, monster_x, monster_y, monster_led_index
    is_playing = True
    pos_y = max_y
    pos_x = row_size
    monster_x = 1
    monster_y = 7
    monster_led_index = 0
    tegn()

def on_gesture_logo_up():
    if is_playing:
        go_down()
input.on_gesture(Gesture.LOGO_UP, on_gesture_logo_up)

def on_gesture_tilt_left():
    if is_playing:
        go_left()
input.on_gesture(Gesture.TILT_LEFT, on_gesture_tilt_left)

def init_map_old():
    global mapdata_old
    mapdata_old = []
    add_row_old([0, 1, 0, 0, -1])
    add_row_old([0, 1, 1, 1, 0])
    add_row_old([1, 1, 1, 1, -1])
    add_row_old([1, 0, 1, 0, 0])
    add_row_old([0, 0, 0, 1, -1])
    add_row_old([0, 1, 0, 1, 0])
    add_row_old([1, 0, 0, 0, -1])
    add_row_old([0, 1, 0, 0, 1])
    add_row_old([0, 0, 1, 0, -1])
def draw(screen_x: number, screen_y: number):
    if map2(screen_x, screen_y) < 2:
        if map2(screen_x, screen_y) == 0:
            led.plot_brightness(screen_x, screen_y, 0)
        else:
            led.plot_brightness(screen_x, screen_y, wallcolor)
    else:
        if map2(screen_x, screen_y) == 2:
            led.plot_brightness(screen_x, screen_y, outsidecolor)
        else:
            led.plot_brightness(screen_x, screen_y, 255)
def go_left():
    global pos_x
    if pos_x > 0:
        if map_old(1, 2) == 0:
            pos_x = pos_x - 1
        tegn()
def map_old(screen_x2: number, screen_y2: number):
    global x, y
    x = pos_x + screen_x2 - 2
    y = pos_y + screen_y2 - 2
    if x == 0 or x == max_x:
        return 1
    if y == 0 or y == max_y:
        if x == 5:
            return 0
        else:
            return 1
    if y < 0 or y > max_y:
        return 2
    if x % 2 == 0:
        if y % 2 == 0:
            return 1
        else:
            return mapdata_old[(y - 1) * row_size + (Math.floor(x / 2) - 1)]
    else:
        if y % 2 == 0:
            return mapdata_old[(y - 1) * row_size + Math.floor(x / 2)]
        else:
            return 0
def tegn():
    led.plot_brightness(2, 2, 255)
    draw(1, 1)
    draw(1, 2)
    draw(1, 3)
    draw(2, 1)
    draw(2, 3)
    draw(3, 1)
    draw(3, 2)
    draw(3, 3)
    if map_old(1, 2) != 1:
        draw(0, 1)
        draw(0, 2)
        draw(0, 3)
    else:
        hide(0, 1)
        hide(0, 2)
        hide(0, 3)
    if map_old(3, 2) != 1:
        draw(4, 1)
        draw(4, 2)
        draw(4, 3)
    else:
        hide(4, 1)
        hide(4, 2)
        hide(4, 3)
    if map_old(2, 1) != 1:
        draw(1, 0)
        draw(2, 0)
        draw(3, 0)
    else:
        hide(1, 0)
        hide(2, 0)
        hide(3, 0)
    if map_old(2, 3) != 1:
        draw(1, 4)
        draw(2, 4)
        draw(3, 4)
    else:
        hide(1, 4)
        hide(2, 4)
        hide(3, 4)
    if map_old(1, 1) != 1:
        draw(0, 0)
    else:
        hide(0, 0)
    if map_old(1, 3) != 1:
        draw(0, 4)
    else:
        hide(0, 4)
    if map_old(3, 1) != 1:
        draw(4, 0)
    else:
        hide(4, 0)
    if map_old(3, 3) != 1:
        draw(4, 4)
    else:
        hide(4, 4)
    tegn_monster()
def hide(screen_x3: number, screen_y3: number):
    led.plot_brightness(screen_x3, screen_y3, unknowncolor)
def completed():
    for xx3 in range(5):
        for yy3 in range(5):
            led.plot(xx3, yy3)
            basic.pause(100)
    basic.pause(1000)
    basic.show_leds("""
        # # . # #
                . . . . .
                . . # . .
                # . . . #
                . # # # .
    """)
    basic.pause(2000)
    for xx4 in range(5):
        for yy4 in range(5):
            led.plot(xx4, yy4)
            basic.pause(50)
    basic.pause(1000)
def map2(screen_x4: number, screen_y4: number):
    global y, x
    y = pos_y + screen_y4 - 2
    if y < 0 or y == len(mapdata):
        return 2
    x = pos_x + screen_x4 - 2
    if x < 0 or x == len(mapdata[y]):
        return 2
    return mapdata[y][x]
def go_right():
    global pos_x
    if pos_x < max_x:
        if map_old(3, 2) == 0:
            pos_x = pos_x + 1
        tegn()
def add_row_old(row: List[number]):
    for value in row:
        mapdata_old.append(value)
def go_up():
    global pos_y, is_playing
    if pos_y > 0:
        if map_old(2, 1) == 0:
            pos_y = pos_y - 1
        tegn()
        if pos_y == 0:
            is_playing = False
def go_down():
    global pos_y
    if pos_y < max_y:
        if map_old(2, 3) == 0:
            pos_y = pos_y + 1
        tegn()

def on_gesture_tilt_right():
    if is_playing:
        go_right()
input.on_gesture(Gesture.TILT_RIGHT, on_gesture_tilt_right)

def add_row(data: str):
    global tmp_array
    tmp_array = []
    index = 0
    while index <= len(data) - 1:
        tmp_array.append(parse_float(data.char_at(index)))
        index += 1
    mapdata.append(tmp_array)

def on_gesture_logo_down():
    if is_playing:
        go_up()
input.on_gesture(Gesture.LOGO_DOWN, on_gesture_logo_down)

tmp_array: List[number] = []
y = 0
x = 0
mapdata_old: List[number] = []
is_playing = False
monster_led_index = 0
monster_y = 0
pos_x = 0
monster_x = 0
mapdata: List[List[number]] = []
monster_leds: List[number] = []
outsidecolor = 0
unknowncolor = 0
wallcolor = 0
pos_y = 0
max_y = 0
max_x = 0
row_size = 0
row_size = 5
max_x = 2 * row_size
max_y = 10
pos_y = max_y
wallcolor = 150
unknowncolor = 25
outsidecolor = 5
monster_leds = [255, 223, 127, 32, 0, 32, 127, 223]
init_map_old()
restart()

def on_forever():
    while outsidecolor == 0:
        basic.pause(100)
    while True:
        while pos_y != 0:
            basic.pause(100)
            tegn_monster()
        completed()
        restart()
basic.forever(on_forever)
