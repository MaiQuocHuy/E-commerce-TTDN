import axios from "axios";
import { useSearch } from "../context/search";
import BASE_URL from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Searchinput = () => {
  const [values, setValues] = useSearch();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (values.keyword != "") {
        const { data } = await axios.get(
          `${BASE_URL}/api/e-commerce/product/search/${
            values.keyword
          }?page=${currentPage}&limit=${20}`
        );
        setValues({ ...values, result: data.result });
        navigate("/product/search");
      } else {
        await getPaginatedProduct();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPaginatedProduct = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/product/paginatedproduct?page=${currentPage}&limit=${8}`
      );
      console.log(data);
      if (data?.results?.result?.length !== 0) {
        setValues({ ...values, result: data.results.result });
        navigate("/product/search");
      }
    } catch (error) {
      toast.error(error);
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
