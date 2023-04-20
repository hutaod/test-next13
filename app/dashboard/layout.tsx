import Link from "next/link";

export default function Layout({ children, userInfo, performance }: any) {
  return (
    <>
      {children}
      <h2>用户行为数据</h2>
      {/* 导航 */}
      <div>
        <Link href={"/dashboard/devices"}>设备信息 </Link>
        <Link href={"/dashboard/locations"}>地理位置</Link>
      </div>
      <div className="userInfo">{userInfo}</div>
      <br />
      <h2>性能数据</h2>
      {/* 导航 */}
      <div>
        <Link href={"/dashboard/app"}>app 性能数据 </Link>
        <Link href={"/dashboard/web"}>web 性能数据</Link>
        <Link href={"/dashboard/common-comp"}>web 性能数据222</Link>
      </div>
      <div className="performance">{performance}</div>
    </>
  );
}