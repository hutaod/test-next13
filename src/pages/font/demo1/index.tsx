import { Alegreya } from "next/font/google";
import styles from './style.module.css';

const alegreya = Alegreya({
  subsets: ["latin"], // 设置需要的字符集
  weight: ["400"], // 设置需要的字重
  style: ["normal", "italic"], // 有 normal 和 italic 可选择
})

function Demo1() {
  return (
    <div style={{ fontFamily: `${alegreya.style.fontFamily}` }}>
      {/*  style={{ fontFamily: `${alegreya.style.fontFamily}` }} */}
      <h2>测试CSS 自定义字体</h2>
      <p>系统默认字体 normal</p>
      <p className={styles.normal}>自定义字体 normal 自定义字体 normal 自定义字体 normal 自定义字体 normal</p>
      <p className={styles.middle}>自定义字体 middle</p>
      <p className={styles.semiBold}>自定义字体 semiBold</p>
      <p className={styles.bold}>自定义字体 bold</p>
      <p className={styles.normal_var}>自定义字体-可变字体 normal 自定义字体 normal 自定义字体 normal 自定义字体 normal</p>
      <p className={styles.middle_var}>自定义字体-可变字体 middle</p>
      <p className={styles.semiBold_var}>自定义字体-可变字体 semiBold</p>
      <p className={styles.bold_var}>自定义字体-可变字体 bold</p>
    </div>
  );
}

export default Demo1;
