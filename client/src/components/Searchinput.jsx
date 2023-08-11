import axios from "axios";
import { useSearch } from "../context/search";
import BASE_URL from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Searchinput = () => {
  const [values, setValues] = useSearch();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values.keyword);
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/product/search/${
          values.keyword
        }?page=${currentPage}&limit=${20}`
      );
      setValues({ ...values, result: data.result });
      navigate("/product/search")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="main-form" onSubmit={handleSubmit}>
        <label htmlFor="main-search" />
        <input
          className="input-text input-text--border-radius input-text--style-1"
          type="text"
          id="main-search"
          placeholder="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button
          className="btn btn--icon fas fa-search main-search-button"
          type="submit"
        />
      </form>
    </>
  );
};

export default Searchinput;
