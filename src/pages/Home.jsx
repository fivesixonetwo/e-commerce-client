import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getNewArrivals, getBestSellers } from "../redux/apiCalls";
import Product from "../components/Product";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  margin-top: 0.5px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 150px;
  position: relative;
`;

const ProductContainer = styled.div`
  padding: 25px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  flex: 1;
`;

const Title = styled.p`
  font-family: Quicksand, sans-serif;
  font-weight: 600;
  letter-spacing: 0.15em;
  font-size: 24px;
`;

const Home = () => {
  const dispatch = useDispatch();
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    dispatch(getNewArrivals()).then((res) => {
      setNewArrivals((res && res.data) || []);
    });
  }, []);

  useEffect(() => {
    dispatch(getBestSellers()).then((res) => {
      setBestSellers((res && res.data) || []);
    });
  }, []);

  return (
    <Container>
      <Section>
        <div style={{ justifyContent: "center", display: "flex" }}>
          <Title>NEW ARRIVALS</Title>
        </div>
        <ProductContainer>
          {newArrivals.map((item) => (
            <Product item={item} id={item.id} key={item.id} />
          ))}
        </ProductContainer>
      </Section>
      <Section>
        <div style={{ justifyContent: "center", display: "flex" }}>
          <Title>BEST SELLERS</Title>
        </div>
        <ProductContainer>
          {bestSellers.map((item) => (
            <Product recommend={true} item={item} key={item.id} />
          ))}
        </ProductContainer>
      </Section>
    </Container>
  );
};

export default Home;
