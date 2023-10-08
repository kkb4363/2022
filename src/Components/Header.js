import styled from 'styled-components';
import {AiTwotoneCalendar} from "react-icons/ai";
import {format} from 'date-fns';
import {AiOutlineLeft,AiOutlineRight} from "react-icons/ai";

{/* 지난 달, 다음 달 화살표 CSS */}
const ArrowStyle = {color:'#696969', fontSize:'22px', marginTop:'25px'};

const Header = ({currentMonth, prevMonth, nextMonth}) =>{
  
    return(
        <>
        <div className='nav'>
            <span><AiTwotoneCalendar/>캘린더 보기</span>
        </div>
        <div className='hr'>
        <div/>
        <div/>
        </div>
        <h2 style={{
                color:'#A9A9A9' ,
                marginBottom:'-7px',
                marginTop:'15px',
                opacity:0.5
            }}>
            제목 없음
        </h2>
        <div className='main'>
            <h5 style={{color:'white', fontSize:'16px', marginRight:'700px'}}>
                {format(currentMonth, 'yyyy')}년 {format(currentMonth, 'M')}월 
                {/* format 형식 = y는 연도, m은 월, d는 일을 나타냄. */}
            </h5>

            <div>
            {/* 저번달로 가는 화살표 */}
            <AiOutlineLeft onClick={prevMonth} style={ArrowStyle}/>
            <h5 style={{color:'white',fontSize:'15px'}}> 
            오늘 
            </h5>
            {/* 다음달로 가는 화살표 */}
            <AiOutlineRight onClick={nextMonth} style={ArrowStyle}/>
            </div>
            
        
        </div>
        </>
    )
}

export default Header;