import styles from './style.module.css';

function Demo1() {
  return (
    <div className={styles.container}>
      {/* <h2>测试CSS 自定义字体</h2> */}
      <p className={styles.normal}>自定义字体 normal</p>
      {/* <p className={styles.middle}>自定义字体 middle</p>
      <p className={styles.semiBold}>自定义字体 semiBold</p>
      <p className={styles.bold}>自定义字体 bold</p> */}
    </div>
  );
}

export default Demo1;
