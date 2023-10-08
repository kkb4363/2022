import { useQuery } from "@tanstack/react-query";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { getPopularTv, IGetTvResult, getTop_ratedTv } from "../api";
import {motion, AnimatePresence,useScroll} from 'framer-motion';
import { useEffect, useState } from "react";
import styled from 'styled-components';
import { makeImagePath } from "../utils";
import { AiFillStar } from "react-icons/ai";
import { BsFillArrowRightCircleFill , BsFillArrowLeftCircleFill, BsFillPlayCircleFill} from "react-icons/bs";
const offset = 6, API_KEY = '505148347d18c10aeac2faa958dbbf5c',BASE_PATH = 'https://api.themoviedb.org/3';

const 래퍼 = styled.div`
background:black;
`
const 로딩 = styled.div`
height:20vh;
display:flex;
justify-content:center;
align-items:center;
`
const 배너 = styled.div<{bgPhoto:string}>`
height:100vh;
display:flex;
flex-direction:column;
justify-contents:center;
padding:60px;
background-image: linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0)) , url(${props => props.bgPhoto});
background-size:cover;
`
const 배너제목 = styled.h2`
font-size:68px;
margin-bottom:20px;
`
const 배너개요 = styled.p`
font-size:20px;
width:50%;
`
const 슬라이더제목 = styled.div`
left:0;
position:absolute;
font-size:35px;
width:400px;
height:200px;
top:-50px;
font-weight:400;
`
const 오버레이 = styled(motion.div)`
position:absolute;
top:0;
width:100%;
height:200%;
background-color:rgba(0,0,0,0.5);
opacity:0;
`
const 빅무비 = styled(motion.div)`
position:absolute; 
width:40vw; 
height:80vh;
left:0;
right:0;
margin:0 auto;
border-radius:15px;
overflow:hidden;
background-color:${props=>props.theme.black.lighter};
`
const 빅커버 = styled.div`
width:100%;
height:70%;
background-size:cover;
background-position:center center;
`
const 빅제목 = styled.h3`
color:${props => props.theme.white.lighter};
font-size:40px;
position:relative;
display:flex;
justify-content:center;
align-items:center;
top:-250px;
padding:20px;
`
const 빅장르 = styled.h4`
color:${props => props.theme.white.lighter};
font-size:20px;
position:relative;
display:flex;
align-items:center;
justify-content:center;
top:-250px;
div{
  margin:0 5px;
  width:120px;
  height:50px;
  border-radius:20px;
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:rgba(0,0,0,0.2);
}

`
const 빅내용 = styled.p`
padding:20px;
margin-top:-150px;
color:${props => props.theme.white.lighter};
`
const 빅점수 = styled.div`
position:absolute;
bottom:10px;
padding:20px;
color:${props=>props.theme.white.lighter};
font-size:30px;
`
const 빅출시일 = styled.p`
padding:20px;
position:absolute;
right:0px;
bottom:10px;
font-size:30px;
color:${props=>props.theme.white.lighter};
`
const 빅플레이버튼 = styled.div`
position:absolute;
padding:20px;
bottom:0px;
margin-left:300px;
font-size:40px;
border-radius:5px;
cursor:pointer;
color:${props=>props.theme.white.lighter};
`
const 이전버튼 = styled.button`
position:absolute;
font-size:50px;
background-color:rgba(0,0,0,0);
left:0;
top:70px;
border:rgba(0,0,0,0);
color:rgba(0,0,0,0.5);
`
const 다음버튼 = styled.button`
position:absolute;
font-size:50px;
background-color:rgba(0,0,0,0);
right:0;
top:70px;
border:rgba(0,0,0,0);
color:rgba(0,0,0,0.5);
`
const Row = styled(motion.div)`
display:grid;
gap:5px;
grid-template-columns:repeat(6,1fr);
margin-bottom:5px;
position:absolute;
width:100%;
`
const Box = styled(motion.div)<{bgPhoto:string}>` 
background-color:white;
height:200px;
background-image:url(${props => props.bgPhoto});
background-size:cover;
background-position:center center;
font-size:66px;
position:relative;
cursor:pointer;
&:first-child{
  transform-origin:center left;
}
&:last-child{
  transform-origin:center right;
}
`
const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`
const rowVariants = {
  hidden : (custom:boolean) => ({
    x: custom? window.outerWidth +5 : -window.outerWidth -5 ,
  }),
  visible: {
    x:0,
  },
  exit : (custom:boolean) => ( {
    x: custom? -window.outerWidth -5 : window.outerWidth +5,
  }),
}
const boxVariants = {
    normal: {
      scale: 1,
    },
    hover: {
      zIndex:999,
      scale: 1.3,
      y: -80,
      transition: {
        delay: 0.5,
        duaration: 0.1,
        type: "tween",
      },
    },
}
const infoVariants = {
    hover: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duaration: 0.1,
        type: "tween",
      },
    },
}
const BTN = styled.div`
cursor:pointer;
margin-top:20px;
width:100px;
height:50px;
background-color:white;
top:200px;
left:0;
display:flex;
justify-content:center;
align-items:center;
border-radius:20px;
font-weight:bold;
color:black;
`
const P슬라이더 = styled.div`
position:relative;
top: -100px;
`
const T슬라이더 = styled.div`
position:relative;
top: 200px;
`
function Tv(){
    const [back, setBack] = useState(false),[back2, setBack2] = useState(false),[index, setIndex] = useState(0),[index2, setIndex2] = useState(0),[leaving, setLeaving] = useState(false)
    const navigate = useNavigate(),{scrollY} = useScroll();
    const useMultipleQuery = () => {
      const Popular = useQuery<IGetTvResult>(['Popular'],getPopularTv)
      const Top_rate = useQuery<IGetTvResult>(['Top_rate'],getTop_ratedTv)
      return[Popular,Top_rate]
    }
    const [{data:Populardata},{data:Top_ratedata,isLoading:loading},] =useMultipleQuery()
    const [gen,setgen] =useState<any[]>([]);
    useEffect(()=>{
        fetch(`${BASE_PATH}/genre/tv/list?api_key=${API_KEY}&language=ko-KR`)
        .then((res)=>res.json())
        .then((json)=>{
            setgen(json.genres);
        })
    },[])
    const tvPathMatch:PathMatch<string>|null = useMatch('/tv/:tvId');
    const TVPath = tvPathMatch?.params.tvId && Populardata?.results.find(tv => tv.id+'' === tvPathMatch.params.tvId)
    const TVPath2 = tvPathMatch?.params.tvId && Top_ratedata?.results.find(tv => tv.id+'' === tvPathMatch.params.tvId)
    const onOverlayClick = () => navigate('/tv'),toggleLeaving = () => setLeaving(prev => !prev);
    const onBoxClicked = (tvId:number) => {
        navigate(`/tv/${tvId}`);
    };
    const onDetail = (movieId:string) => {
      navigate(`/tv/${movieId}`);
    }
    const p이전버튼 = () => {
        if(Populardata){
            if(leaving) return;
        toggleLeaving();
        setBack(false);
        const totalTv = Populardata.results.length;
        const MaxIndex = Math.floor(totalTv/offset) -1;
        setIndex((prev)=> prev === 0? MaxIndex : prev -1);
    }}
    const p다음버튼 = () => {
        if(Populardata){
            if(leaving) return;
        toggleLeaving();
        setBack(true);
        const totalTv = Populardata.results.length ;
        const MaxIndex = Math.floor(totalTv/offset) -1;
        setIndex((prev)=> prev === MaxIndex? 0 : prev+1);
    }}
    const T이전버튼 = () => {
    if(Populardata){
      if(leaving) return;
    toggleLeaving();
    setBack2(false);
    const totalTv = Populardata.results.length ;
    const MaxIndex2 = Math.floor(totalTv/offset) -1;
    setIndex2((prev)=> prev === 0? MaxIndex2 : prev -1);
    }}
    const T다음버튼 = () => {
    if(Populardata){
      if(leaving) return;
    toggleLeaving();
    setBack2(true);
    const totalTv = Populardata.results.length ;
    const MaxIndex2 = Math.floor(totalTv/offset) -1;
    setIndex2((prev)=> prev === MaxIndex2? 0 : prev+1);
    }}
    return (
        <래퍼>
        {loading ? <로딩>Loading...</로딩>
        :<>
        <배너 bgPhoto={makeImagePath(Populardata?.results[0]?.backdrop_path || '')}>
        <배너제목>{Populardata?.results[0]?.name}</배너제목>
        <배너개요>{Populardata?.results[0]?.overview}</배너개요>
        <BTN
            onClick={() => onDetail(Populardata?.results[0]?.id+'')}>자세히 보기</BTN>
        </배너>

        <P슬라이더>
            <슬라이더제목>Popular Tv</슬라이더제목>
            <AnimatePresence
            custom={back}
            initial={false}
            onExitComplete={toggleLeaving}>
                <Row
                custom={back}
                variants={rowVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                transition={{type:'tween', duration:0.5}}
                key={index}>
                    {Populardata?.results.slice(2).slice(offset*index, offset*index+offset)
                    .map((tv) => (
                        <Box
                        layoutId={tv.id+'1'}
                        variants={boxVariants}
                        key={tv.id}
                        whileHover='hover'
                        initial='normal'
                        onClick={()=> onBoxClicked(tv.id)}
                        transition={{type:'tween'}}
                        bgPhoto={makeImagePath(tv.backdrop_path, 'w400' || '')}>
                            <Info
                            variants={infoVariants}>
                                <h4>{tv.name}</h4>
                            </Info>
                        </Box>
                    ))}    
                </Row>
                <이전버튼 onClick={p이전버튼}><BsFillArrowLeftCircleFill/></이전버튼>
                <다음버튼 onClick={p다음버튼}><BsFillArrowRightCircleFill/></다음버튼>
            </AnimatePresence>
        </P슬라이더>

        <T슬라이더>
            <슬라이더제목>Top_rated Tv</슬라이더제목>
            <AnimatePresence
            custom={back2}
            initial={false}
            onExitComplete={toggleLeaving}>
                <Row
                custom={back2}
                variants={rowVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                transition={{type:'tween', duration:0.5}}
                key={index2}>
                    {Top_ratedata?.results.slice(2).slice(offset*index2, offset*index2+offset)
                    .map((tv) => (
                        <Box
                        layoutId={tv.id+''}
                        variants={boxVariants}
                        key={tv.id}
                        whileHover='hover'
                        initial='normal'
                        onClick={()=> onBoxClicked(tv.id)}
                        transition={{type:'tween'}}
                        bgPhoto={makeImagePath(tv.backdrop_path, 'w400' || '')}>
                            <Info
                            variants={infoVariants}>
                                <h4>{tv.name}</h4>
                            </Info>
                        </Box>
                    ))}    
                </Row>
                <이전버튼 onClick={T이전버튼}><BsFillArrowLeftCircleFill/></이전버튼>
                <다음버튼 onClick={T다음버튼}><BsFillArrowRightCircleFill/></다음버튼>
            </AnimatePresence>
        </T슬라이더>

        <AnimatePresence>
            {tvPathMatch ? 
            <>
            <오버레이 onClick={onOverlayClick} animate={{opacity:1}} exit={{opacity:0}}/>
            <빅무비 layoutId={TVPath? tvPathMatch.params.tvId+'1' : tvPathMatch.params.tvId} style={{top:scrollY.get()+100}}>
                {TVPath && 
                <>
                <빅커버 style={{backgroundImage:`url(${makeImagePath(TVPath.backdrop_path, 'w500')})`}}/>
                <빅제목>{TVPath.name}</빅제목>
                <빅장르>{TVPath.genre_ids.map((g) => (
                gen.map((v)=>(
                  v.id === g ? (
                    <div>{v.name}</div>
                  ): null
                ))))}
                </빅장르>
                <빅내용>{TVPath.overview.slice(0,100)+'...'}</빅내용>
                <빅점수>{TVPath.vote_average}<AiFillStar style={{fontSize:'20px'}}/></빅점수>
                <빅출시일>{TVPath.first_air_date.slice(0,4)}</빅출시일>
                <빅플레이버튼><BsFillPlayCircleFill/></빅플레이버튼>
                </>}

                {TVPath2 && 
                <>
                <빅커버 style={{backgroundImage:`url(${makeImagePath(TVPath2.backdrop_path, 'w500')})`}}/>
                <빅제목>{TVPath2.name}</빅제목>
                <빅장르>{TVPath2.genre_ids.map((g) => (
                gen.map((v)=>(
                  v.id === g ? (
                    <div>{v.name}</div>
                  ): null
                ))))}
                </빅장르>
                <빅내용>{TVPath2.overview.slice(0,100)+'...'}</빅내용>
                <빅점수>{TVPath2.vote_average}<AiFillStar style={{fontSize:'20px'}}/></빅점수>
                <빅출시일>{TVPath2.first_air_date.slice(0,4)}</빅출시일>
                <빅플레이버튼><BsFillPlayCircleFill/></빅플레이버튼>
                </>}
            </빅무비>
            </> 
            : null
        }
        </AnimatePresence>
        </>} 
        </래퍼>
    )
}
export default Tv;

// 어려웠던점 : 슬라이더의 layoutId가 같으면 다른 슬라이더에 똑같은 영화나 티비가 있을때 애니메이션이 제대로
// 하지 않는다. 그걸 해결하기 위해 layoutId만 바꿔줬다.