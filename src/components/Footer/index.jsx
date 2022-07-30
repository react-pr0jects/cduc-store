import { makeStyles } from '@material-ui/core';
import React from 'react';
import './styles.scss';

Footer.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  }
}))  

function Footer(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <section className="footer" id="footer">
        <div className="container">
          <div className="row  justify-content-between">
            <ul className="footer__item">
              <li>
                <h3>ĐỊA CHỈ</h3>
              </li>
              <li>
                <p>
                  1012 TRẦN HƯNG ĐẠO,
                  <br />
                  TP. Quy Nhơn, T. Bình Định
                </p>
              </li>
            </ul>
            <ul className="footer__item">
              <li>
                <h3>GIỜ MỞ CỬA</h3>
              </li>
              <li>
                <p>
                  Từ Thứ Hai - Chủ Nhật
                  <br />
                  9:00 AM - 10:00 PM
                </p>
              </li>
            </ul>
            <ul className="footer__item">
              <li>
                {' '}
                <h3>LIÊN HỆ</h3>
              </li>
              <li>
                <p>
                  +84 32700x xxx, <br /> info@gmail.com
                </p>
              </li>
              <li>
                <ul className="row justify-content-between footer__social-link">
                  <li>
                    <a href="/#">
                      <i className="fab fa-facebook-square" />
                    </a>
                  </li>
                  <li>
                    <a href="/#">
                      <i className="fab fa-instagram-square" />
                    </a>
                  </li>
                  <li>
                    <a href="/#">
                      <i className="fab fa-twitter-square" />
                    </a>
                  </li>
                  <li>
                    <a href="/#">
                      <i className="fab fa-youtube-square" />
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="footer__copyright">
            <div className="copyright">© {new Date().getFullYear()} - Designed by the Nhu Kien</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
