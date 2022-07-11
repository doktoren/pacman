function init_map () {
    mapdata = []
    add_row([
    0,
    1,
    0,
    0,
    -1
    ])
    add_row([
    0,
    1,
    1,
    1,
    0
    ])
    add_row([
    1,
    1,
    1,
    1,
    -1
    ])
    add_row([
    1,
    0,
    1,
    0,
    0
    ])
    add_row([
    0,
    0,
    0,
    1,
    -1
    ])
    add_row([
    0,
    1,
    0,
    1,
    0
    ])
    add_row([
    1,
    0,
    0,
    0,
    -1
    ])
    add_row([
    0,
    1,
    0,
    0,
    1
    ])
    add_row([
    0,
    0,
    1,
    0,
    -1
    ])
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
function draw (skærmx: number, skærmy: number) {
    if (map(skærmx, skærmy) < 2) {
        if (map(skærmx, skærmy) == 0) {
            led.plotBrightness(skærmx, skærmy, 0)
        } else {
            led.plotBrightness(skærmx, skærmy, wallcolor)
        }
    } else {
        if (map(skærmx, skærmy) == 2) {
            led.plotBrightness(skærmx, skærmy, outsidecolor)
        } else {
            led.plotBrightness(skærmx, skærmy, 255)
        }
    }
}
function go_left () {
    if (pos_x > 0) {
        if (map(1, 2) == 0) {
            pos_x = pos_x - 1
        }
        tegn()
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
    if (map(1, 2) != 1) {
        draw(0, 1)
        draw(0, 2)
        draw(0, 3)
    } else {
        hide(0, 1)
        hide(0, 2)
        hide(0, 3)
    }
    if (map(3, 2) != 1) {
        draw(4, 1)
        draw(4, 2)
        draw(4, 3)
    } else {
        hide(4, 1)
        hide(4, 2)
        hide(4, 3)
    }
    if (map(2, 1) != 1) {
        draw(1, 0)
        draw(2, 0)
        draw(3, 0)
    } else {
        hide(1, 0)
        hide(2, 0)
        hide(3, 0)
    }
    if (map(2, 3) != 1) {
        draw(1, 4)
        draw(2, 4)
        draw(3, 4)
    } else {
        hide(1, 4)
        hide(2, 4)
        hide(3, 4)
    }
    if (map(1, 1) != 1) {
        draw(0, 0)
    } else {
        hide(0, 0)
    }
    if (map(1, 3) != 1) {
        draw(0, 4)
    } else {
        hide(0, 4)
    }
    if (map(3, 1) != 1) {
        draw(4, 0)
    } else {
        hide(4, 0)
    }
    if (map(3, 3) != 1) {
        draw(4, 4)
    } else {
        hide(4, 4)
    }
    tegn_monster()
}
function hide (skærmx: number, skærmy: number) {
    led.plotBrightness(skærmx, skærmy, unknowncolor)
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
function map (skærmx: number, skærmy: number) {
    x = pos_x + skærmx - 2
    y = pos_y + skærmy - 2
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
            return mapdata[(y - 1) * row_size + (Math.floor(x / 2) - 1)]
        }
    } else {
        if (y % 2 == 0) {
            return mapdata[(y - 1) * row_size + Math.floor(x / 2)]
        } else {
            return 0
        }
    }
}
function go_right () {
    if (pos_x < max_x) {
        if (map(3, 2) == 0) {
            pos_x = pos_x + 1
        }
        tegn()
    }
}
function go_up () {
    if (pos_y > 0) {
        if (map(2, 1) == 0) {
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
        if (map(2, 3) == 0) {
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
function add_row (row: number[]) {
    for (let value of row) {
        mapdata.push(value)
    }
}
input.onGesture(Gesture.LogoDown, function () {
    if (is_playing) {
        go_up()
    }
})
let y = 0
let x = 0
let is_playing = false
let monster_led_index = 0
let monster_y = 0
let pos_x = 0
let monster_x = 0
let mapdata: number[] = []
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
