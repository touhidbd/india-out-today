import React, { useState, useEffect } from "react";
import axios from "axios";

const loadImage = (src, onLoadCallback) => {
    const img = new Image();
    img.src = src;
    img.onload = onLoadCallback;
};

const ImageWithBlur = ({ src, placeholder, alt }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        loadImage(src, () => setLoaded(true));
    }, [src]);

    return (
        <div className="image-container">
            <img
                src={loaded ? src : placeholder}
                alt={alt}
                style={{ filter: loaded ? 'none' : 'blur(10px)', transition: 'filter 0.8s ease-out' }}
                loading="lazy"
            />
        </div>
    );
};

const Settings = () => {
    const [apiData, setApiData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [alternativesApiData, setAlternativesApiData] = useState([]);
    const [alternativesData, setAlternativesData] = useState([]);
    const [popup, setPopup] = useState("");
    const [loader, setLoader] = useState(false);
    const [visibleDataCount, setVisibleDataCount] = useState(18);
    const [searchTerm, setSearchTerm] = useState("");

    const baseUrl = 'https://data.indiaout.today/api';

    useEffect(() => {
        const fetchData = async () => {
            setLoader(true);
            try {
                const url = `${baseUrl}/brands`;
                const response = await axios.get(url);
                setApiData(response.data);
                setFilteredData(response.data);
                setLoader(false);
            } catch (error) {
                console.error("Error fetching data", error);
                setLoader(false);
            }
        };

        const fetchAlternatives = async () => {
            const altUrl = `${baseUrl}/alternatives`;
            try {
                const response = await axios.get(altUrl);
                setAlternativesApiData(response.data);           
            } catch (error) {
                console.error("Error fetching alternatives", error);
            }
        };

        fetchData();
        fetchAlternatives();
    }, [baseUrl]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 200 >= document.documentElement.scrollHeight) {
            if (!loader && visibleDataCount < filteredData.length) {
                setVisibleDataCount((prevCount) => prevCount + 18);
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [visibleDataCount, loader, filteredData]);

    const handleSearch = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        setSearchTerm(searchQuery);
        const filteredBrands = apiData.filter(brand =>
            brand.name.toLowerCase().includes(searchQuery) || brand.en_name.toLowerCase().includes(searchQuery)
        );
        setFilteredData(filteredBrands);
    };

    const body = document.body;

    const alternatives = (values) => {
        const alternativesArray = values.split(',').map(Number);
        const filteredAlternatives = alternativesApiData.filter(alt =>
            alternativesArray.includes(alt.id)
        );
        setAlternativesData(filteredAlternatives); 
        setPopup("open");
        body.style.overflow = "hidden";
    };

    const closePopup = () => {        
        setPopup("");
        body.style.overflow = "";
    }

    return (
        <div className="tiot-wrapper" id="tiot-all-brands">

            <h2 className="tiot-title">পন্য ও ব্র্যান্ডসমূহ সার্চ করুন</h2>
            <div className="tiot-search-box">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path>
                </svg>
                <input
                    type="search"
                    placeholder="খুঁজে বের করুন ..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <h2 className="tiot-title">পন্য ও ব্র্যান্ডসমূহ</h2>
            <div className={`tiot-alternative-popup ${popup}`}>
                <div className="tiot-alternative-popup-body">
                    <button onClick={closePopup} className="close">x</button>
                    <h2>বাংলাদেশী বিকল্প পন্য ও ব্র্যান্ডসমূহ</h2>
                    <div className="tiot-alternative-popup-brand">
                        <div className="tiot-brand-wrapper">
                            {alternativesData.length > 0 ? (
                                alternativesData.map((alternative) => (
                                    <div className="tiot-brand" key={alternative.id}>
                                        <div className="tiot-brand-image">
                                            <ImageWithBlur
                                                src={alternative.image}
                                                placeholder={alternative.placeholderImage}
                                                alt={alternative.name}
                                            />
                                        </div>
                                        <div className="tiot-brand-text">
                                            <h4>{alternative.name}</h4>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="tiot-notice">কোন বিকল্প পন্য ও ব্র্যান্ড পাওয়া যায় নাই</p>
                            )}
                        </div>                        
                    </div>
                </div>
            </div>

            {loader && filteredData.length === 0 ? (
                <div className="loader"></div>
            ) : (
                <>
                    <div className="tiot-brand-wrapper">
                        {filteredData.slice(0, visibleDataCount).map((brand) => (
                            <div className="tiot-brand" key={brand.id}>
                                <div className="tiot-brand-image">
                                    <ImageWithBlur
                                        src={brand.image}
                                        placeholder={brand.placeholderImage}
                                        alt={brand.name}
                                    />
                                </div>
                                <div className="tiot-brand-text">
                                    <h4>{brand.name} ({brand.en_name})</h4>
                                    {brand.alternatives && brand.alternatives.length > 0 && (
                                        <button onClick={(e) => alternatives(e.target.value)} value={brand.alternatives}>
                                            বিকল্প
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    {visibleDataCount < filteredData.length && (
                        <div className="loader"></div>
                    )}
                </>
            )}
        </div>
    );
};

export default Settings;