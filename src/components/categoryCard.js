import React from 'react';
import { navigate } from 'gatsby';

const CategoryCard = ({title, category, image}) => {
  
    return(
        <div className="categorycard__wrap" onClick={()=> navigate(`/categories/${category}`)}>
            <div className="categorycard__title">
                 <p>{title}</p>
             </div>
             <div className="categorycard__img">
                 <img src={image} alt = {title}/>
             </div>
        </div>
   
    )
}

export default CategoryCard