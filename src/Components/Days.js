import styled from "styled-components";

{/* 요일 나타내는 css 감싸주는 wrapper */}
const DaysWrapper = styled.div`
display:flex;
justify-content:space-between;
width:880px;
margin-top:-20px;
`

{/* 요일 나타내는 css(일,월,화 ~~~) */}
const DaysDiv = styled.div`
    width:120px;
    height:30px;
    display:flex;
    justify-content:center;
    align-items:center;
    color:#808080;
`

const Days = () => {
    {/* 요일 렌더링 하기 위해 저장하는 배열 */}
    const days = [];
    {/* 요일 지정해주기 */} 
    const date = ['일','월','화','수','목','금','토'];
    
    {/* days 배열에 각각 요일 넣어주기 */}
    for (let i=0; i<7; i++){
        days.push(
            <DaysDiv>
                {date[i]}
            </DaysDiv>
        )
    }
    return(
    <>
        {/* 요일 렌더링 하기 */}
        <DaysWrapper>{days}</DaysWrapper>
    </>
) 
}

export default Days;