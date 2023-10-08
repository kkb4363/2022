import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/app.css';

function Detail() {
  const { id } = useParams();
  const [details, setdetails] = useState([]);
  useEffect(() => {
    fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      .then((Response) => Response.json())
      .then((json) => {
        setdetails(json.data.movie);
      });
  }, []);

  return (
    <div className="detail">
      <div className="detail_image">
        <img src={details.medium_cover_image} alt={details.title} />
      </div>
      <div className="detail_text">
        <a className="text" href={details.url}>
          <h1>{details.title} 보러가기</h1>
        </a>
        <p>{details.description_full}</p>
        <h3>평점 : {details.rating}</h3>
      </div>
    </div>
  );
}
export default Detail;
