// 在空白处随机产生2或者4激活，并由小变大直至占满框。
function randomNumber2or4(board,boxs){
    // 判断是否还有空白
    while(isHasBlank(board)){
        let randomi=Math.floor(Math.random()*4);
        let randomj=Math.floor(Math.random()*4);
        if(board[randomi][randomj]==0){
            board[randomi][randomj]=Math.floor(1.05+Math.random())*2;//2:4=0.9:0.1
            let index=4*randomi+randomj;//将二维索引转化为一维
            boxs[index].children[0].innerHTML=board[randomi][randomj];
            numberColor(boxs[index].children[0]);
            // 添加动画，使用动画属性animation
            boxs[index].children[0].style.animation = "size0to1 1s";
            // boxs[index].children[0].style.animation-iteration-count = "1";
            break;
        }
    }
    return true;
}
function isHasBlank(board){
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(board[i][j]==0){
                return true;
            }
        }
    }
    return false;
} 

//更新board值
function updateView(board,boxs,mergeIndex){
    let unqualNum=0;
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            let index=4*i+j;//将二维索引转化为一维
            // 让所有动画属性暂停
            boxs[index].children[0].style.animation = "";
            // boxs[index].children[0].style.animation = "sizeMergeTo1 0s";
            if(boxs[index].children[0].innerHTML!=board[i][j]){
                boxs[index].children[0].innerHTML=board[i][j];
                numberColor(boxs[index].children[0]);
                unqualNum++;
            }
        }
    }
    // alert(mergeIndex.length)
    // 给合并数字添加动画---这个地方可能有bug！！！！！！或者是mergeIndex的由来有bug，可能是在上下左右函数中某个位置写错了，有时候合并时无动画
    for(let i=0;i<mergeIndex.length;i++){
        // alert(4*mergeIndex[i][0]+mergeIndex[i][1])
        boxs[4*mergeIndex[i][0]+mergeIndex[i][1]].children[0].style.animation = "sizeMergeTo1 1s";
    }
    // 若无移动则无反应，有移动（即有数据上的变化）则在空白处生成一个数字
    if(unqualNum!=0){
        randomNumber2or4(board,boxs);//在空白处随机生成一个数字
    }
    gameResult(board);
    return;
}

// 根据键盘的键来移动模块---这样写感觉没有利用到二维数组
function moveUp(board,boxs){
    let mergeIndex=[];
    for(let j=0;j<4;j++){
        let arr=[board[0][j],board[1][j],board[2][j],board[3][j]]
        let temp=arrayNew(arr);
        let mergeArr=temp[1];
        for(let i=0;i<4;i++){
            board[i][j]=temp[0][i];
            // 判断是否在合并的数组中
            for(let k=0;k<mergeArr.length;k++){
                if(mergeArr[k]==i){
                    mergeIndex.push([i,j])
                }
            }
        }
    }
    updateView(board,boxs,mergeIndex)//移动后更新视图
}
function moveDown(board,boxs){
    let mergeIndex=[];
    for(let j=0;j<4;j++){
        let arr=[board[3][j],board[2][j],board[1][j],board[0][j]]
        let temp=arrayNew(arr);
        let mergeArr=temp[1];
        for(let i=0;i<4;i++){
            board[i][j]=temp[0][3-i];
            for(let k=0;k<mergeArr.length;k++){
                if(mergeArr[k]==(3-i)){
                    mergeIndex.push([i,j])
                }
            }
        }
    }
    updateView(board,boxs,mergeIndex)//移动后更新视图
}
function moveLeft(board,boxs){
    let mergeIndex=[];
    for(let i=0;i<4;i++){
        let arr=board[i]
        let temp=arrayNew(arr);
        let mergeArr=temp[1];
        for(let j=0;j<4;j++){
            board[i][j]=temp[0][j];
            for(let k=0;k<mergeArr.length;k++){
                if(mergeArr[k]==j){
                    mergeIndex.push([i,j])
                }
            }
        }

    }
    updateView(board,boxs,mergeIndex)//移动后更新视图
}
function moveRight(board,boxs){
    let mergeIndex=[];
    for(let i=0;i<4;i++){
        let arr=[board[i][3],board[i][2],board[i][1],board[i][0]];
        let temp=arrayNew(arr);
        let mergeArr=temp[1];
        for(let j=0;j<4;j++){
            board[i][j]=temp[0][3-j];
            for(let k=0;k<mergeArr.length;k++){
                if(mergeArr[k]==(3-j)){
                    mergeIndex.push([i,j])
                }
            }
        }
    }
    updateView(board,boxs,mergeIndex)//移动后更新视图
}

