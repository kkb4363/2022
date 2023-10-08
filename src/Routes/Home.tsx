import { useQuery } from "@tanstack/react-query";
import { gettop_ratedMovies, getupcomingMovies, IGetMoviesResult } from "../api";
import styled from 'styled-components';
import { makeImagePath } from "../utils";
import {motion, AnimatePresence,useScroll} from 'framer-motion';
import { useEffect, useState } from "react";
import {useNavigate, useMatch, PathMatch} from 'react-router-dom';
import { BsFillArrowRightCircleFill , BsFillArrowLeftCircleFill, BsFillPlayCircleFill} from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
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
justify-content:center;
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
background-color:${props=>props.theme.black.lighter};
overflow:hidden;
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
  font-weight:bold;
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
    x: custom? window.outerWidth +5 : -window.outerWidth -5,
  }),
  visible: {
    x:0,
  },
  exit : (custom:boolean) => ( {
    x: custom? -window.outerWidth -5 : +window.outerWidth +5,
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
};
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};
const Top슬라이더 = styled.div`
position:relative;
top: -100px;
`
const 곧출시슬라이더 = styled.div`
position:relative;
top: 200px;
`
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

function Home(){
  const [leaving, setLeaving] = useState(false),[back, setback] = useState(false),[back2, setback2] = useState(false),[index, setIndex] = useState(0),[index2, setIndex2] = useState(0),[장르api,장르api설정] = useState<any[]>([])
  const useMultipleQuery = () => {
    const top_rated = useQuery<IGetMoviesResult>(['top_rated'],gettop_ratedMovies);
    const upcoming = useQuery<IGetMoviesResult>(['upcoming'],getupcomingMovies);
    return[top_rated,upcoming]
  }
  const [{data:top_rateddata},{data:upcomingdata,isLoading:loading},] = useMultipleQuery()
    useEffect(()=>{
      fetch(`${BASE_PATH}/genre/movie/list?api_key=${API_KEY}&language=ko-KR`)
      .then((res)=>res.json())
      .then((json)=>{
        장르api설정(json.genres);
      })
    },[])
    
    const navigate = useNavigate(),{scrollY} = useScroll(),무비pathmatch:PathMatch<string>|null = useMatch('/movies/:movieId');
    const CM1 = 무비pathmatch?.params.movieId && top_rateddata?.results.find(movie => movie.id+'' === 무비pathmatch.params.movieId)
    const CM2 = 무비pathmatch?.params.movieId && upcomingdata?.results.find(movie => movie.id+'' === 무비pathmatch.params.movieId)
    const onOverlayClick = () => navigate('/React-Netflix');
    const onBoxClicked = (movieId:number) => {
      navigate(`/movies/${movieId}`);
    }
    const onDetail = (movieId:string) => {
      navigate(`/movies/${movieId}`);
    }
    const toggleLeaving = () => setLeaving(prev => !prev);

    const Top이전버튼 = () => {
      if(top_rateddata){
        if(leaving) return;
      toggleLeaving();
      const totalMovies2 = top_rateddata.results.length ;
      const maxIndex2 = Math.floor(totalMovies2/offset) -1;
      setIndex((prev) => prev === 0 ? maxIndex2 : prev -1);
      setback(false);
      }
    }
    const Top다음버튼 = () => {
      if(top_rateddata){
        if(leaving) return;
      toggleLeaving();
      const totalMovies2 = top_rateddata.results.length ; {/*영화 개수 알아내기 , -1을 해주는 이유는 이미 메인페이지에 영화 하나 쓰고있으니깐 */}
      const maxIndex = Math.floor(totalMovies2/ offset) -1 ; {/* 인덱스의 길이구하기 , Math.ceil은 올림, -1을 해주는 이유는 page가 0에서 시작하기 때문에 */}
      setIndex((prev) => prev === maxIndex ? 0 : prev + 1); 
      setback(true);
      }
    }
    const 곧출시이전버튼 = () => {
      if(upcomingdata){
        if(leaving) return;
      toggleLeaving();
      const totalMovies3 = upcomingdata.results.length ;
      const maxIndex2 = Math.floor(totalMovies3/offset) -1;
      setIndex2((prev) => prev === 0 ? maxIndex2 : prev -1);
      setback2(false);
      }
    }
    const 곧출시다음버튼 = () => {
      if(upcomingdata){
        if(leaving) return;
      toggleLeaving();
      const totalMovies3 = upcomingdata.results.length ; {/*영화 개수 알아내기 , -1을 해주는 이유는 이미 메인페이지에 영화 하나 쓰고있으니깐 */}
      const maxIndex = Math.floor(totalMovies3/ offset) -1 ; {/* 인덱스의 길이구하기 , Math.ceil은 올림, -1을 해주는 이유는 page가 0에서 시작하기 때문에 */}
      setIndex2((prev) => prev === maxIndex ? 0 : prev + 1); 
      setback2(true);
      }
    }

    console.log(Number(무비pathmatch?.params.movieId));
  return (
        <래퍼>
          {loading ? <로딩>Loading...</로딩> 
          :<>
          <배너 bgPhoto={makeImagePath(top_rateddata?.results[0]?.backdrop_path || "")}>
            <배너제목>{top_rateddata?.results[0]?.title}</배너제목>
            <배너개요>{top_rateddata?.results[0]?.overview.slice(0,150)+'...'}</배너개요>
            <BTN onClick={() => onDetail(top_rateddata?.results[0]?.id+'')}>자세히 보기</BTN>
          </배너>

          <Top슬라이더>
            <슬라이더제목>가장 인기 있는 영화</슬라이더제목>
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
              transition={{type:"tween", duration:0.5}}
              key={index}
            >
              {top_rateddata?.results.slice(2).slice(offset*index, offset*index+offset)
              .map((movie2) => (
                <Box
                layoutId={movie2.id+'1'}
                variants={boxVariants}
                key={movie2.id} 
                whileHover='hover'
                initial='normal'
                onClick={()=> onBoxClicked(movie2.id)}
                transition={{type:'tween'}}
                bgPhoto={makeImagePath(movie2.backdrop_path, 'w400'  || "")}
                >
                <Info variants={infoVariants}>
                <h4>{movie2.title}</h4>
                </Info>
                </Box>
              ))} 
            </Row>
            <이전버튼 onClick={Top이전버튼}><BsFillArrowLeftCircleFill/></이전버튼>
            <다음버튼 onClick={Top다음버튼}><BsFillArrowRightCircleFill/></다음버튼>
            </AnimatePresence>
          </Top슬라이더>

          <곧출시슬라이더>
            <슬라이더제목>곧 출시될 영화</슬라이더제목>
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
              transition={{type:"tween", duration:0.5}}
              key={index2}
            >
              {upcomingdata?.results.slice(2).slice(offset*index2, offset*index2+offset)
              .map((movie3) => (
                <Box
                layoutId={movie3.id+''}
                variants={boxVariants}
                key={movie3.id} 
                whileHover='hover'
                initial='normal'
                onClick={()=> onBoxClicked(movie3.id)}
                transition={{type:'tween'}}
                bgPhoto={makeImagePath(movie3.backdrop_path, 'w400'  || "")}
                >
                <Info variants={infoVariants}>
                <h4>{movie3.title}</h4>
                </Info>
                </Box>
              ))} 
            </Row>
            <이전버튼 onClick={곧출시이전버튼}><BsFillArrowLeftCircleFill/></이전버튼>
            <다음버튼 onClick={곧출시다음버튼}><BsFillArrowRightCircleFill/></다음버튼>
            </AnimatePresence>
          </곧출시슬라이더>


          <AnimatePresence>
            {무비pathmatch ? 
            <>
            <오버레이 onClick={onOverlayClick} animate={{opacity : 1}} exit={{opacity:0}}/>
            <빅무비 layoutId={CM1? 무비pathmatch.params.movieId+'1' : 무비pathmatch.params.movieId} style={{top:scrollY.get() + 70}}>

            {CM1 && 
            <>
            <빅커버 style={{backgroundImage:`url(${makeImagePath(CM1.backdrop_path, 'w400')})`}}/>
            <빅제목>{CM1.title}</빅제목>
            <빅장르>{CM1.genre_ids.map((g) => (
                장르api.map((v)=>(
                  v.id === g ? (
                    <div>{v.name}</div>
                  ): null
                )) 
              ))}
            </빅장르>
            <빅내용>{CM1.overview.slice(0,100)+'...'}</빅내용>
            <빅점수>{CM1.vote_average}<AiFillStar style={{fontSize:'20px'}}/></빅점수>
            <빅출시일>{CM1.release_date.slice(0,4)}</빅출시일>
            <빅플레이버튼><BsFillPlayCircleFill/></빅플레이버튼>
            </>}

            {CM2 && 
            <>
            <빅커버 style={{backgroundImage:`url(${makeImagePath(CM2.backdrop_path, 'w400')})`}}/>
            <빅제목>{CM2.title}</빅제목>
            <빅장르>{CM2.genre_ids.map((g) => (
                장르api.map((v)=>(
                  v.id === g ? (
                    <div>{v.name}</div> 
                  ): null
                )) 
              ))}
            </빅장르>
            <빅내용>{CM2.overview.slice(0,100)+'...'}</빅내용>
            <빅점수>{CM2.vote_average}<AiFillStar style={{fontSize:'20px'}}/></빅점수>
            <빅출시일>{CM2.release_date.slice(0,4)}</빅출시일>
            <빅플레이버튼><BsFillPlayCircleFill/></빅플레이버튼>
            </>}

            </빅무비>
            </>
              : null}
          </AnimatePresence>
          </> }
          </래퍼>
      );
}
export default Home;

