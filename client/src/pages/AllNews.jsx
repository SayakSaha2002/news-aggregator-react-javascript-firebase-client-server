import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const AllNews = () => {
  const [articles, setArticles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const pageSize = 25;
  const maxResults = 100; // News API max results limit
  const maxPages = Math.ceil(maxResults / pageSize); // 100 / 25 = 4

  const query = searchParams.get("q") || "everything";
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const fetchNews = async () => {
    const fromDate = "2025-04-05";
    const url = `http://localhost:5000/api/news?q=${query}&from=${fromDate}&page=${currentPage}`;
  
    try {
      const res = await fetch(url);
      const data = await res.json();
  
      if (data.status === "ok") {
        setArticles(data.articles);
        const calculatedPages = Math.ceil(data.totalResults / pageSize);
        setTotalPages(Math.min(calculatedPages, maxPages));
      } else {
        console.error("API Error:", data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  

  useEffect(() => {
    fetchNews();
  }, [query, currentPage]);

  const changePage = (newPage) => {
    setSearchParams({ q: query, page: newPage });
  };

  const slugify = (text) => {
    return text?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  const handleReadMore = (article) => {
  const slug = slugify(article.title, { lower: true, strict: true });
  const query = searchParams.toString(); // q=sports&page=4
  localStorage.setItem("newsDetail", JSON.stringify(article));
  navigate(`/readMore/${slug}?${query}`);
  };

  return (
    <div className="container my-4">
      <div className="row content">
        {articles.length === 0 ? (
          <p className="text-center">No results found.</p>
        ) : (
          articles.map((article, idx) => (
            <div className="col-md-4 mb-4" key={idx}>
              <div className="card h-100">
                <img
                  height={200}
                  src={article.urlToImage || "https://via.placeholder.com/150"}
                  className="card-img-top rounded"
                  alt="news"
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.description}</p>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => handleReadMore(article)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <div className="btn-group btn-group-lg">
          <button
            className="btn btn-outline-primary"
            onClick={() => currentPage > 1 && changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt; Prev
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => currentPage < totalPages && changePage(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllNews;
