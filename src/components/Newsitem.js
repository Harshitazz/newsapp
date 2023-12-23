import React from "react";

const Newsitem =(props)=> {
  
  
    let {title ,description,imageurl,newsurl,author,publishedAt,source}=props;
    return (
      <div className="my-3" style={{Height:"30rem"}}>
        <span className="badge rounded-pill text-bg-info">{source}</span>

        <div className="card h-100" style={{width : "20rem"}}>
          <img src={imageurl?imageurl:"https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}...
            </p>
            <p className="card-text"><small className=" text-danger ">By-{author?author:"annonymous"} on {new Date(publishedAt).toGMTString()}</small></p>
            <a href={newsurl} target="_blank" rel="noreferrer" className="btn btn-sm  btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
  export default Newsitem
//https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg