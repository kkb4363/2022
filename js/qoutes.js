const quotes = [
{
    quote: '돌아오지 않는 시간을 위해 슬퍼하거나 후회하지 않았으면 좋겠습니다',
    author: '알레프',
},
{
    quote: '사랑은 그저 미친 짓이에요' ,
    author: '윌리엄 셰익스피어',
},
{
    quote: '당신이 행한 봉사에 대해서는 말을 아끼라 허나 당신이 받았던 호의들에 대해서는 이야기 하라',
    author: '세네카',
},
{
    quote: '삶은 공평하지 않다 다만 죽음보다는 공평 할 뿐이다.',
    author: '윌리엄 골드먼',
},
{
    quote: '인생이란 네가 다른 계획을 세우느라 바쁠때 너에게 일어나는 것이다.',
    author: '존 레논',
},
{
    quote: '늘 행복하고 지혜로운 사람이 되려면 자주 변해야 한다.',
    author: '공자',
},
{
    quote: '운명은 우연이 아닌 선택이다 기다리는 것이 아니라 성취하는 것이다',
    author: '윌리엄 제닝스 브라이언',
},
{
    quote: '친구를 고르는 데는 천천히 친구를 바꾸는 데는 더 천천히',
    author: '벤자민 프랭클린',
},
{
    quote: '인간의 감정은 누군가를 만날 때와 헤어질 때 가장 순수하며 가장 빛난다',
    author: '장 폴 리히터',
},
{
    quote: '시간은 우리를 변화시키지 않는다 시간은 단지 우리를 펼쳐 보일 뿐이다.',
    author: '막스 프리쉬',
},





]

const quote = document.querySelector('#quote span:first-child');
const author = document.querySelector('#quote span:last-child');

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;