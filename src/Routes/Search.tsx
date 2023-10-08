import { PathMatch, useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import {motion, AnimatePresence,useScroll} from 'framer-motion';
import { makeImagePath } from "../utils";
import { BsFillPlayCircleFill} from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { getMovieSearch, IGetSearch } from "../api";

const 래퍼 = styled.div`
background:black;
`
const 검색결과들 = styled.div`
position:relative;
top:150px;
`
const 제목 = styled.div`
left:30px;
position:absolute;
font-size:35px;
width:400px;
height:200px;
top:-50px;
font-weight:400;
`
const 행 = styled(motion.div)`
display:grid;
gap:5px;
grid-template-columns:repeat(5,1fr);
margin-bottom:5px;
position:absolute;
width:100%;
`
const 결과 = styled(motion.div)<{bgPhoto:string}>` 
background-color:gray;
opacity:0.5;
height:200px;
display:flex;
justify-content:center;
align-items:center;
background-image:url(${props => props.bgPhoto});
background-size:cover;
background-position:center center;
font-size:45px;
position:relative;
cursor:pointer;
`
const 박스함수 = {
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
  const 정보 = styled(motion.div)`
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
const 인포함수 = {
    hover: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duaration: 0.1,
        type: "tween",
      },
    },
  };
  
  const 오버레이 = styled(motion.div)`
  position:absolute;
  top:0;
  width:100%;
  height:200%;
  background-color:rgba(0,0,0,0.5);
  opacity:0;
  `
  const 결과클릭 = styled(motion.div)`
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
  const 클릭커버 = styled.div`
  width:100%;
  height:70%;
  background-size:cover;
  background-position:center center;
  `
  const 클릭제목 = styled.h3`
  color:${props => props.theme.white.lighter};
  font-size:40px;
  position:relative;
  display:flex;
  justify-content:center;
  align-items:center;
  top:-250px;
  padding:20px;
  `
  const 클릭내용 = styled.p`
  padding:20px;
  margin-top:-100px;
  color:${props => props.theme.white.lighter};
  `
  const 클릭점수 = styled.div`
  position:absolute;
  bottom:10px;
  padding:20px;
  color:${props=>props.theme.white.lighter};
  font-size:30px;
  `
  const 클릭출시일 = styled.p`
  padding:20px;
  position:absolute;
  right:0px;
  bottom:10px;
  font-size:30px;
  color:${props=>props.theme.white.lighter};
  `
  const 클릭버튼 = styled.div`
  position:absolute;
  padding:20px;
  bottom:0px;
  margin-left:300px;
  font-size:40px;
  border-radius:5px;
  cursor:pointer;
  color:${props=>props.theme.white.lighter};
  `
function Search(){
  const location = useLocation(),navigate = useNavigate(),{scrollY} = useScroll(),keyword = new URLSearchParams(location.search).get('query');  
  const {data:movie} = useQuery<IGetSearch>(
    ['movie',keyword], 
    () =>getMovieSearch(keyword+''));
  const onOverlayClick = () => navigate(`/search?query=${keyword}`),onBoxClicked = (SearchId:String) => {navigate(`/search/${SearchId}?query=${keyword}`);};
  const SearchPathMatch:PathMatch<string>|null = useMatch(`/search/:SearchId`); 
  const clickedMovie = SearchPathMatch?.params.SearchId && movie?.results.find(mov => mov.id+'' === SearchPathMatch.params.SearchId);
  return (
      <래퍼>
        <검색결과들>
          <제목>{keyword} 검색 결과</제목>
            <AnimatePresence>
              <행>
                {movie?.results.map((movies) => (
                  <결과
                  layoutId={movies.id+''}
                  variants={박스함수}
                  key={movies.id}
                  whileHover='hover'
                  initial='normal'
                  onClick={()=> onBoxClicked(movies.id+'')}
                  transition={{type:'tween'}}
                  bgPhoto={makeImagePath(movies.backdrop_path, 'w400' || "")}
                  >
                  {movies.backdrop_path === null ? 'No Image' : null}
                  <정보 variants={인포함수}>
                  <h4>{movies.title}</h4>
                  </정보>
                  </결과>
                ))}
              </행>
            </AnimatePresence>
        </검색결과들>
        <AnimatePresence>
          {SearchPathMatch ?
            <>
            <오버레이 onClick={onOverlayClick} animate={{opacity:1}} exit={{opacity:0}}/>
            <결과클릭 layoutId={SearchPathMatch.params.SearchId} style={{top:scrollY.get()+70}}>
            {clickedMovie &&
            <>
            <클릭커버 style={{backgroundImage:`url(${makeImagePath(clickedMovie.backdrop_path, 'w400')})`}}/>
            <클릭버튼><BsFillPlayCircleFill/></클릭버튼>
            <클릭제목>{clickedMovie.title}</클릭제목>
            <클릭출시일>{clickedMovie.release_date.slice(0,4)}</클릭출시일>
            <클릭점수>{clickedMovie.vote_average}<AiFillStar style={{fontSize:'20px'}}/></클릭점수>
            <클릭내용>{clickedMovie.overview.slice(0,100)+'...'}</클릭내용>
            </>}
            </결과클릭>
            </>:null}
          </AnimatePresence>
      </래퍼>
    )
}
export default Search;

// 어려웠던 점 
// 1. /search/:id 인데 query를 어디에 추가해야할지 몰라서 해맴
// 해결법 : /search/id&query=~~ 이런식으로 query를 뒤에 쓰면 된다.
