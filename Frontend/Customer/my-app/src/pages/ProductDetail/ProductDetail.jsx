import React, { useState, useEffect } from "react";
import Slider from "../../components/slide/Slider";
import Images from "../../components/Listproducts/images";
import Footer from "../../components/Footer/Footer";
import Search_cart from "../../components/SearchCart/index";
import { useParams } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import axios from "axios";
import "./ProductDetail.css";
import "./ProductDetailrps.css";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

import { BackTop, InputNumber } from "antd";
import Sizeguide from "../../components/Sizeguide/Sizeguide";

import numeral from "numeral";

function productdetails() {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const productId = params.get("product");
  const atttributeId = params.get("attribute");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [productPriceItems, setProductPriceItems] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [reFresh, setReFresh] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [reFresh1, setReFresh1] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [productDiscount, setProductDiscount] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [productPrice, setProductPrice] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [product, setProduct] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [images, setImages] = useState(null); //danhmuc
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedColor, setSelectedColor] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedSize, setSelectedSize] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedColor_Click, setSelectedColor_Click] = useState(atttributeId);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedSize_Click, setSelectedSize_Click] = useState(atttributeId);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [categoryId, setCategoryId] = useState(null); //danhmuc
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [quantity, setQuantity] = useState(1); //danhmuc

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { add } = useCart((state) => state);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [SizeguideOpen, setsizeguideOpen] = useState(false);
  const onChange = (value) => {
    setQuantity(value);
  };
  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        "https://tococlothes.onrender.com/v1/products/findById/" + productId
      );
      setProduct(res.data.results[0]);
      res.data.results[0].attributes.map((item) => {
        if (item._id === atttributeId) {
          setProductDiscount(item.discount);
          setProductPrice(item.price);
          setProductPriceItems(item.totalPriceEachType);
        }
      });
      const resCate = await axios.get(
        "https://tococlothes.onrender.com/v1/products/02getByCategoryId/" +
          res.data.results[0].categories[0]._id
      );

      setImages(resCate.data.results);
    } catch (error) {
      console.log("err:", error);
    }
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (selectedColor_Click === selectedSize_Click) {
      product?.attributes.map((item) => {
        if (selectedColor_Click === item._id) {
          setProductDiscount(item.discount);
          setProductPrice(item.price);
          setProductPriceItems(item.totalPriceEachType);
        }
      });
    }
  }, [selectedColor_Click, selectedSize_Click]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    product && (
      <div className="main_product_detall">
        {SizeguideOpen && <Sizeguide closeSizeguide={setsizeguideOpen} />}
        <Slider />
        <Search_cart />
        <div className="detail">
          <div className="product_detall_container">
            <div className="product_img">
              <div className="product_img_container">
                <img
                  src={"https://tococlothes.onrender.com/uploads" + product.coverImage}
                  alt=""
                />
              </div>
            </div>
            <div className="product_detall">
              <div className="product_detall_main">
                <p className="productName">
                  {product.name}-{product.productCode}
                </p>
                <div className="price" style={{display: "block" ,height: "100%"}}>
                  <p style={{ fontWeight: 600 }} >
                    {productPrice && (
                      <del>{numeral(productPrice).format("0,0")} VN??</del>
                    )}
                  </p>
                  <p>{numeral(productPriceItems).format("0,0")} VN??</p>
                  <div className="discount">
                    <p>gi???m {productDiscount}%</p>
                  </div>
                </div>
                <div className="color">
                  <p>M??u: </p>
                  <div className="color_container ">
                    {reFresh1 &&
                      product.attributes.map((item, index) => {
                        if (item.size === selectedSize && selectedSize) {
                          let style = null;
                          {
                            /* if(item.color==="H????ng"){
                            style={
                                     backgroundColor: "pink"
                                    }
                          }
                          if(item.color==="??en"){
                            style={
                                     backgroundColor: "black"
                                    }
                          }

                          if(item.color==="V??ng"){
                            style={
                                     backgroundColor: "yellow"
                                    }
                          } */
                          }

                          if (selectedColor_Click === item._id) {
                            style = {
                              color: "orange",
                              borderColor: "orange",
                              borderWidth: "2px",
                            };
                          }

                          return (
                            <a
                              style={style}
                              onClick={() => {
                                setSelectedColor_Click(item._id);
                                setSelectedColor(item.color);
                                setReFresh((e) => e + 1);
                              }}
                            >
                              {item.color}
                            </a>
                          );
                        }
                      })}
                    {!reFresh1 &&
                      product.attributes.map((item, index) => {
                        let style = null;
                        {
                          /* if(item.color==="H????ng"){
                            style={
                                     backgroundColor: "pink"
                                    }
                          }
                          if(item.color==="??en"){
                            style={

                                     backgroundColor: "black",
                                     color: "white"
                                    }
                          }
                          if(item.color==="Tr???ng"){
                            style={
                                     backgroundColor: "white",
                                     color: "black"
                                    }
                          }
                          if(item.color==="V??ng"){
                            style={
                                     backgroundColor: "yellow"
                                    }
                          }
                          if(item.color==="X??m"){
                            style={
                                     backgroundColor: "Grey",
                                     backgroundColor: "black"

                                    }
                          } */
                        }
                        if (selectedColor_Click === item._id) {
                          style = {
                            color: "orange",
                            borderColor: "orange",
                            borderWidth: "2px",
                          };
                        }
                        return (
                          <a
                            style={style}
                            
                            onClick={() => {
                              setSelectedColor_Click(item._id);
                              setSelectedColor(item.color);
                              setReFresh((e) => e + 1);
                            }}
                          >
                            {item.color}
                          </a>
                        );
                      })}
                  </div>
                </div>
                <div className="size">
                  <p>SIZE: </p>
                  <div className="size_container">
                    {reFresh &&
                      product.attributes.map((item, index) => {
                        if (item.color === selectedColor && selectedColor) {
                          return (
                            <a
                              style={
                                selectedSize_Click === item._id
                                  ? {
                                      color: "orange",
                                      borderColor: "orange",
                                      borderWidth: "2px",
                                    }
                                  : {}
                              }
                              onClick={() => {
                                setSelectedSize_Click(item._id);
                                setSelectedSize(item.size);
                                setReFresh1((e) => e + 1);
                              }}
                              key={item._id}
                            >
                              {item.size}
                            </a>
                          );
                        }
                      })}
                    {!reFresh &&
                      product.attributes.map((item, index) => {
                        return (
                          <a
                            style={
                              selectedSize_Click === item._id
                                ? {
                                    color: "orange",
                                    borderColor: "orange",
                                    borderWidth: "2px",
                                  }
                                : {}
                            }
                            onClick={() => {
                              setSelectedSize_Click(item._id);
                              setSelectedSize(item.size);
                              setReFresh1((e) => e + 1);
                            }}
                            key={item._id}
                          >
                            {item.size}
                          </a>
                        );
                      })}
                  </div>
                </div>
                <a
                  className="btnsize"
                  onClick={() => {
                    setsizeguideOpen(true);
                  }}
                >
                  B???ng qui ?????i k??ch c???
                </a>
                <button
                  className="canclesizebtn"
                  onClick={() => {
                    setReFresh(false);
                    setReFresh1(false);
                  }}
                >
                  Ch???n l???i
                </button>
                <div className="amount">
                  <h5 style={{fontWeight: 550, marginRight:4}}>{`Amount:`} </h5>
                  <InputNumber
                    name="productQuantity"
                    style={{ marginRight: 4 }}
                    min={1}
                    defaultValue={1}
                    onChange={onChange}
                  />
                  <p >{product.stockTotal} s???n ph???m c?? s???n</p>
                </div>
                <div className="btn_cart_buy"  >
                  <a
                    href="#"
                    className="btncart"
                    onClick={() => {
                      add({
                        product: product,
                        quantity: quantity,
                        attributeId: selectedColor_Click,
                      });
                    }}
                  
                  >
                    TH??M V??O GI??? H??NG
                  </a>
                
                </div>
                <ul className="otherInfo">
                  <li>
                    <img src="image50.png" />
                    <span>B???O H??NH TRONG V??NG 90 NG??Y</span>
                  </li>
                  <li>
                    <img src="image50.png" />
                    <span>?????I H??NG TRONG V??NG 30 NG??Y</span>
                  </li>
                  <li>
                    <img src="image50.png" />
                    <span>HOTLINE B??N H??NG: 0914 444 179</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="description">
            <p>
              {product.name}-{product.productCode}{" "}
            </p>
            <br />
            <p>{product.description}</p>
            <br />
            <p>Xu???t X??? t??? th????ng hi???u: {product.suppliers[0].name}</p>
            <p> S???n Xu???t T???i : {product.suppliers[0].address}</p>
            <p> Hot line : {product.suppliers[0].phoneNumber}</p>
            <p> Email : {product.suppliers[0].email}</p>
            <br />
            <p>
              S???n ph???m c???a shop ?????m b???o ch???t l?????ng tuy???t ?????i. Ch???t li???u ?????p,
              form d??ng chu???n. V?? ?????c bi???t shop chuy??n nh???ng m???t h??ng t???m trung
              cho ?????n cao c???p kh??ng b??n nh???ng m???t h??ng r???, k??m ch???t l?????ng. Kh??ch
              h??ng khi order s??? ???????c ship COD n??n n???u s???n ph???m kh??ng l??m h??i
              l??ng qu?? kh??ch h??ng th?? c?? th??? ko thanh to??n v?? g???i tr??? l???i.
            </p>
            <br />
            <p>
              Ch??n th??nh c???m ??n qu?? kh??ch h??ng ???? gh?? xem v?? theo d??i shop ???.
            </p>
          </div>
          <div className="grid_item">
            <div className="related-section-header">
              <h3 className="related-section-header_title">
                <span className="related-section-header_text">
                  S???N PH???M C??NG DANH M???C
                </span>
              </h3>
            </div>
            {/* <Images data={images} count={4}></Images> */}
            {images && <Images data={images} count={4}></Images>}
          </div>
        </div>
        <Footer amount1={8}></Footer>
      </div>
    )
  );
}

export default productdetails;
