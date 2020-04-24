var board = document.getElementById('board');
var scoreSheet = document.getElementById('score');
// 存储棋盘中的数值, 0表示为空
var map = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
var colorMap = {
        2: 'rgb(249, 245, 244)',
        4: 'rgb(246, 248, 245)',
        8: 'rgb(227, 226, 205)',
       16: 'rgb(220, 216, 201)',
       32: 'rgb(228, 216, 209)',
       64: 'rgb(192, 191, 198)',
      128: 'rgb(228, 199, 203)',
      256: 'rgb(193, 188, 169)',
      512: 'rgb(171, 179, 168)',
     1024: 'rgb(141, 157, 164)',
     2048: 'rgb(190, 160, 149)',
     4096: 'rgb(164, 148, 122)',
     8192: 'rgb(145, 154, 149)',
    16384: 'rgb(113, 134, 137)'
};
var fontSize = { // 键值表示位数
    1: '2em',
    2: '2em',
    3: '1.6em',
    4: '1.3em',
    5: '1.1em'
}
var score = 0; // 分数

window.onload = function() {  
    scoreSheet.innerText = '分数：0';
    let row = '';
    for (let i=0; i<16; i++) {
        row += '<div class="item"></div>';
    }
    board.innerHTML = row;
    generate(); // 初始化随机生成两个数
}

function move(direction) { 
    // 棋盘顺时针旋转90度
    let rotate90 = function(map) {
        let res = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        for (let i=0; i<4; i++)
            for (let j=0; j<4; j++) 
                res[j][4-i-1] = map[i][j];
        return res;
    }
    // 棋盘顺时针旋转180度
    let rotate180 = function(map) {
        let res = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        for (let i=0; i<4; i++)
            for (let j=0; j<4; j++) 
                res[4-i-1][4-j-1] = map[i][j];
        return res;
    }
    // 棋盘逆时针旋转90度
    let rotate270 = function(map) {
        let res = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        for (let i=0; i<4; i++)
            for (let j=0; j<4; j++) 
                res[4-j-1][i] = map[i][j];
        return res;
    }
    // 棋盘元素从左向右移动
    let toRight = function(map) {
        ifMove = false;
        for (let i=0; i<4; i++)
            for (let j=2; j>=0; j--){
                if (map[i][j]==0) continue;
                let k=j;
                // 对于非尾元素且右侧元素为0, 右移
                while (k<=2 && map[i][k+1]==0) { 
                    map[i][k+1] = map[i][k];
                    map[i][k] = 0;
                    k++;
                    ifMove = true;
                }
                // 对于非尾元素且与右侧元素等值, 合并
                if (map[i][k+1]==map[i][k]) {
                    map[i][k+1] *= 2;
                    map[i][k] = 0;
                    score += map[i][k+1];
                    scoreSheet.innerText = `分数：${score}`;
                    ifMove = true;
                }
            }
        let isFull = true;
        for (let i=0; i<4 && isFull; i++)
            for (let j=0; j<4 && isFull; j++)
                if (map[i][j]==0) isFull = false;
        // 若某次操作中，既没有元素块移动，棋盘亦没有空位，则视作游戏结束
        if (!ifMove && isFull) {
            alert(`游戏结束！您的分数为 ${score}`); 
            location.reload();
            return;
        }
        return map;      
    }
    // 渲染移动后的棋盘
    let drawMap = function() {
        for (let i=0; i<4; i++)
            for (let j=0; j<4; j++) {
                let x = map[i][j];
                board.childNodes[i*4+j].innerText = x==0 ? '' : x;
                board.childNodes[i*4+j].style.backgroundColor = x==0 ? 'white' : colorMap[x];
                board.childNodes[i*4+j].style.fontSize = fontSize[String(x).length];
            }
    }
    // 统一将棋盘先旋转至重心在右侧，元素执行完毕后，再转回来
    let moveLeft = function() {
        map = rotate180(toRight(rotate180(map)));
        drawMap();
    }
    let moveRight = function() {
        map = toRight(map);
        drawMap();
    }
    let moveUp = function() {
        map = rotate270(toRight(rotate90(map)));
        drawMap();
    }
    let moveDown = function() {
        map = rotate90(toRight(rotate270(map)));
        drawMap();
    }
    let obj = {
        'left': moveLeft,
        'right': moveRight,
        'up': moveUp,
        'down': moveDown
    }
    obj[direction]();
    generate();
}

// 棋盘生成随机新元素
function generate() {
    // 生成0-3之间的随机整数
    let randInt4 = () => {
        return Math.floor(Math.random()*4)
    }
    let val = Math.random()>0.5 ? 4 : 2;
    // 随机生成坐标
    let x = randInt4();
    let y = randInt4();
    while (map[x][y]!=0) {
        x = randInt4();
        y = randInt4();
    }
    map[x][y] = val;
    // 填充进棋盘的空位处
    board.childNodes[x*4+y].innerText = val;
    board.childNodes[x*4+y].style.backgroundColor = colorMap[val];
    board.childNodes[x*4+y].style.fontSize = fontSize[String(val).length];
}

// 监听键盘上下左右事件
document.onkeydown = function(event) {
    event.preventDefault();
    if (event.key == 'ArrowRight') move('right');
    if (event.key == 'ArrowLeft') move('left');
    if (event.key == 'ArrowDown') move('down');
    if (event.key == 'ArrowUp') move('up');
}