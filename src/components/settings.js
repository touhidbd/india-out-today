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
                style={{ filter: loaded ? 'none' : 'blur(10px)', transition: 'filter 0.3s ease-out' }}
                loading="lazy"
            />
        </div>
    );
};

const Settings = () => {
    const [apiData, setApiData] = useState([]);
    const [alternativesApiData, setAlternativesApiData] = useState([]);
    const [alternativesData, setAlternativesData] = useState([]);
    const [popup, setPopup] = useState("");
    const [loader, setLoader] = useState(false);
    const [visibleDataCount, setVisibleDataCount] = useState(18);
    const baseUrl = 'https://data.indiaout.today/api';

    useEffect(() => {
        const fetchData = async () => {
            setLoader(true);
            try {
                const url = `${baseUrl}/brands`;
                const response = await axios.get(url);
                setApiData(response.data);
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
            if (!loader && visibleDataCount < apiData.length) {
                setVisibleDataCount((prevCount) => prevCount + 18);
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [visibleDataCount, loader]);


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

            {loader && apiData.length === 0 ? (
                <div className="loader"></div>
            ) : (
                <>
                    <div className="tiot-brand-wrapper">
                        {apiData.slice(0, visibleDataCount).map((brand) => (
                            <div className="tiot-brand" key={brand.id}>
                                <div className="tiot-brand-image">
                                    <ImageWithBlur
                                        src={brand.image}
                                        placeholder={brand.placeholderImage}
                                        alt={brand.name}
                                    />
                                </div>
                                <div className="tiot-brand-text">
                                    <h4>{brand.name}</h4>
                                    {brand.alternatives && brand.alternatives.length > 0 && (
                                        <button onClick={(e) => alternatives(e.target.value)} value={brand.alternatives}>
                                            বিকল্প
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    {visibleDataCount < apiData.length && (
                        <div className="loader"></div>
                    )}
                </>
            )}
        </div>
    );
};

export default Settings;