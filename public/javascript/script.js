let iscreater=false;
function createuser(){
    const creatediv = document.getElementById("createuser");
    creatediv.insertAdjacentHTML("beforeend",'<div class="row" id="newplayer"><div class="col-4"><input class=" form-control mt-3 w-1" type="text" id="plname"></insert><button class="btn btn-light mt-1 text-right" onclick="addplayer()">Add</button></div></div>');
}
const player=function(n){
    this.name=n,
    this.score=0
};

const Room=function(n){
    this.name=n
};


let players=new Array();
function addplayer(){
    const newplayer = new player(document.getElementById("plname").value);
    players.push(newplayer);
    const creatediv = document.getElementById("createuser");
    creatediv.removeChild(document.getElementById("newplayer"));
    console.log(totalplayers(players));
    displayplayers(players);
}

function totalplayers(arrplayers){
    const total = arrplayers.reduce((total)=>total+=1,0);
    return total;
}

function displayplayers(arrplayers){
    const playing = document.getElementById("playersplaying");
    playing.innerHTML="";
    let i=1;
    arrplayers.forEach(player => {                
        playing.insertAdjacentHTML("beforeend",`<div class="container mt-3" id="player${i}" style="margin:10px;"> ${player.name} Score : ${player.score}</div>`);
        i++;
    });
}
let turn=0;
function start(){
    if(totalplayers(players)<2){
        alert('Add atleast 2 player');
    }
    else{
        turn=1; 
        const creatediv = document.getElementById("createuser");
        creatediv.innerHTML="";
        const playingplayer=document.getElementById(`player${turn}`);
        playingplayer.classList.add("playing");
        document.getElementById("startbtn").classList.add('hide');
        document.getElementById("btnroll").classList.remove('hide');
        document.getElementById("btnhold").classList.remove('hide');
        document.getElementById("divscorecount").classList.remove('hide');
    }  
}
let dicenumber;
let scorecount=0;
function play(){
    
        dicenumber=rolldice();
        
        setTimeout(()=>{document.getElementById('dice').innerHTML=  dicenumber;
        if(dicenumber>1){
            scorecount+=dicenumber;
            document.getElementById("scorecount").innerHTML= scorecount;
        }
        else
        {
            scorecount=0;
            document.getElementById("scorecount").innerHTML=scorecount;
            hold();
        }},1000);
        document.getElementById('dice').innerHTML='Rolling... 🎲️';
        
        
         
    
}

function rolldice(){
    return Math.ceil(Math.random() * 6);
}

function hold(){
     players[turn-1].score+=scorecount;
    displayplayers(players);
    scorecount=0;
    if(turn<totalplayers(players)){
        var playingplayer=document.getElementById(`player${turn}`);
        playingplayer.classList.remove("playing");
        turn+=1;
        
        var playingplayer=document.getElementById(`player${turn}`);
        playingplayer.classList.add("playing");
        document.getElementById("scorecount").innerHTML=scorecount;
    }
    else{
        var playingplayer=document.getElementById(`player${turn}`);
        playingplayer.classList.remove("playing");
        turn=1;
        var playingplayer=document.getElementById(`player${turn}`);
        playingplayer.classList.add("playing");
        document.getElementById("scorecount").innerHTML=scorecount;
    }

}

function createroom(){
    iscreater=true;
    const creatediv = document.getElementById("createroom");
    creatediv.insertAdjacentHTML("beforeend",'<div class="row" id="newroom"><div class="col-4"><input class=" form-control mt-3 w-1" type="text" id="roomname"></insert><button class="btn btn-light mt-1 text-right" onclick="addroom()">Add</button></div></div>');
}

function addroom(){
    const newplayer = new player("roomcreater");
    players.push(newplayer);
    console.log({players})
    let newroom = new Room(document.getElementById("roomname").value);
    const creatediv = document.getElementById("createroom");
    creatediv.removeChild(document.getElementById("newroom"));  
    creatediv.innerHTML=`
    <div class="container">
        <h5>Room Name: ${newroom.name}</h5>
        <h4>Players joined: ${players.length}</h4>
    </div>
    `;
}

function joinroom(){
    const creatediv = document.getElementById("joinroom");
    creatediv.insertAdjacentHTML("beforeend",'<div class="row" id="joinroom"><div class="col-4"><input class=" form-control mt-3 w-1" type="text" id="roomname"></insert><button class="btn btn-light mt-1 text-right" onclick="addroom()">Add</button></div></div>');
    const newplayer = new player("roomjoiner");
    players.push(newplayer);
    console.log({players})
    let newroom = new Room(document.getElementById("roomname").value);   
    creatediv.removeChild(document.getElementById("joinroom"));  
    creatediv.innerHTML=`
    <div class="container">
        <h5>Room Name: ${newroom.name}</h5>
        <h4>Players joined: ${players.length}</h4>
    </div>
    `;
}
