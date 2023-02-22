import { useCountdown } from "@/components/hooks/use-countdown";
import styles from "./styles.module.css";

const deadlineTime = Date.now() + 1000 * 60 * 60 * 100;

function TestUseScrollTop() {
  const timeInfo = useCountdown({
    deadlineTime: deadlineTime,
    showMillisecond: true,
  });
  return (
    <div className={styles.box}>
      <span className={styles.day}>{timeInfo.day}天 </span>
      <span className={styles.number}>{timeInfo.hoursStr}</span>
      <span className={styles.symbol}>:</span>
      <span className={styles.number}>{timeInfo.minutesStr}</span>
      <span className={styles.symbol}>:</span>
      <span className={styles.number}>{timeInfo.secondsStr}</span>
      {/* <span className={styles.symbol}>:</span>
      <span className={styles.number}>
        {timeInfo.millisecondsStr?.slice(0, 1)}
      </span> */}
    </div>
  );
}

export default TestUseScrollTop;
