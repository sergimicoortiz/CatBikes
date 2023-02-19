import React from "react";
import "./Footer.scss";

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <h3>CatBikes</h3>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam vitae felis scelerisque, gravida sapien non, cursus
                    augue. Aenean id pretium turpis. Suspendisse eros nunc,
                    sollicitudin nec.
                </p>
            </div>

            <div className="footer-bottom">
                <p>
                    Copyright <span id="year">2023</span>
                </p>

                <div className="footer-menu">
                    <ul className="f-menu">
                        <li>
                            <a href="https://github.com/sergimicoortiz">
                                Sergi Micó Ortiz
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/JuanLuisLopez-code">
                                Juan Luis López
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
