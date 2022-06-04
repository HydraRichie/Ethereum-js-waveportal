//SPDEX-licensce-Identifier:Undefined
pragma solidity ^0.8.0;

contract WavePortal
{
    //to get or to store total no of waves we gotup
uint public totalwaves;
event newWave(address from,string message,uint time);
//userdefined datatype
struct Wave
{
    address from;
    string message;
    uint time;
   
}
//array to store deatils of all users
Wave [] wavers;
//function to wave
function wave(string memory _message)public 
{

    totalwaves=totalwaves+1;
    wavers.push(Wave(msg.sender,_message,block.timestamp));
    emit newWave(msg.sender,_message,block.timestamp);
}
function TotalWaves()public returns(uint)
{
    return totalwaves;
}  

function Allwaves()public view returns(Wave[] memory)
{
    return wavers;
}
}
