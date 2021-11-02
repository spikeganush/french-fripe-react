import {
    onSnapshot,
    collection,
    orderBy,
    query,
    where,
  } from '@firebase/firestore'
  import db from '../firebase'
  import React, { useState, useEffect } from 'react'
  import { NavLink, useParams } from 'react-router-dom'
  import MenuLeft from '../components/MenuLeft'

function Product() {
    return (
        <main>

        
        <div className="container">
            <div className="row">

                
                <div className="col__left">

                    <div className="widget-wrapper">
                        <h4>Categories:</h4>
                        <br />
                        <div className="list-group">
                            <MenuLeft />


                        </div>
                    </div>
                </div>
                
                <div className="col__right">
                    <div className="product">
                        <div className="product__left">
                            <div className="product__carousel">
                                
                                </div>
                            </div>
                            <div className="product__text">

                                <h1 className="product_name">name</h1>
                                <h1 className="price">price per unit</h1>  

                                <div className="quantity_container">
                                    <h2>Quantity</h2>
                                    <p>Minimum quantity to order minimum_quantity
                                    if($row_showProducts['type'] == 1) {
                                        if($row_showProducts['minimum_quantity'] <= 1){
                                            echo 'piece';
                                        } else {
                                            echo 'pieces';
                                        }
                                    
                                } elseif($row_showProducts['type'] == 2) {
                                    echo 'box';
                                }
                                ?></p>
                                    <p>(Remaining <?php echo $row_showProducts['quantity'];?> pieces)</p>
                                    <div className="quantity-select">
                                        <button className="button minus">-</button>
                                        <input readonly type="number" className="input"
                                            value="<?php echo $row_showProducts['minimum_quantity'];?>"
                                            min="<?php echo $row_showProducts['minimum_quantity'];?>" />
                                        <button className="button plus">+</button>
                                    </div>
                                    <div className="button pbtn">
                                        <script>
                                        var minimum_java =
                                            <?php echo json_encode($row_showProducts['minimum_quantity']); ?>;
                                        </script>
                                        <input type="hidden" value="<?php echo $row_showProducts['minimum_quantity'];?>"
                                            name="quantity">
                                        <a href="cart.php" data-id="<?php echo $row_showProducts['id'];?>"
                                            data-quantity="<?php echo $row_showProducts['minimum_quantity'];?>"
                                            className="add-to-cart btn btn-default">Add to card</a>
                                    </div>


                                </div>

                                <div className="full_description"><?php echo $row_showProducts['full_description'];?></div>


                            </div>
                        </div>
                        



                    </div>
                    

                </div>
            </div>
            

    </main>
    )
}

export default Product
