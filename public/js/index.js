//4*4格子
var board=new Array();
for(let i=0;i<4;i++){
    board[i]=new Array(4).fill(0);
}
// updateBoardView();
// 游戏分数
var score=0;

//console.log("1");
window.onload = function(){
    // 1让游戏刚开始/每次刷新页面就随机在任何位置出现两个2/4,开始时棋盘内随机出现两个数字，出现的数字仅可能为2或4
    let boxs=document.getElementsByClassName("box");
    // 初始化棋盘任意位置上随机生成两个数字（2或4）
    randomNumber2or4(board,boxs);
    
    randomNumber2or4(board,boxs);
    
    /*2玩家可以选择上下左右四个方向，若棋盘内的数字出现位移或合并，视为有效移动
　　玩家选择的方向上若有相同的数字则合并，每次有效移动可以同时合并，但不可以连续合并
　　合并所得的所有新生成数字想加即为该步的有效得分*/
    //2玩家选择的方向行或列前方有空格则出现位移，每有效移动一步，棋盘的空位(无数字处)随机出现一个数字(依然可能为2或4)
    document.onkeydown=function(event){
        event = event ||window.event;
        // 键盘响应后根据board数组中的值进行移动和计算，并将计算后的新值传给有active类的文本中
        
        
        // alert(event.key)
        switch(event.key){
            case 'ArrowUp':
                moveUp(board,boxs)
                break;
            case 'ArrowDown':
                moveDown(board,boxs)
                break;
            case 'ArrowLeft':
                moveLeft(board,boxs)
                break;
            case 'ArrowRight':
                moveRight(board,boxs)
                break;
            default:
                alert('按错键，应使用键盘上下左右键')
                break;
        }
       
        //将score中的span的文本值设为实时分数
        document.getElementById("score").children[1].innerHTML=score;
        
        
    }  
}