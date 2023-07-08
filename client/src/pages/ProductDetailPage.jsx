/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import Layout from "../components/Layout/Layout";

const ProductDetailPage = () => {
  const [counter, setCounter] = useState(1);

  const handleCounter = (e) => {
    if (e.target.classList.contains("input-counter__minus")) {
      counter !== 1 && setCounter(counter - 1);
    } else {
      setCounter(counter + 1);
    }
  };

  return (
    <>
      <Layout title={"Product-Detail"}>
        <div>
          <div className="u-s-p-t-90">
            <div className="container">
              <div className="row">
                <div className="col-lg-5">
                  <div className="pd-breadcrumb u-s-m-b-30">
                    <ul className="pd-breadcrumb__list">
                      <li className="has-separator">
                        <a href="index.hml">Home</a>
                      </li>
                      <li className="has-separator">
                        <a href="shop-side-version-2.html">Electronics</a>
                      </li>
                      <li className="has-separator">
                        <a href="shop-side-version-2.html">DSLR Cameras</a>
                      </li>
                      <li className="is-marked">
                        <a href="shop-side-version-2.html">Nikon Cameras</a>
                      </li>
                    </ul>
                  </div>
                  <div className="pd u-s-m-b-30">
                    <div className="slider-fouc pd-wrap">
                      <div id="pd-o-initiate">
                        <div
                          className="pd-o-img-wrap"
                          data-src="images/product/product-d-1.jpg"
                        >
                          <img
                            className="u-img-fluid"
                            src="images/product/product-d-1.jpg"
                            data-zoom-image="images/product/product-d-1.jpg"
                            alt
                          />
                        </div>
                      </div>
                      <span className="pd-text">Click for larger zoom</span>
                    </div>
                    <div className="u-s-m-t-15">
                      <div className="slider-fouc">
                        <div id="pd-o-thumbnail">
                          <div>
                            <img
                              className="u-img-fluid"
                              src="images/product/product-d-1.jpg"
                              alt
                            />
                          </div>
                          <div>
                            <img
                              className="u-img-fluid"
                              src="images/product/product-d-2.jpg"
                              alt
                            />
                          </div>
                          <div>
                            <img
                              className="u-img-fluid"
                              src="images/product/product-d-3.jpg"
                              alt
                            />
                          </div>
                          <div>
                            <img
                              className="u-img-fluid"
                              src="images/product/product-d-4.jpg"
                              alt
                            />
                          </div>
                          <div>
                            <img
                              className="u-img-fluid"
                              src="images/product/product-d-5.jpg"
                              alt
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="pd-detail">
                    <div>
                      <span className="pd-detail__name">
                        Nikon Camera 4k Lens Zoom Pro
                      </span>
                    </div>
                    <div>
                      <div className="pd-detail__inline">
                        <span className="pd-detail__price">$6.99</span>
                        <span className="pd-detail__discount">(76% OFF)</span>
                        <del className="pd-detail__del">$28.97</del>
                      </div>
                    </div>
                    <div className="u-s-m-b-15">
                      <div className="pd-detail__rating gl-rating-style">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star-half-alt" />
                        <span className="pd-detail__review u-s-m-l-4">
                          <a data-click-scroll="#view-review">23 Reviews</a>
                        </span>
                      </div>
                    </div>
                    <div className="u-s-m-b-15">
                      <div className="pd-detail__inline">
                        <span className="pd-detail__stock">200 in stock</span>
                        <span className="pd-detail__left">Only 2 left</span>
                      </div>
                    </div>
                    <div className="u-s-m-b-15">
                      <span className="pd-detail__preview-desc">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </span>
                    </div>
                    <div className="u-s-m-b-15" />
                    <div className="u-s-m-b-15">
                      <form className="pd-detail__form">
                        <div className="pd-detail-inline-2">
                          <div className="u-s-m-b-15">
                            <div className="input-counter">
                              <span
                                className="input-counter__minus fas fa-minus"
                                onClick={handleCounter}
                              />
                              <input
                                className="input-counter__text input-counter--text-primary-style"
                                type="text"
                                defaultValue={1}
                                value={counter}
                                data-min={1}
                                data-max={1000}
                              />
                              <span
                                className="input-counter__plus fas fa-plus"
                                onClick={handleCounter}
                              />
                            </div>
                          </div>
                          <div className="u-s-m-b-15">
                            <button
                              className="btn btn--e-brand-b-2"
                              type="submit"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="u-s-p-y-90">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="pd-tab">
                    <div className="u-s-m-b-30">
                      <ul className="nav pd-tab__list">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            data-toggle="tab"
                            href="#pd-desc"
                          >
                            DESCRIPTION
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="view-review"
                            data-toggle="tab"
                            href="#pd-rev"
                          >
                            REVIEWS
                            <span>(23)</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="tab-content">
                      <div className="tab-pane fade show active" id="pd-desc">
                        <div className="pd-tab__desc">
                          <div className="u-s-m-b-15">
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book. It has survived not only five centuries, but
                              also the leap into electronic typesetting,
                              remaining essentially unchanged. It was
                              popularised in the 1960s with the release of
                              Letraset sheets containing Lorem Ipsum passages,
                              and more recently with desktop publishing software
                              like Aldus PageMaker including versions of Lorem
                              Ipsum.
                            </p>
                          </div>
                        </div>
                      </div>
                      &lt;
                      <div className="tab-pane" id="pd-tag">
                        <div className="pd-tab__tag">
                          <h2 className="u-s-m-b-15">ADD YOUR TAGS</h2>
                          <div className="u-s-m-b-15">
                            <form>
                              <input
                                className="input-text input-text--primary-style"
                                type="text"
                              />
                              <button
                                className="btn btn--e-brand-b-2"
                                type="submit"
                              >
                                ADD TAGS
                              </button>
                            </form>
                          </div>
                          <span className="gl-text">
                            Use spaces to separate tags. Use single quotes (')
                            for phrases.
                          </span>
                        </div>
                      </div>
                      <div className="tab-pane" id="pd-rev">
                        <div className="pd-tab__rev">
                          <div className="u-s-m-b-30">
                            <div className="pd-tab__rev-score">
                              <div className="u-s-m-b-8">
                                <h2>23 Reviews - 4.6 (Overall)</h2>
                              </div>
                              <div className="gl-rating-style-2 u-s-m-b-8">
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star-half-alt" />
                              </div>
                              <div className="u-s-m-b-8">
                                <h4>We want to hear from you!</h4>
                              </div>
                              <span className="gl-text">
                                Tell us what you think about this item
                              </span>
                            </div>
                          </div>
                          <div className="u-s-m-b-30">
                            <form className="pd-tab__rev-f1">
                              <div className="rev-f1__group">
                                <div className="u-s-m-b-15">
                                  <h2>
                                    23 Review(s) for Man Ruched Floral Applique
                                    Tee
                                  </h2>
                                </div>
                                <div className="u-s-m-b-15">
                                  <label htmlFor="sort-review" />
                                  <select
                                    className="select-box select-box--primary-style"
                                    id="sort-review"
                                  >
                                    <option selected>
                                      Sort by: Best Rating
                                    </option>
                                    <option>Sort by: Worst Rating</option>
                                  </select>
                                </div>
                              </div>
                              <div className="rev-f1__review">
                                <div className="review-o u-s-m-b-15">
                                  <div className="review-o__info u-s-m-b-8">
                                    <span className="review-o__name">
                                      John Doe
                                    </span>
                                    <span className="review-o__date">
                                      27 Feb 2018 10:57:43
                                    </span>
                                  </div>
                                  <div className="review-o__rating gl-rating-style u-s-m-b-8">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="far fa-star" />
                                    <span>(4)</span>
                                  </div>
                                  <p className="review-o__text">
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy
                                    text ever since the 1500s, when an unknown
                                    printer took a galley of type and scrambled
                                    it to make a type specimen book.
                                  </p>
                                </div>
                                <div className="review-o u-s-m-b-15">
                                  <div className="review-o__info u-s-m-b-8">
                                    <span className="review-o__name">
                                      John Doe
                                    </span>
                                    <span className="review-o__date">
                                      27 Feb 2018 10:57:43
                                    </span>
                                  </div>
                                  <div className="review-o__rating gl-rating-style u-s-m-b-8">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="far fa-star" />
                                    <span>(4)</span>
                                  </div>
                                  <p className="review-o__text">
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy
                                    text ever since the 1500s, when an unknown
                                    printer took a galley of type and scrambled
                                    it to make a type specimen book.
                                  </p>
                                </div>
                                <div className="review-o u-s-m-b-15">
                                  <div className="review-o__info u-s-m-b-8">
                                    <span className="review-o__name">
                                      John Doe
                                    </span>
                                    <span className="review-o__date">
                                      27 Feb 2018 10:57:43
                                    </span>
                                  </div>
                                  <div className="review-o__rating gl-rating-style u-s-m-b-8">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="far fa-star" />
                                    <span>(4)</span>
                                  </div>
                                  <p className="review-o__text">
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy
                                    text ever since the 1500s, when an unknown
                                    printer took a galley of type and scrambled
                                    it to make a type specimen book.
                                  </p>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="u-s-m-b-30">
                            <form className="pd-tab__rev-f2">
                              <h2 className="u-s-m-b-15">Add a Review</h2>
                              <span className="gl-text u-s-m-b-15">
                                Your email address will not be published.
                                Required fields are marked *
                              </span>
                              <div className="u-s-m-b-30">
                                <div className="rev-f2__table-wrap gl-scroll">
                                  <table className="rev-f2__table">
                                    <thead>
                                      <tr>
                                        <th>
                                          <div className="gl-rating-style-2">
                                            <i className="fas fa-star" />
                                            <span>(1)</span>
                                          </div>
                                        </th>
                                        <th>
                                          <div className="gl-rating-style-2">
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star-half-alt" />
                                            <span>(1.5)</span>
                                          </div>
                                        </th>
                                        <th>
                                          <div className="gl-rating-style-2">
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <span>(2)</span>
                                          </div>
                                        </th>
                                        <th>
                                          <div className="gl-rating-style-2">
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star-half-alt" />
                                            <span>(2.5)</span>
                                          </div>
                                        </th>
                                        <th>
                                          <div className="gl-rating-style-2">
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <span>(3)</span>
                                          </div>
                                        </th>
                                        <th>
                                          <div className="gl-rating-style-2">
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star-half-alt" />
                                            <span>(3.5)</span>
                                          </div>
                                        </th>
                                        <th>
                                          <div className="gl-rating-style-2">
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <span>(4)</span>
                                          </div>
                                        </th>
                                        <th>
                                          <div className="gl-rating-style-2">
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star-half-alt" />
                                            <span>(4.5)</span>
                                          </div>
                                        </th>
                                        <th>
                                          <div className="gl-rating-style-2">
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <span>(5)</span>
                                          </div>
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <div className="radio-box">
                                            <input
                                              type="radio"
                                              id="star-1"
                                              name="rating"
                                            />
                                            <div className="radio-box__state radio-box__state--primary">
                                              <label
                                                className="radio-box__label"
                                                htmlFor="star-1"
                                              />
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="radio-box">
                                            <input
                                              type="radio"
                                              id="star-1.5"
                                              name="rating"
                                            />
                                            <div className="radio-box__state radio-box__state--primary">
                                              <label
                                                className="radio-box__label"
                                                htmlFor="star-1.5"
                                              />
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="radio-box">
                                            <input
                                              type="radio"
                                              id="star-2"
                                              name="rating"
                                            />
                                            <div className="radio-box__state radio-box__state--primary">
                                              <label
                                                className="radio-box__label"
                                                htmlFor="star-2"
                                              />
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="radio-box">
                                            <input
                                              type="radio"
                                              id="star-2.5"
                                              name="rating"
                                            />
                                            <div className="radio-box__state radio-box__state--primary">
                                              <label
                                                className="radio-box__label"
                                                htmlFor="star-2.5"
                                              />
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="radio-box">
                                            <input
                                              type="radio"
                                              id="star-3"
                                              name="rating"
                                            />
                                            <div className="radio-box__state radio-box__state--primary">
                                              <label
                                                className="radio-box__label"
                                                htmlFor="star-3"
                                              />
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="radio-box">
                                            <input
                                              type="radio"
                                              id="star-3.5"
                                              name="rating"
                                            />
                                            <div className="radio-box__state radio-box__state--primary">
                                              <label
                                                className="radio-box__label"
                                                htmlFor="star-3.5"
                                              />
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="radio-box">
                                            <input
                                              type="radio"
                                              id="star-4"
                                              name="rating"
                                            />
                                            <div className="radio-box__state radio-box__state--primary">
                                              <label
                                                className="radio-box__label"
                                                htmlFor="star-4"
                                              />
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="radio-box">
                                            <input
                                              type="radio"
                                              id="star-4.5"
                                              name="rating"
                                            />
                                            <div className="radio-box__state radio-box__state--primary">
                                              <label
                                                className="radio-box__label"
                                                htmlFor="star-4.5"
                                              />
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="radio-box">
                                            <input
                                              type="radio"
                                              id="star-5"
                                              name="rating"
                                            />
                                            <div className="radio-box__state radio-box__state--primary">
                                              <label
                                                className="radio-box__label"
                                                htmlFor="star-5"
                                              />
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              <div className="rev-f2__group">
                                <div className="u-s-m-b-15">
                                  <label
                                    className="gl-label"
                                    htmlFor="reviewer-text"
                                  >
                                    YOUR REVIEW *
                                  </label>
                                  <textarea
                                    className="text-area text-area--primary-style"
                                    id="reviewer-text"
                                    defaultValue={""}
                                  />
                                </div>
                                <div>
                                  <p className="u-s-m-b-30">
                                    <label
                                      className="gl-label"
                                      htmlFor="reviewer-name"
                                    >
                                      NAME *
                                    </label>
                                    <input
                                      className="input-text input-text--primary-style"
                                      type="text"
                                      id="reviewer-name"
                                    />
                                  </p>
                                  <p className="u-s-m-b-30">
                                    <label
                                      className="gl-label"
                                      htmlFor="reviewer-email"
                                    >
                                      EMAIL *
                                    </label>
                                    <input
                                      className="input-text input-text--primary-style"
                                      type="text"
                                      id="reviewer-email"
                                    />
                                  </p>
                                </div>
                              </div>
                              <div>
                                <button
                                  className="btn btn--e-brand-shadow"
                                  type="submit"
                                >
                                  SUBMIT
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProductDetailPage;