{/* React-query 에러
react18과 react-query4 버전 충돌떄문에
1. package.json 에서 react-query 패키지 삭제
2. npm i @tanstack/react/query
3. import {} from '@tanstack/react-query';
이렇게 써줘야함 
변경 전 : react-query / 변경 후 : @tanstack/react-query
*/}

{/*themoviedb 사이트 api 설명
https://developers.themoviedb.org/3/getting-started/introduction
*/}

{/*React Router 5 => 6 변경점
  1. useHistory() => useNavigate()
  history.push('***') => navigate('***')
  
  2. useRouteMatch() => useMatch()
*/}

{/*bgPhoto가 타입스크립트에 정의되어있지 않아서 에러가뜸
  그럴땐 위로 올려서 box에 정의해주면 됌.*/}

{/* slice(1)을 하는 이유
메인페이지에 사용한 data[0]번의 영화를 제외하기위해서*/}

{/*initial={false}를 해주는 이유
새로고침을 하거나 다른 페이지에서 넘어올때
박스들이 오른쪽에서 슬라이딩하면서 넘어온다.
그래서 그걸 방지하기 위해 해줌.*/}

{/* useQuery([식별자이름,식별자이름],불러올 함수)
  fetch 해온 데이터를 가져와서 데이터가 있는지 , 아직 로딩중인지에 대한 알림을
  전해주는 함수이다.
*/}