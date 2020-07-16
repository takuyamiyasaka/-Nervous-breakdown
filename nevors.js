let cards = [];
var startTime;
var timer;
var backTimer;
var flgFirst = true;
var cardFirst;
var countUnit = 0;
let firstFlg = true;
let player1=true;
let player2=false;
let player1Score =0;
let player2Score = 0;
let score;
let player;

window.onload = function(){
    let arr = [];

    for(let i = 0;i<13;i++){
        arr.push(i);
        arr.push(i);
        arr.push(i);
        arr.push(i);
    }
    shuffle(arr);
    let panel= document.getElementById("panel");
    for(i=0;i<52;i++){
        let div = document.createElement("div");
        div.className = "card back";
        div.index= i;
        div.number = arr[i];
        div.innerHTML="";
        div.onclick = turn;
        panel.appendChild(div);
        cards.push(div);
    }
    startTime = new Date();
    startTimer();
    score = setInterval(showScore,1000);
    player = setInterval(nowPlayer,1000);
}
function shuffle(arr){
    let n = arr.length;
    let temp,i;

    while(n){
        i=Math.floor(Math.random()*n--);
        temp = arr[n];
        arr[n]=arr[i];
        arr[i]=temp;
    }
    return arr;
}

function turn(e){
    let div = e.target;
    if(backTimer)return;
    if(div.innerHTML==""){
        div.className="card turnCard";
        div.innerHTML=div.number;
    }else{
        return;
    }
    if(player1){
        if(firstFlg){
            cardFirst=div;
            firstFlg = false;
        }else{
            if(cardFirst.number==div.number){
                countUnit++;
                player1Score++;
                backTimer=setTimeout(function(){
                    div.className="card finish";
                    backTimer = NaN;
                    console.log(countUnit);
                    if(countUnit ===26){
                        alert("finish");
                        clearInterval(timer);
                    }
                },500)
            }else{
                    backTimer=setTimeout(function(){
                        div.className="card back turnCard2";
                        div.innerHTML="";
                        cardFirst.className="card back turnCard2";
                        cardFirst.innerHTML="";
                        cardFirst=null;
                        backTimer=NaN;
                        player1=false;
                        player2=true
                    },500);
            }
            firstFlg=true;
        }
    }else{
        if(firstFlg){
            cardFirst=div;
            firstFlg = false;
        }else{
            if(cardFirst.number==div.number){
                countUnit++;
                player2Score++;
                backTimer=setTimeout(function(){
                    div.className="card finish";
                    backTimer = NaN;
                    console.log(countUnit);
                    if(countUnit ==26){
                        alert("finish");
                        clearInterval(timer);
                    }
                },500)
            }else{
                    backTimer=setTimeout(function(){
                        div.className="card back turnCard2";
                        div.innerHTML="";
                        cardFirst.className="card back turnCard2";
                        cardFirst.innerHTML="";
                        cardFirst=null;
                        backTimer=NaN;
                        player2=false;
                        player1=true;
                    },500);
            }
            firstFlg=true;
        }
    }
}
function startTimer(){
    timer = setInterval(showSecond,1000);
}
function showSecond(){
    let nowTime = new Date();
    let elapsetTime = Math.floor((nowTime-startTime)/1000);
    let str = "経過秒数:"+elapsetTime+"秒";
    let re =document.getElementById("result");
    re.innerHTML=str;
}
function showScore(){
    let p1 = document.getElementById("play1score");
    let p2 = document.getElementById("play2score");
    p1.innerHTML="player1:"+player1Score;
    p2.innerHTML="player2:"+player2Score;
}
function nowPlayer(){
    let nowPlayer = document.getElementById("player");
    if(player1){
        nowPlayer.innerHTML="現在のプレイヤーはplayer1です";
    }else{
        nowPlayer.innerHTML="現在のプレイヤーはplayer2です";
    }
}