// 把一行或一列数据的数组输入进去，得到集合后 的新数组
function arrayNew(arr){
    let newArray=[];
    let mergeArr=[];
    for(let i=0;i<arr.length;i++){
        if(arr[i]!=0){
            newArray.push(arr[i]);
        }
    }
    // 相同数字合并
    for(let i=0;i<newArray.length-1;i++){
        if(newArray[i]!=0){
            if(newArray[i]==newArray[i+1]){
                score+=newArray[i]*2;
                mergeArr.push(i)
                newArray[i]=newArray[i]*2;
                newArray.splice(i+1, 1); //下标i+1开始，删除1个
            }
        }
    }
    // 新数组长度不够补0；
    let temp=arr.length-newArray.length;
    for(let i=0;i<temp;i++){
        newArray.push(0);
    }
    return [newArray,mergeArr];
}
// 设置每个元素的数字颜色(根据生成或合成的数字添加背景颜色、数字颜色),并且设置每个数字出现都是由小到大的渐变效果，移动时的滑动效果、合并时的略变大最后复原大小的效果
// 输入是包含数字文本的元素
function numberColor(num){
    let numText=num.innerHTML;
    if(numText!=0){
        num.style.display="block";
        if(numText==2||numText==4){
            num.style.color="#776e65";
        }else{
            num.style.color="#F9F6F2";
        }
        if(numText==2){
            num.style.backgroundColor='#EEE4DA';
        }else if(numText==4){
            num.style.backgroundColor="#ede0c8";
        }else if(numText==8){
            num.style.backgroundColor="#f2b179";
        }
        else if(numText==16){
            num.style.backgroundColor="#f59563";
        }
        else if(numText==32){
            num.style.backgroundColor="#f67e60";
        }
        else if(numText==64){
            num.style.backgroundColor="#f65e3b";
        }
        else if(numText==128){
            num.style.backgroundColor="#edcf72";
        }
        else if(numText==256){
            num.style.backgroundColor="#eccb60";
        }
        else if(numText==512){
            num.style.backgroundColor="#ecc84e";
        }
        else if(numText==1024){
            num.style.backgroundColor="#edc63a";
        }
        else if(numText==2048){
            num.style.backgroundColor="#ebc32d";
        }else{
            num.style.backgroundColor="";
        }
    }else{
        num.style.display="none";
    }

    
}


// 若铺满了整个页面也没有可再合并的盒子，则游戏失败
//若合成了2048，则弹框显示游戏成果
function gameResult(board){
    // alert(isHasBlank(board))
    if(!isHasBlank(board)){
        // alert("1")
        for(let i=0;i<4;i++){
            for(let j=0;j<4;j++){
                if(board[i][j]==0||(j+1<4&&board[i][j]==board[i][j+1])||(j-1>=0&&board[i][j]==board[i][j-1])||(i+1<4&&board[i][j]==board[i+1][j])||(i-1>=0&&board[i][j]==board[i-1][j])){
                    // alert(i);
                    // alert(j);
                    return;
                }
            }
        }
        // 弹出游戏结束框
        let gameOver=document.getElementsByClassName("gameOver")[0];
        gameOver.style.display='block';
    }
    
    // new game
}

// 合并和随机产生数字时，有个从小到大的渐变的变化