import React, { useState, useEffect, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import StationContext from "../../context/StationsContext";
import "../../pages/StationsClient/StationsClientList.scss";
import { useNavigate } from "react-router-dom";


const InfiniteScrollStations = () => {
    const navigate = useNavigate();
    const { stations } = useContext(StationContext);
    const [cont, setCont] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [items, setItems] = useState([]);
    const fetchData = () => {
        setCont(cont + 1);
    };

    useEffect(() => {
        const limit = cont * 2;
        const items_tmp = [...stations].splice(0, limit)
            .map(item => {
                return (
                    <div className="card" key={item.slug} style={{
                        backgroundImage: `url(${item.image})`, backgroundRepeat: "no-repeat"
                    }}>
                        <div className="content">
                            <h2 className="title">{item.name}</h2>
                            <p className="copy">Status: {item.status}</p>
                            <span className="copy">Total Slots: {item.total_slots}</span>
                            <span className="copy">Bikes for Rent: {item.total_bikes}</span>
                            <button className="btn" onClick={() => {
                                navigate("/stations/" + item.slug);
                            }
                            }>Show Bikes</button>
                        </div>
                    </div>
                );
            });
        setItems(items_tmp);
        if (items_tmp.length === stations.length && items_tmp.length > 0) setHasMore(false);

    }, [cont]);

    return (
        <InfiniteScroll
            style={{ width: "43%", height: "auto", margin: "auto" }}
            dataLength={items.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            <div className="stationsClientCard">
                <main className="page-content-">
                    {items}
                </main>
            </div>
        </InfiniteScroll>
    );
};

export default InfiniteScrollStations;