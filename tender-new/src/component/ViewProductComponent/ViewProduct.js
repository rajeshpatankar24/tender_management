// import './ViewProduct.css';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { __productapiurl } from '../../API_URL';
import { Link, useParams } from 'react-router-dom';



function ViewProduct() {
  const params = useParams();
  const [pdetails, setPDetails] = useState([]);

  useEffect(() => {
    axios.get(__productapiurl + "fetch?subcatnm=" + params.subcatnm).then((response) => {
      const fetchProductDetails = response.data;
      var p = fetchProductDetails.map(product => {
        const initialtime = new Date(product.info);
        //console.log(initialtime); 
        const timedifference = (new Date() - initialtime) / (1000 * 60 * 60);
        //console.log(timedifference); 
        return {
          ...product,
          timedifference: timedifference
        }
      });
      setPDetails(p);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <>
      <div class="container-xxl py-5">
        <div class="container">
          <div class="row g-5">
            <div class="col-lg-12 wow fadeInUp" data-wow-delay="0.1s">
              <h4 class="text-primary">Product List &gt;&gt; {params.subcatnm} </h4>
              {
                pdetails.map((row) => (
                  <center>
                    <table id="ptable" class="table table-bordered">
                      <tr>
                        <td rowspan="3" class="text-center">
                          <img src={`../assets/uploads/picons/${row.piconnm}`} height="100" width="150" />
                        </td>
                        <td><b>Title : {row.title}</b></td>
                      </tr>
                      <tr>
                        <td><b>Description : {row.description}</b></td>
                      </tr>
                      <tr>
                        <td>
                          <b>Base price : &#8377;{row.baseprice}</b>
                          <br />

                          {row.timedifference > 48 ? <button class="btn btn-danger">Bid Closed</button> :
                            <Link to={`/bidproduct/${row._id}`} ><button>Bid Open</button></Link>}
                        </td>
                      </tr>
                    </table>
                    <br /><br />
                  </center>

                ))
              }
            </div>

          </div>
        </div>
      </div>
    </>

  );
}

export default ViewProduct;
