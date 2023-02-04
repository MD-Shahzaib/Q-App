import './company.css'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { doc, setDoc, collection, query, where, onSnapshot, updateDoc } from 'firebase/firestore'
import { auth, db } from '../Config/Firebase'

function Company() {

  // States-of-Company-Details.
  const [companyName, setCompanyName] = useState('')
  const [companySince, setCompanySince] = useState('')
  const [openTime, setOpenTime] = useState('')
  const [closeTime, setCloseTime] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [allToken, setAllToken] = useState(0)
  const [tokenTime, setTokenTime] = useState(0)
  const [tokenSold, setTokenSold] = useState(0)
  const [tokenUsed, setTokenUsed] = useState(0)
  // state-for-updateToken.
  const [updateTokenId, setUpdateTokenId] = useState('')
  // state-for-current-user-data.
  const [data, setData] = useState([]);

  // ________________________________________________________________________.

  // get-Current-User-Company.
  useEffect(() => {
    const q = query(collection(db, "Company"), where(`userId`, "==", `${auth.currentUser.uid}`));
    const companies = onSnapshot(q, (snapshot) => {
      setData([]);
      snapshot.docs.forEach((doc) => {
        setData((prev) => [...prev, { id: doc.id, data: doc.data() }]);
      });
    });
    return () => {
      companies();
    };
  }, []);

  // Get-Company-Detail-function.
  const getDetail = async () => {
    if (companyName !== '' && companySince !== '' && openTime !== '' && closeTime !== '' && companyAddress !== '' && allToken !== '' && tokenTime !== '') {
      // Add-Company-detail-In-Firestore.
      const userId = auth.currentUser.uid;
      const companyId = `${auth.currentUser.uid}${Date.now()}`;
      const docRef = await setDoc(doc(db, "Company", companyId), {
        companyName, companySince, openTime, closeTime, companyAddress, allToken, tokenTime,
        tokenSold, tokenUsed, userId
      });
      // console for debugging.
      console.log('docRef==', docRef, ' companyName==', companyName, ' companySince==', companySince, ' openTime==', openTime, ' closeTime==', closeTime, ' companyAddress==', companyAddress, ' allToken==', allToken, ' tokenTime==', tokenTime, ' tokenUsed==', tokenUsed, ' tokenSold==', tokenSold)
    }
    else {
      alert('Please fill all feilds!');
    }
  }

  /* Updation-of-Token-into-to-functions-start.*/
  // 1-setUpdateTokenId-to-updateTokenFirebase. 
  const setToken = (item_id) => {
    setUpdateTokenId(item_id)
  }
  // 2-updateTokenFirebase-to-update-firebase. 
  const updateTokenFirebase = () => {
    const tokensUpdate = { updateTokenId, allToken, tokenTime }
    updateDoc(doc(db, "Company", updateTokenId), tokensUpdate)
    console.log('update successfully--- ', 'updateTokenId =>', updateTokenId, ' allToken =>', allToken, ' tokenTime =>', tokenTime);
  }
  /* Updation-of-Token-into-to-functions-end.*/

  // _________________________________________________________________________.

  return (
    <>
      <div className="company-box">

        {/* // Navbar . */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand fs-3 fw-bold" to="/">Q-APP</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
              {/* // Button trigger modal . */}
              <button className="size-1 btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailModal"><span className="mx-2"><img src={require('../../images/plus-icon.png')} alt="plus-icon" className="size-2" /></span><span className="mx-2 fw-bold">CREATE COMPANY</span></button>
            </div>
          </div>
        </nav>

        {/* // Modal . */}
        <div className="modal fade bg-dark" id="detailModal" tabIndex="-1" aria-labelledby="detailModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="detailModalLabel">Company Details</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                <div className="row mb-3">
                  <label htmlFor="inp-1" className="col-sm-2 col-form-label">Name</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="inp-1" placeholder='Enter Company Name' onChange={(e) => { setCompanyName(e.target.value) }} />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="inp-2" className="col-sm-2 col-form-label">Since</label>
                  <div className="col-sm-10">
                    <input type="date" className="form-control" id="inp-2" placeholder='Company Since' onChange={(e) => { setCompanySince(e.target.value) }} />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="inp-3" className="col-sm-2 col-form-label">Opening</label>
                  <div className="col-sm-10">
                    <input type="time" className="form-control" id="inp-3" placeholder='Enter Certificates (Max 3 Images)' onChange={(e) => { setOpenTime(e.target.value) }} />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="inp-4" className="col-sm-2 col-form-label">Closing</label>
                  <div className="col-sm-10">
                    <input type="time" className="form-control" id="inp-4" placeholder='Enter Company Timings' onChange={(e) => { setCloseTime(e.target.value) }} />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="inp-5" className="col-sm-2 col-form-label">Address</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="inp-5" placeholder='Enter Company Address' onChange={(e) => { setCompanyAddress(e.target.value) }} />
                  </div>
                </div>

                <div className="border border-secondary rounded py-2 px-2">
                  <span className="fs-5 fw-5 px-2 border-secondary border-bottom">Add Tokens</span>
                  <input type="number" className="form-control my-2" id="inp-6" placeholder='No of Tokens' onChange={(e) => { setAllToken(e.target.value) }} />
                  <input type="number" className="form-control my-2" id="inp-7" placeholder='Per Token Time' onChange={(e) => { setTokenTime(e.target.value) }} />
                </div>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={getDetail}>Save changes</button>
              </div>
            </div>
          </div>
        </div>

        {/* // Main-Container . */}
        <div className="all-flex py-4 px-4">
          {data.map((item, key) => {
            return (
              <div key={key} className="card px-2 py-2 mx-2 my-2">
                <div className="card-body flexbtw border-bottom">
                  <span className="fs-3">Company : <b>{item.data.companyName}</b></span>
                  <div className="size-1">
                    {/* ---------------------- Token updation ----------------------------------- */}
                    {/* Update Token Button trigger modal  */}
                    <button type="button" className="fs-5 btn btn-primary mx-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setToken(item.id) }}>Update Token</button>
                    {/* Modal  */}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Tokens</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                            <input type="number" className="form-control my-2" placeholder='No of Tokens' onChange={(e) => { setAllToken(e.target.value) }} />
                            <input type="number" className="form-control my-2" placeholder='Per Token Time' onChange={(e) => { setTokenTime(e.target.value) }} />
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={updateTokenFirebase}>UPDATE</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ---------------------- Token updation ----------------------------------- */}
                    <button className="fs-5 btn btn-danger mx-1">Delete Company</button>
                  </div>
                </div>
                <div className="card-body flexbtw ">
                  <span className="fs-5">All Tokens : <b>{item.data.allToken}</b></span>
                  <span className="fs-5">Per Token Time : <b>{item.data.tokenTime} minutes</b></span>
                  <span className="fs-5">Tokens Sold : <b>{item.data.tokenSold}</b></span>
                  <span className="fs-5">Tokens Used : <b>{item.data.tokenUsed}</b></span>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </>
  )
}

export default Company;