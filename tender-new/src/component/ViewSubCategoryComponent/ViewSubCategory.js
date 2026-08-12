import './ViewSubCategory.css';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { __subcategoryapiurl } from '../../API_URL';
import { Link, useParams } from 'react-router-dom';
function ViewSubCategory() {

  const params = useParams();
  // console.log(params);
  // console.log(params.Cname);
  const [scdetails, setScDetails] = useState([]);

  useEffect(() => {
    axios.get(__subcategoryapiurl + "fetch?catnm=" + params.Cname).then((response) => {
      setScDetails(response.data);
      // console.log(response.data)
    }).catch((error) => {
      console.log(error);
    })
  }, [])
  return (
    <>
      <div class="container-xxl py-5">
        <div class="container">
          <div class="row g-4">
            <div class="col-12 wow fadeInUp" data-wow-delay="0.1s">
              <h6 class="text-primary text-uppercase text-center mb-4">View Sub Categories</h6>

              {/*-- Main Category Grid -->*/}
              <div id="main" class="row">
                {
                  scdetails.map((row) => (
                    <div class="col-md-4 col-lg-3">
                      <Link to={`/viewproduct/${row.subcatnm}`}>
                        <div class="card category-card shadow-sm border-light rounded">
                          <img src={`../assets/uploads/subcaticons/${row.subcaticonnm}`} class="card-img-top" alt={row.subcaticonnm} style={{ "height": "180px", "object-fit": "cover" }} />
                          <div class="card-body text-center">
                            <h5 class="card-title text-primary">{row.subcatnm}</h5>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewSubCategory;

// {
//   scdetails.map((row) => (
//     <div className="items">
//       <Link to={`/viewp/`} >
//         <img src={`../assets/uploads/subcaticons/${row.subcaticonnm}`} height="80%" width="80%" />
//         <b>{row.subcatnm}</b>
//       </Link>
//     </div>
//   ))
// }