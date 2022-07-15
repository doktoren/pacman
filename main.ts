function init_map () {
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
}
function tegn_monster () {
    if (-2 <= monster_x - pos_x && monster_x - pos_x <= 2) {
        if (-2 <= monster_y - pos_y && monster_y - pos_y <= 2) {
            led.plotBrightness(monster_x - pos_x + 2, monster_y - pos_y + 2, monster_leds[monster_led_index])
            monster_led_index = (monster_led_index + 1) % 8
            music.playSoundEffect(music.createSoundEffect(
            WaveShape.Noise,
            5000,
            100,
            255,
            213,
            100,
            SoundExpressionEffect.None,
            InterpolationCurve.Linear
            ), SoundExpressionPlayMode.InBackground)
        }
    }
}
function completed2 () {
    for (let xx = 0; xx <= 4; xx++) {
        for (let yy = 0; yy <= 4; yy++) {
            led.plot(xx, yy)
            basic.pause(100)
        }
    }
    basic.pause(1000)
    basic.showLeds(`
        # # . # #
        . . . . .
        . . . . .
        . # # # .
        # . . . #
        `)
    basic.pause(2000)
    for (let xx = 0; xx <= 4; xx++) {
        for (let yy = 0; yy <= 4; yy++) {
            led.plot(xx, yy)
            basic.pause(50)
        }
    }
    basic.pause(1000)
}
function restart () {
    is_playing = true
    pos_y = max_y
    pos_x = row_size
    monster_x = 1
    monster_y = 7
    monster_led_index = 0
    tegn()
}
input.onGesture(Gesture.LogoUp, function () {
    if (is_playing) {
        go_down()
    }
})
input.onGesture(Gesture.TiltLeft, function () {
    if (is_playing) {
        go_left()
    }
})
function init_map_old () {
    mapdata_old = []
    add_row_old([
    0,
    1,
    0,
    0,
    -1
    ])
    add_row_old([
    0,
    1,
    1,
    1,
    0
    ])
    add_row_old([
    1,
    1,
    1,
    1,
    -1
    ])
    add_row_old([
    1,
    0,
    1,
    0,
    0
    ])
    add_row_old([
    0,
    0,
    0,
    1,
    -1
    ])
    add_row_old([
    0,
    1,
    0,
    1,
    0
    ])
    add_row_old([
    1,
    0,
    0,
    0,
    -1
    ])
    add_row_old([
    0,
    1,
    0,
    0,
    1
    ])
    add_row_old([
    0,
    0,
    1,
    0,
    -1
    ])
}
function draw (screen_x: number, screen_y: number) {
    if (map(screen_x, screen_y) < 2) {
        if (map(screen_x, screen_y) == 0) {
            led.plotBrightness(screen_x, screen_y, 0)
        } else {
            led.plotBrightness(screen_x, screen_y, wallcolor)
        }
    } else {
        if (map(screen_x, screen_y) == 2) {
            led.plotBrightness(screen_x, screen_y, outsidecolor)
        } else {
            led.plotBrightness(screen_x, screen_y, 255)
        }
    }
}
function go_left () {
    if (pos_x > 0) {
        if (map_old(1, 2) == 0) {
            pos_x = pos_x - 1
        }
        tegn()
    }
}
function map_old (screen_x: number, screen_y: number) {
    x = pos_x + screen_x - 2
    y = pos_y + screen_y - 2
    if (x == 0 || x == max_x) {
        return 1
    }
    if (y == 0 || y == max_y) {
        if (x == 5) {
            return 0
        } else {
            return 1
        }
    }
    if (y < 0 || y > max_y) {
        return 2
    }
    if (x % 2 == 0) {
        if (y % 2 == 0) {
            return 1
        } else {
            return mapdata_old[(y - 1) * row_size + (Math.floor(x / 2) - 1)]
        }
    } else {
        if (y % 2 == 0) {
            return mapdata_old[(y - 1) * row_size + Math.floor(x / 2)]
        } else {
            return 0
        }
    }
}
function tegn () {
    led.plotBrightness(2, 2, 255)
    draw(1, 1)
    draw(1, 2)
    draw(1, 3)
    draw(2, 1)
    draw(2, 3)
    draw(3, 1)
    draw(3, 2)
    draw(3, 3)
    if (map_old(1, 2) != 1) {
        draw(0, 1)
        draw(0, 2)
        draw(0, 3)
    } else {
        hide(0, 1)
        hide(0, 2)
        hide(0, 3)
    }
    if (map_old(3, 2) != 1) {
        draw(4, 1)
        draw(4, 2)
        draw(4, 3)
    } else {
        hide(4, 1)
        hide(4, 2)
        hide(4, 3)
    }
    if (map_old(2, 1) != 1) {
        draw(1, 0)
        draw(2, 0)
        draw(3, 0)
    } else {
        hide(1, 0)
        hide(2, 0)
        hide(3, 0)
    }
    if (map_old(2, 3) != 1) {
        draw(1, 4)
        draw(2, 4)
        draw(3, 4)
    } else {
        hide(1, 4)
        hide(2, 4)
        hide(3, 4)
    }
    if (map_old(1, 1) != 1) {
        draw(0, 0)
    } else {
        hide(0, 0)
    }
    if (map_old(1, 3) != 1) {
        draw(0, 4)
    } else {
        hide(0, 4)
    }
    if (map_old(3, 1) != 1) {
        draw(4, 0)
    } else {
        hide(4, 0)
    }
    if (map_old(3, 3) != 1) {
        draw(4, 4)
    } else {
        hide(4, 4)
    }
    tegn_monster()
}
function hide (screen_x: number, screen_y: number) {
    led.plotBrightness(screen_x, screen_y, unknowncolor)
}
function completed () {
    for (let xx = 0; xx <= 4; xx++) {
        for (let yy = 0; yy <= 4; yy++) {
            led.plot(xx, yy)
            basic.pause(100)
        }
    }
    basic.pause(1000)
    basic.showLeds(`
        # # . # #
        . . . . .
        . . # . .
        # . . . #
        . # # # .
        `)
    basic.pause(2000)
    for (let xx = 0; xx <= 4; xx++) {
        for (let yy = 0; yy <= 4; yy++) {
            led.plot(xx, yy)
            basic.pause(50)
        }
    }
    basic.pause(1000)
}
function map (screen_x: number, screen_y: number) {
    y = pos_y + screen_y - 2
    if (y < 0 || y >= mapdata.length) {
        return 2
    }
    x = pos_x + screen_x - 2
    if (x < 0 || x >= mapdata[y].length) {
        return 2
    }
    return mapdata[y][x]
}
function go_right () {
    if (pos_x < max_x) {
        if (map_old(3, 2) == 0) {
            pos_x = pos_x + 1
        }
        tegn()
    }
}
function add_row_old (row: number[]) {
    for (let value of row) {
        mapdata_old.push(value)
    }
}
function go_up () {
    if (pos_y > 0) {
        if (map_old(2, 1) == 0) {
            pos_y = pos_y - 1
        }
        tegn()
        if (pos_y == 0) {
            is_playing = false
        }
    }
}
function go_down () {
    if (pos_y < max_y) {
        if (map_old(2, 3) == 0) {
            pos_y = pos_y + 1
        }
        tegn()
    }
}
input.onGesture(Gesture.TiltRight, function () {
    if (is_playing) {
        go_right()
    }
})
function add_row (data: string) {
    tmp_array = []
    for (let index = 0; index <= data.length - 1; index++) {
        tmp_array.push(parseFloat(data.charAt(index)))
    }
    mapdata.push(tmp_array)
}
input.onGesture(Gesture.LogoDown, function () {
    if (is_playing) {
        go_up()
    }
})
let tmp_array: number[] = []
let y = 0
let x = 0
let mapdata_old: number[] = []
let is_playing = false
let monster_led_index = 0
let monster_y = 0
let pos_x = 0
let monster_x = 0
let mapdata: number[][] = []
let monster_leds: number[] = []
let outsidecolor = 0
let unknowncolor = 0
let wallcolor = 0
let pos_y = 0
let max_y = 0
let max_x = 0
let row_size = 0
row_size = 5
max_x = 2 * row_size
max_y = 10
pos_y = max_y
wallcolor = 150
unknowncolor = 25
outsidecolor = 5
monster_leds = [
255,
223,
127,
32,
0,
32,
127,
223
]
init_map()
init_map_old()
restart()
basic.forever(function () {
    while (outsidecolor == 0) {
        basic.pause(100)
    }
    while (true) {
        while (pos_y != 0) {
            basic.pause(100)
            tegn_monster()
        }
        completed()
        restart()
    }
})
