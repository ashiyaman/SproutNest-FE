import { useState } from "react";

const FilterModal = ({ closeModalHandler, priceRangeHandler }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);

  const handleMinChange = (e) => {
    const value = parseInt(e.target.value);
    if (value < maxPrice) setMinPrice(value);
    priceRangeHandler(value, maxPrice)
  };

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > minPrice) setMaxPrice(value);
    priceRangeHandler(minPrice, value)
  };

  const minPercentage = (minPrice / 2000) * 100;
  const maxPercentage = (maxPrice / 2000) * 100;
  const trackStyle = {
    background: `linear-gradient(to right, #ccc ${minPercentage}%, #224d43 ${minPercentage}%, #224d43 ${maxPercentage}%, #ccc ${maxPercentage}%)`,
  };

  return (
    <div className="filter-modal">
      <div className='d-flex justify-content-between'>
        <h4 className='fw-bold'>Filter By:</h4>
        <button className="rounded-circle fw-bold" style={{color: '#224d43'}} onClick={() => closeModalHandler()}>
            X
        </button>
      </div>
      <section  className='my-3'>
        <h5>Price:</h5>
        <div className="price-inputs">
            <div className="input-box">
            <span>₹</span>
            <input type="number" value={minPrice} onChange={handleMinChange} />
            </div>
            <span className="to-text">to</span>
            <div className="input-box">
            <span>₹</span>
            <input type="number" value={maxPrice} onChange={handleMaxChange} />
            </div>
        </div>

        <div className="slider-container">
            <div className="slider-track" style={trackStyle}></div>
            <input
            type="range"
            min="0"
            max="2000"
            value={minPrice}
            onChange={handleMinChange}
            className="slider slider-min"
            />
            <input
            type="range"
            min="0"
            max="2000"
            value={maxPrice}
            onChange={handleMaxChange}
            className="slider slider-max"
            />
        </div>
      </section>
      <section>
        <h5>Rating:</h5>
      </section>
    </div>
  );
};

export default FilterModal;
