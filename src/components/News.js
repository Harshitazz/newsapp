import React,{useEffect,useState} from "react";

import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
  const [articles,setArticles]=useState([])
  const [loading,setLoading]=useState(true)
  const [page,setPage]=useState(1)
  const [totalResults,settotalResults]=useState(0)

 // document.title = `${ capitalizeFirstLetter(props.category)} - NewsMonkey`;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


  const updateNews=async() =>{
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d093053d72bc40248998159804e0e67d&page=${  page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData)
    setArticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setLoading(false)
  }
  useEffect(()=>{
     updateNews();
  },[])


  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=dbe57b028aeb41e285a226a94865f7a7&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)

    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    setArticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
   
};



    return (
      <>
        <h2 className="text-center" style={{ margin: "10px" }}>
          Newsaddict - Latest Top { capitalizeFirstLetter(props.category)} Headlines
        </h2>
        {  loading && <Spinner />}
        
        <InfiniteScroll
          dataLength={  articles.length}
          next={ fetchMoreData}
          hasMore={  articles.length !==   totalResults}
          loader={<Spinner/>}
        >
          
          <div className="container" >
            <div className="row mx-4 my-4">
              {  articles.map((element) => {
                return (
                  
                  <div className="col md-4 "key={element.url} >
                    <Newsitem
                      title={element.title}
                      description={
                        element.description
                          ? element.description.slice(0, 80)
                          : ""
                      }
                      imageurl={element.urlToImage}
                      newsurl={element.url}
                      author={element.author}
                      
                      publishedAt={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        
      </>
    );
  
}
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

//cc12a3044b774e53972670f6729a7168
/*     setState((prevState) => ({
      page: prev page + 1
    }));

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=dbe57b028aeb41e285a226a94865f7a7&page=${  page}&pageSize=${props.pageSize}`;
     setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
     setState({
        articles:   articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults
    }) */
    export default News