import React, { useState, useRef, useCallback, useEffect } from "react";
import styled from "@emotion/styled";
import Arrow from "./Wave/Arrow";
import { categories } from "../constants/Category";

const MainHeaderContainer = styled.div`
  width: 100%;
  position: relative;
  display: block;
  cursor: pointer;
  margin-top: 85px;
  padding: 0 20px;
  font-size: 36px;
  font-weight: bold;
`;

const MainHeader = styled.div`
  display: inline-block;
  padding-right: 26px;
`;

const MainCategoryScroll = styled.ul`
  opacity: ${props => (props.open ? 1 : 0)};
  pointer-events: ${props => (props.open ? "none" : "auto")};
  position: absolute;
  margin-top: 14px;
  padding: 27px 42px;
  height: auto;
  width: 310px;
  height: 468px;
  overflow-y: scroll;
  background: #fff;
  box-shadow: 0 6px 35px rgba(23, 25, 29, 0.2);
  z-index: 2;
  color: #515151;
  cursor: default;
  pointer-events: ${props => (props.open ? "auto" : "none")};

  transition: opacity 0.2s ease-out, transform 0.3s ease-out,
    -webkit-transform 0.3s ease-out;
  transform: ${props => (props.open ? "translateY(0px)" : "translateY(15px)")};
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MainCategoryItem = styled.div`
  cursor: pointer;
  margin-bottom: 18px;
  color: ${props => (props.selected ? "#6D87EA" : "#515151")};
`;

const CategorySplit = styled.div`
  font-size: 13px;
  color: #8c8c8c;
  margin-top: 26px;
  margin-bottom: 18px;
`;

export default ({ category, changeCategory }) => {
  const [state, setState] = useState({
    mainHeaderOpen: false,
  });
  const mainHeaderRef = useRef();

  const handleMainHeaderOuterClick = useCallback(
    e => {
      if (state.mainHeaderOpen && e.target !== mainHeaderRef.current) {
        setState(prevState => ({ ...prevState, mainHeaderOpen: false }));
      }
    },
    [state.mainHeaderOpen]
  );

  const handleMainHeaderClick = () => {
    setState(prevState => ({
      ...prevState,
      mainHeaderOpen: !prevState.mainHeaderOpen,
    }));
  };

  const handleCategorySelect = e => {
    const curCategory = e.target.textContent;
    changeCategory(curCategory);
    setState(prevState => ({
      ...prevState,
      mainHeaderOpen: false,
    }));
  };

  useEffect(() => {
    window.addEventListener("click", handleMainHeaderOuterClick);

    return () => {
      window.removeEventListener("click", handleMainHeaderOuterClick);
    };
  }, [handleMainHeaderOuterClick]);

  return (
    <MainHeaderContainer>
      <div onClick={handleMainHeaderClick}>
        <MainHeader open={state.mainHeaderOpen}>{category}</MainHeader>
        <Arrow open={state.mainHeaderOpen} />
      </div>
      <MainCategoryScroll open={state.mainHeaderOpen} ref={mainHeaderRef}>
        <MainCategoryItem
          onClick={handleCategorySelect}
          selected={category === "전체"}
          style={{ fontSize: "27px" }}
        >
          전체
        </MainCategoryItem>
        <CategorySplit>Category</CategorySplit>
        {categories.map((categoryItem, index) => (
          <MainCategoryItem
            key={index}
            onClick={handleCategorySelect}
            selected={category === categoryItem}
            style={{ fontSize: "19px" }}
          >
            {categoryItem}
          </MainCategoryItem>
        ))}
      </MainCategoryScroll>
    </MainHeaderContainer>
  );
};
