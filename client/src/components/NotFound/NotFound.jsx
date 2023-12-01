import React from "react";
import styles from './NotFound.module.css'
import error from '../assets/images/404.svg'
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>

      <div>
        <div className="back-to-home rounded d-none d-sm-block">
          <a href className="back-button btn btn-icon btn-primary"><i data-feather="arrow-left" className="icons" /></a>
        </div>
        {/* ERROR PAGE */}
        <section className="bg-home d-flex align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-12 text-center">
                <img src={error} className="img-fluid" alt />
                <div className="text-uppercase mt-4 display-3">Oh ! no</div>
                <div className="text-capitalize text-dark mb-4 error-page">Page Not Found</div>
                <p className="text-muted para-desc mx-auto">Start working with <span className="text-primary fw-bold">FitWay</span> that can provide everything you need to increase tolerance, drive stamina, gain muscles.</p>
              </div>{/*end col*/}
            </div>{/*end row*/}
            <div className="row">
              <div className="col-md-12 text-center">
                <Link to={""} className="btn btn-primary mt-4 ms-2">FitWay Home</Link>
              </div>{/*end col*/}
            </div>{/*end row*/}
          </div>{/*end container*/}
        </section>{/*end section*/}
        {/* ERROR PAGE */}
        {/* Switcher Start */}
        <a href="javascript:void(0)" className="card switcher-btn shadow-md text-primary z-index-1 d-md-inline-flex d-none" data-bs-toggle="offcanvas" data-bs-target="#switcher-sidebar">
          <i className="mdi mdi-cog mdi-24px mdi-spin align-middle" />
        </a>
        <div className="offcanvas offcanvas-start shadow border-0" tabIndex={-1} id="switcher-sidebar" aria-labelledby="offcanvasLeftLabel">
          <div className="offcanvas-header p-4 border-bottom">
            <h5 id="offcanvasLeftLabel" className="mb-0">
              <img src="assets/images/logo-dark.png" height={24} className="light-version" alt />
              <img src="assets/images/logo-light.png" height={24} className="dark-version" alt />
            </h5>
            <button type="button" className="btn-close d-flex align-items-center text-dark" data-bs-dismiss="offcanvas" aria-label="Close"><i className="uil uil-times fs-4" /></button>
          </div>
          <div className="offcanvas-body p-4 pb-0">
            <div className="row">
              <div className="col-12">
                <div className="text-center">
                  <h6 className="fw-bold">Select your color</h6>
                  <ul className="pattern mb-0 mt-3">
                    <li>
                      <a className="color-list rounded color1" href="javascript: void(0);" data-bs-toggle="tooltip" data-bs-placement="top" title="Primary" onclick="setColorPrimary()" />
                    </li>
                    <li>
                      <a className="color-list rounded color2" href="javascript: void(0);" data-bs-toggle="tooltip" data-bs-placement="top" title="Green" onclick="setColor('green')" />
                    </li>
                    <li>
                      <a className="color-list rounded color3" href="javascript: void(0);" data-bs-toggle="tooltip" data-bs-placement="top" title="Yellow" onclick="setColor('yellow')" />
                    </li>
                  </ul>
                </div>
                <div className="offcanvas-body p-4 pb-0">
                  <div className="row">
                    <div className="col-12">
                      <div className="text-center">
                        <h6 className="fw-bold">Select your color</h6>
                        <ul className="pattern mb-0 mt-3">
                          <li>
                            <a className="color-list rounded color1" href="javascript: void(0);" data-bs-toggle="tooltip" data-bs-placement="top" title="Primary" onclick="setColorPrimary()" />
                          </li>
                          <li>
                            <a className="color-list rounded color2" href="javascript: void(0);" data-bs-toggle="tooltip" data-bs-placement="top" title="Green" onclick="setColor('green')" />
                          </li>
                          <li>
                            <a className="color-list rounded color3" href="javascript: void(0);" data-bs-toggle="tooltip" data-bs-placement="top" title="Yellow" onclick="setColor('yellow')" />
                          </li>
                        </ul>
                      </div>
                      <div className="text-center mt-4 pt-4 border-top">
                        <h6 className="fw-bold">Theme Options</h6>
                        <ul className="text-center style-switcher list-unstyled mt-4">
                          <li className="d-grid"><a href="javascript:void(0)" className="rtl-version t-rtl-light" onclick="setTheme('style-rtl')"><img src="assets/images/demos/rtl.png" className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: 240 }} alt /><span className="text-dark fw-medium mt-3 d-block">RTL Version</span></a></li>
                          <li className="d-grid"><a href="javascript:void(0)" className="ltr-version t-ltr-light" onclick="setTheme('style')"><img src="assets/images/demos/ltr.png" className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: 240 }} alt /><span className="text-dark fw-medium mt-3 d-block">LTR Version</span></a></li>
                          <li className="d-grid"><a href="javascript:void(0)" className="dark-rtl-version t-rtl-dark" onclick="setTheme('style-dark-rtl')"><img src="assets/images/demos/dark-rtl.png" className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: 240 }} alt /><span className="text-dark fw-medium mt-3 d-block">RTL Version</span></a></li>
                          <li className="d-grid"><a href="javascript:void(0)" className="dark-ltr-version t-ltr-dark" onclick="setTheme('style-dark')"><img src="assets/images/demos/dark.png" className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: 240 }} alt /><span className="text-dark fw-medium mt-3 d-block">LTR Version</span></a></li>
                          <li className="d-grid"><a href="javascript:void(0)" className="dark-version t-dark mt-4" onclick="setTheme('style-dark')"><img src="assets/images/demos/dark.png" className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: 240 }} alt /><span className="text-dark fw-medium mt-3 d-block">Dark Version</span></a></li>
                          <li className="d-grid"><a href="javascript:void(0)" className="light-version t-light mt-4" onclick="setTheme('style')"><img src="assets/images/demos/ltr.png" className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: 240 }} alt /><span className="text-dark fw-medium mt-3 d-block">Light Version</span></a></li>
                          <li className="d-grid"><a href="../../dashboard/dist/index.html" target="_blank" className="mt-4"><img src="assets/images/demos/admin.png" className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: 240 }} alt /><span className="text-dark fw-medium mt-3 d-block">Admin Dashboard</span></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="offcanvas-footer p-4 border-top text-center">
                  <ul className="list-unstyled social-icon social mb-0">
                    <li className="list-inline-item mb-0"><a href="https://1.envato.market/FitWayrick" target="_blank" className="rounded"><i className="uil uil-shopping-cart align-middle" title="Buy Now" /></a></li>
                    <li className="list-inline-item mb-0"><a href="https://dribbble.com/shreethemes" target="_blank" className="rounded"><i className="uil uil-dribbble align-middle" title="dribbble" /></a></li>
                    <li className="list-inline-item mb-0"><a href="https://www.behance.net/shreethemes" target="_blank" className="rounded"><i className="uil uil-behance align-middle" title="behance" /></a></li>
                    <li className="list-inline-item mb-0"><a href="https://www.facebook.com/shreethemes" target="_blank" className="rounded"><i className="uil uil-facebook-f align-middle" title="facebook" /></a></li>
                    <li className="list-inline-item mb-0"><a href="https://www.instagram.com/shreethemes/" target="_blank" className="rounded"><i className="uil uil-instagram align-middle" title="instagram" /></a></li>
                    <li className="list-inline-item mb-0"><a href="https://twitter.com/shreethemes" target="_blank" className="rounded"><i className="uil uil-twitter align-middle" title="twitter" /></a></li>
                    <li className="list-inline-item mb-0"><a href="mailto:support@shreethemes.in" className="rounded"><i className="uil uil-envelope align-middle" title="email" /></a></li>
                    <li className="list-inline-item mb-0"><a href="https://shreethemes.in" target="_blank" className="rounded"><i className="uil uil-globe align-middle" title="website" /></a></li>
                  </ul>
                </div>
              </div>
              {/* Switcher End */}
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
