import { useNavigate, useSearchParams } from "react-router-dom";

const ReadMore = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const article = JSON.parse(localStorage.getItem("newsDetail"));

  const handleBack = () => {
    // go back with preserved query params
    navigate(`/?${searchParams.toString()}`);
  };

  return (
    <div className="container my-5">
      <button className="btn btn-secondary mb-4" onClick={handleBack}>
      ← Back
      </button>

      <h2 className="mb-4">{article?.title}</h2>
      <img
        src={article?.urlToImage || "https://via.placeholder.com/600x400"}
        alt="news"
        className="img-fluid mb-3 rounded"
      />
      <p><strong>Author:</strong> {article?.author || "Unknown"}</p>
      <p><strong>Published:</strong> {article?.publishedAt || "Unknown"}</p>
      <p>{article?.content || article?.description}</p>
      <a className="btn btn-primary mt-3" href={article?.url} target="_blank" rel="noopener noreferrer">
        Read Full Article
      </a>
    </div>
  );
};

export default ReadMore;
