import './ViewCategory.css';
import {useEffect,useState} from 'react';
import axios from 'axios';
import{__categoryapiurl} from '../../API_URL';
import {Link} from 'react-router-dom';





function ViewCategory() {
  const [cDetails,setCdetails]=useState([]);

  useEffect(()=>{
    axios.get(__categoryapiurl +"fetch").then((response)=>{
      // console.log(response.data);
      setCdetails(response.data);
    }).catch((error)=>{
      console.log(error);
    })
  })

  return (
    <>
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 wow fadeInUp" data-wow-delay="0.1s">
            <div className="text-center mb-5">
              <h6 className="text-primary text-uppercase mb-3">
                <i className="fa fa-folder-open me-2"></i>Browse Categories
              </h6>
              <h2 className="display-6 fw-bold">Explore Tender Categories</h2>
              <p className="text-muted">Select a category to view available tenders and opportunities</p>
            </div>

            {/* Main Category Grid */}
            <div id="main" className="row g-4">
              {cDetails.length > 0 ? (
                cDetails.map((row) => (
                  <div className="col-md-4 col-lg-3" key={row._id}>
                    <Link to={`/viewscategory/${row.catnm}`} className="text-decoration-none">
                      <div className="card category-card shadow-sm border-0 rounded-3 h-100 hover-card">
                        <img 
                          src={`./assets/uploads/caticons/${row.caticonnm}`} 
                          className="card-img-top" 
                          alt={row.catnm} 
                          style={{height: "180px", objectFit: "cover"}}
                        />
                        <div className="card-body text-center">
                          <h5 className="card-title text-primary mb-0">{row.catnm}</h5>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <div className="alert alert-info text-center py-5">
                    <i className="fa fa-info-circle fa-3x mb-3"></i>
                    <h4>No Categories Available</h4>
                    <p className="mb-0">Categories will appear here once they are added by the administrator.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default ViewCategory;
