const API_key = 'ee2b554c684decc5956050b54028d794';
const API_MAIN = `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?`;

export function Getmovie(){
    return fetch(`${API_MAIN}key=${API_key}&targetDt=20220101`)
    .then((Response) => Response.json());
}

export function GetMovie2(){
    return fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year`)
    .then((response) => response.json())
}