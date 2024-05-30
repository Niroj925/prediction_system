import React from 'react';
import styles from './footer.module.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <h4>Stroke Prediction </h4>
        </div>
      <div className={styles.text}>
        All rights reserved .
      </div>
      <div>
      <p>041-07155212</p>
      </div>
      <div className={styles.rows}>
        {/* Row 1 */}
        <div className={styles.row}>
          <div className={styles.col}>
            <a href="#" className={styles.link}>
              About
            </a>
          </div>
          <div className={styles.col}>
            <a href="#" className={styles.link}>
              Services
            </a>
          </div>
          <div className={styles.col}>
            <a href="#" className={styles.link}>
              Blog
            </a>
          </div>
        </div>
        {/* Row 2 */}
        <div className={styles.row}>
          <div className={styles.col}>
            <a href="#" className={styles.link}>
              Contact
            </a>
          </div>
          <div className={styles.col}>
          <a href="https://www.facebook.com/" className={styles.contactLink}>
          <FacebookIcon className={styles.icon} />
        </a>
   
          </div>
          <div className={styles.col}>
        {/* WhatsApp */}
        <a href="https://wa.me/1234567890" className={styles.contactLink}>
          <WhatsAppIcon className={styles.icon} />
        </a>
          </div>
        </div>
        {/* Row 3 */}
        <div className={styles.row}>
          <div className={styles.col}>
            <a href="#" className={styles.link}>
              Partners
            </a>
          </div>
          <div className={styles.col}>
            <a href="#" className={styles.link}>
              Testimonials
            </a>
          </div>
          <div className={styles.col}>
            <a href="#" className={styles.link}>
              Careers
            </a>
          </div>
          <div className={styles.col}>
            <a href="#" className={styles.link}>
              FAQ
            </a>
          </div>
        </div>
      </div>
      <div className={styles.col}>
            <a href="#" className={styles.link}>
            All rights reserved Stroke Check.
            </a>
          </div>
    </div>
  );
}

export default Footer