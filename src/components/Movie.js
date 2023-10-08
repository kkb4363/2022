import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Movie래퍼 = styled.div`
width:400px;
height:350px;
border-radius:25px;
background-color:white;
margin:40px 50px;
display:flex;
flex-direction:column;
position:relative;
img{
    position:absolute;
    height:200px;
    width:150px;
    margin-left:-20px;
    margin-top:-20px;
}
h2,h3,p,span{
    margin-left:140px;
}
h2{
    display:flex;
    margin-left:150px;
    margin-top:10px;
    font-size:27px;
}
h3{
    position:absolute;
    margin-top:150px;
}
p{  
    position:absolute;
    margin-top:180px;
}
ul{
    margin-left:10px;
    margin-top:185px;
}
span{
    position:absolute;
    margin-top:140px;
    right:0;
    font-size:25px;
}
`
const 장르 = styled.ul`
width:300px;
height:200px;
display:flex;
position:absolute;
margin-top:175px;
margin-left:400px;
flex-wrap:wrap;
flex-direction:column;
li{
    font-size:15px;
    margin-left:-20px;
}
`

function Movie({id,cover_image,title,summary,genres,runtime}){
return (
    <Movie래퍼>
    <img src={cover_image} alt={title}/>
    <h2>{title}</h2>
    <h3><Link style={{textDecoration:'none'}} to={`Detail/${id}`}>바로가기</Link></h3>
    <span>{runtime}minute</span>
    <p>{summary.length > 100 ? `${summary.slice(0,100)}...` : summary}</p>
    <장르>{genres.map((g) => (<li key={g}>{g}</li>))}</장르>
    </Movie래퍼>          
)};
export default Movie;