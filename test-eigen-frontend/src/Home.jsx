import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Input, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

const Home = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [datas, setDatas] = useState([]);
  const getDatas = async () => {
    const response = await axios.get(
      "https://newsapi.org/v2/top-headlines?country=id&apiKey=0e57b96a91774c25b707c31a0b64342b"
    );
    setDatas(response.data.articles);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${inputSearch}&from=2023-01-30&sortBy=popularity&apiKey=0e57b96a91774c25b707c31a0b64342b`
    );
    setDatas(response.data.articles);
  };

  useEffect(() => {
    getDatas();
  }, [inputSearch]);
  useEffect(() => {
    handleClick();
  }, [inputSearch]);
  return (
    <div style={{ textAlign: "center", marginTop: " 15px" }}>
      <div style={{ textAlign: "left", marginLeft: "20px" }}>
        <h1>
          News <span style={{ color: "red" }}>API</span>
        </h1>
      </div>

      <Input.Group compact>
        <Input
          style={{
            width: "calc(50% - 100px)",
            textAlign: "left",
          }}
          placeholder="Cari berita"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
        />
        <Button onClick={handleClick} type="primary" icon={<SearchOutlined />}>
          Search
        </Button>
      </Input.Group>

      <div style={{ marginTop: "20px" }}>
        <>
          {datas.map((data) => {
            return (
              <Card
                hoverable
                style={{
                  width: 240,
                  display: "inline-block",
                  marginRight: "15px",
                  marginBottom: "20px",
                  marginTop: "20px",
                }}
                cover={<img alt="example" src={data.urlToImage} />}
              >
                <Meta title={data.title} description={data.description} />

                <Button
                  style={{ width: "100px", marginTop: "10px" }}
                  href={data.url}
                  type="primary"
                  block
                >
                  Detail
                </Button>
              </Card>
            );
          })}
        </>
      </div>
    </div>
  );
};

export default Home;
