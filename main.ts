let monster_x = 0
let pos_x = 0
let monster_y = 0
let pos_y = 0
let dead = false
let is_playing = false
let monster_leds: number[] = []
let time = 0
let level = 0
let can_move = false
let wallcolor = 0
let outsidecolor = 0
let unknowncolor = 0
let mapdata: number[][] = []
let start_x = 0
let start_y = 0
let end_x = 0
let end_y = 0
let tmp_array: number[] = []
let tmp_int = 0
function tegn_monster () {
    if (Math.abs(monster_x - pos_x) <= 2 && Math.abs(monster_y - pos_y) <= 2) {
        if (pos_x == monster_x && pos_y == monster_y) {
            dead = true
            is_playing = false
        }
        led.plotBrightness(monster_x - pos_x + 2, monster_y - pos_y + 2, monster_leds[time % 8])
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
function failure () {
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
    level = 1
    dead = false
    init_level()
    is_playing = true
    tegn()
}
function init_level_2 () {
    add_row("11111411111")
    add_row("10001000001")
    add_row("10111111101")
    add_row("10101010101")
    add_row("11101110101")
    add_row("10000000101")
    add_row("10111011101")
    add_row("15100000001")
    add_row("10111010111")
    add_row("10000010001")
    add_row("11111311111")
}
function can_move_to (xx: number, yy: number) {
    return lookup(xx, yy) != 1 && lookup(xx, yy) != 2
}
input.onGesture(Gesture.LogoUp, function () {
    if (can_move) {
        go_down()
    }
})
input.onGesture(Gesture.TiltLeft, function () {
    if (can_move) {
        go_left()
    }
})
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
    if (!(finished_level())) {
        if (can_move_to(pos_x - 1, pos_y)) {
            pos_x += -1
        }
        tegn()
    }
}
function is_not_wall (xx: number, yy: number) {
    return lookup(xx, yy) != 1
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
    if (is_not_wall(1, 2)) {
        draw(0, 1)
        draw(0, 2)
        draw(0, 3)
    } else {
        hide(0, 1)
        hide(0, 2)
        hide(0, 3)
    }
    if (is_not_wall(3, 2)) {
        draw(4, 1)
        draw(4, 2)
        draw(4, 3)
    } else {
        hide(4, 1)
        hide(4, 2)
        hide(4, 3)
    }
    if (is_not_wall(2, 1)) {
        draw(1, 0)
        draw(2, 0)
        draw(3, 0)
    } else {
        hide(1, 0)
        hide(2, 0)
        hide(3, 0)
    }
    if (is_not_wall(2, 3)) {
        draw(1, 4)
        draw(2, 4)
        draw(3, 4)
    } else {
        hide(1, 4)
        hide(2, 4)
        hide(3, 4)
    }
    if (is_not_wall(1, 1)) {
        draw(0, 0)
    } else {
        hide(0, 0)
    }
    if (is_not_wall(1, 3)) {
        draw(0, 4)
    } else {
        hide(0, 4)
    }
    if (is_not_wall(3, 1)) {
        draw(4, 0)
    } else {
        hide(4, 0)
    }
    if (is_not_wall(3, 3)) {
        draw(4, 4)
    } else {
        hide(4, 4)
    }
    tegn_monster()
}
function hide (screen_x: number, screen_y: number) {
    led.plotBrightness(screen_x, screen_y, unknowncolor)
}
function init_level () {
    monster_x = -10
    monster_y = -10
    mapdata = []
    if (level == 1) {
        init_level_1()
    }
    if (level == 2) {
        init_level_2()
    }
    time = 0
    pos_x = start_x
    pos_y = start_y
}
function map (screen_x: number, screen_y: number) {
    return lookup(pos_x + screen_x - 2, pos_y + screen_y - 2)
}
function go_right () {
    if (!(finished_level())) {
        if (can_move_to(pos_x + 1, pos_y)) {
            pos_x += 1
        }
        tegn()
    }
}
function init_level_1 () {
    add_row("141")
    add_row("1051")
    add_row("101")
    add_row("131")
}
function finished_level () {
    return pos_x == end_x && pos_y == end_y
}
function go_up () {
    if (!(finished_level())) {
        if (can_move_to(pos_x, pos_y - 1)) {
            pos_y += -1
        }
        tegn()
    }
}
function go_down () {
    if (!(finished_level())) {
        if (can_move_to(pos_x, pos_y + 1)) {
            pos_y += 1
        }
        tegn()
    }
}
function lookup (xx: number, yy: number) {
    if (yy < 0 || yy >= mapdata.length) {
        return 2
    }
    if (xx < 0 || xx >= mapdata[yy].length) {
        return 2
    }
    return mapdata[yy][xx]
}
function success () {
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
input.onGesture(Gesture.TiltRight, function () {
    if (can_move) {
        go_right()
    }
})
function add_row (data: string) {
    tmp_array = []
    for (let index = 0; index <= data.length - 1; index++) {
        tmp_int = parseFloat(data.charAt(index))
        if (tmp_int == 3) {
            start_x = index
            start_y = mapdata.length
            tmp_int = 0
        }
        if (tmp_int == 4) {
            end_x = index
            end_y = mapdata.length
            tmp_int = 0
        }
        if (tmp_int == 5) {
            monster_x = index
            monster_y = mapdata.length
            tmp_int = 0
        }
        tmp_array.push(tmp_int)
    }
    mapdata.push(tmp_array)
}
input.onGesture(Gesture.LogoDown, function () {
    if (can_move) {
        go_up()
    }
})
function level_completed () {
    for (let xx = 0; xx <= 4; xx++) {
        for (let yy = 0; yy <= 4; yy++) {
            led.plot(xx, yy)
        }
    }
    basic.pause(500)
    basic.showLeds(`
        . . . . #
        . . . # #
        # . # # .
        # # # . .
        . # . . .
        `)
    basic.pause(500)
}
basic.forever(function () {
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
    while (true) {
        restart()
        while (is_playing) {
            can_move = true
            while (is_playing && !(finished_level())) {
                basic.pause(100)
                tegn_monster()
                time += 1
            }
            can_move = false
            if (!(dead)) {
                if (level < 2) {
                    level_completed()
                    level += 1
                    init_level()
                } else {
                    is_playing = false
                }
            }
        }
        if (dead) {
            failure()
        } else {
            success()
        }
    }
})
